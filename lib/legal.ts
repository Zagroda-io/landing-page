import { site } from "@/lib/site";

/**
 * Treść dokumentów prawnych (/regulamin, /polityka-prywatnosci).
 * W tekście działa składnia linków `[etykieta](adres)`; adres e-mail
 * kontaktowy zamienia się w link automatycznie.
 *
 * Przed publikacją: uzupełnić dane rejestrowe firmy (TODO poniżej)
 * i dać oba dokumenty do przejrzenia prawnikowi.
 */

/** TODO: forma prawna, NIP i REGON (albo KRS) Exito Development. */
const operatorIds = "NIP: [do uzupełnienia], REGON: [do uzupełnienia]";
const operator = `${site.company}, ${site.address.join(", ")}`;

export type LegalBlock = string | { list: string[] };

export type LegalSection = {
  id: string;
  title: string;
  body: LegalBlock[];
};

export type LegalDocument = {
  slug: string;
  title: string;
  /** Opis strony w wynikach wyszukiwania. */
  description: string;
  /** Data ostatniej zmiany, ISO. */
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export const terms: LegalDocument = {
  slug: "regulamin",
  title: "Regulamin",
  description:
    "Zasady korzystania z serwisu Zagroda.io, platformy webowej i aplikacji mobilnej Zagroda.",
  updated: "2026-10-20",
  intro:
    "Regulamin opisuje, na jakich zasadach możesz korzystać ze strony Zagroda.io, platformy webowej i aplikacji mobilnej Zagroda. Zagroda jest w fazie rozwoju, dlatego część funkcji działa w wersji testowej.",
  sections: [
    {
      id: "postanowienia-ogolne",
      title: "1. Postanowienia ogólne",
      body: [
        `Usługi opisane w regulaminie świadczy ${operator}, ${operatorIds} (dalej: „Usługodawca”, „my”).`,
        `Z Usługodawcą skontaktujesz się pod adresem e-mail ${site.email} albo listownie na adres podany wyżej.`,
        "Regulamin jest regulaminem, o którym mowa w art. 8 ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną. Udostępniamy go bezpłatnie na stronie zagroda.io/regulamin, w formie, która pozwala go pobrać, zapisać i wydrukować.",
      ],
    },
    {
      id: "definicje",
      title: "2. Definicje",
      body: [
        {
          list: [
            "Serwis — strona internetowa zagroda.io.",
            "Platforma — aplikacja webowa Zagroda dostępna w przeglądarce.",
            "Aplikacja — aplikacja mobilna Zagroda na telefony i tablety z systemem Android lub iOS.",
            "Urządzenia — kamery montowane w oborze, czujniki na obrożach i urządzenie, które łączy je z Platformą.",
            "Konto — indywidualne konto Użytkownika w Platformie i Aplikacji.",
            "Gospodarstwo — gospodarstwo rolne, którego stado Użytkownik prowadzi w Platformie lub Aplikacji.",
            "Użytkownik — osoba, która korzysta z Serwisu, Platformy lub Aplikacji.",
            "Usługi — usługi świadczone drogą elektroniczną opisane w punkcie 3.",
          ],
        },
      ],
    },
    {
      id: "uslugi",
      title: "3. Jakie usługi świadczymy",
      body: [
        {
          list: [
            "udostępnianie treści Serwisu,",
            "formularz kontaktowy w Serwisie,",
            "prowadzenie Konta,",
            "prowadzenie ewidencji stada: karty zwierząt, zdarzenia, leczenia, inseminacje, wycielenia i notatki,",
            "powiadomienia o zdarzeniach wykrytych przez Urządzenia, z numerem zwierzęcia i krótkim nagraniem z obory,",
            "przypomnienia o terminach zabiegów, np. zasuszenia czy inseminacji.",
          ],
        },
        "Zagroda jest w fazie rozwoju. Zakres funkcji może się zmieniać, a niektóre z nich mogą być czasowo niedostępne, gdy je ulepszamy. O istotnych zmianach informujemy w Platformie, w Aplikacji albo e-mailem.",
        "Umowa o prowadzenie Konta jest zawierana na czas nieokreślony z chwilą potwierdzenia adresu e-mail. Umowa o korzystanie z formularza kontaktowego jest zawierana na czas jednego zgłoszenia.",
      ],
    },
    {
      id: "wymagania-techniczne",
      title: "4. Wymagania techniczne",
      body: [
        {
          list: [
            "urządzenie z dostępem do internetu,",
            "aktualna wersja przeglądarki — dla Serwisu i Platformy,",
            "telefon lub tablet z aktualną wersją systemu Android albo iOS — dla Aplikacji,",
            "aktywny adres e-mail — do założenia Konta,",
            "zgoda na powiadomienia w telefonie — aby alerty docierały na bieżąco.",
          ],
        },
        "Urządzenia w oborze zbierają dane także bez internetu. Żeby powiadomienia trafiały na telefon i do Platformy, potrzebne jest połączenie z internetem w gospodarstwie.",
      ],
    },
    {
      id: "konto",
      title: "5. Konto",
      body: [
        "Aby założyć Konto, podajesz imię i nazwisko, adres e-mail i hasło. Numer telefonu jest opcjonalny — służy do zapasowych SMS-ów przy alercie krytycznym.",
        "Po rejestracji wysyłamy na Twój adres e-mail link aktywacyjny. Konto, którego nie potwierdzisz w ciągu 24 godzin, usuwamy automatycznie.",
        "Konto jest osobiste. Nie udostępniaj innym hasła — jeśli inne osoby pracują przy stadzie, powinny mieć własne konta.",
        "Odpowiadasz za prawdziwość danych, które wpisujesz do Konta i ewidencji stada.",
      ],
    },
    {
      id: "zasady",
      title: "6. Zasady korzystania",
      body: [
        "Korzystając z Usług, nie wolno:",
        {
          list: [
            "wprowadzać treści sprzecznych z prawem,",
            "zakłócać działania Serwisu, Platformy, Aplikacji ani Urządzeń,",
            "próbować uzyskać dostępu do cudzych kont lub danych,",
            "korzystać z Usług w sposób, który narusza prawa innych osób.",
          ],
        },
        "Dane o stadzie, które wprowadzasz lub które zbierają Urządzenia w Twoim Gospodarstwie, należą do Ciebie. Wykorzystujemy je, żeby świadczyć Usługi i je ulepszać — szczegóły opisuje [polityka prywatności](/polityka-prywatnosci).",
      ],
    },
    {
      id: "alerty",
      title: "7. Alerty i odpowiedzialność",
      body: [
        "Zagroda wspiera obserwację stada, ale nie zastępuje Twojej opieki nad zwierzętami ani lekarza weterynarii. System może nie wykryć każdego zdarzenia albo zgłosić zdarzenie, które nie wymaga reakcji.",
        "Decyzje o leczeniu i postępowaniu ze zwierzętami podejmujesz Ty lub lekarz weterynarii.",
        "Nie odpowiadamy za przerwy w działaniu wynikające z braku internetu lub zasilania w Gospodarstwie, awarii u operatorów telekomunikacyjnych ani działania siły wyższej.",
        "Ograniczenia odpowiedzialności nie dotyczą szkód wyrządzonych umyślnie ani praw, których nie można wyłączyć wobec konsumentów.",
      ],
    },
    {
      id: "oplaty",
      title: "8. Opłaty",
      body: [
        "Korzystanie z Serwisu i formularza kontaktowego jest bezpłatne. Jeśli korzystanie z Platformy, Aplikacji lub Urządzeń wymaga opłaty, jej wysokość i warunki — w tym dostawę i montaż Urządzeń — określa odrębna umowa zawierana przed rozpoczęciem świadczenia.",
      ],
    },
    {
      id: "reklamacje",
      title: "9. Reklamacje",
      body: [
        `Reklamację możesz złożyć e-mailem na adres ${site.email} albo listownie. Opisz w niej problem i podaj adres e-mail powiązany z Kontem.`,
        "Odpowiemy w ciągu 14 dni od otrzymania reklamacji, na adres, z którego ją wysłano.",
      ],
    },
    {
      id: "usuniecie-konta",
      title: "10. Usunięcie Konta",
      body: [
        `Możesz w każdej chwili zrezygnować z Konta i usunąć je — wystarczy wiadomość na adres ${site.email} wysłana z adresu powiązanego z Kontem.`,
        "Możemy zablokować Konto, jeśli korzystasz z Usług niezgodnie z regulaminem — po wcześniejszym wezwaniu do zaprzestania naruszeń, chyba że naruszenie jest rażące albo zagraża bezpieczeństwu innych Użytkowników.",
      ],
    },
    {
      id: "dane-osobowe",
      title: "11. Dane osobowe",
      body: [
        "Administratorem danych osobowych Użytkowników jest Usługodawca. Zasady przetwarzania danych opisuje [polityka prywatności](/polityka-prywatnosci).",
      ],
    },
    {
      id: "postanowienia-koncowe",
      title: "12. Postanowienia końcowe",
      body: [
        "Regulamin możemy zmienić z ważnych powodów, np. zmiany przepisów albo zakresu Usług. O zmianach informujemy e-mailem co najmniej 14 dni przed ich wejściem w życie. Jeśli nie akceptujesz zmian, możesz usunąć Konto przed tym terminem.",
        "W sprawach nieuregulowanych stosuje się prawo polskie. Postanowienia regulaminu nie ograniczają praw konsumentów i osób fizycznych prowadzących działalność na prawach konsumenta, które przysługują im z mocy przepisów.",
      ],
    },
  ],
};

export const privacy: LegalDocument = {
  slug: "polityka-prywatnosci",
  title: "Polityka prywatności",
  description:
    "Jak Zagroda.io przetwarza dane osobowe użytkowników strony, platformy i aplikacji mobilnej.",
  updated: "2026-10-20",
  intro:
    "Dbamy o to, żeby zbierać tylko te dane, które są potrzebne do działania Zagrody. Poniżej opisujemy, jakie dane przetwarzamy, po co, jak długo i jakie masz prawa.",
  sections: [
    {
      id: "administrator",
      title: "1. Administrator danych",
      body: [
        `Administratorem Twoich danych osobowych jest ${operator}, ${operatorIds}.`,
        `We wszystkich sprawach dotyczących danych osobowych napisz na adres ${site.email}.`,
      ],
    },
    {
      id: "jakie-dane",
      title: "2. Jakie dane przetwarzamy",
      body: [
        {
          list: [
            "Konto: imię i nazwisko, adres e-mail, hasło (przechowujemy wyłącznie jego zaszyfrowany skrót), opcjonalnie numer telefonu.",
            "Gospodarstwo i stado: dane gospodarstwa, dane zwierząt (np. numery kolczyków), zdarzenia, leczenia, inseminacje, wycielenia, notatki oraz dane z czujników na obrożach.",
            "Nagrania: krótkie urywki z kamer dotyczące wykrytych zdarzeń. Obraz z kamer jest analizowany na miejscu, w oborze — do Platformy trafiają tylko urywki konkretnych zdarzeń.",
            "Formularz kontaktowy: imię i nazwisko, adres e-mail lub numer telefonu, a jeśli je podasz — gospodarstwo lub miejscowość, wielkość stada, temat i treść wiadomości.",
            "Dane techniczne: adres IP, informacje o urządzeniu i przeglądarce, historia logowań (data i wynik) oraz dane potrzebne do wysyłania powiadomień na telefon.",
          ],
        },
        "Nagrania z obory mogą przypadkowo obejmować wizerunek osób, które w niej przebywają. Jeśli w oborze pracują inne osoby, poinformuj je o kamerach.",
      ],
    },
    {
      id: "cele",
      title: "3. Cele i podstawy prawne",
      body: [
        {
          list: [
            "Założenie i prowadzenie Konta oraz świadczenie usług Platformy i Aplikacji — art. 6 ust. 1 lit. b RODO (wykonanie umowy).",
            "Odpowiedź na zgłoszenie z formularza kontaktowego — art. 6 ust. 1 lit. a RODO (Twoja zgoda wyrażona w formularzu).",
            "Bezpieczeństwo Kont i systemu, w tym rejestrowanie logowań — art. 6 ust. 1 lit. f RODO (nasz prawnie uzasadniony interes).",
            "Ulepszanie Zagrody na podstawie zbiorczych, zanonimizowanych statystyk — art. 6 ust. 1 lit. f RODO.",
            "Rozpatrywanie reklamacji oraz ustalenie, dochodzenie i obrona roszczeń — art. 6 ust. 1 lit. f RODO.",
            "Wypełnianie obowiązków prawnych, np. podatkowych, gdy usługi są płatne — art. 6 ust. 1 lit. c RODO.",
          ],
        },
      ],
    },
    {
      id: "odbiorcy",
      title: "4. Komu przekazujemy dane",
      body: [
        "Nie sprzedajemy danych. Przekazujemy je wyłącznie podmiotom, które pomagają nam świadczyć usługi i działają na nasze polecenie:",
        {
          list: [
            "dostawcy serwerów i infrastruktury chmurowej, na której działa Platforma,",
            "dostawcom poczty e-mail i SMS — do wysyłania linków aktywacyjnych, kodów i powiadomień,",
            "Apple i Google — do dostarczania powiadomień na telefon,",
            "Web3Forms — do dostarczania wiadomości z formularza kontaktowego na naszą skrzynkę,",
            "Google — gdy wypełniasz ankietę dla hodowców w Formularzach Google.",
          ],
        },
        "Dane możemy też przekazać organom publicznym, gdy wymaga tego prawo.",
      ],
    },
    {
      id: "poza-eog",
      title: "5. Przekazywanie danych poza EOG",
      body: [
        "Niektórzy z dostawców, np. Web3Forms, Apple i Google, mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym. W takich przypadkach korzystamy z mechanizmów przewidzianych w RODO — decyzji Komisji Europejskiej stwierdzającej odpowiedni stopień ochrony danych albo standardowych klauzul umownych.",
      ],
    },
    {
      id: "okres",
      title: "6. Jak długo przechowujemy dane",
      body: [
        {
          list: [
            "Konto i dane stada — do czasu usunięcia Konta, a potem przez okres przedawnienia ewentualnych roszczeń.",
            "Konto, którego adresu e-mail nie potwierdzono — usuwamy automatycznie po 24 godzinach.",
            "Sesja logowania w Aplikacji — wygasa najpóźniej po 30 dniach bez użycia.",
            "Zgłoszenia z formularza kontaktowego — do zakończenia sprawy, nie dłużej niż 12 miesięcy od ostatniego kontaktu, chyba że wcześniej cofniesz zgodę.",
            "Dane techniczne i historia logowań — do 12 miesięcy.",
          ],
        },
      ],
    },
    {
      id: "prawa",
      title: "7. Twoje prawa",
      body: [
        "Masz prawo:",
        {
          list: [
            "uzyskać dostęp do swoich danych i otrzymać ich kopię,",
            "sprostować dane,",
            "żądać usunięcia danych,",
            "żądać ograniczenia przetwarzania,",
            "przenieść dane do innego administratora,",
            "wnieść sprzeciw wobec przetwarzania opartego na naszym uzasadnionym interesie,",
            "w każdej chwili cofnąć zgodę — bez wpływu na zgodność z prawem przetwarzania przed jej cofnięciem.",
          ],
        },
        `Aby skorzystać z tych praw, napisz na adres ${site.email}. Masz też prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).`,
      ],
    },
    {
      id: "dobrowolnosc",
      title: "8. Czy musisz podać dane",
      body: [
        "Podanie danych jest dobrowolne, ale bez imienia i nazwiska, adresu e-mail i hasła nie założysz Konta, a bez danych kontaktowych nie odpowiemy na zgłoszenie z formularza.",
      ],
    },
    {
      id: "decyzje",
      title: "9. Zautomatyzowana analiza",
      body: [
        "Zagroda automatycznie analizuje zachowanie i stan zwierząt, żeby wykrywać zdarzenia w oborze. Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, które wywoływałyby skutki prawne lub w podobny sposób istotnie na Ciebie wpływały.",
      ],
    },
    {
      id: "bezpieczenstwo",
      title: "10. Bezpieczeństwo",
      body: [
        {
          list: [
            "Połączenia z Platformą i Aplikacją są szyfrowane.",
            "Hasła przechowujemy wyłącznie w postaci zaszyfrowanego skrótu.",
            "Aplikacja przechowuje dane logowania w bezpiecznym magazynie systemu (Keychain w iOS, Keystore w Androidzie).",
            "Obraz z kamer jest analizowany na miejscu i nie opuszcza obory — do Platformy trafiają tylko urywki zdarzeń.",
          ],
        },
      ],
    },
    {
      id: "cookies",
      title: "11. Pliki cookies i pamięć urządzenia",
      body: [
        "Strona zagroda.io nie używa plików cookies analitycznych ani reklamowych.",
        "Platforma i Aplikacja zapisują na Twoim urządzeniu tylko dane niezbędne do działania, np. dane sesji logowania i informację, że ekran powitalny był już wyświetlony. Bez nich logowanie by nie działało.",
      ],
    },
    {
      id: "zmiany",
      title: "12. Zmiany polityki prywatności",
      body: [
        "Politykę prywatności aktualizujemy, gdy zmieniają się przepisy albo sposób działania Zagrody. Datę ostatniej zmiany znajdziesz na górze tej strony. O istotnych zmianach poinformujemy użytkowników Kont e-mailem.",
      ],
    },
  ],
};

export const legalDocuments = [terms, privacy] as const;
