import { useState } from 'react';
import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import ExampleBlock, {
  Cmd,
  Comment,
  H,
  V,
} from '../../components/ExampleBlock';
import InfoBox from '../../components/InfoBox';
import SectionLabel from '../../components/SectionLabel';
import LessonNav from '../../components/LessonNav';

function Spoiler({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="text-[11px] px-3 py-1.5 rounded border border-[var(--c-border)] bg-[var(--c-surface2)] text-[var(--c-accent)] hover:border-[var(--c-accent)] transition-colors"
      >
        {open ? '▼' : '▶'} {title}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

export default function Homework14() {
  usePageTitle('Homework 14');

  return (
    <div>
      <PageHeader
        title="Homework 14 — Testowanie wydajnosci WWW"
        subtitle="JMeter · test plan · CSV · analiza wynikow"
        color="var(--c-green)"
      />

      <InfoBox>
        Materialy zrodlowe lekcji:{' '}
        <a
          href="/materials/lesson-14-www-servers-testing.pdf"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--c-accent)] hover:underline"
        >
          lesson-14-www-servers-testing.pdf
        </a>
      </InfoBox>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* === 1: Lokalna strona + JMeter === */}
        <Card title="1. Test lokalnej strony WWW" color="var(--c-green)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(76,217,100,0.15)] text-[var(--c-green)] font-bold">
              BASIC
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Wystaw prosta strone WWW na localhost (nginx z lekcji 13).
            Zainstaluj JMeter i przeprowadz test obciazeniowy z roznymi liczbami
            uzytkownikow.
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>Wystaw strone WWW (nginx z indeksem)</li>
            <li>Zainstaluj JDK i pobierz JMeter</li>
            <li>Utworz Thread Group: 50 uzytkownikow, ramp 10s, loop 10</li>
            <li>HTTP Request: GET http://localhost/</li>
            <li>Dodaj Aggregate Report + View Results in Table</li>
            <li>Uruchom test, zapisz wyniki</li>
            <li>Powtorz dla 100, 200, 500 uzytkownikow</li>
            <li>
              Obserwuj <code className="text-xs">htop</code> rownolegle
            </li>
            <li>
              Utworz <code className="text-xs">REPORT.md</code> z wnioskami
            </li>
          </ol>

          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Instalacja JMeter (Linux)</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                <H>sudo</H> apt install -y default-jdk
              </Cmd>
              <Cmd>
                <H>wget</H>{' '}
                https://dlcdn.apache.org/jmeter/binaries/apache-jmeter-5.6.3.tgz
              </Cmd>
              <Cmd>
                <H>tar</H> -xzf apache-jmeter-5.6.3.tgz
              </Cmd>
              <Cmd>
                <H>cd</H> apache-jmeter-5.6.3/bin && ./jmeter
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              non-GUI run (rekomendowane)
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>./jmeter -n -t plan.jmx -l result.jtl -e -o report/</Cmd>
              <Cmd>
                open report/index.html{'   '}
                <Comment># macOS</Comment>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Co czytac</SectionLabel>
            <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
              <li>Throughput rosnie liniowo do limitu — szukaj plateau</li>
              <li>p95 i p99 — long-tail latency</li>
              <li>Error % &gt; 0 = problem</li>
              <li>htop pokaze CPU, RAM nginx-a</li>
            </ul>
          </Spoiler>
        </Card>

        {/* === 2: Test API === */}
        <Card title="2. Test API z parametrami" color="var(--c-yellow)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Wystaw proste API (Python/Node/Go). Przygotuj test plan z roznymi
            metodami (GET, POST). Uzyj CSV Data Set Config dla parametrow.
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>
              Postaw API z 3 endpointami (GET / + POST /login + GET /users)
            </li>
            <li>
              Utworz <code className="text-xs">users.csv</code> z 10 wierszami
            </li>
            <li>Thread Group + 3 HTTP Request samplery</li>
            <li>CSV Data Set Config dla POST /login</li>
            <li>HTTP Header Manager: Content-Type: application/json</li>
            <li>Aggregate Report + Response Assertion (status 200)</li>
            <li>Test 10 min ciagle przy 100 uzytkownikach</li>
            <li>Wygeneruj raport HTML</li>
          </ol>

          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Proste API w Python</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>pip install flask</Cmd>
              <Cmd>
                cat &gt; api.py &lt;&lt; <V>'EOF'</V>
              </Cmd>
              <Cmd>from flask import Flask, jsonify, request</Cmd>
              <Cmd>app = Flask(__name__)</Cmd>
              <Cmd> </Cmd>
              <Cmd>
                @app.route(<V>'/'</V>)
              </Cmd>
              <Cmd>
                def index(): return <V>'Hello'</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                @app.route(<V>'/login'</V>, methods=[<V>'POST'</V>])
              </Cmd>
              <Cmd>def login():</Cmd>
              <Cmd>{'    '}d = request.json</Cmd>
              <Cmd>
                {'    '}return jsonify(ok=True, user=d.get(<V>'username'</V>))
              </Cmd>
              <Cmd>EOF</Cmd>
              <Cmd>
                flask --app api run --port <V>5000</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">non-GUI z parametrami</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>./jmeter -n -t api.jmx -l api.jtl \</Cmd>
              <Cmd>
                {'  '}-Jusers=<V>100</V> -Jramp=<V>30</V> -Jduration=<V>600</V>{' '}
                \
              </Cmd>
              <Cmd>{'  '}-e -o api-report/</Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === 3: Bonus === */}
        <Card
          title="3. Stress test do limitu (bonus)"
          color="var(--c-orange)"
          full
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,159,76,0.15)] text-[var(--c-orange)] font-bold">
              BONUS
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Znajdz <b>punkt zalamania</b> serwera — zwiekszaj uzytkownikow co
            100 az do bledow. Zapisz wykres throughput vs uzytkownicy.
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>Zacznij od 100 uzytkownikow, zwiekszaj +100 co 5 minut</li>
            <li>Notuj: throughput, p95, error %</li>
            <li>Stop gdy error &gt; 5% lub p95 &gt; 5s</li>
            <li>Zrob wykres w arkuszu (Excel/Sheets)</li>
            <li>Zidentyfikuj bottleneck (CPU? RAM? sieci?)</li>
          </ol>

          <Spoiler title="Pokaz wskazowki">
            <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-1">
              <li>
                Wykonuj testy z drugiej maszyny (twoj laptop nie jest
                bottleneckiem)
              </li>
              <li>Wylacz cache nginx na czas testu</li>
              <li>
                Monitoruj: <code className="text-xs">htop</code>,{' '}
                <code className="text-xs">iostat -xz 1</code>,{' '}
                <code className="text-xs">nethogs</code>
              </li>
              <li>
                Sprawdz <code className="text-xs">ulimit -n</code> (file
                descriptors)
              </li>
            </ul>
          </Spoiler>
        </Card>
      </div>

      <InfoBox>
        <b>Kryteria oceny:</b> JMeter dziala, podstawowy test wykonany,
        Aggregate Report przeczytany ze zrozumieniem (p95, throughput, errors),
        dla zaawansowanego — test API z CSV.
      </InfoBox>

      <LessonNav prev={{ to: '/lessons/14', label: '14 — Testowanie WWW' }} />
    </div>
  );
}
