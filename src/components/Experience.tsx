"use client";

import { useEffect, useRef, useState } from "react";

const experience = [
  {
    role: "Sr. Software Engineer",
    company: "Alice",
    companyHref: "https://alice.io",
    period: "Present",
    current: true,
  },
  {
    role: "Sr. Software Engineer · Engineering Manager",
    company: "ZipRecruiter",
    companyHref: "https://www.ziprecruiter.com",
    period: "7+ years",
    current: false,
  },
  {
    role: "Software Engineer",
    company: "Sizmek (acquired by Amazon)",
    companyHref: "https://www.linkedin.com/company/sizmek",
    period: "1 year",
    current: false,
  },
  {
    role: "Software Engineer",
    company: "Unit 8200",
    companyHref: null,
    period: "5 years",
    current: false,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex flex-col gap-2">
          <span className="font-mono text-xs tracking-widest text-white/30 uppercase">
            background
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Experience
          </h2>
        </div>

        <div className="flex flex-col">
          {experience.map((item, i) => (
            <ExperienceRow key={i} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

type ExperienceItem = {
  role: string;
  company: string;
  companyHref: string | null;
  period: string | null;
  current: boolean;
};

function ExperienceRow({ item, index }: { item: ExperienceItem; index: number }) {
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
    <div
      ref={ref}
      className="group flex items-center gap-6 border-t border-white/5 py-6 last:border-b"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      }}
    >
      {/* Dot */}
      <div className="flex-shrink-0 flex items-center justify-center w-8">
        <span
          className={`h-2 w-2 rounded-full ${item.current ? "bg-emerald-400" : "bg-white/20"}`}
        />
      </div>

      {/* Role + Company */}
      <div className="flex flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
        <span className="text-white/85 font-medium text-sm">{item.role}</span>
        <span className="hidden sm:block text-white/20">·</span>
        {item.companyHref ? (
          <a
            href={item.companyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/45 hover:text-white/70 transition-colors"
          >
            {item.company}
          </a>
        ) : (
          <span className="text-sm text-white/45">{item.company}</span>
        )}
      </div>

      {/* Period */}
      {item.period && (
        <span className="flex-shrink-0 font-mono text-xs text-white/25">
          {item.period}
        </span>
      )}
    </div>
  );
}
