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
import Concept from '../../components/Concept';
import LessonNav from '../../components/LessonNav';

export default function Filesystem() {
  usePageTitle('Filesystem Hierarchy');
  return (
    <div>
      <PageHeader
        title="Filesystem Hierarchy"
        subtitle="Struktura katalogów Linux — FHS, operację na plikach i katalogach"
        color="var(--c-yellow)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Listowanie plików (ls)" color="var(--c-accent)">
          <ExampleBlock>
            <Comment># Podstawowe listowanie</Comment>
            <Cmd>ls</Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Szczegółowa lista z uprawnieniami</Comment>
            <Cmd>
              ls <H>-l</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Pokaż ukryte pliki</Comment>
            <Cmd>
              ls <H>-a</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Szczegóły + ukryte + human-readable</Comment>
            <Cmd>
              ls <H>-lah</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Sortuj po dacie modyfikacji</Comment>
            <Cmd>
              ls <H>-lt</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Rekurencyjne listowanie</Comment>
            <Cmd>
              ls <H>-R</H> <F>/etc/nginx/</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card
          title="Czytanie plików (cat / head / tail)"
          color="var(--c-purple)"
        >
          <ExampleBlock variant="purple">
            <Comment># Wyświetl zawartość pliku</Comment>
            <Cmd>
              cat <V>/etc/hostname</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Z numerami linii</Comment>
            <Cmd>
              cat <H>-n</H> <V>/etc/passwd</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Połącz kilka plików</Comment>
            <Cmd>
              cat <V>plik1.txt plik2.txt</V> {'>'} <F>wynik.txt</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="purple">
            <Comment># Pierwsze 20 linii</Comment>
            <Cmd>
              head <H>-n 20</H> <V>/var/log/syslog</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Ostatnie 50 linii</Comment>
            <Cmd>
              tail <H>-n 50</H> <V>/var/log/syslog</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Śledź logi na zywo</Comment>
            <Cmd>
              tail <H>-f</H> <V>/var/log/syslog</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Tworzenie katalogów (mkdir)" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Comment># Utwórz katalog</Comment>
            <Cmd>
              mkdir <V>nowy_katalog</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Utwórz zagnieżdżone katalogi</Comment>
            <Cmd>
              mkdir <H>-p</H> <V>projekt/src/components</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Utwórz z konkretnymi uprawnieniami</Comment>
            <Cmd>
              mkdir <H>-m 755</H> <V>/var/www/app</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Usuwanie (rm / rmdir)" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Comment># Usuń plik</Comment>
            <Cmd>
              rm <V>plik.txt</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Usuń z potwierdzeniem</Comment>
            <Cmd>
              rm <H>-i</H> <V>wazny_plik.txt</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Usuń pusty katalog</Comment>
            <Cmd>
              rmdir <V>pusty_katalog</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Usuń katalog z zawartością</Comment>
            <Cmd>
              rm <H>-r</H> <V>katalog/</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Force + recursive (UWAGA!)</Comment>
            <Cmd>
              rm <H>-rf</H> <V>katalog/</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox warn>
            <b>rm -rf</b> jest nieodwracalne! Zawsze sprawdź ścieżkę przed
            wykonaniem. Nigdy nie używaj na <code>/</code>.
          </InfoBox>
        </Card>

        <Card
          title="Kopiowanie i przenoszenie (cp / mv)"
          color="var(--c-green)"
        >
          <ExampleBlock variant="green">
            <Comment># Kopiuj plik</Comment>
            <Cmd>
              cp <V>plik.txt</V> <F>kopia.txt</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Kopiuj katalog rekurencyjnie</Comment>
            <Cmd>
              cp <H>-r</H> <V>katalog/</V> <F>backup/</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Przenieś / zmień nazwe</Comment>
            <Cmd>
              mv <V>stary.txt</V> <F>nowy.txt</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Przenieś do katalogu</Comment>
            <Cmd>
              mv <V>plik.txt</V> <F>/home/serwin/backup/</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Przenieś folder (z zawartością)</Comment>
            <Cmd>
              mv <V>src/</V> <F>/home/serwin/backup/</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Zmień nazwe folderu</Comment>
            <Cmd>
              mv <V>old-dir/</V> <F>new-dir/</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Kluczowe pliki w /etc">
          <Row code="/etc/passwd">
            Lista użytkowników — login, UID, GID, shell
          </Row>
          <Row code="/etc/shadow">Hashe haseł (tylko root)</Row>
          <Row code="/etc/group">Definicje grup i ich członkowie</Row>
          <Row code="/etc/fstab">Montowanie systemów plików przy starcie</Row>
          <Row code="/etc/hostname">Nazwa hosta</Row>
          <Row code="/etc/hosts">Lokalne mapowanie nazw DNS</Row>
          <Row code="/etc/resolv.conf">Konfiguracja DNS</Row>
          <Row code="/etc/sudoers">Konfiguracja sudo (edycja: visudo)</Row>
          <Row code="/etc/ssh/sshd_config">Konfiguracja serwera SSH</Row>
          <Row code="/etc/apt/sources.list">
            Repozytoria pakietów (Debian/Ubuntu)
          </Row>
        </Card>

        <Card title="Wirtualne systemy plików" color="var(--c-purple)">
          <Concept title="/proc — procfs" color="var(--c-purple)">
            Informacje o procesach i jądrze. Nie istnieje fizycznie na dysku.
          </Concept>
          <ExampleBlock variant="purple">
            <Cmd>
              cat <H>/proc/cpuinfo</H>{' '}
              <span className="text-[var(--c-muted)]"># CPU</span>
            </Cmd>
            <Cmd>
              cat <H>/proc/meminfo</H>{' '}
              <span className="text-[var(--c-muted)]"># pamięć</span>
            </Cmd>
            <Cmd>
              cat <H>/proc/version</H>{' '}
              <span className="text-[var(--c-muted)]"># jądro</span>
            </Cmd>
            <Cmd>
              ls <H>/proc/$$</H>{' '}
              <span className="text-[var(--c-muted)]">
                # info o bieżącym procesie
              </span>
            </Cmd>
          </ExampleBlock>
          <Concept title="/sys — sysfs" color="var(--c-green)">
            Urządzenia, sterowniki, moduły jądra. Interfejs do konfiguracji
            hardware.
          </Concept>
          <Concept title="/dev — devtmpfs" color="var(--c-yellow)">
            Pliki urządzeń — "wszystko jest plikiem".
          </Concept>
          <ExampleBlock variant="yellow">
            <Cmd>
              <H>/dev/sda</H>{' '}
              <span className="text-[var(--c-muted)]"># pierwszy dysk</span>
            </Cmd>
            <Cmd>
              <H>/dev/null</H>{' '}
              <span className="text-[var(--c-muted)]">
                # czarna dziura (odrzuca dane)
              </span>
            </Cmd>
            <Cmd>
              <H>/dev/zero</H>{' '}
              <span className="text-[var(--c-muted)]"># nieskończone zera</span>
            </Cmd>
            <Cmd>
              <H>/dev/urandom</H>{' '}
              <span className="text-[var(--c-muted)]"># losowe dane</span>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Przydatne komendy" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Miejsce na dysku</Comment>
            <Cmd>
              df <H>-h</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Rozmiar katalogów</Comment>
            <Cmd>
              du <H>-sh</H> <F>/var/log/*</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Zamontowane FS</Comment>
            <Cmd>mount {' | '} column -t</Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Znajdz plik</Comment>
            <Cmd>
              find <F>/etc</F> <H>-name</H> <V>"*.conf"</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Typ pliku</Comment>
            <Cmd>
              file <V>/bin/bash</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Gdzie jest program</Comment>
            <Cmd>
              which <V>nginx</V>
            </Cmd>
            <Cmd>
              whereis <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Drzewo blokow (dyski, partycje, LVM)</Comment>
            <Cmd>lsblk</Cmd>
          </ExampleBlock>
        </Card>

        <Card title="LVM — Logical Volume Management" color="var(--c-orange)">
          <pre className="text-xs leading-7 bg-[var(--c-code-bg)] border border-[var(--c-border)] rounded-md p-3 overflow-x-auto whitespace-pre mb-2.5">
            {`Dysk fizyczny
  /dev/sdb1          → Physical Volume (PV)
    data_vg          → Volume Group (VG)
      data_lv        → Logical Volume (LV)
        /mnt/data    → Mount point`}
          </pre>
          <InfoBox>
            <b>PV</b> = fizyczny dysk → <b>VG</b> = pula z PV → <b>LV</b> =
            wirtualna partycja
          </InfoBox>
          <SectionLabel className="mt-2.5">Tworzenie</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># 1. PV</Comment>
            <Cmd>
              pvcreate <F>/dev/sdb1</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># 2. VG</Comment>
            <Cmd>
              vgcreate <H>data_vg</H> <F>/dev/sdb1</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># 3. LV</Comment>
            <Cmd>
              lvcreate <H>-L 100G</H> <V>-n data_lv</V> <F>data_vg</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># 4. Format + mount</Comment>
            <Cmd>
              mkfs.ext4 <F>/dev/data_vg/data_lv</F>
            </Cmd>
            <Cmd>
              mount <F>/dev/data_vg/data_lv</F> <V>/mnt/data</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Zarządzanie</SectionLabel>
          <ExampleBlock>
            <Cmd>
              lvextend <H>-L +50G</H> <F>/dev/data_vg/data_lv</F>
            </Cmd>
            <Cmd>
              resize2fs <F>/dev/data_vg/data_lv</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Snapshot</Comment>
            <Cmd>
              lvcreate <H>-s</H> <V>-n snap01</V> -L 10G{' '}
              <F>/dev/data_vg/data_lv</F>
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-1.5">Podgląd</SectionLabel>
          <ExampleBlock>
            <Cmd>
              pvs <span className="text-[var(--c-muted)]"># lista PV</span>
            </Cmd>
            <Cmd>
              vgs <span className="text-[var(--c-muted)]"># lista VG</span>
            </Cmd>
            <Cmd>
              lvs <span className="text-[var(--c-muted)]"># lista LV</span>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Pełna struktura" color="var(--c-yellow)" full>
          <pre className="text-[13px] leading-7 bg-[var(--c-code-bg)] border border-[var(--c-border)] rounded-md p-4 overflow-x-auto whitespace-pre">
            <span className="text-[var(--c-accent)] font-bold">/</span>{' '}
            <span className="text-[var(--c-muted)]">
              Root — początek całego systemu plików
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /bin
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Podstawowe binaria (ls, cp, mv, cat, bash)
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /boot
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Jadro (vmlinuz), initramfs, GRUB bootloader
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /dev
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Pliki urządzeń (/dev/sda, /dev/null, /dev/tty)
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /etc
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Konfiguracja systemowa (passwd, fstab, nginx/)
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /home
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Katalogi domowe użytkowników (/home/serwin)
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /lib
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Biblioteki współdzielone (*.so) dla /bin i /sbin
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /media
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Automatyczne montowanie (USB, CD-ROM)
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /mnt
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Ręczne montowanie systemów plików
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /opt
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Opcjonalne oprogramowanie (zewnętrzne paczki)
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /proc
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Wirtualny FS — info o procesach i jądrze
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /root
            </span>{' '}
            <span className="text-[var(--c-muted)]">Katalog domowy root</span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /run
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Dane runtime (PID files, sockety) — tmpfs
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /sbin
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Binaria systemowe (fdisk, iptables, mount)
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /srv
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Dane serwisów (www, ftp)
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /sys
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Wirtualny FS — info o sprzecie
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /tmp
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Pliki tymczasowe (czyszczone przy restarcie)
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              ├── /usr
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Programy użytkownika, man pages, biblioteki
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              │ ├── /usr/bin
            </span>{' '}
            <span className="text-[var(--c-muted)]">Większość programow</span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              │ ├── /usr/lib
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Biblioteki dla /usr/bin
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              │ ├── /usr/local
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Oprogramowanie lokalne (make install)
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              │ └── /usr/share
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Dane niezależne od architektury
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              └── /var
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Dane zmienne (logi, bazy, cache, spools)
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              {' '}
              ├── /var/log
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Logi systemowe (syslog, auth.log, nginx/)
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              {' '}
              ├── /var/cache
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Cache pakietów (apt, yum)
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              {' '}
              ├── /var/lib
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Dane aplikacji (mysql, docker)
            </span>
            {'\n'}
            <span className="text-[var(--c-accent)] font-bold">
              {' '}
              └── /var/www
            </span>{' '}
            <span className="text-[var(--c-muted)]">
              Domyślny root serwera www
            </span>
          </pre>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/cheatsheets/permissions', label: 'Permissions' }}
        next={{ to: '/cheatsheets/docker', label: 'Docker' }}
      />
    </div>
  );
}
