import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import { Analytics } from '@vercel/analytics/next';


export const metadata: Metadata = {
  title: "avivo.dev",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <footer className="border-t border-white/5 py-8 text-center text-sm text-white/30 font-mono">
        avivo.dev
      </footer>
      <Analytics />
    </main>
  );
}
