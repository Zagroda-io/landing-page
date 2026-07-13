import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/primitives";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg-warm py-14">
      <Container>
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Czuwamy nad Twoim stadem dzień i noc. Kamery i czujniki, które same
              rozpoznają ważne sytuacje i od razu dają znać.
            </p>
            <p className="mt-4 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="text-muted transition-colors hover:text-ink"
              >
                {site.email}
              </a>
            </p>
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
                    href={site.demoUrl}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    Umów demo
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
                    href={`mailto:${site.email}`}
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
            Platforma w wersji testowej
          </span>
        </div>
      </Container>
    </footer>
  );
}
