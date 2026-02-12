import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const searchTerm = 'senior-tax';

async function findArticle() {
  const articles = await prisma.article.findMany({
    where: {
      slug: {
        contains: searchTerm
      }
    },
    select: { slug: true, title: true, published: true }
  });

  console.log(`\n🔍 Searching for articles containing "${searchTerm}"...\n`);

  if (articles.length === 0) {
    console.log('❌ No articles found with that slug\n');

    // Try searching by title instead
    const byTitle = await prisma.article.findMany({
      where: {
        title: {
          contains: 'senior',
          mode: 'insensitive'
        }
      },
      select: { slug: true, title: true, published: true },
      take: 5
    });

    if (byTitle.length > 0) {
      console.log('📝 Found similar articles by title:\n');
      byTitle.forEach(a => {
        console.log(`Title: ${a.title}`);
        console.log(`Published: ${a.published ? '✅' : '❌'}`);
        console.log(`URL: http://localhost:3000/article/${a.slug}\n`);
      });
    }
  } else {
    console.log(`✅ Found ${articles.length} article(s):\n`);
    articles.forEach(a => {
      console.log(`Title: ${a.title}`);
      console.log(`Published: ${a.published ? '✅' : '❌'}`);
      console.log(`Slug: ${a.slug}`);
      console.log(`URL: http://localhost:3000/article/${a.slug}\n`);
    });
  }

  await prisma.$disconnect();
}

findArticle();
