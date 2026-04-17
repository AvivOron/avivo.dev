import type { Metadata } from "next";
import Image from "next/image";

const PAGE_URL = "https://www.avivo.dev/guess-who";

export const metadata: Metadata = {
  title: "Guess Who | Team Hebrew Guessing Game",
  description:
    "Guess Who is a real-time team Hebrew guessing game. Split into two groups, ask yes-or-no questions, and race the 90-second clock to figure out the hidden word.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Guess Who | Team Hebrew Guessing Game",
    description:
      "A team-based Hebrew guessing game. One group asks yes-or-no questions, the other holds the secret word and answers. 90 seconds, live scoring, automatic role swaps.",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: `${PAGE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Guess Who team guessing game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guess Who | Team Hebrew Guessing Game",
    description:
      "A team-based Hebrew guessing game. Ask yes-or-no questions and race the clock to reveal the hidden word.",
    images: [`${PAGE_URL}/og-image.png`],
  },
};

const screenshots = [
  "/screenshots/guess-who-1.jpg",
  "/screenshots/guess-who-2.jpeg",
  "/screenshots/guess-who-3.jpeg",
];

const features = [
  "Players auto-split into two teams — no manual setup needed.",
  "90-second turns with a live countdown. The guessing team can call it early if they crack the word.",
  "Teams swap roles every round, so everyone gets to guess and answer.",
  "Live scoreboard tracks points across rounds. No installation — just open a browser and share the code.",
];

export default function GuessWhoPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <section className="relative overflow-hidden border-b border-white/5 px-6 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(244,114,182,0.12), transparent 35%), radial-gradient(circle at bottom right, rgba(99,102,241,0.15), transparent 40%)",
          }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-pink-300/70">
              game project
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Guess Who
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">
              A team-based Hebrew guessing game built for groups. Players
              auto-split into two teams — one asks yes-or-no questions to crack
              a hidden word, the other answers and holds the secret. 90 seconds
              per round, live scoring, and automatic role swaps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/guess-who/play"
                className="rounded-full border border-pink-400/40 bg-pink-400/15 px-6 py-3 text-sm font-medium text-pink-100 transition-colors hover:border-pink-400/70 hover:bg-pink-400/25"
              >
                Play the game
              </a>
              <a
                href="https://github.com/AvivOron/guess-who"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                View source
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2 text-xs font-mono text-white/45">
              <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                TypeScript
              </li>
              <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                React
              </li>
              <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Vite
              </li>
              <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Real-time multiplayer
              </li>
            </ul>
          </div>

          <div className="grid w-full max-w-xl grid-cols-2 gap-4">
            {screenshots.map((src, index) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${
                  index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={src}
                  alt={`Guess Who screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              How it works
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <article className="rounded-2xl border border-white/8 bg-white/4 p-5">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/35">
                  01
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  Create a room
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/55">
                  Start a session, share the code, and players auto-split into two teams.
                </p>
              </article>
              <article className="rounded-2xl border border-white/8 bg-white/4 p-5">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/35">
                  02
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  Race the clock
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/55">
                  The guessing team has 90 seconds to crack the hidden word with yes-or-no questions.
                </p>
              </article>
              <article className="rounded-2xl border border-white/8 bg-white/4 p-5">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/35">
                  03
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  Swap and score
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/55">
                  Teams switch roles every round. Points accumulate on a live scoreboard until you decide to stop.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
