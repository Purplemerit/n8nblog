import { NewsArticle } from '@/types/rss';

/**
 * Safely convert any value to string
 */
function safeText(text: any): string {
  if (!text) return '';
  if (typeof text === 'string') return text;

  // Handle XML parser objects with _ key
  if (typeof text === 'object' && text._) {
    return String(text._);
  }

  // Try to convert to string
  try {
    return String(text);
  } catch (e) {
    return '';
  }
}

/**
 * Generate a URL-safe slug from article title
 */
export function generateSlug(title: string): string {
  const safeTitle = safeText(title);
  return safeTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 100);
}

/**
 * Generate internal article URL using slug
 * For database articles: use article.slug if available
 * For RSS articles (legacy): generate slug from title
 */
export function getArticleUrl(article: NewsArticle | any): string {
  // If article has a slug property (from database), use it
  if (article.slug) {
    return `/article/${article.slug}`;
  }

  // Otherwise, generate slug from title (for compatibility with RSS articles)
  const slug = generateSlug(article.title);
  return `/article/${slug}`;
}
