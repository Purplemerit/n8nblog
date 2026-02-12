import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { path, timeSpent } = await req.json();

        if (!path) return NextResponse.json({ message: 'Path is required' }, { status: 400 });

        // Upsert analytics for the path
        const analytics = await prisma.analytics.upsert({
            where: { path },
            update: {
                views: { increment: 1 },
                totalTime: { increment: timeSpent || 0 },
                sessions: { increment: 1 },
                avgTime: {
                    // This is a simplified average calculation
                    // In a real app, you'd calculate this properly
                    set: 0 // Will be updated by a separate logic if needed or calculated on the fly
                }
            },
            create: {
                path,
                views: 1,
                totalTime: timeSpent || 0,
                sessions: 1,
                avgTime: timeSpent || 0
            }
        });

        // Recalculate average time
        if (analytics.sessions > 0) {
            await prisma.analytics.update({
                where: { path },
                data: {
                    avgTime: analytics.totalTime / analytics.sessions
                }
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('ANALYTICS_ERROR:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
