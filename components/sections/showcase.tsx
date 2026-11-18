"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

const sengYong = { name: "Seng Yong Dim Sum", url: "https://www.sengyongdimsum.com" }

const clientProjects = [
    sengYong,
    { name: "Ezzy HomeStay", url: "https://www.ezzyhomestay.com" },
]

const featuredConcepts = [
    { name: "Fika JTT", url: "/sample/FikaJTT/index.html", image: "/sample/FikaJTT/img/Screenshot%202026-03-12%20134455.png" },
    { name: "Quality Confinement Home", url: "/sample/Qconfine/index.html", image: "/sample/Qconfine/Screenshot%202026-05-18%20161829.png" },
    { name: "Republic Fitness KK", url: "/sample/RPFitness/index.html", image: "/sample/RPFitness/Screenshot%202026-05-18%20094716.png" },
]

const otherConcepts = [
    { name: "Lumiere Coffee", url: "/sample/Lumierecoffee/index.html" },
    { name: "Xoco.my", url: "/sample/Xoco.my/index.html" },
    { name: "Jisoo Korean Fried Chicken", url: "/sample/Jisoo/index.html" },
    { name: "The Well Cafe", url: "/sample/TheWellCafe/index.html" },
    { name: "Jesselton Stay", url: "/sample/JesseltonStay/index.html" },
    { name: "Happy Tree House", url: "/sample/HappyTree/index.html" },
    { name: "Chong Chu Chong Wei", url: "/sample/ChongChuChongWei6/index2.html" },
]

export function WebDesign() {
    const { t } = useLanguage()

    return (
        <>
            <section className="site-wrap standalone-layout section-split" aria-labelledby="web-title">
                <div className="section-intro">
                    <h1 id="web-title" className="headline">{t.web.title}</h1>
                    <p className="section-lead">{t.web.description}</p>
                    <div className="site-actions">
                        <Link href="/#contact" className="site-button button-primary">
                            {t.nav.contact} <ArrowUpRight size={17} aria-hidden="true" />
                        </Link>
                        <a href="#showcase" className="site-button button-secondary">
                            {t.web.showcaseLink} <ArrowDown size={17} aria-hidden="true" />
                        </a>
                    </div>
                </div>
                <a
                    className="web-preview"
                    href={sengYong.url}
                    aria-label={sengYong.name}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/work/seng-yong-dim-sum.webp"
                        alt=""
                        fill
                        loading="eager"
                        unoptimized
                    />
                </a>
            </section>

            <section className="site-section tinted-section" aria-labelledby="web-services-title">
                <div className="site-wrap">
                    <h2 id="web-services-title" className="section-title">{t.web.servicesTitle}</h2>
                    <ul className="web-services">
                        {t.web.services.map((service) => (
                            <li key={service.title}>
                                <h3>{service.title}</h3>
                                <p>{service.detail}</p>
                                <p className="price">{service.price}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section id="showcase" className="site-section" aria-labelledby="showcase-title">
                <div className="site-wrap">
                    <div className="section-intro">
                        <h2 id="showcase-title" className="section-title">{t.web.showcase}</h2>
                        <p className="section-lead">{t.web.showcaseDescription}</p>
                    </div>
                    <div className="project-grid">
                        {featuredConcepts.map((project) => (
                            <a key={project.url} href={project.url} className="project-card">
                                <div className="project-image">
                                    <Image src={project.image} alt="" fill unoptimized />
                                </div>
                                <span className="project-title">
                                    <span><strong>{project.name}</strong><span className="small-copy">{t.web.conceptProject}</span></span>
                                    <ArrowUpRight size={18} aria-hidden="true" />
                                </span>
                            </a>
                        ))}
                    </div>
                    <ul className="project-list">
                        {clientProjects.map((project) => (
                            <li key={project.url}>
                                <a className="project-link" href={project.url} target="_blank" rel="noopener noreferrer">
                                    <span><strong>{project.name}</strong><span className="small-copy">{t.web.clientProject}</span></span>
                                    <ArrowUpRight size={17} aria-hidden="true" />
                                </a>
                            </li>
                        ))}
                        {otherConcepts.map((project) => (
                            <li key={project.url}>
                                <a className="project-link" href={project.url}>
                                    <span><strong>{project.name}</strong><span className="small-copy">{t.web.conceptProject}</span></span>
                                    <ArrowUpRight size={17} aria-hidden="true" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}
