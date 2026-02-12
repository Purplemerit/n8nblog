'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, Camera, Shield, Save, X } from 'lucide-react';
import styles from './Profile.module.css';

export default function ProfilePage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
        if (session?.user) {
            setName(session.user.name || '');
            setImage(session.user.image || '');
        }
    }, [status, router, session]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('/api/user/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, image }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Update failed');

            // Refresh session data
            await update({ name, image });

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setIsEditing(false);
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading') {
        return <div className={styles.loading}>Loading Profile...</div>;
    }

    if (!session) return null;

    const isAdmin = (session.user as any).role === 'ADMIN';

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                <div className={styles.header}>
                    <div className={styles.avatarLarge}>
                        {isEditing ? (
                            <div className={styles.imageEditOverlay}>
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    className={styles.urlInput}
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                                <Camera size={20} />
                            </div>
                        ) : (
                            session.user?.image ? (
                                <img src={session.user.image} alt="Profile" />
                            ) : (
                                <span>{session.user?.name?.[0] || 'U'}</span>
                            )
                        )}
                    </div>
                    {isEditing ? (
                        <input
                            type="text"
                            className={styles.inputName}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                        />
                    ) : (
                        <h1 className={styles.name}>{session.user?.name || 'News User'}</h1>
                    )}
                    <p className={styles.email}>{session.user?.email}</p>
                </div>

                {message.text && (
                    <div className={message.type === 'success' ? styles.successMsg : styles.errorMsg}>
                        {message.text}
                    </div>
                )}

                <div className={styles.details}>
                    <div className={styles.detailItem}>
                        <label>Account Status</label>
                        <span className={styles.statusActive}>Active & Verified</span>
                    </div>
                    <div className={styles.detailItem}>
                        <label>Role</label>
                        <span className={isAdmin ? styles.adminBadge : ''}>
                            {isAdmin ? <Shield size={14} className="inline mr-1" /> : ''}
                            {(session.user as any).role || 'User'}
                        </span>
                    </div>
                </div>

                <div className={styles.actions}>
                    {isEditing ? (
                        <div className={styles.editActions}>
                            <button onClick={handleUpdate} className={styles.saveBtn} disabled={loading}>
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <><Save size={18} /> Save</>}
                            </button>
                            <button onClick={() => setIsEditing(false)} className={styles.cancelBtn}>
                                <X size={18} /> Cancel
                            </button>
                        </div>
                    ) : (
                        <>
                            <button onClick={() => setIsEditing(true)} className={styles.editBtn}>Edit Profile</button>
                            {isAdmin && (
                                <button onClick={() => router.push('/admin')} className={styles.adminBtn}>
                                    <Shield size={18} /> Go to Admin Panel
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
