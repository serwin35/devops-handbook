import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
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

export default function PythonBasics() {
  usePageTitle('Python Basics');

  return (
    <div>
      <PageHeader
        title="Python Basics"
        subtitle="zmienne · typy · operatory · if · for · while · funkcje · listy · slowniki · stringi"
        color="var(--c-blue)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === Uruchamianie === */}
        <Card title="Uruchamianie skryptow" color="var(--c-accent)">
          <ExampleBlock>
            <Comment># Linux / macOS</Comment>
            <Cmd>python3 hello.py</Cmd>
            <Cmd> </Cmd>
            <Comment># Windows</Comment>
            <Cmd>python hello.py</Cmd>
            <Cmd> </Cmd>
            <Comment># REPL (interaktywny)</Comment>
            <Cmd>python3</Cmd>
            <Cmd> </Cmd>
            <Comment># Z shebang (Linux/macOS)</Comment>
            <Cmd>
              <H>#!/usr/bin/env python3</H>
            </Cmd>
            <Cmd>chmod +x hello.py</Cmd>
            <Cmd>./hello.py</Cmd>
            <Cmd> </Cmd>
            <Comment># Wersja</Comment>
            <Cmd>python3 --version</Cmd>
            <Cmd>
              python3 -c <V>"import sys; print(sys.version)"</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Zmienne === */}
        <Card title="Zmienne i typy" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Cmd>
              x = <V>5</V> <Comment># int</Comment>
            </Cmd>
            <Cmd>
              pi = <V>3.14</V> <Comment># float</Comment>
            </Cmd>
            <Cmd>
              name = <V>"Python"</V> <Comment># str</Comment>
            </Cmd>
            <Cmd>
              ok = <V>True</V> <Comment># bool</Comment>
            </Cmd>
            <Cmd>
              nothing = <V>None</V> <Comment># NoneType</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># sprawdzenie typu</Comment>
            <Cmd>
              type(x) <Comment># {`<class 'int'>`}</Comment>
            </Cmd>
            <Cmd>
              isinstance(x, <H>int</H>) <Comment># True</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># konwersje</Comment>
            <Cmd>
              <H>int</H>(<V>"42"</V>) <Comment># 42</Comment>
            </Cmd>
            <Cmd>
              <H>float</H>(<V>"3.14"</V>) <Comment># 3.14</Comment>
            </Cmd>
            <Cmd>
              <H>str</H>(<V>42</V>) <Comment># "42"</Comment>
            </Cmd>
            <Cmd>
              <H>bool</H>(<V>0</V>) <Comment># False</Comment>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Operatory === */}
        <Card title="Operatory" color="var(--c-purple)">
          <SectionLabel>Arytmetyczne</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              10 + 3 <Comment># 13</Comment>
            </Cmd>
            <Cmd>
              10 - 3 <Comment># 7</Comment>
            </Cmd>
            <Cmd>
              10 * 3 <Comment># 30</Comment>
            </Cmd>
            <Cmd>
              10 / 3 <Comment># 3.3333...</Comment>
            </Cmd>
            <Cmd>
              10 // 3 <Comment># 3 (calkowite)</Comment>
            </Cmd>
            <Cmd>
              10 % 3 <Comment># 1 (modulo)</Comment>
            </Cmd>
            <Cmd>
              10 ** 3 <Comment># 1000 (potega)</Comment>
            </Cmd>
          </ExampleBlock>
          <SectionLabel>Porownania i logiczne</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              x == y <Comment># rownosc</Comment>
            </Cmd>
            <Cmd>
              x != y <Comment># nierownosc</Comment>
            </Cmd>
            <Cmd>
              x &lt;= y <Comment># mniejsze rowne</Comment>
            </Cmd>
            <Cmd>
              x <H>and</H> y <Comment># koniunkcja</Comment>
            </Cmd>
            <Cmd>
              x <H>or</H> y <Comment># alternatywa</Comment>
            </Cmd>
            <Cmd>
              <H>not</H> x <Comment># negacja</Comment>
            </Cmd>
            <Cmd>
              x <H>in</H> [<V>1</V>,<V>2</V>,<V>3</V>]{' '}
              <Comment># czy w kolekcji</Comment>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Stringi === */}
        <Card title="Stringi" color="var(--c-yellow)" full>
          <ExampleBlock variant="yellow">
            <Cmd>
              s = <V>"Witaj, swiecie!"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Operacje</Comment>
            <Cmd>
              len(s) <Comment># 15</Comment>
            </Cmd>
            <Cmd>
              s.upper() <Comment># WITAJ, SWIECIE!</Comment>
            </Cmd>
            <Cmd>
              s.lower() <Comment># witaj, swiecie!</Comment>
            </Cmd>
            <Cmd>
              s.replace(<V>"a"</V>, <V>"A"</V>){' '}
              <Comment># WitAj, swiecie!</Comment>
            </Cmd>
            <Cmd>
              s.split(<V>", "</V>) <Comment># ["Witaj", "swiecie!"]</Comment>
            </Cmd>
            <Cmd>
              s.strip() <Comment># bez bialych znakow</Comment>
            </Cmd>
            <Cmd>
              s.startswith(<V>"W"</V>) <Comment># True</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Indeksowanie i slicing</Comment>
            <Cmd>
              s[0] <Comment># "W"</Comment>
            </Cmd>
            <Cmd>
              s[-1] <Comment># "!" (od konca)</Comment>
            </Cmd>
            <Cmd>
              s[0:5] <Comment># "Witaj"</Comment>
            </Cmd>
            <Cmd>
              s[::-1] <Comment># odwrocone</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># f-strings (preferowane od 3.6)</Comment>
            <Cmd>
              name = <V>"Mateusz"</V>
            </Cmd>
            <Cmd>
              print(<V>f"Witaj, {`{name}`}!"</V>)
            </Cmd>
            <Cmd>
              print(<V>f"{`{2+2=}`}"</V>) <Comment># 2+2=4</Comment>
            </Cmd>
            <Cmd>
              print(<V>f"{`{pi:.2f}`}"</V>) <Comment># 3.14 (format)</Comment>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Warunki === */}
        <Card title="Warunki" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Cmd>
              x = <V>10</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>if</H> x &lt; <V>10</V>:
            </Cmd>
            <Cmd>
              {'    '}print(<V>"mniej"</V>)
            </Cmd>
            <Cmd>
              <H>elif</H> x == <V>10</V>:
            </Cmd>
            <Cmd>
              {'    '}print(<V>"rowno"</V>)
            </Cmd>
            <Cmd>
              <H>else</H>:
            </Cmd>
            <Cmd>
              {'    '}print(<V>"wiecej"</V>)
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Ternary</Comment>
            <Cmd>
              label = <V>"dorosly"</V> <H>if</H> x &gt;= <V>18</V> <H>else</H>{' '}
              <V>"niepelnoletni"</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Wciecia</b>: standardowo 4 spacje (PEP 8). Mieszanie tabow i
            spacji = <code className="text-xs">IndentationError</code>.
          </InfoBox>
        </Card>

        {/* === Petle === */}
        <Card title="Petle" color="var(--c-green)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>for + range</SectionLabel>
              <ExampleBlock variant="green">
                <Comment># 0..4</Comment>
                <Cmd>
                  <H>for</H> i <H>in</H> range(<V>5</V>):
                </Cmd>
                <Cmd>{'    '}print(i)</Cmd>
                <Cmd> </Cmd>
                <Comment># 1..10</Comment>
                <Cmd>
                  <H>for</H> i <H>in</H> range(<V>1</V>, <V>11</V>):
                </Cmd>
                <Cmd>{'    '}print(i)</Cmd>
                <Cmd> </Cmd>
                <Comment># co 2: 0,2,4,6,8</Comment>
                <Cmd>
                  <H>for</H> i <H>in</H> range(<V>0</V>, <V>10</V>, <V>2</V>):
                </Cmd>
                <Cmd>{'    '}print(i)</Cmd>
                <Cmd> </Cmd>
                <Comment># Z indeksem</Comment>
                <Cmd>
                  fruits = [<V>"a"</V>, <V>"b"</V>, <V>"c"</V>]
                </Cmd>
                <Cmd>
                  <H>for</H> i, f <H>in</H> enumerate(fruits):
                </Cmd>
                <Cmd>{'    '}print(i, f)</Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>while + kontrola</SectionLabel>
              <ExampleBlock variant="green">
                <Cmd>
                  n = <V>0</V>
                </Cmd>
                <Cmd>
                  <H>while</H> n &lt; <V>5</V>:
                </Cmd>
                <Cmd>
                  {'    '}
                  <H>if</H> n == <V>3</V>:
                </Cmd>
                <Cmd>
                  {'        '}
                  <H>break</H> <Comment># przerwij</Comment>
                </Cmd>
                <Cmd>
                  {'    '}
                  <H>if</H> n == <V>1</V>:
                </Cmd>
                <Cmd>
                  {'        '}n += <V>1</V>
                </Cmd>
                <Cmd>
                  {'        '}
                  <H>continue</H> <Comment># skip</Comment>
                </Cmd>
                <Cmd>{'    '}print(n)</Cmd>
                <Cmd>
                  {'    '}n += <V>1</V>
                </Cmd>
                <Cmd> </Cmd>
                <Comment># Nieskonczona</Comment>
                <Cmd>
                  <H>while</H> <V>True</V>:
                </Cmd>
                <Cmd>
                  {'    '}cmd = input(<V>"&gt; "</V>)
                </Cmd>
                <Cmd>
                  {'    '}
                  <H>if</H> cmd == <V>"exit"</V>:
                </Cmd>
                <Cmd>
                  {'        '}
                  <H>break</H>
                </Cmd>
              </ExampleBlock>
            </div>
          </div>
        </Card>

        {/* === Funkcje === */}
        <Card title="Funkcje" color="var(--c-blue)" full>
          <ExampleBlock variant="default">
            <Comment># Podstawowa</Comment>
            <Cmd>
              <H>def</H> add(x, y):
            </Cmd>
            <Cmd>
              {'    '}
              <H>return</H> x + y
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Z domyslnymi argumentami</Comment>
            <Cmd>
              <H>def</H> greet(name=<V>"swiat"</V>, excited=<V>False</V>):
            </Cmd>
            <Cmd>
              {'    '}msg = <V>f"Witaj, {`{name}`}"</V>
            </Cmd>
            <Cmd>
              {'    '}
              <H>return</H> msg + (<V>"!"</V> <H>if</H> excited <H>else</H>{' '}
              <V>"."</V>)
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              greet() <Comment># "Witaj, swiat."</Comment>
            </Cmd>
            <Cmd>
              greet(<V>"Mateusz"</V>, excited=<V>True</V>){' '}
              <Comment># "Witaj, Mateusz!"</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Type hints (zalecane)</Comment>
            <Cmd>
              <H>def</H> multiply(x: <H>int</H>, y: <H>int</H> = <V>2</V>) -&gt;{' '}
              <H>int</H>:
            </Cmd>
            <Cmd>
              {'    '}
              <H>return</H> x * y
            </Cmd>
            <Cmd> </Cmd>
            <Comment># *args i **kwargs</Comment>
            <Cmd>
              <H>def</H> sum_all(*nums):
            </Cmd>
            <Cmd>
              {'    '}
              <H>return</H> sum(nums)
            </Cmd>
            <Cmd>
              sum_all(<V>1</V>, <V>2</V>, <V>3</V>, <V>4</V>){' '}
              <Comment># 10</Comment>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Listy === */}
        <Card title="Listy" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Cmd>
              fruits = [<V>"jablko"</V>, <V>"banan"</V>, <V>"wisnia"</V>]
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Dostep i modyfikacja</Comment>
            <Cmd>
              fruits[<V>0</V>] <Comment># "jablko"</Comment>
            </Cmd>
            <Cmd>
              fruits[-1] <Comment># "wisnia" (od konca)</Comment>
            </Cmd>
            <Cmd>
              fruits[<V>1</V>:<V>3</V>] <Comment># ["banan","wisnia"]</Comment>
            </Cmd>
            <Cmd>
              len(fruits) <Comment># 3</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              fruits.append(<V>"sliwka"</V>){' '}
              <Comment># dodaj na koniec</Comment>
            </Cmd>
            <Cmd>
              fruits.insert(<V>0</V>, <V>"kiwi"</V>){' '}
              <Comment># dodaj na pozycje</Comment>
            </Cmd>
            <Cmd>
              fruits.remove(<V>"banan"</V>) <Comment># usun</Comment>
            </Cmd>
            <Cmd>
              fruits.pop() <Comment># usun ostatni i zwroc</Comment>
            </Cmd>
            <Cmd>
              fruits.sort() <Comment># sortuj in-place</Comment>
            </Cmd>
            <Cmd>
              fruits.reverse() <Comment># odwroc</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># List comprehension</Comment>
            <Cmd>
              squares = [x**<V>2</V> <H>for</H> x <H>in</H> range(<V>5</V>)]
            </Cmd>
            <Cmd>
              <Comment># [0, 1, 4, 9, 16]</Comment>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Slowniki === */}
        <Card title="Slowniki (dict)" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Cmd>user = {`{`}</Cmd>
            <Cmd>
              {'    '}
              <V>"name"</V>: <V>"Mateusz"</V>,
            </Cmd>
            <Cmd>
              {'    '}
              <V>"age"</V>: <V>30</V>,
            </Cmd>
            <Cmd>
              {'    '}
              <V>"admin"</V>: <V>True</V>,
            </Cmd>
            <Cmd>{`}`}</Cmd>
            <Cmd> </Cmd>
            <Comment># Dostep</Comment>
            <Cmd>
              user[<V>"name"</V>] <Comment># "Mateusz"</Comment>
            </Cmd>
            <Cmd>
              user.get(<V>"phone"</V>, <V>"-"</V>){' '}
              <Comment># "-" (domyslne)</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Modyfikacja</Comment>
            <Cmd>
              user[<V>"email"</V>] = <V>"x@y.pl"</V>{' '}
              <Comment># dodaj/nadpisz</Comment>
            </Cmd>
            <Cmd>
              <H>del</H> user[<V>"admin"</V>] <Comment># usun</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Iteracja</Comment>
            <Cmd>
              <H>for</H> key, val <H>in</H> user.items():
            </Cmd>
            <Cmd>{'    '}print(key, val)</Cmd>
            <Cmd> </Cmd>
            <Cmd>
              user.keys() <Comment># dict_keys</Comment>
            </Cmd>
            <Cmd>
              user.values() <Comment># dict_values</Comment>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === I/O === */}
        <Card title="Input / Output" color="var(--c-accent)">
          <ExampleBlock>
            <Comment># Wypisywanie</Comment>
            <Cmd>
              print(<V>"a"</V>, <V>"b"</V>, <V>"c"</V>){' '}
              <Comment># a b c</Comment>
            </Cmd>
            <Cmd>
              print(<V>"a"</V>, <V>"b"</V>, sep=<V>"-"</V>){' '}
              <Comment># a-b</Comment>
            </Cmd>
            <Cmd>
              print(<V>"linia1"</V>, end=<V>""</V>) <Comment># bez \n</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Wczytywanie</Comment>
            <Cmd>
              name = input(<V>"Imie: "</V>) <Comment># zawsze str</Comment>
            </Cmd>
            <Cmd>
              age = <H>int</H>(input(<V>"Wiek: "</V>)){' '}
              <Comment># konwersja</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Pliki</Comment>
            <Cmd>
              <H>with</H> open(<V>"data.txt"</V>) <H>as</H> f:
            </Cmd>
            <Cmd>{'    '}content = f.read()</Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>with</H> open(<V>"out.txt"</V>, <V>"w"</V>) <H>as</H> f:
            </Cmd>
            <Cmd>
              {'    '}f.write(<V>"Hello\n"</V>)
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Bledy === */}
        <Card title="Obsluga bledow" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Cmd>
              <H>try</H>:
            </Cmd>
            <Cmd>
              {'    '}age = <H>int</H>(input(<V>"Wiek: "</V>))
            </Cmd>
            <Cmd>
              {'    '}result = <V>100</V> / age
            </Cmd>
            <Cmd>
              <H>except</H> ValueError:
            </Cmd>
            <Cmd>
              {'    '}print(<V>"To nie liczba!"</V>)
            </Cmd>
            <Cmd>
              <H>except</H> ZeroDivisionError:
            </Cmd>
            <Cmd>
              {'    '}print(<V>"Nie dziel przez zero!"</V>)
            </Cmd>
            <Cmd>
              <H>except</H> Exception <H>as</H> e:
            </Cmd>
            <Cmd>
              {'    '}print(<V>f"Inny blad: {`{e}`}"</V>)
            </Cmd>
            <Cmd>
              <H>else</H>:
            </Cmd>
            <Cmd>
              {'    '}print(<V>"OK"</V>, result)
            </Cmd>
            <Cmd>
              <H>finally</H>:
            </Cmd>
            <Cmd>
              {'    '}print(<V>"koniec"</V>)
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Lap konkretne wyjatki, a nie golego{' '}
            <code className="text-xs">except:</code>— inaczej zlapiesz tez
            Ctrl+C i bledy systemowe.
          </InfoBox>
        </Card>

        {/* === Moduly === */}
        <Card title="Moduly stdlib (DevOps)" color="var(--c-blue)" full>
          <ExampleBlock variant="default">
            <Cmd>
              <H>import</H> os, sys, json, subprocess
            </Cmd>
            <Cmd>
              <H>from</H> pathlib <H>import</H> Path
            </Cmd>
            <Cmd>
              <H>from</H> datetime <H>import</H> datetime
            </Cmd>
            <Cmd> </Cmd>
            <Comment># os — system</Comment>
            <Cmd>
              os.environ.get(<V>"HOME"</V>) <Comment># env var</Comment>
            </Cmd>
            <Cmd>
              os.getcwd() <Comment># pwd</Comment>
            </Cmd>
            <Cmd>
              os.listdir(<V>"."</V>) <Comment># ls</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># sys — argumenty CLI</Comment>
            <Cmd>
              sys.argv <Comment># lista argumentow</Comment>
            </Cmd>
            <Cmd>
              sys.exit(<V>1</V>) <Comment># exit code</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># subprocess — uruchom shell</Comment>
            <Cmd>
              r = subprocess.run([<V>"ls"</V>, <V>"-la"</V>], capture_output=
              <V>True</V>, text=<V>True</V>)
            </Cmd>
            <Cmd>print(r.stdout)</Cmd>
            <Cmd> </Cmd>
            <Comment># json — serializacja</Comment>
            <Cmd>
              data = json.loads(<V>'{`{"key": "val"}`}'</V>)
            </Cmd>
            <Cmd>
              json.dumps(data, indent=<V>2</V>)
            </Cmd>
            <Cmd> </Cmd>
            <Comment># pathlib — sciezki</Comment>
            <Cmd>
              p = Path(<V>"/etc/hosts"</V>)
            </Cmd>
            <Cmd>
              p.exists() <Comment># True</Comment>
            </Cmd>
            <Cmd>
              p.read_text() <Comment># zawartosc</Comment>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Najczestsze bledy === */}
        <Card title="Najczestsze bledy" color="var(--c-purple)" full>
          <Row code="IndentationError">
            niespojne wciecia (mieszane tab/spacje)
          </Row>
          <Row code="NameError">uzycie zmiennej przed przypisaniem</Row>
          <Row code="TypeError">
            np. <code className="text-xs">"5" + 1</code> — str + int
          </Row>
          <Row code="ValueError">
            np. <code className="text-xs">int("abc")</code>
          </Row>
          <Row code="KeyError">brak klucza w slowniku</Row>
          <Row code="IndexError">indeks poza zakresem listy</Row>
          <Row code="ZeroDivisionError">dzielenie przez 0</Row>
          <Row code="FileNotFoundError">otwarcie nieistniejacego pliku</Row>
          <Row code="ImportError">brak modulu (zainstaluj przez pip)</Row>
        </Card>

        {/* === Best practices === */}
        <Card title="Best practices (PEP 8)" color="var(--c-green)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Nazewnictwo</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>
                  zmienne i funkcje: <code className="text-xs">snake_case</code>
                </li>
                <li>
                  klasy: <code className="text-xs">PascalCase</code>
                </li>
                <li>
                  stale: <code className="text-xs">UPPER_CASE</code>
                </li>
                <li>
                  prywatne: <code className="text-xs">_underscore</code>
                </li>
              </ul>
              <SectionLabel className="mt-2">Formatowanie</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>4 spacje wciecia (nie tab)</li>
                <li>max 79 znakow w linii</li>
                <li>2 puste linie miedzy funkcjami</li>
                <li>
                  spacje wokol <code className="text-xs">=</code> i operatorow
                </li>
              </ul>
            </div>
            <div>
              <SectionLabel>Praktyka</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>
                  uzywaj <b>f-strings</b> zamiast{' '}
                  <code className="text-xs">%</code> i{' '}
                  <code className="text-xs">.format()</code>
                </li>
                <li>
                  uzywaj <code className="text-xs">with open()</code> dla plikow
                </li>
                <li>type hints w funkcjach od &gt;= 20 linii</li>
                <li>jeden plik = jedna odpowiedzialnosc</li>
                <li>
                  <code className="text-xs">if __name__ == "__main__":</code>{' '}
                  dla CLI
                </li>
                <li>
                  linter: <b>ruff</b> lub <b>flake8</b>
                </li>
                <li>
                  formatter: <b>black</b> lub <b>ruff format</b>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
