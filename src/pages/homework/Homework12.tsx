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

export default function Homework12() {
  usePageTitle('Homework 12');

  return (
    <div>
      <PageHeader
        title="Homework 12 — Bash w praktyce"
        subtitle="service_ctl.sh · backup.sh z getopts · logowanie · trap/cleanup"
        color="var(--c-green)"
      />

      <InfoBox>
        Materialy zrodlowe lekcji:{' '}
        <a
          href="/materials/lesson-12-bash-basics-2_6G7O2dQ.pdf"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--c-accent)] hover:underline"
        >
          lesson-12-bash-basics-2.pdf
        </a>
      </InfoBox>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* === Zadanie 1: service_ctl.sh === */}
        <Card
          title="1. service_ctl.sh — zarzadzanie usluga"
          color="var(--c-green)"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz skrypt <code className="text-xs">service_ctl.sh</code>, ktory
            zarzadza prosta usluga (procesem <code className="text-xs">sleep</code>{' '}
            symulujacym serwer). Uzyj technik z lekcji.
          </p>

          <SectionLabel>Polecenia</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              <F>./service_ctl.sh</F> start
              {'    '}
              <Comment># Uruchom usluge w tle</Comment>
            </Cmd>
            <Cmd>
              <F>./service_ctl.sh</F> stop
              {'     '}
              <Comment># Zatrzymaj usluge</Comment>
            </Cmd>
            <Cmd>
              <F>./service_ctl.sh</F> restart
              {'  '}
              <Comment># Restart</Comment>
            </Cmd>
            <Cmd>
              <F>./service_ctl.sh</F> status
              {'   '}
              <Comment># Sprawdz czy dziala</Comment>
            </Cmd>
          </ExampleBlock>

          <SectionLabel className="mt-2">Wymagane elementy</SectionLabel>
          <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-1">
            <li>
              Obsluga polecen za pomoca <code className="text-xs">case</code>
            </li>
            <li>PID file do sledzenia procesu</li>
            <li>
              <code className="text-xs">kill -0</code> do sprawdzania czy proces
              zyje
            </li>
            <li>
              Funkcja <code className="text-xs">log()</code> z timestampem
              (INFO/ERROR)
            </li>
            <li>
              <code className="text-xs">trap cleanup EXIT</code> do usuwania PID
              file przy bledach
            </li>
          </ul>

          <Spoiler title="Pokaz rozwiazanie">
            <ExampleBlock variant="green">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Cmd>
                <H>set -euo pipefail</H>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                PID_FILE=<V>"/tmp/service_ctl.pid"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Logowanie z poziomami</Comment>
              <Cmd>log() {'{'}</Cmd>
              <Cmd>
                {'  '}local level=<V>"$1"</V>; <H>shift</H>
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
                {'    '}INFO) echo <V>"[$ts] [INFO]  $*"</V> ;;
              </Cmd>
              <Cmd>
                {'    '}ERROR) echo <V>"[$ts] [ERROR] $*"</V> &gt;&amp;2 ;;
              </Cmd>
              <Cmd>
                {'  '}
                <H>esac</H>
              </Cmd>
              <Cmd>{'}'}</Cmd>
              <Cmd> </Cmd>
              <Comment># Cleanup przy bledach (usun martwy PID file)</Comment>
              <Cmd>cleanup() {'{'}</Cmd>
              <Cmd>
                {'  '}local code=<V>$?</V>
              </Cmd>
              <Cmd>
                {'  '}
                <H>if</H> [[ <V>$code</V> -ne 0 && -f <V>"$PID_FILE"</V> ]];{' '}
                <H>then</H>
              </Cmd>
              <Cmd>
                {'    '}log ERROR <V>"Blad - usuwam PID file"</V>
              </Cmd>
              <Cmd>
                {'    '}rm -f <V>"$PID_FILE"</V>
              </Cmd>
              <Cmd>
                {'  '}
                <H>fi</H>
              </Cmd>
              <Cmd>{'}'}</Cmd>
              <Cmd>
                <H>trap</H> cleanup EXIT
              </Cmd>
              <Cmd> </Cmd>
              <Comment># --- start ---</Comment>
              <Cmd>start_service() {'{'}</Cmd>
              <Cmd>
                {'  '}
                <H>if</H> [[ -f <V>"$PID_FILE"</V> ]]; <H>then</H>
              </Cmd>
              <Cmd>
                {'    '}local old_pid=<H>$(</H>cat <V>"$PID_FILE"</V>
                <H>)</H>
              </Cmd>
              <Cmd>
                {'    '}
                <H>if</H> kill -0 <V>"$old_pid"</V> 2&gt;/dev/null; <H>then</H>
              </Cmd>
              <Cmd>
                {'      '}log INFO <V>"Juz dziala (PID: $old_pid)"</V>; return 0
              </Cmd>
              <Cmd>
                {'    '}
                <H>fi</H>
              </Cmd>
              <Cmd>
                {'    '}rm -f <V>"$PID_FILE"</V>
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
                {'  '}log INFO <V>"Uruchomiono (PID: $!)"</V>
              </Cmd>
              <Cmd>{'}'}</Cmd>
              <Cmd> </Cmd>
              <Comment># --- stop ---</Comment>
              <Cmd>stop_service() {'{'}</Cmd>
              <Cmd>
                {'  '}
                <H>if</H> [[ ! -f <V>"$PID_FILE"</V> ]]; <H>then</H>
              </Cmd>
              <Cmd>
                {'    '}log INFO <V>"Usluga nie dziala"</V>; return 0
              </Cmd>
              <Cmd>
                {'  '}
                <H>fi</H>
              </Cmd>
              <Cmd>
                {'  '}local pid=<H>$(</H>cat <V>"$PID_FILE"</V>
                <H>)</H>
              </Cmd>
              <Cmd>
                {'  '}kill <V>"$pid"</V> 2&gt;/dev/null || true
              </Cmd>
              <Cmd>
                {'  '}rm -f <V>"$PID_FILE"</V>
              </Cmd>
              <Cmd>
                {'  '}log INFO <V>"Zatrzymano (PID: $pid)"</V>
              </Cmd>
              <Cmd>{'}'}</Cmd>
              <Cmd> </Cmd>
              <Comment># --- status ---</Comment>
              <Cmd>status_service() {'{'}</Cmd>
              <Cmd>
                {'  '}
                <H>if</H> [[ -f <V>"$PID_FILE"</V> ]] && kill -0{' '}
                <H>$(</H>cat <V>"$PID_FILE"</V>
                <H>)</H> 2&gt;/dev/null; <H>then</H>
              </Cmd>
              <Cmd>
                {'    '}log INFO <V>"Dziala (PID: $(cat $PID_FILE))"</V>
              </Cmd>
              <Cmd>
                {'  '}
                <H>else</H>
              </Cmd>
              <Cmd>
                {'    '}log INFO <V>"Nie dziala"</V>
              </Cmd>
              <Cmd>
                {'  '}
                <H>fi</H>
              </Cmd>
              <Cmd>{'}'}</Cmd>
              <Cmd> </Cmd>
              <Comment># --- obsluga polecen ---</Comment>
              <Cmd>
                <H>case</H> <V>"${'${1:-}'}"</V> <H>in</H>
              </Cmd>
              <Cmd>
                {'  '}start) start_service ;;
              </Cmd>
              <Cmd>
                {'  '}stop) stop_service ;;
              </Cmd>
              <Cmd>
                {'  '}restart) stop_service; sleep 1; start_service ;;
              </Cmd>
              <Cmd>
                {'  '}status) status_service ;;
              </Cmd>
              <Cmd>
                {'  '}*) echo <V>"Uzycie: $0 {'{start|stop|restart|status}'}"</V>; exit 1 ;;
              </Cmd>
              <Cmd>
                <H>esac</H>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Testowanie</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                chmod +x <F>service_ctl.sh</F>
              </Cmd>
              <Cmd>
                <F>./service_ctl.sh</F> start
              </Cmd>
              <Cmd>
                <F>./service_ctl.sh</F> status
              </Cmd>
              <Cmd>
                <F>./service_ctl.sh</F> stop
              </Cmd>
              <Cmd>
                <F>./service_ctl.sh</F> status
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === Zadanie 2: backup.sh === */}
        <Card title="2. backup.sh z getopts" color="var(--c-purple)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Rozbuduj skrypt backupu z cwiczenia 5, dodajac obsluge opcji
            wiersza polecen (<code className="text-xs">getopts</code>).
          </p>

          <SectionLabel>Uzycie</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              <F>./backup.sh</F> -s /var/www -d /backup -v
            </Cmd>
            <Cmd>
              <F>./backup.sh</F> -h
              {'    '}
              <Comment># pomoc</Comment>
            </Cmd>
          </ExampleBlock>

          <SectionLabel className="mt-2">Wymagane elementy</SectionLabel>
          <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-1">
            <li>
              <code className="text-xs">getopts</code> dla opcji{' '}
              <code className="text-xs">-s -d -v -h</code>
            </li>
            <li>
              Funkcja <code className="text-xs">log()</code> z poziomami
            </li>
            <li>
              <code className="text-xs">set -euo pipefail</code>
            </li>
            <li>
              <code className="text-xs">trap cleanup EXIT</code> do czyszczenia
              tmp
            </li>
            <li>
              Walidacja katalogu (<code className="text-xs">-d</code>)
            </li>
          </ul>

          <Spoiler title="Pokaz rozwiazanie">
            <ExampleBlock variant="purple">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Cmd>
                <H>set -euo pipefail</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Wartosci domyslne</Comment>
              <Cmd>
                source_dir=<V>""</V>
              </Cmd>
              <Cmd>
                dest_dir=<V>"./backups"</V>
              </Cmd>
              <Cmd>
                verbose=<V>0</V>
              </Cmd>
              <Cmd>
                temp_file=<V>""</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># --- Funkcje ---</Comment>
              <Cmd>usage() {'{'}</Cmd>
              <Cmd>
                {'  '}cat &lt;&lt; <H>EOF</H>
              </Cmd>
              <Cmd>Uzycie: $0 -s &lt;src&gt; [-d &lt;dest&gt;] [-v] [-h]</Cmd>
              <Cmd>{'  '}-s SRC{'   '}katalog zrodlowy (wymagane)</Cmd>
              <Cmd>{'  '}-d DEST{'  '}katalog docelowy (domyslnie: ./backups)</Cmd>
              <Cmd>{'  '}-v{'       '}tryb verbose</Cmd>
              <Cmd>{'  '}-h{'       '}ta pomoc</Cmd>
              <Cmd>
                <H>EOF</H>
              </Cmd>
              <Cmd>{'}'}</Cmd>
              <Cmd> </Cmd>
              <Cmd>log() {'{'}</Cmd>
              <Cmd>
                {'  '}local level=<V>"$1"</V>; <H>shift</H>
              </Cmd>
              <Cmd>
                {'  '}local ts=<H>$(</H>date <V>'+%H:%M:%S'</V>
                <H>)</H>
              </Cmd>
              <Cmd>
                {'  '}
                <H>case</H> <V>$level</V> <H>in</H>
              </Cmd>
              <Cmd>
                {'    '}INFO) [[ <V>$verbose</V> -eq 1 ]] && echo{' '}
                <V>"[$ts] [INFO]  $*"</V> ;;
              </Cmd>
              <Cmd>
                {'    '}WARN) echo <V>"[$ts] [WARN]  $*"</V> &gt;&amp;2 ;;
              </Cmd>
              <Cmd>
                {'    '}ERROR) echo <V>"[$ts] [ERROR] $*"</V> &gt;&amp;2 ;;
              </Cmd>
              <Cmd>
                {'  '}
                <H>esac</H>
              </Cmd>
              <Cmd>{'}'}</Cmd>
              <Cmd> </Cmd>
              <Cmd>cleanup() {'{'}</Cmd>
              <Cmd>
                {'  '}
                <H>if</H> [[ -n <V>"$temp_file"</V> && -f <V>"$temp_file"</V>{' '}
                ]]; <H>then</H>
              </Cmd>
              <Cmd>
                {'    '}rm -f <V>"$temp_file"</V>
              </Cmd>
              <Cmd>
                {'    '}log INFO <V>"Usunieto plik tymczasowy"</V>
              </Cmd>
              <Cmd>
                {'  '}
                <H>fi</H>
              </Cmd>
              <Cmd>{'}'}</Cmd>
              <Cmd>
                <H>trap</H> cleanup EXIT
              </Cmd>
              <Cmd> </Cmd>
              <Comment># --- Parsowanie opcji getopts ---</Comment>
              <Cmd>
                <H>while</H> getopts <V>"s:d:vh"</V> opt; <H>do</H>
              </Cmd>
              <Cmd>
                {'  '}
                <H>case</H> <V>$opt</V> <H>in</H>
              </Cmd>
              <Cmd>
                {'    '}s) source_dir=<V>"$OPTARG"</V> ;;
              </Cmd>
              <Cmd>
                {'    '}d) dest_dir=<V>"$OPTARG"</V> ;;
              </Cmd>
              <Cmd>
                {'    '}v) verbose=<V>1</V> ;;
              </Cmd>
              <Cmd>
                {'    '}h) usage; exit 0 ;;
              </Cmd>
              <Cmd>
                {'    '}*) usage; exit 1 ;;
              </Cmd>
              <Cmd>
                {'  '}
                <H>esac</H>
              </Cmd>
              <Cmd>
                <H>done</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># --- Walidacja ---</Comment>
              <Cmd>
                <H>if</H> [[ -z <V>"$source_dir"</V> ]]; <H>then</H>
              </Cmd>
              <Cmd>
                {'  '}log ERROR <V>"Brak -s (katalog zrodlowy)"</V>; usage; exit
                1
              </Cmd>
              <Cmd>
                <H>fi</H>
              </Cmd>
              <Cmd>
                <H>if</H> [[ ! -d <V>"$source_dir"</V> ]]; <H>then</H>
              </Cmd>
              <Cmd>
                {'  '}log ERROR <V>"Katalog nie istnieje: $source_dir"</V>; exit
                2
              </Cmd>
              <Cmd>
                <H>fi</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># --- Tworzenie backupu ---</Comment>
              <Cmd>mkdir -p <V>"$dest_dir"</V></Cmd>
              <Cmd>
                date_suffix=<H>$(</H>date +%Y%m%d_%H%M%S<H>)</H>
              </Cmd>
              <Cmd>
                temp_file=<H>$(</H>mktemp<H>)</H>
              </Cmd>
              <Cmd>
                backup_file=<V>"$dest_dir/backup_${'${date_suffix}'}.tar.gz"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                log INFO <V>"Tworzenie backupu: $backup_file"</V>
              </Cmd>
              <Cmd>
                <H>if</H> tar -czf <V>"$backup_file"</V> -C{' '}
                <H>$(</H>dirname <V>"$source_dir"</V>
                <H>)</H>{' '}
                <H>$(</H>basename <V>"$source_dir"</V>
                <H>)</H>; <H>then</H>
              </Cmd>
              <Cmd>
                {'  '}log INFO <V>"Backup utworzony pomyslnie"</V>
              </Cmd>
              <Cmd>
                {'  '}ls -lh <V>"$backup_file"</V>
              </Cmd>
              <Cmd>
                <H>else</H>
              </Cmd>
              <Cmd>
                {'  '}log ERROR <V>"Blad tworzenia backupu"</V>; exit 3
              </Cmd>
              <Cmd>
                <H>fi</H>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Testowanie</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                chmod +x <F>backup.sh</F>
              </Cmd>
              <Cmd>mkdir -p /tmp/test_src /tmp/test_dest</Cmd>
              <Cmd>
                echo <V>"test"</V> &gt; /tmp/test_src/file.txt
              </Cmd>
              <Cmd>
                <F>./backup.sh</F> -s /tmp/test_src -d /tmp/test_dest -v
              </Cmd>
              <Cmd>ls -la /tmp/test_dest/</Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>
      </div>

      <InfoBox>
        <b>Kryteria oceny:</b> skrypt musi obslugiwac min. 2 opcje +{' '}
        <code className="text-xs">-h</code>, logowac na 3 poziomach, miec{' '}
        <code className="text-xs">trap cleanup EXIT</code> i{' '}
        <code className="text-xs">set -euo pipefail</code>. Wszystkie cwiczenia
        musza dzialac bez bledow.
      </InfoBox>

      <LessonNav
        prev={{ to: '/lessons/12', label: '12 — Bash w praktyce' }}
      />
    </div>
  );
}
