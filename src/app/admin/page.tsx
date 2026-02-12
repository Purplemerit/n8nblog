'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    Users,
    Newspaper,
    MessageSquare,
    BarChart3,
    Globe,
    Settings,
    Plus,
    Trash2,
    Edit2,
    ExternalLink,
    Clock,
    Eye,
    Shield,
    Mail
} from 'lucide-react';
import styles from './Admin.module.css';

interface Stat {
    users: number;
    articles: number;
    comments: number;
    subscribers: number;
}

interface Analytics {
    path: string;
    views: number;
    avgTime: number;
    sessions: number;
}

interface Newsletter {
    id: string;
    email: string;
    createdAt: string;
}

interface Source {
    id: string;
    country: string;
    name: string;
    category: string;
    url: string;
    active: boolean;
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [stats, setStats] = useState<Stat | null>(null);
    const [analytics, setAnalytics] = useState<Analytics[]>([]);
    const [sources, setSources] = useState<Source[]>([]);
    const [newsletter, setNewsletter] = useState<Newsletter[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'sources' | 'analytics' | 'newsletter'>('overview');

    // Form state for adding/editing sources
    const [editingSource, setEditingSource] = useState<Partial<Source> | null>(null);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/admin/sources');
            const data = await res.json();
            if (res.ok) {
                setStats(data.stats);
                setAnalytics(data.analytics);
                setSources(data.sources);
                setNewsletter(data.newsletter);
            }
        } catch (err) {
            console.error('Failed to fetch admin data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === 'unauthenticated' || (session && (session.user as any).role !== 'ADMIN')) {
            router.push('/');
        } else if (status === 'authenticated') {
            fetchData();
        }
    }, [status, session, router]);

    const handleSaveSource = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/admin/sources', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingSource),
            });
            if (res.ok) {
                setEditingSource(null);
                fetchData();
            }
        } catch (err) {
            console.error('Failed to save source:', err);
        }
    };

    const handleDeleteSource = async (id: string) => {
        if (!confirm('Are you sure you want to delete this source?')) return;
        try {
            const res = await fetch('/api/admin/sources', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            if (res.ok) fetchData();
        } catch (err) {
            console.error('Failed to delete source:', err);
        }
    };

    if (status === 'loading' || loading) {
        return <div className={styles.loading}>Loading Dashboard...</div>;
    }

    return (
        <div className={styles.adminWrapper}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <Shield size={24} color="#3b82f6" />
                    <span>Admin Central</span>
                </div>
                <nav className={styles.nav}>
                    <button
                        className={activeTab === 'overview' ? styles.navItemActive : styles.navItem}
                        onClick={() => setActiveTab('overview')}
                    >
                        <BarChart3 size={20} /> Overview
                    </button>
                    <button
                        className={activeTab === 'sources' ? styles.navItemActive : styles.navItem}
                        onClick={() => setActiveTab('sources')}
                    >
                        <Globe size={20} /> News Sources
                    </button>
                    <button
                        className={activeTab === 'analytics' ? styles.navItemActive : styles.navItem}
                        onClick={() => setActiveTab('analytics')}
                    >
                        <BarChart3 size={20} /> Site Analytics
                    </button>
                    <button
                        className={activeTab === 'newsletter' ? styles.navItemActive : styles.navItem}
                        onClick={() => setActiveTab('newsletter')}
                    >
                        <Mail size={20} /> Newsletter
                    </button>
                    <button className={styles.navItem} onClick={() => router.push('/')}>
                        <ExternalLink size={20} /> View Site
                    </button>
                </nav>
            </aside>

            <main className={styles.mainContent}>
                <header className={styles.topHeader}>
                    <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                    <div className={styles.userProfile}>
                        <span>{session?.user?.name}</span>
                        <div className={styles.avatarMini}>{session?.user?.name?.[0]}</div>
                    </div>
                </header>

                {activeTab === 'overview' && (
                    <div className={styles.overviewGrid}>
                        <div className={styles.statsRow}>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon} style={{ background: '#eff6ff', color: '#3b82f6' }}>
                                    <Users size={24} />
                                </div>
                                <div className={styles.statInfo}>
                                    <p>Total Users</p>
                                    <h3>{stats?.users}</h3>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon} style={{ background: '#fef2f2', color: '#ef4444' }}>
                                    <Newspaper size={24} />
                                </div>
                                <div className={styles.statInfo}>
                                    <p>Total Articles</p>
                                    <h3>{stats?.articles}</h3>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon} style={{ background: '#f0fdf4', color: '#10b981' }}>
                                    <MessageSquare size={24} />
                                </div>
                                <div className={styles.statInfo}>
                                    <p>Total Comments</p>
                                    <h3>{stats?.comments}</h3>
                                </div>
                            </div>
                            <div className={styles.statCard} style={{ borderLeft: '4px solid #f59e0b' }}>
                                <div className={styles.statIcon} style={{ background: '#fffbeb', color: '#f59e0b' }}>
                                    <Mail size={24} />
                                </div>
                                <div className={styles.statInfo}>
                                    <p>Subscribers</p>
                                    <h3>{stats?.subscribers}</h3>
                                </div>
                            </div>
                        </div>

                        <div className={styles.recentActivity}>
                            <h2>Top Performing Pages</h2>
                            <div className={styles.tableWrapper}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Path</th>
                                            <th>Views</th>
                                            <th>Avg. Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {analytics.slice(0, 5).map((item) => (
                                            <tr key={item.path}>
                                                <td className={styles.pathCell}>{item.path}</td>
                                                <td>{item.views}</td>
                                                <td>{Math.round(item.avgTime)}s</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'sources' && (
                    <div className={styles.sourcesContainer}>
                        <div className={styles.sectionHeader}>
                            <h2>Manage RSS Feeds</h2>
                            <button className={styles.addBtn} onClick={() => setEditingSource({})}>
                                <Plus size={20} /> Add New Source
                            </button>
                        </div>

                        {editingSource && (
                            <div className={styles.modalOverlay}>
                                <div className={styles.modal}>
                                    <h3>{editingSource.id ? 'Edit Source' : 'Add New Source'}</h3>
                                    <form onSubmit={handleSaveSource} className={styles.sourceForm}>
                                        <div className={styles.formGroup}>
                                            <label>Country</label>
                                            <input
                                                type="text"
                                                required
                                                value={editingSource.country || ''}
                                                onChange={e => setEditingSource({ ...editingSource, country: e.target.value.toUpperCase() })}
                                                placeholder="e.g. INDIA"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Provider Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={editingSource.name || ''}
                                                onChange={e => setEditingSource({ ...editingSource, name: e.target.value })}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Category</label>
                                            <select
                                                value={editingSource.category || ''}
                                                onChange={e => setEditingSource({ ...editingSource, category: e.target.value })}
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                <option value="homepage">Homepage</option>
                                                <option value="news">National News</option>
                                                <option value="world">World News</option>
                                                <option value="business">Business</option>
                                                <option value="sports">Sports</option>
                                                <option value="technology">Technology</option>
                                            </select>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>RSS URL</label>
                                            <input
                                                type="url"
                                                required
                                                value={editingSource.url || ''}
                                                onChange={e => setEditingSource({ ...editingSource, url: e.target.value })}
                                            />
                                        </div>
                                        <div className={styles.formActions}>
                                            <button type="submit" className={styles.saveBtn}>Save Source</button>
                                            <button type="button" className={styles.cancelBtn} onClick={() => setEditingSource(null)}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Country</th>
                                        <th>Provider</th>
                                        <th>Category</th>
                                        <th>Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sources.map(source => (
                                        <tr key={source.id}>
                                            <td><span className={styles.countryBadge}>{source.country}</span></td>
                                            <td>{source.name}</td>
                                            <td>{source.category}</td>
                                            <td className={styles.actionCell}>
                                                <button onClick={() => setEditingSource(source)} title="Edit"><Edit2 size={16} /></button>
                                                <button onClick={() => handleDeleteSource(source.id)} title="Delete" style={{ color: '#ef4444' }}><Trash2 size={16} /></button>
                                                <a href={source.url} target="_blank" rel="noopener noreferrer" title="Test URL"><ExternalLink size={16} /></a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className={styles.analyticsList}>
                        <h2>Full Site Traffic</h2>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Page Path</th>
                                        <th>Views</th>
                                        <th>Sessions</th>
                                        <th>Avg. Time</th>
                                        <th>Total Engagement</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analytics.map(item => (
                                        <tr key={item.path}>
                                            <td className={styles.pathCell}>{item.path}</td>
                                            <td><div className={styles.flexCenter}><Eye size={14} className="mr-1" /> {item.views}</div></td>
                                            <td>{item.sessions}</td>
                                            <td><div className={styles.flexCenter}><Clock size={14} className="mr-1" /> {Math.round(item.avgTime)}s</div></td>
                                            <td>{Math.round((item.views * item.avgTime) / 60)} mins</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'newsletter' && (
                    <div className={styles.analyticsList}>
                        <h2>Newsletter Subscribers</h2>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Email Address</th>
                                        <th>Joined Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newsletter.map(sub => (
                                        <tr key={sub.id}>
                                            <td className={styles.pathCell}>{sub.email}</td>
                                            <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                    {newsletter.length === 0 && (
                                        <tr>
                                            <td colSpan={2} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                                                No subscribers yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
