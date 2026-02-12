import { PrismaClient } from '@prisma/client';

async function main() {
    const prisma = new PrismaClient();
    const article = await prisma.article.findFirst({
        orderBy: { createdAt: 'desc' },
        include: { category: true }
    });

    console.log(JSON.stringify(article, null, 2));

    await prisma.$disconnect();
}

main();
