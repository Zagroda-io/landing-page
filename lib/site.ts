export const site = {
  name: "Zagroda.io",
  domain: "zagroda.io",
  tagline: "Rolnictwo nowej generacji",
  description:
    "Zagroda czuwa nad Twoim stadem dzień i noc. Kamery i czujniki same rozpoznają ruję, wycielenie, kulawiznę czy upadek i od razu dają znać na telefon — z krótkim nagraniem.",
  appUrl: "https://app.dev.zagroda.io/",
  appLabel: "Zaloguj się",
  demoUrl: "mailto:kontakt@zagroda.io?subject=Demo%20Zagroda.io",
  company: "Exito Development",
  companyUrl: "https://www.exito-development.pl/",
  email: "kontakt@zagroda.io",
} as const;

export const nav = [
  { label: "Co potrafi", href: "#produkt" },
  { label: "Jak to działa", href: "#jak-to-dziala" },
  { label: "Co wykrywa", href: "#wykrywanie" },
  { label: "Aplikacja", href: "#platforma" },
  { label: "Dlaczego Zagroda", href: "#technologia" },
] as const;

export const stats = [
  { value: "24/7", label: "Czuwamy nad stadem dzień i noc" },
  { value: "< 1 min", label: "Tyle zajmuje powiadomienie o zdarzeniu" },
  { value: "10 s", label: "Nagranie dołączone do każdego alertu" },
  { value: "95%", label: "Skuteczność w rozpoznawaniu ważnych sytuacji" },
] as const;

export type Feature = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  tag?: string;
};

export const features: Feature[] = [
  {
    id: "kamery",
    icon: "Eye",
    title: "Kamery, które patrzą za Ciebie",
    desc: "Kamery w oborze obserwują zwierzęta przez całą dobę i same rozpoznają, kiedy dzieje się coś ważnego.",
    tag: "Kamery",
  },
  {
    id: "czujniki",
    icon: "Radio",
    title: "Czujniki na kolczyku i obroży",
    desc: "Małe czujniki śledzą ruch i kondycję każdej sztuki — od razu widać, która krowa odstaje od reszty.",
    tag: "Czujniki",
  },
  {
    id: "bez-internetu",
    icon: "WifiOff",
    title: "Działa nawet bez internetu",
    desc: "Wszystko liczy się na miejscu, w oborze. Chwilowy brak zasięgu czy łącza nie sprawi, że coś Ci umknie.",
    tag: "Bez internetu",
  },
  {
    id: "alerty",
    icon: "BellRing",
    title: "Alert od razu na telefon",
    desc: "Ruja, wycielenie, kulawizna czy upadek — dostajesz powiadomienie z krótkim nagraniem w mniej niż minutę.",
    tag: "Na żywo",
  },
  {
    id: "telefon",
    icon: "Smartphone",
    title: "Całe stado w telefonie",
    desc: "Aplikacja na telefon z Androidem i iPhone. Podgląd stada, historia i powiadomienia zawsze pod ręką — także w polu.",
    tag: "Telefon",
  },
  {
    id: "komputer",
    icon: "Monitor",
    title: "Wygodny podgląd na komputerze",
    desc: "Przejrzysty panel z kartą każdego zwierzęcia, historią i powiadomieniami. Niczego nie trzeba instalować.",
    tag: "Komputer",
  },
];

export type DetectionEvent = {
  title: string;
  desc: string;
  severity: "alert" | "warn" | "ok";
};

export const detections: DetectionEvent[] = [
  {
    title: "Ruja",
    desc: "Rozpozna ruję we właściwym momencie, żebyś nie przegapił terminu krycia.",
    severity: "ok",
  },
  {
    title: "Wycielenie",
    desc: "Da znać, gdy zbliża się poród — pomoc w porę ratuje cielę i krowę.",
    severity: "warn",
  },
  {
    title: "Kulawizna",
    desc: "Wychwyci problem z nogami wcześnie, zanim krowa zacznie chudnąć i spadnie mleczność.",
    severity: "warn",
  },
  {
    title: "Walka i przepychanki",
    desc: "Niebezpieczne starcia w grupie zauważy od razu, zanim dojdzie do urazu.",
    severity: "alert",
  },
  {
    title: "Upadek",
    desc: "Nagły upadek zwierzęcia to natychmiastowy alert o najwyższej wadze.",
    severity: "alert",
  },
  {
    title: "Krowa, która nie wstaje",
    desc: "Sztukę, która leży zbyt długo, oznaczy do szybkiego sprawdzenia.",
    severity: "alert",
  },
];

export type Step = {
  n: string;
  title: string;
  desc: string;
};

export const steps: Step[] = [
  {
    n: "01",
    title: "Kamery i czujniki obserwują stado",
    desc: "Przez całą dobę zbierają obraz i informacje o każdym zwierzęciu — Ty nie musisz przy tym być.",
  },
  {
    n: "02",
    title: "Zagroda rozpoznaje, co się dzieje",
    desc: "Sama zauważa ważne sytuacje i nagrywa krótki filmik z miejsca zdarzenia.",
  },
  {
    n: "03",
    title: "Dostajesz powiadomienie",
    desc: "W mniej niż minutę alert z nagraniem trafia na Twój telefon i komputer.",
  },
  {
    n: "04",
    title: "Reagujesz w porę",
    desc: "Wiesz, do której sztuki iść i z czym — zanim zrobi się poważny problem.",
  },
];

export const trustPoints = [
  "Montaż u Ciebie w gospodarstwie",
  "Pomoc po polsku",
  "Sprzęt w komplecie",
  "Działa bez internetu",
  "Aktualizacje w cenie",
  "Bez ukrytych kosztów",
  "Wsparcie 7 dni w tygodniu",
];
