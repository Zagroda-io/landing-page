export const site = {
  name: "Zagroda.io",
  domain: "zagroda.io",
  tagline: "Rolnictwo nowej generacji",
  description:
    "Zagroda.io to rozwijany system opieki nad stadem bydła. Kamera w oborze wykrywa zdarzenie, czujnik na obroży wskazuje, której krowy dotyczy, a Ty dostajesz powiadomienie na telefon. Całym stadem zarządzasz z jednej platformy.",
  appUrl: "https://app.dev.zagroda.io/",
  appLabel: "Zaloguj się",
  /**
   * Link do ankiety (np. Google Forms, Tally, Microsoft Forms).
   * Dopóki jest pusty, przyciski „Wypełnij ankietę” prowadzą do formularza
   * kontaktowego, a kod QR w sekcji ankiety się nie wyświetla.
   */
  surveyUrl: "https://forms.gle/iAhgihQBxcrBpgzd6" as string,
  company: "Exito Development",
  companyUrl: "https://www.exito-development.pl/",
  email: "kontakt@zagroda.io",
  /**
   * Web3Forms access key — the contact form posts straight from the browser
   * to Web3Forms, which e-mails each submission to the address the key was
   * created for. The key is meant to be public (it only allows sending to
   * that one inbox). Empty = fall back to /api/contact (Resend).
   */
  web3formsKey: "7881cd33-ea31-4104-8c8b-5e3427c4e3b5" as string,
  /** Leave empty to hide the phone number in the footer. */
  phone: "" as string,
  address: ["Grądy 12", "18-414 Nowogród"],
} as const;

/** Where every "Wypełnij ankietę" button points. */
export const surveyHref = site.surveyUrl || "#kontakt";

export const nav = [
  { label: "Możliwości", href: "#produkt" },
  { label: "Jak to działa", href: "#jak-to-dziala" },
  { label: "W rozwoju", href: "#rozwoj" },
  { label: "Platforma", href: "#platforma" },
  { label: "Bezpieczeństwo", href: "#bezpieczenstwo" },
] as const;

export type Feature = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  tag?: string;
};

/** What already works today. */
export const features: Feature[] = [
  {
    id: "kamery",
    icon: "Eye",
    title: "Kamery, które patrzą za Ciebie",
    desc: "Kamery w oborze obserwują zwierzęta przez całą dobę i same wychwytują zdarzenia, które wymagają Twojej uwagi.",
    tag: "Kamery",
  },
  {
    id: "czujnik",
    icon: "Radio",
    title: "Czujnik na obroży",
    desc: "Każda krowa nosi czujnik na obroży. Dzięki niemu system wie, której sztuki dotyczy zdarzenie wykryte przez kamerę.",
    tag: "Obroża",
  },
  {
    id: "bez-internetu",
    icon: "WifiOff",
    title: "Zbiera dane bez internetu",
    desc: "Kamery i czujniki pracują dalej, nawet gdy nie ma łącza. Internet jest potrzebny, by powiadomienia trafiały na telefon i do aplikacji webowej.",
    tag: "Lokalnie",
  },
  {
    id: "alerty",
    icon: "BellRing",
    title: "Alert od razu na telefon",
    desc: "Gdy system wykryje zdarzenie, dostajesz powiadomienie z numerem krowy i krótkim nagraniem z obory.",
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

export type Step = {
  n: string;
  title: string;
  desc: string;
};

/** Operating principle: camera + collar sensor → which cow → alert. */
export const steps: Step[] = [
  {
    n: "01",
    title: "Kamera wykrywa zdarzenie",
    desc: "Kamery w oborze obserwują stado przez całą dobę i wychwytują sytuacje, które odbiegają od normy.",
  },
  {
    n: "02",
    title: "Czujnik rejestruje to samo zdarzenie",
    desc: "W tym samym momencie czujnik na obroży zapisuje ruch krowy, która go nosi.",
  },
  {
    n: "03",
    title: "System wskazuje, która to krowa",
    desc: "Zagroda łączy obraz z kamery z danymi z obroży i przypisuje zdarzenie do konkretnej sztuki.",
  },
  {
    n: "04",
    title: "Dostajesz powiadomienie",
    desc: "Alert z numerem krowy i krótkim nagraniem trafia na Twój telefon i do aplikacji webowej.",
  },
];

export type PlannedFeature = {
  id: string;
  icon: string;
  title: string;
  desc: string;
};

/** What we are building next (shown under "W rozwoju"). */
export const planned: PlannedFeature[] = [
  {
    id: "ruja",
    icon: "Heart",
    title: "Wykrywanie rui",
    desc: "Wychwycenie rui na podstawie zmian w zachowaniu krowy, żeby nie przegapić terminu inseminacji.",
  },
  {
    id: "kulawizny",
    icon: "Footprints",
    title: "Kulawizny",
    desc: "Wczesne wychwycenie problemów z chodzeniem — zanim spadnie mleczność i kondycja.",
  },
  {
    id: "temperatura",
    icon: "Thermometer",
    title: "Temperatura ciała",
    desc: "Analiza temperatury krowy skorygowana o temperaturę otoczenia, więc upał w oborze nie wywoła fałszywego alarmu.",
  },
  {
    id: "upadek",
    icon: "TriangleAlert",
    title: "Upadek",
    desc: "Natychmiastowy alert o najwyższej wadze, gdy krowa się przewróci.",
  },
  {
    id: "zdarzenia-losowe",
    icon: "Zap",
    title: "Zdarzenia losowe",
    desc: "Nietypowe sytuacje w oborze, np. przepychanki w grupie albo krowa, która zbyt długo nie wstaje.",
  },
  {
    id: "zgubienie-czujnika",
    icon: "MapPinOff",
    title: "Zgubienie czujnika",
    desc: "Powiadomienie, gdy obroża z czujnikiem spadnie albo przestanie przesyłać dane.",
  },
];

/** Example 24 h activity split used in the "W rozwoju" visual (sums to 24). */
export const activityDay = [
  { label: "Spożywanie pokarmu", hours: 4.5, color: "bg-brand" },
  { label: "Przeżuwa", hours: 8, color: "bg-[#7fb48f]" },
  { label: "Śpi i odpoczywa", hours: 9.5, color: "bg-[#c9dcc8]" },
  { label: "Chodzi", hours: 2, color: "bg-warn" },
] as const;

export const herdManagement = [
  "Karta każdej krowy — zdarzenia, leczenia, inseminacje, wycielenia i notatki",
  "Automatyczne przypomnienia o proponowanym terminie zasuszenia, zapłodnienia i innych zabiegach",
  "Wszystkie alerty z obory w jednym miejscu — z numerem krowy i nagraniem",
  "Dostęp z telefonu i z komputera, bez instalowania programów",
] as const;

export const roadmap = [
  {
    status: "done",
    label: "Gotowe",
    title: "Fundament systemu",
    desc: "Kamery, czujnik na obroży, powiadomienia na telefon i podgląd na komputerze.",
  },
  {
    status: "now",
    label: "Teraz",
    title: "Rozwój i testy",
    desc: "Dopracowujemy system i zbieramy opinie hodowców — także Twoją.",
  },
  {
    status: "next",
    label: "Dalej",
    title: "Zdrowie i zachowanie krowy",
    desc: "Aktywność, ruja, kulawizny, temperatura i pełne zarządzanie stadem w platformie.",
  },
] as const;

export const faq = [
  {
    q: "Czy Zagroda działa bez internetu?",
    a: "Częściowo tak. Kamery i czujniki obserwują stado i zbierają dane na miejscu, nawet gdy nie ma łącza. Internet jest potrzebny, żeby powiadomienia trafiały na Twój telefon i do aplikacji webowej.",
  },
  {
    q: "Czy nagrania z obory trafiają do internetu?",
    a: "Nie. Obraz z kamer jest analizowany na miejscu i nigdy nie opuszcza obory. Do aplikacji trafiają wyłącznie krótkie urywki konkretnych zdarzeń.",
  },
  {
    q: "Skąd system wie, której krowy dotyczy zdarzenie?",
    a: "Kamera wykrywa zdarzenie, a czujnik na obroży w tym samym momencie rejestruje ruch krowy, która go nosi. Zagroda łączy te dwie informacje i wskazuje konkretną sztukę.",
  },
  {
    q: "Jaki czujnik nosi krowa?",
    a: "Na tym etapie jeden czujnik zamocowany na obroży krowy. To on pozwala przypisać każde zdarzenie do właściwej sztuki.",
  },
  {
    q: "Czy każda krowa jest oceniana tak samo?",
    a: "Nie. System będzie uczył się każdej krowy osobno — jej rytmu dnia, aktywności i temperatury — i zareaguje, gdy coś odbiega od jej własnej normy, a nie od średniej dla stada.",
  },
  {
    q: "Czy całym stadem mogę zarządzać w aplikacji?",
    a: "Tak. Zarządzanie stadem może w pełni odbywać się z poziomu platformy: karta każdej krowy, historia, leczenia oraz automatyczne przypomnienia o terminie zasuszenia, zapłodnienia i innych zabiegach.",
  },
  {
    q: "Kiedy Zagroda będzie dostępna?",
    a: "Projekt jest w fazie rozwoju. Jeśli chcesz być na bieżąco albo przetestować system u siebie, wypełnij ankietę lub zostaw kontakt — odezwiemy się.",
  },
] as const;

export const contactTopics = [
  "Chcę dowiedzieć się więcej",
  "Chcę przetestować Zagrodę u siebie",
  "Współpraca lub inwestycja",
  "Inne",
] as const;

export const herdSizes = [
  "do 50 krów",
  "50–100 krów",
  "100–300 krów",
  "ponad 300 krów",
] as const;

export const trustPoints = [
  "Montaż w Twoim gospodarstwie",
  "Sprzęt w komplecie",
  "Czujnik na obroży",
  "Zbiera dane bez internetu",
  "Obraz z kamer zostaje w oborze",
  "Analiza dla każdej krowy osobno",
  "Rozwijane razem z hodowcami",
];
