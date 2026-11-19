"use client"

import Link from "next/link"
import { whatsAppUrl } from "@/lib/site"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import { ContactForm } from "@/components/sections/contact"
import { copy } from "./copy"
import { projects } from "./projects"
import { mountTelemetry } from "./telemetry"

function highlight(line: string) {
    const match = /^(.*?)<span class="accent-word">(.*?)<\/span>(.*)$/.exec(line)
    return match ? <>{match[1]}<span className="accent-word">{match[2]}</span>{match[3]}</> : line
}

export function ObsidianHome() {
    const { language, setLanguage, t } = useLanguage()
    const text = copy[language]
    const [selected, setSelected] = useState(0)
    const [menuOpen, setMenuOpen] = useState(false)
    const project = projects[selected]

    useEffect(mountTelemetry, [])
    return <>
    <a className="skip" href="#main">{t.nav.skip}</a>
      <div className="grain-layer" aria-hidden="true"></div>
      <canvas id="topo-canvas" aria-hidden="true"></canvas>

      <aside className="hud-rail" aria-hidden="true">
        <div className="hud-rail-track"><div className="hud-rail-fill" id="railFill"></div></div>
        <span className="hud-rail-pct" id="railPct">000%</span>
      </aside>

      <header className="topbar" onKeyDown={event => {
        if (menuOpen && event.key === "Escape") {
          setMenuOpen(false)
          event.currentTarget.querySelector<HTMLButtonElement>(".menu-trigger")?.focus()
        }
      }}>
        <a href="#heroWrap" className="brand" aria-label={"SabahClick · " + t.nav.home}>
          <span className="brand-mark"></span>
          <span className="brand-text">SABAH<span>CLICK</span></span>
        </a>
        <nav className="nav-links" id="home-navigation" data-open={menuOpen} onClick={() => setMenuOpen(false)}>
          <a href="#pipeline">{text.nav_workflow}</a>
          <a href="#services">{text.nav_services}</a>
          <a href="#process">{text.nav_process}</a>
          <a href="#showcase">{text.nav_work}</a>
          <a href="#vkscanner">VKscanner</a>
        </nav>
        <div className="nav-controls">
          <button className="menu-trigger" type="button" aria-label={menuOpen ? t.nav.closeMenu : t.nav.menu} aria-controls="home-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "×" : "☰"}</button>
          <div className="lang-group" role="group" aria-label={t.nav.language}>
            <button type="button" className={"lang-btn" + (language === "en" ? " active" : "")} aria-pressed={language === "en"} onClick={() => setLanguage("en")}>{"EN"}</button>
            <button type="button" className={"lang-btn" + (language === "cn" ? " active" : "")} aria-pressed={language === "cn"} onClick={() => setLanguage("cn")}>{"中文"}</button>
            <button type="button" className={"lang-btn" + (language === "bm" ? " active" : "")} aria-pressed={language === "bm"} onClick={() => setLanguage("bm")}>{"BM"}</button>
          </div>
          <a href="#contact" className="btn-primary">{text.cta_discuss}</a>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero-wrap" id="heroWrap">
          <div className="hero-sticky">
            <div className="container">
              <div className="hero-meta-row">
                <span><span className="status-dot"></span>SYSTEM ONLINE // KOTA KINABALU, SABAH</span>
                <span>05°58′49″N 116°04′24″E</span>
                <span>EDITION 01 // OBSIDIAN PROTOCOL</span>
              </div>
            </div>

            <div className="container">
              <div className="hero-grid">
                <div>
                  <div className="hero-eyebrow">{text.hero_eyebrow}</div>
                  <h1 className="hero-title" id="heroTitle">
                    <span className="line" data-shift="-1">{highlight(text.hero_line1)}</span>
                    <span className="line" data-shift="1">{highlight(text.hero_line2)}</span>
                    <span className="line" data-shift="-0.6">{highlight(text.hero_line3)}</span>
                  </h1>
                </div>
                <div className="hero-side">
                  <p className="hero-desc">{text.hero_desc}</p>
                  <div className="hero-actions">
                    <a href="#contact" className="btn-primary">{text.cta_discuss}</a>
                    <a href="#services" className="btn-ghost">{text.cta_services}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="hero-footer-strip">
                <div className="telemetry-cell">
                  <span>FOCUS</span>
                  <span>{text.focus}</span>
                </div>
                <div className="telemetry-cell">
                  <span>WEB &amp; SEO</span>
                  <span>{text.web_price}</span>
                </div>
                <div className="telemetry-cell">
                  <span>UTILITY</span>
                  <span>{text.utility}</span>
                </div>
                <div className="telemetry-cell">
                  <span>SCROLL</span>
                  <span id="scrollVelocityHud">READY // 0.00 PX/F</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pipeline-scroll-zone" id="pipeline">
          <div className="pipeline-sticky">
            <div className="container">
              <div className="pipeline-shell">
                <div>
                  <div className="section-tag">01 // LIVE WORKFLOW SIMULATION</div>
                  <h2 className="section-title">{text.pipe_title}</h2>
                  <p style={{ color: "var(--ink-muted)", maxWidth: "44ch", fontSize: "15px" }}>{text.pipe_sub}</p>
                  <div className="pipeline-steps" id="pipeSteps">
                    <div className="p-step active" data-stage="0">
                      <div className="p-step-head">
                        <span className="p-step-num">01</span>
                        <h3><button type="button" className="stage-select" data-select="0">{text.step1_t}</button></h3>
                      </div>
                      <p>{text.step1_d}</p>
                    </div>
                    <div className="p-step" data-stage="1">
                      <div className="p-step-head">
                        <span className="p-step-num">02</span>
                        <h3><button type="button" className="stage-select" data-select="1">{text.step2_t}</button></h3>
                      </div>
                      <p>{text.step2_d}</p>
                    </div>
                    <div className="p-step" data-stage="2">
                      <div className="p-step-head">
                        <span className="p-step-num">03</span>
                        <h3><button type="button" className="stage-select" data-select="2">{text.step3_t}</button></h3>
                      </div>
                      <p>{text.step3_d}</p>
                    </div>
                  </div>
                </div>

                <div className="signal-console" lang="en">
                  <div className="console-bar">
                    <span>SABAHCLICK.ENGINE // BOOKING_ROUTER</span>
                    <span id="consoleStageLabel" style={{ color: "var(--accent)" }}>STAGE 01 / INTAKE</span>
                  </div>
                  <div className="console-nodes">
                    <div className="c-node lit" id="cNode0">
                      <div className="c-node-id">NODE_01</div>
                      <div className="c-node-label">WHATSAPP</div>
                    </div>
                    <div className="c-link"><div className="c-link-fill" id="cLink0"></div></div>
                    <div className="c-node" id="cNode1">
                      <div className="c-node-id">NODE_02</div>
                      <div className="c-node-label">AI PARSER</div>
                    </div>
                    <div className="c-link"><div className="c-link-fill" id="cLink1"></div></div>
                    <div className="c-node" id="cNode2">
                      <div className="c-node-id">NODE_03</div>
                      <div className="c-node-label">TEAM REVIEW</div>
                    </div>
                  </div>
                  <div className="console-stream" id="consoleStream"></div>
                  <div className="console-progress-bar">
                    <div className="console-progress-fill" id="consoleProgress"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-band" id="services">
          <div className="container">
            <div className="section-head-split reveal">
              <div>
                <div className="section-tag">02 // CORE CAPABILITIES</div>
                <h2 className="section-title">{text.svc_heading}</h2>
              </div>
              <p className="section-lead">{text.svc_sub}</p>
            </div>

            <div className="services-matrix reveal">
              <article className="service-module">
                <div>
                  <div className="svc-index">SYS_01 // BESPOKE AUTOMATION</div>
                  <h3 className="svc-title">{text.svc1_t}</h3>
                  <p className="svc-desc">{text.svc1_d}</p>
                </div>
                <div className="svc-specs">
                  <span className="spec-pill">{text.triage}</span>
                  <span className="spec-pill">{text.extract}</span>
                  <span className="spec-pill">{text.reports}</span>
                </div>
              </article>

              <article className="service-module">
                <div>
                  <div className="svc-index">SYS_02 // STAGED INTEGRATION</div>
                  <h3 className="svc-title">{text.svc2_t}</h3>
                  <p className="svc-desc">{text.svc2_d}</p>
                </div>
                <div className="svc-specs">
                  <span className="spec-pill">{text.audit}</span>
                  <span className="spec-pill">{text.sync}</span>
                  <span className="spec-pill">{text.rollout}</span>
                </div>
              </article>

              <article className="service-module span-full">
                <div>
                  <div className="svc-index">SYS_03 // DIGITAL PRESENCE &amp; SEARCH</div>
                  <h3 className="svc-title">{text.svc3_t}</h3>
                  <p className="svc-desc">{text.svc3_d}</p>
                  <a href="#showcase" className="btn-ghost">{t.web.showcaseLink} ↓</a> <Link href="/web-design" className="btn-ghost">{t.nav.web} ↗</Link>
                </div>
                <div className="pricing-strip">
                  {[1, 0, 2].map(index => {
                    const offer = t.web.services[index]
                    return <div key={index} className="price-tier">
                      <span className="price-tier-name">{offer.title}</span>
                      <span className="price-tier-val">{offer.price}</span>
                      <span className="price-tier-note">{offer.detail}</span>
                    </div>
                  })}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section-band" id="process">
          <div className="container">
            <div className="section-head-split reveal">
              <div>
                <div className="section-tag">03 // EXECUTION PROTOCOL</div>
                <h2 className="section-title">{text.proc_heading}</h2>
              </div>
              <p className="section-lead">{text.proc_sub}</p>
            </div>

            <div className="process-list" id="about">
              <div className="process-item">
                <div className="process-num">01</div>
                <h3>{text.proc1_t}</h3>
                <p>{text.proc1_d}</p>
              </div>
              <div className="process-item">
                <div className="process-num">02</div>
                <h3>{text.proc2_t}</h3>
                <p>{text.proc2_d}</p>
              </div>
              <div className="process-item">
                <div className="process-num">03</div>
                <h3>{text.proc3_t}</h3>
                <p>{text.proc3_d}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-band" id="showcase">
          <div className="container">
            <div className="section-head-split reveal">
              <div>
                <div className="section-tag">04 // SELECTED DEPLOYMENTS</div>
                <h2 className="section-title">{t.web.showcase}</h2>
              </div>
              <p className="section-lead">
                {t.web.showcaseDescription}
              </p>
            </div>

            <div className="showcase-grid">
              <div className="project-index" id="projectIndex">
                {projects.map((project, index) => (
                  <a key={project.id} className="project-row" href={project.url} target="_blank" rel="noopener noreferrer"
                    onMouseEnter={() => setSelected(index)} onFocus={() => setSelected(index)}>
                    <span className="proj-num">{String(index + 1).padStart(2, "0")}</span>
                    <span className="proj-name">{project.name}</span>
                    <span className={project.live ? "proj-tag live" : "proj-tag"}>{project.live ? t.web.clientProject : t.web.conceptProject}</span>
                    <span className="proj-arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
              <aside className="preview-hud">
                <div className="preview-screen">
                  <div className="scanline"></div>
                  <div className="preview-meta-top">
                    <span id="hudCode">{project.id}</span>
                    <span id="hudStatus" style={{ color: "var(--accent)" }}>{project.live ? t.web.clientProject : t.web.conceptProject}</span>
                  </div>
                  <div className="preview-center-title" id="hudTitle">{project.name}</div>
                  <div className="preview-meta-bot">
                    <span>{project.id === "PRJ_12" ? "KUALA LUMPUR, MY" : "SABAH, MY"}</span>
                    <span id="hudSector">{project.sector}</span>
                  </div>
                </div>
                <p className="preview-hud-desc" id="hudDesc">{project.desc}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-ghost" id="hudLink" style={{ width: "100%", justifyContent: "space-between" }}>
                  <span>{text.open_project}</span><span>↗</span>
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section className="section-band" id="vkscanner">
          <div className="container">
            <div className="vk-banner reveal" id="apps">
              <div>
                <div className="section-tag">05 // FREE LOCAL UTILITY</div>
                <h2 className="section-title">VKscanner <span style={{ color: "var(--accent)", fontSize: "0.45em", fontFamily: "var(--font-mono)", verticalAlign: "middle" }}>[ANDROID]</span></h2>
                <p style={{ color: "var(--ink-muted)", maxWidth: "48ch", marginBottom: "28px", fontSize: "15.5px" }}>{text.vk_desc}</p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <a href={whatsAppUrl + "?text=" + encodeURIComponent(t.apps.message)} target="_blank" rel="noopener noreferrer" className="btn-primary">{t.apps.availability} ↗</a>
                  <a href="/vkscanner/privacy" target="_blank" rel="noopener noreferrer" className="btn-ghost">{t.apps.privacy} ↗</a>
                  <Link className="btn-ghost" href="/apps">{t.apps.browse} ↗</Link>
                </div>
              </div>
              <div className="vk-specs">
                <div className="vk-spec-box">
                  <strong>{text.device}</strong>
                  <span>{text.device_desc}</span>
                </div>
                <div className="vk-spec-box">
                  <strong>{text.tracking}</strong>
                  <span>{text.tracking_desc}</span>
                </div>
                <div className="vk-spec-box">
                  <strong>{text.ocr}</strong>
                  <span>{text.ocr_desc}</span>
                </div>
                <div className="vk-spec-box">
                  <strong>{text.free}</strong>
                  <span>{text.free_desc}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-band" id="contact">
          <div className="container">
            <div className="contact-grid">
              <div className="reveal">
                <div className="section-tag">06 // INITIATE CONTACT</div>
                <h2 className="section-title">{text.contact_title}</h2>
                <p style={{ color: "var(--ink-muted)", maxWidth: "42ch", fontSize: "15.5px" }}>{text.contact_desc}</p>
                <div className="contact-channels">
                  <a href="https://wa.me/60128131441" target="_blank" rel="noopener noreferrer" className="channel-link">
                    <div>
                      <span className="channel-label">{text.wa}</span>
                      <span className="channel-val">+60 12-813 1441</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)" }}>↗</span>
                  </a>
                  <a href="mailto:sabahclick.my@gmail.com" className="channel-link">
                    <div>
                      <span className="channel-label">{text.mail}</span>
                      <span className="channel-val">sabahclick.my@gmail.com</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)" }}>↗</span>
                  </a>
                  <div className="channel-link" style={{ cursor: "default" }}>
                    <div>
                      <span className="channel-label">{text.location}</span>
                      <span className="channel-val">Kota Kinabalu, Sabah, Malaysia</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>MY</span>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <span>SABAHCLICK // KOTA KINABALU, SABAH</span>
          <span>© {new Date().getUTCFullYear()} SABAHCLICK. ALL SYSTEMS OPERATIONAL.</span>
        </div>
      </footer>
    </>
}
