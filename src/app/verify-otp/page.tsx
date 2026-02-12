'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import styles from '../auth.module.css';

function VerifyOTPContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length < 6) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: otpValue }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'OTP verification failed');

            const type = searchParams.get('type');
            if (type === 'reset') {
                router.push(`/reset-password?email=${encodeURIComponent(email || '')}`);
            } else {
                router.push('/login?verified=true');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.leftSection}>
                <div className={styles.formContainer}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Verify Email</h1>
                        <p className={styles.subtitle}>Enter the 6-digit code sent to<br /><strong>{email}</strong></p>
                    </div>

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.otpContainer}>
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    ref={(el) => { inputRefs.current[index] = el; }}
                                    value={data}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className={styles.otpInput}
                                />
                            ))}
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading || otp.join('').length < 6}>
                            {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Verify Code'}
                        </button>
                    </form>

                    <p className={styles.footer}>
                        Didn't receive the code? <button className={styles.footerLink} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Resend</button>
                    </p>
                </div>
            </div>

            <div className={styles.rightSection}>
                <img
                    src="./Frame21214530684.png"
                    alt="Verify Email"
                    className={styles.authImage}
                />
            </div>
        </div>
    );
}

export default function VerifyOTPPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyOTPContent />
        </Suspense>
    );
}
