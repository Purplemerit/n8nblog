import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendOTPEmail = async (email: string, otp: string) => {
    const mailOptions = {
        from: `"True Line News" <${process.env.FROM_EMAIL}>`,
        to: email,
        subject: 'Your Verification Code - True Line News',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #2d3748; text-align: center;">Verify Your Email</h2>
                <p>Hello,</p>
                <p>Thank you for signing up for True Line News. Please use the following 6-digit verification code to complete your registration:</p>
                <div style="background: #f7fafc; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2d3748; border-radius: 8px; margin: 20px 0;">
                    ${otp}
                </div>
                <p>This code will expire in 10 minutes.</p>
                <p>If you did not request this code, please ignore this email.</p>
                <p style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #718096; text-align: center;">
                    &copy; ${new Date().getFullYear()} True Line News. All rights reserved.
                </p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP Email sent successfully to ${email}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send verification email');
    }
};

export const sendPasswordResetEmail = async (email: string, otp: string) => {
    const mailOptions = {
        from: `"True Line News" <${process.env.FROM_EMAIL}>`,
        to: email,
        subject: 'Password Reset Code - True Line News',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #2d3748; text-align: center;">Reset Your Password</h2>
                <p>Hello,</p>
                <p>We received a request to reset your password. Use the code below to set a new password:</p>
                <div style="background: #f7fafc; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2d3748; border-radius: 8px; margin: 20px 0;">
                    ${otp}
                </div>
                <p>This code will expire in 15 minutes.</p>
                <p>If you did not request a password reset, please ignore this email.</p>
                <p style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #718096; text-align: center;">
                    &copy; ${new Date().getFullYear()} True Line News. All rights reserved.
                </p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent successfully to ${email}`);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send reset email');
    }
};
