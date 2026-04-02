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
import Divider from '../../components/Divider';
import InfoBox from '../../components/InfoBox';
import SectionLabel from '../../components/SectionLabel';
import LessonNav from '../../components/LessonNav';

export default function Lesson09() {
  usePageTitle('Lekcja 09 — Narzedzia Uniksa cz. 2');

  return (
    <div>
      <PageHeader
        title="Lekcja 09 — Narzedzia Uniksa cz. 2"
        subtitle="Dyski, partycje, LVM, pliki, archiwa, kompresja, siec, SSH, uzytkownicy"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === SEKCJA 1: Praca z dyskami i partycjami === */}
        <Card title="Struktura systemu plikow" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Linux organizuje dane w hierarchiczna strukture katalogow
            zaczynajaca sie od korzenia (root){' '}
            <code className="text-xs">/</code>. Kazdy katalog ma scisle
            okreslona role.
          </p>
          <SectionLabel>Glowne punkty montowania</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              <H>/</H> <V># korzen systemu plikow</V>
            </Cmd>
            <Cmd>
              <H>/boot</H> <V># jadro i bootloader</V>
            </Cmd>
            <Cmd>
              <H>/home</H> <V># katalogi domowe uzytkownikow</V>
            </Cmd>
            <Cmd>
              <H>swap</H> <V># partycja wymiany (RAM)</V>
            </Cmd>
            <Cmd>
              <H>/var</H> <V># dane zmienne (logi, bazy)</V>
            </Cmd>
            <Cmd>
              <H>/opt</H> <V># oprogramowanie dodatkowe</V>
            </Cmd>
            <Cmd>
              <H>/usr</H> <V># programy i biblioteki</V>
            </Cmd>
            <Cmd>
              <H>/tmp</H> <V># pliki tymczasowe</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Wazne katalogi systemowe</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              <H>/etc</H> <V># konfiguracja systemu</V>
            </Cmd>
            <Cmd>
              <H>/bin</H> <V># podstawowe programy</V>
            </Cmd>
            <Cmd>
              <H>/sbin</H> <V># programy administracyjne</V>
            </Cmd>
            <Cmd>
              <H>/lib</H> <V># biblioteki systemowe</V>
            </Cmd>
            <Cmd>
              <H>/proc</H> <V># wirtualny system plikow (procesy)</V>
            </Cmd>
            <Cmd>
              <H>/dev</H> <V># pliki urzadzen</V>
            </Cmd>
            <Cmd>
              <H>/mnt</H> <V># tymczasowe punkty montowania</V>
            </Cmd>
            <Cmd>
              <H>/media</H> <V># montowanie nosnikow zewn.</V>
            </Cmd>
            <Cmd>
              <H>/srv</H> <V># dane uslug (np. WWW, FTP)</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Zarzadzanie partycjami" color="var(--c-yellow)">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
            <Concept title="MBR" color="var(--c-yellow)">
              Starszy schemat partycjonowania — obsluguje dyski do <b>2 TB</b>,
              maksymalnie <b>4 partycje</b> podstawowe.
            </Concept>
            <Concept title="GPT" color="var(--c-green)">
              Nowoczesny schemat — obsluguje dyski do <b>9.4 ZB</b>, maksymalnie{' '}
              <b>128 partycji</b>.
            </Concept>
          </div>
          <Divider />
          <SectionLabel>Narzedzia</SectionLabel>
          <Concept title="fdisk / gdisk / parted" color="var(--c-purple)">
            <b>fdisk</b> — partycje MBR. <b>gdisk</b> — partycje GPT.{' '}
            <b>parted</b> — obsluguje oba schematy.
          </Concept>
          <Divider />
          <SectionLabel>Diagnostyka</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Lista partycji</Comment>
            <Cmd>
              sudo <H>fdisk</H> <V>-l</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Uzycie systemu plikow</Comment>
            <Cmd>
              <H>df</H> <V>-h</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Rozmiar katalogu</Comment>
            <Cmd>
              <H>du</H> <V>-sh</V> <F>/var/log</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Struktura blokow i systemy plikow</Comment>
            <Cmd>
              <H>lsblk</H> <V>-f</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="LVM (Logical Volume Manager)" color="var(--c-purple)">
          <Concept title="Czym jest LVM?" color="var(--c-purple)">
            LVM pozwala elastycznie zarzadzac przestrzenia dyskowa — mozna
            powiekszac i zmniejszac woluminy bez restartowania systemu.
          </Concept>
          <Divider />
          <SectionLabel>Architektura</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              <V>Dysk fizyczny</V> (<F>/dev/sdb</F>)
            </Cmd>
            <Cmd>
              {'  '}-&gt; <H>PV</H> (Physical Volume)
            </Cmd>
            <Cmd>
              {'    '}-&gt; <H>VG</H> (Volume Group)
            </Cmd>
            <Cmd>
              {'      '}-&gt; <H>LV</H> (Logical Volume)
            </Cmd>
            <Cmd>
              {'        '}-&gt; <V>system plikow</V> (ext4/xfs)
            </Cmd>
            <Cmd>
              {'          '}-&gt; <F>punkt montowania</F> (/mnt/data)
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Informacje</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              <H>pvdisplay</H> <V># pokaz woluminy fizyczne</V>
            </Cmd>
            <Cmd>
              <H>vgdisplay</H> <V># pokaz grupy woluminow</V>
            </Cmd>
            <Cmd>
              <H>lvdisplay</H> <V># pokaz woluminy logiczne</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Tworzenie i rozszerzanie</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Tworzenie</Comment>
            <Cmd>
              <H>pvcreate</H> <F>/dev/sdb</F>
            </Cmd>
            <Cmd>
              <H>vgcreate</H> <V>myvg</V> <F>/dev/sdb</F>
            </Cmd>
            <Cmd>
              <H>lvcreate</H> -L <V>10G</V> -n <V>mydata</V> <V>myvg</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Rozszerzanie woluminu</Comment>
            <Cmd>
              <H>lvextend</H> -L <V>+5G</V> <F>/dev/myvg/mydata</F>
            </Cmd>
            <Cmd>
              <H>resize2fs</H> <F>/dev/myvg/mydata</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Systemy plikow i montowanie" color="var(--c-orange)">
          <SectionLabel>Popularne systemy plikow</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
            <Concept title="ext4" color="var(--c-green)">
              Domyslny w wiekszosci dystrybucji Linuksa.
            </Concept>
            <Concept title="XFS" color="var(--c-orange)">
              Wydajny przy duzych plikach (RHEL).
            </Concept>
            <Concept title="Btrfs" color="var(--c-purple)">
              Snapshoty, kompresja (SUSE).
            </Concept>
            <Concept title="ZFS" color="var(--c-yellow)">
              Zaawansowane zarzadzanie danymi.
            </Concept>
          </div>
          <Divider />
          <SectionLabel>Formatowanie i montowanie</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Utworzenie systemu plikow</Comment>
            <Cmd>
              sudo <H>mkfs.ext4</H> <F>/dev/sdb1</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Montowanie reczne</Comment>
            <Cmd>
              sudo <H>mount</H> <F>/dev/sdb1</F> <F>/mnt/data</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>/etc/fstab — 6 pol</SectionLabel>
          <ExampleBlock>
            <Comment># urzadzenie punkt_mont fs opcje dump fsck</Comment>
            <Cmd>
              <V>UUID=abc123</V> <F>/mnt/data</F> <H>ext4</H> defaults 0 2
            </Cmd>
          </ExampleBlock>
          <InfoBox warn>
            Przed restartem przetestuj z{' '}
            <code className="text-xs">mount -a</code>. Uzywaj UUID (z{' '}
            <code className="text-xs">blkid</code>) zamiast /dev/sdX — nazwy
            urzadzen moga sie zmienic!
          </InfoBox>
        </Card>

        {/* === SEKCJA 2: Praca z plikami i folderami === */}
        <Card title="Operacje na plikach" color="var(--c-green)">
          <SectionLabel>Nawigacja</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              <H>pwd</H> <V># aktualny katalog</V>
            </Cmd>
            <Cmd>
              <H>ls</H> <V># lista plikow</V>
            </Cmd>
            <Cmd>
              <H>ls</H> <V>-la</V> <V># lista z detalami i ukrytymi</V>
            </Cmd>
            <Cmd>
              <H>cd</H> <F>/path</F> <V># zmien katalog</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Tworzenie i kopiowanie</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              <H>mkdir</H> <V>katalog</V> <V># utworz katalog</V>
            </Cmd>
            <Cmd>
              <H>mkdir</H> <V>-p</V> <F>a/b/c</F>{' '}
              <V># utworz z podkatalogami</V>
            </Cmd>
            <Cmd>
              <H>cp</H> <V>plik</V> <V>kopia</V> <V># kopiuj plik</V>
            </Cmd>
            <Cmd>
              <H>cp</H> <V>-r</V> <F>katalog/</F> <F>kopia/</F>{' '}
              <V># kopiuj katalog rekurencyjnie</V>
            </Cmd>
            <Cmd>
              <H>mv</H> <V>stary</V> <V>nowy</V> <V># przenies / zmien nazwe</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Usuwanie</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              <H>rm</H> <V>plik</V> <V># usun plik</V>
            </Cmd>
            <Cmd>
              <H>rm</H> <V>-r</V> <F>katalog</F>{' '}
              <V># usun katalog rekurencyjnie</V>
            </Cmd>
            <Cmd>
              <H>rmdir</H> <V>katalog</V> <V># usun pusty katalog</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox warn>
            <code className="text-xs">rm -rf /</code> moze zniszczyc caly
            system! Nigdy nie uruchamiaj jako root bez przemyslenia.
          </InfoBox>
        </Card>

        <Card title="Wyszukiwanie i dowiazania" color="var(--c-accent)">
          <SectionLabel>Wyszukiwanie plikow</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Po nazwie</Comment>
            <Cmd>
              <H>find</H> <F>/var</F> -name <V>"*.log"</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Po typie (f=plik, d=katalog)</Comment>
            <Cmd>
              <H>find</H> <F>/etc</F> -type <V>f</V> -name <V>"*.conf"</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Po czasie modyfikacji (ostatnie 7 dni)</Comment>
            <Cmd>
              <H>find</H> <F>/home</F> -mtime <V>-7</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Z wykonaniem komendy</Comment>
            <Cmd>
              <H>find</H> <F>/tmp</F> -name <V>"*.tmp"</V> -exec rm {'{}'} \;
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Laczenie i dzielenie</SectionLabel>
          <ExampleBlock>
            <Cmd>
              <H>cat</H> <V>plik1</V> <V>plik2</V> &gt; <F>polaczony</F>
            </Cmd>
            <Cmd>
              <H>split</H> -b <V>100M</V> <F>duzy.tar.gz</F> <V>czesc_</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Dowiazania</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
            <Concept title="Hard link (ln)" color="var(--c-orange)">
              Wskazuje na te same dane (inode). Plik istnieje dopoki jest choc
              jeden hard link.
            </Concept>
            <Concept title="Symbolic link (ln -s)" color="var(--c-purple)">
              Wskazuje na sciezke. Moze wskazywac na katalogi i pliki na innych
              partycjach.
            </Concept>
          </div>
          <ExampleBlock>
            <Comment># Przyklady w DevOps:</Comment>
            <Cmd>
              <H>ln -s</H> <F>/usr/bin/python3.11</F> <F>/usr/bin/python3</F>
            </Cmd>
            <Cmd>
              <H>ln -s</H> <F>/etc/nginx/sites-available/app</F> \
            </Cmd>
            <Cmd>
              {'  '}
              <F>/etc/nginx/sites-enabled/app</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Kompresja i archiwizacja" color="var(--c-yellow)">
          <SectionLabel>tar — tworzenie archiwow</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Samo archiwum (bez kompresji)</Comment>
            <Cmd>
              <H>tar</H> <V>-cvf</V> <F>archiwum.tar</F> <F>katalog/</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Z kompresja gzip (.tar.gz)</Comment>
            <Cmd>
              <H>tar</H> <V>-czvf</V> <F>archiwum.tar.gz</F> <F>katalog/</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Z kompresja bzip2 (.tar.bz2)</Comment>
            <Cmd>
              <H>tar</H> <V>-cjvf</V> <F>archiwum.tar.bz2</F> <F>katalog/</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>tar — rozpakowywanie</SectionLabel>
          <ExampleBlock variant="yellow">
            <Cmd>
              <H>tar</H> <V>-xvf</V> <F>archiwum.tar</F>
            </Cmd>
            <Cmd>
              <H>tar</H> <V>-xzvf</V> <F>archiwum.tar.gz</F>
            </Cmd>
            <Cmd>
              <H>tar</H> <V>-xjvf</V> <F>archiwum.tar.bz2</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Porownanie algorytmow</SectionLabel>
          <div className="overflow-x-auto">
            <table className="text-xs w-full">
              <thead>
                <tr className="text-left border-b border-[var(--c-border)]">
                  <th className="pb-1 pr-2">Algorytm</th>
                  <th className="pb-1 pr-2">Szybkosc</th>
                  <th className="pb-1">Kompresja</th>
                </tr>
              </thead>
              <tbody className="text-[var(--c-muted)]">
                <tr>
                  <td className="py-0.5 pr-2">gzip / gunzip</td>
                  <td className="pr-2">szybki</td>
                  <td>dobra</td>
                </tr>
                <tr>
                  <td className="py-0.5 pr-2">bzip2 / bunzip2</td>
                  <td className="pr-2">wolniejszy</td>
                  <td>lepsza</td>
                </tr>
                <tr>
                  <td className="py-0.5 pr-2">xz / unxz</td>
                  <td className="pr-2">najwolniejszy</td>
                  <td>najlepsza</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* === SEKCJA 3: Praca z siecia === */}
        <Card title="Diagnostyka sieci" color="var(--c-accent)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Podstawowe narzedzia do sprawdzania polaczenia sieciowego i
            rozwiazywania problemow z dostepnoscia uslug.
          </p>
          <SectionLabel>Testowanie polaczenia</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Sprawdzenie dostepnosci hosta</Comment>
            <Cmd>
              <H>ping</H> -c <V>4</V> <F>google.com</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Trasa pakietow do celu</Comment>
            <Cmd>
              <H>traceroute</H> <F>google.com</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Rozwiazywanie nazw DNS</Comment>
            <Cmd>
              <H>host</H> <F>google.com</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Informacje o interfejsach</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              <H>ip addr show</H> <V># adresy IP (nowoczesne)</V>
            </Cmd>
            <Cmd>
              <H>ifconfig</H> <V># adresy IP (starsza wersja)</V>
            </Cmd>
            <Cmd>
              <H>ip route show</H> <V># tablica routingu</V>
            </Cmd>
            <Cmd>
              <H>route</H> <V># tablica routingu (starsza)</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Otwarte porty</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Nowoczesne (ss)</Comment>
            <Cmd>
              <H>ss</H> <V>-tulnp</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Starsza wersja (netstat)</Comment>
            <Cmd>
              <H>netstat</H> <V>-tulnp</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Konfiguracja sieci" color="var(--c-purple)">
          <SectionLabel>Wlaczanie/wylaczanie interfejsu</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Nowoczesne</Comment>
            <Cmd>
              sudo <H>ip link set</H> <V>eth0</V> <H>up</H>
            </Cmd>
            <Cmd>
              sudo <H>ip link set</H> <V>eth0</V> <H>down</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Starsza wersja</Comment>
            <Cmd>
              sudo <H>ifconfig</H> <V>eth0</V> <H>up</H>
            </Cmd>
            <Cmd>
              sudo <H>ifconfig</H> <V>eth0</V> <H>down</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Adresy i trasy</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Dodanie adresu IP</Comment>
            <Cmd>
              sudo <H>ip addr add</H> <V>192.168.1.10/24</V> dev <V>eth0</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Dodanie trasy</Comment>
            <Cmd>
              sudo <H>ip route add</H> <V>10.0.0.0/8</V> via <V>192.168.1.1</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>DNS</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              <H>cat</H> <F>/etc/resolv.conf</F> <V># serwery DNS</V>
            </Cmd>
            <Cmd>
              <H>dig</H> <F>example.com</F> <V># szczegolowe info DNS</V>
            </Cmd>
            <Cmd>
              <H>nslookup</H> <F>example.com</F> <V># proste zapytanie DNS</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox warn>
            Polecenia ip/ifconfig dzialaja tymczasowo! Trwala konfiguracja:{' '}
            <code className="text-xs">/etc/netplan/*.yaml</code> (Ubuntu) lub{' '}
            <code className="text-xs">/etc/network/interfaces</code> (Debian).
          </InfoBox>
        </Card>

        <Card title="Monitorowanie i SSH" color="var(--c-orange)">
          <SectionLabel>Monitorowanie sieci</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Przechwytywanie pakietow</Comment>
            <Cmd>
              sudo <H>tcpdump</H> -i <V>eth0</V> port <V>80</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Monitor przepustowosci</Comment>
            <Cmd>
              sudo <H>iftop</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Ruch sieciowy per proces</Comment>
            <Cmd>
              sudo <H>nethogs</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Skanowanie portow</Comment>
            <Cmd>
              <H>nmap</H> <V>-sV</V> <F>192.168.1.0/24</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>SSH — polaczenia zdalne</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Polaczenie</Comment>
            <Cmd>
              <H>ssh</H> <V>user@host</V>
            </Cmd>
            <Cmd>
              <H>ssh</H> -p <V>2222</V> <V>user@host</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Kopiowanie plikow</Comment>
            <Cmd>
              <H>scp</H> <F>plik.txt</F> <V>user@host</V>:<F>/tmp/</F>
            </Cmd>
            <Cmd>
              <H>rsync</H> -avz -e ssh <F>src/</F> <V>user@host</V>:<F>/dst/</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Serwer SSH</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>
              sudo apt install <H>openssh-server</H>
            </Cmd>
            <Cmd>
              sudo systemctl <H>start</H> <V>sshd</V>
            </Cmd>
            <Cmd>
              sudo systemctl <H>enable</H> <V>sshd</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Kluczowe parametry /etc/ssh/sshd_config</SectionLabel>
          <ExampleBlock>
            <Cmd>
              <H>PermitRootLogin</H> <V>no</V>
            </Cmd>
            <Cmd>
              <H>PasswordAuthentication</H> <V>no</V>
            </Cmd>
            <Cmd>
              <H>Port</H> <V>2222</V>
            </Cmd>
            <Cmd>
              <H>MaxAuthTries</H> <V>3</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === SEKCJA 4: Praca z kontami uzytkownikow === */}
        <Card title="Zarzadzanie uzytkownikami" color="var(--c-green)">
          <Concept title="Pliki konfiguracyjne" color="var(--c-green)">
            Informacje o uzytkownikach i grupach sa przechowywane w trzech
            kluczowych plikach systemowych:{' '}
            <code className="text-xs">/etc/passwd</code>,{' '}
            <code className="text-xs">/etc/shadow</code>,{' '}
            <code className="text-xs">/etc/group</code>.
          </Concept>
          <ExampleBlock variant="green">
            <Cmd>
              <F>/etc/passwd</F> <V># dane uzytkownikow (UID, shell)</V>
            </Cmd>
            <Cmd>
              <F>/etc/shadow</F> <V># zaszyfrowane hasla</V>
            </Cmd>
            <Cmd>
              <F>/etc/group</F> <V># definicje grup (GID)</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Uzytkownicy</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Utworzenie uzytkownika</Comment>
            <Cmd>
              sudo <H>useradd</H> -m -s /bin/bash <V>jan</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Usuniecie uzytkownika z katalogiem domowym</Comment>
            <Cmd>
              sudo <H>userdel</H> -r <V>jan</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Ustawienie / zmiana hasla</Comment>
            <Cmd>
              sudo <H>passwd</H> <V>jan</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Zablokowanie / odblokowanie konta</Comment>
            <Cmd>
              sudo <H>passwd</H> <V>-l</V> <V>jan</V>
            </Cmd>
            <Cmd>
              sudo <H>passwd</H> <V>-u</V> <V>jan</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Grupy</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              sudo <H>groupadd</H> <V>devops</V>
            </Cmd>
            <Cmd>
              sudo <H>groupdel</H> <V>devops</V>
            </Cmd>
            <Cmd>
              sudo <H>usermod</H> -aG <V>devops</V> <V>jan</V>
            </Cmd>
            <Cmd>
              sudo <H>gpasswd</H> -d <V>jan</V> <V>devops</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Model uprawnien" color="var(--c-yellow)">
          <Concept title="Uprawnienia plikow" color="var(--c-yellow)">
            Kazdy plik ma trzy zestawy uprawnien: wlasciciel (u), grupa (g),
            pozostali (o). Kazdy zestaw to kombinacja <b>r</b> (read = 4),{' '}
            <b>w</b> (write = 2), <b>x</b> (execute = 1).
          </Concept>
          <Divider />
          <SectionLabel>Przyklady</SectionLabel>
          <ExampleBlock variant="yellow">
            <Cmd>
              <H>755</H> = <V>rwxr-xr-x</V>{' '}
              <V># wlasciciel: all, reszta: r+x</V>
            </Cmd>
            <Cmd>
              <H>770</H> = <V>rwxrwx---</V>{' '}
              <V># wlasciciel+grupa: all, inni: nic</V>
            </Cmd>
            <Cmd>
              <H>644</H> = <V>rw-r--r--</V>{' '}
              <V># plik: wlasciciel rw, reszta r</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Bity specjalne</SectionLabel>
          <Concept title="SUID / SGID / Sticky bit" color="var(--c-purple)">
            <b>SUID</b> (4xxx) — uruchamia z prawami wlasciciela. <b>SGID</b>{' '}
            (2xxx) — uruchamia z prawami grupy. <b>Sticky bit</b> (1xxx) — tylko
            wlasciciel moze usunac plik.
          </Concept>
          <Divider />
          <SectionLabel>Zmiana uprawnien</SectionLabel>
          <ExampleBlock variant="yellow">
            <Cmd>
              <H>chmod</H> <V>755</V> <F>skrypt.sh</F>
            </Cmd>
            <Cmd>
              <H>chmod</H> <V>u+x</V> <F>skrypt.sh</F>
            </Cmd>
            <Cmd>
              <H>chown</H> <V>jan:devops</V> <F>plik.txt</F>
            </Cmd>
            <Cmd>
              <H>chown</H> -R <V>jan:devops</V> <F>/opt/app/</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Sudo i monitorowanie" color="var(--c-purple)">
          <SectionLabel>Konfiguracja sudo</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Edycja konfiguracji (bezpieczna)</Comment>
            <Cmd>
              sudo <H>visudo</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Pliki konfiguracyjne</Comment>
            <Cmd>
              <F>/etc/sudoers</F>
            </Cmd>
            <Cmd>
              <F>/etc/sudoers.d/</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Dodawanie do grupy sudo</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Debian / Ubuntu</Comment>
            <Cmd>
              sudo <H>usermod</H> -aG <V>sudo</V> <V>jan</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># RHEL / CentOS</Comment>
            <Cmd>
              sudo <H>usermod</H> -aG <V>wheel</V> <V>jan</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Monitorowanie sesji</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              <H>who</H> <V># zalogowani uzytkownicy</V>
            </Cmd>
            <Cmd>
              <H>w</H> <V># zalogowani + co robia</V>
            </Cmd>
            <Cmd>
              <H>last</H> <V># historia logowan</V>
            </Cmd>
            <Cmd>
              <H>lastb</H> <V># nieudane logowania</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Limity zasobow</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Pokaz aktualne limity</Comment>
            <Cmd>
              <H>ulimit</H> <V>-a</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Trwala konfiguracja</Comment>
            <Cmd>
              <F>/etc/security/limits.conf</F>
            </Cmd>
          </ExampleBlock>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/08', label: '08 — Narzedzia Uniksa cz. 1' }}
        next={{ to: '/lessons/10', label: '10 — Repozytoria' }}
      />
    </div>
  );
}
