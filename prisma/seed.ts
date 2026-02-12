import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Categories to seed
const categories = [
  { name: 'News', slug: 'news' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Business', slug: 'business' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Entertainment', slug: 'entertainment' },
  { name: 'Politics', slug: 'politics' },
  { name: 'Science', slug: 'science' },
  { name: 'Health', slug: 'health' },
  { name: 'World', slug: 'world' },
];

// Comprehensive news sources from all countries
const newsSources = [
  // INDIA
  { country: 'INDIA', name: 'Times of India', category: 'homepage', url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms' },
  { country: 'INDIA', name: 'Times of India', category: 'news', url: 'https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms' },
  { country: 'INDIA', name: 'Times of India', category: 'world', url: 'https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms' },
  { country: 'INDIA', name: 'Times of India', category: 'business', url: 'https://timesofindia.indiatimes.com/rssfeeds/4719148.cms' },
  { country: 'INDIA', name: 'Times of India', category: 'sports', url: 'https://timesofindia.indiatimes.com/rssfeeds/4719161.cms' },

  { country: 'INDIA', name: 'The Hindu', category: 'homepage', url: 'https://www.thehindu.com/feeder/default.rss' },
  { country: 'INDIA', name: 'The Hindu', category: 'news', url: 'https://www.thehindu.com/news/national/feeder/default.rss' },
  { country: 'INDIA', name: 'The Hindu', category: 'world', url: 'https://www.thehindu.com/news/international/feeder/default.rss' },
  { country: 'INDIA', name: 'The Hindu', category: 'business', url: 'https://www.thehindu.com/business/feeder/default.rss' },
  { country: 'INDIA', name: 'The Hindu', category: 'sports', url: 'https://www.thehindu.com/sport/feeder/default.rss' },
  { country: 'INDIA', name: 'The Hindu', category: 'technology', url: 'https://www.thehindu.com/sci-tech/feeder/default.rss' },

  { country: 'INDIA', name: 'Hindustan Times', category: 'news', url: 'https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml' },
  { country: 'INDIA', name: 'Hindustan Times', category: 'world', url: 'https://www.hindustantimes.com/feeds/rss/world-news/rssfeed.xml' },
  { country: 'INDIA', name: 'Hindustan Times', category: 'business', url: 'https://www.hindustantimes.com/feeds/rss/business/rssfeed.xml' },
  { country: 'INDIA', name: 'Hindustan Times', category: 'sports', url: 'https://www.hindustantimes.com/feeds/rss/sports/rssfeed.xml' },
  { country: 'INDIA', name: 'Hindustan Times', category: 'entertainment', url: 'https://www.hindustantimes.com/feeds/rss/entertainment/rssfeed.xml' },

  { country: 'INDIA', name: 'The Indian Express', category: 'homepage', url: 'https://indianexpress.com/feed/' },
  { country: 'INDIA', name: 'The Indian Express', category: 'news', url: 'https://indianexpress.com/section/india/feed/' },
  { country: 'INDIA', name: 'The Indian Express', category: 'world', url: 'https://indianexpress.com/section/world/feed/' },
  { country: 'INDIA', name: 'The Indian Express', category: 'business', url: 'https://indianexpress.com/section/business/feed/' },
  { country: 'INDIA', name: 'The Indian Express', category: 'sports', url: 'https://indianexpress.com/section/sports/feed/' },
  { country: 'INDIA', name: 'The Indian Express', category: 'technology', url: 'https://indianexpress.com/section/technology/feed/' },

  { country: 'INDIA', name: 'NDTV', category: 'homepage', url: 'https://feeds.feedburner.com/ndtvnews-top-stories' },
  { country: 'INDIA', name: 'NDTV', category: 'news', url: 'https://feeds.feedburner.com/ndtvnews-india-news' },
  { country: 'INDIA', name: 'NDTV', category: 'world', url: 'https://feeds.feedburner.com/ndtvnews-world-news' },
  { country: 'INDIA', name: 'NDTV', category: 'business', url: 'https://feeds.feedburner.com/ndtvnews-business' },
  { country: 'INDIA', name: 'NDTV', category: 'sports', url: 'https://feeds.feedburner.com/ndtvsports-latest' },
  { country: 'INDIA', name: 'NDTV', category: 'technology', url: 'https://feeds.feedburner.com/gadgets360-latest' },

  // UNITED STATES
  { country: 'UNITED_STATES', name: 'The New York Times', category: 'homepage', url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml' },
  { country: 'UNITED_STATES', name: 'The New York Times', category: 'world', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml' },
  { country: 'UNITED_STATES', name: 'The New York Times', category: 'news', url: 'https://rss.nytimes.com/services/xml/rss/nyt/US.xml' },
  { country: 'UNITED_STATES', name: 'The New York Times', category: 'politics', url: 'https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml' },
  { country: 'UNITED_STATES', name: 'The New York Times', category: 'business', url: 'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml' },
  { country: 'UNITED_STATES', name: 'The New York Times', category: 'technology', url: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml' },
  { country: 'UNITED_STATES', name: 'The New York Times', category: 'sports', url: 'https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml' },
  { country: 'UNITED_STATES', name: 'The New York Times', category: 'science', url: 'https://rss.nytimes.com/services/xml/rss/nyt/Science.xml' },

  { country: 'UNITED_STATES', name: 'CNN', category: 'homepage', url: 'http://rss.cnn.com/rss/cnn_topstories.rss' },
  { country: 'UNITED_STATES', name: 'CNN', category: 'world', url: 'http://rss.cnn.com/rss/cnn_world.rss' },
  { country: 'UNITED_STATES', name: 'CNN', category: 'news', url: 'http://rss.cnn.com/rss/cnn_us.rss' },
  { country: 'UNITED_STATES', name: 'CNN', category: 'business', url: 'http://rss.cnn.com/rss/money_latest.rss' },
  { country: 'UNITED_STATES', name: 'CNN', category: 'technology', url: 'http://rss.cnn.com/rss/cnn_tech.rss' },
  { country: 'UNITED_STATES', name: 'CNN', category: 'entertainment', url: 'http://rss.cnn.com/rss/cnn_showbiz.rss' },

  { country: 'UNITED_STATES', name: 'NPR', category: 'homepage', url: 'https://feeds.npr.org/1001/rss.xml' },
  { country: 'UNITED_STATES', name: 'NPR', category: 'news', url: 'https://feeds.npr.org/1003/rss.xml' },
  { country: 'UNITED_STATES', name: 'NPR', category: 'world', url: 'https://feeds.npr.org/1004/rss.xml' },
  { country: 'UNITED_STATES', name: 'NPR', category: 'politics', url: 'https://feeds.npr.org/1014/rss.xml' },
  { country: 'UNITED_STATES', name: 'NPR', category: 'business', url: 'https://feeds.npr.org/1006/rss.xml' },
  { country: 'UNITED_STATES', name: 'NPR', category: 'technology', url: 'https://feeds.npr.org/1019/rss.xml' },

  { country: 'UNITED_STATES', name: 'TechCrunch', category: 'homepage', url: 'https://techcrunch.com/feed/' },
  { country: 'UNITED_STATES', name: 'TechCrunch', category: 'technology', url: 'https://techcrunch.com/category/startups/feed/' },

  { country: 'UNITED_STATES', name: 'The Verge', category: 'homepage', url: 'https://www.theverge.com/rss/index.xml' },
  { country: 'UNITED_STATES', name: 'The Verge', category: 'technology', url: 'https://www.theverge.com/tech/rss/index.xml' },
  { country: 'UNITED_STATES', name: 'The Verge', category: 'science', url: 'https://www.theverge.com/science/rss/index.xml' },

  // UNITED KINGDOM
  { country: 'UNITED_KINGDOM', name: 'BBC News', category: 'homepage', url: 'https://feeds.bbci.co.uk/news/rss.xml' },
  { country: 'UNITED_KINGDOM', name: 'BBC News', category: 'world', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
  { country: 'UNITED_KINGDOM', name: 'BBC News', category: 'news', url: 'https://feeds.bbci.co.uk/news/uk/rss.xml' },
  { country: 'UNITED_KINGDOM', name: 'BBC News', category: 'business', url: 'https://feeds.bbci.co.uk/news/business/rss.xml' },
  { country: 'UNITED_KINGDOM', name: 'BBC News', category: 'politics', url: 'https://feeds.bbci.co.uk/news/politics/rss.xml' },
  { country: 'UNITED_KINGDOM', name: 'BBC News', category: 'technology', url: 'https://feeds.bbci.co.uk/news/technology/rss.xml' },
  { country: 'UNITED_KINGDOM', name: 'BBC News', category: 'science', url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml' },
  { country: 'UNITED_KINGDOM', name: 'BBC News', category: 'health', url: 'https://feeds.bbci.co.uk/news/health/rss.xml' },
  { country: 'UNITED_KINGDOM', name: 'BBC News', category: 'entertainment', url: 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml' },
  { country: 'UNITED_KINGDOM', name: 'BBC News', category: 'sports', url: 'https://feeds.bbci.co.uk/sport/rss.xml' },

  { country: 'UNITED_KINGDOM', name: 'The Guardian', category: 'homepage', url: 'https://www.theguardian.com/international/rss' },
  { country: 'UNITED_KINGDOM', name: 'The Guardian', category: 'world', url: 'https://www.theguardian.com/world/rss' },
  { country: 'UNITED_KINGDOM', name: 'The Guardian', category: 'news', url: 'https://www.theguardian.com/uk-news/rss' },
  { country: 'UNITED_KINGDOM', name: 'The Guardian', category: 'politics', url: 'https://www.theguardian.com/politics/rss' },
  { country: 'UNITED_KINGDOM', name: 'The Guardian', category: 'business', url: 'https://www.theguardian.com/uk/business/rss' },
  { country: 'UNITED_KINGDOM', name: 'The Guardian', category: 'technology', url: 'https://www.theguardian.com/uk/technology/rss' },
  { country: 'UNITED_KINGDOM', name: 'The Guardian', category: 'sports', url: 'https://www.theguardian.com/uk/sport/rss' },
  { country: 'UNITED_KINGDOM', name: 'The Guardian', category: 'science', url: 'https://www.theguardian.com/science/rss' },

  // AUSTRALIA
  { country: 'AUSTRALIA', name: 'ABC News Australia', category: 'homepage', url: 'https://www.abc.net.au/news/feed/45924/rss.xml' },
  { country: 'AUSTRALIA', name: 'ABC News Australia', category: 'news', url: 'https://www.abc.net.au/news/feed/51120/rss.xml' },
  { country: 'AUSTRALIA', name: 'ABC News Australia', category: 'world', url: 'https://www.abc.net.au/news/feed/46182/rss.xml' },
  { country: 'AUSTRALIA', name: 'ABC News Australia', category: 'business', url: 'https://www.abc.net.au/news/feed/51892/rss.xml' },
  { country: 'AUSTRALIA', name: 'ABC News Australia', category: 'science', url: 'https://www.abc.net.au/news/feed/46190/rss.xml' },
  { country: 'AUSTRALIA', name: 'ABC News Australia', category: 'technology', url: 'https://www.abc.net.au/news/feed/4534422/rss.xml' },

  // CANADA
  { country: 'CANADA', name: 'CBC News', category: 'homepage', url: 'https://www.cbc.ca/webfeed/rss/rss-topstories' },
  { country: 'CANADA', name: 'CBC News', category: 'news', url: 'https://www.cbc.ca/webfeed/rss/rss-canada' },
  { country: 'CANADA', name: 'CBC News', category: 'world', url: 'https://www.cbc.ca/webfeed/rss/rss-world' },
  { country: 'CANADA', name: 'CBC News', category: 'politics', url: 'https://www.cbc.ca/webfeed/rss/rss-politics' },
  { country: 'CANADA', name: 'CBC News', category: 'business', url: 'https://www.cbc.ca/webfeed/rss/rss-business' },
  { country: 'CANADA', name: 'CBC News', category: 'technology', url: 'https://www.cbc.ca/webfeed/rss/rss-technology' },
  { country: 'CANADA', name: 'CBC News', category: 'sports', url: 'https://www.cbc.ca/webfeed/rss/rss-sports' },

  // JAPAN
  { country: 'JAPAN', name: 'The Japan Times', category: 'homepage', url: 'https://www.japantimes.co.jp/feed/' },
  { country: 'JAPAN', name: 'The Japan Times', category: 'news', url: 'https://www.japantimes.co.jp/news/feed/' },
  { country: 'JAPAN', name: 'The Japan Times', category: 'business', url: 'https://www.japantimes.co.jp/business/feed/' },
  { country: 'JAPAN', name: 'The Japan Times', category: 'sports', url: 'https://www.japantimes.co.jp/sports/feed/' },

  { country: 'JAPAN', name: 'NHK World', category: 'homepage', url: 'https://www3.nhk.or.jp/rss/news/cat0.xml' },
  { country: 'JAPAN', name: 'NHK World', category: 'world', url: 'https://www3.nhk.or.jp/rss/news/cat6.xml' },
  { country: 'JAPAN', name: 'NHK World', category: 'business', url: 'https://www3.nhk.or.jp/rss/news/cat5.xml' },
  { country: 'JAPAN', name: 'NHK World', category: 'politics', url: 'https://www3.nhk.or.jp/rss/news/cat4.xml' },
  { country: 'JAPAN', name: 'NHK World', category: 'science', url: 'https://www3.nhk.or.jp/rss/news/cat3.xml' },

  // SINGAPORE
  { country: 'SINGAPORE', name: 'The Straits Times', category: 'news', url: 'https://www.straitstimes.com/news/singapore/rss.xml' },
  { country: 'SINGAPORE', name: 'The Straits Times', category: 'world', url: 'https://www.straitstimes.com/news/world/rss.xml' },
  { country: 'SINGAPORE', name: 'The Straits Times', category: 'business', url: 'https://www.straitstimes.com/news/business/rss.xml' },
  { country: 'SINGAPORE', name: 'The Straits Times', category: 'technology', url: 'https://www.straitstimes.com/news/tech/rss.xml' },
  { country: 'SINGAPORE', name: 'The Straits Times', category: 'sports', url: 'https://www.straitstimes.com/news/sport/rss.xml' },

  // MIDDLE EAST
  { country: 'MIDDLE_EAST', name: 'Al Jazeera', category: 'homepage', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
  { country: 'MIDDLE_EAST', name: 'Al Jazeera', category: 'news', url: 'https://www.aljazeera.com/xml/rss/news_headlines.xml' },
  { country: 'MIDDLE_EAST', name: 'Al Jazeera', category: 'world', url: 'https://www.aljazeera.com/xml/rss/news_world.xml' },
  { country: 'MIDDLE_EAST', name: 'Al Jazeera', category: 'business', url: 'https://www.aljazeera.com/xml/rss/news_economy.xml' },
  { country: 'MIDDLE_EAST', name: 'Al Jazeera', category: 'sports', url: 'https://www.aljazeera.com/xml/rss/news_sports.xml' },
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Seed categories
  console.log('📚 Seeding categories...');
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
  console.log(`✅ Seeded ${categories.length} categories`);

  // Seed system author for blog posts
  console.log('👤 Seeding system author...');
  await prisma.user.upsert({
    where: { email: 'editorial@newsweb.com' },
    update: {
      name: 'Editorial Team',
      role: 'SYSTEM',
    },
    create: {
      email: 'editorial@newsweb.com',
      name: 'Editorial Team',
      role: 'SYSTEM',
      password: null, // No password for system user
    },
  });
  console.log('✅ Seeded system author');

  // Seed news sources
  console.log('📰 Seeding news sources...');
  let seededCount = 0;
  for (const source of newsSources) {
    await prisma.newsSource.upsert({
      where: {
        country_name_category: {
          country: source.country,
          name: source.name,
          category: source.category,
        },
      },
      update: {
        url: source.url,
        active: true,
      },
      create: {
        country: source.country,
        name: source.name,
        category: source.category,
        url: source.url,
        active: true,
      },
    });
    seededCount++;
  }
  console.log(`✅ Seeded ${seededCount} news sources`);

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
