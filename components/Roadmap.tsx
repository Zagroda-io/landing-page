import {
  Activity,
  BrainCircuit,
  Heart,
  Footprints,
  Thermometer,
  TriangleAlert,
  Zap,
  MapPinOff,
  type LucideIcon,
} from "lucide-react";
import { Container, SectionHeading, DevBadge } from "@/components/primitives";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { activityDay, planned } from "@/lib/site";

const icons: Record<string, LucideIcon> = {
  Heart,
  Footprints,
  Thermometer,
  TriangleAlert,
  Zap,
  MapPinOff,
};

const hours = (h: number) => `${String(h).replace(".", ",")} h`;

function ActivityCard() {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-sage p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-deep shadow-sm">
          <Activity className="h-5 w-5" strokeWidth={1.7} />
        </div>
        <DevBadge className="bg-white/70">W planach</DevBadge>
      </div>
      <h3
        className="mt-6 text-xl font-semibold text-ink"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Aktywność krowy w ciągu doby
      </h3>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/65">
        Ile czasu krowa je, przeżuwa, śpi i chodzi. Mniej przeżuwania albo mniej
        ruchu to często pierwsze oznaki choroby — widoczne, zanim zauważysz je
        gołym okiem.
      </p>

      <div className="mt-auto pt-8">
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink/45">
          Przykład · krowa #47 · ostatnie 24 h
        </p>
        <div className="mt-3 flex h-9 w-full overflow-hidden rounded-full bg-white/60 p-1">
          {activityDay.map((a) => (
            <div
              key={a.label}
              className={`${a.color} h-full first:rounded-l-full last:rounded-r-full`}
              style={{ width: `${(a.hours / 24) * 100}%` }}
              title={`${a.label}: ${hours(a.hours)}`}
            />
          ))}
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
          {activityDay.map((a) => (
            <div key={a.label} className="flex items-start gap-2">
              <span
                className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${a.color}`}
              />
              <div>
                <dt className="text-xs text-ink/60">{a.label}</dt>
                <dd className="text-sm font-semibold text-ink">
                  {hours(a.hours)}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/** Personal baseline band with one excursion — "learns every cow". */
function BaselineChart() {
  const ys = [62, 58, 64, 60, 63, 57, 61, 65, 59, 62, 24, 50, 60, 63];
  const pts = ys.map((y, i) => `${10 + i * 20},${y}`).join(" ");
  return (
    <svg viewBox="0 0 280 110" className="h-auto w-full" aria-hidden="true">
      <rect
        x="4"
        y="50"
        width="272"
        height="24"
        rx="6"
        fill="rgba(134,239,172,0.12)"
        stroke="rgba(134,239,172,0.35)"
        strokeDasharray="3 4"
      />
      <polyline
        points={pts}
        fill="none"
        stroke="#86efac"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="210" cy="24" r="5" fill="#fbbf24" />
      <circle cx="210" cy="24" r="10" fill="rgba(251,191,36,0.25)" />
      <text x="224" y="20" fill="rgba(255,255,255,0.75)" fontSize="10">
        odchylenie
      </text>
      <text x="8" y="92" fill="rgba(255,255,255,0.45)" fontSize="10">
        norma tej krowy
      </text>
    </svg>
  );
}

function IndividualCard() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-[#0a0d0b] p-6 text-white sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[rgba(74,222,128,0.16)] blur-[60px]" />
      <div className="relative flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#86efac]">
          <BrainCircuit className="h-5 w-5" strokeWidth={1.7} />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 text-[11px] font-medium text-[#fbd38d]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24]" />W planach
        </span>
      </div>
      <h3
        className="relative mt-6 text-xl font-semibold"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Uczy się każdej krowy
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-white/60">
        Każda krowa ma swój rytm. System poznaje normę konkretnej sztuki i
        reaguje, gdy od niej odbiega — analiza jest indywidualna, a nie „średnia
        dla stada”.
      </p>
      <div className="relative mt-auto pt-8">
        <BaselineChart />
      </div>
    </div>
  );
}

export function Roadmap() {
  return (
    <section id="rozwoj" className="relative py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="W rozwoju"
            title={
              <>
                Następny krok:{" "}
                <span className="text-gradient-brand">
                  zdrowie i zachowanie
                </span>{" "}
                każdej krowy
              </>
            }
            subtitle="Nad tymi funkcjami właśnie pracujemy. Twoja opinia z ankiety pomoże nam zdecydować, co dostarczymy najpierw."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <ActivityCard />
          </Reveal>
          <Reveal delay={0.08}>
            <IndividualCard />
          </Reveal>
        </div>

        <RevealGroup className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {planned.map((p) => {
            const Icon = icons[p.icon];
            return (
              <Reveal key={p.id} as="div">
                <div className="flex h-full flex-col rounded-3xl border border-line bg-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg-soft text-ink">
                      {Icon && (
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                      )}
                    </div>
                    <DevBadge>W planach</DevBadge>
                  </div>
                  <h3
                    className="mt-5 text-lg font-semibold text-ink"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {p.desc}
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
