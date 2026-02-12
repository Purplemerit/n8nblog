import styles from './Article.module.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { id: slug } = await params;

  // Fetch article from database by slug
  const article = await prisma.article.findUnique({
    where: {
      slug,
      published: true,
    },
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (!article) {
    notFound();
  }

  // Format date
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const publishDate = formatDate(article.publishedAt || article.createdAt);

  // Calculate reading time
  const calculateReadTime = (text: string): string => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const readTime = calculateReadTime(article.content);

  // Get fallback image by category
  const getFallbackImage = (categorySlug: string): string => {
    const fallbacks: Record<string, string> = {
      news: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=675&fit=crop',
      sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=675&fit=crop',
      business: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=675&fit=crop',
      technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=675&fit=crop',
      entertainment: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=675&fit=crop',
      politics: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=675&fit=crop',
      health: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=675&fit=crop',
      world: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&h=675&fit=crop',
    };
    return fallbacks[categorySlug] || fallbacks.news;
  };

  const displayImage = article.image || getFallbackImage(article.category.slug);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <Link href="/" className={styles.backLink}>
            ← Back to Blog
          </Link>

          <Link href={`/category/${article.category.slug}`} className={styles.categoryBadge}>
            {article.category.name}
          </Link>

          <h1 className={styles.heroTitle}>{article.title}</h1>

          {article.excerpt && (
            <p className={styles.heroExcerpt}>{article.excerpt}</p>
          )}

          <div className={styles.heroMeta}>
            <span>{article.author.name || 'Editorial Team'}</span>
            <span className={styles.metaDot}>•</span>
            <span>{publishDate}</span>
            <span className={styles.metaDot}>•</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img
            src={displayImage}
            alt={article.title}
            className={styles.featuredImage}
          />
        </div>

        {/* Article Content */}
        <article className={styles.article}>
          <div className={styles.articleContent}>
            {article.content.split('\n\n').map((para, i) => (
              para.trim() && <p key={i} className={styles.paragraph}>{para.trim()}</p>
            ))}
          </div>

          {/* Source Attribution */}
          {article.sourceName && (
            <div className={styles.sourceBox}>
              <p className={styles.sourceLabel}>Source</p>
              <p className={styles.sourceName}>{article.sourceName}</p>
            </div>
          )}
        </article>

        {/* Navigation Footer */}
        <div className={styles.articleFooter}>
          <Link href="/" className={styles.footerLink}>
            ← Back to Homepage
          </Link>
          <Link href={`/category/${article.category.slug}`} className={styles.footerLink}>
            More in {article.category.name} →
          </Link>
        </div>
      </div>
    </div>
  );
}

// Generate static params for better performance
export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true },
    take: 100,
    orderBy: { publishedAt: 'desc' },
  });

  return articles.map((article) => ({
    id: article.slug,
  }));
}

// Enable ISR - revalidate every hour
export const revalidate = 3600;

