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

export default function NetworkingBasics() {
  usePageTitle('Podstawy sieci — adresy IP i porty');

  return (
    <div>
      <PageHeader
        title="Podstawy sieci"
        subtitle="Adresy IP · Localhost · Sieci prywatne · Porty · Diagnostyka"
        color="var(--c-blue)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Localhost — 127.0.0.1">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Twoje osobiste środowisko programistyczne, całkowicie odizolowane od
            świata zewnętrznego.
          </p>
          <Concept title="Zalety localhost" color="var(--c-green)">
            <ul className="list-disc list-inside text-xs space-y-1">
              <li>Całkowita izolacja od świata zewnętrznego</li>
              <li>Maksymalna szybkość działania</li>
              <li>Praca bez internetu</li>
              <li>Bezpieczne środowisko do eksperymentów</li>
            </ul>
          </Concept>
          <Divider />
          <ExampleBlock>
            <Comment># Testowanie aplikacji lokalnie</Comment>
            <Cmd>npm start</Cmd>
            <Comment># Dostępne pod http://localhost:3000</Comment>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Alternatywne adresy localhost</Comment>
            <Cmd>curl http://127.0.0.1:3000</Cmd>
            <Cmd>curl http://localhost:3000</Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>127.0.0.1</b> to pętla zwrotna (loopback) — ruch nigdy nie
            opuszcza komputera.
          </InfoBox>
        </Card>

        <Card title="Prywatne adresy IP" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Trzy główne zakresy prywatnych adresów IP — działają wyłącznie
            wewnątrz sieci lokalnej.
          </p>
          <Row code="10.0.0.0/8" codeVariant="yellow">
            Duże sieci korporacyjne (16 milionów adresów)
          </Row>
          <Row code="172.16.0.0/12" codeVariant="yellow">
            Średnie organizacje (domyślnie Docker)
          </Row>
          <Row code="192.168.0.0/16" codeVariant="yellow">
            Sieci domowe i małe biura (65536 adresów)
          </Row>
          <Divider />
          <SectionLabel className="mt-1.5">
            Sprawdzanie lokalnego IP
          </SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Windows</Comment>
            <Cmd>ipconfig</Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Linux/Mac</Comment>
            <Cmd>ifconfig</Cmd>
            <Cmd>ip addr show</Cmd>
          </ExampleBlock>
          <InfoBox>
            Prywatne IP = niewidoczne z internetu, bezpłatne, często DHCP.
          </InfoBox>
        </Card>

        <Card title="Publiczne adresy IP" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            To Twój adres w internecie — unikalny w całym świecie.
          </p>
          <Concept title="Statyczne IP" color="var(--c-green)">
            Nie zmieniają się, używane dla serwerów i usług online.
          </Concept>
          <Concept title="Dynamiczne IP" color="var(--c-yellow)">
            Mogą się zmieniać, typowe dla połączeń domowych (ISP).
          </Concept>
          <Divider />
          <SectionLabel className="mt-1.5">
            Sprawdzanie publicznego IP
          </SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Sprawdź swój publiczny adres IP</Comment>
            <Cmd>curl ifconfig.me</Cmd>
            <Cmd>curl ipinfo.io/ip</Cmd>
            <Cmd>curl icanhazip.com</Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Szczegółowe informacje (JSON)</Comment>
            <Cmd>curl ipinfo.io</Cmd>
          </ExampleBlock>
          <InfoBox>
            Publiczne IP jest przydzielane przez dostawcę internetu (ISP).
          </InfoBox>
        </Card>

        <Card title="Praktyczny przykład — Etapy rozwoju">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Od lokalnego developmentu do publikacji w internecie.
          </p>
          <SectionLabel>1. Etap tworzenia (Localhost)</SectionLabel>
          <ExampleBlock>
            <Comment># Uruchamianie aplikacji React</Comment>
            <Cmd>npm start</Cmd>
            <Comment># Dostępne pod http://localhost:3000</Comment>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">
            2. Testowanie w sieci lokalnej
          </SectionLabel>
          <ExampleBlock>
            <Comment># Twój lokalny IP: 192.168.1.5</Comment>
            <Comment># Aplikacja dostępna dla kolegów:</Comment>
            <Cmd>http://192.168.1.5:3000</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">
            3. Publikacja w internecie
          </SectionLabel>
          <ExampleBlock>
            <Comment># Wdrażanie na serwer z publicznym IP</Comment>
            <Cmd>
              ssh <V>user@203.0.113.10</V>
            </Cmd>
            <Comment># Teraz dostępne pod:</Comment>
            <Cmd>http://203.0.113.10</Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Porty — numery pokoi" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Jeśli adres IP to adres budynku, port to numer pokoju. Wskazuje
            konkretną aplikację.
          </p>
          <SectionLabel>Standardowe porty aplikacji</SectionLabel>
          <Row code="80" codeVariant="purple">
            HTTP (niezabezpieczone strony internetowe)
          </Row>
          <Row code="443" codeVariant="purple">
            HTTPS (zabezpieczone strony internetowe)
          </Row>
          <Row code="3000-3999" codeVariant="purple">
            Aplikacje Node.js (development)
          </Row>
          <Row code="8000-8999" codeVariant="purple">
            Serwery Python (Django, Flask)
          </Row>
          <Row code="5000" codeVariant="purple">
            Flask development server
          </Row>
          <Row code="22" codeVariant="purple">
            SSH (bezpieczny zdalny dostęp)
          </Row>
        </Card>

        <Card title="Porty baz danych" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Każda baza danych ma swój standardowy port.
          </p>
          <Row code="5432" codeVariant="green">
            PostgreSQL
          </Row>
          <Row code="3306" codeVariant="green">
            MySQL / MariaDB
          </Row>
          <Row code="27017" codeVariant="green">
            MongoDB
          </Row>
          <Row code="6379" codeVariant="green">
            Redis
          </Row>
          <Row code="9042" codeVariant="green">
            Cassandra
          </Row>
          <Row code="5984" codeVariant="green">
            CouchDB
          </Row>
          <Divider />
          <ExampleBlock variant="green">
            <Comment># Przykład: połączenie z PostgreSQL</Comment>
            <Cmd>
              psql <H>-h</H> <V>localhost</V> <H>-p</H> <F>5432</F> <H>-U</H>{' '}
              <V>user</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Zakresy portów" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Porty są podzielone na trzy kategorie według numeru.
          </p>
          <Concept
            title="0-1023: Uprzywilejowane porty"
            color="var(--c-orange)"
          >
            Wymagają uprawnień root. Używane przez standardowe usługi systemowe.
          </Concept>
          <Row code="22" codeVariant="orange">
            SSH
          </Row>
          <Row code="53" codeVariant="orange">
            DNS
          </Row>
          <Row code="80" codeVariant="orange">
            HTTP
          </Row>
          <Row code="443" codeVariant="orange">
            HTTPS
          </Row>
          <Divider />
          <Concept
            title="1024-49151: Zarejestrowane porty"
            color="var(--c-yellow)"
          >
            Rezerwowane dla konkretnych aplikacji przez IANA.
          </Concept>
          <Row code="3306" codeVariant="yellow">
            MySQL
          </Row>
          <Row code="5432" codeVariant="yellow">
            PostgreSQL
          </Row>
          <Row code="6379" codeVariant="yellow">
            Redis
          </Row>
          <Divider />
          <Concept title="49152-65535: Dynamiczne porty" color="var(--c-green)">
            Wykorzystywane do tymczasowych połączeń klient-serwer.
          </Concept>
        </Card>

        <Card title="Konflikt portów — Rozwiązanie" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Często spotykany błąd podczas uruchamiania aplikacji.
          </p>
          <InfoBox warn>
            <b>Error: listen EADDRINUSE :::3000</b>
            <br />
            Oznacza to, że port 3000 jest już zajęty przez inny proces.
          </InfoBox>
          <Divider />
          <SectionLabel className="mt-1.5">
            1. Znajdź proces zajmujący port
          </SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Linux/Mac</Comment>
            <Cmd>
              lsof <H>-i :3000</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Windows</Comment>
            <Cmd>netstat -ano | findstr :3000</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">2. Zakończ proces</SectionLabel>
          <ExampleBlock>
            <Comment># Linux/Mac</Comment>
            <Cmd>
              kill <H>-9</H> <V>&lt;PID&gt;</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Windows</Comment>
            <Cmd>
              taskkill <H>/PID</H> <V>&lt;PID&gt;</V> <H>/F</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">3. Użyj innego portu</SectionLabel>
          <ExampleBlock>
            <Comment># React</Comment>
            <Cmd>
              <V>PORT=3001</V> npm start
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Express.js</Comment>
            <Cmd>app.listen(3001, () =&gt; {'{'}</Cmd>
            <Cmd> console.log('Serwer na porcie 3001');</Cmd>
            <Cmd>{'}'});</Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Diagnostyka — Algorytm" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Systematyczne podejście do rozwiązywania problemów sieciowych.
          </p>
          <SectionLabel>Krok 1: Sprawdź podstawową łączność</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Czy internet działa?</Comment>
            <Cmd>
              ping <V>google.com</V>
            </Cmd>
            <Comment># Sukces = internet działa</Comment>
            <Comment># Niepowodzenie = problem z DNS lub połączeniem</Comment>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">
            Krok 2: Sprawdź lokalny serwer
          </SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Czy serwer odpowiada lokalnie?</Comment>
            <Cmd>
              curl <V>localhost:3000</V>
            </Cmd>
            <Cmd>
              curl <V>127.0.0.1:3000</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Krok 3: Sprawdź porty</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Które porty są otwarte?</Comment>
            <Cmd>
              lsof <H>-i :3000</H>
            </Cmd>
            <Cmd>
              ss <H>-tlnp</H> | grep <V>:3000</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">
            Krok 4: Sprawdź firewall
          </SectionLabel>
          <ExampleBlock>
            <Comment># Linux (ufw)</Comment>
            <Cmd>sudo ufw status</Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Linux (iptables)</Comment>
            <Cmd>
              sudo iptables <H>-L -n</H>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Przykład typowego dnia programisty">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Kilka usług działających jednocześnie na różnych portach.
          </p>
          <ExampleBlock>
            <Comment># Frontend React</Comment>
            <Cmd>npm start</Cmd>
            <Comment># Uruchomiony na porcie 3000</Comment>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Backend API (Python Flask)</Comment>
            <Cmd>python app.py</Cmd>
            <Comment># Uruchomiony na porcie 5000</Comment>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Redis (cache)</Comment>
            <Cmd>docker run redis</Cmd>
            <Comment># Uruchomiony na porcie 6379</Comment>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># PostgreSQL (baza danych)</Comment>
            <Cmd>docker run postgres</Cmd>
            <Comment># Uruchomiony na porcie 5432</Comment>
          </ExampleBlock>
          <Divider />
          <InfoBox>
            Wszystkie te usługi mogą działać jednocześnie, ponieważ używają
            różnych portów!
          </InfoBox>
        </Card>

        <Card title="NAT — Network Address Translation" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Jak wiele urządzeń z prywatnymi IP korzysta z jednego publicznego
            IP.
          </p>
          <InfoBox>
            Router w domu wykonuje NAT — tłumaczy prywatne IP (np. 192.168.1.x)
            na publiczne IP (jedno dla całego domu).
          </InfoBox>
          <Divider />
          <SectionLabel className="mt-1.5">Port Forwarding</SectionLabel>
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Przekierowanie portu z routera na konkretne urządzenie w sieci
            lokalnej.
          </p>
          <ExampleBlock variant="purple">
            <Comment>
              # Przykład: przekierowanie portu 8080 do 192.168.1.5:3000
            </Comment>
            <Comment>
              # Zewnętrzny ruch na PublicIP:8080 → 192.168.1.5:3000
            </Comment>
          </ExampleBlock>
          <InfoBox warn>
            Port forwarding wymaga konfiguracji routera. Używaj ostrożnie ze
            względów bezpieczeństwa!
          </InfoBox>
        </Card>

        <Card title="IPv4 vs IPv6" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Dwie wersje protokołu internetowego.
          </p>
          <Concept title="IPv4" color="var(--c-orange)">
            Starszy standard, 32-bitowe adresy (4.3 miliarda adresów).
            <br />
            Format: <code className="text-xs">192.168.1.1</code>
          </Concept>
          <Concept title="IPv6" color="var(--c-blue)">
            Nowy standard, 128-bitowe adresy (340 undecylionów adresów).
            <br />
            Format:{' '}
            <code className="text-xs">2001:0db8:85a3::8a2e:0370:7334</code>
          </Concept>
          <Divider />
          <ExampleBlock variant="yellow">
            <Comment># Sprawdź IPv4</Comment>
            <Cmd>
              ip <H>-4</H> addr show
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Sprawdź IPv6</Comment>
            <Cmd>
              ip <H>-6</H> addr show
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            IPv4 wyczerpuje się — IPv6 jest przyszłością, ale oba działają
            równolegle (dual-stack).
          </InfoBox>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/cheatsheets/networking', label: 'Networking' }}
        next={{ to: '/cheatsheets/network-tools', label: 'Network Tools' }}
      />
    </div>
  );
}
