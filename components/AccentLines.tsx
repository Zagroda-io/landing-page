import { cn } from "@/lib/cn";

/**
 * Decorative deep-green "contour" lines — flowing waves that evoke field
 * furrows / topographic lines. Pure SVG, deterministic, no client JS.
 */
function wave(y: number, amp: number, phase: number, steps = 7, width = 1440) {
  const seg = width / steps;
  let d = `M0 ${y.toFixed(1)}`;
  for (let i = 0; i < steps; i++) {
    const cx = seg * i + seg * 0.5;
    const ex = seg * (i + 1);
    const cy = y + Math.sin(phase + i * 0.9) * amp;
    const ey = y + Math.sin(phase + (i + 1) * 0.9) * amp * 0.55;
    d += ` Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  }
  return d;
}

export function AccentLines({
  className,
  count = 9,
  tone = "brand",
}: {
  className?: string;
  count?: number;
  tone?: "brand" | "light";
}) {
  const top = 90;
  const gap = 70;
  const stroke = tone === "light" ? "#ffffff" : "var(--color-brand-deep)";
  const lines = Array.from({ length: count }, (_, i) => {
    const y = top + i * gap;
    const amp = 16 + (i % 3) * 9;
    const phase = i * 0.6;
    const opacity =
      tone === "light" ? 0.05 + (i % 4) * 0.015 : 0.12 + (i % 4) * 0.04;
    return { d: wave(y, amp, phase), opacity, w: i % 2 === 0 ? 1 : 1.4 };
  });

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      viewBox={`0 0 1440 ${top + count * gap + 60}`}
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      {lines.map((l, i) => (
        <path
          key={i}
          d={l.d}
          stroke={stroke}
          strokeWidth={l.w}
          strokeLinecap="round"
          opacity={l.opacity}
        />
      ))}
    </svg>
  );
}
