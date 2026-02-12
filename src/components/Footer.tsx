'use client'

import React from 'react';
import Link from 'next/link';
import { Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    const categories = ['International', 'Health', 'Business', 'Environment', 'Technology', 'About Us'];

    return (
        <footer className={styles.footer}>
            <div className={styles.topSection}>
                <h2 className={styles.logo}>True Line Blog</h2>
                <nav className={styles.topNav}>
                    {categories.map((cat) => (
                        <Link key={cat} href={cat === 'About Us' ? '/about' : `/category/${cat.toLowerCase()}`} className={styles.topNavLink}>
                            {cat}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.column}>
                    <h2 className={styles.logo} style={{ fontSize: '1.25rem' }}>True Line Blog</h2>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', maxWidth: '250px' }}>
                        Delivering high-quality blog posts and in-depth analysis from around the globe.
                    </p>
                </div>
                <div className={styles.column}>
                    <h3 className={styles.colTitle}>Engagement</h3>
                    <ul className={styles.linkList}>
                        <li className={styles.linkItem}><Link href="/about">Story</Link></li>
                        <li className={styles.linkItem}><Link href="/">Topics</Link></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h3 className={styles.colTitle}>Pages</h3>
                    <ul className={styles.linkList}>
                        <li className={styles.linkItem}><Link href="/about">About Us</Link></li>
                        <li className={styles.linkItem}><Link href="/">Blogs</Link></li>
                        <li className={styles.linkItem}><Link href="/terms">Terms & Conditions</Link></li>
                        <li className={styles.linkItem}><Link href="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.colTitle}>Follow Us</h3>
                    <div className={styles.socialIcons}>
                        <Link href="#" className={styles.socialIcon}><Facebook size={20} /></Link>
                        <Link href="#" className={styles.socialIcon}><Linkedin size={20} /></Link>
                        <Link href="#" className={styles.socialIcon}><Instagram size={20} /></Link>
                        <Link href="#" className={styles.socialIcon}><Youtube size={20} /></Link>
                    </div>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <div className={styles.bottomLinks}>
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/cookies">Cookie Policy</Link>
                    <Link href="/terms">Website Info</Link>
                </div>
                <div className={styles.copyright}>
                    © 2026 True Line Blog. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
