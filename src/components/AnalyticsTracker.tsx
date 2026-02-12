'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
    const pathname = usePathname();
    const startTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        startTimeRef.current = Date.now();

        return () => {
            const timeSpent = (Date.now() - startTimeRef.current) / 1000; // in seconds
            if (timeSpent > 1) { // Only track if they stayed for more than 1 second
                fetch('/api/analytics/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ path: pathname, timeSpent }),
                    // use beacon or keepalive for reliable tracking on unmount
                    keepalive: true,
                }).catch(() => { });
            }
        };
    }, [pathname]);

    return null;
}
