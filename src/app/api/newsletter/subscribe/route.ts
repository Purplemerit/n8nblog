import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
        }

        // Check if already subscribed
        const existing = await prisma.newsletter.findUnique({
            where: { email }
        });

        if (existing) {
            return NextResponse.json({ message: 'You are already subscribed!' }, { status: 200 });
        }

        await prisma.newsletter.create({
            data: { email }
        });

        return NextResponse.json({ message: 'Successfully subscribed to newsletter!' }, { status: 201 });
    } catch (error: any) {
        console.error('Newsletter error:', error);
        return NextResponse.json({ message: 'Something went wrong. Please try again later.' }, { status: 500 });
    }
}
