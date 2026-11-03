import { createFileRoute } from "@tanstack/react-router";
import { PROFILE } from "@/data/site";
import { Hero } from "@/components/site/hero";
import { Nav } from "@/components/site/nav";
import { About, Contact, Experience, Proof } from "@/components/site/sections";
import { Work } from "@/components/site/work";

const TITLE = "Muhammad Ahsan Aftab | AI/ML and Full-Stack Engineer";
const DESCRIPTION =
  "AI/ML and full-stack engineer building multi-agent crisis response, weather-aware routing and image restoration systems. Based in Pakistan, available for remote roles.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "theme-color", content: "#e9eeec" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: PROFILE.name,
          jobTitle: "AI/ML and Full-Stack Engineer",
          description: DESCRIPTION,
          sameAs: [PROFILE.github, PROFILE.linkedin],
        }),
      },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ground text-ink">
      <a
        href="#work"
        className="label sr-only z-[60] rounded-sm bg-ink px-4 py-3 text-ground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to work
      </a>
      <Nav />
      <main>
        <Hero />
        <Proof />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
    </div>
  );
}
