import { ArrowUpRight } from "lucide-react";
import { CIRO_STAGES, MORE_WORK, PROJECTS, RESTORATION_STAGES, type Project } from "@/data/site";
import { RevealHeading } from "./reveal";
import { LayerDiagram, PipelineDiagram, SpotterViewer } from "./visuals";

function Visual({ kind }: { kind: Project["visual"] }) {
  switch (kind) {
    case "spotter":
      return <SpotterViewer />;
    case "pipeline-ciro":
      return (
        <PipelineDiagram
          stages={CIRO_STAGES}
          label="The five agents, in the order a report passes through them"
        />
      );
    case "layers-miras":
      return <LayerDiagram />;
    case "pipeline-restoration":
      return (
        <PipelineDiagram stages={RESTORATION_STAGES} label="How the three parts fit together" />
      );
  }
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="label group inline-flex min-h-11 items-center gap-1 text-base text-route"
    >
      <span className="link">{children}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function ProjectIndex() {
  return (
    <ul
      aria-label="Projects in this section"
      className="mt-12 grid divide-y divide-ink/15 border-t border-ink xl:grid-cols-4 xl:divide-x xl:divide-y-0"
    >
      {PROJECTS.map((p) => (
        <li key={p.slug}>
          <a
            href={`#project-${p.slug}`}
            className="group block h-full py-5 xl:px-6 xl:first:pl-0 xl:last:pr-0"
          >
            <span className="heading block text-xl transition-colors group-hover:text-route">
              {p.name}
            </span>
            <span className="label mt-1.5 block text-[0.95rem] text-slate">{p.kicker}</span>
            <span className="label mt-3 block text-[0.9rem] text-ink">{p.meta}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function ProjectArticle({ project }: { project: Project }) {
  const titleId = `project-${project.slug}`;
  return (
    <article
      aria-labelledby={titleId}
      className="grid gap-10 border-t border-ink py-16 lg:grid-cols-12 lg:gap-14 lg:py-24"
    >
      <header className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <h3 id={titleId} className="heading text-[clamp(2rem,4.4vw,3.4rem)]">
            {project.name}
          </h3>
          <p className="label mt-3 text-lg text-slate">{project.kicker}</p>
          <p className="mt-6 measure">{project.summary}</p>

          <p className="label mt-6 text-[0.95rem] text-slate">{project.stack.join(", ")}</p>

          <div className="mt-4 flex flex-wrap gap-x-6">
            {project.links.map((l) => (
              <ExternalLink key={l.href} href={l.href}>
                {l.label}
              </ExternalLink>
            ))}
          </div>
          {project.note && <p className="label mt-1 text-[0.9rem] text-slate">{project.note}</p>}
        </div>
      </header>

      <div className="lg:col-span-7">
        <Visual kind={project.visual} />
        <ul className="mt-9 space-y-4">
          {project.points.map((p) => (
            <li key={p} className="relative pl-6 measure">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.7em] h-2 w-2 rounded-[1px] bg-route"
              />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="px-5 pb-8 pt-24 sm:px-8 lg:px-12 2xl:px-16 lg:pt-32"
    >
      <div className="mx-auto max-w-[104rem]">
        <div className="max-w-3xl">
          <RevealHeading id="work-title" className="heading text-[clamp(2.4rem,6vw,4.75rem)]">
            Selected work
          </RevealHeading>
          <p className="mt-5 text-[1.2rem] leading-snug measure">
            Four projects across AI systems and full-stack products. Each has a live demo or a
            deployed API, and the source is linked where it&rsquo;s public.
          </p>
        </div>

        <ProjectIndex />

        <div className="mt-6 lg:mt-10">
          {PROJECTS.map((p) => (
            <ProjectArticle key={p.slug} project={p} />
          ))}
        </div>

        <div className="border-t border-ink pt-12 lg:pt-16">
          <h3 className="heading text-[clamp(1.6rem,3vw,2.2rem)]">Also built</h3>
          <ul className="mt-8 divide-y border-y">
            {MORE_WORK.map((m) => (
              <li key={m.name} className="grid gap-x-10 gap-y-2 py-7 lg:grid-cols-12">
                <h4 className="heading text-xl lg:col-span-3">{m.name}</h4>
                <p className="lg:col-span-6 measure">{m.summary}</p>
                <div className="lg:col-span-3 lg:text-right">
                  <p className="label text-[0.95rem] text-slate">{m.stack}</p>
                  {m.link && (
                    <div className="lg:flex lg:justify-end">
                      <ExternalLink href={m.link.href}>{m.link.label}</ExternalLink>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
