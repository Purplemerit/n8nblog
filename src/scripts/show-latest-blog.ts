import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function showLatest() {
  const article = await prisma.article.findFirst({
    where: { aiRephrased: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  if (!article) {
    console.log('No AI-rephrased articles found');
    return;
  }

  console.log('\n' + '='.repeat(80));
  console.log('📝 LATEST BLOG POST (AI-REPHRASED)');
  console.log('='.repeat(80));
  console.log(`\nTitle: ${article.title}`);
  console.log(`Category: ${article.category.name}`);
  console.log(`Source: ${article.sourceName}`);
  console.log(`Length: ${article.content.length} characters`);
  console.log(`Word Count: ~${Math.round(article.content.length / 5)} words`);
  console.log('\n' + '-'.repeat(80));
  console.log('EXCERPT:');
  console.log('-'.repeat(80));
  console.log(article.excerpt);
  console.log('\n' + '-'.repeat(80));
  console.log('FULL CONTENT:');
  console.log('-'.repeat(80));
  console.log(article.content);
  console.log('\n' + '='.repeat(80));
  console.log('\n💡 This is the new BLOG FORMAT with 2-3x expansion!');
  console.log('   Visit http://localhost:3000 to see it on the website.');
  console.log('='.repeat(80) + '\n');

  await prisma.$disconnect();
}

showLatest();
