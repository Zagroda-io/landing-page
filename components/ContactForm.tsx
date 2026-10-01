"use client";

import { useState } from "react";
import {
  ChevronDown,
  CircleCheck,
  LoaderCircle,
  Mail,
  Send,
} from "lucide-react";
import { contactTopics, herdSizes, site } from "@/lib/site";
import {
  contactSummary,
  validateContact,
  web3formsBody,
  type ContactErrors,
  type ContactPayload,
} from "@/lib/contact";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent" | "fallback";

const input =
  "w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-sm text-ink placeholder:text-faint transition focus:border-ink/40 focus:outline-none focus:ring-4 focus:ring-ink/5";
const invalidInput = "border-alert/60 focus:border-alert focus:ring-alert/10";

/** Order in which invalid fields get focus after a failed submit. */
const focusOrder = ["name", "email", "phone", "consent"] as const;

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <span id={id} className="text-xs text-alert">
      {children}
    </span>
  );
}

function Field({
  label,
  hint,
  error,
  errorId,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-ink/80">
        {label}
        {hint && <span className="font-normal text-faint"> · {hint}</span>}
      </span>
      {children}
      {errorId && <ErrorText id={errorId}>{error}</ErrorText>}
    </label>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<ContactErrors>({});

  /** aria + red border for a field that failed validation. */
  const invalid = (name: "name" | "email" | "phone", alsoWhen?: string) => {
    const bad = Boolean(errors[name] || alsoWhen);
    return {
      "aria-invalid": bad || undefined,
      "aria-describedby": bad
        ? errors[name]
          ? `${name}-error`
          : "contact-error"
        : undefined,
      className: cn(input, bad && invalidInput),
    };
  };

  // drop a field's message as soon as the user edits it
  function onChange(e: React.FormEvent<HTMLFormElement>) {
    const name = (e.target as HTMLInputElement).name;
    setErrors((prev) => {
      if (
        !prev[name as keyof ContactErrors] &&
        !(prev.contact && (name === "email" || name === "phone"))
      )
        return prev;
      const next = { ...prev };
      delete next[name as keyof ContactErrors];
      if (name === "email" || name === "phone") delete next.contact;
      return next;
    });
  }
  const [mailto, setMailto] = useState<string>(`mailto:${site.email}`);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const text = (k: string) => String(fd.get(k) ?? "").trim();

    const payload: ContactPayload = {
      name: text("name"),
      email: text("email"),
      phone: text("phone"),
      farm: text("farm"),
      herd: text("herd"),
      topic: text("topic"),
      message: text("message"),
      consent: fd.get("consent") === "on",
    };

    const found = validateContact(payload);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setError(null);
      const first = focusOrder.find(
        (k) => found[k] || (k === "email" && found.contact),
      );
      if (first)
        (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setError(null);
    setStatus("sending");

    const subject = `Kontakt ze strony: ${payload.topic || site.name}`;
    setMailto(
      `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(contactSummary(payload))}`,
    );

    // honeypot filled → a bot; look successful, send nothing
    if (text("website")) {
      form.reset();
      setStatus("sent");
      return;
    }

    try {
      const res = site.web3formsKey
        ? await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(web3formsBody(payload, site.web3formsKey)),
          })
        : await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
      const json = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        ok?: boolean;
      };
      if (res.ok && (json.success || json.ok)) {
        form.reset();
        setStatus("sent");
        return;
      }
      if (!site.web3formsKey && res.status === 400) {
        setError(
          "Sprawdź, czy wszystkie wymagane pola są poprawnie wypełnione.",
        );
        setStatus("idle");
        return;
      }
      setStatus("fallback");
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
          <CircleCheck className="h-7 w-7" strokeWidth={1.8} />
        </span>
        <h3
          className="text-xl font-semibold text-ink"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Dziękujemy! Wiadomość dotarła.
        </h3>
        <p className="max-w-sm text-sm text-muted">
          Odezwiemy się najszybciej, jak to możliwe.
        </p>
        <button
          type="button"
          onClick={() => {
            setErrors({});
            setStatus("idle");
          }}
          className="mt-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-bg-soft"
        >
          Dodaj kolejny kontakt
        </button>
      </div>
    );
  }

  return (
    // noValidate: browser bubbles follow the browser's language (often
    // English); we show our own Polish messages under the fields instead
    <form
      onSubmit={onSubmit}
      onChange={onChange}
      noValidate
      className="relative flex flex-col gap-5"
    >
      <Field label="Imię i nazwisko" error={errors.name} errorId="name-error">
        <input
          name="name"
          required
          maxLength={120}
          autoComplete="name"
          placeholder="Jan Kowalski"
          {...invalid("name")}
        />
      </Field>

      <div className="flex flex-col gap-1.5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="E-mail" error={errors.email} errorId="email-error">
            <input
              name="email"
              type="email"
              inputMode="email"
              maxLength={200}
              autoComplete="email"
              placeholder="jan@gospodarstwo.pl"
              {...invalid("email", errors.contact)}
            />
          </Field>
          <Field label="Telefon" error={errors.phone} errorId="phone-error">
            <input
              name="phone"
              type="tel"
              maxLength={40}
              autoComplete="tel"
              placeholder="600 000 000"
              {...invalid("phone", errors.contact)}
            />
          </Field>
        </div>
        {errors.contact ? (
          <ErrorText id="contact-error">{errors.contact}</ErrorText>
        ) : (
          <span className="text-xs text-faint">
            Wystarczy e-mail albo telefon.
          </span>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Gospodarstwo / miejscowość" hint="opcjonalnie">
          <input
            name="farm"
            maxLength={160}
            autoComplete="address-level2"
            placeholder="np. Łomża"
            className={input}
          />
        </Field>
        <Field label="Wielkość stada" hint="opcjonalnie">
          <div className="relative">
            <select
              name="herd"
              defaultValue=""
              className={cn(input, "appearance-none pr-10")}
            >
              <option value="">Wybierz…</option>
              {herdSizes.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          </div>
        </Field>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1.5 text-xs font-medium text-ink/80">
          W czym możemy pomóc?
        </legend>
        <div className="flex flex-wrap gap-2">
          {contactTopics.map((t, i) => (
            <label key={t} className="cursor-pointer">
              <input
                type="radio"
                name="topic"
                value={t}
                defaultChecked={i === 0}
                className="peer sr-only"
              />
              <span className="inline-flex rounded-full border border-line-strong px-3.5 py-2 text-xs font-medium text-muted transition-colors hover:border-ink/30 hover:text-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-ink/30 peer-focus-visible:ring-offset-2">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Wiadomość" hint="opcjonalnie">
        <textarea
          name="message"
          rows={4}
          maxLength={4000}
          placeholder="Napisz, czego potrzebujesz albo o co chcesz zapytać…"
          className={cn(input, "resize-y")}
        />
      </Field>

      {/* honeypot — hidden from people, irresistible to bots */}
      <div
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label>
          Strona www
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
          <input
            name="consent"
            type="checkbox"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0 rounded border-line-strong accent-[var(--color-brand-deep)]",
              errors.consent &&
                "outline outline-2 outline-offset-2 outline-alert/60",
            )}
          />
          Zgadzam się na kontakt ze strony zespołu Zagroda.io w sprawie mojego
          zgłoszenia. Dane z formularza wykorzystamy wyłącznie w tym celu.
        </label>
        <span className="pl-7">
          <ErrorText id="consent-error">{errors.consent}</ErrorText>
        </span>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl bg-alert/10 px-4 py-3 text-sm text-alert"
        >
          {error}
        </p>
      )}

      {status === "fallback" && (
        <div
          role="alert"
          className="rounded-xl border border-warn/30 bg-warn/10 px-4 py-3 text-sm text-ink/80"
        >
          Nie udało się wysłać formularza automatycznie. Kliknij poniżej, aby
          wysłać tę samą wiadomość z Twojej poczty.
          <a
            href={mailto}
            className="mt-2 flex w-fit items-center gap-1.5 font-medium text-ink underline underline-offset-4"
          >
            <Mail className="h-4 w-4" />
            Wyślij e-mailem na {site.email}
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-all hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Wysyłanie…
          </>
        ) : (
          <>
            Wyślij wiadomość
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
