export interface RSSFeedItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content?: string;
  contentSnippet?: string;
  guid?: string;
  categories?: string[];
  isoDate?: string;
  enclosure?: {
    url: string;
    type?: string;
    length?: string;
  };
}

export interface RSSFeed {
  items: RSSFeedItem[];
  title?: string;
  description?: string;
  link?: string;
}

export interface NewsArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image?: string;
  category?: string;
  author?: string;
  readTime?: string;
  sourceName?: string;
}

export type FeedCategory =
  | 'homepage'
  | 'news'
  | 'national'
  | 'international'
  | 'business'
  | 'sport'
  | 'entertainment'
  | 'technology'
  | 'opinion'
  | 'sci-tech';
