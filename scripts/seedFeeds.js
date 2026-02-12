const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Comprehensive list of sources from multiTenantFeeds.ts
const MULTI_TENANT_FEEDS = {
    INDIA: {
        sources: [
            {
                name: 'The Hindu',
                feeds: {
                    homepage: 'https://www.thehindu.com/feeder/default.rss',
                    news: 'https://www.thehindu.com/news/national/feeder/default.rss',
                    world: 'https://www.thehindu.com/news/international/feeder/default.rss',
                    business: 'https://www.thehindu.com/business/feeder/default.rss',
                    sports: 'https://www.thehindu.com/sport/feeder/default.rss',
                    technology: 'https://www.thehindu.com/sci-tech/feeder/default.rss',
                }
            },
            {
                name: 'Times of India',
                feeds: {
                    homepage: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
                    news: 'https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms',
                    world: 'https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms',
                    business: 'https://timesofindia.indiatimes.com/rssfeeds/4719148.cms',
                    sports: 'https://timesofindia.indiatimes.com/rssfeeds/4719161.cms',
                }
            },
            {
                name: 'NDTV',
                feeds: {
                    homepage: 'https://feeds.feedburner.com/ndtvnews-top-stories',
                    news: 'https://feeds.feedburner.com/ndtvnews-india-news',
                    world: 'https://feeds.feedburner.com/ndtvnews-world-news',
                    business: 'https://feeds.feedburner.com/ndtvnews-business',
                    sports: 'https://feeds.feedburner.com/ndtvsports-latest',
                    technology: 'https://feeds.feedburner.com/gadgets360-latest',
                }
            },
        ]
    },
    UNITED_STATES: {
        sources: [
            {
                name: 'The New York Times',
                feeds: {
                    homepage: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
                    world: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
                    news: 'https://rss.nytimes.com/services/xml/rss/nyt/US.xml',
                    politics: 'https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml',
                    business: 'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
                    technology: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
                    sports: 'https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml',
                    science: 'https://rss.nytimes.com/services/xml/rss/nyt/Science.xml',
                }
            },
            {
                name: 'CNN',
                feeds: {
                    homepage: 'http://rss.cnn.com/rss/cnn_topstories.rss',
                    world: 'http://rss.cnn.com/rss/cnn_world.rss',
                    news: 'http://rss.cnn.com/rss/cnn_us.rss',
                    business: 'http://rss.cnn.com/rss/money_latest.rss',
                    technology: 'http://rss.cnn.com/rss/cnn_tech.rss',
                    entertainment: 'http://rss.cnn.com/rss/cnn_showbiz.rss',
                }
            }
        ]
    },
    UNITED_KINGDOM: {
        sources: [
            {
                name: 'BBC News',
                feeds: {
                    homepage: 'https://feeds.bbci.co.uk/news/rss.xml',
                    world: 'https://feeds.bbci.co.uk/news/world/rss.xml',
                    news: 'https://feeds.bbci.co.uk/news/uk/rss.xml',
                    business: 'https://feeds.bbci.co.uk/news/business/rss.xml',
                    politics: 'https://feeds.bbci.co.uk/news/politics/rss.xml',
                }
            },
            {
                name: 'The Guardian',
                feeds: {
                    homepage: 'https://www.theguardian.com/international/rss',
                    world: 'https://www.theguardian.com/world/rss',
                    news: 'https://www.theguardian.com/uk-news/rss',
                    business: 'https://www.theguardian.com/uk/business/rss',
                }
            }
        ]
    },
    AUSTRALIA: {
        sources: [
            {
                name: 'ABC News Australia',
                feeds: {
                    homepage: 'https://www.abc.net.au/news/feed/45924/rss.xml',
                    news: 'https://www.abc.net.au/news/feed/51120/rss.xml',
                    world: 'https://www.abc.net.au/news/feed/46182/rss.xml',
                }
            }
        ]
    },
    CANADA: {
        sources: [
            {
                name: 'CBC News',
                feeds: {
                    homepage: 'https://www.cbc.ca/webfeed/rss/rss-topstories',
                    news: 'https://www.cbc.ca/webfeed/rss/rss-canada',
                    world: 'https://www.cbc.ca/webfeed/rss/rss-world',
                }
            }
        ]
    }
};

async function main() {
    console.log('Seeding ALL news sources...');

    const sourcesToCreate = [];

    for (const [country, data] of Object.entries(MULTI_TENANT_FEEDS)) {
        for (const source of data.sources) {
            for (const [category, url] of Object.entries(source.feeds)) {
                sourcesToCreate.push({
                    country,
                    name: source.name,
                    category,
                    url,
                    active: true
                });
            }
        }
    }

    for (const source of sourcesToCreate) {
        await prisma.newsSource.upsert({
            where: {
                country_name_category: {
                    country: source.country,
                    name: source.name,
                    category: source.category
                }
            },
            update: { url: source.url },
            create: source
        });
    }

    console.log(`Seeding completed. ${sourcesToCreate.length} sources processed.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
