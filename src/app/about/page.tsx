'use client';

import React from 'react';
import styles from './about.module.css';

export default function AboutPage() {
    return (
        <div className={styles.container}>
            {/* Main Hero Image */}
            <div className={styles.heroImageWrapper}>
                <img
                    src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000"
                    alt="Starry Night Mountains"
                    className={styles.heroImage}
                />
            </div>

            {/* Intro Section */}
            <div className={styles.introSection}>
                <h1 className={styles.mainHeading}>
                    Empowering Minds with Stories That<br />
                    Inform, Inspire, and Connect the World
                </h1>

                <div className={styles.introGrid}>
                    {/* Left Column: Text + Stats */}
                    <div className={styles.introLeft}>
                        <p className={styles.introText}>
                            The global stock market has reached unprecedented levels, buoyed by optimistic economic forecasts and strong corporate earnings. The global stock market has reached unprecedented levels, buoyed by optimistic.
                        </p>

                        <div className={styles.statsGrid}>
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>10</div>
                                <div className={styles.statLabel}>Years of Excellence</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>50+</div>
                                <div className={styles.statLabel}>Expert Writers</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>1M+</div>
                                <div className={styles.statLabel}>Monthly Readers</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>20+</div>
                                <div className={styles.statLabel}>Industry Awards</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Two Images */}
                    <div className={styles.introImages}>
                        <img
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500"
                            alt="Abstract 3D Shape"
                            className={styles.introImage}
                        />
                        <img
                            src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=500"
                            alt="Blurry Portrait"
                            className={styles.introImage}
                        />
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className={styles.storySection}>
                <h2 className={styles.sectionTitle}>Our Story</h2>

                <div className={styles.storyLayout}>
                    {/* Left Col */}
                    <div className={styles.storyLeft}>
                        <h3 className={styles.empowerHeading}>
                            We empower businesses to achieve their goals
                        </h3>
                        <p className={styles.storyParagraph}>
                            The global stock market has reached unprecedented levels, buoyed by optimistic economic forecasts and strong corporate earnings.
                            <br /><br />
                            The global stock market has reached unprecedented levels, buoyed by optimistic.
                        </p>
                    </div>

                    {/* Center Col - Image */}
                    <div className={styles.storyCenter}>
                        <img
                            src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80"
                            alt="River Landscape"
                            className={styles.centerImage}
                        />
                    </div>

                    {/* Right Col */}
                    <div className={styles.storyRight}>
                        <div className={styles.missionBlock}>
                            <h4 className={styles.missionTitle}>Our Mission</h4>
                            <p className={styles.missionText}>
                                Our mission is to empower individuals and communities.
                                By delivering accurate, unbiased, and impactful blog content. We aim to inspire positive change, foster meaningful action, and remove barriers.
                            </p>
                        </div>
                        <div className={styles.visionBlock}>
                            <h4 className={styles.missionTitle}>Our Vision</h4>
                            <p className={styles.missionText}>
                                We envision a future where access to credible and transformative journalism bridges divides, shares perspectives, and fosters a more informed society.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trusted Source Section */}
            <div className={styles.trustedSection}>
                <div className={styles.trustedContent}>
                    <h2 className={styles.trustedHeading}>
                        Your Trusted Source for Blogs: Engaging Stories, In-Depth Analysis.
                    </h2>

                    <p className={styles.trustedParagraph}>
                        The global stock market has reached unprecedented levels, buoyed by optimistic economic forecasts and strong corporate earnings. The global stock market has reached unprecedented levels.
                    </p>

                    <div className={styles.journalistStats}>
                        <div className={styles.statBig}>500+</div>
                        <div className={styles.statBigLabel}>Expert writers and contributors worldwide.</div>
                        <div className={styles.avatars}>
                            <div className={styles.avatarImg} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=1)' }}></div>
                            <div className={styles.avatarImg} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=5)' }}></div>
                            <div className={styles.avatarImg} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=8)' }}></div>
                            <div className={styles.avatarImg} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=12)' }}></div>
                        </div>
                    </div>
                </div>

                <div className={styles.trustedImageWrapper}>
                    <img
                        src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80"
                        alt="Golden Wheat Field"
                        className={styles.trustedImage}
                    />
                </div>
            </div>

            {/* FAQ Section */}
            <div className={styles.faqSection}>
                <div className={styles.faqContent}>
                    <h2 className={styles.faqHeading}>Have any Questions?</h2>

                    <div className={styles.questionsList}>
                        {['How frequently is the blog updated?', 'Can I filter blog posts by category or interest?', 'Can I access older articles or archives?', 'How do I sign up for your newsletter?', 'Who writes your articles?'].map((q, i) => (
                            <div key={i} className={styles.questionRow}>
                                <span>{q}</span>
                                <span className={styles.arrowIcon}>→</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.faqImageWrapper}>
                    <img
                        src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80"
                        alt="City at Night"
                        className={styles.faqImage}
                    />
                </div>
            </div>

        </div>
    );
}
