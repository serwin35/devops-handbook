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

export default function Lesson14() {
  usePageTitle('Lekcja 14 — Testowanie serwerow WWW');

  return (
    <div>
      <PageHeader
        title="Lekcja 14 — Testowanie wydajnosci serwerow WWW"
        subtitle="JMeter · testy obciazeniowe · scenariusze · analiza wynikow"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === Cele lekcji === */}
        <Card title="Cele lekcji" color="var(--c-green)">
          <Concept title="Co poznasz?" color="var(--c-green)">
            Jak symulowac realne obciazenie serwera WWW, jakie narzedzia sluza
            do tego w branzy, jak instalowac i konfigurowac <b>Apache JMeter</b>{' '}
            oraz jak czytac wyniki testow.
          </Concept>
          <Divider />
          <Row code="1">Po co testujemy wydajnosc serwerow WWW</Row>
          <Row code="2">Przeglad narzedzi: JMeter, Siege, Gatling, k6</Row>
          <Row code="3">Instalacja JMeter (JDK + binarka)</Row>
          <Row code="4">
            Budowa Test Plan: Thread Group + Sampler + Listener
          </Row>
          <Row code="5">Test logowania z CSV Data Set Config</Row>
          <Row code="6">Analiza wynikow i optymalizacja</Row>
        </Card>

        {/* === Po co testujemy === */}
        <Card title="Po co testowac wydajnosc?" color="var(--c-purple)">
          <Concept title="Realne obciazenie != dev" color="var(--c-purple)">
            Aplikacja, ktora dziala u Ciebie lokalnie pod 1 uzytkownikiem, moze
            sie wywrocic pod 500 jednoczesnymi requestami.
          </Concept>
          <Divider />
          <SectionLabel>Cel testow obciazeniowych</SectionLabel>
          <Row code="1">
            Maks. RPS (request-per-second) jaki serwer wytrzyma
          </Row>
          <Row code="2">Czas odpowiedzi (p50, p95, p99)</Row>
          <Row code="3">Wykrycie bottlenecka (CPU, RAM, DB, sieci)</Row>
          <Row code="4">Walidacja SLA przed deployem</Row>
          <Divider />
          <InfoBox>
            <b>SLO/SLA:</b> typowe cele to p95 &lt; 200ms i 0.1% bledow. Bez
            testow nie wiesz czy je spelnisz.
          </InfoBox>
        </Card>

        {/* === Proces testowania === */}
        <Card title="Proces testowania" color="var(--c-blue)">
          <Row code="1">
            <b>Cele</b> — np. 1000 RPS przy p95 &lt; 300ms
          </Row>
          <Row code="2">
            <b>Skrypt</b> — definicja scenariusza (login → koszyk → checkout)
          </Row>
          <Row code="3">
            <b>Konfiguracja</b> — liczba uzytkownikow, ramp-up, czas testu
          </Row>
          <Row code="4">
            <b>Run</b> — monitorowanie metryk w czasie rzeczywistym
          </Row>
          <Row code="5">
            <b>Analiza</b> — gdzie sa problemy?
          </Row>
          <Row code="6">
            <b>Optymalizacja</b> — fix → ponowny test
          </Row>
          <Divider />
          <InfoBox>
            Test to <b>petla</b>, nie jednorazowa akcja. Po kazdej zmianie
            kodu/infrastruktury — re-run.
          </InfoBox>
        </Card>

        {/* === Narzedzia === */}
        <Card title="Narzedzia do load testingu" color="var(--c-orange)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Open source</SectionLabel>
              <Row code="JMeter">
                Java GUI, najpopularniejszy, ogromny ekosystem pluginow
              </Row>
              <Row code="Siege">
                CLI, prosta skladnia:{' '}
                <code className="text-xs">siege -c 100 url</code>
              </Row>
              <Row code="Gatling">
                Scala DSL, wysoka wydajnosc, ladne raporty HTML
              </Row>
              <Row code="k6">JavaScript, nowoczesny, dobre dla CI/CD</Row>
              <Row code="wrk / wrk2">Bardzo szybki HTTP benchmark w C</Row>
              <Row code="hey / vegeta">
                Lekkie CLI w Go — szybki test ad-hoc
              </Row>
            </div>
            <div>
              <SectionLabel>Komercyjne</SectionLabel>
              <Row code="LoadRunner">Micro Focus — enterprise, drogie</Row>
              <Row code="WebLOAD">RadView — HTTP/SOAP/AJAX</Row>
              <Row code="BlazeMeter">JMeter w chmurze, masowa skala</Row>
              <Row code="ExecutiveAutomats">XPLUS, MS Dynamics 365</Row>
              <Divider />
              <InfoBox>
                W praktyce: <b>JMeter</b> dla zespolu QA, <b>k6</b> dla
                inzynierow w CI/CD, <b>wrk</b> dla szybkiego smoke benchmarku.
              </InfoBox>
            </div>
          </div>
        </Card>

        {/* === Instalacja JMeter === */}
        <Card title="Instalacja Apache JMeter" color="var(--c-green)">
          <SectionLabel>Wymagania</SectionLabel>
          <Row code="JDK 8+">Java Development Kit</Row>
          <Row code="2 GB RAM">na maszynie testujacej</Row>
          <Row code="binarka">.zip lub .tgz z jmeter.apache.org</Row>
          <Divider />
          <SectionLabel>Linux / macOS</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># 1. Zainstaluj JDK</Comment>
            <Cmd>
              <H>sudo</H> apt install -y default-jdk
            </Cmd>
            <Cmd>java -version</Cmd>
            <Cmd> </Cmd>
            <Comment># 2. Pobierz JMeter</Comment>
            <Cmd>
              <H>wget</H>{' '}
              https://dlcdn.apache.org/jmeter/binaries/apache-jmeter-5.6.3.tgz
            </Cmd>
            <Cmd>
              <H>tar</H> -xzf apache-jmeter-5.6.3.tgz
            </Cmd>
            <Cmd>
              <H>cd</H> apache-jmeter-5.6.3/bin
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 3. Uruchom GUI</Comment>
            <Cmd>./jmeter</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Windows</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              <F>jmeter.bat</F>
            </Cmd>
            <Comment># w katalogu apache-jmeter-X.Y.Z\bin\</Comment>
          </ExampleBlock>
          <InfoBox>
            <b>GUI vs CLI:</b> GUI tylko do tworzenia skryptu. Realny test
            odpalaj w trybie non-GUI:{' '}
            <code className="text-xs">jmeter -n -t plan.jmx -l result.jtl</code>
            .
          </InfoBox>
        </Card>

        {/* === Test Plan === */}
        <Card title="Struktura Test Plan" color="var(--c-blue)" full>
          <Concept title="3 elementy minimum" color="var(--c-blue)">
            Plan testu w JMeter sklada sie z trzech klockow:
            <b> Thread Group</b> (uzytkownicy), <b>Sampler</b> (request) i{' '}
            <b>Listener</b> (raport).
          </Concept>
          <Divider />
          <SectionLabel>Drzewo planu</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>Test Plan</Cmd>
            <Cmd>
              └── Thread Group{'           '}
              <Comment># symulacja uzytkownikow</Comment>
            </Cmd>
            <Cmd>
              {'    '}├── HTTP Request{'      '}
              <Comment># pojedynczy request</Comment>
            </Cmd>
            <Cmd>
              {'    '}├── HTTP Header Manager <Comment># naglowki</Comment>
            </Cmd>
            <Cmd>
              {'    '}├── CSV Data Set Config{' '}
              <Comment># dane wejsciowe</Comment>
            </Cmd>
            <Cmd>{'    '}└── Listeners</Cmd>
            <Cmd>{'        '}├── View Results in Table</Cmd>
            <Cmd>{'        '}├── Aggregate Report</Cmd>
            <Cmd>{'        '}└── Summary Report</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Thread Group — parametry</SectionLabel>
          <Row code="Number of Threads">liczba wirtualnych uzytkownikow</Row>
          <Row code="Ramp-up Period">w ile sek. odpalic wszystkich</Row>
          <Row code="Loop Count">
            ile razy kazdy uzytkownik powtarza scenariusz
          </Row>
          <Row code="Duration">limit czasu testu (s)</Row>
        </Card>

        {/* === Pierwszy test === */}
        <Card title="Krok po kroku — pierwszy test" color="var(--c-green)" full>
          <SectionLabel>1. Stworz nowy plan</SectionLabel>
          <Row code="File → New">pusty plan</Row>
          <SectionLabel className="mt-2">2. Dodaj Thread Group</SectionLabel>
          <Row code="PPM na Test Plan">
            Add → Threads (Users) → Thread Group
          </Row>
          <Row code="Threads = 50">50 wirtualnych uzytkownikow</Row>
          <Row code="Ramp-up = 10s">co 0.2s nowy uzytkownik</Row>
          <Row code="Loop = 10">10 powtorzen</Row>
          <SectionLabel className="mt-2">3. Dodaj HTTP Request</SectionLabel>
          <Row code="PPM na Thread Group">Add → Sampler → HTTP Request</Row>
          <Row code="Server">localhost</Row>
          <Row code="Port">80</Row>
          <Row code="Method">GET</Row>
          <Row code="Path">/index.html</Row>
          <SectionLabel className="mt-2">4. Dodaj Listenery</SectionLabel>
          <Row code="View Results in Table">indywidualne odpowiedzi</Row>
          <Row code="Aggregate Report">srednia, mediana, p90, p95, p99</Row>
          <Row code="Summary Report">zbiorczy raport</Row>
          <SectionLabel className="mt-2">5. Zapisz i uruchom</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              File → Save Test Plan as...{'  '}
              <Comment># first_test.jmx</Comment>
            </Cmd>
            <Cmd>Run → Start (lub Ctrl+R)</Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Tip:</b> przed startem wyczysc raporty (
            <code className="text-xs">Run → Clear All</code>), aby obejrzec
            tylko nowy run.
          </InfoBox>
        </Card>

        {/* === CSV Data Set === */}
        <Card title="Test logowania z CSV" color="var(--c-yellow)" full>
          <Concept title="Po co CSV?" color="var(--c-yellow)">
            Aby testowac z roznymi userami/haslami w petli — kazdy wirtualny
            uzytkownik bierze inny wiersz z pliku.
          </Concept>
          <Divider />
          <SectionLabel>1. users.csv</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>username,password</Cmd>
            <Cmd>jan,secret123</Cmd>
            <Cmd>anna,tajne!42</Cmd>
            <Cmd>piotr,p@ssw0rd</Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">2. CSV Data Set Config</SectionLabel>
          <Row code="Filename">users.csv</Row>
          <Row code="Variable Names">username,password</Row>
          <Row code="Delimiter">,</Row>
          <Row code="Ignore first line">true (jesli jest naglowek)</Row>
          <Row code="Recycle on EOF">true (zaczynaj od poczatku)</Row>
          <Row code="Stop Thread on EOF">false</Row>
          <SectionLabel className="mt-2">
            3. HTTP Request — POST /login
          </SectionLabel>
          <ExampleBlock variant="yellow">
            <Cmd>
              Method: <V>POST</V>
            </Cmd>
            <Cmd>Path: /login</Cmd>
            <Comment># Parameters:</Comment>
            <Cmd>
              username = <V>{'${username}'}</V>
            </Cmd>
            <Cmd>
              password = <V>{'${password}'}</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Zmienne <code className="text-xs">{'${username}'}</code> sa
            podstawiane z CSV — JMeter automatycznie iteruje przez wiersze.
          </InfoBox>
        </Card>

        {/* === Tryb non-GUI === */}
        <Card title="Tryb non-GUI (CI/CD)" color="var(--c-purple)" full>
          <Concept
            title="GUI = development, CLI = production"
            color="var(--c-purple)"
          >
            GUI zjada ogromnie pamieci i zafalszowuje wyniki. Realny test musi
            byc w trybie non-GUI.
          </Concept>
          <Divider />
          <ExampleBlock variant="purple">
            <Comment># podstawowy run</Comment>
            <Cmd>jmeter -n -t plan.jmx -l result.jtl</Cmd>
            <Cmd> </Cmd>
            <Comment># z raportem HTML</Comment>
            <Cmd>jmeter -n -t plan.jmx -l result.jtl -e -o report/</Cmd>
            <Cmd> </Cmd>
            <Comment># override property z CLI</Comment>
            <Cmd>
              jmeter -n -t plan.jmx -l result.jtl -Jusers=<V>200</V> -Jduration=
              <V>120</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Flagi</SectionLabel>
          <Row code="-n">non-GUI mode</Row>
          <Row code="-t">plik .jmx (test plan)</Row>
          <Row code="-l">plik .jtl (wyniki)</Row>
          <Row code="-e">wygeneruj HTML report</Row>
          <Row code="-o">katalog raportu</Row>
          <Row code="-J">override property (-Jkey=value)</Row>
        </Card>

        {/* === Analiza wynikow === */}
        <Card title="Analiza wynikow — co czytac?" color="var(--c-blue)" full>
          <SectionLabel>Aggregate Report — kluczowe pola</SectionLabel>
          <Row code="# Samples">ile zadan zostalo wyslanych</Row>
          <Row code="Average">srednia czasu odpowiedzi (ms)</Row>
          <Row code="Median (50%)">p50 — polowa zadan szybsza</Row>
          <Row code="90% / 95% / 99%">tail latency — najgorsi uzytkownicy</Row>
          <Row code="Min / Max">skrajne czasy</Row>
          <Row code="Error %">% bledow (4xx, 5xx, timeouty)</Row>
          <Row code="Throughput">RPS (req/s) — przepustowosc</Row>
          <Row code="KB/sec">transfer danych</Row>
          <Divider />
          <SectionLabel>Co alarmuje?</SectionLabel>
          <Row code="Error % &gt; 1%">cos sie psuje pod obciazeniem</Row>
          <Row code="p99 &gt;&gt; p95">long-tail — wycieki, GC pauzy</Row>
          <Row code="Throughput plateau">backend nie nadaza</Row>
          <Row code="Avg rosnie">stopniowa degradacja, leak</Row>
          <Divider />
          <InfoBox>
            <b>Rownolegle</b> obserwuj na serwerze:{' '}
            <code className="text-xs">htop</code>,{' '}
            <code className="text-xs">iostat</code>,{' '}
            <code className="text-xs">ss -s</code> i logi nginx/apache.
          </InfoBox>
        </Card>

        {/* === Najczestsze pulapki === */}
        <Card title="Najczestsze pulapki" color="var(--c-orange)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Test "wszystko OK", a w prod pada</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-1">
                <li>Testowales z 1 maszyny — zatkales lokalna siec</li>
                <li>Cache CDN/proxy "lapal" odpowiedzi</li>
                <li>Brak realistycznych danych (wszyscy ten sam user)</li>
                <li>Za krotki czas — JIT warm-up nie zadzialal</li>
              </ul>
            </div>
            <div>
              <SectionLabel>Wyniki dziwne</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-1">
                <li>GUI mode zjada CPU — uzyj non-GUI</li>
                <li>Listenery typu "View Tree" zatykaja pamiec</li>
                <li>Brak ramp-up — flood zamiast realnego ruchu</li>
                <li>Klient (twoj laptop) jest bottleneckiem, nie serwer</li>
              </ul>
            </div>
            <div>
              <SectionLabel>Bezpieczenstwo</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-1">
                <li>Nigdy nie testuj produkcji bez zgody</li>
                <li>Nie testuj cudzych domen (DDoS!)</li>
                <li>Stage/canary env do load testow</li>
                <li>Powiadom team przed testem</li>
              </ul>
            </div>
            <div>
              <SectionLabel>Best practices</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-1">
                <li>Wersjonuj plik .jmx w Git</li>
                <li>Trzymaj pliki CSV osobno (bez sekretow w repo)</li>
                <li>Automatyzuj w CI: jmeter -n + parsowanie .jtl</li>
                <li>Porownuj run-to-run, nie tylko absolutne liczby</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* === Slownik === */}
        <Card title="Slownik pojec" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <SectionLabel>Load test</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Test sprawdzajacy zachowanie systemu pod oczekiwanym
                obciazeniem.
              </p>
            </div>
            <div>
              <SectionLabel>Stress test</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Pchanie powyzej limitu, aby znalezc punkt awarii.
              </p>
            </div>
            <div>
              <SectionLabel>Soak test</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Dlugotrwale obciazenie (godziny) — wykrywa wycieki pamieci.
              </p>
            </div>
            <div>
              <SectionLabel>Throughput</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Liczba zadan obsluzonych w jednostce czasu (req/s).
              </p>
            </div>
            <div>
              <SectionLabel>Latency / response time</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Czas od wyslania zadania do otrzymania odpowiedzi.
              </p>
            </div>
            <div>
              <SectionLabel>Percentyl (p95)</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                95% zadan miesci sie ponizej tej wartosci. Lepsze miary niz
                srednia.
              </p>
            </div>
          </div>
        </Card>

        {/* === Kryteria === */}
        <Card title="Kryteria oceny lekcji" color="var(--c-accent)">
          <Row code="1">JMeter zainstalowany i uruchamia GUI</Row>
          <Row code="2">Lokalna strona WWW wystawiona (nginx z lekcji 13)</Row>
          <Row code="3">Test plan z Thread Group + HTTP Request + Listener</Row>
          <Row code="4">Wykonany test i przeczytany Aggregate Report</Row>
          <Row code="5">Zrozumienie p50/p95 i throughput</Row>
        </Card>

        {/* === Dokumentacja === */}
        <Card title="Dokumentacja" color="var(--c-purple)">
          <ul className="text-[11px] text-[var(--c-muted)] space-y-1">
            <li>
              <a
                href="https://jmeter.apache.org/usermanual/index.html"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                JMeter User Manual
              </a>
            </li>
            <li>
              <a
                href="https://jmeter.apache.org/usermanual/build-web-test-plan.html"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Building a Web Test Plan
              </a>
            </li>
            <li>
              <a
                href="https://k6.io/docs/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                k6 — alternative dla CI/CD
              </a>
            </li>
            <li>
              <a
                href="https://github.com/wg/wrk"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                wrk — szybki HTTP benchmark
              </a>
            </li>
          </ul>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/13', label: '13 — Serwery WWW' }}
        next={{ to: '/lessons/15', label: '15 — SSL/TLS' }}
      />
    </div>
  );
}
