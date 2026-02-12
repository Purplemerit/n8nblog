import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fetchAndStoreMultipleSources } from '@/lib/rssParser';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        // 1. Authentication Check
        const authHeader = req.headers.get('Authorization');
        const cronSecret = process.env.CRON_SECRET;

        // In production, skip checking if CRON_SECRET is not set (but warn)
        // On Vercel, the CRON_SECRET header is automatically sent
        if (process.env.NODE_ENV === 'production' || cronSecret) {
            if (authHeader !== `Bearer ${cronSecret}`) {
                // Vercel sends the secret in the Authorization header
                // Alternatively, check for the bypass header if using Vercel Crons
                const vercelCron = req.headers.get('x-vercel-cron');
                if (!vercelCron) {
                    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
                }
            }
        }

        console.log('🚀 Starting cron: fetch-and-process...');

        // 2. Get system author
        const systemAuthor = await prisma.user.findUnique({
            where: { email: 'editorial@newsweb.com' },
        });

        if (!systemAuthor) {
            console.error('❌ System author not found');
            return NextResponse.json({ error: 'System author not found' }, { status: 500 });
        }

        // 3. Get active news sources
        const sources = await prisma.newsSource.findMany({
            where: { active: true },
        });

        if (sources.length === 0) {
            return NextResponse.json({ message: 'No active sources found' });
        }

        console.log(`📰 Found ${sources.length} sources to process`);

        // 4. Process sources
        const articlesPerSource = parseInt(process.env.ARTICLES_PER_CATEGORY || '10');

        // We run this in the background if possible, but Next.js Route Handlers
        // should return within the timeout. 
        // fetchAndStoreMultipleSources is an async function.
        const result = await fetchAndStoreMultipleSources(
            sources.map(s => ({
                url: s.url,
                id: s.id,
                name: s.name,
                category: s.category,
            })),
            systemAuthor.id,
            articlesPerSource
        );

        console.log(`✅ Cron completed: ${result.totalStored} stored, ${result.totalSkipped} skipped`);

        return NextResponse.json({
            success: true,
            summary: {
                totalStored: result.totalStored,
                totalSkipped: result.totalSkipped,
                errorCount: result.allErrors.length
            },
            results: result.sourceResults
        });

    } catch (error: any) {
        console.error('❌ Cron failed:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
