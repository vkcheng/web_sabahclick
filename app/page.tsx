import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Services } from "@/components/sections/services"
import { SocialProof } from "@/components/sections/social-proof"
import { Showcase } from "@/components/sections/showcase"
import { Contact } from "@/components/sections/contact"
import { WhatsAppFloat } from "@/components/ui/whatsapp-float"

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sabahclick.my"
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SabahClick",
    url: siteUrl,
    logo: `${siteUrl}/opengraph-image`,
    image: `${siteUrl}/opengraph-image`,
    description:
      "SabahClick builds fast, modern websites, landing pages, and local SEO campaigns for small businesses in Kota Kinabalu and across Sabah.",
    email: "sabahclick.my@gmail.com",
    telephone: "+60128131441",
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Sabah",
      },
      {
        "@type": "City",
        name: "Kota Kinabalu",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kota Kinabalu",
      addressRegion: "Sabah",
      addressCountry: "MY",
    },
    priceRange: "RM299-RM399/month",
    sameAs: ["https://wa.me/60128131441"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web design and SEO services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Website Design",
          priceCurrency: "MYR",
          price: "599",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Landing Page Design",
          priceCurrency: "MYR",
          price: "299",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Local SEO Optimization",
          priceCurrency: "MYR",
          price: "399",
          availability: "https://schema.org/InStock",
        },
      ],
    },
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-cyan selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <Hero />
      <About />
      <Services />
      <SocialProof />
      <Showcase />
      <Contact />
      <WhatsAppFloat />
    </main>
  );
}
