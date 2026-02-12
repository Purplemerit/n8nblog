import React from 'react';
import styles from '../legal.module.css';
import Link from 'next/link';

export default function TermsPage() {
    const sections = [
        { id: 'intro', title: 'Introduction' },
        { id: 'use', title: 'Use of Content' },
        { id: 'accounts', title: 'User Accounts' },
        { id: 'ip', title: 'Intellectual Property' },
        { id: 'privacy', title: 'Privacy' },
        { id: 'liability', title: 'Limitation of Liability' },
        { id: 'changes', title: 'Changes to Terms' },
        { id: 'contact', title: 'Contact Information' },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Terms & Conditions</h1>
                <p className={styles.subtitle}>Please read these terms carefully before using our services.</p>
                <div className={styles.date}>Last updated October 24, 2026</div>
            </header>

            <div className={styles.heroImageWrapper}>
                <img
                    src="https://images.unsplash.com/photo-1555432384-22a9ee9ae75f?auto=format&fit=crop&q=80&w=1200"
                    alt="Terms and Conditions Document"
                    className={styles.heroImage}
                />
            </div>

            <div className={styles.contentWrapper}>
                <main className={styles.mainContent}>

                    <section id="intro" className={styles.section}>
                        <h2 className={styles.sectionTitle}>Introduction</h2>
                        <div className={styles.text}>
                            <p>Welcome to True Line News. By accessing our website and using our services, you acknowledge that you have read, understood, and agree to be bound by the following terms and conditions.</p>
                            <p>If you disagree with any part of these terms, please do not use our website.</p>
                        </div>
                    </section>

                    <section id="use" className={styles.section}>
                        <h2 className={styles.sectionTitle}>Use of Content</h2>
                        <div className={styles.text}>
                            <p>The content provided on True Line News is for general informational purposes only. While we strive to provide up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information.</p>
                            <p>You may view, download for caching purposes only, and print pages from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.</p>
                        </div>
                    </section>

                    <section id="accounts" className={styles.section}>
                        <h2 className={styles.sectionTitle}>User Accounts</h2>
                        <div className={styles.text}>
                            <p>If you create an account on our website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account.</p>
                            <p>You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions.</p>
                        </div>
                    </section>

                    <section id="ip" className={styles.section}>
                        <h2 className={styles.sectionTitle}>Intellectual Property</h2>
                        <div className={styles.text}>
                            <p>The intellectual property rights in all content and material on this website are owned by True Line News or its licensors. You may not reproduce, duplicate, copy, sell, resell or otherwise exploit our website or material on our website for a commercial purpose, without our express written consent.</p>
                        </div>
                    </section>

                    <section id="privacy" className={styles.section}>
                        <h2 className={styles.sectionTitle}>Privacy</h2>
                        <div className={styles.text}>
                            <p>Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.</p>
                        </div>
                    </section>

                    <section id="liability" className={styles.section}>
                        <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
                        <div className={styles.text}>
                            <p>In no event shall True Line News, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                        </div>
                    </section>

                    <section id="changes" className={styles.section}>
                        <h2 className={styles.sectionTitle}>Changes to Terms</h2>
                        <div className={styles.text}>
                            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                        </div>
                    </section>

                    <section id="contact" className={styles.section}>
                        <h2 className={styles.sectionTitle}>Contact Information</h2>
                        <div className={styles.text}>
                            <p>If you have any questions about these Terms, please contact us.</p>
                            <div className={styles.contactBox}>
                                <div className={styles.contactLabel}>Email Us</div>
                                <a href="mailto:legal@truelinenews.com" className={styles.contactLink}>legal@truelinenews.com</a>
                                <div className={styles.contactLabel} style={{ marginTop: '16px' }}>Postal Address</div>
                                <div className={styles.contactLink}>123 News Street, NY, USA</div>
                            </div>
                        </div>
                    </section>

                </main>

                <aside className={styles.sidebar}>
                    <div className={styles.sidebarTitle}>On this page</div>
                    <ul className={styles.tocList}>
                        {sections.map(section => (
                            <li key={section.id}>
                                <a href={`#${section.id}`} className={styles.tocItem}>{section.title}</a>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </div>
    );
}
