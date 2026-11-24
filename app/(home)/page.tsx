import { Home as MachineHome } from "@/components/home/home"
import { contactEmail, siteDescription, siteUrl } from "@/lib/site"

const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SabahClick",
    url: siteUrl.href,
    image: new URL("/opengraph-image", siteUrl).href,
    description: siteDescription,
    email: contactEmail,
    telephone: "+60128131441",
    areaServed: [
        { "@type": "AdministrativeArea", name: "Sabah" },
        { "@type": "City", name: "Kota Kinabalu" },
    ],
    address: {
        "@type": "PostalAddress",
        addressLocality: "Kota Kinabalu",
        addressRegion: "Sabah",
        addressCountry: "MY",
    },
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "SabahClick services",
        itemListElement: ["Custom web systems", "Mobile app development", "Workflow systems and AI automation", "AI training"].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
        })),
    },
}

export default function Home() {
    return <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <MachineHome />
    </>
}
