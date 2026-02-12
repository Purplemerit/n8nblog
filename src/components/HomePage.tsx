'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/page.module.css';
import { useCountry } from '@/contexts/CountryContext';
import { useCategory } from '@/contexts/CategoryContext';
import { NewsArticle } from '@/types/rss';
import BlogCard from '@/components/BlogCard';

function safeText(text: any): string {
  if (!text) return '';
  if (typeof text === 'string') return text;
  if (typeof text === 'object' && text._) return String(text._);
  return String(text);
}

function formatDate(date: any): string {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return String(date);

  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export default function HomePage() {
  const { countryCode, isLoading: countryLoading } = useCountry();
  const { selectedCategory } = useCategory();
  const [articles, setArticles] = useState<Record<string, NewsArticle[]>>({});
  const [loading, setLoading] = useState(true);

  // Newsletter states
  const [subEmail, setSubEmail] = useState('');
  const [subStatus, setSubStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [subLoading, setSubLoading] = useState(false);

  useEffect(() => {
    async function loadArticles() {
      if (countryLoading) return;
      setLoading(true);
      try {
        const categories = ['news', 'business', 'sports', 'technology', 'entertainment', 'politics', 'world', 'health'];
        const allArticles: Record<string, NewsArticle[]> = {};

        await Promise.all(
          categories.map(async (category) => {
            const response = await fetch(`/api/articles?category=${category}&limit=50`);
            if (response.ok) {
              const data = await response.json();
              allArticles[category] = data.articles || [];
            } else {
              allArticles[category] = [];
            }
          })
        );

        setArticles(allArticles);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, [countryCode, countryLoading]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubLoading(true);
    setSubStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subEmail }),
      });
      const data = await res.json();

      if (res.ok) {
        setSubStatus({ type: 'success', message: data.message });
        setSubEmail('');
      } else {
        setSubStatus({ type: 'error', message: data.message || 'Failed to subscribe' });
      }
    } catch {
      setSubStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setSubLoading(false);
    }
  };

  if (loading || countryLoading) {
    return (
      <div className={styles.page}>
        <main className={styles.content}>
          <div style={{ padding: '100px 20px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#666', fontFamily: 'var(--font-fraunces)' }}>Loading blog posts...</p>
          </div>
        </main>
      </div>
    );
  }

  // Get all articles or filtered by category
  const displayArticles = selectedCategory === 'all'
    ? Object.values(articles).flat()
    : articles[selectedCategory] || [];

  return (
    <div className={styles.page}>
      <main className={styles.content}>

        {/* Blog Header */}
        <section className={styles.blogHeader}>
          <h1 className={styles.blogMainTitle}>Latest Blog Posts</h1>
          <p className={styles.blogSubtitle}>Fresh updates from our editorial team</p>
        </section>

        {/* Blog Grid */}
        <section className={styles.allBlogsSection}>
          {displayArticles.length === 0 ? (
            <div className={styles.noPosts}>
              <p>No blog posts available in this category yet.</p>
            </div>
          ) : (
            <div className={styles.blogGrid}>
              {displayArticles.map((article, i) => {
                const articleSlug = (article as any).slug || safeText(article.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50);
                return (
                  <BlogCard
                    key={i}
                    slug={articleSlug}
                    title={safeText(article.title)}
                    excerpt={safeText(article.description)}
                    image={article.image}
                    author="Editorial Team"
                    date={formatDate(article.pubDate)}
                    readTime="5 min read"
                    category={safeText(article.category)}
                  />
                );
              })}
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className={styles.subscribeSection}>
          <img src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=2000" alt="" className={styles.subscribeBg} />
          <div className={styles.subscribeContent}>
            <h2 className={styles.subscribeTitle}>Stay informed with our latest blog posts and updates.</h2>
            <form className={styles.subscribeForm} onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Email Address"
                className={styles.subscribeInput}
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                required
                disabled={subLoading}
              />
              <button type="submit" className={styles.subscribeButton} disabled={subLoading}>
                {subLoading ? 'Joining...' : 'Subscribe'}
              </button>
            </form>
            {subStatus.type && (
              <p className={`${styles.subMsg} ${subStatus.type === 'success' ? styles.subSuccess : styles.subError}`}>
                {subStatus.message}
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
