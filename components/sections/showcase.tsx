"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"

export function Showcase() {
    const { t } = useLanguage()

    const projects = [
        {
            title: "Seng Yong Dim Sum",
            category: "F&B / Restaurant",
            problem: "Helped a 3rd-generation dim sum shop attract walk-in customers through Google Search.",
            url: "https://www.sengyongdimsum.com",
            color: "from-orange-900/40 to-red-900/40",
            image: "https://huiluiebajsmbrejbnux.supabase.co/storage/v1/object/public/images/SabahClick/Screenshot%202026-01-04%20175202.png"
        },
        {
            title: "Ezzy HomeStay",
            category: "Hospitality / Homestay",
            problem: "Replaced reliance on Airbnb fees with a direct-booking website that drives more revenue.",
            url: "https://www.ezzyhomestay.com",
            color: "from-purple-900/40 to-violet-900/40",
            image: "https://huiluiebajsmbrejbnux.supabase.co/storage/v1/object/public/images/SabahClick/ezzyhomestay.png"
        },
        {
            title: "Fika JTT",
            category: "Concept Demo",
            problem: "Demo: A specialty café needed an elegant site to showcase its menu and ambience online.",
            url: "/sample/FikaJTT/index.html",
            color: "from-amber-900/40 to-stone-900/40",
            image: "/sample/FikaJTT/img/Screenshot%202026-03-12%20134455.png"
        },
        {
            title: "Happy Place",
            category: "Concept Demo",
            problem: "Demo: A wellness brand needed a calming, trust-building page to convert visitors into customers.",
            url: "/sample/Happyplace/index.html",
            color: "from-rose-900/40 to-pink-900/40",
            image: "/sample/Happyplace/img/Screenshot%202026-03-13%20214952.png"
        },
        {
            title: "Lumiere Coffee",
            category: "Concept Demo",
            problem: "Demo: A coffee brand wanted a premium digital presence to compete with big-city competitors.",
            url: "/sample/Lumierecoffee/index.html",
            color: "from-yellow-900/40 to-neutral-900/40",
            image: "/sample/Lumierecoffee/img/Screenshot%202026-03-13%20082338.png"
        },
        {
            title: "Xoco.my",
            category: "Concept Demo",
            problem: "Demo: A chocolate artisan needed a bold landing page to drive WhatsApp orders directly.",
            url: "/sample/Xoco.my/index.html",
            color: "from-fuchsia-900/40 to-zinc-900/40",
            image: "/sample/Xoco.my/img/Screenshot%202026-03-13%20141144.png"
        },
        {
            title: "Jisoo Korean Fried Chicken",
            category: "Concept Demo",
            problem: "Demo: A Korean fried chicken brand needed a professional landing page for menu discovery and business enquiries.",
            url: "/sample/Jisoo/index.html",
            color: "from-red-900/40 to-blue-950/40",
            image: "/sample/Jisoo/img/001_122267617190020426.jpg"
        },
        {
            title: "The Well Cafe",
            category: "Concept Demo",
            problem: "Demo: A cafe brand needed a playful, high-impact landing page using yellow-red campaign visuals to drive visits and menu discovery.",
            url: "/sample/TheWellCafe/index.html",
            color: "from-yellow-800/40 to-red-900/40",
            image: "/sample/TheWellCafe/img/cover_478489465199533.jpg"
        },
        {
            title: "Quality Confinement Home",
            category: "Concept Demo",
            problem: "Demo: A confinement care brand needed a warm bilingual page to communicate trust, comfort, and professional postpartum support.",
            url: "/sample/Qconfine/index.html",
            color: "from-pink-900/40 to-emerald-950/40",
            image: "/sample/Qconfine/Screenshot%202026-05-18%20161829.png"
        },
        {
            title: "Republic Fitness KK",
            category: "Concept Demo",
            problem: "Demo: A fitness brand needed a bold, high-energy landing page to showcase facilities, training culture, and membership enquiries.",
            url: "/sample/RPFitness/index.html",
            color: "from-red-900/40 to-neutral-950/40",
            image: "/sample/RPFitness/Screenshot%202026-05-18%20094716.png"
        },
        {
            title: "Jesselton Stay",
            category: "Concept Demo",
            problem: "Demo: A Kota Kinabalu homestay needed a warm direct-booking page to highlight rooms, location, and guest enquiries.",
            url: "/sample/JesseltonStay/index.html",
            color: "from-teal-900/40 to-yellow-900/40",
            image: "https://huiluiebajsmbrejbnux.supabase.co/storage/v1/object/public/images/JesseltonStay/IMG-20221215-WA0234.jpg"
        },
        {
            title: "Happy Tree House",
            category: "Concept Demo",
            problem: "Demo: A child care centre needed a playful, colorful landing page to communicate warmth, safety, programs, and parent enquiries.",
            url: "/sample/HappyTree/index.html",
            color: "from-emerald-900/40 to-yellow-800/40",
            image: "/sample/HappyTree/img/472182563_522556340813428_9035446261907880246_n.jpg"
        }
    ]

    return (
        <section id="showcase" className="py-24 bg-background relative">
            <div className="container mx-auto px-6">
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-16 text-center">
                    {t.nav.showcase}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((item, index) => (
                        <a
                            key={index}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`aspect-video rounded-xl overflow-hidden border border-white/5 relative group cursor-pointer bg-gradient-to-br ${item.color}`}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                unoptimized
                                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                            <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="inline-block text-[10px] font-mono font-bold py-0.5 px-2 rounded-full bg-white/10 border border-white/20 text-gray-300 mb-2">
                                        {item.category}
                                    </span>
                                    <h3 className="font-display font-bold text-xl text-white mb-1">{item.title}</h3>
                                    <p className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                                        {item.problem}
                                    </p>
                                </div>
                            </div>

                            {/* Sci-fi overlay */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-cyan/50 rounded-xl transition-colors duration-300 pointer-events-none z-30" />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-neon-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_#00f0ff] z-30" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
