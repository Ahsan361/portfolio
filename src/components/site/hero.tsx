import { useState } from "react";
import { PROFILE } from "@/data/site";
import { RouteField } from "./route-field";

const LEGEND = [
  { label: "Low", color: "bg-low" },
  { label: "Moderate", color: "bg-moderate" },
  { label: "High", color: "bg-high" },
  { label: "Severe", color: "bg-severe" },
  { label: "No travel", color: "bg-no-travel" },
];

export function Hero() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] touch-pan-y overflow-hidden bg-ground"
    >
      <RouteField paused={paused} className="absolute inset-0 -z-10" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[112rem] flex-col px-5 pb-8 pt-28 sm:px-8 lg:px-12 2xl:px-16 lg:pt-32">
        <div className="max-w-[90rem]" data-route-avoid>
          <h1 className="display text-[clamp(2.6rem,8.4vw,8.6rem)] text-ink">
            <span className="line-mask">
              <span style={{ "--d": "80ms" } as React.CSSProperties}>Muhammad</span>
            </span>
            <span className="line-mask">
              <span style={{ "--d": "190ms" } as React.CSSProperties}>Ahsan Aftab</span>
            </span>
          </h1>

          <p
            className="rise mt-6 max-w-[38ch] text-[clamp(1.15rem,2vw,1.5rem)] leading-snug text-ink sm:mt-8"
            style={{ "--d": "520ms" } as React.CSSProperties}
          >
            I build AI systems that turn messy real-world signals into decisions: crisis reports
            into response plans, forecasts into safer routes, damaged photos into restored images.
          </p>

          <div
            className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ "--d": "680ms" } as React.CSSProperties}
          >
            <a
              href="#work"
              className="label inline-flex h-12 items-center rounded-sm bg-ink px-6 text-base text-ground transition-colors hover:bg-route"
            >
              See the work
            </a>
            <a
              href={PROFILE.resume}
              className="label inline-flex h-12 items-center rounded-sm border border-ink px-6 text-base transition-colors hover:bg-ink hover:text-ground"
            >
              Download résumé
            </a>
            <a href={`mailto:${PROFILE.email}`} className="link label text-base">
              {PROFILE.email}
            </a>
          </div>
        </div>

        <div className="min-h-16 flex-1" aria-hidden="true" />

        <div
          className="rise flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          style={{ "--d": "900ms" } as React.CSSProperties}
          data-route-avoid
        >
          <div className="flex flex-wrap items-center gap-2 self-start">
            <p className="label max-w-[34ch] rounded-sm bg-ground/80 px-3 py-2 text-[0.95rem] text-ink backdrop-blur-sm">
              <span className="hidden sm:inline">
                Move your cursor: it&rsquo;s a storm, and the route replans around it.
              </span>
              <span className="sm:hidden">
                Drag a finger across the map: it&rsquo;s a storm, and the route replans.
              </span>
            </p>
            <button
              type="button"
              aria-pressed={paused}
              onClick={() => setPaused((p) => !p)}
              className="label inline-flex h-11 items-center rounded-sm border border-ink/40 bg-ground/80 px-3 text-[0.9rem] backdrop-blur-sm transition-colors hover:bg-ink hover:text-ground motion-reduce:hidden"
            >
              {paused ? "Resume motion" : "Pause motion"}
            </button>
          </div>
          <ul
            className="label flex flex-wrap gap-x-4 gap-y-1.5 rounded-sm bg-ground/80 px-3 py-2 text-[0.85rem] text-ink backdrop-blur-sm"
            aria-label="Map legend: weather risk"
          >
            {LEGEND.map((l) => (
              <li key={l.label} className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-full ${l.color}`} aria-hidden="true" />
                {l.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
