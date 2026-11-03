import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { CAPABILITIES, EXPERIENCE, PROFILE, PROOF } from "@/data/site";
import { RevealHeading } from "./reveal";
import { useReveal } from "./use-reveal";
import { RouteField } from "./route-field";

/* ---------- Proof ---------- */

export function Proof() {
  return (
    <section
      aria-label="Highlights"
      className="border-y border-ink bg-panel px-5 sm:px-8 lg:px-12 2xl:px-16"
    >
      <ul className="mx-auto grid max-w-[104rem] divide-y divide-ink/15 md:grid-cols-3 md:divide-x md:divide-y-0">
        {PROOF.map((p) => (
          <li key={p.title} className="py-8 md:px-8 md:first:pl-0 md:last:pr-0">
            <p className="heading text-[1.35rem] leading-tight">{p.title}</p>
            <p className="mt-3 text-[0.98rem] text-slate measure">{p.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Experience ---------- */

export function Experience() {
  const listRef = useReveal<HTMLOListElement>();
  let marker = 0;

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="px-5 pb-8 pt-24 sm:px-8 lg:px-12 2xl:px-16 lg:pt-32"
    >
      <div className="mx-auto max-w-[104rem]">
        <RevealHeading id="experience-title" className="heading text-[clamp(2.4rem,6vw,4.75rem)]">
          Experience
        </RevealHeading>
        <ol ref={listRef} className="reveal-markers mt-12 border-t border-ink lg:mt-16">
          {EXPERIENCE.map((r) => (
            <li key={r.company} className="grid gap-x-10 gap-y-4 border-b py-9 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="heading text-[1.6rem]">{r.company}</p>
                <p className="label mt-2 text-lg text-slate">{r.title}</p>
              </div>
              <p className="label text-lg text-slate lg:col-span-3">
                {r.period}
                <span className="block text-[0.95rem]">{r.place}</span>
              </p>
              <ul className="space-y-3 lg:col-span-5">
                {r.points.map((p) => (
                  <li key={p} className="relative pl-6 measure">
                    <span
                      aria-hidden="true"
                      className="marker absolute left-0 top-[0.7em] h-2 w-2 rounded-[1px] bg-route"
                      style={{ "--i": marker++ } as React.CSSProperties}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- About ---------- */

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="px-5 pb-28 pt-24 sm:px-8 lg:px-12 2xl:px-16 lg:pt-32"
    >
      <div className="mx-auto grid max-w-[104rem] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <RevealHeading id="about-title" className="heading text-[clamp(2.4rem,6vw,4.75rem)]">
            About
          </RevealHeading>
          <div className="mt-8 space-y-5 text-[1.12rem] measure">
            <p>
              I like projects where software has to make a call and show its reasoning. In CIRO
              that&rsquo;s a response plan with the agent trace behind it. In the truck routing app
              it&rsquo;s one recommended route and a sentence on why.
            </p>
            <p>
              I&rsquo;m a Computer Science graduate from Air University Islamabad, based in Pakistan
              and working remotely. I&rsquo;m looking for my first full-time role in AI/ML or
              software engineering, and I can start right away.
            </p>
          </div>
        </div>

        <dl className="border-t border-ink lg:col-span-7 lg:col-start-6">
          {CAPABILITIES.map((c) => (
            <div
              key={c.area}
              className="grid gap-x-8 gap-y-1 border-b py-6 sm:grid-cols-[11rem_1fr]"
            >
              <dt className="heading text-lg">{c.area}</dt>
              <dd className="measure">{c.items}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="on-ink relative isolate overflow-hidden bg-ink px-5 pb-10 pt-24 text-ground sm:px-8 lg:px-12 2xl:px-16 lg:pt-32"
    >
      <RouteField mode="contours" className="absolute inset-0 -z-10" />
      <div className="mx-auto max-w-[104rem]">
        <RevealHeading
          id="contact-title"
          className="display max-w-[16ch] text-[clamp(2.4rem,7.6vw,6.5rem)]"
        >
          Hiring for a remote role?
        </RevealHeading>
        <p className="mt-8 max-w-[44ch] text-[1.3rem] leading-snug text-ground/90">
          I&rsquo;m looking for an AI/ML or software engineering role and can start right away.
          Email is the fastest way to reach me.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="heading text-[clamp(1.3rem,3.4vw,2.2rem)] underline decoration-route-soft decoration-2 underline-offset-[0.2em] transition-colors hover:text-route-soft"
          >
            {PROFILE.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className={`label inline-flex h-11 min-w-[9.5rem] items-center justify-center gap-2 rounded-sm border px-4 text-[0.95rem] transition-colors duration-200 ${
              copied
                ? "border-route-soft bg-route-soft text-ink"
                : "border-ground/50 hover:bg-ground hover:text-ink"
            }`}
          >
            {copied && <Check aria-hidden="true" className="h-4 w-4" />}
            {copied ? "Copied" : "Copy address"}
          </button>
          <span role="status" className="sr-only">
            {copied ? "Copied to clipboard" : ""}
          </span>
        </div>

        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-2 border-t border-ground/20 pt-6">
          {[
            { label: "GitHub", href: PROFILE.github },
            { label: "LinkedIn", href: PROFILE.linkedin },
          ].map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label group inline-flex min-h-11 items-center gap-1 text-lg text-route-soft"
              >
                <span className="link">{l.label}</span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
          <li>
            <a
              href={PROFILE.resume}
              className="label inline-flex min-h-11 items-center text-lg text-route-soft"
            >
              <span className="link">Download résumé</span>
            </a>
          </li>
        </ul>

        <p className="label mt-12 text-[0.9rem] text-ground/70">
          Built with TanStack Start, Tailwind and one canvas. Risk colours borrowed from my truck
          routing project.
        </p>
      </div>
    </section>
  );
}
