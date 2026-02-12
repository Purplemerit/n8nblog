import Link from 'next/link';
import styles from './BlogCard.module.css';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt?: string;
  image?: string;
  author?: string;
  date: string;
  readTime?: string;
  category?: string;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  image,
  author = 'Editorial Team',
  date,
  readTime = '5 min read',
  category = 'Blog'
}: BlogCardProps) {
  return (
    <Link href={`/article/${slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {image ? (
          <img src={image} alt={title} className={styles.image} />
        ) : (
          <div className={styles.noImage}>
            <span>No Cover Image</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {excerpt && (
          <p className={styles.excerpt}>{excerpt}</p>
        )}

        <div className={styles.meta}>
          <div className={styles.author}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="7" r="4" strokeWidth="2"/>
            </svg>
            <span>{author}</span>
          </div>

          <div className={styles.date}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round"/>
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round"/>
              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
            </svg>
            <span>{date}</span>
          </div>

          <div className={styles.readTime}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
