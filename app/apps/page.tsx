import type { Metadata } from "next"
import { AppsCatalog } from "@/components/sections/apps"

const title = "Free Apps"
const description = "Browse free tools by SabahClick, including VKscanner, an offline Android app for scanning documents, recognising text, and exporting PDFs."

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/apps" },
    openGraph: { title, description, url: "/apps" },
    twitter: { title, description, card: "summary_large_image" },
}

export default function AppsPage() {
    return (
        <main id="main" tabIndex={-1}>
            <AppsCatalog />
        </main>
    )
}
