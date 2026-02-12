'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import styles from '../auth.module.css';

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const token = searchParams.get('token'); // This would be the OTP if we passed it along

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('Failed to reset password');

            router.push('/login?reset=success');
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
                        <h1 className={styles.title}>Set New Password</h1>
                        <p className={styles.subtitle}>Choose a strong password for your account</p>
                    </div>

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>New Password</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="********"
                                    className={styles.input}
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.passwordToggle}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="********"
                                className={styles.input}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </div>

            <div className={styles.rightSection}>
                <img
                    src="/auth/login.png"
                    alt="Reset Password"
                    className={styles.authImage}
                />
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}
