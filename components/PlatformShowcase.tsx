import { ArrowUpRight, Bell, Activity, Beef, TrendingUp } from "lucide-react";
import { Container, SectionHeading, ButtonLink } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

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
            <Beef className="h-4 w-4 text-brand" /> Sztuk pod opieką
          </div>
          <p className="mt-2 text-2xl font-semibold text-ink">248</p>
          <p className="mt-1 text-[11px] text-brand">+12 w tym miesiącu</p>
        </div>
        <div className="rounded-xl border border-line bg-bg-warm p-4">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Activity className="h-4 w-4 text-info" /> Zwierzęta w normie
          </div>
          <p className="mt-2 text-2xl font-semibold text-ink">94%</p>
          <p className="mt-1 text-[11px] text-faint">spokojny dzień</p>
        </div>
        <div className="rounded-xl border border-line bg-bg-warm p-4">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Bell className="h-4 w-4 text-alert" /> Powiadomienia dziś
          </div>
          <p className="mt-2 text-2xl font-semibold text-ink">3</p>
          <p className="mt-1 text-[11px] text-alert">1 wymaga uwagi</p>
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

        {/* alerts list */}
        <div className="rounded-xl border border-line bg-bg-warm p-4">
          <span className="text-xs text-muted">Ostatnie zdarzenia</span>
          <ul className="mt-3 space-y-2.5">
            {[
              { c: "bg-alert", t: "Upadek · krowa #112", s: "5 min" },
              { c: "bg-warn", t: "Kulawizna · krowa #58", s: "1 godz" },
              { c: "bg-brand", t: "Ruja · krowa #47", s: "2 godz" },
            ].map((a) => (
              <li key={a.t} className="flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full ${a.c}`} />
                <span className="flex-1 truncate text-xs text-ink">{a.t}</span>
                <span className="text-[10px] text-faint">{a.s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="animate-float absolute -bottom-8 -right-2 hidden w-40 rounded-[1.75rem] border border-line bg-bg p-1.5 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.4)] lg:block">
      <div className="overflow-hidden rounded-[1.4rem] border border-line bg-bg-warm">
        <div className="flex items-center justify-between bg-bg px-3 py-2">
          <span className="text-[10px] font-semibold text-ink">Zagroda</span>
          <Bell className="h-3 w-3 text-alert" />
        </div>
        <div className="space-y-2 p-3">
          <div className="rounded-lg border border-alert/25 bg-alert/10 p-2.5">
            <p className="text-[10px] font-semibold text-ink">Wykryto upadek</p>
            <p className="mt-0.5 text-[9px] text-muted">krowa #112 · Sektor A</p>
          </div>
          <div className="aspect-video rounded-lg bg-ink/5" />
          <div className="h-1.5 w-3/4 rounded bg-ink/10" />
          <div className="h-1.5 w-1/2 rounded bg-ink/10" />
        </div>
      </div>
    </div>
  );
}

export function PlatformShowcase() {
  return (
    <section
      id="platforma"
      className="relative scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-6">
              <SectionHeading
                align="left"
                eyebrow="Platforma"
                title={
                  <>
                    Całe stado w jednym{" "}
                    <span className="text-gradient-brand">miejscu</span>
                  </>
                }
                subtitle="Aplikacja na telefon i wygodny podgląd na komputerze. Karta każdego zwierzęcia, historia i powiadomienia — z każdego miejsca, o każdej porze."
              />
              <ul className="flex flex-col gap-3 text-sm text-muted">
                {[
                  "Karta każdej sztuki — leczenia, krycia, notatki",
                  "Powiadomienie z nagraniem prosto na telefon",
                  "Działa też w polu bez zasięgu — wszystko zapisze się samo",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <ButtonLink href={site.appUrl} variant="primary">
                  Wejdź do platformy
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href={site.demoUrl} variant="secondary">
                  Umów demo
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
