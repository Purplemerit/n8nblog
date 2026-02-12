'use client';

import React from 'react';
import { X, Search, User, Shield, LogOut, LogIn, UserPlus } from 'lucide-react';
import styles from './Sidebar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useCategory } from '@/contexts/CategoryContext';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const MENU_ITEMS = [
    { name: 'All Posts', category: 'all' },
    { name: 'News', category: 'news' },
    { name: 'Sports', category: 'sports' },
    { name: 'Business', category: 'business' },
    { name: 'Technology', category: 'technology' },
    { name: 'Entertainment', category: 'entertainment' },
    { name: 'Politics', category: 'politics' },
    { name: 'Health', category: 'health' },
    { name: 'World', category: 'world' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { data: session } = useSession();
    const { setSelectedCategory } = useCategory();
    const router = useRouter();
    const isAdmin = (session?.user as any)?.role === 'ADMIN';

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        router.push('/');
        onClose();
    };

    return (
        <>
            <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose} />
            <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <div className={styles.sidebarLogo}>True Line Blog</div>
                    <button onClick={onClose} className={styles.closeBtn}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.content}>
                    {/* User Action Section (Mobile Focused) */}
                    <div className={styles.userSection}>
                        {session ? (
                            <div className={styles.userInfo}>
                                <div className={styles.userBrief}>
                                    <div className={styles.avatar}>
                                        {session.user?.image ? (
                                            <img src={session.user.image} alt="" />
                                        ) : (
                                            session.user?.name?.[0] || 'U'
                                        )}
                                    </div>
                                    <div className={styles.userDetails}>
                                        <p className={styles.userName}>{session.user?.name}</p>
                                        <p className={styles.userEmail}>{session.user?.email}</p>
                                    </div>
                                </div>
                                <div className={styles.authLinks}>
                                    <Link href="/profile" className={styles.authLink} onClick={onClose}>
                                        <User size={18} /> Profile
                                    </Link>
                                    {isAdmin && (
                                        <Link href="/admin" className={styles.authLink} onClick={onClose}>
                                            <Shield size={18} /> Admin Panel
                                        </Link>
                                    )}
                                    <button onClick={() => signOut()} className={`${styles.authLink} ${styles.logoutBtn}`}>
                                        <LogOut size={18} /> Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.guestSection}>
                                <Link href="/login" className={styles.loginBtn} onClick={onClose}>
                                    <LogIn size={18} /> Sign In
                                </Link>
                                <Link href="/signup" className={styles.signupBtn} onClick={onClose}>
                                    <UserPlus size={18} /> Join Today
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.searchContainer}>
                        <Search className={styles.searchIcon} size={18} />
                        <input type="text" placeholder="Search articles" className={styles.searchInput} />
                    </div>

                    <div className={styles.navSection}>
                        <h2 className={styles.sectionTitle}>Blog Categories</h2>
                        <ul className={styles.menuList}>
                            {MENU_ITEMS.map((item) => (
                                <li key={item.name} className={styles.menuItem}>
                                    <button
                                        className={styles.menuLink}
                                        onClick={() => handleCategoryClick(item.category)}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                            <li className={styles.menuItem}>
                                <Link
                                    href="/about"
                                    className={styles.menuLink}
                                    onClick={onClose}
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
