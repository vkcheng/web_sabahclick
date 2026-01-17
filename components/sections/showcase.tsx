"use client"

import { useLanguage } from "@/lib/i18n/language-context"

export function Showcase() {
    const { t } = useLanguage()

    const projects = [
        {
            title: "Lanny Bigu",
            category: "Wellness Academy",
            url: "https://www.lannybigu.com",
            color: "from-emerald-900/40 to-teal-900/40",
            image: "https://huiluiebajsmbrejbnux.supabase.co/storage/v1/object/public/images/SabahClick/Screenshot%202026-01-04%20175225.png"
        },
        {
            title: "Sheng Yong Dim Sum",
            category: "F&B / Restaurant",
            url: "https://website-sheng-yong-dim-sum.vercel.app/",
            color: "from-orange-900/40 to-red-900/40",
            image: "https://huiluiebajsmbrejbnux.supabase.co/storage/v1/object/public/images/SabahClick/Screenshot%202026-01-04%20175202.png"
        },
        {
            title: "Jesselton Stay",
            category: "Hospitality / Homestay",
            url: "https://www.jesseltonstay.com",
            color: "from-blue-900/40 to-indigo-900/40",
            image: "https://huiluiebajsmbrejbnux.supabase.co/storage/v1/object/public/images/SabahClick/Screenshot%202026-01-04%20175129.png"
        },
        {
            title: "Ezzy HomeStay",
            category: "Hospitality / Homestay",
            url: "https://www.ezzyhomestay.com",
            color: "from-purple-900/40 to-violet-900/40",
            image: "https://huiluiebajsmbrejbnux.supabase.co/storage/v1/object/public/images/SabahClick/ezzyhomestay.png"
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
                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                            <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="font-display font-bold text-xl text-white mb-1">{item.title}</h3>
                                    <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.category}</p>
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
