import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import LessonNav from '../../components/LessonNav';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Lesson05() {
  usePageTitle('Lekcja 05 — Podstawy sieci');

  return (
    <div>
      <PageHeader
        title="Lekcja 05 — Podstawy sieci"
        subtitle="Adresy IP, porty i diagnostyka problemów sieciowych"
        color="var(--c-blue)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Dla kogo jest ta lekcja?">
          <p className="text-sm mb-3">Ten kurs jest dla Ciebie, jeśli:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>Jesteś programistą tworzącym nowoczesne aplikacje</li>
            <li>
              Chcesz zrozumieć, jak Twoje aplikacje komunikują się ze światem
              zewnętrznym
            </li>
            <li>
              Dążysz do skutecznego diagnozowania i rozwiązywania problemów
              sieciowych
            </li>
            <li>Pracujesz z systemami rozproszonymi i mikrousługami</li>
          </ul>
        </Card>

        <Card title="Dlaczego sieci są tak ważne?">
          <p className="text-sm text-[var(--c-muted)]">
            We współczesnym świecie tworzenia oprogramowania nawet najprostsza
            aplikacja rzadko działa w izolacji. Tworząc program, musi on
            komunikować się z innymi systemami: bazami danych, API, usługami
            zewnętrznymi. Bez zrozumienia podstaw komunikacji sieciowej trudno
            jest tworzyć nowoczesne aplikacje.
          </p>
        </Card>

        <Card title="Ćwiczenie: Anatomia zapytania">
          <p className="text-sm mb-3">Zacznijmy od eksperymentu:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-2">
            curl -v google.com
          </pre>
          <p className="text-sm text-[var(--c-muted)]">
            Co widzisz? Jakie etapy przechodzi zapytanie? Co oznaczają różne
            nagłówki? Dlaczego następuje przekierowanie?
          </p>
        </Card>

        <Card title="Adresy IP — Localhost">
          <p className="text-sm mb-3">
            <strong>127.0.0.1</strong> — Twoje osobiste środowisko
            programistyczne, całkowicie odizolowane od świata zewnętrznego.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>Całkowita izolacja od świata zewnętrznego</li>
            <li>Maksymalna szybkość działania</li>
            <li>Praca bez internetu</li>
            <li>Bezpieczne środowisko do eksperymentów</li>
          </ul>
        </Card>

        <Card title="Prywatne adresy IP">
          <p className="text-sm mb-3">
            Trzy główne zakresy prywatnych adresów IP:
          </p>
          <ul className="list-disc list-inside text-sm space-y-2 text-[var(--c-muted)]">
            <li>
              <strong>10.0.0.0/8</strong> — Dla dużych sieci korporacyjnych (16
              milionów adresów)
            </li>
            <li>
              <strong>172.16.0.0/12</strong> — Średnie organizacje (domyślnie
              używany przez Dockera)
            </li>
            <li>
              <strong>192.168.0.0/16</strong> — Sieci domowe i małe biura
            </li>
          </ul>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mt-3">
            {`# Wyświetlenie lokalnego adresu IP
ipconfig     # Windows
ifconfig     # Linux/Mac`}
          </pre>
        </Card>

        <Card title="Publiczne adresy IP">
          <p className="text-sm mb-3">
            To Twój adres w internecie. Występują w dwóch rodzajach:
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>
              <strong>Statyczne:</strong> nie zmieniają się, używane dla
              serwerów
            </li>
            <li>
              <strong>Dynamiczne:</strong> mogą się zmieniać, typowe dla
              połączeń domowych
            </li>
          </ul>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mt-3">
            {`# Sprawdź swój publiczny adres IP
curl ifconfig.me`}
          </pre>
        </Card>

        <Card title="Praktyczny przykład — Etapy rozwoju">
          <div className="text-sm space-y-3">
            <div>
              <p className="font-semibold mb-1">
                1. Etap tworzenia (Localhost)
              </p>
              <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
                {`npm start
# http://localhost:3000`}
              </pre>
            </div>
            <div>
              <p className="font-semibold mb-1">
                2. Testowanie w sieci lokalnej
              </p>
              <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
                {`# http://192.168.1.5:3000`}
              </pre>
            </div>
            <div>
              <p className="font-semibold mb-1">3. Publikacja w internecie</p>
              <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
                {`ssh user@203.0.113.10
# http://203.0.113.10`}
              </pre>
            </div>
          </div>
        </Card>

        <Card title="Porty i ich zastosowanie">
          <p className="text-sm mb-3">
            Jeśli adres IP identyfikuje komputer w sieci, port wskazuje
            konkretne aplikacje. To jak numery pokoi w budynku.
          </p>
          <div className="text-sm space-y-2 text-[var(--c-muted)]">
            <p>
              <strong>Standardowe porty:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>80: HTTP (niezabezpieczone strony)</li>
              <li>443: HTTPS (zabezpieczone strony)</li>
              <li>3000-3999: Aplikacje Node.js</li>
              <li>8000-8999: Serwery Python</li>
              <li>5432: PostgreSQL</li>
              <li>27017: MongoDB</li>
              <li>6379: Redis</li>
            </ul>
          </div>
        </Card>

        <Card title="Zakresy portów">
          <div className="text-sm space-y-3">
            <div>
              <p className="font-semibold">Porty 0-1023: Uprzywilejowane</p>
              <p className="text-[var(--c-muted)]">
                80 (HTTP), 443 (HTTPS), 22 (SSH), 53 (DNS)
              </p>
            </div>
            <div>
              <p className="font-semibold">Porty 1024-49151: Zarejestrowane</p>
              <p className="text-[var(--c-muted)]">
                3306 (MySQL), 5432 (PostgreSQL), 6379 (Redis)
              </p>
            </div>
            <div>
              <p className="font-semibold">Porty 49152-65535: Dynamiczne</p>
              <p className="text-[var(--c-muted)]">
                Wykorzystywane do tymczasowych połączeń
              </p>
            </div>
          </div>
        </Card>

        <Card title="Konflikt portów">
          <p className="text-sm mb-3">Często spotykany błąd:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`Error: listen EADDRINUSE :::3000`}
          </pre>
          <p className="text-sm mb-3 text-[var(--c-muted)]">Rozwiązanie:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Znajdź proces
lsof -i :3000         # Linux/Mac
netstat -ano | findstr :3000  # Windows

# Zakończ proces
kill -9 <PID>         # Linux/Mac
taskkill /PID <PID> /F  # Windows

# Lub użyj innego portu
PORT=3001 npm start`}
          </pre>
        </Card>

        <Card title="Diagnostyka problemów">
          <p className="text-sm mb-3">Algorytm diagnostyczny:</p>
          <div className="text-sm space-y-2">
            <div>
              <p className="font-semibold">1. Sprawdź podstawową łączność:</p>
              <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
                ping google.com
              </pre>
            </div>
            <div>
              <p className="font-semibold">2. Sprawdź lokalny serwer:</p>
              <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
                curl localhost:3000
              </pre>
            </div>
            <div>
              <p className="font-semibold">3. Sprawdź porty:</p>
              <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
                lsof -i :3000
              </pre>
            </div>
          </div>
        </Card>

        <Card title="curl — uniwersalne narzędzie">
          <p className="text-sm mb-3">Podstawowe użycie:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# GET z dodatkowymi informacjami
curl -v https://api.example.com/users

# Praca z nagłówkami
curl -H "Authorization: Bearer token123" \\
     -H "Content-Type: application/json" \\
     https://api.example.com/protected

# Wysyłanie plików
curl -F "file=@document.pdf" \\
     https://api.example.com/upload`}
          </pre>
        </Card>

        <Card title="ngrok — tunel do internetu">
          <p className="text-sm mb-3">
            Rozwiązuje problem: "Jak pokazać moją lokalną aplikację koledze z
            innego miasta?"
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Tworzenie tunelu
ngrok http 3000

# Otrzymasz URL:
# https://92832de0.ngrok.io -> localhost:3000`}
          </pre>
          <p className="text-sm mt-3 text-[var(--c-muted)]">
            Teraz Twoja lokalna aplikacja jest dostępna dla całego świata!
          </p>
        </Card>

        <Card title="Przydatne narzędzia">
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>
              <strong>Wireshark:</strong> analiza ruchu sieciowego
            </li>
            <li>
              <strong>Postman:</strong> testowanie API
            </li>
            <li>
              <strong>mitmproxy:</strong> analiza ruchu HTTPS
            </li>
            <li>
              <strong>httpie:</strong> nowoczesna alternatywa dla curl
            </li>
            <li>
              <strong>ab/siege:</strong> testy obciążeniowe
            </li>
          </ul>
        </Card>

        <Card title="Postman">
          <p className="text-sm mb-3">Wizualna praca z API oferuje:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>Kolekcje zapytań: organizacja wywołań API</li>
            <li>Zmienne środowiskowe: przełączanie między dev/staging/prod</li>
            <li>Automatyczne testy: weryfikacja odpowiedzi API</li>
            <li>Mocki i przykłady: praca bez prawdziwego backendu</li>
          </ul>
        </Card>

        <Card title="mitmproxy">
          <p className="text-sm mb-3">Analiza i modyfikacja ruchu "na żywo":</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Tryb interaktywny
mitmproxy

# Interfejs webowy
mitmweb

# Zapisywanie ruchu
mitmdump -w traffic.flows`}
          </pre>
          <p className="text-sm text-[var(--c-muted)]">
            Przydatne do debugowania aplikacji mobilnych i analizy interakcji
            API.
          </p>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/04', label: '04 — Procesy i Usługi' }}
        next={{ to: '/lessons/06', label: '06 — DNS i Domeny' }}
      />
    </div>
  );
}
