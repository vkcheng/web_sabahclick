import type { Metadata } from "next"
import { siteDescription, siteTitle, siteUrl } from "./site"

export const socialImage = {
    url: new URL("/opengraph-image", siteUrl).href,
    width: 1200,
    height: 630,
    alt: "SabahClick: AI workflow systems, apps and AI training in Sabah",
}

export const siteMetadata: Metadata = {
    metadataBase: siteUrl,
    applicationName: "SabahClick",
    title: {
        default: siteTitle,
        template: "%s | SabahClick",
    },
    description: siteDescription,
    keywords: [
        "AI course Sabah",
        "AI training Kota Kinabalu",
        "AI 课程 亚庇",
        "AI automation Sabah",
        "custom software Kota Kinabalu",
        "custom system development Malaysia",
    ],
    authors: [{ name: "SabahClick" }],
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        url: "/",
        siteName: "SabahClick",
        title: siteTitle,
        description: siteDescription,
        images: [socialImage],
        locale: "en_MY",
    },
    twitter: {
        images: [socialImage],
        card: "summary_large_image",
        title: siteTitle,
        description: siteDescription,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
}
