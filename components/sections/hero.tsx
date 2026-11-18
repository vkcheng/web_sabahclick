"use client"

import { ArrowDown, ArrowUpRight, CalendarCheck, MessageCircle, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

const stepIcons = [MessageCircle, Sparkles, CalendarCheck]

export function Hero() {
    const { t } = useLanguage()

    return (
        <section className="home-hero" aria-labelledby="hero-title">
            <div className="site-wrap hero-layout">
                <div className="hero-copy">
                    <h1 id="hero-title" className="headline">
                        {t.hero.titleLine1}{" "}
                        <span className="headline-accent">{t.hero.titleLine2}</span>
                    </h1>
                    <p className="section-lead">{t.hero.description}</p>
                    <div className="site-actions">
                        <a href="#contact" className="site-button button-primary">
                            {t.nav.contact}
                            <ArrowUpRight size={17} aria-hidden="true" />
                        </a>
                        <a href="#services" className="site-button button-secondary">
                            {t.hero.services}
                            <ArrowDown size={17} aria-hidden="true" />
                        </a>
                    </div>
                </div>

                <div className="workflow">
                    <div className="workflow-heading">
                        <p>{t.hero.workflow}</p>
                        <h2>{t.hero.scenario}</h2>
                    </div>
                    <ol className="workflow-steps">
                        {t.hero.steps.map((step, index) => {
                            const Icon = stepIcons[index]
                            return (
                                <li key={index} className={index === 1 ? "workflow-step workflow-step-ai" : "workflow-step"}>
                                    <span className="workflow-icon"><Icon size={19} aria-hidden="true" /></span>
                                    <div>
                                        <p className="workflow-step-title">{step.title}</p>
                                        <p className="small-copy">{step.detail}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        </section>
    )
}
