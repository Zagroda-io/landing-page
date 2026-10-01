"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/* Logo mark paths (same as components/Logo.tsx, viewBox 0 0 28 28). */
const MARK_PATHS = [
  "M14 24 Q13.7 14.5 14 5.4",
  "M14 24 Q11.2 15 9.1 9.2",
  "M14 24 Q16.8 15 18.9 9.2",
  "M14 24 Q9.2 16.4 5.7 12.6",
  "M14 24 Q18.8 16.4 22.3 12.6",
];

/*
 * SVG layout (viewBox 1000 × 132): mark on the left, "ZAGRODA" stretched to
 * the remaining width with textLength, so it always spans the content column.
 * Cap height ≈ 110 units, baseline at 121.
 */
const CAP = 110;
const BASE = 121;
const MARK_SCALE = CAP / (26.1 - 5.4);
const TEXT_X = 138;
const MARK_X = 6; // keeps the round stroke caps inside the viewBox

/**
 * Oversized "ZAGRODA" wordmark. Sits dimmed and lights up (ink + brand green)
 * once the page is scrolled all the way to the bottom.
 */
export function FooterWordmark() {
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const check = () => {
      const bottom = window.innerHeight + window.scrollY;
      setLit(bottom >= document.documentElement.scrollHeight - 8);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const fade = "transition-[fill,stroke] duration-700 ease-out";

  return (
    <div className="pt-12 sm:pt-16">
      <svg
        viewBox="0 0 1000 132"
        className="block h-auto w-full select-none"
        role="img"
        aria-label="Zagroda"
      >
        <g
          transform={`translate(${MARK_X - 5.7 * MARK_SCALE} ${BASE - CAP - 5.4 * MARK_SCALE}) scale(${MARK_SCALE})`}
        >
          <g
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            className={cn(fade, lit ? "stroke-brand" : "stroke-[#cfe0cf]")}
          >
            {MARK_PATHS.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <circle
            cx="14"
            cy="24.2"
            r="2.3"
            className={cn(fade, lit ? "fill-brand-deep" : "fill-[#cfe0cf]")}
          />
        </g>
        <text
          x={TEXT_X}
          y={BASE}
          textLength={1000 - TEXT_X}
          lengthAdjust="spacingAndGlyphs"
          fontSize="143"
          fontWeight="600"
          className={cn(fade, lit ? "fill-ink" : "fill-line-strong")}
          style={{ fontFamily: "var(--font-brand)" }}
        >
          ZAGRODA
        </text>
      </svg>
    </div>
  );
}
