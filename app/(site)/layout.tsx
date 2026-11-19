import "../globals.css"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { siteMetadata } from "@/lib/site-metadata"

export const metadata = siteMetadata

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
