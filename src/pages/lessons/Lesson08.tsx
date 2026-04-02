import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import LessonNav from '../../components/LessonNav';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Lesson08() {
  usePageTitle('Lekcja 08 — Narzędzia Uniksa cz. 1');

  return (
    <div>
      <PageHeader
        title="Lekcja 08 — Narzędzia Uniksa cz. 1"
        subtitle="Użytkownicy, uprawnienia, rsync, edytory konsolowe, monitoring, logi"
        color="var(--c-yellow)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === SEKCJA 1: Użytkownicy i dostęp === */}
        <Card title="Użytkownicy i grupy">
          <p className="text-sm mb-3">
            System Unix/Linux opiera się na precyzyjnym modelu użytkowników i
            grup zapewniającym bezpieczeństwo i rozdzielenie uprawnień.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>
              <strong>User</strong> — podmiot z unikalnym UID
            </li>
            <li>
              <strong>Group</strong> — zbiór użytkowników z wspólnymi
              uprawnieniami (GID)
            </li>
            <li>
              <strong>Root</strong> — superuser z pełnymi prawami (UID=0)
            </li>
          </ul>
          <p className="text-sm mt-3 font-semibold mb-1">
            Kluczowe pliki konfiguracyjne:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`/etc/passwd   # info o użytkownikach
/etc/shadow   # zaszyfrowane hasła
/etc/group    # info o grupach
/etc/sudoers  # konfiguracja sudo`}
          </pre>
        </Card>

        <Card title="Prawa dostępu">
          <p className="text-sm mb-2">Trzystopniowy model uprawnień:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>
              <strong>r</strong> (read) — odczyt (4)
            </li>
            <li>
              <strong>w</strong> (write) — zapis (2)
            </li>
            <li>
              <strong>x</strong> (execute) — wykonanie (1)
            </li>
          </ul>
          <p className="text-sm font-semibold mb-1">Kategorie:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>
              <strong>Owner</strong> — właściciel pliku
            </li>
            <li>
              <strong>Group</strong> — grupa pliku
            </li>
            <li>
              <strong>Others</strong> — pozostali użytkownicy
            </li>
          </ul>
          <p className="text-sm font-semibold mb-1">Bity specjalne:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>
              <strong>SUID</strong> — uruchamia z prawami właściciela
            </li>
            <li>
              <strong>SGID</strong> — uruchamia z prawami grupy
            </li>
            <li>
              <strong>Sticky Bit</strong> — ogranicza usuwanie plików
            </li>
          </ul>
        </Card>

        <Card title="Zarządzanie dostępem">
          <p className="text-sm mb-2 font-semibold">Użytkownicy:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Tworzenie użytkownika
sudo useradd -m -s /bin/bash username
sudo passwd username

# Dodanie do grupy
sudo usermod -aG groupname username

# Usunięcie użytkownika
sudo userdel -r username`}
          </pre>
          <p className="text-sm mb-2 font-semibold">Uprawnienia:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Zmiana właściciela
sudo chown user:group filename

# Zmiana uprawnień (symbolicznie)
chmod u+rwx,g+rx,o-rwx filename

# Zmiana uprawnień (numerycznie)
chmod 750 filename

# Rekursywna zmiana
chmod -R 755 directory`}
          </pre>
        </Card>

        {/* === SEKCJA 2: rsync === */}
        <Card title="rsync — synchronizacja folderów">
          <p className="text-sm mb-3">
            Potężne narzędzie do synchronizacji i kopii zapasowych. Przesyła
            tylko różnice między plikami.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>Wydajność — tylko różnice, nie całe pliki</li>
            <li>Bezpieczeństwo — synchronizacja przez SSH</li>
            <li>Wznawianie przerwanych transferów</li>
          </ul>
          <p className="text-sm font-semibold mb-1">Najważniejsze opcje:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`-a  # archive — zachowaj uprawnienia
-v  # verbose — szczegóły
-z  # compress — kompresja
-r  # recursive — rekursywnie
-P  # progress & partial
--delete  # usuń zbędne w celu`}
          </pre>
        </Card>

        <Card title="rsync — przykłady użycia">
          <p className="text-sm mb-2 font-semibold">Lokalna synchronizacja:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Uwaga na "/" na końcu ścieżki!
rsync -av /home/user/src/ /home/user/dst/

# Z usunięciem zbędnych plików
rsync -av --delete src/ dst/`}
          </pre>
          <p className="text-sm mb-2 font-semibold">
            Zdalna synchronizacja (SSH):
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Kopiowanie na serwer
rsync -avz /var/www/site/ \\
  user@server:/backup/

# Kopiowanie z serwera
rsync -avz user@server:/var/www/ \\
  /local/backup/`}
          </pre>
          <p className="text-sm mb-2 font-semibold">Zaawansowane:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Z wykluczeniem plików
rsync -av --exclude='*.tmp' \\
  --exclude='cache/' src/ dst/

# Symulacja (dry-run)
rsync -av --dry-run --delete \\
  src/ dst/`}
          </pre>
        </Card>

        {/* === SEKCJA 3: Edytory === */}
        <Card title="Edytor Vim">
          <p className="text-sm mb-2">
            Zaawansowany edytor tekstowy — wydajny, ale ze stromą krzywą
            uczenia.
          </p>
          <p className="text-sm font-semibold mb-1">Tryby pracy:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>
              <strong>Normal</strong> — nawigacja i polecenia (domyślny)
            </li>
            <li>
              <strong>Insert</strong> — wstawianie tekstu (
              <code className="text-xs">i</code>)
            </li>
            <li>
              <strong>Visual</strong> — zaznaczanie (
              <code className="text-xs">v</code>)
            </li>
            <li>
              <strong>Command</strong> — polecenia (
              <code className="text-xs">:</code>)
            </li>
          </ul>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`:w        # zapisz
:q        # wyjdź
:wq       # zapisz i wyjdź
:q!       # wymuś wyjście bez zapisu
h,j,k,l   # nawigacja ←↓↑→
w / b     # następne/poprzednie słowo
gg / G    # początek/koniec pliku
dd        # usuń linię
yy / p    # kopiuj/wklej linię
u         # cofnij`}
          </pre>
        </Card>

        <Card title="Edytor Nano">
          <p className="text-sm mb-2">
            Prosty, przyjazny edytor z paskiem skrótów na dole ekranu. Dostępny
            domyślnie w wielu dystrybucjach.
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`Ctrl+G  # pomoc
Ctrl+O  # zapisz plik
Ctrl+X  # wyjdź z edytora
Ctrl+K  # wytnij linię
Ctrl+U  # wklej
Ctrl+W  # wyszukaj
Ctrl+\\  # znajdź i zamień`}
          </pre>
          <p className="text-sm font-semibold mb-1">Edytor Emacs:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`Ctrl+x Ctrl+f  # otwórz plik
Ctrl+x Ctrl+s  # zapisz
Ctrl+x Ctrl+c  # wyjdź
Ctrl+k          # wytnij do końca linii
Ctrl+y          # wklej
Ctrl+s          # szukaj do przodu`}
          </pre>
        </Card>

        {/* === SEKCJA 4: Monitoring === */}
        <Card title="htop i atop">
          <p className="text-sm mb-2">
            Interaktywne monitory procesów i wydajności systemu.
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Instalacja
sudo apt install htop atop

# Uruchomienie
htop    # interaktywny monitor procesów
atop    # zaawansowany monitor wydajności`}
          </pre>
          <p className="text-sm font-semibold mb-1">htop:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-2">
            <li>Graficzne obciążenie CPU i pamięci</li>
            <li>Interaktywne zarządzanie procesami</li>
            <li>Kolorowe wyróżnianie procesów</li>
          </ul>
          <p className="text-sm font-semibold mb-1">atop:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>Historia w /var/log/atop.log</li>
            <li>Monitoring dysków, sieci, pamięci, CPU</li>
            <li>Wyświetlanie tylko aktywnych procesów</li>
          </ul>
        </Card>

        <Card title="Monitoring usług">
          <p className="text-sm font-semibold mb-1">
            apachetop — monitoring Apache:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`sudo apt install apachetop
apachetop
apachetop -f /var/log/apache2/access.log`}
          </pre>
          <p className="text-sm font-semibold mb-1">
            mytop — monitoring MySQL/MariaDB:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`sudo apt install mytop
mytop -u user -p pass -d db_name`}
          </pre>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mt-2">
            <li>Analiza logów w czasie rzeczywistym</li>
            <li>Statystyki ruchu i czasów odpowiedzi</li>
            <li>Monitoring aktualnych zapytań SQL</li>
          </ul>
        </Card>

        <Card title="Monitoring podsystemów">
          <p className="text-sm font-semibold mb-1">iotop — dyskowe I/O:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`sudo apt install iotop
sudo iotop`}
          </pre>
          <p className="text-sm font-semibold mb-1">iftop/jnettop — sieć:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`sudo apt install iftop jnettop
sudo iftop    # ogólny ruch sieciowy
sudo jnettop  # analiza protokołów`}
          </pre>
          <p className="text-sm font-semibold mb-1">nmon — uniwersalny:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`sudo apt install nmon
nmon              # tryb interaktywny
nmon -f -s 30 -c 120  # rejestracja`}
          </pre>
          <p className="text-sm font-semibold mb-1">
            ngrep — pakiety sieciowe:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`sudo apt install ngrep
sudo ngrep -d any -q -W byline port 80`}
          </pre>
        </Card>

        {/* === SEKCJA 5: Logi === */}
        <Card title="Struktura logów systemowych">
          <p className="text-sm mb-2">Standardowe lokalizacje plików logów:</p>
          <div className="overflow-x-auto">
            <table className="text-xs w-full">
              <thead>
                <tr className="text-left border-b border-[var(--c-border)]">
                  <th className="pb-1 pr-2">Typ</th>
                  <th className="pb-1 pr-2">Debian</th>
                  <th className="pb-1">RedHat</th>
                </tr>
              </thead>
              <tbody className="text-[var(--c-muted)]">
                <tr>
                  <td className="py-0.5 pr-2">System</td>
                  <td className="pr-2">/var/log/syslog</td>
                  <td>/var/log/messages</td>
                </tr>
                <tr>
                  <td className="py-0.5 pr-2">Jądro</td>
                  <td className="pr-2">/var/log/kern.log</td>
                  <td>/var/log/dmesg</td>
                </tr>
                <tr>
                  <td className="py-0.5 pr-2">Auth</td>
                  <td className="pr-2">/var/log/auth.log</td>
                  <td>/var/log/secure</td>
                </tr>
                <tr>
                  <td className="py-0.5 pr-2">Boot</td>
                  <td className="pr-2">/var/log/boot.log</td>
                  <td>/var/log/boot.log</td>
                </tr>
                <tr>
                  <td className="py-0.5 pr-2">CRON</td>
                  <td className="pr-2">/var/log/cron.log</td>
                  <td>/var/log/cron</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mt-3">
            {`# Konfiguracja rsyslog
/etc/rsyslog.conf
/etc/rsyslog.d/

# Status usługi
systemctl status rsyslog`}
          </pre>
        </Card>

        <Card title="Logi aplikacji">
          <p className="text-sm font-semibold mb-1">Apache:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Debian/Ubuntu
/var/log/apache2/access.log
/var/log/apache2/error.log

# CentOS/RHEL
/var/log/httpd/access_log
/var/log/httpd/error_log`}
          </pre>
          <p className="text-sm font-semibold mb-1">Nginx:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`/var/log/nginx/access.log
/var/log/nginx/error.log`}
          </pre>
          <p className="text-sm font-semibold mb-1">Bazy danych:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# MySQL/MariaDB
/var/log/mysql/error.log

# PostgreSQL (Debian)
/var/log/postgresql/postgresql-*-main.log`}
          </pre>
        </Card>

        <Card title="Analiza logów">
          <p className="text-sm font-semibold mb-1">Podstawowe polecenia:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Śledzenie logu w czasie rzeczywistym
tail -f /var/log/syslog

# Szukanie błędów
grep "ERROR" /var/log/apache2/error.log

# Nieudane logowania + zliczanie
grep "Failed password" /var/log/auth.log \\
  | awk '{print $9}' | sort | uniq -c`}
          </pre>
          <p className="text-sm font-semibold mb-1">journalctl (systemd):</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Logi usługi od dzisiaj
journalctl -u apache2 --since today

# Tylko błędy i wyżej
journalctl -p err`}
          </pre>
          <p className="text-sm font-semibold mb-1">Zaawansowane narzędzia:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# logwatch — raporty z logów
sudo apt install logwatch
sudo logwatch --detail high

# GoAccess — analizator logów HTTP
sudo apt install goaccess
goaccess /var/log/apache2/access.log -c`}
          </pre>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/07', label: '07 — Wirtualizacja' }}
        next={{ to: '/lessons/09', label: '09 — Narzędzia Uniksa cz. 2' }}
      />
    </div>
  );
}
