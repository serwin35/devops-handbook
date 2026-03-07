import { usePageTitle } from '../../hooks/usePageTitle';
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
import LessonNav from '../../components/LessonNav';

export default function BashScripting() {
  usePageTitle('Bash Scripting');

  return (
    <div>
      <PageHeader
        title="Bash Scripting"
        subtitle="shebang · zmienne · warunki · petle · funkcje · stringi · tablice · przekierowania"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Card 1 — Shebang i uruchamianie */}
        <Card title="Shebang i uruchamianie" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Kazdy skrypt zaczyna sie od shebang — okresla interpreter powloki
          </p>
          <ExampleBlock variant="green">
            <Comment># zalecany shebang</Comment>
            <Cmd>
              <H>#!/bin/bash</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># przenosny shebang (szuka bash w PATH)</Comment>
            <Cmd>
              <H>#!/usr/bin/env bash</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Uruchamianie skryptu</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># nadaj uprawnienia wykonywania</Comment>
            <Cmd>
              chmod <H>+x</H> <F>skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># uruchom bezposrednio</Comment>
            <Cmd>
              <F>./skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># uruchom przez interpreter</Comment>
            <Cmd>
              bash <F>skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="bash -x skrypt.sh">tryb debug (trace)</Row>
          <Row code="bash -n skrypt.sh">sprawdz skladnie (dry-run)</Row>
          <Row code="bash -e skrypt.sh">zatrzymaj na bledzie</Row>
          <InfoBox>
            <span className="text-[var(--c-green)] text-[11px]">
              Dobre praktyki
            </span>
            <br />
            Dodaj na poczatku:{' '}
            <code className="text-xs">set -euo pipefail</code> — zatrzymuje
            skrypt na bledzie, niezdefiniowanej zmiennej i bledzie w pipe.
          </InfoBox>
        </Card>

        {/* Card 2 — Zmienne */}
        <Card title="Zmienne" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Zmienne bez spacji przy <code className="text-xs">=</code>, odczyt
            przez <code className="text-xs">$</code>
          </p>
          <ExampleBlock variant="yellow">
            <Comment># deklaracja zmiennej</Comment>
            <Cmd>
              <H>IMIE</H>=<V>"Serwin"</V>
            </Cmd>
            <Cmd>
              <H>WIEK</H>=<V>30</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># odczyt zmiennej</Comment>
            <Cmd>
              echo <V>$IMIE</V>
            </Cmd>
            <Cmd>
              echo <V>"${IMIE}"</V>{' '}
              <span className="text-[var(--c-muted)]">
                # bezpieczniejszy zapis
              </span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># zmienna z wyniku komendy</Comment>
            <Cmd>
              DATA=<H>$(</H>date +%Y-%m-%d<H>)</H>
            </Cmd>
            <Cmd>
              PLIKI=<H>$(</H>ls -1 | wc -l<H>)</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Zmienne specjalne</SectionLabel>
          <Row code="$0">nazwa skryptu</Row>
          <Row code="$1 $2 ...">argumenty pozycyjne</Row>
          <Row code="$#">liczba argumentow</Row>
          <Row code="$@">wszystkie argumenty (lista)</Row>
          <Row code="$?">kod wyjscia poprzedniej komendy</Row>
          <Row code="$$">PID biezacego procesu</Row>
          <Row code="$!">PID ostatniego procesu w tle</Row>
          <InfoBox>
            Zawsze cudzyslow zmiennych: <code className="text-xs">"$VAR"</code>{' '}
            — chroni przed word splitting i globbingiem.
          </InfoBox>
        </Card>

        {/* Card 3 — Warunki */}
        <Card title="Warunki (if / else)" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># podstawowa struktura if</Comment>
            <Cmd>
              <H>if</H> [[ <V>$WIEK</V> -ge 18 ]]; <H>then</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"pelnoletni"</V>
            </Cmd>
            <Cmd>
              <H>elif</H> [[ <V>$WIEK</V> -gt 0 ]]; <H>then</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"niepelnoletni"</V>
            </Cmd>
            <Cmd>
              <H>else</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"nieprawidlowy wiek"</V>
            </Cmd>
            <Cmd>
              <H>fi</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Operatory liczbowe (-eq, -gt itd.)</SectionLabel>
          <Row code="-eq">rowne (equal)</Row>
          <Row code="-ne">rozne (not equal)</Row>
          <Row code="-gt">wieksze (greater than)</Row>
          <Row code="-ge">wieksze lub rowne</Row>
          <Row code="-lt">mniejsze (less than)</Row>
          <Row code="-le">mniejsze lub rowne</Row>
          <Divider />
          <SectionLabel>Operatory plikow i stringow</SectionLabel>
          <Row code="-f plik">plik istnieje i jest zwyklym plikiem</Row>
          <Row code="-d katalog">katalog istnieje</Row>
          <Row code="-z $str">string jest pusty</Row>
          <Row code="-n $str">string niepusty</Row>
          <Row code="$a == $b">stringi sa rowne ([[ ]])</Row>
          <Row code="$a != $b">stringi sa rozne</Row>
          <ExampleBlock variant="purple">
            <Comment># [[ ]] wspiera regex i &&, ||</Comment>
            <Cmd>
              if [[ <V>"$USER"</V> == <H>"root"</H> &amp;&amp;{' '}
              <V>-f /etc/passwd</V> ]]; then
            </Cmd>
            <Cmd>
              {'  '}echo <V>"root z passwdem"</V>
            </Cmd>
            <Cmd>fi</Cmd>
          </ExampleBlock>
        </Card>

        {/* Card 4 — Petle */}
        <Card title="Petle" color="var(--c-orange)">
          <SectionLabel>for — iteracja po liscie</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># iteracja po zakresie</Comment>
            <Cmd>
              <H>for</H> i <H>in</H> <V>{'{1..5}'}</V>; <H>do</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Numer: $i"</V>
            </Cmd>
            <Cmd>
              <H>done</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># iteracja po plikach</Comment>
            <Cmd>
              <H>for</H> plik <H>in</H> <F>*.txt</F>; <H>do</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Plik: $plik"</V>
            </Cmd>
            <Cmd>
              <H>done</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># styl C</Comment>
            <Cmd>
              <H>for</H> (( i=0; i&lt;5; i++ )); <H>do</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>$i</V>
            </Cmd>
            <Cmd>
              <H>done</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>while i until</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># while — dopoki warunek prawdziwy</Comment>
            <Cmd>
              <H>while</H> [[ <V>$n</V> -lt 5 ]]; <H>do</H>
            </Cmd>
            <Cmd>{'  '}(( n++ ))</Cmd>
            <Cmd>
              <H>done</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># until — dopoki warunek falszywy</Comment>
            <Cmd>
              <H>until</H> [[ <V>$n</V> -ge 5 ]]; <H>do</H>
            </Cmd>
            <Cmd>{'  '}(( n++ ))</Cmd>
            <Cmd>
              <H>done</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="break">wyjdz z petli</Row>
          <Row code="continue">przejdz do nastepnej iteracji</Row>
        </Card>

        {/* Card 5 — Funkcje */}
        <Card title="Funkcje" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Funkcje mozna deklarowac dwoma sposobami — dzialaja tak samo
          </p>
          <ExampleBlock variant="purple">
            <Comment># deklaracja funkcji (styl 1)</Comment>
            <Cmd>
              <H>function</H> <V>przywitaj</V>
              {'()'} {'{'}
            </Cmd>
            <Cmd>
              {'  '}local <H>imie</H>=<V>"$1"</V>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Czesc, $imie!"</V>
            </Cmd>
            <Cmd>{'}'}</Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># deklaracja (styl 2 — bez slowa function)</Comment>
            <Cmd>
              <V>przywitaj</V>
              {'()'} {'{'}
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Czesc, $1!"</V>
            </Cmd>
            <Cmd>{'}'}</Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># wywolanie funkcji z argumentem</Comment>
            <Cmd>
              przywitaj <V>"Serwin"</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Return i zmienne lokalne</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              <V>dodaj</V>
              {'()'} {'{'}
            </Cmd>
            <Cmd>
              {'  '}local <H>wynik</H>=$(( $1 + $2 ))
            </Cmd>
            <Cmd>
              {'  '}echo <V>$wynik</V>{' '}
              <span className="text-[var(--c-muted)]"># zwroc przez echo</span>
            </Cmd>
            <Cmd>{'}'}</Cmd>
            <Cmd>
              suma=$(dodaj <V>3 7</V>)
            </Cmd>
          </ExampleBlock>
          <Row code="local var">zmienna widoczna tylko w funkcji</Row>
          <Row code="return 0">kod wyjscia (0 = sukces)</Row>
          <InfoBox>
            <code className="text-xs">return</code> zwraca tylko kod wyjscia
            (0-255). Wartosci zwracaj przez{' '}
            <code className="text-xs">echo</code> i podstawianie komend.
          </InfoBox>
        </Card>

        {/* Card 6 — Operacje na stringach */}
        <Card title="Operacje na stringach" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Comment># dlugosc stringa</Comment>
            <Cmd>
              echo <H>${'{#STR}'}</H>{' '}
              <span className="text-[var(--c-muted)]"># liczba znakow</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># wycinek (substring)</Comment>
            <Cmd>
              echo <H>${'{STR:0:5}'}</H>{' '}
              <span className="text-[var(--c-muted)]"># od 0, dlugosc 5</span>
            </Cmd>
            <Cmd>
              echo <H>${'{STR:(-3)'}</H>
              {'}'}{' '}
              <span className="text-[var(--c-muted)]"># ostatnie 3 znaki</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># zamiana (pierwsza / wszystkie)</Comment>
            <Cmd>
              echo <H>${'{STR/stare/nowe}'}</H>{' '}
              <span className="text-[var(--c-muted)]"># pierwsza</span>
            </Cmd>
            <Cmd>
              echo <H>${'{STR//stare/nowe}'}</H>{' '}
              <span className="text-[var(--c-muted)]"># wszystkie</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># zmiana wielkosci liter (bash 4+)</Comment>
            <Cmd>
              echo <H>${'{STR^^}'}</H>{' '}
              <span className="text-[var(--c-muted)]"># UPPERCASE</span>
            </Cmd>
            <Cmd>
              echo <H>${'{STR,,}'}</H>{' '}
              <span className="text-[var(--c-muted)]"># lowercase</span>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Usuwanie przedrostka / przyrostka</SectionLabel>
          <Row code="${'{STR#wzorzec}'}">usun najkrotszy przedrostek</Row>
          <Row code="${'{STR##wzorzec}'}">usun najdluzszy przedrostek</Row>
          <Row code="${'{STR%wzorzec}'}">usun najkrotszy przyrostek</Row>
          <Row code="${'{STR%%wzorzec}'}">usun najdluzszy przyrostek</Row>
          <ExampleBlock variant="green">
            <Comment># przykladowy pattern: rozszerzenie pliku</Comment>
            <Cmd>
              PLIK=<V>"raport.txt"</V>
            </Cmd>
            <Cmd>
              echo <H>${'{PLIK%.txt}'}</H>{' '}
              <span className="text-[var(--c-muted)]"># raport</span>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* Card 7 — Tablice */}
        <Card title="Tablice" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Bash obsluguje tablice indeksowane i asocjacyjne (bash 4+)
          </p>
          <ExampleBlock variant="purple">
            <Comment># deklaracja tablicy</Comment>
            <Cmd>
              <H>SERWERY</H>=(<V>"web1" "web2" "db1"</V>)
            </Cmd>
            <Cmd>
              SERWERY+=(<V>"cache1"</V>){' '}
              <span className="text-[var(--c-muted)]"># dodaj element</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># odczyt elementu (indeks od 0)</Comment>
            <Cmd>
              echo <H>${'{SERWERY[0]}'}</H>{' '}
              <span className="text-[var(--c-muted)]"># web1</span>
            </Cmd>
            <Cmd>
              echo <H>${'{SERWERY[-1]}'}</H>{' '}
              <span className="text-[var(--c-muted)]"># ostatni</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># wszystkie elementy</Comment>
            <Cmd>
              echo <H>${'{SERWERY[@]}'}</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># liczba elementow</Comment>
            <Cmd>
              echo <H>${'{#SERWERY[@]}'}</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Iteracja po tablicy</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              for serwer in <H>"${'{SERWERY[@]}'}"</H>; do
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Pinguje: $serwer"</V>
            </Cmd>
            <Cmd>done</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Tablica asocjacyjna (bash 4+)</SectionLabel>
          <ExampleBlock variant="yellow">
            <Cmd>
              <H>declare -A</H> PORTY
            </Cmd>
            <Cmd>
              PORTY[<V>http</V>]=<V>80</V>
            </Cmd>
            <Cmd>
              PORTY[<V>https</V>]=<V>443</V>
            </Cmd>
            <Cmd>
              echo <H>${'{PORTY[https]}'}</H>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* Card 8 — Przekierowania i pipe */}
        <Card title="Przekierowania i pipe" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Standardowe strumienie: stdin (0), stdout (1), stderr (2)
          </p>
          <SectionLabel>Przekierowanie wyjscia</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># nadpisz plik</Comment>
            <Cmd>
              echo <V>"log"</V> <H>&gt;</H> <F>plik.log</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># dopisz do pliku</Comment>
            <Cmd>
              echo <V>"log"</V> <H>&gt;&gt;</H> <F>plik.log</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># przekieruj stderr</Comment>
            <Cmd>
              komenda <H>2&gt;</H> <F>bledy.log</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># stdout i stderr do jednego pliku</Comment>
            <Cmd>
              komenda <H>&gt;</H> <F>wynik.log</F> <H>2&gt;&amp;1</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># wycisz wyjscie (wyrzuc do /dev/null)</Comment>
            <Cmd>
              komenda <H>&gt;</H> <F>/dev/null</F> 2&gt;&amp;1
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Pipe i tee</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># przekaz stdout do nastepnej komendy</Comment>
            <Cmd>
              cat <F>plik.log</F> <H>|</H> grep <V>"ERROR"</V> <H>|</H> wc -l
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># tee — zapisz i pokaz jednoczesnie</Comment>
            <Cmd>
              komenda <H>| tee</H> <F>wynik.log</F>
            </Cmd>
            <Cmd>
              komenda <H>| tee -a</H> <F>wynik.log</F>{' '}
              <span className="text-[var(--c-muted)]"># -a = dopisz</span>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="&lt; plik">stdin z pliku</Row>
          <Row code="&lt;&lt;EOF ... EOF">heredoc (blok tekstu)</Row>
          <Row code="2&gt;&amp;1">stderr do stdout</Row>
        </Card>

        {/* Card 9 — Przydatne wzorce (full width) */}
        <Card title="Przydatne wzorce" full>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div>
              <SectionLabel>Parsowanie argumentow</SectionLabel>
              <ExampleBlock variant="green">
                <Comment># prosta petla po $@</Comment>
                <Cmd>while [[ $# -gt 0 ]]; do</Cmd>
                <Cmd>{'  '}case "$1" in</Cmd>
                <Cmd>{'    '}-f|--file)</Cmd>
                <Cmd>{'      '}PLIK="$2"; shift 2 ;;</Cmd>
                <Cmd>{'    '}-v|--verbose)</Cmd>
                <Cmd>{'      '}VERBOSE=1; shift ;;</Cmd>
                <Cmd>{'    '}*) shift ;;</Cmd>
                <Cmd>{'  '}esac</Cmd>
                <Cmd>done</Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>Czytanie pliku linia po linii</SectionLabel>
              <ExampleBlock variant="yellow">
                <Comment># bezpieczny sposob</Comment>
                <Cmd>while IFS= read -r linia; do</Cmd>
                <Cmd>{'  '}echo "Linia: $linia"</Cmd>
                <Cmd>done &lt; plik.txt</Cmd>
              </ExampleBlock>
              <ExampleBlock variant="yellow">
                <Comment># lub przez pipe</Comment>
                <Cmd>cat plik.txt | while read -r l; do</Cmd>
                <Cmd>{'  '}echo "$l"</Cmd>
                <Cmd>done</Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>trap — cleanup przy wyjsciu</SectionLabel>
              <ExampleBlock variant="purple">
                <Comment># funkcja sprzatajaca</Comment>
                <Cmd>cleanup() {'{'}</Cmd>
                <Cmd>{'  '}rm -f /tmp/tymczasowy.$$</Cmd>
                <Cmd>{'  '}echo "Sprzatanie gotowe"</Cmd>
                <Cmd>{'}'}</Cmd>
                <Cmd></Cmd>
                <Comment># zarejestruj dla EXIT i SIGINT</Comment>
                <Cmd>trap cleanup EXIT INT TERM</Cmd>
                <Cmd></Cmd>
                <Comment># reszta skryptu...</Comment>
                <Cmd>touch /tmp/tymczasowy.$$</Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>Sprawdzanie czy root</SectionLabel>
              <ExampleBlock>
                <Comment># metoda 1: sprawdz UID</Comment>
                <Cmd>if [[ $EUID -ne 0 ]]; then</Cmd>
                <Cmd>{'  '}echo "Wymagany root!" &gt;&amp;2</Cmd>
                <Cmd>{'  '}exit 1</Cmd>
                <Cmd>fi</Cmd>
              </ExampleBlock>
              <ExampleBlock variant="orange">
                <Comment># metoda 2: whoami</Comment>
                <Cmd>if [[ $(whoami) != "root" ]]; then</Cmd>
                <Cmd>{'  '}echo "Brak uprawnien" &gt;&amp;2</Cmd>
                <Cmd>{'  '}exit 1</Cmd>
                <Cmd>fi</Cmd>
              </ExampleBlock>
            </div>
          </div>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/cheatsheets/ssh-keys', label: 'SSH Keys' }}
        next={{ to: '/cheatsheets/git', label: 'Git Commands' }}
      />
    </div>
  );
}
