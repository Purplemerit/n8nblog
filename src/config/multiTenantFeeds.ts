// Multi-tenant RSS feed configuration organized by country
export type CountryCode =
  | 'INDIA' | 'UNITED_STATES' | 'UNITED_KINGDOM' | 'AUSTRALIA'
  | 'CANADA' | 'GERMANY' | 'FRANCE' | 'SPAIN' | 'ITALY' | 'NETHERLANDS'
  | 'IRELAND' | 'SWEDEN' | 'NORWAY' | 'SWITZERLAND' | 'JAPAN'
  | 'CHINA' | 'SINGAPORE' | 'SOUTH_KOREA' | 'MALAYSIA' | 'THAILAND'
  | 'PHILIPPINES' | 'INDONESIA' | 'VIETNAM' | 'PAKISTAN' | 'BANGLADESH'
  | 'SRI_LANKA' | 'NEPAL' | 'TAIWAN' | 'MIDDLE_EAST' | 'AFRICA';

export interface NewsSource {
  name: string;
  website: string;
  category: string;
  feeds: {
    homepage?: string;
    news?: string;
    world?: string;
    business?: string;
    sports?: string;
    technology?: string;
    entertainment?: string;
    politics?: string;
    science?: string;
    health?: string;
  };
}

export interface CountryFeeds {
  code: CountryCode;
  name: string;
  sources: NewsSource[];
}

export const MULTI_TENANT_FEEDS: Record<CountryCode, CountryFeeds> = {
  INDIA: {
    code: 'INDIA',
    name: 'India',
    sources: [
      {
        name: 'The Hindu',
        website: 'https://www.thehindu.com',
        category: 'News',
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
        website: 'https://timesofindia.indiatimes.com',
        category: 'News',
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
        website: 'https://www.ndtv.com',
        category: 'News',
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
    code: 'UNITED_STATES',
    name: 'United States',
    sources: [
      {
        name: 'The New York Times',
        website: 'https://www.nytimes.com',
        category: 'News',
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
        website: 'https://www.cnn.com',
        category: 'News',
        feeds: {
          homepage: 'http://rss.cnn.com/rss/cnn_topstories.rss',
          world: 'http://rss.cnn.com/rss/cnn_world.rss',
          news: 'http://rss.cnn.com/rss/cnn_us.rss',
          business: 'http://rss.cnn.com/rss/money_latest.rss',
          technology: 'http://rss.cnn.com/rss/cnn_tech.rss',
          entertainment: 'http://rss.cnn.com/rss/cnn_showbiz.rss',
          health: 'http://rss.cnn.com/rss/cnn_health.rss',
        }
      },
      {
        name: 'NPR',
        website: 'https://www.npr.org',
        category: 'News',
        feeds: {
          homepage: 'https://feeds.npr.org/1001/rss.xml',
          news: 'https://feeds.npr.org/1003/rss.xml',
          world: 'https://feeds.npr.org/1004/rss.xml',
          politics: 'https://feeds.npr.org/1014/rss.xml',
          business: 'https://feeds.npr.org/1006/rss.xml',
          technology: 'https://feeds.npr.org/1019/rss.xml',
        }
      },
    ]
  },

  UNITED_KINGDOM: {
    code: 'UNITED_KINGDOM',
    name: 'United Kingdom',
    sources: [
      {
        name: 'BBC News',
        website: 'https://www.bbc.com/news',
        category: 'News',
        feeds: {
          homepage: 'https://feeds.bbci.co.uk/news/rss.xml',
          world: 'https://feeds.bbci.co.uk/news/world/rss.xml',
          news: 'https://feeds.bbci.co.uk/news/uk/rss.xml',
          business: 'https://feeds.bbci.co.uk/news/business/rss.xml',
          politics: 'https://feeds.bbci.co.uk/news/politics/rss.xml',
          technology: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
          science: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
          health: 'https://feeds.bbci.co.uk/news/health/rss.xml',
          entertainment: 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',
          sports: 'https://feeds.bbci.co.uk/sport/rss.xml',
        }
      },
      {
        name: 'The Guardian',
        website: 'https://www.theguardian.com',
        category: 'News',
        feeds: {
          homepage: 'https://www.theguardian.com/international/rss',
          world: 'https://www.theguardian.com/world/rss',
          news: 'https://www.theguardian.com/uk-news/rss',
          politics: 'https://www.theguardian.com/politics/rss',
          business: 'https://www.theguardian.com/uk/business/rss',
          technology: 'https://www.theguardian.com/uk/technology/rss',
          sports: 'https://www.theguardian.com/uk/sport/rss',
          science: 'https://www.theguardian.com/science/rss',
        }
      },
      {
        name: 'Sky News',
        website: 'https://news.sky.com',
        category: 'News',
        feeds: {
          homepage: 'https://feeds.skynews.com/feeds/rss/home.xml',
          news: 'https://feeds.skynews.com/feeds/rss/uk.xml',
          world: 'https://feeds.skynews.com/feeds/rss/world.xml',
          business: 'https://feeds.skynews.com/feeds/rss/business.xml',
          politics: 'https://feeds.skynews.com/feeds/rss/politics.xml',
          technology: 'https://feeds.skynews.com/feeds/rss/technology.xml',
          entertainment: 'https://feeds.skynews.com/feeds/rss/entertainment.xml',
        }
      },
    ]
  },

  AUSTRALIA: {
    code: 'AUSTRALIA',
    name: 'Australia',
    sources: [
      {
        name: 'ABC News Australia',
        website: 'https://www.abc.net.au/news',
        category: 'News',
        feeds: {
          homepage: 'https://www.abc.net.au/news/feed/45924/rss.xml',
          news: 'https://www.abc.net.au/news/feed/51120/rss.xml',
          world: 'https://www.abc.net.au/news/feed/46182/rss.xml',
          business: 'https://www.abc.net.au/news/feed/51892/rss.xml',
          science: 'https://www.abc.net.au/news/feed/46190/rss.xml',
          health: 'https://www.abc.net.au/news/feed/46180/rss.xml',
          technology: 'https://www.abc.net.au/news/feed/4534422/rss.xml',
        }
      },
      {
        name: 'The Sydney Morning Herald',
        website: 'https://www.smh.com.au',
        category: 'News',
        feeds: {
          homepage: 'https://www.smh.com.au/rss/feed.xml',
          news: 'https://www.smh.com.au/rss/national.xml',
          world: 'https://www.smh.com.au/rss/world.xml',
          business: 'https://www.smh.com.au/rss/business.xml',
          technology: 'https://www.smh.com.au/rss/technology.xml',
          sports: 'https://www.smh.com.au/rss/sport.xml',
        }
      },
    ]
  },

  CANADA: {
    code: 'CANADA',
    name: 'Canada',
    sources: [
      {
        name: 'CBC News',
        website: 'https://www.cbc.ca/news',
        category: 'News',
        feeds: {
          homepage: 'https://www.cbc.ca/webfeed/rss/rss-topstories',
          news: 'https://www.cbc.ca/webfeed/rss/rss-canada',
          world: 'https://www.cbc.ca/webfeed/rss/rss-world',
          politics: 'https://www.cbc.ca/webfeed/rss/rss-politics',
          business: 'https://www.cbc.ca/webfeed/rss/rss-business',
          technology: 'https://www.cbc.ca/webfeed/rss/rss-technology',
          health: 'https://www.cbc.ca/webfeed/rss/rss-health',
          sports: 'https://www.cbc.ca/webfeed/rss/rss-sports',
        }
      },
      {
        name: 'The Globe and Mail',
        website: 'https://www.theglobeandmail.com',
        category: 'News',
        feeds: {
          news: 'https://www.theglobeandmail.com/arc/outboundfeeds/rss/category/canada/',
          world: 'https://www.theglobeandmail.com/arc/outboundfeeds/rss/category/world/',
          business: 'https://www.theglobeandmail.com/arc/outboundfeeds/rss/category/business/',
          politics: 'https://www.theglobeandmail.com/arc/outboundfeeds/rss/category/politics/',
          sports: 'https://www.theglobeandmail.com/arc/outboundfeeds/rss/category/sports/',
        }
      },
    ]
  },

  GERMANY: {
    code: 'GERMANY',
    name: 'Germany',
    sources: [
      {
        name: 'Deutsche Welle',
        website: 'https://www.dw.com',
        category: 'News (English)',
        feeds: {
          homepage: 'https://rss.dw.com/rdf/rss-en-all',
          news: 'https://rss.dw.com/rdf/rss-en-top',
          world: 'https://rss.dw.com/rdf/rss-en-world',
          business: 'https://rss.dw.com/rdf/rss-en-bus',
          science: 'https://rss.dw.com/rdf/rss-en-sci',
        }
      },
    ]
  },

  FRANCE: {
    code: 'FRANCE',
    name: 'France',
    sources: [
      {
        name: 'France 24',
        website: 'https://www.france24.com',
        category: 'News (English)',
        feeds: {
          homepage: 'https://www.france24.com/en/rss',
          news: 'https://www.france24.com/en/france/rss',
        }
      },
    ]
  },

  SPAIN: {
    code: 'SPAIN',
    name: 'Spain',
    sources: [
      {
        name: 'El País',
        website: 'https://english.elpais.com',
        category: 'News (English)',
        feeds: {
          homepage: 'https://feeds.elpais.com/mrss-s/pages/ep/site/english.elpais.com/portada',
        }
      },
    ]
  },

  ITALY: {
    code: 'ITALY',
    name: 'Italy',
    sources: [
      {
        name: 'ANSA',
        website: 'https://www.ansa.it/english',
        category: 'News (English)',
        feeds: {
          homepage: 'https://www.ansa.it/english/english.rss',
        }
      },
    ]
  },

  NETHERLANDS: {
    code: 'NETHERLANDS',
    name: 'Netherlands',
    sources: [
      {
        name: 'Dutch News',
        website: 'https://www.dutchnews.nl',
        category: 'News (English)',
        feeds: {
          homepage: 'https://www.dutchnews.nl/feed/',
        }
      },
    ]
  },

  IRELAND: {
    code: 'IRELAND',
    name: 'Ireland',
    sources: [
      {
        name: 'RTÉ News',
        website: 'https://www.rte.ie/news',
        category: 'News',
        feeds: {
          homepage: 'https://www.rte.ie/news/rss/news-headlines.xml',
          news: 'https://www.rte.ie/news/rss/ireland.xml',
          world: 'https://www.rte.ie/news/rss/world.xml',
          business: 'https://www.rte.ie/news/rss/business.xml',
          politics: 'https://www.rte.ie/news/rss/politics.xml',
        }
      },
    ]
  },

  SWEDEN: {
    code: 'SWEDEN',
    name: 'Sweden',
    sources: [
      {
        name: 'The Local Sweden',
        website: 'https://www.thelocal.se',
        category: 'News (English)',
        feeds: {
          homepage: 'https://www.thelocal.se/feed',
        }
      },
    ]
  },

  NORWAY: {
    code: 'NORWAY',
    name: 'Norway',
    sources: [
      {
        name: 'The Local Norway',
        website: 'https://www.thelocal.no',
        category: 'News (English)',
        feeds: {
          homepage: 'https://www.thelocal.no/feed',
        }
      },
    ]
  },

  SWITZERLAND: {
    code: 'SWITZERLAND',
    name: 'Switzerland',
    sources: [
      {
        name: 'Swissinfo',
        website: 'https://www.swissinfo.ch',
        category: 'News (English)',
        feeds: {
          homepage: 'https://www.swissinfo.ch/eng/rss/all-news',
        }
      },
    ]
  },

  JAPAN: {
    code: 'JAPAN',
    name: 'Japan',
    sources: [
      {
        name: 'The Japan Times',
        website: 'https://www.japantimes.co.jp',
        category: 'News (English)',
        feeds: {
          homepage: 'https://www.japantimes.co.jp/feed/',
          news: 'https://www.japantimes.co.jp/news/feed/',
          business: 'https://www.japantimes.co.jp/business/feed/',
          sports: 'https://www.japantimes.co.jp/sports/feed/',
        }
      },
      {
        name: 'NHK World',
        website: 'https://www3.nhk.or.jp/nhkworld',
        category: 'News (English)',
        feeds: {
          homepage: 'https://www3.nhk.or.jp/rss/news/cat0.xml',
          world: 'https://www3.nhk.or.jp/rss/news/cat6.xml',
          business: 'https://www3.nhk.or.jp/rss/news/cat5.xml',
          politics: 'https://www3.nhk.or.jp/rss/news/cat4.xml',
          science: 'https://www3.nhk.or.jp/rss/news/cat3.xml',
        }
      },
    ]
  },

  CHINA: {
    code: 'CHINA',
    name: 'China / Hong Kong',
    sources: [
      {
        name: 'South China Morning Post',
        website: 'https://www.scmp.com',
        category: 'News (English)',
        feeds: {
          homepage: 'https://www.scmp.com/rss/91/feed',
          news: 'https://www.scmp.com/rss/2/feed',
          world: 'https://www.scmp.com/rss/5/feed',
          business: 'https://www.scmp.com/rss/92/feed',
          technology: 'https://www.scmp.com/rss/36/feed',
        }
      },
    ]
  },

  SINGAPORE: {
    code: 'SINGAPORE',
    name: 'Singapore',
    sources: [
      {
        name: 'The Straits Times',
        website: 'https://www.straitstimes.com',
        category: 'News',
        feeds: {
          news: 'https://www.straitstimes.com/news/singapore/rss.xml',
          world: 'https://www.straitstimes.com/news/world/rss.xml',
          business: 'https://www.straitstimes.com/news/business/rss.xml',
          technology: 'https://www.straitstimes.com/news/tech/rss.xml',
          sports: 'https://www.straitstimes.com/news/sport/rss.xml',
        }
      },
      {
        name: 'Channel News Asia',
        website: 'https://www.channelnewsasia.com',
        category: 'News',
        feeds: {
          homepage: 'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml',
        }
      },
    ]
  },

  SOUTH_KOREA: {
    code: 'SOUTH_KOREA',
    name: 'South Korea',
    sources: [
      {
        name: 'The Korea Herald',
        website: 'https://www.koreaherald.com',
        category: 'News (English)',
        feeds: {
          homepage: 'https://www.koreaherald.com/common/rss_xml.php',
          business: 'https://www.koreaherald.com/common/rss_xml.php?ct=103',
        }
      },
    ]
  },

  MALAYSIA: {
    code: 'MALAYSIA',
    name: 'Malaysia',
    sources: [
      {
        name: 'The Star',
        website: 'https://www.thestar.com.my',
        category: 'News',
        feeds: {
          news: 'https://www.thestar.com.my/rss/news/nation',
          world: 'https://www.thestar.com.my/rss/news/world',
          business: 'https://www.thestar.com.my/rss/business',
          technology: 'https://www.thestar.com.my/rss/tech',
          sports: 'https://www.thestar.com.my/rss/sport',
        }
      },
    ]
  },

  THAILAND: {
    code: 'THAILAND',
    name: 'Thailand',
    sources: [
      {
        name: 'Bangkok Post',
        website: 'https://www.bangkokpost.com',
        category: 'News (English)',
        feeds: {
          homepage: 'https://www.bangkokpost.com/rss/data/topstories.xml',
          news: 'https://www.bangkokpost.com/rss/data/news.xml',
          business: 'https://www.bangkokpost.com/rss/data/business.xml',
          technology: 'https://www.bangkokpost.com/rss/data/tech.xml',
        }
      },
    ]
  },

  PHILIPPINES: {
    code: 'PHILIPPINES',
    name: 'Philippines',
    sources: [
      {
        name: 'Rappler',
        website: 'https://www.rappler.com',
        category: 'News',
        feeds: {
          homepage: 'https://www.rappler.com/feed/',
          news: 'https://www.rappler.com/nation/feed/',
          world: 'https://www.rappler.com/world/feed/',
          business: 'https://www.rappler.com/business/feed/',
          technology: 'https://www.rappler.com/technology/feed/',
        }
      },
    ]
  },

  INDONESIA: {
    code: 'INDONESIA',
    name: 'Indonesia',
    sources: [
      {
        name: 'The Jakarta Post',
        website: 'https://www.thejakartapost.com',
        category: 'News (English)',
        feeds: {
          homepage: 'https://www.thejakartapost.com/rss.xml',
          news: 'https://www.thejakartapost.com/feed/indonesia',
          world: 'https://www.thejakartapost.com/feed/world',
          business: 'https://www.thejakartapost.com/feed/business',
        }
      },
    ]
  },

  VIETNAM: {
    code: 'VIETNAM',
    name: 'Vietnam',
    sources: [
      {
        name: 'VnExpress International',
        website: 'https://e.vnexpress.net',
        category: 'News (English)',
        feeds: {
          homepage: 'https://e.vnexpress.net/rss/news.rss',
          business: 'https://e.vnexpress.net/rss/business.rss',
          sports: 'https://e.vnexpress.net/rss/sports.rss',
        }
      },
    ]
  },

  PAKISTAN: {
    code: 'PAKISTAN',
    name: 'Pakistan',
    sources: [
      {
        name: 'Dawn',
        website: 'https://www.dawn.com',
        category: 'News',
        feeds: {
          homepage: 'https://www.dawn.com/feeds/home',
          news: 'https://www.dawn.com/feeds/pakistan',
          world: 'https://www.dawn.com/feeds/world',
          business: 'https://www.dawn.com/feeds/business',
          sports: 'https://www.dawn.com/feeds/sport',
          technology: 'https://www.dawn.com/feeds/tech',
        }
      },
    ]
  },

  BANGLADESH: {
    code: 'BANGLADESH',
    name: 'Bangladesh',
    sources: [
      {
        name: 'The Daily Star',
        website: 'https://www.thedailystar.net',
        category: 'News',
        feeds: {
          homepage: 'https://www.thedailystar.net/frontpage/rss.xml',
          news: 'https://www.thedailystar.net/news/bangladesh/rss.xml',
          world: 'https://www.thedailystar.net/news/world/rss.xml',
          business: 'https://www.thedailystar.net/business/rss.xml',
          sports: 'https://www.thedailystar.net/sports/rss.xml',
        }
      },
    ]
  },

  SRI_LANKA: {
    code: 'SRI_LANKA',
    name: 'Sri Lanka',
    sources: [
      {
        name: 'Daily Mirror',
        website: 'https://www.dailymirror.lk',
        category: 'News',
        feeds: {
          homepage: 'https://www.dailymirror.lk/RSS_Feed/90',
        }
      },
    ]
  },

  NEPAL: {
    code: 'NEPAL',
    name: 'Nepal',
    sources: [
      {
        name: 'The Kathmandu Post',
        website: 'https://kathmandupost.com',
        category: 'News',
        feeds: {
          homepage: 'https://kathmandupost.com/feed',
        }
      },
    ]
  },

  TAIWAN: {
    code: 'TAIWAN',
    name: 'Taiwan',
    sources: [
      {
        name: 'Taiwan News',
        website: 'https://www.taiwannews.com.tw',
        category: 'News (English)',
        feeds: {
          homepage: 'https://www.taiwannews.com.tw/en/rss',
        }
      },
    ]
  },

  MIDDLE_EAST: {
    code: 'MIDDLE_EAST',
    name: 'Middle East',
    sources: [
      {
        name: 'Al Jazeera',
        website: 'https://www.aljazeera.com',
        category: 'News',
        feeds: {
          homepage: 'https://www.aljazeera.com/xml/rss/all.xml',
          news: 'https://www.aljazeera.com/xml/rss/news_headlines.xml',
          world: 'https://www.aljazeera.com/xml/rss/news_world.xml',
          business: 'https://www.aljazeera.com/xml/rss/news_economy.xml',
          sports: 'https://www.aljazeera.com/xml/rss/news_sports.xml',
        }
      },
      {
        name: 'Gulf News',
        website: 'https://gulfnews.com',
        category: 'News',
        feeds: {
          homepage: 'https://gulfnews.com/rss',
          world: 'https://gulfnews.com/world/rss',
          business: 'https://gulfnews.com/business/rss',
          sports: 'https://gulfnews.com/sport/rss',
          technology: 'https://gulfnews.com/technology/rss',
        }
      },
    ]
  },

  AFRICA: {
    code: 'AFRICA',
    name: 'Africa',
    sources: [
      {
        name: 'BBC Africa',
        website: 'https://www.bbc.com/news/world/africa',
        category: 'News',
        feeds: {
          homepage: 'https://feeds.bbci.co.uk/news/world/africa/rss.xml',
        }
      },
      {
        name: 'Al Jazeera Africa',
        website: 'https://www.aljazeera.com/africa',
        category: 'News',
        feeds: {
          homepage: 'https://www.aljazeera.com/xml/rss/news_africa.xml',
        }
      },
    ]
  },
};

// Map ISO country codes to our CountryCode
export const ISO_TO_COUNTRY_CODE: Record<string, CountryCode> = {
  'IN': 'INDIA',
  'US': 'UNITED_STATES',
  'GB': 'UNITED_KINGDOM',
  'UK': 'UNITED_KINGDOM',
  'AU': 'AUSTRALIA',
  'CA': 'CANADA',
  'DE': 'GERMANY',
  'FR': 'FRANCE',
  'ES': 'SPAIN',
  'IT': 'ITALY',
  'NL': 'NETHERLANDS',
  'IE': 'IRELAND',
  'SE': 'SWEDEN',
  'NO': 'NORWAY',
  'CH': 'SWITZERLAND',
  'JP': 'JAPAN',
  'CN': 'CHINA',
  'HK': 'CHINA',
  'SG': 'SINGAPORE',
  'KR': 'SOUTH_KOREA',
  'MY': 'MALAYSIA',
  'TH': 'THAILAND',
  'PH': 'PHILIPPINES',
  'ID': 'INDONESIA',
  'VN': 'VIETNAM',
  'PK': 'PAKISTAN',
  'BD': 'BANGLADESH',
  'LK': 'SRI_LANKA',
  'NP': 'NEPAL',
  'TW': 'TAIWAN',
  // Middle East countries
  'AE': 'MIDDLE_EAST',
  'SA': 'MIDDLE_EAST',
  'IL': 'MIDDLE_EAST',
  'TR': 'MIDDLE_EAST',
  'QA': 'MIDDLE_EAST',
  'KW': 'MIDDLE_EAST',
  'BH': 'MIDDLE_EAST',
  'OM': 'MIDDLE_EAST',
  'JO': 'MIDDLE_EAST',
  'LB': 'MIDDLE_EAST',
  'IQ': 'MIDDLE_EAST',
  'IR': 'MIDDLE_EAST',
  'SY': 'MIDDLE_EAST',
  'YE': 'MIDDLE_EAST',
  // African countries
  'ZA': 'AFRICA',
  'NG': 'AFRICA',
  'KE': 'AFRICA',
  'GH': 'AFRICA',
  'EG': 'AFRICA',
  'MA': 'AFRICA',
  'TZ': 'AFRICA',
  'UG': 'AFRICA',
  'ET': 'AFRICA',
  'ZW': 'AFRICA',
};

// Get feed URLs for a specific country and category
export function getFeedUrlsForCountry(countryCode: CountryCode, category: 'homepage' | 'news' | 'world' | 'business' | 'sports' | 'technology' | 'entertainment' | 'politics'): string[] {
  const countryData = MULTI_TENANT_FEEDS[countryCode];
  if (!countryData) return [];

  const feedUrls: string[] = [];
  countryData.sources.forEach(source => {
    const feedUrl = source.feeds[category];
    if (feedUrl) {
      feedUrls.push(feedUrl);
    }
  });

  return feedUrls;
}

// Get all available countries
export function getAvailableCountries(): CountryFeeds[] {
  return Object.values(MULTI_TENANT_FEEDS);
}
