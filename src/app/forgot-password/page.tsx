'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import styles from '../auth.module.css';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [view, setView] = useState<'forgot' | 'check'>('forgot');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Something went wrong');

            setView('check');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (view === 'check') {
        return (
            <div className={styles.authPage}>
                <div className={styles.leftSection}>
                    <div className={styles.formContainer} style={{ textAlign: 'center' }}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>Check Email</h1>
                            <p className={styles.subtitle} style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                                We Sent a Password Reset link to your email address , <strong style={{ color: '#1a202c' }}>{email}</strong> , please check inbox and follow instructions , The Link Vaild for to hour
                            </p>
                        </div>

                        <a
                            href="https://mail.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.submitBtn}
                            style={{ textDecoration: 'none', display: 'block', marginBottom: '16px' }}
                        >
                            Open Gmail
                        </a>

                        <div className={styles.footer} style={{ marginTop: '20px' }}>
                            <p style={{ marginBottom: '8px' }}>
                                Don't Receive the email ? <button onClick={() => setView('forgot')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: '700', cursor: 'pointer', padding: 0 }}>Resend Link</button>
                            </p>
                            <p>
                                Remembered your password ? <Link href="/login" className={styles.footerLink} style={{ color: '#3b82f6' }}>Log In</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.rightSection}>
                    <img
                        src="/auth/check-email.png"
                        alt="Check Email"
                        className={styles.authImage}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.authPage}>
            <div className={styles.leftSection}>
                <div className={styles.formContainer}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Forget Password</h1>
                        <p className={styles.subtitle}>Enter your email address and we'll send you a link to reset your password</p>
                    </div>

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="hello@chainex.co"
                                className={styles.input}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading} style={{ marginTop: '12px' }}>
                            {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Send Reset Link'}
                        </button>
                    </form>
                </div>
            </div>

            <div className={styles.rightSection}>
                <img
                    src="./Frame21214530683.png"
                    alt="Forgot Password"
                    className={styles.authImage}
                />
            </div>
        </div>
    );
}
