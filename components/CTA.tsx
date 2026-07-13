import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { AccentLines } from "@/components/AccentLines";
import { site } from "@/lib/site";

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0a0d0b] px-6 py-16 text-center sm:px-12 sm:py-24">
            <AccentLines tone="light" count={8} className="opacity-50 mask-fade-radial" />
            <div className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-[rgba(74,222,128,0.18)] blur-[90px]" />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center">
              <h2
                className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Zadbaj o stado,{" "}
                <span className="text-[#86efac]">zanim zadzwoni weterynarz</span>
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-base text-white/65 sm:text-lg">
                Umów bezpłatną prezentację. Pokażemy Zagrodę na danych z prawdziwej
                obory i dobierzemy zestaw pod Twoje gospodarstwo — z montażem i
                wsparciem.
              </p>
              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
                <a
                  href={site.demoUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white/90"
                >
                  Umów demo
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={site.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Wejdź do platformy
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
