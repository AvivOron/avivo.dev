"use client";

import { useEffect, useRef, useState } from "react";

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
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
    <section id="education" className="relative px-6 pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Education
          </h2>
        </div>

        <div
          ref={ref}
          className="flex gap-6 border-t border-b border-white/5 py-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div className="flex-shrink-0 flex items-center justify-center w-8">
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          <div className="flex flex-1 gap-3">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                <span className="text-white/85 font-medium text-sm">
                  B.Sc. Computer Science
                </span>
                <span className="hidden sm:block text-white/20">·</span>
                <a
                  href="https://www.bgu.ac.il"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/45 hover:text-white/70 transition-colors"
                >
                  Ben-Gurion University
                </a>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
                Built a strong foundation in software engineering, algorithms,
                and large-scale systems thinking while working as the first
                engineer at{" "}
                <a
                  href="https://tracxn.com/d/companies/hypertunity/__uwE0CvQj8Et-Ao06RY2AJMqOTbGHWavWIqYcfAa5vjs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/65 hover:text-white/80 transition-colors"
                >
                  Hypertunity
                </a>{" "}
                during my studies.
              </p>
            </div>

            <span className="ml-auto font-mono text-xs text-white/25 whitespace-nowrap">
              2015–2017
            </span>
          </div>
        </div>

        <a
          href="#projects"
          className="mt-16 flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity"
        >
          <span className="text-xs font-mono text-white/40 tracking-widest uppercase">
            projects
          </span>
          <svg
            className="h-4 w-4 text-white/40 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
