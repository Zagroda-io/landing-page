import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { FooterWordmark } from "@/components/FooterWordmark";
import { Container, linkTargetProps } from "@/components/primitives";
import { nav, site, surveyHref } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-warm pt-14">
      <Container>
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Opieka nad stadem przez całą dobę. Kamera wykrywa zdarzenie,
              czujnik na obroży wskazuje krowę, a Ty dostajesz powiadomienie.
            </p>
            <address className="mt-5 flex flex-col gap-2.5 text-sm not-italic text-muted">
              <span className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  {site.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </span>
              {site.phone && (
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-ink"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand" />
                  {site.phone}
                </a>
              )}
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-ink"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                {site.email}
              </a>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                Produkt
              </p>
              <ul className="mt-4 space-y-2.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                Platforma
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={site.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
                  >
                    Zaloguj się <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={surveyHref}
                    {...linkTargetProps(surveyHref)}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    Ankieta dla hodowców
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    Pytania i odpowiedzi
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                Firma
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={site.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
                  >
                    {site.company} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="#kontakt"
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    Kontakt
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name} · projekt i realizacja{" "}
            <a
              href={site.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-ink"
            >
              {site.company}
            </a>
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-warn" />
            Projekt w fazie rozwoju · platforma w wersji testowej
          </span>
        </div>
      </Container>

      <FooterWordmark />
    </footer>
  );
}
