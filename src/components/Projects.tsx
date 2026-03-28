"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    name: "Finance Hub",
    description:
      "Monthly financial net worth tracking desktop app. Visualize and manage your finances with clarity.",
    tags: ["TypeScript", "Desktop", "Finance"],
    href: "https://github.com/AvivOron/finance-hub",
    status: "active",
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
  href: string;
  status: string;
};

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <a
      ref={ref}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/3 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, background-color 0.3s",
      }}
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

      <div className="flex items-start justify-between">
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
        <ArrowIcon />
      </div>

      <p className="text-sm text-white/45 leading-relaxed">
        {project.description}
      </p>

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
    </a>
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

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 text-white/25 transition-all duration-200 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );
}
