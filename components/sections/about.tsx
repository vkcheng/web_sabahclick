"use client"

import { useLanguage } from "@/lib/i18n/language-context"

export function About() {
    const { t } = useLanguage()

    return (
        <section id="about" className="site-section tinted-section" aria-labelledby="approach-title">
            <div className="site-wrap section-split">
                <div className="section-intro">
                    <h2 id="approach-title" className="section-title">{t.approach.title}</h2>
                    <p className="section-lead">{t.approach.description}</p>
                </div>
                <ol className="process-list">
                    {t.approach.steps.map((step, index) => (
                        <li key={index}>
                            <span className="process-number" aria-hidden="true">{index + 1}</span>
                            <div>
                                <h3>{step.title}</h3>
                                <p>{step.detail}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
