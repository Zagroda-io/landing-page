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
