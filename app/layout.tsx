import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const display = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zagroda.io"),
  title: {
    default: "Zagroda.io — Opieka nad stadem przez całą dobę",
    template: "%s · Zagroda.io",
  },
  description: site.description,
  keywords: [
    "monitoring bydła",
    "kamery w oborze",
    "czujniki dla krów",
    "wykrywanie rui",
    "wykrywanie wycielenia",
    "alerty dla rolników",
    "opieka nad stadem",
    "Zagroda.io",
  ],
  authors: [{ name: site.company, url: site.companyUrl }],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://zagroda.io",
    title: "Zagroda.io — Rolnictwo nowej generacji",
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Zagroda.io — Rolnictwo nowej generacji",
    description: site.description,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
