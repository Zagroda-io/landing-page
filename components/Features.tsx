import {
  Eye,
  Radio,
  WifiOff,
  BellRing,
  Smartphone,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/primitives";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { features } from "@/lib/site";

const icons: Record<string, LucideIcon> = {
  Eye,
  Radio,
  WifiOff,
  BellRing,
  Smartphone,
  Monitor,
};

const fills = [
  "bg-sage",
  "bg-cream",
  "bg-sky",
  "bg-clay",
  "bg-lilac",
  "bg-brand-soft",
];

export function Features() {
  return (
    <section id="produkt" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Co potrafi Zagroda"
            title={
              <>
                Wszystko w jednym,{" "}
                <span className="text-gradient-brand">gotowe do działania</span>
              </>
            }
            subtitle="Kamery, czujniki, aplikacja i nasze wsparcie. Montujemy u Ciebie w gospodarstwie i pokazujemy, jak z tego korzystać."
          />
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <Reveal key={f.id} as="div">
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl ${fills[i % fills.length]} p-6 transition-transform duration-300 hover:-translate-y-1`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-deep shadow-sm">
                      {Icon && <Icon className="h-5 w-5" strokeWidth={1.7} />}
                    </div>
                    {f.tag && (
                      <span className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-medium text-ink/70">
                        {f.tag}
                      </span>
                    )}
                  </div>
                  <h3
                    className="mt-6 text-lg font-semibold text-ink"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
