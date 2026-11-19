import { ObsidianHome } from "@/components/obsidian/home"
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
        itemListElement: ["Custom AI systems", "AI transformation", "Web design"].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
        })),
    },
}

export default function Home() {
    return <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <ObsidianHome />
    </>
}
