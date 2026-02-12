import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const categorySlug = searchParams.get('category');
        const limitStr = searchParams.get('limit');
        const limit = limitStr ? parseInt(limitStr) : 50;

        const where: any = {
            published: true,
        };

        if (categorySlug && categorySlug !== 'all') {
            where.category = {
                slug: categorySlug,
            };
        }

        const articles = await prisma.article.findMany({
            where,
            take: limit,
            orderBy: {
                publishedAt: 'desc',
            },
            include: {
                category: true,
            },
        });

        // Map to NewsArticle format expected by frontend
        const mappedArticles = articles.map(article => ({
            id: article.id,
            title: article.title,
            description: article.excerpt || article.content.substring(0, 150) + '...',
            link: `/article/${article.slug}`,
            slug: article.slug,
            image: article.image,
            pubDate: (article.publishedAt || article.createdAt).toISOString(),
            category: article.category.name,
            author: 'Editorial Team',
        }));

        return NextResponse.json({
            articles: mappedArticles,
            count: mappedArticles.length
        });
    } catch (error: any) {
        console.error('Error fetching articles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch articles', details: error.message },
            { status: 500 }
        );
    }
}
