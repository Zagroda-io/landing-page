import { Container } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { stats } from "@/lib/site";

export function Stats() {
  return (
    <section className="relative border-y border-line bg-bg-warm py-14">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="text-center lg:text-left">
                <p
                  className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
