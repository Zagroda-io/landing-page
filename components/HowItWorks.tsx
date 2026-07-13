import { Camera, Server, CloudUpload, Smartphone } from "lucide-react";
import { Container, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { steps } from "@/lib/site";

const stepIcons = [Camera, Server, CloudUpload, Smartphone];

export function HowItWorks() {
  return (
    <section
      id="jak-to-dziala"
      className="relative scroll-mt-24 border-y border-line bg-bg-warm py-24 sm:py-32"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Jak to działa"
            title={
              <>
                Od obory do telefonu{" "}
                <span className="text-gradient-brand">w mniej niż minutę</span>
              </>
            }
            subtitle="Cała praca dzieje się na miejscu, w Twojej oborze. Ty dostajesz tylko to, co ważne — gotowy alert z krótkim nagraniem."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = stepIcons[i];
            return (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl border border-line bg-bg p-6">
                  {i < steps.length - 1 && (
                    <div className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg text-faint lg:flex">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-medium text-brand">
                      {s.n}
                    </span>
                    <Icon className="h-5 w-5 text-faint" strokeWidth={1.6} />
                  </div>
                  <h3
                    className="mt-6 text-base font-semibold text-ink"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border border-line bg-bg px-6 py-4 text-center text-xs text-muted">
            <span>
              Działa <span className="font-semibold text-ink">bez internetu</span>
            </span>
            <span className="h-1 w-1 rounded-full bg-faint" />
            <span>
              <span className="font-semibold text-ink">Nagranie</span> przy każdym
              alercie
            </span>
            <span className="h-1 w-1 rounded-full bg-faint" />
            <span>
              Czuwa <span className="font-semibold text-ink">także nocą</span>
            </span>
            <span className="h-1 w-1 rounded-full bg-faint" />
            <span>
              Bez <span className="font-semibold text-ink">Twojej obecności</span>
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
