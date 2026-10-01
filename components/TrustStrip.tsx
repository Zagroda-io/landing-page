import { Check } from "lucide-react";
import { Container } from "@/components/primitives";
import { trustPoints } from "@/lib/site";

export function TrustStrip() {
  const items = [...trustPoints, ...trustPoints];
  return (
    <section className="relative border-y border-line bg-bg-warm py-12 sm:py-14">
      <Container>
        <p className="mb-8 text-balance text-center text-xs uppercase leading-relaxed tracking-[0.18em] text-faint">
          Bierzemy na siebie całość — Ty zajmujesz się gospodarstwem
        </p>
      </Container>
      <div className="pause-on-hover relative overflow-hidden mask-fade-x">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
          {items.map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted/90"
            >
              <Check className="h-4 w-4 text-brand" strokeWidth={2.2} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
