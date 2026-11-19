import { LanguageProvider } from "@/lib/i18n/language-context"
import { siteMetadata } from "@/lib/site-metadata"
import "./obsidian.css"

export const metadata = siteMetadata

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return <html lang="en"><body><LanguageProvider>{children}</LanguageProvider></body></html>
}
