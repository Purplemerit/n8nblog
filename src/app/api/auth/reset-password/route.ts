import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword,
                resetOTP: null,
                resetOTPExpires: null,
            },
        });

        return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
    } catch (error) {
        console.error('RESET_PASSWORD_ERROR:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
