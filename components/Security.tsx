import {
  Lock,
  Camera,
  Radio,
  Cpu,
  Smartphone,
  Bell,
  Film,
  ClipboardList,
  ArrowRight,
  WifiOff,
  Wrench,
  Smile,
  type LucideIcon,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { AccentLines } from "@/components/AccentLines";

const stays: { icon: LucideIcon; text: string }[] = [
  { icon: Camera, text: "Pełny obraz z kamer, przez całą dobę" },
  { icon: Radio, text: "Dane z czujników na obrożach" },
  { icon: Cpu, text: "Analiza na miejscu, w oborze" },
];

const leaves: { icon: LucideIcon; text: string }[] = [
  { icon: Bell, text: "Powiadomienie z numerem krowy" },
  { icon: Film, text: "Krótki urywek konkretnego zdarzenia" },
  { icon: ClipboardList, text: "Historia i karta każdej krowy" },
];

const reasons = [
  {
    icon: WifiOff,
    title: "Działa na miejscu",
    desc: "Analiza odbywa się w oborze, więc system zbiera dane także przy słabym zasięgu lub awarii łącza.",
  },
  {
    icon: Wrench,
    title: "Montaż i wsparcie",
    desc: "Przyjeżdżamy, montujemy i ustawiamy wszystko. Potem jesteśmy pod telefonem, kiedy potrzebujesz.",
  },
  {
    icon: Smile,
    title: "Proste w obsłudze",
    desc: "Bez skomplikowanych ustawień. Jeśli odbierasz SMS-y, poradzisz sobie z Zagrodą bez problemu.",
  },
];

function List({ items, light }: { items: typeof stays; light?: boolean }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-center gap-3 text-sm text-ink/80">
          <span
            className={
              light
                ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg-soft text-ink"
                : "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand-deep"
            }
          >
            <Icon className="h-4 w-4" strokeWidth={1.7} />
          </span>
          {text}
        </li>
      ))}
    </ul>
  );
}

export function Security() {
  return (
    <section
      id="bezpieczenstwo"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <AccentLines className="opacity-50 mask-fade-radial" count={8} />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Bezpieczeństwo"
            title={
              <>
                Obraz z kamer{" "}
                <span className="text-gradient-brand">
                  nigdy nie opuszcza obory
                </span>
              </>
            }
            subtitle="Nagrania analizujemy na miejscu, w Twoim gospodarstwie. Do aplikacji trafiają wyłącznie krótkie urywki konkretnych zdarzeń — nic więcej."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-3xl border border-brand/20 bg-sage p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p
                  className="text-lg font-semibold text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  W Twojej oborze
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium text-brand-deep">
                  <Lock className="h-3 w-3" strokeWidth={2.2} />
                  Zostaje u Ciebie
                </span>
              </div>
              <List items={stays} />
            </div>

            <div className="flex flex-col items-center gap-2 py-2 text-center">
              <span className="max-w-[11rem] rounded-full border border-line bg-bg px-3 py-1.5 text-[11px] font-medium leading-snug text-muted">
                wychodzą tylko urywki zdarzeń
              </span>
              <ArrowRight className="h-5 w-5 rotate-90 text-brand lg:rotate-0" />
            </div>

            <div className="rounded-3xl border border-line bg-bg p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p
                  className="text-lg font-semibold text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  W telefonie i na komputerze
                </p>
                <Smartphone className="h-5 w-5 text-faint" strokeWidth={1.6} />
              </div>
              <List items={leaves} light />
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={0.1 + i * 0.06}>
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
