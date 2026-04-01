"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    name: "Finance Hub",
    description:
      "Monthly financial net worth tracking desktop app. Visualize and manage your finances with clarity.",
    tags: ["TypeScript", "Desktop", "Finance"],
    appHref: "/finance-hub",
    codeHref: "https://github.com/AvivOron/finance-hub",
    status: "active",
    screenshots: [
      "/screenshots/finance-hub-1.jpg",
      "/screenshots/finance-hub-2.jpg",
      "/screenshots/finance-hub-3.jpg",
    ],
  },
  {
    name: "Guess Who",
    description:
      "Multiplayer guessing game. Players take turns in the hot seat, asking yes/no questions to guess a hidden word from a randomlly selected category.",
    tags: ["TypeScript", "Multiplayer", "Game"],
    appHref: "/guess-who",
    codeHref: "https://github.com/AvivOron/guess-who",
    status: "active",
    screenshots: [
      "/screenshots/guess-who-1.jpg",
      "/screenshots/guess-who-2.jpg",
      "/screenshots/guess-who-3.jpg",
      "/screenshots/guess-who-4.jpg",
    ],
  },
  {
    name: "Tales & Choices",
    description:
      "Interactive Hebrew storytelling app for toddlers. Create a hero, pick companions and a setting, then shape the story through choices — powered by Gemini AI.",
    tags: ["TypeScript", "Hebrew", "AI", "Kids"],
    appHref: "/tales-and-choices",
    codeHref: "https://github.com/AvivOron/tails-and-choices",
    status: "active",
    screenshots: [
      "/screenshots/tales-and-choices-1.jpg",
      "/screenshots/tales-and-choices-2.jpg",
      "/screenshots/tales-and-choices-3.jpg",
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-32">
      {/* Section heading */}
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 flex flex-col gap-2">
          <span className="font-mono text-xs tracking-widest text-white/30 uppercase">
            playground
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Projects
          </h2>
          <p className="text-white/40 text-sm max-w-md">
            Things I&apos;m building and experimenting with.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}

          {/* Placeholder card */}
          <PlaceholderCard />
        </div>
      </div>
    </section>
  );
}

type Project = {
  name: string;
  description: string;
  tags: string[];
  appHref: string;
  codeHref: string;
  status: string;
  screenshots?: string[];
};

function Lightbox({
  screenshots,
  initialIndex,
  onClose,
}: {
  screenshots: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [active, setActive] = useState(initialIndex);

  // Close on Escape, navigate with arrow keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setActive((s) => (s === screenshots.length - 1 ? 0 : s + 1));
      if (e.key === "ArrowLeft")
        setActive((s) => (s === 0 ? screenshots.length - 1 : s - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screenshots.length, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Image container — stop propagation so clicking the image itself doesn't close */}
      <div
        className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <Image
            src={screenshots[active]}
            alt={`Screenshot ${active + 1}`}
            width={1400}
            height={900}
            className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain shadow-2xl"
            priority
          />
        </div>

        {/* Prev arrow */}
        {screenshots.length > 1 && (
          <button
            onClick={() =>
              setActive((s) => (s === 0 ? screenshots.length - 1 : s - 1))
            }
            className="absolute -left-12 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-all text-xl"
            aria-label="Previous"
          >
            ‹
          </button>
        )}

        {/* Next arrow */}
        {screenshots.length > 1 && (
          <button
            onClick={() =>
              setActive((s) => (s === screenshots.length - 1 ? 0 : s + 1))
            }
            className="absolute -right-12 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-all text-xl"
            aria-label="Next"
          >
            ›
          </button>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-all"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Dot indicators */}
      {screenshots.length > 1 && (
        <div
          className="absolute bottom-4 flex gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === active ? "w-5 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hovered) setActiveSlide(0);
  }, [hovered]);

  return (
    <>
      <div
        ref={ref}
        className="group relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-sm hover:border-white/40 hover:bg-white/5"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: visible
            ? "border-color 0.3s, background-color 0.3s"
            : "opacity 0.6s ease, transform 0.6s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Glow on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99,102,241,0.06), transparent 70%)",
          }}
        />

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-white text-base leading-tight">
              {project.name}
            </h3>
            {project.status === "active" && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400/70 font-mono">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                active
              </span>
            )}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <a
              href={project.appHref}
              className="flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs text-indigo-300 font-sans font-medium transition-all duration-200 hover:border-indigo-500/60 hover:bg-indigo-500/20 hover:text-indigo-200"
            >
              Live app ↗
            </a>
            <a
              href={project.codeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50 font-sans font-medium transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white/70"
            >
              Source ↗
            </a>
          </div>
        </div>

        <p className="text-sm text-white/45 leading-relaxed">
          {project.description}
        </p>

        {/* Screenshot carousel — expands on hover */}
        {hasScreenshots && (
          <div
            style={{
              display: "grid",
              gridTemplateRows: hovered ? "1fr" : "0fr",
              transition: "grid-template-rows 0.35s ease",
            }}
          >
            <div className="overflow-hidden">
              <div className="pt-2 pb-1">
                {/* Slides */}
                <div className="relative overflow-hidden rounded-xl border border-white/8 aspect-video bg-white/5">
                  {project.screenshots!.map((src, i) => (
                    <div
                      key={src}
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{ opacity: i === activeSlide ? 1 : 0 }}
                    >
                      <Image
                        src={src}
                        alt={`${project.name} screenshot ${i + 1}`}
                        fill
                        className="object-cover cursor-zoom-in"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        onClick={(e) => {
                          e.preventDefault();
                          setLightboxIndex(i);
                        }}
                      />
                    </div>
                  ))}

                  {/* Prev / Next arrows */}
                  {project.screenshots!.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSlide((s) =>
                            s === 0 ? project.screenshots!.length - 1 : s - 1
                          );
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white/70 hover:bg-black/70 hover:text-white transition-all"
                        aria-label="Previous screenshot"
                      >
                        ‹
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSlide((s) =>
                            s === project.screenshots!.length - 1 ? 0 : s + 1
                          );
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white/70 hover:bg-black/70 hover:text-white transition-all"
                        aria-label="Next screenshot"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {/* Dot indicators */}
                {project.screenshots!.length > 1 && (
                  <div className="mt-2 flex justify-center gap-1.5">
                    {project.screenshots!.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSlide(i);
                        }}
                        className={`h-1 rounded-full transition-all duration-200 ${
                          i === activeSlide
                            ? "w-4 bg-indigo-400"
                            : "w-1 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Go to screenshot ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-white/40 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          screenshots={project.screenshots!}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

function PlaceholderCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/8 p-6 text-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/20">
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <p className="text-xs text-white/25 font-mono">more coming soon</p>
    </div>
  );
}
