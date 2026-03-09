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

export default function Networking() {
  usePageTitle('Networking');

  return (
    <div>
      <PageHeader
        title="Networking"
        subtitle="TCP/IP · DNS · porty · diagnostyka · narzędzia sieciowe"
        color="var(--c-orange)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Model OSI / TCP/IP">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Warstwy komunikacji sieciowej — od fizycznej do aplikacji.
          </p>
          <pre className="text-xs leading-7 bg-[var(--c-code-bg)] border border-[var(--c-border)] rounded-md p-3 overflow-x-auto whitespace-pre mb-2.5">
            {`OSI              TCP/IP           Przykład
─────────────────────────────────────────────
7. Aplikacji     Aplikacji        HTTP, DNS, SSH
6. Prezentacji   ↑                SSL/TLS, JPEG
5. Sesji         ↑                Sockety
4. Transportowa  Transportowa     TCP, UDP
3. Sieciowa      Internetowa      IP, ICMP, ARP
2. Łącza danych  Dostępu do       Ethernet, Wi-Fi
1. Fizyczna      sieci            Kable, sygnały`}
          </pre>
          <InfoBox>
            <b>TCP</b> = połączeniowy, niezawodny (HTTP, SSH). <b>UDP</b> =
            bezpołączeniowy, szybki (DNS, VoIP, gaming).
          </InfoBox>
        </Card>

        <Card title="Kluczowe porty" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Porty 0-1023 = well-known (wymagają root). 1024-65535 = dynamiczne.
          </p>
          <Row code="22" codeVariant="yellow">
            SSH — bezpieczny zdalny dostęp
          </Row>
          <Row code="80" codeVariant="yellow">
            HTTP — ruch webowy (nieszyfrowany)
          </Row>
          <Row code="443" codeVariant="yellow">
            HTTPS — ruch webowy (TLS/SSL)
          </Row>
          <Row code="53" codeVariant="yellow">
            DNS — rozwiązywanie nazw domen
          </Row>
          <Row code="25" codeVariant="yellow">
            SMTP — wysyłanie poczty
          </Row>
          <Row code="587" codeVariant="yellow">
            SMTP (submission) — z uwierzytelnianiem
          </Row>
          <Row code="143/993" codeVariant="yellow">
            IMAP — odbieranie poczty (/ z TLS)
          </Row>
          <Row code="110/995" codeVariant="yellow">
            POP3 — odbieranie poczty (/ z TLS)
          </Row>
          <Row code="21" codeVariant="yellow">
            FTP — transfer plików
          </Row>
          <Row code="3306" codeVariant="yellow">
            MySQL / MariaDB
          </Row>
          <Row code="5432" codeVariant="yellow">
            PostgreSQL
          </Row>
          <Row code="6379" codeVariant="yellow">
            Redis
          </Row>
          <Row code="8080" codeVariant="yellow">
            Alternatywny HTTP (proxy, dev)
          </Row>
        </Card>

        <Card title="Diagnostyka sieci" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Sprawdz połączenie z hostem (ICMP)</Comment>
            <Cmd>
              ping <H>-c 4</H> <V>google.com</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Śledzenie trasy pakietów</Comment>
            <Cmd>
              traceroute <V>google.com</V>
            </Cmd>
            <Cmd>
              tracepath <V>google.com</V>{' '}
              <span className="text-[var(--c-muted)]"># nie wymaga root</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Sprawdz czas odpowiedzi HTTP</Comment>
            <Cmd>
              curl <H>-o /dev/null -s -w</H>{' '}
              <V>
                {'"'}%{'{time_total}'}
                {'"'}
              </V>{' '}
              <F>https://example.com</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Pobierz nagłówki HTTP</Comment>
            <Cmd>
              curl <H>-I</H> <V>https://example.com</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Sprawdz czy port jest otwarty</Comment>
            <Cmd>
              nc <H>-zv</H> <V>example.com</V> <F>443</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Pobierz plik</Comment>
            <Cmd>
              wget <V>https://example.com/file.tar.gz</V>
            </Cmd>
            <Cmd>
              curl <H>-O</H> <V>https://example.com/file.tar.gz</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>ping</b> używa ICMP — niektórzy hostowie blokują ICMP. Brak
            odpowiedzi =/= host nie działa.
          </InfoBox>
        </Card>

        <Card title="Konfiguracja IP" color="var(--c-purple)">
          <SectionLabel>Podgląd interfejsow</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Pokaż adresy IP</Comment>
            <Cmd>
              ip <H>addr</H> show
            </Cmd>
            <Cmd>
              ip <H>a</H> <span className="text-[var(--c-muted)]"># skrót</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Tylko IPv4</Comment>
            <Cmd>
              ip <H>-4</H> addr show
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Starsza komenda (deprecated)</Comment>
            <Cmd>ifconfig</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Routing</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Pokaż tablice routingu</Comment>
            <Cmd>
              ip <H>route</H> show
            </Cmd>
            <Cmd>
              ip <H>r</H> <span className="text-[var(--c-muted)]"># skrót</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Domyślna brama</Comment>
            <Cmd>
              ip route | grep <H>default</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Hostname</SectionLabel>
          <ExampleBlock>
            <Comment># Pokaż/ustaw nazwe hosta</Comment>
            <Cmd>hostname</Cmd>
            <Cmd>
              hostnamectl <H>set-hostname</H> <V>web-server-01</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="DNS" color="var(--c-orange)">
          <SectionLabel>Pliki konfiguracyjne</SectionLabel>
          <Row code="/etc/resolv.conf" codeVariant="orange">
            Serwery DNS (nameserver 8.8.8.8)
          </Row>
          <Row code="/etc/hosts" codeVariant="orange">
            Lokalne mapowanie nazw (nadpisuje DNS)
          </Row>
          <Row code="/etc/nsswitch.conf" codeVariant="orange">
            Kolejność rozwiazywania nazw
          </Row>
          <Divider />
          <SectionLabel className="mt-1.5">Narzędzia DNS</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Zapytanie DNS (szczegółowe)</Comment>
            <Cmd>
              dig <V>example.com</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Tylko adres IP</Comment>
            <Cmd>
              dig <H>+short</H> <V>example.com</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Rekord MX (poczta)</Comment>
            <Cmd>
              dig <H>MX</H> <V>example.com</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Rekord TXT (SPF, DKIM, weryfikacja)</Comment>
            <Cmd>
              dig <H>TXT</H> <V>example.com</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Użyj konkretnego serwera DNS</Comment>
            <Cmd>
              dig <V>example.com</V> <H>@8.8.8.8</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Proste zapytanie (przestarzale, ale popularne)</Comment>
            <Cmd>
              nslookup <V>example.com</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Reverse DNS — IP na nazwe</Comment>
            <Cmd>
              dig <H>-x</H> <V>8.8.8.8</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Kolejność resolwingu: <b>/etc/hosts</b> → <b>DNS cache</b> →{' '}
            <b>/etc/resolv.conf</b> (serwer DNS).
          </InfoBox>
        </Card>

        <Card title="ss / netstat — otwarte porty" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            <code className="text-xs">ss</code> zastepuje{' '}
            <code className="text-xs">netstat</code>. Szybszy i nowszy.
          </p>
          <ExampleBlock variant="green">
            <Comment># Pokaż nasłuchujące porty TCP</Comment>
            <Cmd>
              ss <H>-tlnp</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Pokaż nasłuchujące porty UDP</Comment>
            <Cmd>
              ss <H>-ulnp</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Wszystkie połączenia TCP</Comment>
            <Cmd>
              ss <H>-tanp</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Filtruj po porcie</Comment>
            <Cmd>
              ss <H>-tlnp</H> sport = <V>:443</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="-t" codeVariant="green">
            TCP
          </Row>
          <Row code="-u" codeVariant="green">
            UDP
          </Row>
          <Row code="-l" codeVariant="green">
            tylko nasłuchujące (listening)
          </Row>
          <Row code="-n" codeVariant="green">
            numery portow (bez resolwowania nazw)
          </Row>
          <Row code="-p" codeVariant="green">
            pokaż proces (PID/nazwa)
          </Row>
          <Row code="-a" codeVariant="green">
            wszystkie połączenia
          </Row>
          <Divider />
          <SectionLabel className="mt-1.5">netstat (starszy)</SectionLabel>
          <ExampleBlock>
            <Comment># Odpowiednik ss -tlnp</Comment>
            <Cmd>
              netstat <H>-tlnp</H>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="iptables — firewall" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Filtrowanie pakietów w jądrze Linux. 3 główne łańcuchy.
          </p>
          <Concept title="INPUT" color="var(--c-orange)">
            Pakiety przychodzące DO hosta.
          </Concept>
          <Concept title="OUTPUT" color="var(--c-green)">
            Pakiety wychodzące Z hosta.
          </Concept>
          <Concept title="FORWARD" color="var(--c-purple)">
            Pakiety przechodzące PRZEZ hosta (routing).
          </Concept>
          <Divider />
          <ExampleBlock variant="orange">
            <Comment># Pokaż aktualne reguły</Comment>
            <Cmd>
              iptables <H>-L -n -v</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Zezwól na SSH (port 22)</Comment>
            <Cmd>
              iptables <H>-A INPUT</H> <V>-p tcp --dport 22</V> <F>-j ACCEPT</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Zezwól na HTTP/HTTPS</Comment>
            <Cmd>
              iptables -A INPUT <V>-p tcp --dport 80</V> -j ACCEPT
            </Cmd>
            <Cmd>
              iptables -A INPUT <V>-p tcp --dport 443</V> -j ACCEPT
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Zablokuj cały ruch przychodzacy (domyślnie)</Comment>
            <Cmd>
              iptables <H>-P INPUT DROP</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Zezwól na nawiązane połączenia</Comment>
            <Cmd>
              iptables -A INPUT <H>-m state --state ESTABLISHED,RELATED</H> -j
              ACCEPT
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Zapisz reguły (Debian/Ubuntu)</Comment>
            <Cmd>
              iptables-save {' > '} <F>/etc/iptables/rules.v4</F>
            </Cmd>
          </ExampleBlock>
          <InfoBox warn>
            Kolejność reguł ma znaczenie! Pierwsza pasująca reguła wygrywa.
            Zawsze zezwól na SSH <b>przed</b> DROP.
          </InfoBox>
        </Card>

        <Card title="tcpdump / Wireshark" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Przechwytywanie i analiza pakietów sieciowych.
          </p>
          <SectionLabel>tcpdump (CLI)</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Przechwytuj pakiety na interfejsie eth0</Comment>
            <Cmd>
              tcpdump <H>-i eth0</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Filtruj po hoście</Comment>
            <Cmd>
              tcpdump <H>-i eth0</H> host <V>192.168.1.1</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Filtruj po porcie</Comment>
            <Cmd>
              tcpdump <H>-i eth0</H> port <V>80</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Tylko ruch DNS</Comment>
            <Cmd>
              tcpdump <H>-i any</H> port <V>53</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Zapisz do pliku .pcap</Comment>
            <Cmd>
              tcpdump <H>-i eth0 -w</H> <F>capture.pcap</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Odczytaj plik .pcap</Comment>
            <Cmd>
              tcpdump <H>-r</H> <F>capture.pcap</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Pokaż zawartość pakietów (ASCII)</Comment>
            <Cmd>
              tcpdump <H>-A -i eth0</H> port <V>80</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Wireshark</SectionLabel>
          <InfoBox>
            Wireshark = GUI do analizy pakietów. Otwiera pliki{' '}
            <code className="text-xs">.pcap</code> z tcpdump. Filtry:{' '}
            <code className="text-xs">http</code>,{' '}
            <code className="text-xs">tcp.port == 443</code>,{' '}
            <code className="text-xs">dns</code>.
          </InfoBox>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/cheatsheets/git', label: 'Git Commands' }}
        next={{ to: '/cheatsheets/systemd', label: 'Systemd' }}
      />
    </div>
  );
}
