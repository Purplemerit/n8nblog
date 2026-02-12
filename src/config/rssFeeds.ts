import { FeedCategory } from '@/types/rss';

export const RSS_FEEDS: Record<FeedCategory, string> = {
  homepage: 'https://www.thehindu.com/feeder/default.rss',
  news: 'https://www.thehindu.com/news/feeder/default.rss',
  national: 'https://www.thehindu.com/news/national/feeder/default.rss',
  international: 'https://www.thehindu.com/news/international/feeder/default.rss',
  business: 'https://www.thehindu.com/business/feeder/default.rss',
  sport: 'https://www.thehindu.com/sport/feeder/default.rss',
  entertainment: 'https://www.thehindu.com/entertainment/feeder/default.rss',
  technology: 'https://www.thehindu.com/sci-tech/technology/feeder/default.rss',
  'sci-tech': 'https://www.thehindu.com/sci-tech/feeder/default.rss',
  opinion: 'https://www.thehindu.com/opinion/feeder/default.rss',
};

// Map navbar categories to RSS feed categories
export const CATEGORY_FEED_MAP: Record<string, FeedCategory> = {
  entertainment: 'entertainment',
  sports: 'sport',
  politics: 'news',
  business: 'business',
  technology: 'technology',
};

// Cache duration in milliseconds (15 minutes)
export const CACHE_DURATION = 15 * 60 * 1000;
