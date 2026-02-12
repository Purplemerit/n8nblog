import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadToS3 } from "@/lib/s3";
import { generateSlug } from "@/lib/articleUtils";

export async function POST(req: NextRequest) {
    try {
        // Simple authentication check
        const blogHeader = req.headers.get("blog");
        if (blogHeader !== "purplemeritblogs") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const contentType = req.headers.get("content-type") || "";
        let title = "";
        let content = "";
        let categorySlug = "news";
        let excerpt = "";
        let imageBuffer: Buffer | null = null;
        let imageFileName = "blog-image.jpg";
        let imageMimeType = "image/jpeg";

        if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            title = formData.get("title") as string;
            content = formData.get("content") as string;
            categorySlug = (formData.get("category") as string) || "news";
            excerpt = formData.get("excerpt") as string;

            const imageFile = formData.get("image") as File;
            if (imageFile && typeof imageFile !== "string") {
                imageBuffer = Buffer.from(await imageFile.arrayBuffer());
                imageFileName = imageFile.name;
                imageMimeType = imageFile.type;
            }
        } else {
            // Handle JSON body
            const body = await req.json();
            title = body.title;
            content = body.content;

            // Handle category which might be an array
            const rawCategory = body.category || body.categories;
            if (Array.isArray(rawCategory)) {
                categorySlug = rawCategory.length > 0 ? rawCategory[0] : "news";
            } else if (typeof rawCategory === "string") {
                categorySlug = rawCategory;
            } else {
                categorySlug = "news";
            }

            // Normalize slug
            categorySlug = categorySlug.toLowerCase().replace(/\s+/g, '-');

            excerpt = body.excerpt || "";

            // Check for image URL in different possible fields
            const imageUrl = body.imageUrl || body.featuredImageUrl;

            if (imageUrl) {
                // Download image from URL if n8n sends a link
                try {
                    const imgRes = await fetch(imageUrl);
                    if (imgRes.ok) {
                        imageBuffer = Buffer.from(await imgRes.arrayBuffer());
                        imageFileName = imageUrl.split("/").pop() || "image.jpg";
                        imageMimeType = imgRes.headers.get("content-type") || "image/jpeg";
                    } else {
                        console.warn(`Failed to fetch image from ${imageUrl}: ${imgRes.statusText}`);
                    }
                } catch (imgError) {
                    console.error("Error fetching image:", imgError);
                    // Proceed without image
                }
            } else if (body.imageBase64) {
                // Handle base64 if needed
                imageBuffer = Buffer.from(body.imageBase64, "base64");
                imageFileName = body.imageFileName || "image.jpg";
                imageMimeType = body.imageMimeType || "image/jpeg";
            }
        }

        if (!title || !content) {
            return NextResponse.json(
                { error: "Title and Content are required" },
                { status: 400 }
            );
        }

        // Check for AWS config before trying to upload
        if (!process.env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID === "your_access_key_id") {
            console.warn("AWS S3 is not configured. Article will be created without an image.");
        }

        // 1. Handle Image Upload to S3
        let s3ImageUrl = null;
        if (imageBuffer) {
            try {
                s3ImageUrl = await uploadToS3(imageBuffer, imageFileName, imageMimeType);
            } catch (s3Error: any) {
                console.error("S3 Upload Error:", s3Error);
                // Return clear error if S3 fails (optional, but good for debugging)
                if (process.env.AWS_ACCESS_KEY_ID !== "your_access_key_id") {
                    return NextResponse.json(
                        { error: "S3 Upload Failed", details: s3Error.message },
                        { status: 500 }
                    );
                }
            }
        }

        // 2. Ensure Category exists
        let category = await prisma.category.findUnique({
            where: { slug: categorySlug },
        });

        if (!category) {
            category = await prisma.category.create({
                data: {
                    name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
                    slug: categorySlug,
                },
            });
        }

        // 3. Get or Create Author (Editorial Team)
        let author = await prisma.user.findUnique({
            where: { email: "editorial@newsweb.com" },
        });

        if (!author) {
            console.log("Creating missing editorial author...");
            author = await prisma.user.create({
                data: {
                    email: "editorial@newsweb.com",
                    name: "Editorial Team",
                    role: "SYSTEM",
                },
            });
        }

        // 4. Create Article
        const slug = `${generateSlug(title)}-${Date.now()}`;
        const article = await prisma.article.create({
            data: {
                title,
                slug,
                content,
                excerpt: excerpt || content.substring(0, 150) + "...",
                image: s3ImageUrl,
                published: true,
                publishedAt: new Date(), // Important for sorting!
                categoryId: category.id,
                authorId: author.id,
            },
        });

        return NextResponse.json(
            {
                message: "Blog created successfully",
                article: {
                    id: article.id,
                    slug: article.slug,
                    image: article.image,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Webhook Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}
