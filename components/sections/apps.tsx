"use client"

import Link from "next/link"
import { ArrowUpRight, ScanLine } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { whatsAppUrl } from "@/lib/site"

export function AppsPreview() {
    const { t } = useLanguage()

    return (
        <section id="apps" className="site-section" aria-labelledby="free-apps-title">
            <div className="site-wrap section-split">
                <div className="section-intro">
                    <h2 id="free-apps-title" className="section-title">{t.apps.title}</h2>
                    <p className="section-lead">{t.apps.description}</p>
                    <Link href="/apps" className="site-button button-secondary">
                        {t.apps.browse}
                        <ArrowUpRight size={17} aria-hidden="true" />
                    </Link>
                </div>
                <ScannerApp />
            </div>
        </section>
    )
}

function ScannerApp({ showLinks = false }: { showLinks?: boolean }) {
    const { t } = useLanguage()

    const Title = showLinks ? "h2" : "h3"

    return (
        <article className="app-listing">
            <div className="app-name">
                <span className="app-icon"><ScanLine size={27} aria-hidden="true" /></span>
                <div>
                    <Title>VKscanner</Title>
                    <p className="small-copy">{t.apps.platform}</p>
                </div>
            </div>
            <p>{t.apps.scannerDescription}</p>
            {showLinks && (
                <div className="site-actions">
                    <a
                        className="site-button button-primary"
                        href={`${whatsAppUrl}?text=${encodeURIComponent(t.apps.message)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t.apps.availability} <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                    <a className="site-button button-secondary" href="/vkscanner/privacy">
                        {t.apps.privacy}
                    </a>
                </div>
            )}
        </article>
    )
}

export function AppsCatalog() {
    const { t } = useLanguage()

    return (
        <div className="site-wrap standalone-layout section-split">
            <div className="section-intro">
                <h1 className="headline">{t.apps.title}</h1>
                <p className="section-lead">{t.apps.description}</p>
            </div>
            <ScannerApp showLinks />
        </div>
    )
}
