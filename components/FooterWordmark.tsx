"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { LogoMark } from "@/components/Logo";
import { cn } from "@/lib/cn";

const WordmarkScene = dynamic(() => import("@/components/WordmarkScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Oversized "ZAGRODA" wordmark. Static type renders first (and stays if WebGL
 * is unavailable); when scrolled into view a three.js particle version
 * gathers in its place, sways gently and parts around the pointer.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  const [ready, setReady] = useState(false);
  const [still, setStill] = useState(false);
  const [family, setFamily] = useState<string | null>(null);
  // dots get too small to read on phones — keep the static type there
  const [wide, setWide] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setWide(window.matchMedia("(min-width: 640px)").matches);
    // resolve the next/font family name behind the CSS variable
    setFamily(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-brand")
        .trim() || "sans-serif",
    );
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showParticles = ready && seen;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative mt-6 aspect-[1400/280] w-full select-none"
    >
      {/* static fallback */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center gap-[2.6vw] transition-opacity duration-700",
          showParticles ? "opacity-0" : "opacity-100",
        )}
      >
        <LogoMark className="h-[12.5vw] w-[12.5vw] shrink-0 text-ink" />
        <span
          className="text-[12.4vw] font-semibold uppercase leading-none tracking-[-0.02em] text-ink"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          Zagroda
        </span>
      </div>

      {seen && wide && !still && family && (
        <div className="absolute inset-0">
          <WordmarkScene
            fontFamily={family}
            play={inView}
            still={still}
            onReady={() => setReady(true)}
          />
        </div>
      )}
    </div>
  );
}
