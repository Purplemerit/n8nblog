'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, User, Shield, LogOut, ChevronDown } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useCategory } from '@/contexts/CategoryContext';
import styles from './Navbar.module.css';
import Sidebar from './Sidebar';
import CountrySelector from './CountrySelector';

export default function Navbar() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const { data: session } = useSession();
    const { selectedCategory, setSelectedCategory } = useCategory();
    const isAdmin = (session?.user as any)?.role === 'ADMIN';

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setDropdownOpen(false);
        if (isDropdownOpen) {
            window.addEventListener('click', handleClickOutside);
        }
        return () => window.removeEventListener('click', handleClickOutside);
    }, [isDropdownOpen]);

    const categories = [
        { id: 'all', label: 'All Posts' },
        { id: 'news', label: 'News' },
        { id: 'business', label: 'Business' },
        { id: 'sports', label: 'Sports' },
        { id: 'technology', label: 'Technology' },
        { id: 'entertainment', label: 'Entertainment' },
        { id: 'politics', label: 'Politics' },
        { id: 'world', label: 'World' },
        { id: 'health', label: 'Health' },
    ];

    return (
        <>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <header className={styles.header}>
                {/* Top Row */}
                <div className={styles.topRow}>
                    <div className={styles.leftSection}>
                        <button className={styles.iconBtn} onClick={() => setSidebarOpen(true)}>
                            <Menu size={24} strokeWidth={1.5} />
                        </button>
                    </div>

                    <div className={styles.logoContainer}>
                        <Link href="/" className={styles.logo}>
                            True Line Blog
                        </Link>
                    </div>

                    <div className={styles.rightSection}>
                        <div className={styles.desktopOnly}>
                            <CountrySelector />
                        </div>

                        <div className={styles.authWrapper}>
                            {session ? (
                                <div className={styles.relative}>
                                    <button
                                        className={styles.userProfileBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDropdownOpen(!isDropdownOpen);
                                        }}
                                    >
                                        <div className={styles.avatarMini}>
                                            {session.user?.image ? (
                                                <img src={session.user.image} alt="" />
                                            ) : (
                                                session.user?.name?.[0] || 'U'
                                            )}
                                        </div>
                                        <span className={styles.desktopName}>{session.user?.name?.split(' ')[0]}</span>
                                        <ChevronDown size={14} className={`${styles.chevron} ${isDropdownOpen ? styles.rotate : ''}`} />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                                            <Link href="/profile" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                                                <User size={16} /> My Profile
                                            </Link>

                                            {isAdmin && (
                                                <Link href="/admin" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                                                    <Shield size={16} /> Admin Panel
                                                </Link>
                                            )}

                                            <div className={styles.divider}></div>

                                            <button
                                                className={`${styles.dropdownItem} ${styles.logoutText}`}
                                                onClick={() => signOut()}
                                            >
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className={styles.authGroup}>
                                    <Link href="/login" className={styles.loginLink}>Sign In</Link>
                                    <Link href="/signup" className={styles.registerBtn}>Join Now</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Category Filter Row */}
                <nav className={styles.navRow}>
                    <div className={styles.navList}>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`${styles.navItem} ${selectedCategory === cat.id ? styles.navItemActive : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                        <Link href="/about" className={styles.navItem}>
                            About Us
                        </Link>
                    </div>
                </nav>
            </header>
        </>
    );
}
