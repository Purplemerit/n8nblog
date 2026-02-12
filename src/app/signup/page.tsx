'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import styles from '../auth.module.css';

export default function SignupPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [strength, setStrength] = useState(0);
    const [metRequirements, setMetRequirements] = useState({
        length: false,
        lower: false,
        special: false
    });

    useEffect(() => {
        const requirements = {
            length: password.length >= 8,
            lower: /[a-z]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        setMetRequirements(requirements);

        let score = 0;
        if (requirements.length) score += 33;
        if (requirements.lower) score += 33;
        if (requirements.special) score += 34;
        setStrength(score);
    }, [password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Redirect to OTP verification
            router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
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
                        <h1 className={styles.title}>Create Account</h1>
                        <p className={styles.subtitle}>Join us and stay updated</p>
                    </div>

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <form onSubmit={handleSubmit} className={styles.form} style={{ gap: '6px' }}>
                        <div className={styles.inputGroup} style={{ gap: '2px' }}>
                            <label className={styles.label} style={{ fontSize: '0.9rem' }}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="hello@chainex.co"
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup} style={{ gap: '2px' }}>
                            <label className={styles.label} style={{ fontSize: '0.9rem' }}>Password</label>
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
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            <div className={styles.strengthBar} style={{ height: '2px', background: '#eee', borderRadius: '1px', marginTop: '4px', overflow: 'hidden' }}>
                                <div
                                    style={{
                                        height: '100%',
                                        width: `${strength}%`,
                                        backgroundColor: strength < 66 ? '#ef4444' : strength < 100 ? '#eab308' : '#22c55e',
                                        transition: 'all 0.3s'
                                    }}
                                />
                            </div>
                        </div>

                        <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '2px 0' }} />

                        <div className={styles.inputGroup} style={{ gap: '2px' }}>
                            <label className={styles.label} style={{ fontSize: '0.9rem' }}>Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="********"
                                className={styles.input}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading} style={{ padding: '10px' }}>
                            {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : 'Create Account'}
                        </button>
                    </form>

                    <p className={styles.footer}>
                        Already have an account ? <Link href="/login" className={styles.footerLink}>Login</Link>
                    </p>
                </div>
            </div>

            <div className={styles.rightSection}>
                <img
                    src="./Frame21214530681.png"
                    alt="Latest News"
                    className={styles.authImage}
                />
            </div>
        </div>
    );
}
