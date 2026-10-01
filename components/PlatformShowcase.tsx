import {
  ArrowUpRight,
  Bell,
  Beef,
  CalendarClock,
  TrendingUp,
  Check,
} from "lucide-react";
import { Container, SectionHeading, ButtonLink } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { herdManagement, site } from "@/lib/site";

function DashboardMock() {
  const bars = [38, 52, 44, 61, 49, 72, 80, 66, 90, 74, 83, 95];
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-bg shadow-[0_40px_120px_-40px_rgba(0,0,0,0.35)]">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-bg-warm px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
        <div className="ml-3 flex items-center gap-1.5 rounded-md bg-bg px-2.5 py-1 text-[11px] text-faint">
          Zagroda · Twoje stado
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-bg-warm p-4">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Beef className="h-4 w-4 text-brand" /> Krowy w stadzie
          </div>
          <p className="mt-2 text-2xl font-semibold text-ink">248</p>
          <p className="mt-1 text-[11px] text-brand">wszystkie z obrożą</p>
        </div>
        <div className="rounded-xl border border-line bg-bg-warm p-4">
          <div className="flex items-center gap-2 text-xs text-muted">
            <CalendarClock className="h-4 w-4 text-info" /> Zadania w tym
            tygodniu
          </div>
          <p className="mt-2 text-2xl font-semibold text-ink">6</p>
          <p className="mt-1 text-[11px] text-faint">
            zaplanowane automatycznie
          </p>
        </div>
        <div className="rounded-xl border border-line bg-bg-warm p-4">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Bell className="h-4 w-4 text-alert" /> Zdarzenia dziś
          </div>
          <p className="mt-2 text-2xl font-semibold text-ink">3</p>
          <p className="mt-1 text-[11px] text-alert">1 wymaga uwagi</p>
        </div>

        {/* upcoming tasks */}
        <div className="rounded-xl border border-line bg-bg-warm p-4">
          <span className="text-xs text-muted">Nadchodzące</span>
          <ul className="mt-3 space-y-3">
            {[
              { c: "bg-warn", t: "Zasuszenie · #112", s: "za 3 dni" },
              { c: "bg-brand", t: "Inseminacja · #58", s: "jutro" },
              { c: "bg-info", t: "Kontrola cielności · #47", s: "pt." },
            ].map((a) => (
              <li key={a.t} className="flex items-start gap-2.5">
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${a.c}`}
                />
                <span className="min-w-0">
                  <span className="block text-xs leading-snug text-ink">
                    {a.t}
                  </span>
                  <span className="block text-[10px] text-faint">{a.s}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* chart */}
        <div className="rounded-xl border border-line bg-bg-warm p-4 sm:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs text-muted">
              <TrendingUp className="h-4 w-4 text-brand" /> Aktywność stada ·
              dziś
            </span>
            <span className="text-[11px] text-faint">na żywo</span>
          </div>
          <div className="flex h-28 items-end gap-1.5">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-brand/30 to-brand"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="animate-float absolute -bottom-14 -right-4 hidden w-44 rounded-[1.75rem] border border-line bg-bg p-1.5 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.4)] lg:block">
      <div className="overflow-hidden rounded-[1.4rem] border border-line bg-bg-warm">
        <div className="flex items-center justify-between bg-bg px-3 py-2">
          <span className="text-[10px] font-semibold text-ink">Zagroda</span>
          <Bell className="h-3 w-3 text-warn" />
        </div>
        <div className="space-y-2 p-3">
          <div className="rounded-lg border border-warn/25 bg-warn/10 p-2.5">
            <p className="text-[10px] font-semibold text-ink">Przypomnienie</p>
            <p className="mt-0.5 text-[9px] leading-snug text-muted">
              Proponowany termin zasuszenia · krowa #112 · za 3 dni
            </p>
          </div>
          <div className="rounded-lg border border-line bg-bg p-2.5">
            <p className="text-[10px] font-semibold text-ink">Zdarzenie</p>
            <p className="mt-0.5 text-[9px] text-muted">krowa #47 · Obora B</p>
            <div className="mt-1.5 aspect-video rounded bg-ink/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PlatformShowcase() {
  return (
    <section
      id="platforma"
      className="relative border-y border-line bg-bg-warm py-24 sm:py-32"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-6">
              <SectionHeading
                align="left"
                eyebrow="Zarządzanie stadem"
                title={
                  <>
                    Całe stado w jednej{" "}
                    <span className="text-gradient-brand">platformie</span>
                  </>
                }
                subtitle="Zarządzanie stadem może w pełni odbywać się z poziomu platformy — na telefonie i na komputerze. Zagroda sama przypomni, co i kiedy trzeba zrobić."
              />
              <ul className="flex flex-col gap-3 text-sm text-muted">
                {herdManagement.map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
                      <Check className="h-3 w-3" strokeWidth={2.4} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <ButtonLink href={site.appUrl} variant="primary">
                  Wejdź do platformy
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="#kontakt" variant="secondary">
                  Porozmawiajmy
                </ButtonLink>
              </div>
              <p className="text-xs text-faint">
                Platforma w wersji testowej ·{" "}
                <span className="text-muted">app.dev.zagroda.io</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_70%_30%,rgba(47,125,79,0.10),transparent_70%)]" />
              <DashboardMock />
              <PhoneMock />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
