# Zagroda.io — Landing Page

Strona startowa dla **Zagroda.io** — inteligentnego monitoringu bydła opartego na AI
(kamery + czujniki IoT + edge AI + chmura SaaS).

Inspiracje wizualne: [elevenlabs.io](https://elevenlabs.io/pl), [x.ai](https://x.ai/).
Marka i realizacja: [Exito Development](https://www.exito-development.pl/).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokeny w `app/globals.css`)
- **Three.js** + **@react-three/fiber** — interaktywna scena 3D w sekcji Hero
- **Framer Motion** — animacje wejścia przy scrollu
- **lucide-react** — ikony

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
components/
  Hero.tsx          # nagłówek + scena 3D + karta alertu
  HeroScene.tsx     # Three.js (react-three-fiber) — pole, stado, skaner, alerty
  Nav.tsx           # sticky nav + menu mobilne
  Features.tsx      # 6 filarów produktu (bento)
  HowItWorks.tsx    # pipeline edge → chmura → telefon
  Detections.tsx    # typy zdarzeń AI (HEAT, CALVING, LAMENESS, FIGHT, FALL, DOWN_COW)
  PlatformShowcase.tsx  # makieta panelu + telefonu, CTA do platformy
  Technology.tsx    # architektura edge-first
  Stats.tsx, CTA.tsx, Footer.tsx, Logo.tsx, Reveal.tsx, primitives.tsx
lib/
  site.ts           # JEDNO miejsce na treści, linki, dane (edytuj tutaj)
  cn.ts
public/
  icon.svg          # logo / favicon
```

## Najczęstsze edycje

- **Treści, linki, dane** → `lib/site.ts` (m.in. `appUrl`, `demoUrl`, email, lista funkcji,
  typy zdarzeń, kroki pipeline'u, metryki).
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

## Linki produktowe

- Platforma (dev): https://app.dev.zagroda.io/
- Konfiguracja w `lib/site.ts` → `appUrl`.
