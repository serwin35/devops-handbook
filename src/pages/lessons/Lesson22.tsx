import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Concept from '../../components/Concept';
import ExampleBlock, {
  Cmd,
  Comment,
  H,
  V,
} from '../../components/ExampleBlock';
import Row from '../../components/Row';
import Divider from '../../components/Divider';
import InfoBox from '../../components/InfoBox';
import SectionLabel from '../../components/SectionLabel';
import LessonNav from '../../components/LessonNav';

export default function Lesson22() {
  usePageTitle('Lekcja 22 — Python cz. 1');

  return (
    <div>
      <PageHeader
        title="Lekcja 22 — Python cz. 1"
        subtitle="historia · instalacja · skladnia · zmienne · warunki · petle · funkcje"
        color="var(--c-blue)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === Cele === */}
        <Card title="Cele lekcji" color="var(--c-blue)">
          <Concept title="Co poznasz?" color="var(--c-blue)">
            Pythona od strony <b>DevOps</b>: po co go znac, jak go zainstalowac
            i jak napisac pierwszy skrypt automatyzujacy rutyne (logi, backupy,
            API).
          </Concept>
          <Divider />
          <Row code="1">Czym jest Python i gdzie sie go uzywa</Row>
          <Row code="2">Historia jezyka i wersje (2 vs 3)</Row>
          <Row code="3">Instalacja: Windows / Linux / macOS</Row>
          <Row code="4">Skladnia: zmienne, typy, operatory</Row>
          <Row code="5">Warunki if/elif/else</Row>
          <Row code="6">Petle for / while + range</Row>
          <Row code="7">Funkcje, argumenty, return</Row>
        </Card>

        {/* === Czym jest Python === */}
        <Card title="Czym jest Python" color="var(--c-green)">
          <Concept
            title="Jezyk skryptowy wysokiego poziomu"
            color="var(--c-green)"
          >
            <b>Interpretowany</b> (nie kompilujesz do binarki),
            <b> dynamicznie typowany</b> (typ ustala sie w runtime),
            <b> wieloparadygmatowy</b> (OOP, funkcyjny, proceduralny). Stworzony
            w 1991 przez Guido van Rossuma.
          </Concept>
          <Divider />
          <SectionLabel>Cechy</SectionLabel>
          <Row code="+">czytelna skladnia, wciecia zamiast {`{}`}</Row>
          <Row code="+">ogromna stdlib + ekosystem pip</Row>
          <Row code="+">multiplatformowy (Linux/macOS/Windows)</Row>
          <Row code="+">otwarte zrodlo (PSF License)</Row>
          <InfoBox>
            Nazwa <b>Python</b> NIE pochodzi od weza — Guido byl fanem
            <b> Monty Python's Flying Circus</b>.
          </InfoBox>
        </Card>

        {/* === Zastosowania === */}
        <Card title="Zastosowania" color="var(--c-purple)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>W DevOps</SectionLabel>
              <Row code="auto">automatyzacja serwerow (skrypty)</Row>
              <Row code="api">klienty REST/GraphQL (requests, httpx)</Row>
              <Row code="logs">parsing logow, analiza danych</Row>
              <Row code="iac">Ansible jest napisany w Pythonie</Row>
              <Row code="aws">boto3 — AWS SDK</Row>
              <Row code="k8s">kubernetes client</Row>
            </div>
            <div>
              <SectionLabel>Poza DevOps</SectionLabel>
              <Row code="web">Django, Flask, FastAPI</Row>
              <Row code="data">Pandas, NumPy, Matplotlib</Row>
              <Row code="ML">TensorFlow, PyTorch, scikit-learn</Row>
              <Row code="sci">SciPy, badania naukowe</Row>
              <Row code="game">Pygame</Row>
              <Row code="edu">nauka programowania #1 na swiecie</Row>
            </div>
          </div>
        </Card>

        {/* === Wersje === */}
        <Card title="Python 2 vs Python 3" color="var(--c-orange)">
          <Concept title="Tylko Python 3" color="var(--c-orange)">
            <b>Python 2 jest martwy</b> od 2020 (EOL). Wszystkie nowe projekty
            pisz w <b>Pythonie 3.10+</b>. Z Python 2 spotkasz sie tylko w
            starych systemach (CentOS 7 itp.).
          </Concept>
          <Divider />
          <SectionLabel>Najwazniejsze roznice</SectionLabel>
          <Row code="print">
            2: <code className="text-xs">print x</code> · 3:{' '}
            <code className="text-xs">print(x)</code>
          </Row>
          <Row code="str">2: bytes domyslnie · 3: unicode domyslnie</Row>
          <Row code="/">
            2: <code className="text-xs">5/2 = 2</code> · 3:{' '}
            <code className="text-xs">5/2 = 2.5</code>
          </Row>
          <Row code="input">
            2: <code className="text-xs">raw_input()</code> · 3:{' '}
            <code className="text-xs">input()</code>
          </Row>
          <Divider />
          <SectionLabel>Nowosci w nowych wersjach</SectionLabel>
          <Row code="3.6">
            f-strings: <code className="text-xs">f"Witaj, {`{name}`}!"</code>
          </Row>
          <Row code="3.9">
            type hints w stdlib, <code className="text-xs">dict | dict</code>
          </Row>
          <Row code="3.10">
            <code className="text-xs">match</code>/
            <code className="text-xs">case</code> (pattern matching)
          </Row>
          <Row code="3.12">lepsze bledy, szybsze wykonanie</Row>
        </Card>

        {/* === Instalacja === */}
        <Card title="Instalacja" color="var(--c-yellow)" full>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <SectionLabel>Linux (Debian/Ubuntu)</SectionLabel>
              <ExampleBlock variant="yellow">
                <Cmd>sudo apt update</Cmd>
                <Cmd>
                  sudo apt install <V>python3 python3-pip python3-venv</V>
                </Cmd>
                <Cmd>python3 --version</Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>macOS</SectionLabel>
              <ExampleBlock variant="yellow">
                <Comment># przez Homebrew</Comment>
                <Cmd>
                  brew install <V>python@3.12</V>
                </Cmd>
                <Cmd>python3 --version</Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>Windows</SectionLabel>
              <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-0.5">
                <li>
                  <a
                    href="https://www.python.org/downloads/windows/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--c-accent)] hover:underline"
                  >
                    python.org/downloads
                  </a>
                </li>
                <li>
                  Zaznacz <b>Add Python to PATH</b>
                </li>
                <li>
                  Install Now → cmd →{' '}
                  <code className="text-xs">python --version</code>
                </li>
              </ol>
            </div>
          </div>
          <InfoBox>
            <b>Wazne</b> na Windows: zaznacz <b>"Add python.exe to PATH"</b>
            podczas instalacji — bez tego{' '}
            <code className="text-xs">python</code>
            nie zadziala z cmd.
          </InfoBox>
        </Card>

        {/* === Hello world === */}
        <Card title="Pierwszy skrypt" color="var(--c-accent)">
          <ExampleBlock>
            <Comment># hello.py</Comment>
            <Cmd>
              print(<V>"Witaj, swiecie!"</V>)
            </Cmd>
            <Cmd>
              print(<V>"To moj pierwszy program w Pythonie!"</V>)
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Uruchomienie</SectionLabel>
          <ExampleBlock variant="default">
            <Comment># Linux / macOS</Comment>
            <Cmd>python3 hello.py</Cmd>
            <Cmd> </Cmd>
            <Comment># Windows</Comment>
            <Cmd>python hello.py</Cmd>
            <Cmd> </Cmd>
            <Comment># REPL (interaktywny tryb)</Comment>
            <Cmd>python3</Cmd>
            <Cmd>
              {`>>> `}print(<V>"hi"</V>)
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Typy i zmienne === */}
        <Card title="Typy danych i zmienne" color="var(--c-green)" full>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Bez deklaracji typu — Python sam rozpozna typ przy przypisaniu.
          </p>
          <ExampleBlock variant="green">
            <Comment># Liczby calkowite (int)</Comment>
            <Cmd>
              x = <V>5</V>
            </Cmd>
            <Cmd>
              print(type(x)) <Comment># {`<class 'int'>`}</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Liczby zmiennoprzecinkowe (float)</Comment>
            <Cmd>
              pi = <V>3.14</V>
            </Cmd>
            <Cmd>
              print(type(pi)) <Comment># {`<class 'float'>`}</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Ciagi znakow (str)</Comment>
            <Cmd>
              name = <V>"Python"</V>
            </Cmd>
            <Cmd>
              print(type(name)) <Comment># {`<class 'str'>`}</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Bool i None</Comment>
            <Cmd>
              ok = <V>True</V>
            </Cmd>
            <Cmd>
              nothing = <V>None</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># f-string (interpolacja)</Comment>
            <Cmd>
              print(
              <V>
                f"pi = {`{pi}`}, name = {`{name}`}"
              </V>
              )
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Operatory === */}
        <Card title="Operatory" color="var(--c-purple)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Arytmetyczne</SectionLabel>
              <ExampleBlock variant="purple">
                <Cmd>
                  a = <V>10</V>
                </Cmd>
                <Cmd>
                  b = <V>3</V>
                </Cmd>
                <Cmd>
                  print(a + b) <Comment># 13</Comment>
                </Cmd>
                <Cmd>
                  print(a - b) <Comment># 7</Comment>
                </Cmd>
                <Cmd>
                  print(a * b) <Comment># 30</Comment>
                </Cmd>
                <Cmd>
                  print(a / b) <Comment># 3.3333... (float)</Comment>
                </Cmd>
                <Cmd>
                  print(a // b) <Comment># 3 (int division)</Comment>
                </Cmd>
                <Cmd>
                  print(a % b) <Comment># 1 (modulo)</Comment>
                </Cmd>
                <Cmd>
                  print(a ** b) <Comment># 1000 (potega)</Comment>
                </Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>Porownania i logiczne</SectionLabel>
              <ExampleBlock variant="purple">
                <Cmd>
                  x = <V>5</V>
                </Cmd>
                <Cmd>
                  y = <V>10</V>
                </Cmd>
                <Cmd>
                  print(x == y) <Comment># False (rownosc)</Comment>
                </Cmd>
                <Cmd>
                  print(x != y) <Comment># True (nierownosc)</Comment>
                </Cmd>
                <Cmd>
                  print(x &lt; y) <Comment># True</Comment>
                </Cmd>
                <Cmd>
                  print(x &gt;= y) <Comment># False</Comment>
                </Cmd>
                <Cmd> </Cmd>
                <Cmd>
                  print(<V>True</V> <H>and</H> <V>False</V>){' '}
                  <Comment># False</Comment>
                </Cmd>
                <Cmd>
                  print(<V>True</V> <H>or</H> <V>False</V>){' '}
                  <Comment># True</Comment>
                </Cmd>
                <Cmd>
                  print(<H>not</H> <V>True</V>) <Comment># False</Comment>
                </Cmd>
              </ExampleBlock>
            </div>
          </div>
        </Card>

        {/* === if === */}
        <Card title="Warunki if / elif / else" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Bloki kodu wyznaczane sa przez <b>wciecia</b> (zalecane: 4 spacje).
            Bez nawiasow klamrowych.
          </p>
          <ExampleBlock variant="orange">
            <Cmd>
              x = <V>10</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>if</H> x &lt; <V>10</V>:
            </Cmd>
            <Cmd>
              {'    '}print(<V>"x jest mniejsze niz 10"</V>)
            </Cmd>
            <Cmd>
              <H>elif</H> x == <V>10</V>:
            </Cmd>
            <Cmd>
              {'    '}print(<V>"x jest rowne 10"</V>)
            </Cmd>
            <Cmd>
              <H>else</H>:
            </Cmd>
            <Cmd>
              {'    '}print(<V>"x jest wieksze niz 10"</V>)
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-xs">elif</code> = "else if". Mozesz miec
            <b> dowolnie wiele</b> blokow elif miedzy if i else.
          </InfoBox>
        </Card>

        {/* === for === */}
        <Card title="Petla for" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Liczby 0..4</Comment>
            <Cmd>
              <H>for</H> i <H>in</H> range(<V>5</V>):
            </Cmd>
            <Cmd>{'    '}print(i)</Cmd>
            <Cmd> </Cmd>
            <Comment># Iteracja po liscie</Comment>
            <Cmd>
              fruits = [<V>"jablko"</V>, <V>"banan"</V>, <V>"wisnia"</V>]
            </Cmd>
            <Cmd>
              <H>for</H> fruit <H>in</H> fruits:
            </Cmd>
            <Cmd>{'    '}print(fruit)</Cmd>
            <Cmd> </Cmd>
            <Comment># Z indeksem</Comment>
            <Cmd>
              <H>for</H> i, fruit <H>in</H> enumerate(fruits):
            </Cmd>
            <Cmd>{'    '}print(i, fruit)</Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="range(5)">0, 1, 2, 3, 4</Row>
          <Row code="range(1, 11)">1..10 (od inclusive, do exclusive)</Row>
          <Row code="range(0, 10, 2)">0, 2, 4, 6, 8 (krok)</Row>
        </Card>

        {/* === while === */}
        <Card title="Petla while" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Cmd>
              count = <V>0</V>
            </Cmd>
            <Cmd>
              <H>while</H> count &lt; <V>5</V>:
            </Cmd>
            <Cmd>{'    '}print(count)</Cmd>
            <Cmd>
              {'    '}count += <V>1</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Kontrola petli</SectionLabel>
          <Row code="break">przerwij petle natychmiast</Row>
          <Row code="continue">przejdz do nastepnej iteracji</Row>
          <Row code="else">blok po zakonczeniu petli (rzadko uzywane)</Row>
          <InfoBox>
            <b>Uwaga</b>: nieskonczona{' '}
            <code className="text-xs">while True:</code>
            wymaga <code className="text-xs">break</code> lub Ctrl+C.
          </InfoBox>
        </Card>

        {/* === Funkcje === */}
        <Card title="Funkcje" color="var(--c-blue)" full>
          <ExampleBlock variant="default">
            <Comment># Definicja</Comment>
            <Cmd>
              <H>def</H> add_numbers(x, y):
            </Cmd>
            <Cmd>
              {'    '}
              <H>return</H> x + y
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Wywolanie</Comment>
            <Cmd>
              result = add_numbers(<V>5</V>, <V>3</V>)
            </Cmd>
            <Cmd>
              print(result) <Comment># 8</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Domyslna wartosc argumentu</Comment>
            <Cmd>
              <H>def</H> greet(name=<V>"swiat"</V>):
            </Cmd>
            <Cmd>
              {'    '}
              <H>return</H> <V>f"Witaj, {`{name}`}!"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              print(greet()) <Comment># Witaj, swiat!</Comment>
            </Cmd>
            <Cmd>
              print(greet(<V>"Mateusz"</V>)){' '}
              <Comment># Witaj, Mateusz!</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Type hints (zalecane od Python 3.5)</Comment>
            <Cmd>
              <H>def</H> multiply(x: <H>int</H>, y: <H>int</H>) -&gt; <H>int</H>
              :
            </Cmd>
            <Cmd>
              {'    '}
              <H>return</H> x * y
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === input === */}
        <Card title="Wprowadzanie danych" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># input() zawsze zwraca str — konwertuj recznie</Comment>
            <Cmd>
              name = input(<V>"Jak masz na imie? "</V>)
            </Cmd>
            <Cmd>
              age = <H>int</H>(input(<V>"Ile masz lat? "</V>))
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              print(
              <V>
                f"Czesc {`{name}`}, masz {`{age}`} lat."
              </V>
              )
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-xs">input()</code> zwraca <b>string</b>.
            Konwersja: <code className="text-xs">int()</code>,
            <code className="text-xs"> float()</code>,
            <code className="text-xs"> bool()</code>. Niewlasciwy input =
            <code className="text-xs"> ValueError</code>.
          </InfoBox>
        </Card>

        {/* === Praktyka DevOps === */}
        <Card title="Po co Pythona DevOps-owi?" color="var(--c-accent)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Bash kontra Python</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>
                  <b>Bash</b>: glue (uruchamianie programow), one-linery, &lt;
                  100 linii
                </li>
                <li>
                  <b>Python</b>: logika, parsing JSON/YAML, API, &gt; 100 linii
                </li>
                <li>
                  Granica: jak potrzebujesz{' '}
                  <code className="text-xs">case</code> i tablic — pisz w
                  Pythonie
                </li>
                <li>Bash nie ma porzadnego try/except, Python ma</li>
              </ul>
            </div>
            <div>
              <SectionLabel>Typowe skrypty</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Parser logow nginx → raport bledow</li>
                <li>Klient REST API → trigger CI/CD</li>
                <li>Healthcheck → Slack/email</li>
                <li>Migracja danych miedzy serwerami</li>
                <li>Generator config plikow (Jinja2)</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* === Slownik === */}
        <Card title="Slownik" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <SectionLabel>Interpreter</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Program wykonujacy kod linia po linii (bez kompilacji do
                binarki).
              </p>
            </div>
            <div>
              <SectionLabel>REPL</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Read-Eval-Print Loop — interaktywna konsola Pythona.
              </p>
            </div>
            <div>
              <SectionLabel>Wciecie (indent)</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Wyznacza blok kodu. Standard PEP 8: 4 spacje.
              </p>
            </div>
            <div>
              <SectionLabel>f-string</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                <code className="text-xs">f"..."</code> — interpolacja zmiennych
                w stringu (od 3.6).
              </p>
            </div>
            <div>
              <SectionLabel>Type hint</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                <code className="text-xs">x: int</code> — adnotacja typu. Nie
                wymuszana, ale czyta sie i sprawdza linterem.
              </p>
            </div>
            <div>
              <SectionLabel>PEP 8</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Oficjalny style guide Pythona (formatowanie, nazwy).
              </p>
            </div>
            <div>
              <SectionLabel>pip</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Menedzer pakietow Pythona (jak apt/npm dla Pythona).
              </p>
            </div>
            <div>
              <SectionLabel>venv</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Wirtualne srodowisko — izoluje pakiety projektu.
              </p>
            </div>
            <div>
              <SectionLabel>stdlib</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Standardowa biblioteka — moduly dostepne bez instalacji.
              </p>
            </div>
          </div>
        </Card>

        {/* === Dokumentacja === */}
        <Card title="Dokumentacja i tooling" color="var(--c-purple)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Oficjalna</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] space-y-1">
                <li>
                  <a
                    href="https://docs.python.org/3/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--c-accent)] hover:underline"
                  >
                    docs.python.org/3
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.python.org/3/tutorial/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--c-accent)] hover:underline"
                  >
                    Tutorial (oficjalny)
                  </a>
                </li>
                <li>
                  <a
                    href="https://peps.python.org/pep-0008/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--c-accent)] hover:underline"
                  >
                    PEP 8 — Style Guide
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <SectionLabel>Edytory i narzedzia</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] space-y-1">
                <li>
                  <b>VS Code</b> + extension Python (Microsoft)
                </li>
                <li>
                  <b>PyCharm</b> Community (JetBrains)
                </li>
                <li>
                  <b>IDLE</b> — domyslny edytor z Pythona
                </li>
                <li>
                  <b>Jupyter</b> — notebook do analizy danych
                </li>
                <li>
                  <b>ruff</b> / <b>black</b> — linter i formatter
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <LessonNav prev={{ to: '/lessons/21', label: '21 — Docker cz. 2' }} />
    </div>
  );
}
