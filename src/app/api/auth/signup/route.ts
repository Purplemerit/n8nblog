import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { sendOTPEmail } from '@/lib/mail';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
        }

        // Block signup for reserved Admin email
        if (email === process.env.ADMIN_EMAIL) {
            return NextResponse.json({ message: 'This email is reserved' }, { status: 403 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        const hashedPassword = await bcrypt.hash(password, 12);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        if (existingUser) {
            // If user exists and is verified, then block re-registration
            if (existingUser.emailVerified) {
                return NextResponse.json({ message: 'User already exists' }, { status: 400 });
            }

            // If user exists but NOT verified, update their info and send new OTP
            await prisma.user.update({
                where: { email },
                data: {
                    password: hashedPassword,
                    resetOTP: otp,
                    resetOTPExpires: otpExpires,
                },
            });

            await sendOTPEmail(email, otp);

            return NextResponse.json({ message: 'Verification code resent' }, { status: 200 });
        }

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                resetOTP: otp,
                resetOTPExpires: otpExpires,
            },
        });

        await sendOTPEmail(email, otp);

        return NextResponse.json({ message: 'User created' }, { status: 201 });
    } catch (error) {
        console.error('SIGNUP_ERROR:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
