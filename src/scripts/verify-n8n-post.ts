import { PrismaClient } from '@prisma/client';

async function main() {
    const prisma = new PrismaClient();
    const article = await prisma.article.findUnique({
        where: { slug: "dolomites-unlocking-nature-s-secrets-1770894334075" },
        include: { category: true }
    });

    if (article) {
        console.log("Article found!");
        console.log("ID:", article.id);
        console.log("Title:", article.title);
        console.log("Image:", article.image);
        console.log("Category:", article.category.name);
        console.log("Published At:", article.publishedAt);
    } else {
        console.log("Article not found in DB.");
    }

    await prisma.$disconnect();
}

main();
