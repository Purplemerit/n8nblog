'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = ['/login', '/signup', '/verify-otp', '/forgot-password', '/reset-password', '/admin'].includes(pathname || '');

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <main style={{ minHeight: '100vh', paddingTop: '0' }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
