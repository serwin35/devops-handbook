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

export default function Lesson11() {
  usePageTitle('Lekcja 11 — Wprowadzenie do Bash');

  return (
    <div>
      <PageHeader
        title="Lekcja 11 — Wprowadzenie do Bash"
        subtitle="Filozofia Unix, zmienne, warunki, petle, tablice, funkcje, automatyzacja"
        color="var(--c-orange)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === Filozofia Unix i Bash === */}
        <Card title="Filozofia Unix i Bash" color="var(--c-orange)">
          <Concept title="Dlaczego Bash?" color="var(--c-orange)">
            Bash (Bourne Again Shell) — powloka stworzona w 1989 przez Briana
            Foxa. Uniwersalna, szybka, z bezposrednim dostepem do systemu.
            Idealna do automatyzacji w DevOps.
          </Concept>

          <Divider />
          <SectionLabel>Kluczowe zasady Unix</SectionLabel>
          <Row code="1">
            <b>Wszystko jest plikiem</b> — urzadzenia, procesy, sockety
          </Row>
          <Row code="2">
            <b>Rob jedna rzecz, ale rob ja dobrze</b> — male, wyspecjalizowane
            narzedzia
          </Row>
          <Row code="3">
            <b>Strumienie tekstowe</b> — uniwersalny interfejs miedzy programami
          </Row>

          <Divider />
          <SectionLabel>Potoki w praktyce</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Kazde polecenie robi swoja czesc</Comment>
            <Cmd>
              <H>ps</H> aux <H>|</H> <H>grep</H> <V>nginx</V> <H>|</H>{' '}
              <H>awk</H> <F>{"'{print $2}'"}</F> <H>|</H> <H>xargs</H> kill
            </Cmd>
            <Comment># ps: lista procesow</Comment>
            <Comment># grep: filtrowanie</Comment>
            <Comment># awk: pobranie PID</Comment>
            <Comment># xargs kill: zakonczenie procesow</Comment>
          </ExampleBlock>
        </Card>

        {/* === Skrypty Bash — podstawy === */}
        <Card title="Skrypty Bash — podstawy" color="var(--c-green)">
          <Concept title="Co to jest skrypt Bash?" color="var(--c-green)">
            Plik tekstowy z sekwencja polecen do wykonania przez interpreter
            Bash. Zamiast wpisywac komendy recznie — automatyzujesz je.
          </Concept>

          <Divider />
          <SectionLabel>Anatomia skryptu</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              <H>#!/bin/bash</H>
            </Cmd>
            <Cmd>
              echo <V>"Witaj w Bash!"</V>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Shebang (#!)</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              <H>#!/bin/bash</H>
              {'          '}
              <span className="text-[var(--c-muted)]"># Uzyj Bash</span>
            </Cmd>
            <Cmd>
              #!/usr/bin/python3{'  '}
              <span className="text-[var(--c-muted)]"># Uzyj Python3</span>
            </Cmd>
            <Cmd>
              #!/usr/bin/env perl{'  '}
              <span className="text-[var(--c-muted)]"># Uzyj Perl</span>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Shebang <b>nie jest komentarzem</b> — to instrukcja dla jadra
            systemu, jakim interpreterem uruchomic plik.
          </InfoBox>

          <Divider />
          <SectionLabel>Uruchamianie skryptu</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Sposob 1: chmod + bezposrednie uruchomienie</Comment>
            <Cmd>
              <H>chmod</H> +x <F>script.sh</F>
            </Cmd>
            <Cmd>
              <F>./script.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Sposob 2: jawne wywolanie interpretera</Comment>
            <Cmd>
              <H>bash</H> <F>script.sh</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Zmienne === */}
        <Card title="Zmienne" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            W Bashu wszystko jest tekstem — zmienne nie maja typow. Deklaracja
            bez spacji przy <code className="text-xs">=</code>.
          </p>
          <ExampleBlock variant="yellow">
            <Comment># Deklaracja zmiennych</Comment>
            <Cmd>
              <H>message</H>=<V>"Hello"</V>
              {'     '}
              <span className="text-[var(--c-muted)]"># Tekst</span>
            </Cmd>
            <Cmd>
              <H>count</H>=<V>42</V>
              {'            '}
              <span className="text-[var(--c-muted)]">
                # Liczba (ale to tez tekst)
              </span>
            </Cmd>
            <Cmd>
              <H>files</H>=<V>(*)</V>
              {'           '}
              <span className="text-[var(--c-muted)]"># Tablica</span>
            </Cmd>
          </ExampleBlock>

          <ExampleBlock variant="yellow">
            <Comment># Uzywanie zmiennych</Comment>
            <Cmd>
              echo <V>"$message"</V>
              {'     '}
              <span className="text-[var(--c-muted)]">
                # Wstawienie wartosci
              </span>
            </Cmd>
            <Cmd>
              echo <V>'$message'</V>
              {'     '}
              <span className="text-[var(--c-muted)]"># Tekst doslowny</span>
            </Cmd>
            <Cmd>
              echo <V>"${'{message}'}"</V>
              {'  '}
              <span className="text-[var(--c-muted)]">
                # Jawne granice zmiennej
              </span>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Dlaczego cudzyslowy sa wazne?</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>
              project_dir=<V>"/home/dev/my app"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Blad: Bash widzi 2 argumenty</Comment>
            <Cmd>
              cd $project_dir{'  '}
              <span className="text-[var(--c-muted)]">
                # cd /home/dev/my app (ERROR!)
              </span>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Poprawnie: cudzyslowy grupuja tekst</Comment>
            <Cmd>
              cd <V>"$project_dir"</V>
              {'  '}
              <span className="text-[var(--c-muted)]">
                # cd "/home/dev/my app" (OK)
              </span>
            </Cmd>
          </ExampleBlock>

          <InfoBox warn>
            <b>Typowy blad:</b> spacje wokol <code className="text-xs">=</code>{' '}
            w deklaracji zmiennej.{' '}
            <code className="text-xs">path = /usr/bin</code> — to NIE jest
            przypisanie, to polecenie <code className="text-xs">path</code> z
            argumentami!
          </InfoBox>
        </Card>

        {/* === Jak Bash przetwarza polecenia === */}
        <Card title="Jak Bash przetwarza polecenia" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Gdy wpisujesz polecenie, Bash wykonuje 4 kroki:
          </p>
          <Row code="1">
            <b>Rozdzielenie na tokeny</b> — echo "Hello World" → 2 tokeny
          </Row>
          <Row code="2">
            <b>Podstawienie zmiennych</b> — $name → wartosc zmiennej
          </Row>
          <Row code="3">
            <b>Rozwijanie wzorcow (globbing)</b> — *.txt → lista plikow
          </Row>
          <Row code="4">
            <b>Wyszukiwanie polecenia</b> — PATH lub wbudowane
          </Row>

          <Divider />
          <SectionLabel>Zmienne specjalne skryptu</SectionLabel>
          <Row code="$#">liczba argumentow</Row>
          <Row code="$0">nazwa skryptu</Row>
          <Row code="$1, $2...">argumenty pozycyjne</Row>
          <Row code="$@">wszystkie argumenty (lista)</Row>
          <Row code="$?">kod wyjscia ostatniego polecenia</Row>
          <Row code="$$">PID biezacego procesu</Row>

          <Divider />
          <SectionLabel>Sprawdzanie dostepnosci komendy</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              <H>which</H> echo
            </Cmd>
            <Cmd>
              <H>type</H> cd
            </Cmd>
            <Cmd>
              <H>command</H> -v git &amp;&gt;/dev/null
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Arytmetyka === */}
        <Card title="Operacje arytmetyczne" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Bash traktuje wszystko jako tekst — do obliczen potrzebna jest
            specjalna skladnia <code className="text-xs">$(( ))</code>.
          </p>
          <ExampleBlock variant="green">
            <Cmd>
              a=<V>10</V>
            </Cmd>
            <Cmd>
              b=<V>3</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              suma=<H>$((</H>a + b<H>))</H>
              {'       '}
              <span className="text-[var(--c-muted)]"># 13</span>
            </Cmd>
            <Cmd>
              roznica=<H>$((</H>a - b<H>))</H>
              {'    '}
              <span className="text-[var(--c-muted)]"># 7</span>
            </Cmd>
            <Cmd>
              iloczyn=<H>$((</H>a * b<H>))</H>
              {'    '}
              <span className="text-[var(--c-muted)]"># 30</span>
            </Cmd>
            <Cmd>
              dzielenie=<H>$((</H>a / b<H>))</H>
              {'  '}
              <span className="text-[var(--c-muted)]"># 3 (calkowite!)</span>
            </Cmd>
            <Cmd>
              modulo=<H>$((</H>a % b<H>))</H>
              {'     '}
              <span className="text-[var(--c-muted)]"># 1</span>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Praktyczne zastosowanie</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Liczenie plikow</Comment>
            <Cmd>
              file_count=<H>$((</H>file_count + 1<H>))</H>
            </Cmd>
            <Comment># Obliczanie rozmiaru</Comment>
            <Cmd>
              size_mb=<H>$((</H>size_bytes / 1024 / 1024<H>))</H>
            </Cmd>
            <Comment># Czas trwania</Comment>
            <Cmd>
              duration=<H>$((</H>end_time - start_time<H>))</H>
            </Cmd>
          </ExampleBlock>

          <InfoBox>
            Bash obsluguje tylko liczby calkowite. Dla dziesietnych uzyj{' '}
            <code className="text-xs">bc</code>:{' '}
            <code className="text-xs">$(echo "10 / 3" | bc -l)</code>
          </InfoBox>
        </Card>

        {/* === Warunki === */}
        <Card title="Warunki (if / then / fi)" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># Operatory plikow</Comment>
            <Cmd>
              file=<V>"test.txt"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>if</H> [[ <V>-f "$file"</V> ]]; <H>then</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Plik istnieje"</V>
            </Cmd>
            <Cmd>
              <H>else</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Plik nie istnieje"</V>
            </Cmd>
            <Cmd>
              <H>fi</H>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Operatory plikow</SectionLabel>
          <Row code="-f">czy plik istnieje?</Row>
          <Row code="-d">czy katalog istnieje?</Row>
          <Row code="-r">czy plik jest czytelny?</Row>
          <Row code="-w">czy plik jest do pisania?</Row>
          <Row code="-x">czy plik jest wykonywalny?</Row>

          <Divider />
          <SectionLabel>Porownanie liczb</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              <H>if</H> [[ <V>$number</V> -gt 10 ]]; <H>then</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"wieksze niz 10"</V>
            </Cmd>
            <Cmd>
              <H>elif</H> [[ <V>$number</V> -eq 10 ]]; <H>then</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"rowne 10"</V>
            </Cmd>
            <Cmd>
              <H>else</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"mniejsze niz 10"</V>
            </Cmd>
            <Cmd>
              <H>fi</H>
            </Cmd>
          </ExampleBlock>

          <Row code="-eq">rowne (equal)</Row>
          <Row code="-ne">rozne (not equal)</Row>
          <Row code="-gt / -ge">wieksze / wieksze-rowne</Row>
          <Row code="-lt / -le">mniejsze / mniejsze-rowne</Row>

          <Divider />
          <SectionLabel>[[ ]] vs [ ]</SectionLabel>
          <ExampleBlock>
            <Comment># [[ ]] — nowszy, bezpieczniejszy, wspiera regex</Comment>
            <Cmd>
              if [[ <V>$zmienna</V> = <V>"test value"</V> ]]; then
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Cudzyslowy opcjonalne"</V>
            </Cmd>
            <Cmd>fi</Cmd>
          </ExampleBlock>

          <InfoBox>
            Uzywaj <code className="text-xs">[[ ]]</code> zamiast{' '}
            <code className="text-xs">[ ]</code> — obsluguje spacje bez
            cytowania i wspiera operatory <code className="text-xs">&&</code>,{' '}
            <code className="text-xs">||</code> bezposrednio.
          </InfoBox>
        </Card>

        {/* === Logika warunkowa === */}
        <Card title="Logika warunkowa (AND / OR)" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Comment># AND — oba warunki musza byc prawdziwe</Comment>
            <Cmd>
              <H>if</H> [[ <V>-f "$file"</V> <H>&&</H> <V>-r "$file"</V> ]];{' '}
              <H>then</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Plik istnieje i jest czytelny"</V>
            </Cmd>
            <Cmd>
              <H>fi</H>
            </Cmd>
          </ExampleBlock>

          <ExampleBlock variant="orange">
            <Comment># OR — wystarczy jeden warunek</Comment>
            <Cmd>
              <H>if</H> [[ <V>-f "$file"</V> <H>||</H> <V>-d "$file"</V> ]];{' '}
              <H>then</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Sciezka istnieje jako plik lub katalog"</V>
            </Cmd>
            <Cmd>
              <H>fi</H>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Jednolinijkowe warunki</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># && = jesli sukces, wykonaj nastepne</Comment>
            <Cmd>
              [[ -d /tmp ]] <H>&&</H> echo <V>"tmp istnieje"</V>
            </Cmd>
            <Comment># || = jesli porazka, wykonaj nastepne</Comment>
            <Cmd>
              [[ -d /brak ]] <H>||</H> echo <V>"katalog nie istnieje"</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Petle for === */}
        <Card title="Petla for" color="var(--c-accent)">
          <SectionLabel>Iteracja po liscie</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              <H>for</H> word <H>in</H> <V>jeden dwa trzy cztery</V>; <H>do</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Wyraz: $word"</V>
            </Cmd>
            <Cmd>
              <H>done</H>
            </Cmd>
          </ExampleBlock>

          <SectionLabel>Iteracja po plikach</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              <H>for</H> file <H>in</H> <F>*.txt</F>; <H>do</H>
            </Cmd>
            <Cmd>
              {'  '}
              <H>if</H> [[ <V>-f "$file"</V> ]]; <H>then</H>
            </Cmd>
            <Cmd>
              {'    '}echo <V>"Plik: $file"</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>fi</H>
            </Cmd>
            <Cmd>
              <H>done</H>
            </Cmd>
          </ExampleBlock>

          <SectionLabel>Zakres liczb</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              <H>for</H> i <H>in</H> <V>{'{1..5}'}</V>; <H>do</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Liczba: $i"</V>
            </Cmd>
            <Cmd>
              <H>done</H>
            </Cmd>
          </ExampleBlock>

          <SectionLabel>Iteracja po serwerach (DevOps)</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              servers=<V>"server1 server2 server3"</V>
            </Cmd>
            <Cmd>
              <H>for</H> server <H>in</H> $servers; <H>do</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Sprawdzam: $server"</V>
            </Cmd>
            <Cmd>
              <H>done</H>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Petla while === */}
        <Card title="Petla while" color="var(--c-accent)">
          <SectionLabel>Podstawowa petla z licznikiem</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              counter=<V>1</V>
            </Cmd>
            <Cmd>
              <H>while</H> [[ <V>$counter</V> -le 5 ]]; <H>do</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Counter: $counter"</V>
            </Cmd>
            <Cmd>{'  '}((counter++))</Cmd>
            <Cmd>
              <H>done</H>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Czytanie pliku linijka po linijce</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Bardzo wazne w DevOps — przetwarzanie logow</Comment>
            <Cmd>
              <H>while</H> IFS= read -r line; <H>do</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Linia: $line"</V>
            </Cmd>
            <Cmd>
              <H>done</H> &lt; <F>/var/log/auth.log</F>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-xs">IFS=</code> resetuje separator pol (chroni
            spacje). <code className="text-xs">read -r</code> nie interpretuje
            backslashy doslownie.
          </InfoBox>
        </Card>

        {/* === Funkcje === */}
        <Card title="Funkcje" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Bloki kodu wielokrotnego uzytku. Organizuja kod i unikaja powtorzen.
          </p>
          <ExampleBlock variant="yellow">
            <Comment># Definicja funkcji</Comment>
            <Cmd>
              <H>create_dir</H>() {'{'}
            </Cmd>
            <Cmd>
              {'  '}local <H>dir</H>=<V>"$1"</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>if</H> [[ -d <V>"$dir"</V> ]]; <H>then</H>
            </Cmd>
            <Cmd>
              {'    '}echo <V>"[WARNING] Katalog $dir juz istnieje"</V>
            </Cmd>
            <Cmd>
              {'    '}
              <H>return</H> <V>1</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>fi</H>
            </Cmd>
            <Cmd>
              {'  '}mkdir -p <V>"$dir"</V>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"[OK] Utworzono katalog $dir"</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>return</H> <V>0</V>
            </Cmd>
            <Cmd>{'}'}</Cmd>
          </ExampleBlock>

          <ExampleBlock variant="yellow">
            <Comment># Wywolanie z warunkiem na wyniku</Comment>
            <Cmd>
              <H>if</H> ! create_dir <V>"$project_name"</V>; <H>then</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"[ERROR] Nie mozna utworzyc projektu"</V>
            </Cmd>
            <Cmd>{'  '}exit 1</Cmd>
            <Cmd>
              <H>fi</H>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Kluczowe zasady</SectionLabel>
          <Row code="local">zmienna widoczna tylko w funkcji</Row>
          <Row code="return 0">sukces (exit code 0)</Row>
          <Row code="return 1">blad (exit code &gt; 0)</Row>
          <Row code="$1, $2...">argumenty funkcji</Row>
        </Card>

        {/* === Tablice === */}
        <Card title="Tablice" color="var(--c-purple)">
          <SectionLabel>Tablica indeksowana</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Deklaracja</Comment>
            <Cmd>
              <H>base_dirs</H>=(<V>"src" "tests" "docs" "config"</V>)
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Odczyt elementu</Comment>
            <Cmd>
              echo <H>${'{base_dirs[0]}'}</H>
              {'  '}
              <span className="text-[var(--c-muted)]"># src</span>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Wszystkie elementy</Comment>
            <Cmd>
              echo <H>${'{base_dirs[@]}'}</H>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Liczba elementow</Comment>
            <Cmd>
              echo <H>${'{#base_dirs[@]}'}</H>
              {'  '}
              <span className="text-[var(--c-muted)]"># 4</span>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Iteracja po tablicy</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              <H>for</H> dir <H>in</H> <V>"${'{base_dirs[@]}'}"</V>; <H>do</H>
            </Cmd>
            <Cmd>
              {'  '}mkdir -p <V>"$project/$dir"</V>
            </Cmd>
            <Cmd>
              <H>done</H>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Tablica asocjacyjna (bash 4+)</SectionLabel>
          <ExampleBlock variant="purple">
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
              PORTY[<V>ssh</V>]=<V>22</V>
            </Cmd>
            <Cmd>
              echo <V>"HTTPS port: ${'{PORTY[https]}'}"</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Praktyczny przyklad === */}
        <Card
          title="Praktyczny przyklad: project_setup.sh"
          color="var(--c-green)"
          full
        >
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Kompletny skrypt automatyzujacy tworzenie struktury projektu —
            realny scenariusz DevOps.
          </p>
          <ExampleBlock variant="green">
            <Cmd>
              <H>#!/bin/bash</H>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Sprawdzamy, czy podano nazwe projektu</Comment>
            <Cmd>
              <H>if</H> [[ <V>$#</V> -eq 0 ]]; <H>then</H>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Uzycie: $0 &lt;nazwa_projektu&gt;"</V>
            </Cmd>
            <Cmd>{'  '}exit 1</Cmd>
            <Cmd>
              <H>fi</H>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              project_name=<V>"$1"</V>
            </Cmd>
            <Cmd>
              base_dirs=(<V>"src" "tests" "docs" "config"</V>)
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Funkcja tworzenia katalogu</Comment>
            <Cmd>create_dir() {'{'}</Cmd>
            <Cmd>
              {'  '}local dir=<V>"$1"</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>if</H> [[ -d <V>"$dir"</V> ]]; <H>then</H>
            </Cmd>
            <Cmd>
              {'    '}echo <V>"[WARNING] $dir juz istnieje"</V>
            </Cmd>
            <Cmd>
              {'    '}
              <H>return</H> 1
            </Cmd>
            <Cmd>
              {'  '}
              <H>fi</H>
            </Cmd>
            <Cmd>
              {'  '}mkdir -p <V>"$dir"</V> && echo <V>"[OK] Utworzono $dir"</V>
            </Cmd>
            <Cmd>{'}'}</Cmd>
            <Cmd> </Cmd>
            <Comment># Glowna logika</Comment>
            <Cmd>
              echo <V>"[INFO] Tworzenie projektu $project_name..."</V>
            </Cmd>
            <Cmd>
              <H>if</H> ! create_dir <V>"$project_name"</V>; <H>then</H>
            </Cmd>
            <Cmd>{'  '}exit 1</Cmd>
            <Cmd>
              <H>fi</H>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Tworzenie podkatalogow</Comment>
            <Cmd>
              <H>for</H> dir <H>in</H> <V>"${'{base_dirs[@]}'}"</V>; <H>do</H>
            </Cmd>
            <Cmd>
              {'  '}create_dir <V>"$project_name/$dir"</V>
            </Cmd>
            <Cmd>
              <H>done</H>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Inicjalizacja git jesli dostepny</Comment>
            <Cmd>
              <H>if</H> command -v git &amp;&gt;/dev/null; <H>then</H>
            </Cmd>
            <Cmd>
              {'  '}( cd <V>"$project_name"</V> && git init )
            </Cmd>
            <Cmd>
              <H>fi</H>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              echo <V>"[SUCCESS] Projekt $project_name utworzony!"</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Ten skrypt laczy wszystkie koncepcje z lekcji: zmienne, warunki,
            petle, tablice, funkcje i sprawdzanie dostepnosci komend.
          </InfoBox>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/10', label: '10 — Repozytoria' }}
        next={{ to: '/lessons/12', label: '12 — Bash w praktyce' }}
      />
    </div>
  );
}
