import { Plus } from "lucide-react";
import { Container, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { faq } from "@/lib/site";

export function Faq() {
  return (
    <section
      id="faq"
      className="relative border-y border-line bg-bg-warm py-24 sm:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Pytania i odpowiedzi"
              title={
                <>
                  Najczęstsze{" "}
                  <span className="text-gradient-brand">pytania</span>
                </>
              }
              subtitle="Nie ma tu Twojego pytania? Napisz do nas — chętnie odpowiemy."
            />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="divide-y divide-line rounded-3xl border border-line bg-bg">
              {faq.map((item) => (
                <details
                  key={item.q}
                  className="group px-6 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-medium text-ink">
                    {item.q}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-transform duration-200 group-open:rotate-45">
                      <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </summary>
                  <p className="-mt-1 pb-5 pr-10 text-sm leading-relaxed text-muted">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
