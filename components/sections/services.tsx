"use client"

import Link from "next/link"
import { ArrowUpRight, PanelsTopLeft, Waypoints, Workflow } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function Services() {
    const { t } = useLanguage()

    return (
        <section id="services" className="site-section" aria-labelledby="systems-title">
            <div className="site-wrap">
                <div className="section-intro">
                    <h2 id="systems-title" className="section-title">{t.services.title}</h2>
                    <p className="section-lead">{t.services.description}</p>
                </div>
                <div className="service-grid">
                    <article className="service-block">
                        <span className="service-icon"><Workflow size={25} aria-hidden="true" /></span>
                        <h3>{t.services.systems}</h3>
                        <p>{t.services.systemsDescription}</p>
                    </article>
                    <article className="service-block">
                        <span className="service-icon"><Waypoints size={25} aria-hidden="true" /></span>
                        <h3>{t.services.transformation}</h3>
                        <p>{t.services.transformationDescription}</p>
                    </article>
                </div>
                <Link id="showcase" href="/web-design" className="feature-row">
                    <span className="service-icon"><PanelsTopLeft size={24} aria-hidden="true" /></span>
                    <div>
                        <h3>{t.nav.web}</h3>
                        <p>{t.services.webDescription}</p>
                    </div>
                    <span className="row-link">{t.services.webLink} <ArrowUpRight size={17} aria-hidden="true" /></span>
                </Link>
            </div>
        </section>
    )
}
