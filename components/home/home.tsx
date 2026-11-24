"use client"

import Link from "next/link"
import { useCallback, useState, type CSSProperties } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import type { Language } from "@/lib/i18n/translations"
import { contactEmail, whatsAppUrl } from "@/lib/site"
import { copy, MODULE_IDS, type NeedId } from "./copy"
import { FxLayer, FxLight, Scramble, signal } from "./fx"
import { StepMachine } from "./step-machine"
import { WhatsAppForm } from "./whatsapp-form"

const LANGS: [Language, string][] = [["en", "EN"], ["cn", "中文"], ["bm", "BM"]]
const METER = Array.from({ length: 12 }, (_, i) => i)

const wa = (message: string) => `${whatsAppUrl}?text=${encodeURIComponent(message)}`

function Arrow() {
    return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" /></svg>
}

export function Home() {
    const { language, setLanguage } = useLanguage()
    const text = copy[language]
    const [menuOpen, setMenuOpen] = useState(false)
    const [needs, setNeeds] = useState<Set<NeedId>>(new Set())
    const toggleNeed = useCallback((id: NeedId) => {
        setNeeds(current => {
            const next = new Set(current)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }, [])

    return <div className="machine-page" data-lang={language}>
        <FxLayer />
        <a className="skip" href="#main">{text.nav.skip}</a>

        <header className="topbar" onKeyDown={event => {
            if (menuOpen && event.key === "Escape") {
                setMenuOpen(false)
                event.currentTarget.querySelector<HTMLButtonElement>(".menu-key")?.focus()
            }
        }}>
            <a className="wordmark" href="#main" aria-label={`SabahClick · ${text.nav.home}`}>
                SABAH<span>CLICK</span>
            </a>
            <nav id="site-nav" className="nav" data-open={menuOpen} onClick={() => setMenuOpen(false)}>
                <a href="#build"><Scramble text={text.nav.build} /></a>
                <a href="#training"><Scramble text={text.nav.training} /></a>
                <a href="#vkscanner"><Scramble text={text.nav.app} /></a>
                <a href="#contact"><Scramble text={text.nav.contact} /></a>
            </nav>
            <div className="topbar-controls">
                <div className="lang" role="group" aria-label={text.nav.language}>
                    {LANGS.map(([code, label]) => <button key={code} type="button" lang={code === "cn" ? "zh-Hans" : code === "bm" ? "ms" : "en"}
                        className="lang-key" aria-pressed={language === code} onClick={() => { setLanguage(code); signal.kick(0.4) }}>{label}</button>)}
                </div>
                <a className="btn btn-outline topbar-wa" href={wa(text.form.hello)} target="_blank" rel="noopener noreferrer"><Scramble text={text.nav.whatsapp} /></a>
                <button type="button" className="hw-key small menu-key" aria-label={menuOpen ? text.nav.close : text.nav.menu}
                    aria-controls="site-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
                    <svg viewBox="0 0 16 16" aria-hidden="true">{menuOpen ? <path d="M4 4l8 8M12 4l-8 8" /> : <path d="M2 4h12M2 8h12M2 12h12" />}</svg>
                </button>
            </div>
        </header>

        <main id="main" tabIndex={-1}>
            <section className="hero" aria-labelledby="hero-title">
                <div className="hero-copy">
                    <h1 id="hero-title" className="display">
                        <span>{text.hero.line1}</span>
                        <span>{text.hero.line2}</span>
                    </h1>
                    <p className="hero-body">{text.hero.body}</p>
                    <ul className="offers">
                        {text.hero.offers.map(([href, label], index) => <li key={href} className={"offer bank-" + index}>
                            <a href={href}><span className="offer-key" aria-hidden="true"></span><Scramble text={label} /></a>
                        </li>)}
                    </ul>
                    <div className="actions">
                        <a className="btn btn-primary" href="#contact"><Scramble text={text.hero.primary} /><Arrow /></a>
                        <a className="btn btn-outline" href="#build"><Scramble text={text.hero.secondary} />
                            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M4 9l4 4 4-4" /></svg>
                        </a>
                    </div>
                </div>
                <StepMachine language={language} />
            </section>

            <section className="band build" id="build" aria-labelledby="build-title">
                <div className="band-head">
                    <h2 id="build-title" className="section-title" data-scramble=""><Scramble text={text.build.title} /></h2>
                    <p className="lead">{text.build.lead}</p>
                </div>
                <div className="rack">
                    {MODULE_IDS.map((id, index) => {
                        const unit = text.build.modules[id]
                        const added = needs.has(id)
                        return <article key={id} id={id} className={"rack-unit unit-" + index} data-fx="tilt" data-lit={added ? "" : undefined} aria-labelledby={id + "-title"}>
                            <FxLight />
                            <div className="unit-key" aria-hidden="true">
                                <span className="led"></span>
                                <span className="unit-route">{unit.key}</span>
                            </div>
                            <div className="unit-body">
                                <h3 id={id + "-title"}>{unit.title}</h3>
                                <p>{unit.body}</p>
                                <ul>{unit.items.map(item => <li key={item}>{item}</li>)}</ul>
                            </div>
                            <div className="unit-side">
                                <div className="meter" aria-hidden="true">
                                    {METER.map(i => <span key={i} style={{ "--i": i } as CSSProperties}></span>)}
                                </div>
                                <button type="button" className="btn btn-outline add-key" aria-pressed={added} onClick={() => { toggleNeed(id); signal.kick(0.4) }}>
                                    <span className="led" aria-hidden="true"></span>
                                    <Scramble text={added ? text.build.added : text.build.add} />
                                </button>
                            </div>
                        </article>
                    })}
                </div>
            </section>

            <section className="band training" id="training" aria-labelledby="training-title">
                <div className="training-panel" data-fx="">
                    <FxLight />
                    <div className="training-head">
                        <h2 id="training-title" className="section-title" data-scramble=""><Scramble text={text.training.title} /></h2>
                        <p className="lead">{text.training.lead}</p>
                        <dl className="training-facts">
                            {text.training.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
                        </dl>
                        <button type="button" className="btn btn-outline add-key" aria-pressed={needs.has("training")} onClick={() => { toggleNeed("training"); signal.kick(0.4) }}>
                            <span className="led" aria-hidden="true"></span>
                            <Scramble text={needs.has("training") ? text.training.added : text.training.add} />
                        </button>
                    </div>
                    <ul className="audience">
                        {text.training.audiences.map(([title, body], index) => <li key={title} className={"audience-row bank-" + index}>
                            <span className="audience-key" aria-hidden="true"><span className="step-led"></span></span>
                            <div>
                                <h3>{title}</h3>
                                <p>{body}</p>
                            </div>
                        </li>)}
                    </ul>
                </div>
            </section>

            <section className="band start" aria-labelledby="start-title">
                <div className="band-head">
                    <h2 id="start-title" className="section-title" data-scramble=""><Scramble text={text.start.title} /></h2>
                    <p className="lead">{text.start.lead}</p>
                </div>
                <div className="fx-wrap" data-fx="">
                <FxLight />
                <ol className="chain">
                    {text.start.steps.map((step, index) => <li key={step.title} className={"chain-step bank-" + index}>
                        <span className="chain-key" aria-hidden="true"><span className="step-led"></span>{index + 1}</span>
                        <h3>{step.title}</h3>
                        <p>{step.body}</p>
                    </li>)}
                </ol>
                </div>
            </section>

            <section className="band app" id="vkscanner" aria-labelledby="app-title">
                <div className="app-copy">
                    <h2 id="app-title" className="section-title" data-scramble=""><Scramble text={text.app.title} /></h2>
                    <p className="lead">{text.app.body}</p>
                    <div className="actions">
                        <Link className="btn btn-outline" href="/apps"><Scramble text={text.app.more} /><Arrow /></Link>
                        <a className="btn btn-quiet" href="/vkscanner/privacy" target="_blank" rel="noopener noreferrer"><Scramble text={text.app.privacy} /><Arrow /></a>
                    </div>
                </div>
                <div className="fx-wrap" data-fx="">
                <FxLight />
                <dl className="spec-plate">
                    {text.app.specs.map(([label, value]) => <div key={label}>
                        <span className="led is-on" aria-hidden="true"></span>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                    </div>)}
                </dl>
                </div>
            </section>

            <section className="band contact" id="contact" aria-labelledby="contact-title">
                <div className="contact-copy">
                    <h2 id="contact-title" className="section-title" data-scramble=""><Scramble text={text.contact.title} /></h2>
                    <p className="lead">{text.contact.body}</p>
                    <dl className="channels">
                        <div><dt>{text.contact.whatsapp}</dt><dd><a href={wa(text.form.hello)} target="_blank" rel="noopener noreferrer">+60 12-813 1441</a></dd></div>
                        <div><dt>{text.contact.email}</dt><dd><a href={`mailto:${contactEmail}`}>{contactEmail}</a></dd></div>
                        <div><dt>{text.contact.location}</dt><dd>{text.contact.place}</dd></div>
                    </dl>
                </div>
                <WhatsAppForm language={language} needs={needs} onToggleNeed={toggleNeed} />
            </section>
        </main>

        <footer className="footer">
            <span className="wordmark small">SABAH<span>CLICK</span></span>
            <span>{text.footer.line}</span>
            <span>© {new Date().getUTCFullYear()} SabahClick</span>
        </footer>
    </div>
}
