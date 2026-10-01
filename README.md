# Zagroda.io — Landing Page

Strona startowa dla **Zagroda.io** — rozwijanego systemu opieki nad stadem bydła:
kamera w oborze wykrywa zdarzenie, czujnik na obroży wskazuje, której krowy dotyczy,
a hodowca dostaje powiadomienie na telefon. Strona komunikuje, że projekt jest
**w fazie rozwoju** (co działa dziś, a co jest w planach), zbiera odpowiedzi do
ankiety i kontakty przez formularz.

Inspiracje wizualne: [elevenlabs.io](https://elevenlabs.io/pl), [x.ai](https://x.ai/).
Marka i realizacja: [Exito Development](https://www.exito-development.pl/).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokeny w `app/globals.css`)
- **Three.js** + **@react-three/fiber** — interaktywna scena 3D w sekcji Hero
- **Framer Motion** — animacje wejścia przy scrollu
- **lucide-react** — ikony
- **qrcode** — kod QR do ankiety (generowany przy buildzie, bez JS po stronie klienta)

## Uruchomienie

```bash
npm install
npm run dev      # http://localhost:3000
```

Build produkcyjny:

```bash
npm run build && npm start
```

## Struktura

```
app/
  layout.tsx        # fonty, metadane SEO/OG
  page.tsx          # montaż sekcji
  globals.css       # design tokens marki Zagroda
  api/contact/route.ts  # odbiór formularza kontaktowego → e-mail (Resend)
components/
  Nav.tsx           # pasek „w fazie rozwoju” + nawigacja na całą szerokość okna
  Hero.tsx          # nagłówek + podgląd obory (wideo / scena 3D) + karta zdarzenia
  HeroScene.tsx     # Three.js (react-three-fiber) — pole, stado, skaner, alerty
  TrustStrip.tsx    # „Bierzemy na siebie całość…” — przewijany pasek
  Features.tsx      # co działa już dziś (6 kart)
  HowItWorks.tsx    # zasada działania: kamera + obroża → która krowa → alert
  Roadmap.tsx       # w rozwoju: aktywność, ruja, kulawizny, temperatura, upadek…
  PlatformShowcase.tsx  # zarządzanie stadem w platformie + przypomnienia
  Security.tsx      # obraz z kamer nie opuszcza obory
  Survey.tsx        # ankieta (+ kod QR) i etapy rozwoju projektu
  Faq.tsx           # pytania i odpowiedzi
  Contact.tsx, ContactForm.tsx  # formularz kontaktowy
  Footer.tsx, Logo.tsx, Reveal.tsx, AccentLines.tsx, primitives.tsx
lib/
  site.ts           # JEDNO miejsce na treści, linki, dane (edytuj tutaj)
  contact.ts        # wspólne typy/limity formularza (klient + serwer)
  cn.ts
public/
  icon.svg          # logo / favicon
```

## Najczęstsze edycje

- **Treści, linki, dane** → `lib/site.ts` (m.in. `appUrl`, `surveyUrl`, email, funkcje
  działające dziś, funkcje w planach, kroki zasady działania, etapy rozwoju, FAQ).
- **Link do ankiety** → `lib/site.ts` → `surveyUrl`. Dopóki jest pusty, przyciski
  „Wypełnij ankietę” prowadzą do formularza kontaktowego, a kod QR się nie pokazuje.
  Po wpisaniu linku QR pojawi się automatycznie w sekcji ankiety.
- **Kolory marki** → `app/globals.css` (sekcja `@theme`, zmienne `--color-brand` itd.).
- **Logo** → `components/Logo.tsx` oraz `public/icon.svg`.

## Hero: scena 3D vs prawdziwe wideo

Domyślnie Hero renderuje **interaktywną scenę Three.js** (pole z węzłami stada,
omiatający skaner i pulsujące alerty) — działa bez żadnych zewnętrznych plików.

Aby podmienić ją na **prawdziwy materiał wideo** (np. ujęcia z drona / obory):

1. Wrzuć plik do `public/hero.mp4` (oraz `public/hero-poster.jpg`).
2. W `components/Hero.tsx` zamień warstwę `<HeroScene />` na:

   ```tsx
   <video
     className="h-full w-full object-cover opacity-60"
     autoPlay muted loop playsInline
     poster="/hero-poster.jpg"
   >
     <source src="/hero.mp4" type="video/mp4" />
   </video>
   ```

Można też zostawić oba: wideo jako tło + scena 3D jako nakładka.

## Formularz kontaktowy

Formularz wysyła zgłoszenia na `POST /api/contact`, a ten — e-mailem przez
[Resend](https://resend.com). Zmienne środowiskowe (patrz `.env.example`):

| Zmienna | Opis |
| --- | --- |
| `RESEND_API_KEY` | klucz API Resend (wymagany do wysyłki) |
| `CONTACT_TO_EMAIL` | odbiorca zgłoszeń (domyślnie `kontakt@zagroda.io`) |
| `CONTACT_FROM_EMAIL` | nadawca w domenie zweryfikowanej w Resend (domyślnie `Zagroda.io <formularz@zagroda.io>`) |

Bez `RESEND_API_KEY` endpoint zwraca 503, a formularz proponuje wysłanie tej samej
wiadomości z poczty użytkownika (gotowy link `mailto:`) — nic nie ginie.
Endpoint wymaga serwera Next.js (np. Vercel); przy eksporcie statycznym działa tylko
wariant `mailto:`. Ochrona przed botami: ukryte pole-pułapka (honeypot).

## Linki produktowe

- Platforma (dev): https://app.dev.zagroda.io/
- Konfiguracja w `lib/site.ts` → `appUrl`.
