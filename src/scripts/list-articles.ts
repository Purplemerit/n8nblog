import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listArticles() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: {
      title: true,
      slug: true,
      aiRephrased: true,
      createdAt: true
    },
    orderBy: { createdAt: 'desc' },
    take: 15,
  });

  console.log('\n📝 Available Articles in Database:');
  console.log('='.repeat(80) + '\n');

  if (articles.length === 0) {
    console.log('⚠️  No articles found in database!');
    console.log('\n💡 Run this command to populate the database:');
    console.log('   npx tsx src/scripts/initial-import.ts\n');
  } else {
    articles.forEach((a, i) => {
      console.log(`${i + 1}. ${a.title}`);
      console.log(`   ${a.aiRephrased ? '✅' : '❌'} AI Rephrased`);
      console.log(`   📅 ${a.createdAt.toLocaleDateString()}`);
      console.log(`   🔗 http://localhost:3000/article/${a.slug}\n`);
    });

    console.log('='.repeat(80));
    console.log(`Total: ${articles.length} articles`);
  }

  await prisma.$disconnect();
}

listArticles();
