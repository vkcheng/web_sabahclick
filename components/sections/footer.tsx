"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"

export function Footer() {
    const { t } = useLanguage()

    return (
        <footer className="site-footer">
            <div className="site-wrap footer-inner">
                <div>
                    <Link href="/" className="wordmark" aria-label={`SabahClick · ${t.nav.home}`}>
                        SABAH<span>CLICK</span>
                    </Link>
                    <p className="small-copy">{t.footer.location}</p>
                </div>
                <nav aria-label={t.footer.navigation}>
                    <Link href="/#services">{t.nav.services}</Link>
                    <Link href="/web-design">{t.nav.web}</Link>
                    <Link href="/apps">{t.nav.apps}</Link>
                    <Link href="/#contact">{t.nav.contact}</Link>
                </nav>
                <p className="small-copy">© {new Date().getUTCFullYear()} SabahClick</p>
            </div>
        </footer>
    )
}
