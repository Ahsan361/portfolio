import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Brain,
  Cloud,
  Code2,
  Database,
  Download,
  Github,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Rocket,
  Sparkles,
  Trophy,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammad Ahsan Aftab — Full Stack AI Engineer" },
      {
        name: "description",
        content:
          "Full Stack AI Engineer building AI-powered applications, Agentic AI systems, and scalable full-stack products with React, Next.js, Python, and LLMs.",
      },
      { property: "og:title", content: "Muhammad Ahsan Aftab — Full Stack AI Engineer" },
      {
        property: "og:description",
        content:
          "Building AI-powered applications, Agentic AI systems, and scalable full-stack products.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Muhammad Ahsan Aftab",
          jobTitle: "Full Stack AI Engineer",
          description:
            "Full Stack AI Engineer building AI-powered applications, Agentic AI systems, and scalable full-stack products.",
          knowsAbout: [
            "Full Stack Development",
            "Generative AI",
            "Retrieval Augmented Generation",
            "Agentic AI",
            "Deep Learning",
            "Computer Vision",
          ],
        }),
      },
    ],
  }),
  component: Portfolio,
});

/* ---------- Data ---------- */

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const SKILLS: { group: string; icon: typeof Code2; items: string[] }[] = [
  {
    group: "Frontend",
    icon: Layers,
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Flutter"],
  },
  {
    group: "Backend",
    icon: Code2,
    items: ["Node.js", "Express.js", "FastAPI", "Python", "REST APIs"],
  },
  {
    group: "Databases",
    icon: Database,
    items: ["MongoDB", "PostgreSQL", "Supabase"],
  },
  {
    group: "AI & Machine Learning",
    icon: Brain,
    items: [
      "Generative AI",
      "Large Language Models",
      "RAG Systems",
      "Agentic AI",
      "Prompt Engineering",
      "Deep Learning",
      "CNNs",
      "RNNs",
      "GANs",
      "Computer Vision",
    ],
  },
  {
    group: "Cloud & DevOps",
    icon: Cloud,
    items: ["Docker", "GitHub", "Vercel", "Render", "Google Cloud Platform"],
  },
];

const PROJECTS = [
  {
    name: "Miraas",
    tagline: "Digital Archiving & Cultural Artifact Restoration",
    description:
      "An AI-powered platform for cultural preservation that restores damaged historical artifacts and maintains provenance records using blockchain technology.",
    bullets: [
      "AI image restoration pipeline",
      "Backend architecture",
      "Blockchain integration",
      "Team coordination",
    ],
    tech: ["Python", "Computer Vision", "AI", "Node.js", "Express", "PostgreSQL"],
    accent: "from-violet-500/30 to-fuchsia-500/10",
    github: "https://github.com/Ahsan361/Miras-Digital-Archiving-and-Cultural-Artifact-Preservation",
    showGithub: true,
    liveDemo: "https://miraas.tech",
    showDemo: true,
  },
  {
    name: "CIRO",
    tagline: "Crisis Intelligence & Response Orchestrator",
    description:
      "A multi-agent AI crisis response platform that analyzes crisis reports, performs reasoning, generates response plans, and coordinates emergency actions.",
    bullets: [
      "Multi-agent architecture",
      "Gemini AI integration",
      "FastAPI backend",
      "Flutter mobile app",
      "Supabase database",
    ],
    tech: ["Python", "FastAPI", "Gemini", "Vertex AI", "Flutter", "Supabase"],
    accent: "from-cyan-500/30 to-blue-500/10",
    github: "https://github.com/Ahsan361/Crisis-Intelligence-Response-Orchestrator",
    showGithub: true,
    liveDemo: "https://crisis-intelligence-response-orches.vercel.app",
    showDemo: true,
  },
  {
    name: "PDME",
    tagline: "Disaster Early Warning System",
    description:
      "An intelligent disaster prediction and monitoring platform developed during the NDMA DEWTE Hackathon. Awarded First Position.",
    bullets: [
      "Backend development",
      "Model training",
      "Disaster prediction pipelines",
      "Database design",
    ],
    tech: ["Python", "Machine Learning", "FastAPI", "PostgreSQL"],
    accent: "from-emerald-500/30 to-teal-500/10",
    award: "🏆 1st Place — NDMA DEWTE",
    github: "YOUR_GITHUB_LINK_HERE",
    showGithub: false,
    liveDemo: "YOUR_LIVE_DEMO_LINK_HERE",
    showDemo: false,
  },
  {
    name: "AI-Driven Digital Artifact Restoration",
    tagline: "Image restoration api.",
    description: "Backend API for image restoration built and deployed on Hugging Face Spaces.",
    bullets: ["Image restoration", "Deep Learning API", "Hugging Face Spaces"],
    tech: ["Python", "OpenCV", "Hugging Face", "Deep Learning", "U-Net"],
    accent: "from-blue-500/30 to-teal-500/10",
    github: "YOUR_GITHUB_LINK_HERE",
    showGithub: false,
    liveDemo: "https://huggingface.co/spaces/AhsanAftab/restoration-api",
    showDemo: true,
  },
  {
    name: "Damage Segmentation Api ⚡",
    tagline: "segformer sementic segmentation model for damage detection",
    description: "A semantic segmentation API using SegFormer to detect and highlight damage in images.",
    bullets: ["Semantic segmentation", "Damage detection", "Hugging Face Spaces"],
    tech: ["Python", "Segformer", "Hugging Face", "SegFormer"],
    accent: "from-rose-500/30 to-pink-500/10",
    github: "YOUR_GITHUB_LINK_HERE",
    showGithub: false,
    liveDemo: "https://huggingface.co/spaces/AhsanAftab/damage-segmentation-api",
    showDemo: true,
  },
];

const EXPERIENCE = [
  {
    role: "MERN Stack Developer Intern",
    company: "OctaThorn",
    period: "Internship",
    bullets: [
      "Full-stack web application development",
      "API development",
      "Database integration",
      "Feature implementation",
    ],
  },
  {
    role: "App Development Intern",
    company: "AKSA-SDS",
    period: "Jul 2025 – Sep 2025",
    bullets: [
      "Mobile application development",
      "Flutter UI development",
      "State management",
      "Firebase integration",
    ],
  },
];

const ACHIEVEMENTS = [
  { icon: Trophy, title: "First Position", subtitle: "NDMA DEWTE Hackathon" },
  { icon: Sparkles, title: "Shortlisted Team", subtitle: "AISeekho 2026 Hackathon" },
  { icon: Rocket, title: "10+ Projects", subtitle: "AI & Full Stack Development" },
];

const MARQUEE = [
  "Generative AI",
  "RAG",
  "Agentic AI",
  "LLMs",
  "Next.js",
  "FastAPI",
  "Computer Vision",
  "MERN",
  "Vertex AI",
  "Supabase",
  "Docker",
  "GCP",
];

/* ---------- Component ---------- */

function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <BackgroundFX />
      <Nav />
      <main className="relative">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

/* ---------- Background ---------- */

function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-40 -left-32 h-[480px] w-[480px] rounded-full bg-[oklch(0.72_0.22_295)]/25 blur-3xl animate-blob" />
      <div
        className="absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full bg-[oklch(0.75_0.18_220)]/20 blur-3xl animate-blob"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[oklch(0.7_0.22_330)]/15 blur-3xl animate-blob"
        style={{ animationDelay: "8s" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--background)_75%)]" />
    </div>
  );
}

/* ---------- Nav ---------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div className="w-full max-w-5xl">
        <nav
          className={`flex w-full items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${scrolled ? "glass-strong glow-ring" : "glass"
            }`}
        >
          <a href="#top" className="flex items-center gap-2.5 px-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-violet-500/40 bg-violet-500/10 font-display text-xs font-bold text-violet-300 tracking-wide">
              MA
            </span>
            <span className="font-display text-sm font-semibold tracking-tight">Muhammad Ahsan Aftab</span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="group hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Hire me
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-foreground transition-colors hover:bg-white/10 md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-4 bg-current transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 top-3 h-0.5 w-4 bg-current transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </nav>
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${open ? "mt-2 max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <ul className="glass-strong flex flex-col gap-1 rounded-3xl p-3">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="sm:hidden">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-center gap-1.5 rounded-2xl bg-foreground px-4 py-2.5 text-sm font-medium text-background"
              >
                Hire me
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center px-5 pt-32 pb-20 sm:px-8 lg:px-10 xl:px-14"
    >
      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to AI Engineer & Full Stack roles
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6rem]"
            >
              Muhammad <br className="hidden sm:block" />
              Ahsan Aftab
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-2xl text-lg text-foreground/80 sm:text-xl"
            >
              <span className="text-gradient font-medium">Full Stack AI Engineer</span> building
              AI-powered applications, Agentic AI systems, and scalable full-stack products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:gap-3 hover:shadow-[0_0_40px_-5px_oklch(0.72_0.22_295)]"
              >
                Hire me
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10"
              >
                View Projects
              </a>
              <a
                href={import.meta.env.BASE_URL + 'resume.pdf'}
                download
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 lg:col-span-5 lg:grid-cols-1 lg:gap-5 xl:col-span-4"
          >
            {[
              { k: "10+", v: "AI & Full Stack Projects" },
              { k: "1st", v: "NDMA DEWTE Hackathon" },
              { k: "2x", v: "Industry Internships" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-2xl px-4 py-4 lg:px-6 lg:py-6">
                <div className="font-display text-2xl font-semibold text-gradient lg:text-4xl">
                  {s.k}
                </div>
                <div className="mt-1 text-xs text-muted-foreground lg:text-sm">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Marquee ---------- */

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="relative border-y border-white/5 bg-white/[0.02] py-5">
      <div className="flex animate-marquee gap-10 whitespace-nowrap">
        {items.map((it, i) => (
          <span
            key={i}
            className="font-mono text-sm uppercase tracking-widest text-muted-foreground/70"
          >
            {it} <span className="ml-10 text-foreground/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Section helpers ---------- */

function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-3 text-base text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- About ---------- */

function About() {
  return (
    <section id="about" className="relative px-5 py-28 sm:px-8 lg:px-10 xl:px-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="About" title="Engineer at the intersection of AI and product." />
        <Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            <div className="glass rounded-3xl p-7 md:col-span-2 lg:col-span-3">
              <p className="text-base leading-relaxed text-foreground/85">
                I'm a final-year Computer Science student with experience across full-stack
                development, machine learning, deep learning, and AI-powered application
                development. My expertise spans the{" "}
                <span className="text-foreground">MERN stack</span>, Generative AI applications,{" "}
                <span className="text-foreground">Retrieval Augmented Generation (RAG)</span>,{" "}
                <span className="text-foreground">Agentic AI systems</span>, backend engineering,
                and cloud deployment.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                I enjoy building intelligent software that combines modern web technologies with AI
                capabilities to solve real-world problems — from cultural preservation platforms to
                multi-agent crisis response systems.
              </p>
            </div>
            <div className="glass rounded-3xl p-7">
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">Available worldwide · Remote</span>
                </li>
                <li className="flex items-center gap-3">
                  <Brain className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">GenAI · RAG · Agentic AI</span>
                </li>
                <li className="flex items-center gap-3">
                  <Code2 className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">MERN · Next.js · FastAPI</span>
                </li>
                <li className="flex items-center gap-3">
                  <Cloud className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">GCP · Vercel · Docker</span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */

function Skills() {
  return (
    <section id="skills" className="relative px-5 py-28 sm:px-8 lg:px-10 xl:px-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Toolkit"
          title="Skills & Stack"
          sub="A pragmatic stack spanning product engineering and modern AI."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.group} delay={i * 0.05}>
                <div className="group relative h-full overflow-hidden rounded-3xl glass p-6 transition-all hover:-translate-y-1 hover:bg-white/[0.06]">
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">{s.group}</h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <li
                        key={it}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-foreground/80"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */

function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
  });

  return (
    <section id="projects" className="relative px-5 py-28 sm:px-8 lg:px-10 xl:px-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured Projects"
          sub="Shipped products combining AI capabilities with real-world impact."
        />
        <div className="relative mt-14">
          {/* Top fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-10 w-full bg-gradient-to-b from-background to-transparent" />
          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />
          <div className="overflow-hidden py-2" ref={emblaRef}>
            <div className="flex">
              {PROJECTS.map((p, i) => (
                <div key={p.name} className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6">
                  <Reveal delay={i * 0.08} className="h-full">
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-7 transition-all hover:-translate-y-1 hover:glow-ring">
                      <div
                        className={`pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-br ${p.accent} blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
                      />
                      <div className="relative">
                        {p.award && (
                          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs text-amber-300">
                            {p.award}
                          </div>
                        )}
                        <h3 className="font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                        <p className="mt-1 text-sm text-accent">{p.tagline}</p>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                          {p.description}
                        </p>
                        <ul className="mt-5 space-y-1.5 text-sm">
                          {p.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2 text-foreground/80">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                              {b}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 flex flex-wrap gap-1.5">
                          {p.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        {(p.showGithub || p.showDemo) && (
                          <div className="mt-6 flex gap-3">
                            {p.showGithub && (
                              <a
                                href={p.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-white/10"
                              >
                                <Github className="h-3.5 w-3.5" />
                                GitHub
                              </a>
                            )}
                            {p.showDemo && (
                              <a
                                href={p.liveDemo}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-transform hover:scale-[1.02]"
                              >
                                Live Demo
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Arrow controls + dot indicators */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <CarouselArrow direction="prev" onClick={() => emblaApi?.scrollPrev()} />
          <CarouselDots api={emblaApi} count={PROJECTS.length} />
          <CarouselArrow direction="next" onClick={() => emblaApi?.scrollNext()} />
        </div>
      </div>
    </section>
  );
}

function CarouselArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      className="group grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground transition-all hover:border-white/25 hover:bg-white/10 hover:text-foreground hover:scale-105 active:scale-95"
    >
      {direction === "prev" ? (
        <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function CarouselDots({ api, count }: { api: ReturnType<typeof useEmblaCarousel>[1]; count: number }) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => { api.off("select", onSelect); };
  }, [api]);

  // Auto-scroll every 3 s; pauses when user is dragging
  useEffect(() => {
    if (!api) return;
    let timer: ReturnType<typeof setInterval>;
    const start = () => {
      timer = setInterval(() => { api.scrollNext(); }, 3000);
    };
    const stop = () => clearInterval(timer);
    start();
    api.on("pointerDown", stop);
    api.on("pointerUp", start);
    return () => { stop(); api.off("pointerDown", stop); api.off("pointerUp", start); };
  }, [api]);

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => api?.scrollTo(i)}
          aria-label={`Go to project ${i + 1}`}
          className={`h-1.5 rounded-full transition-all duration-300 ${i === selected ? "w-6 bg-foreground" : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
        />
      ))}
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative px-5 py-28 sm:px-8 lg:px-10 xl:px-14">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />
        <div className="relative mt-14">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:left-1/2" />
          <div className="space-y-10">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.role} delay={i * 0.05}>
                <div
                  className={`relative grid gap-4 md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                >
                  <div className="pl-10 md:pl-0 md:text-right md:pr-12">
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {e.period}
                    </div>
                    <h3 className="mt-1 font-display text-xl font-semibold">{e.role}</h3>
                    <div className="text-accent">{e.company}</div>
                  </div>
                  <div className="pl-10 md:pl-12">
                    <span className="absolute left-1.5 grid h-4 w-4 -translate-y-0.5 place-items-center rounded-full bg-background md:left-1/2 md:-translate-x-1/2">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400" />
                    </span>
                    <ul className="glass space-y-1.5 rounded-2xl p-5 text-sm">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-foreground/80">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Achievements ---------- */

function Achievements() {
  return (
    <section className="relative px-5 py-28 sm:px-8 lg:px-10 xl:px-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Recognition" title="Achievements" />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => {
            const Icon = a.icon;
            return (
              <Reveal key={a.title} delay={i * 0.06}>
                <div className="glass group rounded-3xl p-7 text-center transition-all hover:-translate-y-1">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">{a.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a.subtitle}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  return (
    <section id="contact" className="relative px-5 py-28 sm:px-8 lg:px-10 xl:px-14">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] glass-strong p-10 sm:p-16">
            <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-full bg-[var(--gradient-primary,linear-gradient(135deg,#a78bfa,#22d3ee))] opacity-20 blur-3xl" />
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Let's build something
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Have an AI product in mind?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                I'm currently open to full-time roles, contract work, and ambitious side projects.
                Let's talk about what you're building.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:ahsanaftab077@gmail.com"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:gap-3 hover:shadow-[0_0_40px_-5px_oklch(0.72_0.22_295)]"
                >
                  <Mail className="h-4 w-4" /> Contact me
                </a>
                <a
                  href={import.meta.env.BASE_URL + 'resume.pdf'}
                  download
                  className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:bg-white/10"
                >
                  <Download className="h-4 w-4" /> Download Resume
                </a>
              </div>
              <div className="mt-10 flex items-center justify-center gap-2">
                <SocialLink
                  href="https://github.com/Ahsan361"
                  icon={Github}
                  label="GitHub"
                />
                <SocialLink
                  href="https://linkedin.com/in/muhammad-ahsan-aftab-7085ba2a7"
                  icon={Linkedin}
                  label="LinkedIn"
                />
                <SocialLink href="mailto:ahsanaftab077@gmail.com" icon={Mail} label="Email" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Github;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-foreground"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="border-t border-white/5 px-5 py-10 sm:px-8 lg:px-10 xl:px-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <div>© {new Date().getFullYear()} Muhammad Ahsan Aftab. Built with care.</div>
        <div className="font-mono text-xs uppercase tracking-widest">
          Full Stack <span className="text-accent">×</span> AI Engineer
        </div>
      </div>
    </footer>
  );
}
