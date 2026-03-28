import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
