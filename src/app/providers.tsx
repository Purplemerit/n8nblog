'use client'

import { SessionProvider } from "next-auth/react"
import { CountryProvider } from "@/contexts/CountryContext"
import { CategoryProvider } from "@/contexts/CategoryContext"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <CountryProvider>
                <CategoryProvider>
                    {children}
                </CategoryProvider>
            </CountryProvider>
        </SessionProvider>
    )
}
