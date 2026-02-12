async function pushWithImage() {
    const url = 'http://localhost:3000/api/webhooks/n8n-blog';
    const blog = {
        title: "S3 Image Test Blog",
        content: "This blog post is being pushed with an image URL to test the S3 upload functionality. The system should download this image and upload it to the 'newsblog' S3 bucket.",
        category: "technology",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
    };

    console.log("🚀 Pushing blog with image to trigger S3 upload...");

    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json',
                'blog': 'purplemeritblogs'
            }
        });

        const data = await res.json();
        if (res.ok) {
            console.log("✅ Success!");
            console.log("Article Slug:", data.article.slug);
            console.log("S3 Image URL stored in DB:", data.article.image);
        } else {
            console.log("❌ Failed:", res.status, data);
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

pushWithImage();
