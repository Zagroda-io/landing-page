import { WifiOff, Lock, Wrench, Smile } from "lucide-react";
import { Container, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { AccentLines } from "@/components/AccentLines";

const reasons = [
  {
    icon: WifiOff,
    title: "Działa bez internetu",
    desc: "Wszystko liczy się na miejscu, w oborze. Awaria łącza czy słaby zasięg nie wyłączają opieki nad stadem.",
  },
  {
    icon: Lock,
    title: "Nagrania zostają u Ciebie",
    desc: "Obraz z kamer nie krąży po sieci. Na telefon trafia tylko krótki filmik konkretnego zdarzenia.",
  },
  {
    icon: Wrench,
    title: "Montaż i pomoc w cenie",
    desc: "Przyjeżdżamy, montujemy i ustawiamy wszystko. Potem jesteśmy pod telefonem, kiedy potrzebujesz.",
  },
  {
    icon: Smile,
    title: "Proste w obsłudze",
    desc: "Bez skomplikowanych ustawień. Jeśli odbierasz SMS-y, poradzisz sobie z Zagrodą bez problemu.",
  },
];

export function Technology() {
  return (
    <section
      id="technologia"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32"
    >
      <AccentLines className="opacity-50 mask-fade-radial" count={8} />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Dlaczego Zagroda"
            title={
              <>
                Spokój, nawet gdy Cię{" "}
                <span className="text-gradient-brand">nie ma w oborze</span>
              </>
            }
            subtitle="Prosty system, który po cichu robi swoje — i odzywa się tylko wtedy, kiedy naprawdę trzeba."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-line bg-bg p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft text-brand-deep">
                  <r.icon className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <h3
                  className="mt-5 text-base font-semibold text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {r.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
