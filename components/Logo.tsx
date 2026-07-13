import { cn } from "@/lib/cn";

/**
 * Zagroda mark — a "sheaf": five strokes fanning out from one rooted point.
 * Reads at once as an ear of grain, a sprouting plant and field furrows in
 * perspective. The rooted point is a green monitoring node.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-7 w-7", className)}
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M14 24 Q13.7 14.5 14 5.4" />
        <path d="M14 24 Q11.2 15 9.1 9.2" />
        <path d="M14 24 Q16.8 15 18.9 9.2" />
        <path d="M14 24 Q9.2 16.4 5.7 12.6" />
        <path d="M14 24 Q18.8 16.4 22.3 12.6" />
      </g>
      <circle cx="14" cy="24.2" r="1.9" fill="var(--color-brand)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className="text-ink" />
      <span
        className="text-[1.12rem] font-semibold tracking-tight text-ink"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Zagroda
        <span className="text-faint">.io</span>
      </span>
    </span>
  );
}
