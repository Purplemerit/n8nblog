'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import styles from '../auth.module.css';

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam) {
            if (errorParam === 'OAuthSignin') setError('Error occurred while signing in with Google.');
            else if (errorParam === 'OAuthCallback') setError('Error occurred during Google authentication callback.');
            else if (errorParam === 'OAuthCreateAccount') setError('Could not create user account with Google.');
            else if (errorParam === 'EmailCreateAccount') setError('Could not create user account with email.');
            else if (errorParam === 'Callback') setError('Error occurred during authentication callback.');
            else if (errorParam === 'OAuthAccountNotLinked') setError('This email is already linked to another login method.');
            else if (errorParam === 'EmailSignin') setError('The email sign in link is invalid or has expired.');
            else if (errorParam === 'CredentialsSignin') setError('Invalid email or password.');
            else if (errorParam === 'SessionRequired') setError('Please sign in to access this page.');
            else setError('An unexpected authentication error occurred.');
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl,
            });

            if (res?.error) {
                setError('Invalid email or password');
            } else {
                router.push(callbackUrl);
                router.refresh();
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider: string) => {
        signIn(provider, { callbackUrl });
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.leftSection}>
                <div className={styles.formContainer}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Log In</h1>
                        <p className={styles.subtitle}>Log in to your Account</p>
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

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Password</label>
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

                        <div className={styles.optionsRow}>
                            <label className={styles.rememberMe}>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className={styles.checkbox}
                                />
                                <span>Remember me</span>
                            </label>
                            <Link href="/forgot-password" className={styles.forgotPassword}>Forget Password</Link>
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Login'}
                        </button>
                    </form>

                    <div className={styles.divider}>
                        <span>or continue with</span>
                    </div>

                    <div className={styles.socialBtns}>
                        <button onClick={() => handleSocialLogin('google')} className={styles.socialBtn}>
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                            <span>Signup with Google</span>
                        </button>
                        <button onClick={() => handleSocialLogin('apple')} className={styles.socialBtn}>
                            <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" />
                            <span>Sign up with Apple</span>
                        </button>
                    </div>

                    <p className={styles.footer}>
                        Don't have an account yet ? <Link href="/signup" className={styles.footerLink}>Create Account</Link>
                    </p>
                </div>
            </div>

            <div className={styles.rightSection}>
                <img
                    src="./Frame21214530682.png"
                    alt="Premium Lifestyle"
                    className={styles.authImage}
                />
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className={styles.authPage}>
                <div className={styles.loadingContainer}>
                    <Loader2 className="animate-spin" size={40} />
                </div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
