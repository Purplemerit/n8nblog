import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/mail';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Return success anyway to prevent email enumeration
            return NextResponse.json({ message: 'If an account exists, code sent' }, { status: 200 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        await prisma.user.update({
            where: { email },
            data: {
                resetOTP: otp,
                resetOTPExpires: otpExpires,
            },
        });

        await sendPasswordResetEmail(email, otp);

        return NextResponse.json({ message: 'OTP sent' }, { status: 200 });
    } catch (error) {
        console.error('FORGOT_PASSWORD_ERROR:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
