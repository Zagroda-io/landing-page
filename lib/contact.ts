/** Shared by the contact form (client) and /api/contact (server). */

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  farm: string;
  herd: string;
  topic: string;
  message: string;
  consent: boolean;
};

export const contactLimits = {
  name: 120,
  email: 200,
  phone: 40,
  farm: 160,
  herd: 40,
  topic: 80,
  message: 4000,
} as const;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Digits, spaces, +, -, ( ) — and 9 to 15 digits in total. */
const PHONE_CHARS_RE = /^[+\d\s()-]+$/;

export type ContactErrors = Partial<
  Record<"name" | "email" | "phone" | "contact" | "consent", string>
>;

/** Same rules on the client (inline messages) and the server (400). */
export function validateContact(p: ContactPayload): ContactErrors {
  const e: ContactErrors = {};
  if (p.name.length < 2) e.name = "Podaj imię i nazwisko.";
  if (p.email && !EMAIL_RE.test(p.email))
    e.email = "Sprawdź adres e-mail, np. jan@gospodarstwo.pl.";
  if (p.phone) {
    const digits = p.phone.replace(/\D/g, "").length;
    if (!PHONE_CHARS_RE.test(p.phone) || digits < 9 || digits > 15)
      e.phone = "Sprawdź numer telefonu, np. 600 000 000.";
  }
  if (!p.email && !p.phone)
    e.contact = "Podaj e-mail albo numer telefonu, żebyśmy mogli się odezwać.";
  if (!p.consent)
    e.consent = "Zaznacz zgodę, żebyśmy mogli się z Tobą skontaktować.";
  return e;
}

/** Plain-text summary used as the e-mail body (and the mailto fallback). */
export function contactSummary(p: ContactPayload) {
  const lines = [
    `Imię i nazwisko: ${p.name}`,
    p.email ? `E-mail: ${p.email}` : null,
    p.phone ? `Telefon: ${p.phone}` : null,
    p.farm ? `Gospodarstwo / miejscowość: ${p.farm}` : null,
    p.herd ? `Wielkość stada: ${p.herd}` : null,
    p.topic ? `Temat: ${p.topic}` : null,
    "",
    p.message || "(brak wiadomości)",
  ];
  return lines.filter((l) => l !== null).join("\n");
}
