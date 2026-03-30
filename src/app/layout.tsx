import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Aviv Oron",
  description: "Software engineer. Building things that matter.",
  openGraph: {
    title: "Aviv Oron",
    description: "Software engineer. Building things that matter.",
    url: "https://avivo.dev",
    siteName: "avivo.dev",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Aviv Oron",
    description: "Software engineer. Building things that matter.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aviv Oron",
  url: "https://avivo.dev",
  jobTitle: "Software Engineer",
  description: "Software engineer. Building things that matter.",
  sameAs: [
    "https://github.com/AvivOron",
    "https://www.linkedin.com/in/aviv-oron-9569616b/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
