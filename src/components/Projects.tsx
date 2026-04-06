"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const projects = [
  {
    name: "Finance Hub",
    description:
      "Web app for tracking net worth month by month. Visualize your financial history and project where you're headed.",
    tags: ["TypeScript", "Web", "Finance"],
    appHref: "/finance-hub",
    codeHref: "https://github.com/AvivOron/finance-hub",
    status: "active",
    screenshots: [
      "/screenshots/finance-hub-1.jpg",
      "/screenshots/finance-hub-2.jpg",
      "/screenshots/finance-hub-3.jpg",
      "/screenshots/finance-hub-4.jpg",
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
    name: "Magna Mind",
    description:
      "Snap a photo of your magnetic tiles, let AI count and identify them, then get personalized building challenges tailored to exactly what you have.",
    tags: ["TypeScript", "AI", "Kids"],
    appHref: "/magna-mind",
    codeHref: "https://github.com/AvivOron/magna-mind",
    status: "alpha",
    screenshots: [],
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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const ratiosRef = useRef<number[]>(projects.map(() => 0));

  const handleRatio = useCallback((index: number, ratio: number) => {
    ratiosRef.current[index] = ratio;
    const max = Math.max(...ratiosRef.current);
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch && max > 0.6) {
      setFocusedIndex(ratiosRef.current.indexOf(max));
    } else if (!isTouch) {
      setFocusedIndex(null);
    }
  }, []);

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
          {projects.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              mobileFocused={focusedIndex === i}
              onIntersectRatio={handleRatio}
            />
          ))}

          {/* Placeholder card */}
          <PlaceholderCard />
        </div>
      </div>
    </section>
  );
}

/** Returns touch handlers that call onLeft/onRight after a 40px horizontal swipe. */
function useSwipe(onLeft: () => void, onRight: () => void) {
  const startX = useRef<number | null>(null);
  return {
    onTouchStart: (e: React.TouchEvent) => {
      startX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (startX.current === null) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      if (Math.abs(dx) > 40) dx < 0 ? onLeft() : onRight();
      startX.current = null;
    },
  };
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
  const prev = () => setActive((s) => (s === 0 ? screenshots.length - 1 : s - 1));
  const next = () => setActive((s) => (s === screenshots.length - 1 ? 0 : s + 1));
  const swipe = useSwipe(next, prev);

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
      {...swipe}
    >
      {/* Image — stop propagation so clicking it doesn't close */}
      <div onClick={(e) => e.stopPropagation()}>
        <Image
          src={screenshots[active]}
          alt={`Screenshot ${active + 1}`}
          width={1400}
          height={900}
          className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain shadow-2xl"
          priority
        />
      </div>

      {/* Prev arrow — fixed to viewport edge */}
      {screenshots.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActive((s) => (s === 0 ? screenshots.length - 1 : s - 1));
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-all text-xl"
          aria-label="Previous"
        >
          ‹
        </button>
      )}

      {/* Next arrow — fixed to viewport edge */}
      {screenshots.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActive((s) => (s === screenshots.length - 1 ? 0 : s + 1));
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-all text-xl"
          aria-label="Next"
        >
          ›
        </button>
      )}

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

function ProjectCard({
  project,
  index,
  mobileFocused,
  onIntersectRatio,
}: {
  project: Project;
  index: number;
  mobileFocused: boolean;
  onIntersectRatio: (index: number, ratio: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;
  const expanded = hovered || mobileFocused;
  const total = project.screenshots?.length ?? 0;
  const carouselSwipe = useSwipe(
    () => setActiveSlide((s) => (s === total - 1 ? 0 : s + 1)),
    () => setActiveSlide((s) => (s === 0 ? total - 1 : s - 1))
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Visibility observer for entry animation (fires once)
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          visibilityObserver.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    visibilityObserver.observe(el);

    // Ratio observer for mobile focus detection (continuous)
    const ratioObserver = new IntersectionObserver(
      ([entry]) => onIntersectRatio(index, entry.intersectionRatio),
      { threshold: [0, 0.25, 0.5, 0.75, 1.0] }
    );
    ratioObserver.observe(el);

    return () => {
      visibilityObserver.disconnect();
      ratioObserver.disconnect();
    };
  }, [onIntersectRatio]);

  useEffect(() => {
    if (!expanded) setActiveSlide(0);
  }, [expanded]);

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
            {project.status === "alpha" && (
              <span className="flex items-center gap-1.5 text-xs text-amber-400/70 font-mono">
                <span className="h-1 w-1 rounded-full bg-amber-400" />
                alpha
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
              gridTemplateRows: expanded ? "1fr" : "0fr",
              transition: "grid-template-rows 0.35s ease",
            }}
          >
            <div className="overflow-hidden">
              <div className="pt-2 pb-1">
                {/* Slides */}
                <div className="relative overflow-hidden rounded-xl border border-white/8 aspect-video bg-white/5" {...carouselSwipe}>
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
