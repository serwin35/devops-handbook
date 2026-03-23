import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import ExampleBlock, {
  Cmd,
  Comment,
  H,
  V,
  F,
} from '../../components/ExampleBlock';
import Row from '../../components/Row';
import Divider from '../../components/Divider';
import InfoBox from '../../components/InfoBox';
import SectionLabel from '../../components/SectionLabel';
import Concept from '../../components/Concept';
import LessonNav from '../../components/LessonNav';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function DnsDomains() {
  usePageTitle('DNS i Domeny');

  return (
    <div>
      <PageHeader
        title="DNS i Domeny"
        subtitle="dig · nslookup · rekordy DNS · konfiguracja domen · CORS"
        color="var(--c-purple)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="dig — zaawansowane zapytania DNS" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Najpopularniejsze narzędzie do diagnostyki DNS. Pozwala odpytywać
            dowolne rekordy z dowolnego serwera.
          </p>
          <SectionLabel>Podstawowe zapytania</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Podstawowe zapytanie (domyślnie rekord A)</Comment>
            <Cmd>
              dig <V>google.com</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Konkretne typy rekordów</Comment>
            <Cmd>
              dig <V>google.com</V> <H>A</H>
            </Cmd>
            <Cmd>
              dig <V>google.com</V> <H>MX</H>
            </Cmd>
            <Cmd>
              dig <V>google.com</V> <H>TXT</H>
            </Cmd>
            <Cmd>
              dig <V>google.com</V> <H>CNAME</H>
            </Cmd>
            <Cmd>
              dig <V>google.com</V> <H>NS</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Tryby wyjścia</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Kompaktowy output (tylko wynik)</Comment>
            <Cmd>
              dig <H>+short</H> <V>google.com</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Śledź pełną ścieżkę rozwiązywania DNS</Comment>
            <Cmd>
              dig <H>+trace</H> <V>google.com</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Wybór serwera DNS</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Zapytaj konkretny serwer DNS</Comment>
            <Cmd>
              dig <H>@8.8.8.8</H> <V>google.com</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Porównaj wyniki z różnych serwerów</Comment>
            <Cmd>
              dig <H>@8.8.8.8</H> <V>myapp.com</V> <H>+short</H>
            </Cmd>
            <Cmd>
              dig <H>@1.1.1.1</H> <V>myapp.com</V> <H>+short</H>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="nslookup — prostsze narzędzie" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Prostsze narzędzie do szybkich zapytań DNS. Dostępne na każdym
            systemie, łącznie z Windows.
          </p>
          <SectionLabel>Podstawowe użycie</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Proste zapytanie o adres IP</Comment>
            <Cmd>
              nslookup <V>google.com</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Zapytanie z określonym serwerem DNS</Comment>
            <Cmd>
              nslookup <V>google.com</V> <H>8.8.8.8</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Zapytanie o rekordy MX</Comment>
            <Cmd>
              nslookup <H>-type=MX</H> <V>google.com</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <InfoBox>
            <code className="text-xs">dig</code> jest bardziej szczegółowy i
            preferowany w środowiskach Linux/macOS.{' '}
            <code className="text-xs">nslookup</code> jest prostszy i dostępny
            wszędzie — również na Windows.
          </InfoBox>
        </Card>

        <Card title="Typy rekordów DNS" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            DNS to baza danych mapująca nazwy domen na różne typy wartości.
            Każdy typ rekordu ma inne zastosowanie.
          </p>
          <Row code="A" codeVariant="purple">
            Nazwa → adres IPv4 (np. 93.184.216.34)
          </Row>
          <Row code="AAAA" codeVariant="purple">
            Nazwa → adres IPv6 (np. 2606:2800:220:1:...)
          </Row>
          <Row code="CNAME" codeVariant="purple">
            Alias → inna nazwa (np. www → myapp.com)
          </Row>
          <Row code="MX" codeVariant="purple">
            Serwery pocztowe (z priorytetem, np. 10 mail.google.com)
          </Row>
          <Row code="TXT" codeVariant="purple">
            Rekordy tekstowe (SPF, DKIM, weryfikacja domeny)
          </Row>
          <Row code="NS" codeVariant="purple">
            Serwery nazw (nameservery) dla domeny
          </Row>
          <Row code="SOA" codeVariant="purple">
            Start of Authority — informacje o strefie DNS (serial, refresh, TTL)
          </Row>
          <Divider />
          <InfoBox>
            Rekordy <code className="text-xs">TXT</code> są często używane do
            weryfikacji własności domeny (Google, AWS, Let's Encrypt) oraz do
            konfiguracji SPF/DKIM dla poczty.
          </InfoBox>
        </Card>

        <Card
          title="Konfiguracja domeny — praktyczny przykład"
          color="var(--c-orange)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Typowa konfiguracja DNS dla aplikacji webowej z pocztą na Google
            Workspace.
          </p>
          <SectionLabel>Rekordy A — główne adresy</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Główna domena → serwer</Comment>
            <Cmd>
              <F>myapp.com.</F> IN <H>A</H> <V>203.0.113.10</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Subdomena API na innym serwerze</Comment>
            <Cmd>
              <F>api.myapp.com.</F> IN <H>A</H> <V>203.0.113.11</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">CNAME — aliasy</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># www → główna domena</Comment>
            <Cmd>
              <F>www.myapp.com.</F> IN <H>CNAME</H> <V>myapp.com.</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">MX — poczta</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Google Workspace mail</Comment>
            <Cmd>
              <F>myapp.com.</F> IN <H>MX</H> <V>10 aspmx.l.google.com.</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">
            TXT — weryfikacja i SPF
          </SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Konfiguracja SPF (kto może wysyłać maile)</Comment>
            <Cmd>
              <F>myapp.com.</F> IN <H>TXT</H>{' '}
              <V>"v=spf1 include:_spf.google.com ~all"</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Plik /etc/hosts" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Lokalny plik do ręcznego mapowania nazw na adresy IP. Ma wyższy
            priorytet niż DNS.
          </p>
          <SectionLabel>Format</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Format: IP_ADDRESS HOSTNAME</Comment>
            <Cmd>
              <V>127.0.0.1</V> <F>localhost</F>
            </Cmd>
            <Cmd>
              <V>127.0.0.1</V> <F>myapp.local</F>
            </Cmd>
            <Cmd>
              <V>127.0.0.1</V> <F>api.myapp.local</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Edycja pliku</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Edytuj jako root</Comment>
            <Cmd>
              sudo <H>nano</H> <F>/etc/hosts</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Zastosowania</SectionLabel>
          <ul className="list-disc list-inside text-xs space-y-1 text-[var(--c-muted)]">
            <li>Lokalne środowisko deweloperskie (myapp.local)</li>
            <li>Blokowanie domen (przekieruj na 127.0.0.1)</li>
            <li>Testowanie przed zmianą DNS (wskaż domenę na nowy serwer)</li>
          </ul>
          <Divider />
          <InfoBox>
            Zmiany w <code className="text-xs">/etc/hosts</code> działają
            natychmiast — nie trzeba czekać na propagację DNS!
          </InfoBox>
        </Card>

        <Card title="Debugowanie DNS" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Techniki diagnozowania problemów z DNS — gdy domena "nie działa" lub
            zwraca złe adresy.
          </p>
          <SectionLabel>Śledzenie rozwiązywania</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Pełna ścieżka rozwiązywania (root → TLD → NS)</Comment>
            <Cmd>
              dig <H>+trace</H> <V>myapp.com</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">
            Porównanie serwerów DNS
          </SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Sprawdź czy różne DNS zwracają ten sam wynik</Comment>
            <Cmd>
              dig <H>@8.8.8.8</H> <V>myapp.com</V> <H>+short</H>
            </Cmd>
            <Cmd>
              dig <H>@1.1.1.1</H> <V>myapp.com</V> <H>+short</H>
            </Cmd>
            <Cmd>
              dig <H>@9.9.9.9</H> <V>myapp.com</V> <H>+short</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Sprawdzanie TTL</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Sprawdź TTL (czas życia rekordu w cache)</Comment>
            <Cmd>
              dig <V>myapp.com</V> | grep -A1 <H>"ANSWER SECTION"</H>
            </Cmd>
            <Comment># TTL = liczba sekund do odświeżenia rekordu</Comment>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Czyszczenie cache DNS</SectionLabel>
          <ExampleBlock>
            <Comment># Linux (systemd)</Comment>
            <Cmd>
              sudo <H>systemd-resolve</H> <V>--flush-caches</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># macOS</Comment>
            <Cmd>
              sudo <H>dscacheutil</H> <V>-flushcache</V>
            </Cmd>
            <Cmd>
              sudo <H>killall</H> <V>-HUP mDNSResponder</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="CORS — ściąga" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Cross-Origin Resource Sharing — mechanizm bezpieczeństwa
            przeglądarki kontrolujący zapytania między różnymi źródłami.
          </p>
          <SectionLabel>Co to jest "origin"?</SectionLabel>
          <Concept
            title="Origin = protokół + host + port"
            color="var(--c-purple)"
          >
            <code className="text-xs">http://localhost:3000</code> i{' '}
            <code className="text-xs">http://localhost:5000</code> to różne
            origin! Zmiana protokołu, hosta lub portu = inny origin.
          </Concept>
          <Divider />
          <SectionLabel className="mt-1.5">Preflight request</SectionLabel>
          <InfoBox>
            Przeglądarka automatycznie wysyła zapytanie{' '}
            <code className="text-xs">OPTIONS</code> przed właściwym requestem,
            aby sprawdzić czy serwer zezwala na cross-origin.
          </InfoBox>
          <Divider />
          <SectionLabel className="mt-1.5">Kluczowe nagłówki</SectionLabel>
          <Row code="Access-Control-Allow-Origin" codeVariant="purple">
            Dozwolone origin (np. * lub konkretny URL)
          </Row>
          <Row code="Access-Control-Allow-Methods" codeVariant="purple">
            Dozwolone metody HTTP (GET, POST, PUT...)
          </Row>
          <Row code="Access-Control-Allow-Headers" codeVariant="purple">
            Dozwolone nagłówki (Authorization, Content-Type...)
          </Row>
          <Row code="Access-Control-Allow-Credentials" codeVariant="purple">
            Czy cookies są dozwolone (true/false)
          </Row>
          <Divider />
          <SectionLabel className="mt-1.5">Debugowanie CORS</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Symuluj preflight request</Comment>
            <Cmd>
              curl <H>-X OPTIONS</H> <H>-I</H> \
            </Cmd>
            <Cmd>
              {' '}
              <H>-H</H> <V>"Origin: http://localhost:3000"</V> \
            </Cmd>
            <Cmd>
              {' '}
              <H>-H</H> <V>"Access-Control-Request-Method: POST"</V> \
            </Cmd>
            <Cmd> https://api.example.com/data</Cmd>
          </ExampleBlock>
          <InfoBox warn>
            Nigdy nie używaj{' '}
            <code className="text-xs">Access-Control-Allow-Origin: *</code>{' '}
            razem z{' '}
            <code className="text-xs">
              Access-Control-Allow-Credentials: true
            </code>
            ! Przeglądarka to zablokuje.
          </InfoBox>
        </Card>
      </div>

      <LessonNav prev={{ to: '/cheatsheets', label: 'Cheatsheets' }} />
    </div>
  );
}
