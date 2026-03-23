import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import LessonNav from '../../components/LessonNav';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Lesson06() {
  usePageTitle('Lekcja 06 — DNS i Domeny');

  return (
    <div>
      <PageHeader
        title="Lekcja 06 — DNS i Domeny"
        subtitle="DNS, typy rekordow, CORS i konfiguracja domen"
        color="var(--c-purple)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="DNS: system nazw domenowych">
          <p className="text-sm mb-3">
            DNS (Domain Name System) to{' '}
            <strong>ksiazka telefoniczna internetu</strong>. Tlumaczy nazwy
            zrozumiale dla ludzi na adresy IP zrozumiale dla komputerow.
          </p>
          <p className="text-sm text-[var(--c-muted)]">
            Zamiast pamietac <code>142.250.74.206</code>, wpisujemy po prostu{' '}
            <code>google.com</code>. DNS automatycznie zamienia nazwe domeny na
            wlasciwy adres IP serwera.
          </p>
        </Card>

        <Card title="Jak dziala DNS?">
          <p className="text-sm mb-3">
            Zapytanie DNS przechodzi przez kilka etapow:
          </p>
          <div className="text-sm space-y-2 text-[var(--c-muted)]">
            <p>
              <strong>1.</strong> Przegladarka sprawdza cache lokalny
            </p>
            <p>
              <strong>2.</strong> Zapytanie do <strong>DNS Resolver</strong>{' '}
              (np. 8.8.8.8)
            </p>
            <p>
              <strong>3.</strong> Resolver pyta <strong>Root DNS</strong> — "Kto
              obsluguje .com?"
            </p>
            <p>
              <strong>4.</strong> Root DNS kieruje do <strong>.com DNS</strong>
            </p>
            <p>
              <strong>5.</strong> .com DNS kieruje do{' '}
              <strong>serwera DNS google.com</strong>
            </p>
            <p>
              <strong>6.</strong> Serwer DNS zwraca <strong>adres IP</strong>
            </p>
          </div>
        </Card>

        <Card title="Typy rekordow DNS">
          <div className="text-sm space-y-3">
            <div>
              <p className="font-semibold">A Record</p>
              <p className="text-[var(--c-muted)]">
                Nazwa → adres IP. Podstawowy rekord DNS.
              </p>
              <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mt-1">
                {`google.com → 142.250.74.206`}
              </pre>
            </div>
            <div>
              <p className="font-semibold">CNAME Record</p>
              <p className="text-[var(--c-muted)]">
                Alias — przekierowanie jednej nazwy na druga.
              </p>
              <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mt-1">
                {`www.google.com → google.com`}
              </pre>
            </div>
            <div>
              <p className="font-semibold">MX Record</p>
              <p className="text-[var(--c-muted)]">
                Wskazuje serwery poczty elektronicznej.
              </p>
            </div>
            <div>
              <p className="font-semibold">TXT Record</p>
              <p className="text-[var(--c-muted)]">
                Dane tekstowe, np. rekordy SPF do weryfikacji e-mail.
              </p>
            </div>
          </div>
        </Card>

        <Card title="Praktyczny przyklad: konfiguracja domeny">
          <p className="text-sm mb-3">
            Konfiguracja domeny <code>myapp.com</code>:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# A records — glowna domena
myapp.com       → 203.0.113.10

# CNAME — alias www
www.myapp.com   → myapp.com

# Subdomeny
api.myapp.com   → 203.0.113.20
staging.myapp.com → 203.0.113.30

# MX — poczta (Google Workspace)
myapp.com MX 10 → mx.google.com`}
          </pre>
        </Card>

        <Card title="Narzedzia: dig">
          <p className="text-sm mb-3">
            <code>dig</code> — najwazniejsze narzedzie do diagnostyki DNS:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Podstawowe zapytanie DNS
dig google.com

# Sprawdz rekordy MX
dig google.com MX

# Pelne sledzenie sciezki DNS
dig +trace google.com`}
          </pre>
          <p className="text-sm mt-3 text-[var(--c-muted)]">
            <code>dig +trace</code> pokazuje cala sciezke zapytania od Root DNS
            do koncowego serwera.
          </p>
        </Card>

        <Card title="Narzedzia: nslookup">
          <p className="text-sm mb-3">
            <code>nslookup</code> — prostsze narzedzie do sprawdzania DNS:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Podstawowe zapytanie
nslookup google.com

# Uzycie konkretnego serwera DNS
nslookup google.com 8.8.8.8`}
          </pre>
          <p className="text-sm mt-3 text-[var(--c-muted)]">
            Przydatne do szybkiego sprawdzenia, czy domena rozwiazuje sie na
            poprawny adres IP.
          </p>
        </Card>

        <Card title="CORS: dlaczego przegladarka blokuje zadania">
          <p className="text-sm mb-3">
            <strong>CORS</strong> (Cross-Origin Resource Sharing) to mechanizm
            bezpieczenstwa przegladarki. Blokuje zadania HTTP z jednej domeny do
            drugiej.
          </p>
          <p className="text-sm mb-3 text-[var(--c-muted)]">
            Przyklad: aplikacja na <code>frontend.com</code> probuje pobrac dane
            z <code>api.backend.com</code> — przegladarka zablokuje to zadanie,
            chyba ze serwer wyraznie na to pozwoli.
          </p>
          <p className="text-sm text-[var(--c-muted)]">
            Przegladarka wysyla najpierw zapytanie <strong>preflight</strong> (
            <code>OPTIONS</code>), aby sprawdzic uprawnienia.
          </p>
        </Card>

        <Card title="Konfiguracja CORS — Express.js">
          <p className="text-sm mb-3">
            Konfiguracja CORS w aplikacji Express.js:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`const cors = require('cors');

app.use(cors({
  origin: 'https://frontend.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type',
                    'Authorization'],
  credentials: true
}));`}
          </pre>
        </Card>

        <Card title="Konfiguracja CORS — Nginx">
          <p className="text-sm mb-3">
            Konfiguracja CORS na poziomie serwera Nginx:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`location /api/ {
  add_header Access-Control-Allow-Origin
    "https://frontend.com";
  add_header Access-Control-Allow-Methods
    "GET, POST, OPTIONS";
  add_header Access-Control-Allow-Headers
    "Content-Type, Authorization";
}`}
          </pre>
        </Card>

        <Card title="Debugowanie CORS">
          <p className="text-sm mb-3">Typowy blad w konsoli przegladarki:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`Access to fetch at 'https://api.com'
from origin 'https://app.com' has been
blocked by CORS policy`}
          </pre>
          <p className="text-sm mb-3">Sprawdz naglowki odpowiedzi:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Sprawdz odpowiedz preflight
curl -X OPTIONS https://api.com/data \\
  -H "Origin: https://app.com" \\
  -H "Access-Control-Request-Method: GET" \\
  -v`}
          </pre>
          <p className="text-sm mt-3 text-[var(--c-muted)]">
            Jezeli uzywasz cookies, pamietaj o{' '}
            <code>credentials: 'include'</code> po stronie frontendu oraz{' '}
            <code>credentials: true</code> w konfiguracji CORS.
          </p>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/05', label: '05 — Podstawy sieci' }}
        next={{ to: '/lessons/07', label: '07 — Wirtualizacja' }}
      />
    </div>
  );
}
