import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const BASE_URL = "https://avivo.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Aviv Oron — Software Engineer",
    template: "%s | Aviv Oron",
  },
  description:
    "Aviv Oron — Software engineer building things that matter. Dad, husband, sailor, scuba diver. Projects: Finance Hub, Guess Who, Tales & Choices.",
  keywords: ["Aviv Oron", "software engineer", "avivo.dev", "Finance Hub", "Guess Who", "Tales & Choices"],
  authors: [{ name: "Aviv Oron", url: BASE_URL }],
  creator: "Aviv Oron",
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Aviv Oron — Software Engineer",
    description:
      "Software engineer building things that matter. Dad, husband, sailor, scuba diver.",
    url: BASE_URL,
    siteName: "avivo.dev",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aviv Oron — Software Engineer",
    description: "Software engineer building things that matter.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aviv Oron",
    url: BASE_URL,
    jobTitle: "Software Engineer",
    description:
      "Software engineer building things that matter. Dad, husband, sailor, scuba diver.",
    image: `${BASE_URL}/images/aviv.png`,
    sameAs: [
      "https://github.com/AvivOron",
      "https://www.linkedin.com/in/aviv-oron-9569616b/",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "avivo.dev",
    url: BASE_URL,
    author: { "@type": "Person", name: "Aviv Oron" },
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects",
    url: `${BASE_URL}/#projects`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Finance Hub",
        description: "Monthly financial net worth tracking desktop app.",
        url: `${BASE_URL}/finance-hub`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guess Who",
        description: "Multiplayer guessing game with yes/no questions.",
        url: `${BASE_URL}/guess-who`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Tales & Choices",
        description: "Interactive Hebrew AI storytelling app for toddlers.",
        url: `${BASE_URL}/tales-and-choices`,
      },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {jsonLd.map((block, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
          />
        ))}
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
