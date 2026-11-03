import { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { MIRAS_FEATURES, MIRAS_LAYERS, type Stage } from "@/data/site";

/* ---------- Weather-aware truck routing: the real app, three views ---------- */

const SPOTTER_VIEWS = [
  {
    id: "routes",
    tab: "Compare routes",
    src: "/projects/spotter-route-comparison.jpg",
    alt: "The truck routing app showing a recommended green route from Chicago to Denver with grey alternatives, and a risk summary in the sidebar",
    caption:
      "Chicago to Denver with a 45,000 lb load. The recommended route is green; the alternatives stay grey.",
  },
  {
    id: "heatmap",
    tab: "Weather over time",
    src: "/projects/spotter-heatmap-storms.jpg",
    alt: "The truck routing app showing a route from Los Angeles to Dallas with the weather heatmap and time slider moved 13 hours after departure",
    caption:
      "Los Angeles to Dallas. The slider moves through the forecast hour by hour after departure.",
  },
  {
    id: "checkpoint",
    tab: "Checkpoint detail",
    src: "/projects/spotter-checkpoint-popup.jpg",
    alt: "A checkpoint popup on the Chicago to Denver route listing arrival time and wind, rain and snow risk",
    caption: "Click a checkpoint to see wind, rain and snow for the hour the truck gets there.",
  },
];

export function RoutingViewer() {
  return (
    <Tabs.Root defaultValue="routes">
      <Tabs.List
        aria-label="Truck routing screenshots"
        className="mb-3 flex flex-wrap gap-x-6 gap-y-1"
      >
        {SPOTTER_VIEWS.map((v) => (
          <Tabs.Trigger
            key={v.id}
            value={v.id}
            className="label -mb-px h-11 border-b-2 border-transparent text-[0.95rem] text-slate transition-colors hover:text-ink data-[state=active]:border-route data-[state=active]:text-ink"
          >
            {v.tab}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {SPOTTER_VIEWS.map((v) => (
        <Tabs.Content
          key={v.id}
          value={v.id}
          className="animate-in fade-in duration-300 focus-visible:outline-offset-4"
        >
          <figure>
            <div className="overflow-hidden rounded-md border border-ink/20 bg-panel shadow-[0_1px_0_rgba(14,26,33,0.06),0_18px_40px_-24px_rgba(14,26,33,0.35)]">
              <img
                src={v.src}
                alt={v.alt}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="label mt-3 text-[0.9rem] text-slate">{v.caption}</figcaption>
          </figure>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

/* ---------- A pipeline you can step through ---------- */

export function PipelineDiagram({ stages, label }: { stages: Stage[]; label: string }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    setCanAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setActive((a) => {
        if (a >= stages.length - 1) {
          setPlaying(false);
          return a;
        }
        return a + 1;
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [playing, stages.length]);

  const current = stages[active];

  return (
    <div className="rounded-md border border-ink/20 bg-panel p-5 sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="label text-[0.95rem] text-slate">{label}</p>
        {canAnimate && (
          <button
            type="button"
            onClick={() => {
              if (!playing) setActive(0);
              setPlaying((p) => !p);
            }}
            className="label inline-flex h-10 items-center rounded-sm border border-ink px-4 text-[0.9rem] transition-colors hover:bg-ink hover:text-ground"
          >
            {playing ? "Pause" : "Step through"}
          </button>
        )}
      </div>

      <ol
        className="grid gap-0 lg:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]"
        style={{ "--n": stages.length } as React.CSSProperties}
      >
        {stages.map((s, i) => {
          const reached = i <= active;
          return (
            <li key={s.name} className="relative pb-1 pl-5 lg:pl-0 lg:pr-3 lg:pt-5">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-0.5 bg-ink/20 lg:h-0.5 lg:w-full"
              />
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-0.5 origin-top bg-route transition-transform duration-500 ease-out [transform:scaleY(var(--f))] lg:h-0.5 lg:w-full lg:origin-left lg:[transform:scaleX(var(--f))]"
                style={{ "--f": reached ? 1 : 0 } as React.CSSProperties}
              />
              <span
                aria-hidden="true"
                className={`absolute -left-[0.6875rem] top-0 grid h-5 w-5 place-items-center rounded-full text-[0.7rem] font-bold transition-colors duration-300 lg:-top-[0.6875rem] lg:left-0 ${
                  reached
                    ? "bg-route text-ground"
                    : "bg-ground text-slate ring-2 ring-inset ring-ink/25"
                }`}
              >
                <span className="label">{i + 1}</span>
              </span>
              <button
                type="button"
                aria-pressed={i === active}
                onClick={() => {
                  setPlaying(false);
                  setActive(i);
                }}
                className={`heading min-h-11 min-w-0 py-2 text-left text-[1rem] leading-tight transition-colors [font-stretch:88%] [overflow-wrap:anywhere] hover:text-route lg:pt-1 ${
                  i === active ? "text-ink" : "text-slate"
                }`}
              >
                {s.name}
              </button>
            </li>
          );
        })}
      </ol>

      <dl className="mt-6 grid gap-5 border-t pt-6 sm:grid-cols-2" aria-live="polite">
        <div key={`${active}-reads`} className="animate-in fade-in duration-300">
          <dt className="label text-[0.9rem] text-slate">Reads</dt>
          <dd className="mt-1">{current.reads}</dd>
        </div>
        <div key={`${active}-makes`} className="animate-in fade-in duration-300">
          <dt className="label text-[0.9rem] text-slate">Produces</dt>
          <dd className="mt-1">{current.makes}</dd>
        </div>
      </dl>
    </div>
  );
}

/* ---------- Miras: layers of the system ---------- */

export function LayerDiagram() {
  return (
    <div className="rounded-md border border-ink/20 bg-panel p-5 sm:p-7">
      <ol className="flex flex-col">
        {MIRAS_LAYERS.map((layer, i) => (
          <li key={layer.name} className="relative">
            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-[9rem_1fr] sm:items-baseline">
              <h4 className="heading text-lg">{layer.name}</h4>
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {layer.items.map((item) => (
                  <li key={item} className="text-[0.98rem]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {i < MIRAS_LAYERS.length - 1 && (
              <div aria-hidden="true" className="my-4 flex h-8 items-center sm:pl-[9rem]">
                <svg width="16" height="32" viewBox="0 0 16 32" fill="none" className="text-route">
                  <path
                    d="M8 0v26M2 20l6 7 6-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </li>
        ))}
      </ol>
      <div className="mt-6 border-t pt-5">
        <p className="label text-[0.9rem] text-slate">What it covers</p>
        <p className="mt-1">{MIRAS_FEATURES.join(", ")}.</p>
      </div>
    </div>
  );
}
