import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sabahclick.my");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "SabahClick",
  title: {
    default: "SabahClick | Web Design & SEO in Kota Kinabalu, Sabah",
    template: "%s | SabahClick",
  },
  description:
    "SabahClick builds fast, modern websites, landing pages, and local SEO campaigns for small businesses in Kota Kinabalu and across Sabah.",
  keywords: [
    "Sabah web design",
    "Kota Kinabalu web design",
    "landing page Sabah",
    "local SEO Sabah",
    "website design Malaysia",
    "small business website",
  ],
  authors: [{ name: "SabahClick" }],
  creator: "SabahClick",
  publisher: "SabahClick",
  category: "Web Design",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "SabahClick",
    title: "SabahClick | Web Design & SEO in Kota Kinabalu, Sabah",
    description:
      "Fast websites, conversion-focused landing pages, and local SEO for Sabah businesses.",
    locale: "en_MY",
  },
  twitter: {
    card: "summary_large_image",
    title: "SabahClick | Web Design & SEO in Kota Kinabalu, Sabah",
    description:
      "Fast websites, conversion-focused landing pages, and local SEO for Sabah businesses.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
