import QRCode from "qrcode";
import { ArrowRight, Check } from "lucide-react";
import { Container, ButtonLink } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { AccentLines } from "@/components/AccentLines";
import { roadmap, site, surveyHref } from "@/lib/site";
import { cn } from "@/lib/cn";

function StageDot({ status }: { status: (typeof roadmap)[number]["status"] }) {
  if (status === "done") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4ade80]/20 text-[#86efac]">
        <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
      </span>
    );
  }
  if (status === "now") {
    return (
      <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
        <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-[#fbbf24] opacity-40" />
        <span className="relative h-3 w-3 rounded-full bg-[#fbbf24]" />
      </span>
    );
  }
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center">
      <span className="h-3 w-3 rounded-full border-2 border-white/30" />
    </span>
  );
}

export async function Survey() {
  // QR rendered at build time so visitors at a stand can scan it from the screen.
  const qr = site.surveyUrl
    ? await QRCode.toString(site.surveyUrl, {
        type: "svg",
        margin: 0,
        errorCorrectionLevel: "M",
        color: { dark: "#0a0a0a", light: "#ffffff" },
      })
    : null;

  return (
    <section id="ankieta" className="relative py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0a0d0b] px-6 py-14 sm:px-12 sm:py-20">
            <AccentLines
              tone="light"
              count={8}
              className="opacity-50 mask-fade-radial"
            />
            <div className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-[rgba(74,222,128,0.18)] blur-[90px]" />

            <div
              className={cn(
                "relative grid items-center gap-12",
                qr && "lg:grid-cols-[1fr_auto]",
              )}
            >
              <div
                className={cn(
                  "flex flex-col",
                  !qr && "mx-auto max-w-2xl items-center text-center",
                )}
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-[#fbd38d]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24]" />
                  Projekt w fazie rozwoju
                </span>
                <h2
                  className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Pomóż nam zbudować Zagrodę{" "}
                  <span className="text-[#86efac]">na miarę Twojej obory</span>
                </h2>
                <p className="mt-5 max-w-xl text-pretty text-base text-white/65 sm:text-lg">
                  Zanim dodamy kolejne funkcje, chcemy wiedzieć, czego naprawdę
                  potrzebują hodowcy. Wypełnij krótką ankietę — zajmie tylko
                  kilka minut, a Twoje odpowiedzi realnie wpłyną na to, co
                  zbudujemy.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={surveyHref} variant="light">
                    Wypełnij ankietę
                    <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                  <ButtonLink href="#kontakt" variant="outlineLight">
                    Napisz do nas
                  </ButtonLink>
                </div>
              </div>

              {qr && (
                <div className="mx-auto flex w-56 flex-col items-center gap-3 rounded-3xl bg-white p-5 text-center">
                  <div
                    className="w-full [&>svg]:h-auto [&>svg]:w-full"
                    dangerouslySetInnerHTML={{ __html: qr }}
                  />
                  <p className="text-xs font-medium text-ink/70">
                    Zeskanuj telefonem, aby otworzyć ankietę
                  </p>
                </div>
              )}
            </div>

            <ol className="relative mt-14 grid grid-cols-1 gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
              {roadmap.map((r) => (
                <li key={r.label} className="flex gap-3">
                  <StageDot status={r.status} />
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-white/45">
                      {r.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {r.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white/55">
                      {r.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
