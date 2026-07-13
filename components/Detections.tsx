import { Container, SectionHeading } from "@/components/primitives";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { detections } from "@/lib/site";
import { cn } from "@/lib/cn";

const severityStyles: Record<
  string,
  { dot: string; text: string; label: string }
> = {
  alert: { dot: "bg-alert", text: "text-alert", label: "Pilne" },
  warn: { dot: "bg-warn", text: "text-warn", label: "Ważne" },
  ok: { dot: "bg-brand", text: "text-brand", label: "Rutynowe" },
};

export function Detections() {
  return (
    <section id="wykrywanie" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Co wykrywa"
            title={
              <>
                Zauważy to, co łatwo{" "}
                <span className="text-gradient-brand">przeoczyć</span>
              </>
            }
            subtitle="Przy kilkudziesięciu czy kilkuset sztukach nie da się patrzeć na wszystkie naraz. Zagroda pilnuje każdej i odzywa się, gdy trzeba."
          />
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {detections.map((d) => {
            const s = severityStyles[d.severity];
            return (
              <Reveal key={d.title} as="div">
                <div className="group relative flex h-full flex-col rounded-3xl border border-line bg-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] font-medium",
                        s.text,
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
                      {s.label}
                    </span>
                  </div>
                  <h3
                    className="mt-4 text-lg font-semibold text-ink"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {d.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-sm text-faint">
            Z czasem Zagroda rozpoznaje coraz więcej sytuacji — wciąż się uczy.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
