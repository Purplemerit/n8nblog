import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.resetOTP !== otp) {
            return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
        }

        if (user.resetOTPExpires && user.resetOTPExpires < new Date()) {
            return NextResponse.json({ message: 'OTP expired' }, { status: 400 });
        }

        // Verify user and clear OTP
        await prisma.user.update({
            where: { email },
            data: {
                emailVerified: new Date(),
                resetOTP: null,
                resetOTPExpires: null,
            },
        });

        return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
    } catch (error) {
        console.error('VERIFY_OTP_ERROR:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
