"use client";

import Image from "next/image";
import { useState } from "react";

const screenshots = [
  "/screenshots/guess-who-1.jpg",
  "/screenshots/guess-who-2.jpeg",
  "/screenshots/guess-who-3.jpeg",
];

export default function ScreenshotGallery() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      <div className="grid w-full max-w-xl grid-cols-2 gap-4">
        {screenshots.map((src, index) => (
          <div
            key={src}
            onClick={() => setExpanded(src)}
            className={`relative cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${
              index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/5]"
            }`}
          >
            <Image
              src={src}
              alt={`Guess Who screenshot ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setExpanded(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={expanded}
              alt="Expanded screenshot"
              width={1200}
              height={900}
              className="max-h-[90vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
