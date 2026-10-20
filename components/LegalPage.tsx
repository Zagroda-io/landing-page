import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Container, Eyebrow } from "@/components/primitives";
import type { LegalBlock, LegalDocument } from "@/lib/legal";
import { legalDocuments } from "@/lib/legal";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const linkClass =
  "font-medium text-brand-deep underline decoration-brand/30 underline-offset-4 transition-colors hover:decoration-brand-deep";

/** `[etykieta](adres)` → link; adres e-mail kontaktowy → mailto. */
function RichText({ text }: { text: string }) {
  const parts = text.split(
    new RegExp(`(\\[[^\\]]+\\]\\([^)]+\\)|${site.email.replace(/\./g, "\\.")})`),
  );

  return (
    <>
      {parts.map((part, i) => {
        if (part === site.email) {
          return (
            <a key={i} href={`mailto:${site.email}`} className={linkClass}>
              {site.email}
            </a>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return (
            <Link key={i} href={link[2]} className={linkClass}>
              {link[1]}
            </Link>
          );
        }
        return part;
      })}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return (
      <p>
        <RichText text={block} />
      </p>
    );
  }
  return (
    <ul className="flex flex-col gap-2 pl-5 [&>li]:list-disc [&>li]:marker:text-faint">
      {block.list.map((item) => (
        <li key={item} className="pl-1">
          <RichText text={item} />
        </li>
      ))}
    </ul>
  );
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/** Wspólny układ podstron /regulamin i /polityka-prywatnosci. */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  const other = legalDocuments.find((d) => d.slug !== doc.slug);

  return (
    <div className="relative">
      <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-xl backdrop-saturate-150">
        <div className="flex h-16 w-full items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <Link href="/" className="shrink-0" aria-label="Zagroda.io — strona główna">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-bg-soft hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Strona główna
          </Link>
        </div>
      </header>

      <main className="bg-dots py-16 sm:py-24">
        <Container className="max-w-3xl">
          <div className="flex flex-col items-start gap-4">
            <Eyebrow>Dokumenty</Eyebrow>
            <h1
              className="text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {doc.title}
            </h1>
            <p className="text-sm text-faint">
              Ostatnia aktualizacja:{" "}
              <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
            </p>
            <p className="max-w-2xl text-pretty text-base text-muted sm:text-lg">
              {doc.intro}
            </p>
          </div>

          <nav
            aria-label="Spis treści"
            className="mt-10 rounded-2xl border border-line bg-bg-warm p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-faint">
              Spis treści
            </p>
            <ol className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="mt-12 flex flex-col gap-12">
            {doc.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24"
              >
                <h2
                  className="text-xl font-semibold tracking-tight text-ink sm:text-2xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {section.title}
                </h2>
                <div
                  className={cn(
                    "mt-4 flex flex-col gap-4 text-pretty text-[15px] leading-relaxed text-fg/85",
                  )}
                >
                  {section.body.map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </article>

          {other && (
            <div className="mt-16 flex flex-col gap-2 rounded-2xl border border-line bg-bg p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">
                Zobacz też: <span className="text-ink">{other.title.toLowerCase()}</span>
              </p>
              <Link href={`/${other.slug}`} className={cn(linkClass, "text-sm")}>
                Przejdź do dokumentu
              </Link>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}
