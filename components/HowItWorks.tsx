import {
  Camera,
  Radio,
  ScanEye,
  Smartphone,
  WifiOff,
  Wifi,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { steps } from "@/lib/site";

const stepIcons = [Camera, Radio, ScanEye, Smartphone];

/** "Camera event + collar event at the same moment = this cow" */
function MatchVisual() {
  return (
    <div className="mx-auto mt-14 flex max-w-3xl flex-col items-stretch gap-3 rounded-3xl border border-line bg-bg p-4 sm:flex-row sm:items-center sm:p-5">
      <div className="flex flex-1 items-center gap-3 rounded-2xl bg-sky px-4 py-3">
        <Camera className="h-5 w-5 shrink-0 text-info" strokeWidth={1.7} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">Kamera 2</p>
          <p className="font-mono text-[11px] text-muted">
            zdarzenie · 14:32:05
          </p>
        </div>
      </div>
      <Plus className="mx-auto h-4 w-4 shrink-0 text-faint" />
      <div className="flex flex-1 items-center gap-3 rounded-2xl bg-cream px-4 py-3">
        <Radio className="h-5 w-5 shrink-0 text-warn" strokeWidth={1.7} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">Obroża #047</p>
          <p className="font-mono text-[11px] text-muted">ruch · 14:32:05</p>
        </div>
      </div>
      <ArrowRight className="mx-auto h-4 w-4 shrink-0 rotate-90 text-faint sm:rotate-0" />
      <div className="flex flex-1 items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-white">
        <ScanEye
          className="h-5 w-5 shrink-0 text-[#86efac]"
          strokeWidth={1.7}
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold">To krowa #47</p>
          <p className="text-[11px] text-white/55">alert z nagraniem</p>
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section
      id="jak-to-dziala"
      className="relative border-y border-line bg-bg-warm py-24 sm:py-32"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Jak to działa"
            title={
              <>
                Kamera widzi, obroża wie,{" "}
                <span className="text-gradient-brand">która to krowa</span>
              </>
            }
            subtitle="Dwa źródła informacji pracują razem. Dzięki temu alert nie mówi tylko „coś się dzieje”, ale wskazuje konkretne zwierzę."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <MatchVisual />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = stepIcons[i];
            return (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl border border-line bg-bg p-6">
                  {i < steps.length - 1 && (
                    <div className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg text-faint lg:flex">
                      <ArrowRight className="h-3 w-3" strokeWidth={2} />
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
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 overflow-hidden rounded-2xl border border-line bg-bg sm:grid-cols-2">
            <div className="flex items-start gap-3 p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bg-soft text-ink">
                <WifiOff className="h-4 w-4" strokeWidth={1.8} />
              </div>
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-semibold text-ink">Bez internetu</span>{" "}
                system dalej obserwuje stado i zbiera dane na miejscu, w oborze.
              </p>
            </div>
            <div className="flex items-start gap-3 border-t border-line p-5 sm:border-l sm:border-t-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-deep">
                <Wifi className="h-4 w-4" strokeWidth={1.8} />
              </div>
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-semibold text-ink">Z internetem</span>{" "}
                powiadomienia trafiają na Twój telefon i do aplikacji webowej.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
