"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ButtonLink, linkTargetProps } from "@/components/primitives";
import { nav, site, surveyHref } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Full-width wrapper — the bar spans the whole window, not the content column. */
const barX = "w-full px-5 sm:px-8 lg:px-10";

function AnnouncementBar() {
  return (
    <div className="bg-brand-deep text-white">
      <div
        className={cn(
          barX,
          "flex h-9 items-center justify-center gap-2 text-center text-xs sm:text-[13px]",
        )}
      >
        <span className="relative hidden h-1.5 w-1.5 shrink-0 sm:flex">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fbd38d] opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#fbd38d]" />
        </span>
        <span className="text-white/80">
          <span className="sm:hidden">Projekt w fazie rozwoju.</span>
          <span className="hidden sm:inline">
            Zagroda.io jest w fazie rozwoju — budujemy ją razem z hodowcami.
          </span>
        </span>
        <a
          href={surveyHref}
          {...linkTargetProps(surveyHref)}
          className="inline-flex shrink-0 items-center gap-1 font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
        >
          Wypełnij ankietę
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      // any link inside the header (drawer, bar) closes the mobile drawer
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) setOpen(false);
      }}
    >
      <AnnouncementBar />

      <div
        className={cn(
          "border-b backdrop-blur-xl backdrop-saturate-150 transition-all duration-300",
          scrolled || open
            ? "border-line bg-bg/85 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.25)]"
            : "border-line/60 bg-bg/60",
        )}
      >
        <div
          className={cn(barX, "flex h-16 items-center justify-between gap-6")}
        >
          <a href="#top" className="shrink-0" aria-label="Zagroda.io">
            <Logo />
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-bg-soft hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-1.5 lg:flex">
            <ButtonLink
              href={site.appUrl}
              variant="ghost"
              className="hidden px-3.5 xl:inline-flex"
            >
              {site.appLabel}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </ButtonLink>
            <ButtonLink
              href={surveyHref}
              variant="secondary"
              className="px-4 py-2"
            >
              Ankieta
            </ButtonLink>
            <ButtonLink href="#kontakt" variant="primary" className="px-4 py-2">
              Kontakt
            </ButtonLink>
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* mobile drawer */}
        {open && (
          <div className="border-t border-line lg:hidden">
            <div className={cn(barX, "flex flex-col gap-1 py-4")}>
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-bg-soft hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#faq"
                className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-bg-soft hover:text-ink"
              >
                Pytania i odpowiedzi
              </a>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                <ButtonLink href={surveyHref} variant="secondary">
                  Wypełnij ankietę
                </ButtonLink>
                <ButtonLink href={site.appUrl} variant="secondary">
                  {site.appLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="#kontakt" variant="primary">
                  Kontakt
                </ButtonLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
