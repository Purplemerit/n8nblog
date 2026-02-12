import CategoryPage from '@/components/CategoryPage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <CategoryPage slug={slug} />;
}
