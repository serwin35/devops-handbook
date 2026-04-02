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

export default function Homework08() {
  usePageTitle('Homework 08');

  return (
    <div>
      <PageHeader
        title="Homework 08 — Narzędzia Uniksa cz. 1"
        subtitle="rsync + cron, monitoring systemu, użytkownicy, Vim, analiza logów"
        color="var(--c-yellow)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Zadanie 1 */}
        <Card
          title="1. Zarządzanie użytkownikami i uprawnieniami"
          color="var(--c-yellow)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Utwórz użytkownika, grupę, strukturę katalogów projektu i
            skonfiguruj uprawnienia tak, aby developer1 mógł tworzyć pliki tylko
            w wybranych katalogach.
          </p>
          <Spoiler title="Pokaż rozwiązanie krok po kroku">
            <SectionLabel>Krok 1 — użytkownik i grupa</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                sudo groupadd <V>developers</V>
              </Cmd>
              <Cmd>
                sudo useradd <H>-m</H> <H>-s</H> <F>/bin/bash</F> <H>-G</H>{' '}
                <V>developers</V> <V>developer1</V>
              </Cmd>
              <Cmd>
                sudo passwd <V>developer1</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — struktura katalogów
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                sudo mkdir <H>-p</H> <F>/opt/project</F>
              </Cmd>
              <Cmd>
                sudo mkdir <H>-p</H>{' '}
                <F>
                  /opt/project/{'{'}code,docs,logs,config{'}'}
                </F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — ustawienie uprawnień
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                sudo chown <H>-R</H> <V>root:developers</V> <F>/opt/project</F>
              </Cmd>
              <Cmd>
                sudo chmod <V>750</V> <F>/opt/project</F>
              </Cmd>
              <Cmd>
                sudo chmod <V>770</V> <F>/opt/project/code</F>
              </Cmd>
              <Cmd>
                sudo chmod <V>750</V> <F>/opt/project/docs</F>
              </Cmd>
              <Cmd>
                sudo chmod <V>770</V> <F>/opt/project/logs</F>
              </Cmd>
              <Cmd>
                sudo chmod <V>660</V> <F>/opt/project/config</F>
              </Cmd>
              <Comment># SGID na code i logs</Comment>
              <Cmd>
                sudo chmod <V>g+s</V> <F>/opt/project/code</F>
              </Cmd>
              <Cmd>
                sudo chmod <V>g+s</V> <F>/opt/project/logs</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Krok 4 — test</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                su - <V>developer1</V>
              </Cmd>
              <Cmd>
                touch <F>/opt/project/code/test.py</F>
              </Cmd>
              <Comment># ^ powinno się udać</Comment>
              <Cmd>
                touch <F>/opt/project/docs/readme.md</F>
              </Cmd>
              <Comment># ^ powinno się NIE udać</Comment>
            </ExampleBlock>

            <InfoBox>
              developer1 może tworzyć pliki w{' '}
              <code className="text-xs">code</code> i{' '}
              <code className="text-xs">logs</code> (770), ale nie w{' '}
              <code className="text-xs">docs</code> (750 — brak write dla grupy)
              ani <code className="text-xs">config</code> (660 — brak execute).
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 2 */}
        <Card
          title="2. Synchronizacja katalogów — rsync"
          color="var(--c-yellow)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Utwórz strukturę testową, wykonaj synchronizację z różnymi opcjami
            rsync (inkrementalna, --delete, exclude, dry-run) oraz napisz skrypt
            automatycznego backupu.
          </p>
          <Spoiler title="Pokaż rozwiązanie krok po kroku">
            <SectionLabel>Krok 1 — struktura testowa</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                mkdir <H>-p</H> <F>~/source_dir/subdir</F>
              </Cmd>
              <Cmd>
                echo <V>"Test file 1"</V> {'>'} <F>~/source_dir/file1.txt</F>
              </Cmd>
              <Cmd>
                echo <V>"Test file 2"</V> {'>'} <F>~/source_dir/file2.txt</F>
              </Cmd>
              <Cmd>
                echo <V>"Subdir file"</V> {'>'}{' '}
                <F>~/source_dir/subdir/file3.txt</F>
              </Cmd>
              <Cmd>
                mkdir <H>-p</H> <F>~/backup_dir</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — podstawowa synchronizacja
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                rsync <H>-av</H> <F>~/source_dir/</F> <F>~/backup_dir/</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — synchronizacja inkrementalna
            </SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Modyfikacja, dodanie i usunięcie pliku</Comment>
              <Cmd>
                echo <V>"Modified"</V> {'>>'} <F>~/source_dir/file1.txt</F>
              </Cmd>
              <Cmd>
                echo <V>"New file"</V> {'>'} <F>~/source_dir/file4.txt</F>
              </Cmd>
              <Cmd>
                rm <F>~/source_dir/file2.txt</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Synchronizacja z --delete</Comment>
              <Cmd>
                rsync <H>-av</H> <H>--delete</H> <F>~/source_dir/</F>{' '}
                <F>~/backup_dir/</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — zaawansowane opcje
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Symulacja (bez zmian)</Comment>
              <Cmd>
                rsync <H>-av</H> <H>--dry-run</H> <H>--delete</H>{' '}
                <F>~/source_dir/</F> <F>~/backup_dir/</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Wykluczenie plików .log</Comment>
              <Cmd>
                rsync <H>-av</H> <H>--exclude=</H>
                <V>'*.log'</V> <F>~/source_dir/</F> <F>~/backup_dir/</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 5 — skrypt backupu
            </SectionLabel>
            <ExampleBlock variant="purple">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Comment># backup.sh</Comment>
              <Cmd>
                SOURCE_DIR=<F>~/source_dir/</F>
              </Cmd>
              <Cmd>
                BACKUP_DIR=<F>~/backup_dir/</F>
              </Cmd>
              <Cmd>
                LOG_FILE=<F>~/backup_$(date +%Y%m%d).log</F>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                echo <V>"Starting backup at $(date)"</V> {'>>'} <V>$LOG_FILE</V>
              </Cmd>
              <Cmd>
                rsync <H>-avz</H> <H>--delete</H> <V>$SOURCE_DIR</V>{' '}
                <V>$BACKUP_DIR</V> {'>>'} <V>$LOG_FILE</V> <V>2&gt;&1</V>
              </Cmd>
              <Cmd>
                echo <V>"Backup completed at $(date)"</V> {'>>'}{' '}
                <V>$LOG_FILE</V>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Uwaga na trailing slash (<code className="text-xs">/</code>) w
              ścieżce źródłowej rsync! Z <code className="text-xs">/</code>{' '}
              kopiuje zawartość katalogu, bez — cały katalog z nazwą.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 3 */}
        <Card title="3. Praca z edytorem Vim" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Utwórz plik w Vim, ćwicz nawigację, wyszukiwanie, kopiowanie i
            usuwanie linii, a następnie skonfiguruj plik .vimrc.
          </p>
          <Spoiler title="Pokaż rozwiązanie krok po kroku">
            <SectionLabel>Krok 1 — utwórz i edytuj plik</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                vim <F>~/notes.txt</F>
              </Cmd>
              <Comment># Naciśnij 'i' → wpisz tekst → Esc → :wq</Comment>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — ćwicz polecenia
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Wyszukiwanie</Comment>
              <Cmd>/backup</Cmd>
              <Comment># Nowa linia poniżej</Comment>
              <Cmd>o</Cmd>
              <Comment># Usuń linię / cofnij</Comment>
              <Cmd>dd</Cmd>
              <Cmd>u</Cmd>
              <Comment># Kopiuj i wklej linię</Comment>
              <Cmd>yy</Cmd>
              <Cmd>p</Cmd>
              <Comment># Numery linii</Comment>
              <Cmd>:set number</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — konfiguracja .vimrc
            </SectionLabel>
            <ExampleBlock variant="purple">
              <Comment>" ~/.vimrc</Comment>
              <Cmd>
                syntax on <Comment>" Podświetlanie składni</Comment>
              </Cmd>
              <Cmd>
                set number <Comment>" Numery linii</Comment>
              </Cmd>
              <Cmd>
                set autoindent <Comment>" Automatyczne wcięcia</Comment>
              </Cmd>
              <Cmd>
                set tabstop=<V>4</V> <Comment>" Szerokość tabulatora</Comment>
              </Cmd>
              <Cmd>
                set shiftwidth=<V>4</V>
              </Cmd>
              <Cmd>
                set expandtab <Comment>" Taby → spacje</Comment>
              </Cmd>
              <Cmd>
                set incsearch <Comment>" Szukaj w trakcie pisania</Comment>
              </Cmd>
              <Cmd>
                set hlsearch <Comment>" Podświetl wyniki</Comment>
              </Cmd>
              <Cmd>set ruler</Cmd>
              <Cmd>set wildmenu</Cmd>
            </ExampleBlock>

            <InfoBox>
              Po zapisaniu <code className="text-xs">~/.vimrc</code> otwórz Vim
              ponownie — zobaczysz numery linii, podświetlanie składni i inne
              usprawnienia.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 4 */}
        <Card
          title="4. Monitorowanie wydajności systemu"
          color="var(--c-yellow)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Zainstaluj narzędzia monitorowania, wygeneruj obciążenie CPU i I/O,
            obserwuj wyniki w htop/iotop/iftop, a następnie utwórz skrypt
            raportowania stanu systemu.
          </p>
          <Spoiler title="Pokaż rozwiązanie krok po kroku">
            <SectionLabel>Krok 1 — instalacja</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                sudo apt install <V>htop iotop iftop</V> <H>-y</H>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — skrypt obciążenia CPU
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Comment># stress_cpu.sh</Comment>
              <Cmd>
                for i in {'{'}1..8{'}'}; do yes {'>'} /dev/null &amp;; done
              </Cmd>
              <Cmd>
                echo <V>"Zatrzymaj: killall yes"</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — skrypt monitorowania
            </SectionLabel>
            <ExampleBlock variant="purple">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Comment># system_monitor.sh</Comment>
              <Cmd>
                OUT=<F>~/system_status_$(date +%Y%m%d_%H%M%S).log</F>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                echo <V>"System Status — $(date)"</V> {'>'} <V>$OUT</V>
              </Cmd>
              <Cmd>
                echo <V>"\nUptime:"</V> {'>>'} <V>$OUT</V>
              </Cmd>
              <Cmd>
                uptime {'>>'} <V>$OUT</V>
              </Cmd>
              <Cmd>
                echo <V>"\nMemory:"</V> {'>>'} <V>$OUT</V>
              </Cmd>
              <Cmd>
                free <H>-h</H> {'>>'} <V>$OUT</V>
              </Cmd>
              <Cmd>
                echo <V>"\nDisk:"</V> {'>>'} <V>$OUT</V>
              </Cmd>
              <Cmd>
                df <H>-h</H> {'>>'} <V>$OUT</V>
              </Cmd>
              <Cmd>
                echo <V>"\nTop 5 CPU:"</V> {'>>'} <V>$OUT</V>
              </Cmd>
              <Cmd>
                ps aux <H>--sort=-%cpu</H> | head <H>-n</H> <V>6</V> {'>>'}{' '}
                <V>$OUT</V>
              </Cmd>
              <Cmd>
                echo <V>"\nTop 5 MEM:"</V> {'>>'} <V>$OUT</V>
              </Cmd>
              <Cmd>
                ps aux <H>--sort=-%mem</H> | head <H>-n</H> <V>6</V> {'>>'}{' '}
                <V>$OUT</V>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Uruchom <code className="text-xs">htop</code> w jednym terminalu,
              skrypt obciążający w drugim. Obserwuj wzrost CPU. Użyj{' '}
              <code className="text-xs">killall yes</code> aby zatrzymać.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 5 */}
        <Card title="5. Analiza logów systemowych" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Przejrzyj logi systemowe, przefiltruj je pod kątem błędów i
            nieudanych logowań, przeanalizuj logi Apache i utwórz skrypt
            analizujący logi autoryzacji.
          </p>
          <Spoiler title="Pokaż rozwiązanie krok po kroku">
            <SectionLabel>Krok 1 — przegląd logów</SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Debian/Ubuntu</Comment>
              <Cmd>
                sudo tail <H>-n</H> <V>20</V> <F>/var/log/syslog</F>
              </Cmd>
              <Cmd>
                sudo tail <H>-n</H> <V>20</V> <F>/var/log/auth.log</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Krok 2 — filtrowanie</SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Nieudane logowania</Comment>
              <Cmd>
                sudo grep <V>"Failed password"</V> <F>/var/log/auth.log</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Błędy w logu systemowym</Comment>
              <Cmd>
                sudo grep <H>-i</H> <V>error</V> <F>/var/log/syslog</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — zaawansowana analiza
            </SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Top 10 IP z nieudanymi logowaniami</Comment>
              <Cmd>
                sudo grep <V>"Failed password"</V> <F>/var/log/auth.log</F> |
                grep <H>-oE</H>{' '}
                <V>
                  "from ([0-9]{'{'}1,3{'}'}\\.){'{'}3{'}'}[0-9]{'{'}1,3{'}'}"
                </V>{' '}
                | cut <H>-d</H>
                <V>' '</V> <H>-f2</H> | sort | uniq <H>-c</H> | sort <H>-nr</H>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — skrypt analizy
            </SectionLabel>
            <ExampleBlock variant="purple">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Comment># analyze_auth_log.sh</Comment>
              <Cmd>
                LOG=<V>"/var/log/auth.log"</V>
              </Cmd>
              <Cmd>
                [ ! -f <V>"$LOG"</V> ] &amp;&amp; LOG=<V>"/var/log/secure"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                echo <V>"=== Analiza logów autoryzacji ==="</V>
              </Cmd>
              <Cmd>
                echo <V>"Top 10 nieudanych prób:"</V>
              </Cmd>
              <Cmd>
                sudo grep <V>"Failed password"</V> <V>$LOG</V> | awk{' '}
                <V>
                  '{'{'}print $9{'}'}'
                </V>{' '}
                | sort | uniq <H>-c</H> | sort <H>-nr</H> | head <H>-10</H>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Na systemach RedHat/CentOS logi autoryzacji znajdują się w{' '}
              <code className="text-xs">/var/log/secure</code> zamiast{' '}
              <code className="text-xs">/var/log/auth.log</code>.
            </InfoBox>
          </Spoiler>
        </Card>

        <Divider />

        {/* Zadanie domowe 1 */}
        <Card
          title="6. Automatyzacja backupu — rsync + cron"
          color="var(--c-purple)"
          full
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Stwórz system automatycznego backupu: skrypt backup.sh
            konfigurowalny plikiem, logowanie, rotacja kopii (max 7), zadanie
            cron o północy, opcja przywracania.
          </p>
          <Spoiler title="Pokaż rozwiązanie">
            <SectionLabel>Skrypt backup.sh</SectionLabel>
            <ExampleBlock variant="purple">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Comment>
                # backup.sh — automatyczny backup z konfiguracją
              </Comment>
              <Cmd>
                CONFIG=<F>~/.backup.conf</F>
              </Cmd>
              <Cmd>
                BACKUP_ROOT=<F>~/backups</F>
              </Cmd>
              <Cmd>
                MAX_COPIES=<V>7</V>
              </Cmd>
              <Cmd>
                DATE=<V>$(date +%Y%m%d_%H%M%S)</V>
              </Cmd>
              <Cmd>
                LOG=<F>~/backup_$DATE.log</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Odczyt katalogów z pliku konfiguracyjnego</Comment>
              <Cmd>
                while IFS= read <H>-r</H> dir; do
              </Cmd>
              <Cmd>
                {'  '}DEST=<V>"$BACKUP_ROOT/$DATE/$(basename $dir)"</V>
              </Cmd>
              <Cmd>
                {'  '}mkdir <H>-p</H> <V>"$DEST"</V>
              </Cmd>
              <Cmd>
                {'  '}rsync <H>-avz</H> <H>--delete</H> <V>"$dir/"</V>{' '}
                <V>"$DEST/"</V> {'>>'} <V>$LOG</V> <V>2&gt;&1</V>
              </Cmd>
              <Cmd>
                done {'<'} <V>"$CONFIG"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Rotacja — usuń najstarsze</Comment>
              <Cmd>
                ls <H>-dt</H> <V>$BACKUP_ROOT/*/</V> | tail <H>-n</H>{' '}
                <V>+$((MAX_COPIES+1))</V> | xargs rm <H>-rf</H>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Konfiguracja cron</SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Edytuj crontab</Comment>
              <Cmd>
                crontab <H>-e</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Dodaj linię — codziennie o północy</Comment>
              <Cmd>
                <V>0 0 * * *</V> <F>/home/user/backup.sh</F>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Plik <code className="text-xs">~/.backup.conf</code> zawiera po
              jednej ścieżce na linię, np.{' '}
              <code className="text-xs">~/Documents</code>,{' '}
              <code className="text-xs">~/Pictures</code>. Rotacja zachowuje
              ostatnich 7 kopii.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie domowe 2 */}
        <Card
          title="7. Monitoring zasobów i powiadamianie"
          color="var(--c-purple)"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Stwórz skrypt monitor.sh: monitoruj CPU/RAM/dysk, sprawdzaj usługi
            sieciowe, analizuj logi, powiadamiaj gdy CPU {'>'} 80%, dysk {'<'}{' '}
            10%, nieudane logowania root. Uruchamiaj przez cron.
          </p>
          <Spoiler title="Pokaż rozwiązanie">
            <ExampleBlock variant="purple">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Comment># monitor.sh — monitoring z alertami</Comment>
              <Cmd>
                ALERT=<F>~/alerts.log</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Sprawdź CPU</Comment>
              <Cmd>
                CPU=$(top <H>-bn1</H> | grep <V>"Cpu(s)"</V> | awk{' '}
                <V>
                  '{'{'}print 100-$8{'}'}'
                </V>
                )
              </Cmd>
              <Cmd>
                if (( $(echo <V>"$CPU &gt; 80"</V> | bc <H>-l</H>) )); then
              </Cmd>
              <Cmd>
                {'  '}echo{' '}
                <V>
                  "[ALERT] CPU: ${'{'}CPU{'}'}%"
                </V>{' '}
                {'>>'} <V>$ALERT</V>
              </Cmd>
              <Cmd>fi</Cmd>
              <Cmd> </Cmd>
              <Comment># Sprawdź dysk</Comment>
              <Cmd>
                DISK=$(df <F>/</F> | tail <H>-1</H> | awk{' '}
                <V>
                  '{'{'}print $5{'}'}'
                </V>{' '}
                | tr <H>-d</H> <V>'%'</V>)
              </Cmd>
              <Cmd>
                if [ <V>$DISK</V> <H>-gt</H> <V>90</V> ]; then
              </Cmd>
              <Cmd>
                {'  '}echo{' '}
                <V>
                  "[ALERT] Disk: ${'{'}DISK{'}'}%"
                </V>{' '}
                {'>>'} <V>$ALERT</V>
              </Cmd>
              <Cmd>fi</Cmd>
              <Cmd> </Cmd>
              <Comment># Sprawdź nieudane logowania root</Comment>
              <Cmd>
                ROOT_FAIL=$(grep <V>"Failed.*root"</V> <F>/var/log/auth.log</F>{' '}
                | wc <H>-l</H>)
              </Cmd>
              <Cmd>
                if [ <V>$ROOT_FAIL</V> <H>-gt</H> <V>0</V> ]; then
              </Cmd>
              <Cmd>
                {'  '}echo <V>"[ALERT] Root login attempts: $ROOT_FAIL"</V>{' '}
                {'>>'} <V>$ALERT</V>
              </Cmd>
              <Cmd>fi</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Cron — co 5 minut</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                <V>*/5 * * * *</V> <F>/home/user/monitor.sh</F>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Rozbuduj skrypt o sprawdzanie dostępności usług (
              <code className="text-xs">systemctl is-active</code>), wysyłanie
              emaili (<code className="text-xs">mail</code> /
              <code className="text-xs">sendmail</code>) i zapis danych
              historycznych do CSV.
            </InfoBox>
          </Spoiler>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/08', label: '08 — Narzędzia Uniksa cz. 1' }}
        next={{ to: '/homework/09', label: 'Homework 09' }}
      />
    </div>
  );
}
