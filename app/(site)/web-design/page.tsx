import { socialImage } from "@/lib/site-metadata"
import type { Metadata } from "next"
import { WebDesign } from "@/components/sections/showcase"

const title = "Web Design for Sabah Businesses"
const description = "Business websites, landing pages, and local SEO for Sabah businesses. See SabahClick's website projects and web design services."

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/web-design" },
    openGraph: { title, description, images: [socialImage], url: "/web-design" },
    twitter: { title, description, images: [socialImage], card: "summary_large_image" },
}

export default function WebDesignPage() {
    return (
        <main id="main" tabIndex={-1}>
            <WebDesign />
        </main>
    )
}
