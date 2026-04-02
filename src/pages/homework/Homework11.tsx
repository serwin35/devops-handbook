import { useState } from 'react';
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
import InfoBox from '../../components/InfoBox';
import SectionLabel from '../../components/SectionLabel';
import Divider from '../../components/Divider';
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
        {open ? '\u25BC' : '\u25B6'} {title}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

export default function Homework11() {
  usePageTitle('Homework 11');

  return (
    <div>
      <PageHeader
        title="Homework 11 — Wprowadzenie do Bash"
        subtitle="Zmienne, arytmetyka, warunki, petle, tablice, funkcje, skrypty"
        color="var(--c-orange)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Zadanie 1 */}
        <Card title="1. Zmienne i podstawowe operacje" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz skrypt ktory deklaruje zmienne, wyswietla je i wykonuje
            podstawowe operacje arytmetyczne.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Deklarowanie i uzywanie zmiennych</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Comment># Zmienne proste</Comment>
              <Cmd>
                name=<V>"Bash"</V>
              </Cmd>
              <Cmd>
                version=<V>5</V>
              </Cmd>
              <Cmd>
                path=<V>"/usr/local/bin"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Wyswietlanie zmiennych</Comment>
              <Cmd>
                echo <V>"Jezyk: $name"</V>
              </Cmd>
              <Cmd>
                echo <V>"Wersja: $version"</V>
              </Cmd>
              <Cmd>
                echo <V>"Sciezka: ${'{path}'}"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Operacje na zmiennych</Comment>
              <Cmd>
                echo <V>"Liczba znakow w 'name': ${'{#name}'}"</V>
              </Cmd>
              <Cmd>
                echo <V>"Zamiana: ${'{name/Bash/Shell}'}"</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Operacje arytmetyczne</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Cmd>
                a=<V>10</V>
              </Cmd>
              <Cmd>
                b=<V>3</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                suma=<H>$((</H>a + b<H>))</H>
              </Cmd>
              <Cmd>
                roznica=<H>$((</H>a - b<H>))</H>
              </Cmd>
              <Cmd>
                iloczyn=<H>$((</H>a * b<H>))</H>
              </Cmd>
              <Cmd>
                dzielenie=<H>$((</H>a / b<H>))</H>
              </Cmd>
              <Cmd>
                modulo=<H>$((</H>a % b<H>))</H>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                echo <V>"Suma: $suma"</V>
              </Cmd>
              <Cmd>
                echo <V>"Roznica: $roznica"</V>
              </Cmd>
              <Cmd>
                echo <V>"Iloczyn: $iloczyn"</V>
              </Cmd>
              <Cmd>
                echo <V>"Dzielenie: $dzielenie"</V>
              </Cmd>
              <Cmd>
                echo <V>"Modulo: $modulo"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Dla dziesietnych uzyj bc</Comment>
              <Cmd>
                wynik=<H>$(</H>echo <V>"10 / 3"</V> | bc -l<H>)</H>
              </Cmd>
              <Cmd>
                echo <V>"Dokladny wynik: $wynik"</V>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Pamietaj: <code className="text-xs">$((a / b))</code> zwraca
              dzielenie calkowite (3, nie 3.33). Dla precyzyjnych obliczen uzyj{' '}
              <code className="text-xs">bc -l</code>.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 2 */}
        <Card
          title="2. Instrukcje warunkowe (if/then/fi)"
          color="var(--c-orange)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz skrypt ktory sprawdza pliki, porownuje liczby i uzywa logiki
            AND/OR.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>
              Warunkowe sprawdzenia — operatory plikow
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Cmd>
                file=<V>"test.txt"</V>
              </Cmd>
              <Cmd>
                number=<V>15</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Sprawdzenie pliku</Comment>
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
              <Cmd> </Cmd>
              <Comment># Porownanie liczb</Comment>
              <Cmd>
                <H>if</H> [[ <V>$number</V> -gt 10 ]]; <H>then</H>
              </Cmd>
              <Cmd>
                {'  '}echo <V>"$number jest wieksze niz 10"</V>
              </Cmd>
              <Cmd>
                <H>elif</H> [[ <V>$number</V> -eq 10 ]]; <H>then</H>
              </Cmd>
              <Cmd>
                {'  '}echo <V>"$number rowna sie 10"</V>
              </Cmd>
              <Cmd>
                <H>else</H>
              </Cmd>
              <Cmd>
                {'  '}echo <V>"$number jest mniejsze niz 10"</V>
              </Cmd>
              <Cmd>
                <H>fi</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Sprawdzenie katalogu</Comment>
              <Cmd>
                <H>if</H> [[ <V>-d "/tmp"</V> ]]; <H>then</H>
              </Cmd>
              <Cmd>
                {'  '}echo <V>"/tmp jest katalogiem"</V>
              </Cmd>
              <Cmd>
                <H>fi</H>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Logika warunkowa (AND/OR)
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Cmd>
                file=<V>"test.txt"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># AND — oba warunki</Comment>
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
              <Cmd> </Cmd>
              <Comment># OR — wystarczy jeden</Comment>
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

            <InfoBox>
              Uzywaj <code className="text-xs">[[ ]]</code> zamiast{' '}
              <code className="text-xs">[ ]</code> — nie wymaga cytowania
              zmiennych i wspiera <code className="text-xs">&&</code>,{' '}
              <code className="text-xs">||</code>.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 3 */}
        <Card title="3. Petle for i while" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz skrypty z petlami for i while — iteracja po listach, plikach,
            zakresach i czytanie logow.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Petla for — rozne formy</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Iteracja po slowach</Comment>
              <Cmd>
                <H>for</H> word <H>in</H> <V>jeden dwa trzy cztery</V>;{' '}
                <H>do</H>
              </Cmd>
              <Cmd>
                {'  '}echo <V>"Wyraz: $word"</V>
              </Cmd>
              <Cmd>
                <H>done</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Iteracja po plikach</Comment>
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
              <Cmd> </Cmd>
              <Comment># Zakres liczb</Comment>
              <Cmd>
                <H>for</H> i <H>in</H> <V>{'{1..5}'}</V>; <H>do</H>
              </Cmd>
              <Cmd>
                {'  '}echo <V>"Liczba: $i"</V>
              </Cmd>
              <Cmd>
                <H>done</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Iteracja z seq</Comment>
              <Cmd>
                <H>for</H> i <H>in</H> <H>$(</H>seq 1 2 10<H>)</H>; <H>do</H>
              </Cmd>
              <Cmd>
                {'  '}echo <V>"i=$i"</V>
              </Cmd>
              <Cmd>
                <H>done</H>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Iteracja po serwerach (praktyka DevOps)
            </SectionLabel>
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

            <SectionLabel className="mt-2">Petla while</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># While z licznikiem</Comment>
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

            <SectionLabel className="mt-2">
              Czytanie pliku linijka po linijce
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Przetwarzanie logow — typowe zadanie DevOps</Comment>
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
              <code className="text-xs">IFS= read -r</code> to bezpieczny idiom
              czytania pliku: zachowuje spacje i nie interpretuje backslashy.
            </InfoBox>
          </Spoiler>
        </Card>

        <Divider />

        {/* Zadanie 4 — Challenge */}
        <Card
          title="4. Skrypt automatyzacji — project_setup.sh"
          color="var(--c-purple)"
          full
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz kompletny skrypt ktory tworzy strukture nowego projektu:
            katalogi (src, tests, docs, config), README.md z opisem,
            inicjalizuje git. Skrypt powinien uzywac funkcji, tablic, warunkow i
            petli.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <ExampleBlock variant="purple">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Sprawdz argumenty</Comment>
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
                {'  '}
                <H>if</H> mkdir -p <V>"$dir"</V>; <H>then</H>
              </Cmd>
              <Cmd>
                {'    '}echo <V>"[OK] Utworzono $dir"</V>
              </Cmd>
              <Cmd>
                {'    '}
                <H>return</H> 0
              </Cmd>
              <Cmd>
                {'  '}
                <H>else</H>
              </Cmd>
              <Cmd>
                {'    '}echo <V>"[ERROR] Blad tworzenia $dir"</V>
              </Cmd>
              <Cmd>
                {'    '}
                <H>return</H> 1
              </Cmd>
              <Cmd>
                {'  '}
                <H>fi</H>
              </Cmd>
              <Cmd>{'}'}</Cmd>
              <Cmd> </Cmd>
              <Comment># Funkcja tworzenia README</Comment>
              <Cmd>create_readme() {'{'}</Cmd>
              <Cmd>
                {'  '}local project=<V>"$1"</V>
              </Cmd>
              <Cmd>
                {'  '}cat &gt; <V>"$project/README.md"</V> {'<<'} <H>EOF</H>
              </Cmd>
              <Cmd># $project</Cmd>
              <Cmd> </Cmd>
              <Cmd>## O projekcie</Cmd>
              <Cmd>Opis projektu</Cmd>
              <Cmd> </Cmd>
              <Cmd>## Struktura</Cmd>
              <Cmd>
                $(for dir in "${'{base_dirs[@]}'}" ; do echo "- \`$dir/\`" ;
                done)
              </Cmd>
              <Cmd>
                <H>EOF</H>
              </Cmd>
              <Cmd>
                {'  '}echo <V>"[OK] Utworzono README.md"</V>
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
              <Cmd>
                {'  '}echo <V>"[ERROR] Nie mozna utworzyc projektu"</V>
              </Cmd>
              <Cmd>{'  '}exit 1</Cmd>
              <Cmd>
                <H>fi</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Tworzenie podkatalogow petla</Comment>
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
              <Cmd>
                create_readme <V>"$project_name"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Inicjalizacja git jesli dostepny</Comment>
              <Cmd>
                <H>if</H> command -v git &amp;&gt;/dev/null; <H>then</H>
              </Cmd>
              <Cmd>
                {'  '}( cd <V>"$project_name"</V> && git init &&
              </Cmd>
              <Cmd>
                {'    '}echo <V>"[OK] Zainicjalizowano Git"</V> )
              </Cmd>
              <Cmd>
                <H>fi</H>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                echo <V>"[SUCCESS] Projekt $project_name utworzony!"</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Uruchomienie</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                chmod +x <F>project_setup.sh</F>
              </Cmd>
              <Cmd>
                <F>./project_setup.sh</F> <V>moj_projekt</V>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Ten skrypt laczy wszystkie koncepcje: <b>$#</b> i <b>$1</b>{' '}
              (parametry), <b>funkcje</b> z return, <b>tablice</b>,{' '}
              <b>petle for</b>, <b>warunki if</b>, <b>heredoc</b> i{' '}
              <b>command -v</b> (sprawdzenie dostepnosci komendy).
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 5 — Challenge */}
        <Card
          title="5. Skrypt monitorujacy — health_check.sh"
          color="var(--c-purple)"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz skrypt ktory sprawdza: miejsce na dysku, uzycie pamieci,
            dzialanie uslug i generuje raport.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <ExampleBlock variant="purple">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Konfiguracja</Comment>
              <Cmd>
                DISK_THRESHOLD=<V>80</V>
              </Cmd>
              <Cmd>
                SERVICES=(<V>"sshd" "nginx" "docker"</V>)
              </Cmd>
              <Cmd>
                REPORT=<V>"/tmp/health_report_$(date +%Y%m%d).txt"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Funkcja logowania</Comment>
              <Cmd>log() {'{'}</Cmd>
              <Cmd>
                {'  '}echo <V>"[$(date '+%H:%M:%S')] $1"</V> | tee -a{' '}
                <V>"$REPORT"</V>
              </Cmd>
              <Cmd>{'}'}</Cmd>
              <Cmd> </Cmd>
              <Comment># Sprawdz dysk</Comment>
              <Cmd>check_disk() {'{'}</Cmd>
              <Cmd>{'  '}local usage</Cmd>
              <Cmd>
                {'  '}usage=<H>$(</H>df / | awk 'NR==2 {'{print $5}'}' | tr -d
                '%'<H>)</H>
              </Cmd>
              <Cmd>
                {'  '}
                <H>if</H> [[ <V>$usage</V> -gt <V>$DISK_THRESHOLD</V> ]];{' '}
                <H>then</H>
              </Cmd>
              <Cmd>
                {'    '}log{' '}
                <V>
                  "[WARN] Dysk: ${'{usage}'}% (prog: ${'{DISK_THRESHOLD}'}%)"
                </V>
              </Cmd>
              <Cmd>
                {'  '}
                <H>else</H>
              </Cmd>
              <Cmd>
                {'    '}log <V>"[OK] Dysk: ${'{usage}'}%"</V>
              </Cmd>
              <Cmd>
                {'  '}
                <H>fi</H>
              </Cmd>
              <Cmd>{'}'}</Cmd>
              <Cmd> </Cmd>
              <Comment># Sprawdz uslugi</Comment>
              <Cmd>check_services() {'{'}</Cmd>
              <Cmd>
                {'  '}
                <H>for</H> svc <H>in</H> <V>"${'{SERVICES[@]}'}"</V>; <H>do</H>
              </Cmd>
              <Cmd>
                {'    '}
                <H>if</H> command -v systemctl &amp;&gt;/dev/null && systemctl
                is-active --quiet <V>"$svc"</V>; <H>then</H>
              </Cmd>
              <Cmd>
                {'      '}log <V>"[OK] Usluga $svc dziala"</V>
              </Cmd>
              <Cmd>
                {'    '}
                <H>else</H>
              </Cmd>
              <Cmd>
                {'      '}log <V>"[WARN] Usluga $svc nie dziala"</V>
              </Cmd>
              <Cmd>
                {'    '}
                <H>fi</H>
              </Cmd>
              <Cmd>
                {'  '}
                <H>done</H>
              </Cmd>
              <Cmd>{'}'}</Cmd>
              <Cmd> </Cmd>
              <Comment># Glowna logika</Comment>
              <Cmd>
                log <V>"=== Health Check ==="</V>
              </Cmd>
              <Cmd>check_disk</Cmd>
              <Cmd>check_services</Cmd>
              <Cmd>
                log <V>"Raport zapisany: $REPORT"</V>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Typowy skrypt DevOps: tablice z konfiguracją uslug, funkcje do
              modularnosci, petla do sprawdzenia wielu uslug,{' '}
              <code className="text-xs">command -v</code> do sprawdzenia
              systemctl, <code className="text-xs">tee</code> do logowania na
              ekran i do pliku jednoczesnie.
            </InfoBox>
          </Spoiler>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/11', label: '11 — Wprowadzenie do Bash' }}
      />
    </div>
  );
}
