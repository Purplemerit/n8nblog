import { PrismaClient } from '@prisma/client';
import { fetchAndStoreMultipleSources } from '@/lib/rssParser';

const prisma = new PrismaClient();

/**
 * Initial import script to populate database with blog posts
 * Run with: npx tsx src/scripts/initial-import.ts
 */
async function main() {
  console.log('🚀 Starting initial blog post import...\n');

  try {
    // Get system author
    let systemAuthor = await prisma.user.findUnique({
      where: { email: 'editorial@newsweb.com' },
    });

    if (!systemAuthor) {
      console.log('⚠️  System author not found. Creating...');
      systemAuthor = await prisma.user.create({
        data: {
          email: 'editorial@newsweb.com',
          name: 'Editorial Team',
          role: 'SYSTEM',
          password: null,
        },
      });
      console.log('✅ System author created\n');
    }

    // Get top news sources (limit to avoid overwhelming on first run)
    const topSources = await prisma.newsSource.findMany({
      where: {
        active: true,
        OR: [
          { country: 'INDIA', category: { in: ['news', 'sports', 'business', 'technology'] } },
          { country: 'UNITED_STATES', category: { in: ['news', 'sports', 'business', 'technology'] } },
          { country: 'UNITED_KINGDOM', category: { in: ['news', 'business'] } },
        ],
      },
      take: 20, // Start with 20 sources to test
    });

    console.log(`📰 Found ${topSources.length} news sources to process\n`);

    if (topSources.length === 0) {
      console.log('⚠️  No news sources found. Please run: npm run db:seed');
      return;
    }

    // Process sources
    const startTime = Date.now();
    const result = await fetchAndStoreMultipleSources(
      topSources.map(s => ({
        url: s.url,
        id: s.id,
        name: s.name,
        category: s.category,
      })),
      systemAuthor.id,
      5 // 5 articles per source for initial import
    );

    const duration = Math.round((Date.now() - startTime) / 1000);

    // Display results
    console.log('\n' + '='.repeat(60));
    console.log('📊 IMPORT SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Articles stored: ${result.totalStored}`);
    console.log(`⏭️  Articles skipped: ${result.totalSkipped}`);
    console.log(`⚠️  Errors: ${result.allErrors.length}`);
    console.log(`⏱️  Duration: ${duration} seconds`);
    console.log('='.repeat(60));

    // Show results by source
    if (result.sourceResults.length > 0) {
      console.log('\n📈 Results by Source:');
      result.sourceResults.forEach((source) => {
        console.log(`  • ${source.source}: ${source.stored} stored, ${source.skipped} skipped`);
      });
    }

    // Show errors if any
    if (result.allErrors.length > 0) {
      console.log('\n⚠️  Errors (first 5):');
      result.allErrors.slice(0, 5).forEach((error) => {
        console.log(`  • ${error}`);
      });
      if (result.allErrors.length > 5) {
        console.log(`  ... and ${result.allErrors.length - 5} more`);
      }
    }

    // Final statistics
    const totalArticles = await prisma.article.count();
    const totalByCategory = await prisma.article.groupBy({
      by: ['categoryId'],
      _count: true,
    });

    console.log('\n' + '='.repeat(60));
    console.log('📚 DATABASE STATISTICS');
    console.log('='.repeat(60));
    console.log(`Total articles in database: ${totalArticles}`);
    console.log(`Articles by category:`);

    for (const item of totalByCategory) {
      const category = await prisma.category.findUnique({
        where: { id: item.categoryId },
        select: { name: true },
      });
      console.log(`  • ${category?.name}: ${item._count}`);
    }

    console.log('\n✅ Initial import completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('  1. Add your Gemini API key to .env file');
    console.log('  2. Run the dev server: npm run dev');
    console.log('  3. Visit http://localhost:3000 to see your blog posts');
    console.log('  4. The cron job will run every 12 hours to fetch new content');

  } catch (error: any) {
    console.error('\n❌ Import failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
