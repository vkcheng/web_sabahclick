import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { siteDescription, siteTitle, siteUrl } from "@/lib/site"

export const metadata: Metadata = {
    metadataBase: siteUrl,
    applicationName: "SabahClick",
    title: {
        default: siteTitle,
        template: "%s | SabahClick",
    },
    description: siteDescription,
    keywords: [
        "AI systems Sabah",
        "AI automation Kota Kinabalu",
        "AI transformation Sabah",
        "custom AI systems Malaysia",
        "web design Sabah",
    ],
    authors: [{ name: "SabahClick" }],
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        url: "/",
        siteName: "SabahClick",
        title: siteTitle,
        description: siteDescription,
        locale: "en_MY",
    },
    twitter: {
        card: "summary_large_image",
        title: siteTitle,
        description: siteDescription,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                    <LanguageProvider>
                        <div className="site-shell">
                            <Header />
                            {children}
                            <Footer />
                        </div>
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
