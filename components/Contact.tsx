import { ArrowUpRight, ClipboardList, Mail } from "lucide-react";
import {
  Container,
  SectionHeading,
  linkTargetProps,
} from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

const nextSteps = [
  "Odezwiemy się telefonicznie lub mailowo i odpowiemy na Twoje pytania.",
  "Porozmawiamy o Twoim gospodarstwie i o tym, czego potrzebujesz.",
  "Damy znać, gdy Zagroda będzie gotowa do testów u Ciebie.",
];

export function Contact() {
  return (
    <section id="kontakt" className="relative py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="flex flex-col gap-8">
              <SectionHeading
                align="left"
                eyebrow="Kontakt"
                title={
                  <>
                    Porozmawiajmy o{" "}
                    <span className="text-gradient-brand">
                      Twoim gospodarstwie
                    </span>
                  </>
                }
                subtitle="Masz pytania, chcesz przetestować Zagrodę u siebie albo rozmawialiśmy na targach? Zostaw kontakt — odezwiemy się."
              />

              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-bg p-4 transition-colors hover:border-line-strong"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-deep">
                    <Mail className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs text-faint">
                      Napisz bezpośrednio
                    </span>
                    <span className="block text-sm font-medium text-ink">
                      {site.email}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-ink" />
                </a>
                {/* hidden until the survey link is set — it would point back here */}
                {site.surveyUrl && (
                  <a
                    href={site.surveyUrl}
                    {...linkTargetProps(site.surveyUrl)}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-bg p-4 transition-colors hover:border-line-strong"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream text-[#8a5f0f]">
                      <ClipboardList
                        className="h-[18px] w-[18px]"
                        strokeWidth={1.8}
                      />
                    </span>
                    <span className="flex-1">
                      <span className="block text-xs text-faint">
                        Masz kilka minut?
                      </span>
                      <span className="block text-sm font-medium text-ink">
                        Wypełnij ankietę dla hodowców
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-ink" />
                  </a>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                  Co dalej?
                </p>
                <ol className="mt-4 space-y-3">
                  {nextSteps.map((step, i) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line font-mono text-[11px] text-brand">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-line bg-bg p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
