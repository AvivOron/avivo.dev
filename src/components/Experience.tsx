"use client";

import { useEffect, useRef, useState } from "react";

function getMonthCountSince(startDate: Date) {
  const now = new Date();
  let months =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth());

  if (now.getDate() < startDate.getDate()) {
    months -= 1;
  }

  const safeMonths = Math.max(0, months);
  return `${safeMonths} month${safeMonths === 1 ? "" : "s"}`;
}

const experience = [
  {
    role: "Sr. Software Engineer",
    company: "Alice",
    companyHref: "https://alice.io",
    period: `Present · ${getMonthCountSince(new Date(2025, 6, 25))}`,
    current: true,
    description:
      "Full stack engineer on the SaaS platform team, with a key role in building the Auto Red Teaming product from day one through end-to-end delivery. Also contributed to the platform migration from Vue to React and led the rewrite of the authentication and identity architecture.",
  },
  {
    role: "Sr. Software Engineer · Engineering Manager",
    company: "ZipRecruiter",
    companyHref: "https://www.ziprecruiter.com",
    period: "2017-2025",
    current: false,
    description:
      "Worked across several high-impact product areas, including SEO, messaging, and resume search. As part of the SEO engineering team, helped build and scale the programmatic creation of millions of highly relevant, search-optimized job pages for job seekers across the US. Later contributed to the messaging platform responsible for orchestrating communications across multiple products to maximize jobseeker fit and engagement at very large scale, and went on to lead the team that rebuilt the resume database experience, a major revenue-driving employer-facing product.",
  },
  {
    role: "Founding Engineer",
    company: "Hypertunity",
    companyHref:
      "https://tracxn.com/d/companies/hypertunity/__uwE0CvQj8Et-Ao06RY2AJMqOTbGHWavWIqYcfAa5vjs",
    period: "2015-2016",
    current: false,
    description:
      "Served as the first engineer while completing my B.Sc. studies, taking end-to-end ownership of full stack development in an early-stage startup environment and delivering integrations for paying clients.",
  },
  {
    role: "Software Engineer",
    company: "Sizmek (acquired by Amazon)",
    companyHref: "https://www.linkedin.com/company/sizmek",
    period: "2013-2014",
    current: false,
    description:
      "Worked as a full stack engineer within the analytics group, building customer-facing analytics capabilities and reporting tools. Contributed to features that helped customers monitor campaign performance, access operational insights, and make better data-driven decisions.",
  },
  {
    role: "Software Engineer",
    company: "Unit 8200",
    companyHref: null,
    period: "2008-2013",
    current: false,
    description:
      "Mamas course alumni (Gamma Project), working across multiple teams on mission-critical systems within the engineering organization.",
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
  description?: string;
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
      className="group flex gap-6 border-t border-white/5 py-6 last:border-b"
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
      <div className="flex-1">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
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
        {item.description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
            {item.description}
          </p>
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
