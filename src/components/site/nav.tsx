import { useEffect, useState } from "react";
import { NAV, PROFILE } from "@/data/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      /* The current section is the last one whose top has passed 40% of the viewport. */
      const line = window.innerHeight * 0.4;
      let current = "";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= line) current = n.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open ? "border-b bg-ground/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[112rem] items-center justify-between px-5 sm:px-8 lg:px-12 2xl:px-16"
      >
        <a href="#top" className="heading text-lg" aria-label="Ahsan Aftab, back to top">
          Ahsan Aftab
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? "location" : undefined}
                className={`label text-[0.95rem] transition-colors hover:text-route ${
                  active === n.id ? "text-route" : "text-ink"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <span className="label hidden items-center gap-2 text-slate lg:flex">
            <span className="live-dot" aria-hidden="true" />
            Available now, remote
          </span>
          <a
            href={PROFILE.resume}
            className="label hidden rounded-sm border border-ink px-3.5 py-2 text-[0.9rem] transition-colors hover:bg-ink hover:text-ground sm:inline-block"
          >
            Résumé
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="label -mr-2 inline-flex h-11 min-w-11 items-center justify-center px-2 md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-b border-t bg-ground shadow-[0_24px_32px_-24px_rgba(14,26,33,0.35)] md:hidden"
      >
        <ul className="mx-auto max-w-[112rem] px-5 py-3 sm:px-8">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="heading flex h-14 items-center border-b text-2xl last:border-b-0"
              >
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <a href={PROFILE.resume} className="label flex h-14 items-center text-lg text-route">
              Download résumé
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
