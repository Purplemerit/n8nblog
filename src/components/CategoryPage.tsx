'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCategory } from '@/contexts/CategoryContext';

interface CategoryPageProps {
  slug: string;
}

export default function CategoryPage({ slug }: CategoryPageProps) {
  const router = useRouter();
  const { setSelectedCategory } = useCategory();

  useEffect(() => {
    // Set the category and redirect to homepage
    setSelectedCategory(slug);
    router.push('/');
  }, [slug, setSelectedCategory, router]);

  // Show loading state while redirecting
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontFamily: 'var(--font-fraunces)',
      fontSize: '1.2rem',
      color: '#666'
    }}>
      <p>Redirecting to {slug} blog posts...</p>
    </div>
  );
}
