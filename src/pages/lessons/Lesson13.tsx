import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Concept from '../../components/Concept';
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
import LessonNav from '../../components/LessonNav';

export default function Lesson13() {
  usePageTitle('Lekcja 13 — Serwery WWW');

  return (
    <div>
      <PageHeader
        title="Lekcja 13 — Serwery WWW: Nginx, Apache, Reverse Proxy"
        subtitle="HTTP · instalacja · konfiguracja · virtual hosts · reverse proxy · logi · debugging"
        color="var(--c-blue)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === Cele lekcji === */}
        <Card title="Cele lekcji" color="var(--c-blue)">
          <Concept title="Co sie nauczysz?" color="var(--c-blue)">
            Jak dziala serwer WWW, protokol HTTP, jak zainstalowac i
            skonfigurowac Nginx i Apache, jak zbudowac architekture{' '}
            <b>reverse proxy</b> i jak diagnozowac problemy produkcyjne.
          </Concept>
          <Divider />
          <Row code="1">
            <b>Koncepcja</b> serwera WWW i protokolu HTTP
          </Row>
          <Row code="2">
            <b>Nginx</b> — instalacja i konfiguracja od zera
          </Row>
          <Row code="3">
            <b>Apache</b> — drugi najpopularniejszy serwer WWW
          </Row>
          <Row code="4">
            <b>Virtual hosts</b> — wiele domen na jednej maszynie
          </Row>
          <Row code="5">
            <b>Reverse proxy</b> — Nginx jako frontend dla Apache
          </Row>
          <Row code="6">
            <b>Analiza logow</b> i najczestsze bledy
          </Row>
        </Card>

        {/* === Jak dziala HTTP === */}
        <Card title="Jak dziala HTTP?" color="var(--c-purple)">
          <Concept title="Model zadanie-odpowiedz" color="var(--c-purple)">
            HTTP (HyperText Transfer Protocol) to protokol warstwy aplikacji.
            Klient wysyla <b>zadanie</b>, serwer zwraca <b>odpowiedz</b>.
          </Concept>
          <Divider />
          <SectionLabel>Przykladowe zadanie</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              <H>GET</H> /index.html HTTP/1.1
            </Cmd>
            <Cmd>Host: example.com</Cmd>
            <Cmd>User-Agent: Mozilla/5.0</Cmd>
          </ExampleBlock>
          <SectionLabel>Odpowiedz serwera</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              HTTP/1.1 <V>200</V> OK
            </Cmd>
            <Cmd>Content-Type: text/html</Cmd>
            <Cmd>Content-Length: 1234</Cmd>
            <Cmd> </Cmd>
            <Cmd>&lt;html&gt;...&lt;/html&gt;</Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="GET">pobierz zasob</Row>
          <Row code="POST">wyslij dane (formularz)</Row>
          <Row code="PUT">zaktualizuj zasob</Row>
          <Row code="DELETE">usun zasob</Row>
          <Row code="200">OK</Row>
          <Row code="404">Not Found</Row>
          <Row code="500">Internal Server Error</Row>
          <Row code="502">Bad Gateway (proxy)</Row>
        </Card>

        {/* === Porty i nasluchiwanie === */}
        <Card title="Porty i nasluchiwanie" color="var(--c-orange)">
          <Concept title="Gdzie sluchaja serwery?" color="var(--c-orange)">
            Serwer WWW <b>nasluchuje</b> na porcie sieciowym i przyjmuje
            polaczenia od klientow.
          </Concept>
          <Divider />
          <Row code="80">HTTP — niezaszyfrowany</Row>
          <Row code="443">HTTPS — zaszyfrowany (SSL/TLS)</Row>
          <Row code="8080">czesto backend/dev serwer</Row>
          <Row code="8000">alternatywny dev (np. python -m http.server)</Row>
          <Divider />
          <SectionLabel>Sprawdzenie, kto nasluchuje</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>
              <H>sudo</H> ss -tlnp
            </Cmd>
            <Cmd>
              <H>sudo</H> ss -tlnp <V>|</V> grep <V>80</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Dzieki portom na jednej maszynie moze dzialac wiele serwerow — np.
            Nginx na <code className="text-xs">80</code> i Apache na{' '}
            <code className="text-xs">8080</code>.
          </InfoBox>
        </Card>

        {/* === Nginx vs Apache === */}
        <Card title="Nginx vs Apache" color="var(--c-green)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Nginx</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] space-y-1 list-disc pl-4">
                <li>Architektura <b>event-driven</b> (asynchronous)</li>
                <li>Wysoka wydajnosc przy wielu polaczeniach</li>
                <li>Niskie zuzycie pamieci</li>
                <li>Idealny do <b>reverse proxy</b>, plikow statycznych, API</li>
                <li>Bardziej zlozona skladnia konfiguracji</li>
                <li>Moduly: wymaga rebuild przy dodaniu</li>
              </ul>
            </div>
            <div>
              <SectionLabel>Apache (httpd)</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] space-y-1 list-disc pl-4">
                <li>Architektura <b>process/thread per request</b></li>
                <li>Modularny, wszechstronny</li>
                <li>Intuicyjna konfiguracja (<code className="text-xs">.htaccess</code>)</li>
                <li>Idealny dla PHP/monolitow</li>
                <li>Wyzsze zuzycie pamieci przy duzym ruchu</li>
                <li>Moduly: dynamiczne ladowanie bez rebuild</li>
              </ul>
            </div>
          </div>
          <InfoBox>
            <b>W praktyce DevOps:</b> Nginx na froncie jako reverse proxy +
            Apache na backendzie dla aplikacji PHP. Nginx obsluguje SSL, cache
            i pliki statyczne; Apache robi "ciezka" prace.
          </InfoBox>
        </Card>

        {/* === Instalacja Nginx === */}
        <Card title="Instalacja Nginx (Ubuntu/Debian)" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># 1. Aktualizuj liste pakietow</Comment>
            <Cmd>
              <H>sudo</H> apt update
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 2. Zainstaluj Nginx</Comment>
            <Cmd>
              <H>sudo</H> apt install -y nginx
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 3. Status</Comment>
            <Cmd>
              <H>sudo</H> systemctl status nginx
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 4. Autostart przy boot</Comment>
            <Cmd>
              <H>sudo</H> systemctl enable nginx
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Test w przegladarce</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              <F>http://localhost/</F>
            </Cmd>
            <Cmd>
              <F>http://adres-ip-serwera/</F>
            </Cmd>
            <Comment># Powinna pojawic sie strona "Welcome to nginx!"</Comment>
          </ExampleBlock>
          <InfoBox>
            Na Ubuntu Nginx automatycznie startuje i jest wlaczany do{' '}
            <code className="text-xs">autostart</code>.
          </InfoBox>
        </Card>

        {/* === Instalacja Apache === */}
        <Card title="Instalacja Apache (Ubuntu/Debian)" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Cmd>
              <H>sudo</H> apt update
            </Cmd>
            <Cmd>
              <H>sudo</H> apt install -y apache2
            </Cmd>
            <Cmd>
              <H>sudo</H> systemctl start apache2
            </Cmd>
            <Cmd>
              <H>sudo</H> systemctl status apache2
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Gdzie lezy co (Apache)</SectionLabel>
          <Row code="/etc/apache2/apache2.conf">glowny plik</Row>
          <Row code="/etc/apache2/ports.conf">porty nasluchiwania</Row>
          <Row code="/etc/apache2/sites-available/">konfiguracje vhost</Row>
          <Row code="/etc/apache2/sites-enabled/">aktywne vhost</Row>
          <Row code="/var/www/html/">domyslny root strony</Row>
          <Row code="/var/log/apache2/">logi</Row>
          <InfoBox>
            Konflikt portu 80? Apache i Nginx nie moga razem sluchac na tym
            samym porcie. Rozwiazanie: Apache przenies na{' '}
            <code className="text-xs">8080</code>, Nginx zostaw na 80.
          </InfoBox>
        </Card>

        {/* === Struktura konfiguracji Nginx === */}
        <Card
          title="Struktura /etc/nginx/"
          color="var(--c-blue)"
        >
          <ExampleBlock variant="default">
            <Cmd>/etc/nginx/</Cmd>
            <Cmd>├── nginx.conf{'         '}<Comment># glowny plik</Comment></Cmd>
            <Cmd>├── mime.types{'         '}<Comment># MIME types</Comment></Cmd>
            <Cmd>├── conf.d/{'            '}<Comment># dodatki</Comment></Cmd>
            <Cmd>├── sites-available/{'   '}<Comment># konfiguracje vhost</Comment></Cmd>
            <Cmd>│{'   '}├── default</Cmd>
            <Cmd>│{'   '}└── example.com</Cmd>
            <Cmd>└── sites-enabled/{'     '}<Comment># aktywne (symlinki)</Comment></Cmd>
            <Cmd>{'    '}└── example.com -&gt; ../sites-available/example.com</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Workflow vhost</SectionLabel>
          <Row code="1">
            Utworz konfiguracje w{' '}
            <code className="text-xs">sites-available/</code>
          </Row>
          <Row code="2">
            Przetestuj skladnie: <code className="text-xs">sudo nginx -t</code>
          </Row>
          <Row code="3">
            Aktywuj: <code className="text-xs">ln -s</code> do{' '}
            <code className="text-xs">sites-enabled/</code>
          </Row>
          <Row code="4">
            Przeladuj: <code className="text-xs">systemctl reload nginx</code>
          </Row>
        </Card>

        {/* === Konfiguracja Nginx przyklad === */}
        <Card
          title="Przykladowa konfiguracja Nginx"
          color="var(--c-blue)"
          full
        >
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Prosty virtual host serwujacy strone z{' '}
            <code className="text-xs">/var/www/example.com</code>:
          </p>
          <ExampleBlock variant="purple">
            <Cmd>server {'{'}</Cmd>
            <Cmd>
              {'    '}listen <V>80</V>;
              {'                           '}
              <Comment># Port HTTP</Comment>
            </Cmd>
            <Cmd>
              {'    '}server_name example.com www.example.com;
            </Cmd>
            <Cmd>
              {'    '}root <V>/var/www/example.com</V>;
              {'        '}
              <Comment># Katalog strony</Comment>
            </Cmd>
            <Cmd>
              {'    '}index index.html index.htm;
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              {'    '}location / {'{'}
            </Cmd>
            <Cmd>
              {'        '}try_files <V>$uri</V> <V>$uri/</V> =<V>404</V>;
            </Cmd>
            <Cmd>{'    '}{'}'}</Cmd>
            <Cmd> </Cmd>
            <Comment>{'    '}# Obsluga bledow</Comment>
            <Cmd>
              {'    '}error_page <V>404</V> /404.html;
            </Cmd>
            <Cmd>
              {'    '}error_page <V>500 502 503 504</V> /50x.html;
            </Cmd>
            <Cmd> </Cmd>
            <Comment>{'    '}# Logi</Comment>
            <Cmd>
              {'    '}access_log /var/log/nginx/example.access.log;
            </Cmd>
            <Cmd>
              {'    '}error_log /var/log/nginx/example.error.log;
            </Cmd>
            <Cmd>{'}'}</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Aktywacja krok po kroku</SectionLabel>
          <ExampleBlock variant="default">
            <Comment># 1. Zapisz w sites-available/</Comment>
            <Cmd>
              <H>sudo</H> nano /etc/nginx/sites-available/example.com
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 2. Utworz symlink do sites-enabled/</Comment>
            <Cmd>
              <H>sudo</H> ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 3. Sprawdz skladnie</Comment>
            <Cmd>
              <H>sudo</H> nginx -t
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 4. Przeladuj (bez przerwy w dzialaniu)</Comment>
            <Cmd>
              <H>sudo</H> systemctl reload nginx
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>reload vs restart:</b>{' '}
            <code className="text-xs">reload</code> przeladowuje konfiguracje
            graceful (bez przerwy), <code className="text-xs">restart</code>{' '}
            zatrzymuje i uruchamia od nowa (krotka przerwa).
          </InfoBox>
        </Card>

        {/* === Reverse Proxy === */}
        <Card
          title="Reverse Proxy — Nginx + Apache"
          color="var(--c-yellow)"
          full
        >
          <Concept title="Czym jest reverse proxy?" color="var(--c-yellow)">
            Reverse proxy to serwer posredniczacy miedzy <b>klientem</b> a{' '}
            <b>serwerami backendowymi</b>. Odbiera zadania, przekazuje je
            dalej, zwraca odpowiedzi.
          </Concept>
          <Divider />
          <SectionLabel>Architektura</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>Internet (klienci)</Cmd>
            <Cmd>{'       '}│{'  '}port 80/443</Cmd>
            <Cmd>{'       '}▼</Cmd>
            <Cmd>[ Nginx — reverse proxy ]{'   '}<Comment># SSL, cache, static</Comment></Cmd>
            <Cmd>{'       '}│{'  '}port 8080</Cmd>
            <Cmd>{'       '}▼</Cmd>
            <Cmd>[ Apache — backend ]{'         '}<Comment># PHP, app logic</Comment></Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Zalety</SectionLabel>
          <Row code="Bezpieczenstwo">backend ukryty przed internetem</Row>
          <Row code="Wydajnosc">Nginx szybko serwuje statyczne zasoby</Row>
          <Row code="SSL">Nginx obsluguje szyfrowanie na froncie</Row>
          <Row code="Skalowanie">load balancing miedzy wiele backendow</Row>
          <Divider />
          <SectionLabel>Konfiguracja Nginx jako proxy</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Definiujemy backend jako upstream</Comment>
            <Cmd>upstream apache_backend {'{'}</Cmd>
            <Cmd>
              {'    '}server <V>127.0.0.1:8080</V>;
            </Cmd>
            <Cmd>{'}'}</Cmd>
            <Cmd> </Cmd>
            <Cmd>server {'{'}</Cmd>
            <Cmd>
              {'    '}listen <V>80</V>;
            </Cmd>
            <Cmd>
              {'    '}server_name example.com localhost;
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              {'    '}location / {'{'}
            </Cmd>
            <Cmd>
              {'        '}proxy_pass <V>http://apache_backend</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Comment>{'        '}# Oryginalna domena z zadania</Comment>
            <Cmd>
              {'        '}proxy_set_header Host <V>$host</V>;
            </Cmd>
            <Comment>{'        '}# Rzeczywisty adres IP klienta</Comment>
            <Cmd>
              {'        '}proxy_set_header X-Real-IP <V>$remote_addr</V>;
            </Cmd>
            <Comment>{'        '}# Lista IP przez ktore przeszlo zadanie</Comment>
            <Cmd>
              {'        '}proxy_set_header X-Forwarded-For <V>$proxy_add_x_forwarded_for</V>;
            </Cmd>
            <Comment>{'        '}# Oryginalny protokol (http/https)</Comment>
            <Cmd>
              {'        '}proxy_set_header X-Forwarded-Proto <V>$scheme</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Comment>{'        '}# Timeouty</Comment>
            <Cmd>
              {'        '}proxy_connect_timeout <V>60s</V>;
            </Cmd>
            <Cmd>
              {'        '}proxy_read_timeout <V>60s</V>;
            </Cmd>
            <Cmd>{'    '}{'}'}</Cmd>
            <Cmd> </Cmd>
            <Comment>{'    '}# Health check endpoint</Comment>
            <Cmd>
              {'    '}location /health {'{'}
            </Cmd>
            <Cmd>
              {'        '}access_log off;
            </Cmd>
            <Cmd>
              {'        '}return <V>200</V> <V>"healthy\n"</V>;
            </Cmd>
            <Cmd>{'    '}{'}'}</Cmd>
            <Cmd>{'}'}</Cmd>
          </ExampleBlock>
          <InfoBox>
            Nagłowki <code className="text-xs">X-Real-IP</code> i{' '}
            <code className="text-xs">X-Forwarded-For</code> to standard — bez
            nich backend widzi tylko IP Nginx.
          </InfoBox>
        </Card>

        {/* === Load balancing === */}
        <Card title="Load balancing" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Nginx automatycznie rozklada ruch miedzy serwery w bloku{' '}
            <code className="text-xs">upstream</code> (domyslnie round-robin).
          </p>
          <ExampleBlock variant="purple">
            <Cmd>upstream apache_backend {'{'}</Cmd>
            <Cmd>
              {'    '}server <V>127.0.0.1:8080</V>;
            </Cmd>
            <Cmd>
              {'    '}server <V>127.0.0.1:8081</V>;{'  '}
              <Comment># drugi</Comment>
            </Cmd>
            <Cmd>
              {'    '}server <V>127.0.0.1:8082</V>;{'  '}
              <Comment># trzeci</Comment>
            </Cmd>
            <Cmd>{'}'}</Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="weight=3">wieksza waga = wiecej ruchu</Row>
          <Row code="backup">zapasowy, gdy glowny padnie</Row>
          <Row code="max_fails=3">po 3 porazkach wylacz</Row>
          <Row code="fail_timeout=30s">czas blokady</Row>
        </Card>

        {/* === Logi === */}
        <Card title="Logi dostepu i bledow" color="var(--c-green)">
          <SectionLabel>Sciezki logow</SectionLabel>
          <Row code="/var/log/nginx/access.log">logi dostepu</Row>
          <Row code="/var/log/nginx/error.log">logi bledow</Row>
          <Row code="/var/log/apache2/access.log">Apache dostep</Row>
          <Row code="/var/log/apache2/error.log">Apache bledy</Row>
          <Divider />
          <SectionLabel>Przykladowy wpis access.log</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              <V>127.0.0.1</V> - - [30/Mar/2026:10:15:32 +0000]
            </Cmd>
            <Cmd>
              <V>"GET /index.html HTTP/1.1"</V> <V>200</V> 1234
            </Cmd>
            <Cmd>
              <V>"-"</V> <V>"curl/7.68.0"</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Pola</SectionLabel>
          <Row code="$remote_addr">IP klienta</Row>
          <Row code="$time_local">czas zadania</Row>
          <Row code="$request">metoda + sciezka + HTTP</Row>
          <Row code="$status">kod odpowiedzi</Row>
          <Row code="$body_bytes_sent">rozmiar w bajtach</Row>
          <Row code="$http_user_agent">przegladarka/klient</Row>
        </Card>

        {/* === Analiza logow === */}
        <Card title="Analiza logow — grep + awk" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Follow - na biezaco</Comment>
            <Cmd>
              <H>sudo</H> tail -f /var/log/nginx/access.log
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Tylko bledy (4xx, 5xx)</Comment>
            <Cmd>
              <H>sudo</H> grep -E <V>' [45][0-9]{'{2}'} '</V> /var/log/nginx/access.log
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Policz kody statusu</Comment>
            <Cmd>
              <H>sudo</H> awk <V>{"'{print $9}'"}</V> access.log <V>|</V> sort <V>|</V> uniq -c
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Top IP klientow</Comment>
            <Cmd>
              <H>sudo</H> awk <V>{"'{print $1}'"}</V> access.log <V>|</V> sort <V>|</V> uniq -c <V>|</V> sort -rn
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Top zadanych zasobow</Comment>
            <Cmd>
              <H>sudo</H> awk <V>{"'{print $7}'"}</V> access.log <V>|</V> sort <V>|</V> uniq -c <V>|</V> sort -rn
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Logi to Twoj przyjaciel!</b> 99% problemow mozna zdiagnozowac
            tylko z <code className="text-xs">error.log</code>.
          </InfoBox>
        </Card>

        {/* === Bledy i rozwiazania === */}
        <Card
          title="Najczestsze bledy i rozwiazania"
          color="var(--c-accent)"
          full
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>
                Blad skladni — <code className="text-xs">nginx -t</code>
              </SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)] mb-2">
                Nginx nie wystartuje przy bledzie w pliku konfiguracyjnym.
              </p>
              <ExampleBlock variant="default">
                <Comment># ZAWSZE sprawdzaj przed reload!</Comment>
                <Cmd>
                  <H>sudo</H> nginx -t
                </Cmd>
                <Cmd> </Cmd>
                <Comment># Przyklad bledu:</Comment>
                <Cmd>
                  nginx: [emerg] unknown directive <V>"sevrer"</V>
                </Cmd>
                <Cmd>
                  at /etc/nginx/sites-enabled/default:3
                </Cmd>
              </ExampleBlock>
            </div>

            <div>
              <SectionLabel>502 Bad Gateway</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)] mb-2">
                Nginx jako proxy nie moze polaczyc sie z backendem.
              </p>
              <ExampleBlock variant="default">
                <Comment># 1. Czy backend dziala?</Comment>
                <Cmd>
                  <H>sudo</H> systemctl status apache2
                </Cmd>
                <Cmd> </Cmd>
                <Comment># 2. Czy sluchaja na porcie?</Comment>
                <Cmd>
                  <H>sudo</H> ss -tlnp <V>|</V> grep <V>8080</V>
                </Cmd>
                <Cmd> </Cmd>
                <Comment># 3. Test bezposredni</Comment>
                <Cmd>curl http://127.0.0.1:8080</Cmd>
              </ExampleBlock>
            </div>

            <div>
              <SectionLabel>Wyswietla domyslna strone Nginx</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)] mb-2">
                Prawdopodobnie plik <code className="text-xs">default</code> w{' '}
                <code className="text-xs">sites-enabled/</code> zlapal zadanie
                jako fallback.
              </p>
              <ExampleBlock variant="default">
                <Cmd>
                  <H>ls</H> -la /etc/nginx/sites-enabled/
                </Cmd>
                <Cmd>
                  <H>sudo</H> rm /etc/nginx/sites-enabled/default
                </Cmd>
                <Cmd>
                  <H>sudo</H> systemctl reload nginx
                </Cmd>
              </ExampleBlock>
            </div>

            <div>
              <SectionLabel>
                Apache: AH00558 — fully qualified domain
              </SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)] mb-2">
                Apache nie zna nazwy domenowej. Niekrytyczne, ale warto
                naprawic.
              </p>
              <ExampleBlock variant="default">
                <Cmd>
                  echo <V>"ServerName localhost"</V> <V>|</V> <H>sudo</H> tee /etc/apache2/conf-available/servername.conf
                </Cmd>
                <Cmd>
                  <H>sudo</H> a2enconf servername
                </Cmd>
                <Cmd>
                  <H>sudo</H> systemctl reload apache2
                </Cmd>
              </ExampleBlock>
            </div>
          </div>
        </Card>

        {/* === Szybkie polecenia diagnostyczne === */}
        <Card
          title="Diagnostyka — szybkie polecenia"
          color="var(--c-purple)"
        >
          <ExampleBlock variant="purple">
            <Comment># 1. Logi bledow - ZAWSZE tutaj zaczynaj</Comment>
            <Cmd>
              <H>sudo</H> tail -20 /var/log/nginx/error.log
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 2. Status serwera</Comment>
            <Cmd>
              <H>sudo</H> systemctl status nginx apache2
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 3. Skladnia konfiguracji</Comment>
            <Cmd>
              <H>sudo</H> nginx -t
            </Cmd>
            <Cmd>
              <H>sudo</H> apache2ctl -t
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 4. Co nasluchuje</Comment>
            <Cmd>
              <H>sudo</H> ss -tlnp <V>|</V> grep -E <V>'nginx|apache'</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 5. Testy HTTP</Comment>
            <Cmd>curl -v http://localhost</Cmd>
            <Cmd>
              curl -I http://localhost{'   '}
              <Comment># tylko naglowki</Comment>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Slownik pojec === */}
        <Card title="Slownik pojec" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <SectionLabel>Serwer WWW</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Program obslugujacy zadania HTTP i zwracajacy odpowiedzi
                (strony, obrazy, API).
              </p>
            </div>
            <div>
              <SectionLabel>Virtual host (vhost)</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Konfiguracja pozwalajaca na obsluge wielu domen z jednej
                maszyny. Kazdy vhost ma swoj <code className="text-xs">root</code>.
              </p>
            </div>
            <div>
              <SectionLabel>Reverse proxy</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Serwer posredniczacy. Klient laczy sie z nim, a on przekazuje
                zadanie do backendu i zwraca odpowiedz.
              </p>
            </div>
            <div>
              <SectionLabel>Upstream</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Blok Nginx definiujacy serwery backendowe dla{' '}
                <code className="text-xs">proxy_pass</code>.
              </p>
            </div>
            <div>
              <SectionLabel>Dyrektywa</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Pojedyncza instrukcja w konfiguracji, np.{' '}
                <code className="text-xs">listen 80;</code> lub{' '}
                <code className="text-xs">root /var/www/html;</code>
              </p>
            </div>
            <div>
              <SectionLabel>Access / Error log</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                <code className="text-xs">access.log</code> — kazde zadanie.{' '}
                <code className="text-xs">error.log</code> — bledy i
                ostrzezenia.
              </p>
            </div>
          </div>
        </Card>

        {/* === Kryteria oceny === */}
        <Card title="Kryteria oceny lekcji" color="var(--c-accent)">
          <Row code="1">
            Zainstalowany Nginx i Apache, uruchomione jako{' '}
            <code className="text-xs">active (running)</code>
          </Row>
          <Row code="2">
            Utworzony wlasny virtual host z plikiem HTML w{' '}
            <code className="text-xs">/var/www/</code>
          </Row>
          <Row code="3">
            Nginx dziala jako reverse proxy dla Apache na porcie 8080
          </Row>
          <Row code="4">
            Skonfigurowany <code className="text-xs">/health</code> endpoint
          </Row>
          <Row code="5">
            Umiejetnosc czytania{' '}
            <code className="text-xs">access.log</code> i{' '}
            <code className="text-xs">error.log</code>
          </Row>
        </Card>

        {/* === Dokumentacja === */}
        <Card title="Oficjalna dokumentacja" color="var(--c-purple)">
          <SectionLabel>Nginx</SectionLabel>
          <ul className="text-[11px] text-[var(--c-muted)] space-y-1 mt-1">
            <li>
              <a
                href="https://nginx.org/en/docs/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Nginx Official Docs
              </a>
            </li>
            <li>
              <a
                href="https://nginx.org/en/docs/beginners_guide.html"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Beginner's Guide
              </a>
            </li>
            <li>
              <a
                href="https://nginx.org/en/docs/http/ngx_http_proxy_module.html"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                ngx_http_proxy_module
              </a>
            </li>
          </ul>
          <Divider />
          <SectionLabel>Apache</SectionLabel>
          <ul className="text-[11px] text-[var(--c-muted)] space-y-1 mt-1">
            <li>
              <a
                href="https://httpd.apache.org/docs/2.4/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Apache 2.4 Documentation
              </a>
            </li>
            <li>
              <a
                href="https://httpd.apache.org/docs/2.4/vhosts/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Virtual Hosts
              </a>
            </li>
          </ul>
          <Divider />
          <SectionLabel>Protokol HTTP</SectionLabel>
          <ul className="text-[11px] text-[var(--c-muted)] space-y-1 mt-1">
            <li>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                MDN — HTTP
              </a>
            </li>
            <li>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                HTTP Status Codes
              </a>
            </li>
          </ul>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/12', label: '12 — Bash w praktyce' }}
        next={{ to: '/homework/13', label: 'Homework 13' }}
      />
    </div>
  );
}