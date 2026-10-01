import Link from "next/link";
import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1 text-xs font-medium text-muted",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light" | "outlineLight";
  className?: string;
  external?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 px-5 py-2.5";

const variants = {
  primary:
    "bg-ink text-white hover:bg-black/80 shadow-[0_1px_2px_rgba(0,0,0,0.12)]",
  secondary:
    "border border-line-strong bg-bg text-ink hover:bg-bg-soft hover:border-ink/25",
  ghost: "text-ink/80 hover:text-ink hover:bg-bg-soft",
  /* for dark surfaces */
  light: "bg-white text-ink hover:bg-white/90",
  outlineLight: "border border-white/20 text-white hover:bg-white/10",
};

/** target/rel for links that leave the site (http only — not mailto/tel). */
export function linkTargetProps(href: string) {
  return href.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonProps) {
  const cls = cn(base, variants[variant], className);
  // in-page anchors: a plain <a> always scrolls, next/link ignores a repeat
  // click when the URL already carries the same #hash
  if (
    external ||
    href.startsWith("#") ||
    href.startsWith("http") ||
    href.startsWith("mailto")
  ) {
    return (
      <a href={href} {...linkTargetProps(href)} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Small amber "in development" marker. */
export function DevBadge({
  children = "W rozwoju",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-warn/25 bg-warn/10 px-2.5 py-1 text-[11px] font-medium text-[#8a5f0f]",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-warn" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-[2.8rem] md:leading-[1.05]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-xl text-pretty text-base text-muted sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
