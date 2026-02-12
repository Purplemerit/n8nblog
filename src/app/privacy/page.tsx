import React from 'react';
import styles from '../legal.module.css';

export default function PrivacyPage() {
    const sections = [
        { id: 'info', title: 'Information We Collect' },
        { id: 'use', title: 'How We Use Information' },
        { id: 'cookies', title: 'Cookies' },
        { id: 'third-party', title: 'Third-Party Services' },
        { id: 'security', title: 'Data Security' },
        { id: 'rights', title: 'Your Rights' },
        { id: 'changes', title: 'Changes to Policy' },
        { id: 'contact', title: 'Contact Us' },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Privacy Policy</h1>
                <p className={styles.subtitle}>Please read this policy carefully to understand how we handle your personal data.</p>
                <div className={styles.date}>Last updated October 24, 2026</div>
            </header>

            <div className={styles.heroImageWrapper}>
                <img
                    src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200"
                    alt="Privacy Policy"
                    className={styles.heroImage}
                />
            </div>

            <div className={styles.contentWrapper}>
                <main className={styles.mainContent}>

                    <section id="info" className={styles.section}>
                        <h2 className={styles.sectionTitle}>Information We Collect</h2>
                        <div className={styles.text}>
                            <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us. This may include your name, email address, and any other information you choose to provide.</p>
                            <p>We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, and browsing behavior through cookies and similar technologies.</p>
                        </div>
                    </section>

                    <section id="use" className={styles.section}>
                        <h2 className={styles.sectionTitle}>How We Use Information</h2>
                        <div className={styles.text}>
                            <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, to monitor and analyze trends and usage, and to personalize your experience.</p>
                            <p>Your information helps us to send you technical notices, updates, security alerts, and support messages, as well as to detect, investigate, and prevent fraudulent transactions and other illegal activities.</p>
                        </div>
                    </section>

                    <section id="cookies" className={styles.section}>
                        <h2 className={styles.sectionTitle}>Cookies</h2>
                        <div className={styles.text}>
                            <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.</p>
                            <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
                        </div>
                    </section>

                    <section id="third-party" className={styles.section}>
                        <h2 className={styles.sectionTitle}>Third-Party Services</h2>
                        <div className={styles.text}>
                            <p>We may employ third party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</p>
                            <p>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
                        </div>
                    </section>

                    <section id="security" className={styles.section}>
                        <h2 className={styles.sectionTitle}>Data Security</h2>
                        <div className={styles.text}>
                            <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
                        </div>
                    </section>

                    <section id="rights" className={styles.section}>
                        <h2 className={styles.sectionTitle}>Your Rights</h2>
                        <div className={styles.text}>
                            <p>You have the right to access, update, or delete the information we have on you. Whenever made possible, you can access, update or request deletion of your Personal Data directly within your account settings section. If you are unable to perform these actions yourself, please contact us to assist you.</p>
                        </div>
                    </section>

                    <section id="changes" className={styles.section}>
                        <h2 className={styles.sectionTitle}>Changes to Policy</h2>
                        <div className={styles.text}>
                            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
                        </div>
                    </section>

                    <section id="contact" className={styles.section}>
                        <h2 className={styles.sectionTitle}>Contact Us</h2>
                        <div className={styles.text}>
                            <p>If you have any questions about this Privacy Policy, please contact us:</p>
                            <div className={styles.contactBox}>
                                <div className={styles.contactLabel}>Email Us</div>
                                <a href="mailto:privacy@truelinenews.com" className={styles.contactLink}>privacy@truelinenews.com</a>
                                <div className={styles.contactLabel} style={{ marginTop: '16px' }}>Read Terms</div>
                                <a href="/terms" className={styles.contactLink}>View Terms & Conditions</a>
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
