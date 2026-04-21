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

export default function Lesson12() {
  usePageTitle('Lekcja 12 — Bash w praktyce');

  return (
    <div>
      <PageHeader
        title="Lekcja 12 — Bash w praktyce: od podstaw do zaawansowania"
        subtitle="getopts · logowanie · trap/cleanup · PID files · obsluga bledow · backup w praktyce"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === Cele lekcji === */}
        <Card title="Cele lekcji" color="var(--c-green)">
          <Concept title="Co sie nauczysz?" color="var(--c-green)">
            Lekcja 12 to przejscie od prostych skryptow do produkcyjnych
            narzedzi DevOps. Nauczysz sie pisac skrypty, ktore sa odporne na
            bledy, czyszcza po sobie i maja czytelne logi.
          </Concept>
          <Divider />
          <Row code="1">
            <b>Parametry CLI</b> — <code className="text-xs">getopts</code> i{' '}
            <code className="text-xs">case/shift</code>
          </Row>
          <Row code="2">
            <b>Logowanie</b> — poziomy INFO / WARN / ERROR / DEBUG
          </Row>
          <Row code="3">
            <b>trap + cleanup</b> — bezpieczne pliki tymczasowe
          </Row>
          <Row code="4">
            <b>PID files</b> — kontrola procesow w tle
          </Row>
          <Row code="5">
            <b>Obsluga bledow</b> —{' '}
            <code className="text-xs">set -euo pipefail</code>
          </Row>
        </Card>

        {/* === Obsluga parametrow (case/shift) === */}
        <Card
          title="Parametry CLI — case/shift (dlugie opcje)"
          color="var(--c-orange)"
        >
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Zamiast sztywnych <code className="text-xs">$1 $2 $3</code> — petla{' '}
            <code className="text-xs">while</code> +{' '}
            <code className="text-xs">case</code> pozwala na dowolna kolejnosc i
            dlugie opcje <code className="text-xs">--verbose</code>.
          </p>
          <ExampleBlock variant="orange">
            <Cmd>
              <H>#!/bin/bash</H>
            </Cmd>
            <Comment># Wartosci domyslne</Comment>
            <Cmd>
              verbose=<V>0</V>
            </Cmd>
            <Cmd>
              output_file=<V>"output.txt"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>while</H> [[ <V>$#</V> -gt 0 ]]; <H>do</H>
            </Cmd>
            <Cmd>
              {'  '}
              <H>case</H> <V>"$1"</V> <H>in</H>
            </Cmd>
            <Cmd>
              {'    '}-v|--verbose)
            </Cmd>
            <Cmd>
              {'      '}verbose=<V>1</V>; <H>shift</H> ;;
            </Cmd>
            <Cmd>
              {'    '}-o|--output)
            </Cmd>
            <Cmd>
              {'      '}output_file=<V>"$2"</V>; <H>shift 2</H> ;;
            </Cmd>
            <Cmd>
              {'    '}-h|--help)
            </Cmd>
            <Cmd>
              {'      '}echo <V>"Uzycie: $0 [-v] [-o plik]"</V>; exit 0 ;;
            </Cmd>
            <Cmd>
              {'    '}*)
            </Cmd>
            <Cmd>
              {'      '}echo <V>"Nieznany parametr: $1"</V>; exit 1 ;;
            </Cmd>
            <Cmd>
              {'  '}
              <H>esac</H>
            </Cmd>
            <Cmd>
              <H>done</H>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-xs">shift</code> usuwa przetworzony argument,{' '}
            <code className="text-xs">shift 2</code> dla opcji z wartoscia (np.{' '}
            <code className="text-xs">-o plik</code>).
          </InfoBox>
        </Card>

        {/* === getopts === */}
        <Card title="Parametry CLI — getopts (krotkie opcje)" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Wbudowana alternatywa dla <code className="text-xs">case/shift</code> — standard
            Unix dla jednoliterowych flag.
          </p>
          <ExampleBlock variant="orange">
            <Cmd>
              output_file=<V>"output.txt"</V>
            </Cmd>
            <Cmd>
              verbose=<V>0</V>
            </Cmd>
            <Cmd>
              debug=<V>0</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>while</H> getopts <V>"vdo:h"</V> opt; <H>do</H>
            </Cmd>
            <Cmd>
              {'  '}
              <H>case</H> <V>$opt</V> <H>in</H>
            </Cmd>
            <Cmd>
              {'    '}v) verbose=<V>1</V> ;;
            </Cmd>
            <Cmd>
              {'    '}d) debug=<V>1</V> ;;
            </Cmd>
            <Cmd>
              {'    '}o) output_file=<V>"$OPTARG"</V> ;;
            </Cmd>
            <Cmd>
              {'    '}h|*) echo <V>"Uzycie: $0 [-v] [-d] [-o plik]"</V>; exit 1 ;;
            </Cmd>
            <Cmd>
              {'  '}
              <H>esac</H>
            </Cmd>
            <Cmd>
              <H>done</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Skladnia opcji</SectionLabel>
          <Row code='"vdo:h"'>v, d, h — bez argumentu; o: — z argumentem</Row>
          <Row code="$OPTARG">wartosc dla opcji z argumentem</Row>
          <Row code="$OPTIND">indeks nastepnego argumentu</Row>
          <InfoBox>
            <b>Kiedy uzyc czego?</b>
            <br />
            <code className="text-xs">getopts</code> — klasyczne jednoliterowe (
            <code className="text-xs">-v</code>).{' '}
            <code className="text-xs">case/shift</code> — dlugie opcje (
            <code className="text-xs">--verbose</code>).
          </InfoBox>
        </Card>

        {/* === Logowanie === */}
        <Card title="Logowanie z poziomami" color="var(--c-yellow)">
          <Concept title="Dlaczego poziomy?" color="var(--c-yellow)">
            Profesjonalne skrypty rozrozniaja INFO / WARN / ERROR / DEBUG.
            Pozwala to filtrowac logi, kierowac bledy na{' '}
            <code className="text-xs">stderr</code> i warunkowo pokazywac DEBUG.
          </Concept>
          <Divider />
          <ExampleBlock variant="yellow">
            <Cmd>
              <H>#!/bin/bash</H>
            </Cmd>
            <Cmd>
              DEBUG=<V>0</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>log() {'{'}</Cmd>
            <Cmd>
              {'  '}local level=<V>"$1"</V>; <H>shift</H>
            </Cmd>
            <Cmd>
              {'  '}local msg=<V>"$*"</V>
            </Cmd>
            <Cmd>
              {'  '}local ts=<H>$(</H>date <V>'+%Y-%m-%d %H:%M:%S'</V>
              <H>)</H>
            </Cmd>
            <Cmd>
              {'  '}
              <H>case</H> <V>$level</V> <H>in</H>
            </Cmd>
            <Cmd>
              {'    '}INFO) echo <V>"[$ts] [INFO]  $msg"</V> ;;
            </Cmd>
            <Cmd>
              {'    '}WARN) echo <V>"[$ts] [WARN]  $msg"</V> &gt;&amp;2 ;;
            </Cmd>
            <Cmd>
              {'    '}ERROR) echo <V>"[$ts] [ERROR] $msg"</V> &gt;&amp;2 ;;
            </Cmd>
            <Cmd>
              {'    '}DEBUG) [[ <V>$DEBUG</V> -eq 1 ]] && echo{' '}
              <V>"[$ts] [DEBUG] $msg"</V> ;;
            </Cmd>
            <Cmd>
              {'  '}
              <H>esac</H>
            </Cmd>
            <Cmd>{'}'}</Cmd>
            <Cmd> </Cmd>
            <Cmd>
              log INFO <V>"Start aplikacji"</V>
            </Cmd>
            <Cmd>
              log WARN <V>"Mala ilosc pamieci"</V>
            </Cmd>
            <Cmd>
              log ERROR <V>"Nie znaleziono pliku"</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Rozdzielanie logow</SectionLabel>
          <ExampleBlock>
            <Comment># stdout -&gt; info.log, stderr -&gt; error.log</Comment>
            <Cmd>
              <F>./script.sh</F> &gt; info.log 2&gt; error.log
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === mktemp i trap === */}
        <Card
          title="Bezpieczne pliki tymczasowe (mktemp + trap)"
          color="var(--c-purple)"
        >
          <Concept title="Problem" color="var(--c-purple)">
            Skrypt tworzy plik <code className="text-xs">/tmp/dane.tmp</code>,
            ale zostaje przerwany (Ctrl+C). Plik zostaje na dysku. Z{' '}
            <code className="text-xs">trap</code> — czyszczenie wykonuje sie
            zawsze.
          </Concept>
          <Divider />
          <ExampleBlock variant="purple">
            <Cmd>
              <H>#!/bin/bash</H>
            </Cmd>
            <Cmd>
              <H>set -euo pipefail</H>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Tworz losowy plik temp</Comment>
            <Cmd>
              temp_file=<H>$(</H>mktemp<H>)</H>
            </Cmd>
            <Cmd>
              temp_dir=<H>$(</H>mktemp -d<H>)</H>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Funkcja czyszczaca</Comment>
            <Cmd>cleanup() {'{'}</Cmd>
            <Cmd>
              {'  '}local code=<V>$?</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>if</H> [[ -f <V>"$temp_file"</V> ]]; <H>then</H>
            </Cmd>
            <Cmd>
              {'    '}rm -f <V>"$temp_file"</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>fi</H>
            </Cmd>
            <Cmd>
              {'  '}
              <H>if</H> [[ -d <V>"$temp_dir"</V> ]]; <H>then</H>
            </Cmd>
            <Cmd>
              {'    '}rm -rf <V>"$temp_dir"</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>fi</H>
            </Cmd>
            <Cmd>
              {'  '}
              <H>return</H> <V>$code</V>
            </Cmd>
            <Cmd>{'}'}</Cmd>
            <Cmd> </Cmd>
            <Comment># Rejestracja - dziala nawet przy Ctrl+C</Comment>
            <Cmd>
              <H>trap</H> cleanup EXIT
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-xs">trap cleanup EXIT</code> — gwarantuje, ze{' '}
            <code className="text-xs">cleanup()</code> uruchomi sie zawsze:
            normalny koniec, blad, Ctrl+C, kill.
          </InfoBox>
        </Card>

        {/* === set -euo pipefail === */}
        <Card title="set -euo pipefail" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Magiczna linia — umiesc w kazdym produkcyjnym skrypcie:
          </p>
          <ExampleBlock variant="green">
            <Cmd>
              <H>set -euo pipefail</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="-e">zatrzymaj skrypt na pierwszym bledzie</Row>
          <Row code="-u">blad jesli zmienna jest niezdefiniowana</Row>
          <Row code="-o pipefail">blad w pipe zatrzymuje caly potok</Row>

          <Divider />
          <SectionLabel>Przyklad roznicy</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Bez set -e: kontynuuje mimo bledu!</Comment>
            <Cmd>
              <F>rm /nie/istnieje</F>
            </Cmd>
            <Cmd>
              echo <V>"Program leci dalej..."</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Z set -e: skrypt konczy dzialanie</Comment>
            <Cmd>
              <H>set -e</H>
            </Cmd>
            <Cmd>
              <F>rm /nie/istnieje</F> <Comment># &lt;-- exit tutaj</Comment>
            </Cmd>
          </ExampleBlock>

          <InfoBox>
            Ta jedna linia zapobiega wielu bugom w skryptach produkcyjnych.
          </InfoBox>
        </Card>

        {/* === PID files === */}
        <Card
          title="Procesy w tle i PID files"
          color="var(--c-accent)"
        >
          <Concept title="Po co PID file?" color="var(--c-accent)">
            Gdy uruchamiasz dlugi proces w tle, musisz wiedziec, czy juz dziala
            (aby nie odpalac duplikatow) i jak go zatrzymac.
          </Concept>
          <Divider />
          <ExampleBlock variant="default">
            <Cmd>
              PID_FILE=<V>"/var/run/myapp.pid"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>start_service() {'{'}</Cmd>
            <Cmd>
              {'  '}
              <H>if</H> [[ -f <V>"$PID_FILE"</V> ]]; <H>then</H>
            </Cmd>
            <Cmd>
              {'    '}old_pid=<H>$(</H>cat <V>"$PID_FILE"</V>
              <H>)</H>
            </Cmd>
            <Cmd>
              {'    '}
              <H>if</H> kill -0 <V>"$old_pid"</V> 2&gt;/dev/null; <H>then</H>
            </Cmd>
            <Cmd>
              {'      '}echo <V>"Juz dziala (PID: $old_pid)"</V>; return 1
            </Cmd>
            <Cmd>
              {'    '}
              <H>else</H>
            </Cmd>
            <Cmd>
              {'      '}rm -f <V>"$PID_FILE"</V>
            </Cmd>
            <Cmd>
              {'    '}
              <H>fi</H>
            </Cmd>
            <Cmd>
              {'  '}
              <H>fi</H>
            </Cmd>
            <Cmd>
              {'  '}sleep 1000 &amp;
            </Cmd>
            <Cmd>
              {'  '}echo <V>$!</V> &gt; <V>"$PID_FILE"</V>
            </Cmd>
            <Cmd>
              {'  '}echo <V>"Uruchomiono (PID: $!)"</V>
            </Cmd>
            <Cmd>{'}'}</Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="$!">PID ostatniego procesu w tle</Row>
          <Row code="kill -0 $pid">test czy proces zyje (bez zabijania)</Row>
          <Row code="2>/dev/null">tlumi komunikaty bledu</Row>
          <InfoBox>
            <code className="text-xs">kill -0</code> wysyla sygnal 0 — no-op.
            Zwraca 0 jesli proces istnieje, 1 jesli nie.
          </InfoBox>
        </Card>

        {/* === Praktyczny przyklad: backup.sh === */}
        <Card
          title="Praktyczny przyklad: backup.sh"
          color="var(--c-green)"
          full
        >
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Ulepszona kopia zapasowa katalogu — laczy wszystkie techniki lekcji:
            parametry z wartoscia domyslna, tar z kompresja, obsluga bledow.
          </p>
          <ExampleBlock variant="green">
            <Cmd>
              <H>#!/bin/bash</H>
            </Cmd>
            <Cmd>
              <H>set -euo pipefail</H>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Parametry z wartosciami domyslnymi</Comment>
            <Cmd>
              source_dir=<V>"${'${1:-.}'}"</V>
            </Cmd>
            <Cmd>
              backup_dir=<V>"${'${2:-./backups}'}"</V>
            </Cmd>
            <Cmd>
              date_suffix=<H>$(</H>date +%Y%m%d_%H%M%S<H>)</H>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Funkcja logowania</Comment>
            <Cmd>log() {'{'} echo <V>"[$(date '+%H:%M:%S')] $*"</V>; {'}'}</Cmd>
            <Cmd> </Cmd>
            <Comment># Walidacja katalogu zrodlowego</Comment>
            <Cmd>check_dirs() {'{'}</Cmd>
            <Cmd>
              {'  '}
              <H>if</H> [[ ! -d <V>"$source_dir"</V> ]]; <H>then</H>
            </Cmd>
            <Cmd>
              {'    '}log <V>"[ERROR] Katalog zrodlowy nie istnieje"</V>
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
              {'  '}mkdir -p <V>"$backup_dir"</V>
            </Cmd>
            <Cmd>{'}'}</Cmd>
            <Cmd> </Cmd>
            <Comment># Tworzenie backupu</Comment>
            <Cmd>create_backup() {'{'}</Cmd>
            <Cmd>
              {'  '}local file=
              <V>"$backup_dir/backup_${'${date_suffix}'}.tar.gz"</V>
            </Cmd>
            <Cmd>
              {'  '}log <V>"[INFO] Tworzenie $file"</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>if</H> tar -czf <V>"$file"</V> -C{' '}
              <H>$(</H>dirname <V>"$source_dir"</V>
              <H>)</H>{' '}
              <H>$(</H>basename <V>"$source_dir"</V>
              <H>)</H>; <H>then</H>
            </Cmd>
            <Cmd>
              {'    '}log <V>"[OK] Backup gotowy: $file"</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>else</H>
            </Cmd>
            <Cmd>
              {'    '}log <V>"[ERROR] Blad tworzenia backupu"</V>; return 1
            </Cmd>
            <Cmd>
              {'  '}
              <H>fi</H>
            </Cmd>
            <Cmd>{'}'}</Cmd>
            <Cmd> </Cmd>
            <Comment># Glowna logika (main)</Comment>
            <Cmd>main() {'{'}</Cmd>
            <Cmd>
              {'  '}
              <H>if</H> ! check_dirs; <H>then</H> exit 1; <H>fi</H>
            </Cmd>
            <Cmd>
              {'  '}
              <H>if</H> create_backup; <H>then</H>
            </Cmd>
            <Cmd>
              {'    '}log <V>"[SUCCESS] Proces zakonczony"</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>else</H>
            </Cmd>
            <Cmd>
              {'    '}log <V>"[FAILURE] Wystapil problem"</V>; exit 1
            </Cmd>
            <Cmd>
              {'  '}
              <H>fi</H>
            </Cmd>
            <Cmd>{'}'}</Cmd>
            <Cmd> </Cmd>
            <Cmd>main</Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Wzorzec main()</b> — funkcja glowna na koncu czyni skrypt
            testowalnym i umozliwia <code className="text-xs">source</code>{' '}
            bez uruchomienia logiki.
          </InfoBox>
        </Card>

        {/* === Slownik pojec === */}
        <Card title="Slownik pojec" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Heredoc</SectionLabel>
              <p className="text-[var(--c-muted)] text-[11px] mb-2">
                Sposob przekazywania wielu linii tekstu do polecenia przez{' '}
                <code className="text-xs">&lt;&lt; EOF ... EOF</code>.
              </p>
              <ExampleBlock variant="default">
                <Cmd>
                  cat &gt; plik.txt &lt;&lt; <H>EOF</H>
                </Cmd>
                <Cmd>Linia 1</Cmd>
                <Cmd>Linia 2</Cmd>
                <Cmd>
                  <H>EOF</H>
                </Cmd>
              </ExampleBlock>
            </div>

            <div>
              <SectionLabel>Trap (Signal Handler)</SectionLabel>
              <p className="text-[var(--c-muted)] text-[11px] mb-2">
                Mechanizm przechwytywania sygnalow (EXIT, INT, TERM) i
                uruchamiania funkcji czyszczacej.
              </p>
              <ExampleBlock variant="default">
                <Cmd>
                  <H>trap</H> cleanup EXIT INT TERM
                </Cmd>
              </ExampleBlock>
            </div>

            <div>
              <SectionLabel>Subshell</SectionLabel>
              <p className="text-[var(--c-muted)] text-[11px] mb-2">
                Nowy proces powloki w <code className="text-xs">(...)</code> — zmienne
                nie wplywaja na powloke rodzica.
              </p>
              <ExampleBlock variant="default">
                <Cmd>( cd /tmp; pwd ) <Comment># /tmp</Comment></Cmd>
                <Cmd>pwd <Comment># oryginalny katalog</Comment></Cmd>
              </ExampleBlock>
            </div>

            <div>
              <SectionLabel>Command substitution</SectionLabel>
              <p className="text-[var(--c-muted)] text-[11px] mb-2">
                Wstawienie wyniku polecenia do zmiennej przez{' '}
                <code className="text-xs">$(...)</code>.
              </p>
              <ExampleBlock variant="default">
                <Cmd>
                  today=<H>$(</H>date +%F<H>)</H>
                </Cmd>
                <Cmd>echo <V>"$today"</V></Cmd>
              </ExampleBlock>
            </div>

            <div>
              <SectionLabel>Debug (set -x)</SectionLabel>
              <p className="text-[var(--c-muted)] text-[11px] mb-2">
                Wyswietla kazde polecenie przed wykonaniem — pomaga sledzic,
                co skrypt robi.
              </p>
              <ExampleBlock variant="default">
                <Cmd>
                  <H>set -x</H> <Comment># wlacz trace</Comment>
                </Cmd>
                <Cmd>
                  <H>set +x</H> <Comment># wylacz</Comment>
                </Cmd>
              </ExampleBlock>
            </div>

            <div>
              <SectionLabel>PID file</SectionLabel>
              <p className="text-[var(--c-muted)] text-[11px] mb-2">
                Plik w <code className="text-xs">/var/run/</code> zawierajacy PID
                procesu — standard kontroli uslug.
              </p>
              <ExampleBlock variant="default">
                <Cmd>echo <V>$!</V> &gt; /var/run/app.pid</Cmd>
                <Cmd>kill <H>$(</H>cat /var/run/app.pid<H>)</H></Cmd>
              </ExampleBlock>
            </div>
          </div>
        </Card>

        {/* === Kryteria oceny === */}
        <Card title="Kryteria oceny lekcji" color="var(--c-accent)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Aby zaliczyc lekcje, Twoje skrypty musza:
          </p>
          <Row code="1">
            Obslugiwac minimum 2 opcje (np.{' '}
            <code className="text-xs">-v</code>,{' '}
            <code className="text-xs">-o</code>) +{' '}
            <code className="text-xs">-h</code> dla pomocy
          </Row>
          <Row code="2">
            Implementowac logowanie z min. 3 poziomami (INFO/WARN/ERROR)
          </Row>
          <Row code="3">
            Miec <code className="text-xs">trap cleanup EXIT</code> dla zasobow
            tymczasowych
          </Row>
          <Row code="4">
            Uzywac <code className="text-xs">set -euo pipefail</code> lub jawnego{' '}
            <code className="text-xs">if ! command</code>
          </Row>
          <Row code="5">
            Znac PID, <code className="text-xs">$!</code>,{' '}
            <code className="text-xs">kill -0</code> i pliki PID
          </Row>
        </Card>

        {/* === Oficjalna dokumentacja === */}
        <Card title="Oficjalna dokumentacja" color="var(--c-purple)">
          <SectionLabel>GNU Bash Manual</SectionLabel>
          <ul className="text-[11px] text-[var(--c-muted)] space-y-1 mt-1">
            <li>
              <a
                href="https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Shell Parameter Expansion
              </a>
            </li>
            <li>
              <a
                href="https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html#index-trap"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Builtin: trap
              </a>
            </li>
            <li>
              <a
                href="https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html#index-getopts"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Builtin: getopts
              </a>
            </li>
          </ul>
          <Divider />
          <SectionLabel>TLDP & best practices</SectionLabel>
          <ul className="text-[11px] text-[var(--c-muted)] space-y-1 mt-1">
            <li>
              <a
                href="https://tldp.org/LDP/abs/html/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Advanced Bash-Scripting Guide
              </a>
            </li>
            <li>
              <a
                href="https://google.github.io/styleguide/shellguide.html"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Google Shell Style Guide
              </a>
            </li>
            <li>
              <a
                href="https://man7.org/linux/man-pages/man7/signal.7.html"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                signal(7) — Linux man pages
              </a>
            </li>
          </ul>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/11', label: '11 — Wprowadzenie do Bash' }}
        next={{ to: '/lessons/13', label: '13 — Serwery WWW' }}
      />
    </div>
  );
}
