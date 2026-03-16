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

export default function NetworkTools() {
  usePageTitle('Narzędzia sieciowe');

  return (
    <div>
      <PageHeader
        title="Narzędzia sieciowe"
        subtitle="curl · ngrok · Postman · mitmproxy · Wireshark · httpie"
        color="var(--c-purple)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="curl — uniwersalne narzędzie" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Potężny instrument do pracy z protokołami sieciowymi. Szwajcarski
            scyzoryk dla HTTP.
          </p>
          <SectionLabel>Podstawowe użycie</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Proste zapytanie GET</Comment>
            <Cmd>
              curl <V>https://api.example.com/users</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># GET z dodatkowymi informacjami (verbose)</Comment>
            <Cmd>
              curl <H>-v</H> <V>https://api.example.com/users</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Tylko nagłówki odpowiedzi</Comment>
            <Cmd>
              curl <H>-I</H> <V>https://example.com</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Praca z nagłówkami</SectionLabel>
          <ExampleBlock>
            <Comment># Dodaj nagłówek Authorization</Comment>
            <Cmd>
              curl <H>-H</H> <V>"Authorization: Bearer token123"</V> \
            </Cmd>
            <Cmd> https://api.example.com/protected</Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Wiele nagłówków</Comment>
            <Cmd>
              curl <H>-H</H> <V>"Authorization: Bearer token"</V> \
            </Cmd>
            <Cmd>
              {' '}
              <H>-H</H> <V>"Content-Type: application/json"</V> \
            </Cmd>
            <Cmd> https://api.example.com/data</Cmd>
          </ExampleBlock>
        </Card>

        <Card title="curl — Metody HTTP" color="var(--c-orange)">
          <SectionLabel>POST — wysyłanie danych</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># POST z danymi JSON</Comment>
            <Cmd>
              curl <H>-X POST</H> \
            </Cmd>
            <Cmd>
              {' '}
              <H>-H</H> <V>"Content-Type: application/json"</V> \
            </Cmd>
            <Cmd>
              {' '}
              <H>-d</H> <V>'{`{"name":"John","age":30}`}'</V> \
            </Cmd>
            <Cmd> https://api.example.com/users</Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># POST z danymi z pliku</Comment>
            <Cmd>
              curl <H>-X POST</H> <H>-d</H> <V>@data.json</V> \
            </Cmd>
            <Cmd>
              {' '}
              <H>-H</H> <V>"Content-Type: application/json"</V> \
            </Cmd>
            <Cmd> https://api.example.com/users</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">PUT / PATCH / DELETE</SectionLabel>
          <ExampleBlock>
            <Comment># PUT — aktualizacja</Comment>
            <Cmd>
              curl <H>-X PUT</H> <H>-d</H> <V>'{`{"name":"Jane"}`}'</V> \
            </Cmd>
            <Cmd> https://api.example.com/users/1</Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># DELETE — usunięcie</Comment>
            <Cmd>
              curl <H>-X DELETE</H> https://api.example.com/users/1
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="curl — Zaawansowane" color="var(--c-yellow)">
          <SectionLabel>Wysyłanie plików</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Upload pliku (multipart/form-data)</Comment>
            <Cmd>
              curl <H>-F</H> <V>"file=@document.pdf"</V> \
            </Cmd>
            <Cmd>
              {' '}
              <H>-F</H> <V>"description=Important file"</V> \
            </Cmd>
            <Cmd> https://api.example.com/upload</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Pobieranie plików</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Zapisz jako plik (zachowaj nazwę)</Comment>
            <Cmd>
              curl <H>-O</H> https://example.com/file.tar.gz
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Zapisz pod inną nazwą</Comment>
            <Cmd>
              curl <H>-o</H> <F>myfile.tar.gz</F>{' '}
              https://example.com/file.tar.gz
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Mierzenie wydajności</SectionLabel>
          <ExampleBlock>
            <Comment># Zmierz czas odpowiedzi</Comment>
            <Cmd>
              curl <H>-o /dev/null -s -w</H>{' '}
              <V>
                '%{'{'}time_total{'}'}\n'
              </V>{' '}
              \
            </Cmd>
            <Cmd> https://example.com</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Obsługa błędów</SectionLabel>
          <ExampleBlock>
            <Comment># Pokaż błędy, ukryj progress bar</Comment>
            <Cmd>
              curl <H>-sS</H> https://api.example.com
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Zwróć kod błędu przy niepowodzeniu</Comment>
            <Cmd>
              curl <H>-f</H> https://example.com/404
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="ngrok — tunel do internetu" color="var(--c-blue)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Rozwiązuje problem: "Jak pokazać moją lokalną aplikację koledze z
            innego miasta?"
          </p>
          <InfoBox>
            ngrok tworzy bezpieczny tunel między Twoim localhost a publicznym
            URL w internecie.
          </InfoBox>
          <Divider />
          <SectionLabel className="mt-1.5">Podstawowe użycie</SectionLabel>
          <ExampleBlock variant="blue">
            <Comment># Udostępnij localhost:3000 w internecie</Comment>
            <Cmd>
              ngrok http <V>3000</V>
            </Cmd>
            <Comment># Otrzymasz URL:</Comment>
            <Comment># https://92832de0.ngrok.io -{'>'} localhost:3000</Comment>
          </ExampleBlock>
          <ExampleBlock variant="blue">
            <Comment># Udostępnij inny port</Comment>
            <Cmd>
              ngrok http <V>8080</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Zaawansowane opcje</SectionLabel>
          <ExampleBlock>
            <Comment># Z ochroną hasłem</Comment>
            <Cmd>
              ngrok http <V>3000</V> <H>--basic-auth</H> <V>"user:password"</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Własna subdomena (wymaga płatnego planu)</Comment>
            <Cmd>
              ngrok http <V>3000</V> <H>--subdomain</H> <V>myapp</V>
            </Cmd>
            <Comment># Otrzymasz: https://myapp.ngrok.io</Comment>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># HTTPS na localhost (przydatne do testów SSL)</Comment>
            <Cmd>
              ngrok http <V>https://localhost:3000</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Inspektor zapytań</SectionLabel>
          <InfoBox>
            Otwórz <code className="text-xs">http://localhost:4040</code> w
            przeglądarce, aby zobaczyć wszystkie zapytania przychodzące przez
            tunel ngrok!
          </InfoBox>
        </Card>

        <Card title="Postman — GUI do testowania API">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Wizualna praca z API — od prostych testów do złożonych workflow.
          </p>
          <Concept title="Kolekcje zapytań" color="var(--c-green)">
            Organizuj i strukturyzuj wywołania API w grupy.
          </Concept>
          <Concept title="Zmienne środowiskowe" color="var(--c-yellow)">
            Łatwe przełączanie między dev/staging/prod.
          </Concept>
          <Concept title="Automatyczne testy" color="var(--c-orange)">
            Weryfikacja odpowiedzi API za pomocą skryptów JavaScript.
          </Concept>
          <Concept title="Mocki i przykłady" color="var(--c-purple)">
            Praca bez prawdziwego backendu — symuluj odpowiedzi.
          </Concept>
          <Divider />
          <SectionLabel className="mt-1.5">
            Przykład testu w Postman
          </SectionLabel>
          <ExampleBlock>
            <Comment>// Tests tab w Postman</Comment>
            <Cmd>pm.test("Status code is 200", () =&gt; {'{'}</Cmd>
            <Cmd> pm.response.to.have.status(200);</Cmd>
            <Cmd>{'}'});</Cmd>
            <Cmd></Cmd>
            <Cmd>pm.test("Response has user", () =&gt; {'{'}</Cmd>
            <Cmd> const json = pm.response.json();</Cmd>
            <Cmd> pm.expect(json).to.have.property('user');</Cmd>
            <Cmd>{'}'});</Cmd>
          </ExampleBlock>
        </Card>

        <Card title="mitmproxy — analiza ruchu HTTPS" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            "Człowiek pośrodku" — przeglądaj i modyfikuj ruch HTTP/HTTPS w
            czasie rzeczywistym.
          </p>
          <SectionLabel>Tryby pracy</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Tryb interaktywny (TUI)</Comment>
            <Cmd>mitmproxy</Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Interfejs webowy (GUI w przeglądarce)</Comment>
            <Cmd>mitmweb</Cmd>
            <Comment># Otwórz http://localhost:8081</Comment>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Tryb konsolowy (zapis do pliku)</Comment>
            <Cmd>
              mitmdump <H>-w</H> <F>traffic.flows</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Zastosowania</SectionLabel>
          <ul className="list-disc list-inside text-xs space-y-1 text-[var(--c-muted)]">
            <li>Debugowanie aplikacji mobilnych</li>
            <li>Analiza interakcji z API</li>
            <li>Modyfikacja zapytań "na żywo"</li>
            <li>Automatyzacja testów</li>
            <li>Reverse engineering API</li>
          </ul>
          <Divider />
          <ExampleBlock>
            <Comment># Filtrowanie ruchu (tylko Google)</Comment>
            <Cmd>
              mitmproxy <H>--set</H> <V>filter='~d google.com'</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Nasłuchuj na innym porcie</Comment>
            <Cmd>
              mitmproxy <H>-p</H> <V>8888</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Wireshark — analiza pakietów" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Najpotężniejsze narzędzie do analizy ruchu sieciowego na poziomie
            pakietów.
          </p>
          <Concept title="Przechwytywanie na żywo" color="var(--c-green)">
            Wybierz interfejs sieciowy i natychmiast przeglądaj ruch.
          </Concept>
          <Concept title="Głęboka analiza" color="var(--c-blue)">
            Zobacz każdy bajt przesłany przez sieć — warstwy OSI, protokoły,
            payload.
          </Concept>
          <Divider />
          <SectionLabel className="mt-1.5">
            Przydatne filtry Wireshark
          </SectionLabel>
          <Row code="http" codeVariant="purple">
            Pokaż tylko ruch HTTP
          </Row>
          <Row code="tcp.port == 443" codeVariant="purple">
            Filtruj po porcie TCP
          </Row>
          <Row code="ip.addr == 192.168.1.1" codeVariant="purple">
            Filtruj po adresie IP
          </Row>
          <Row code="dns" codeVariant="purple">
            Pokaż tylko zapytania DNS
          </Row>
          <Row code="http.request.method == POST" codeVariant="purple">
            Tylko requesty POST
          </Row>
          <Row code="tls.handshake.type == 1" codeVariant="purple">
            SSL/TLS handshake
          </Row>
          <Divider />
          <InfoBox>
            Wireshark otwiera pliki <code className="text-xs">.pcap</code> z
            tcpdump!
          </InfoBox>
        </Card>

        <Card
          title="httpie — nowoczesna alternatywa curl"
          color="var(--c-green)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Prostsze składnia, kolorowe output, JSON domyślnie. Przyjazne dla
            człowieka.
          </p>
          <SectionLabel>Instalacja</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># macOS</Comment>
            <Cmd>brew install httpie</Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Linux</Comment>
            <Cmd>apt install httpie</Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># pip</Comment>
            <Cmd>pip install httpie</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Podstawowe użycie</SectionLabel>
          <ExampleBlock>
            <Comment># Proste GET</Comment>
            <Cmd>
              http <V>https://api.example.com/users</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># POST z JSON (domyślnie!)</Comment>
            <Cmd>
              http <H>POST</H> <V>https://api.example.com/users</V> \
            </Cmd>
            <Cmd>
              {' '}
              <F>name=John</F> <F>age:=30</F>
            </Cmd>
            <Comment># := dla liczb/bool, = dla stringów</Comment>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Nagłówki</Comment>
            <Cmd>
              http <V>https://api.example.com/protected</V> \
            </Cmd>
            <Cmd>
              {' '}
              <H>Authorization:</H>
              <V>'Bearer token123'</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Pobierz plik</Comment>
            <Cmd>
              http <H>--download</H> <V>https://example.com/file.zip</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="ab / siege — testy obciążeniowe" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Narzędzia do testowania wydajności serwerów pod obciążeniem.
          </p>
          <SectionLabel>Apache Bench (ab)</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># 1000 requestów, 10 jednocześnie</Comment>
            <Cmd>
              ab <H>-n 1000 -c 10</H> <V>https://example.com/</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Z nagłówkami</Comment>
            <Cmd>
              ab <H>-n 100 -c 10</H> \
            </Cmd>
            <Cmd>
              {' '}
              <H>-H</H> <V>"Authorization: Bearer token"</V> \
            </Cmd>
            <Cmd> https://api.example.com/endpoint</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Siege</SectionLabel>
          <ExampleBlock>
            <Comment># 10 jednoczesnych użytkowników przez 30 sekund</Comment>
            <Cmd>
              siege <H>-c 10 -t 30s</H> <V>https://example.com</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Z listą URL z pliku</Comment>
            <Cmd>
              siege <H>-c 25 -t 1m -f</H> <F>urls.txt</F>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Używaj odpowiedzialnie! Testy obciążeniowe mogą być uznane za atak
            DDoS na cudzych serwerach.
          </InfoBox>
        </Card>

        <Card title="nc (netcat) — szwajcarski scyzoryk TCP/UDP">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Uniwersalne narzędzie do ręcznej pracy z socketami TCP/UDP.
          </p>
          <SectionLabel>Testowanie portów</SectionLabel>
          <ExampleBlock>
            <Comment># Sprawdź czy port jest otwarty</Comment>
            <Cmd>
              nc <H>-zv</H> <V>example.com</V> <F>443</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Skanuj zakres portów</Comment>
            <Cmd>
              nc <H>-zv</H> <V>example.com</V> <F>20-80</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Serwer / Klient TCP</SectionLabel>
          <ExampleBlock>
            <Comment># Nasłuchuj na porcie 9999 (serwer)</Comment>
            <Cmd>
              nc <H>-l</H> <V>9999</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Połącz się z serwerem (klient)</Comment>
            <Cmd>
              nc <V>localhost</V> <F>9999</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Transfer plików</SectionLabel>
          <ExampleBlock>
            <Comment># Odbierz plik (serwer)</Comment>
            <Cmd>
              nc <H>-l</H> <V>9999</V> {'>'} received_file.txt
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Wyślij plik (klient)</Comment>
            <Cmd>
              nc <V>hostname</V> <F>9999</F> {'<'} file.txt
            </Cmd>
          </ExampleBlock>
          <Divider />
          <InfoBox>
            nc jest przydatne do debugowania niskopoziomowych problemów
            sieciowych.
          </InfoBox>
        </Card>

        <Card title="nmap — skanowanie portów" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Profesjonalne narzędzie do mapowania sieci i audytów bezpieczeństwa.
          </p>
          <ExampleBlock variant="orange">
            <Comment># Proste skanowanie hosta</Comment>
            <Cmd>
              nmap <V>example.com</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Skanuj konkretne porty</Comment>
            <Cmd>
              nmap <H>-p</H> <V>80,443,22</V> example.com
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Skanuj zakres portów</Comment>
            <Cmd>
              nmap <H>-p</H> <V>1-1000</V> example.com
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Wykryj system operacyjny i wersje usług</Comment>
            <Cmd>
              nmap <H>-A</H> example.com
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Szybkie skanowanie sieci lokalnej</Comment>
            <Cmd>
              nmap <H>-sn</H> <V>192.168.1.0/24</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox warn>
            Skanowanie portów może być nielegalne bez zgody właściciela systemu.
            Używaj tylko na własnych systemach!
          </InfoBox>
        </Card>

        <Card
          title="Charles Proxy — profesjonalna analiza"
          color="var(--c-purple)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Graficzny interfejs do analizy ruchu HTTP/HTTPS. Szczególnie
            przydatny dla mobilnych aplikacji.
          </p>
          <Concept title="Debugowanie SSL/HTTPS" color="var(--c-green)">
            Instaluj certyfikat Charles na urządzeniu mobilnym i przeglądaj
            szyfrowany ruch.
          </Concept>
          <Concept title="Modyfikowanie zapytań" color="var(--c-yellow)">
            Breakpointy na zapytaniach — edytuj request/response przed
            wysłaniem.
          </Concept>
          <Concept title="Throttling" color="var(--c-orange)">
            Symuluj wolne połączenie (3G, 4G) do testowania wydajności.
          </Concept>
          <Concept title="Map Local/Remote" color="var(--c-blue)">
            Mapuj zdalne zasoby na lokalne pliki — testuj zmiany bez
            deploymentu.
          </Concept>
          <Divider />
          <InfoBox>
            Charles jest płatny (trial 30 dni). Alternatywy: Fiddler (Windows),
            mitmproxy (open-source).
          </InfoBox>
        </Card>
      </div>

      <LessonNav
        prev={{
          to: '/cheatsheets/networking-basics',
          label: 'Networking Basics',
        }}
        next={{ to: '/cheatsheets/docker', label: 'Docker Basics' }}
      />
    </div>
  );
}
