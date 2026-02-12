import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkSlugs() {
  // Get all articles and check slugs
  const allArticles = await prisma.article.findMany({
    where: { published: true },
    select: { id: true, title: true, slug: true }
  });

  const articlesWithBadSlugs = allArticles.filter(a => !a.slug || a.slug.trim() === '');

  console.log('\n📋 Checking article slugs...\n');

  if (articlesWithBadSlugs.length > 0) {
    console.log(`❌ Found ${articlesWithBadSlugs.length} articles with missing slugs:\n`);
    articlesWithBadSlugs.forEach(a => {
      console.log(`  - ID: ${a.id}`);
      console.log(`    Title: ${a.title}`);
      console.log(`    Slug: ${a.slug || '(empty)'}\n`);
    });
  } else {
    console.log('✅ All published articles have valid slugs!');
  }

  // Get total count
  const total = await prisma.article.count({ where: { published: true } });
  console.log(`\n📊 Total published articles: ${total}`);

  await prisma.$disconnect();
}

checkSlugs();
