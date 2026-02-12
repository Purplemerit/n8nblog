import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session || !session.user?.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { name, image } = await req.json();

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                name: name || undefined,
                image: image || undefined,
            },
        });

        return NextResponse.json({
            message: 'Profile updated successfully',
            user: {
                name: updatedUser.name,
                image: updatedUser.image
            }
        }, { status: 200 });
    } catch (error) {
        console.error('UPDATE_PROFILE_ERROR:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
