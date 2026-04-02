import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import LessonNav from '../../components/LessonNav';
import { usePageTitle } from '../../hooks/usePageTitle';

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
        <Card title="Struktura systemu plikow">
          <p className="text-sm mb-3">
            Linux organizuje dane w hierarchiczna strukture katalogow
            zaczynajaca sie od korzenia (root){' '}
            <code className="text-xs">/</code>. Kazdy katalog ma scisle
            okreslona role.
          </p>
          <p className="text-sm font-semibold mb-1">
            Glowne punkty montowania:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`/        # korzen systemu plikow
/boot    # jadro i bootloader
/home    # katalogi domowe uzytkownikow
swap     # partycja wymiany (RAM)
/var     # dane zmienne (logi, bazy)
/opt     # oprogramowanie dodatkowe
/usr     # programy i biblioteki
/tmp     # pliki tymczasowe`}
          </pre>
          <p className="text-sm font-semibold mb-1">
            Wazne katalogi systemowe:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`/etc     # konfiguracja systemu
/bin     # podstawowe programy
/sbin    # programy administracyjne
/lib     # biblioteki systemowe
/proc    # wirtualny system plikow (procesy)
/dev     # pliki urzadzen
/mnt     # tymczasowe punkty montowania
/media   # montowanie nosnikow zewn.
/srv     # dane uslug (np. WWW, FTP)`}
          </pre>
        </Card>

        <Card title="Zarzadzanie partycjami">
          <p className="text-sm mb-2">Dwa schematy partycjonowania:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>
              <strong>MBR</strong> — do 2 TB, max 4 partycje podstawowe
            </li>
            <li>
              <strong>GPT</strong> — do 9.4 ZB, max 128 partycji
            </li>
          </ul>
          <p className="text-sm font-semibold mb-1">Narzedzia:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>
              <strong>fdisk</strong> — partycje MBR
            </li>
            <li>
              <strong>gdisk</strong> — partycje GPT
            </li>
            <li>
              <strong>parted</strong> — obsluguje oba schematy
            </li>
          </ul>
          <p className="text-sm font-semibold mb-1">Diagnostyka:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Lista partycji
sudo fdisk -l

# Uzycie systemu plikow
df -h

# Rozmiar katalogu
du -sh /var/log

# Struktura blokow i systemy plikow
lsblk -f`}
          </pre>
        </Card>

        <Card title="LVM (Logical Volume Manager)">
          <p className="text-sm mb-2">
            LVM pozwala elastycznie zarzadzac przestrzenia dyskowa — mozna
            powiekszac i zmniejszac woluminy bez restartowania systemu.
          </p>
          <p className="text-sm font-semibold mb-1">Architektura:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`Dysk fizyczny (/dev/sdb)
  -> PV (Physical Volume)
    -> VG (Volume Group)
      -> LV (Logical Volume)
        -> system plikow (ext4/xfs)
          -> punkt montowania (/mnt/data)`}
          </pre>
          <p className="text-sm font-semibold mb-1">Informacje:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`pvdisplay   # pokaz woluminy fizyczne
vgdisplay   # pokaz grupy woluminow
lvdisplay   # pokaz woluminy logiczne`}
          </pre>
          <p className="text-sm font-semibold mb-1">
            Tworzenie i rozszerzanie:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Tworzenie
pvcreate /dev/sdb
vgcreate myvg /dev/sdb
lvcreate -L 10G -n mydata myvg

# Rozszerzanie woluminu
lvextend -L +5G /dev/myvg/mydata
resize2fs /dev/myvg/mydata`}
          </pre>
        </Card>

        <Card title="Systemy plikow i montowanie">
          <p className="text-sm mb-2">Popularne systemy plikow:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>
              <strong>ext4</strong> — domyslny w wiekszosci dystrybucji
            </li>
            <li>
              <strong>XFS</strong> — wydajny przy duzych plikach (RHEL)
            </li>
            <li>
              <strong>Btrfs</strong> — snapshoty, kompresja (SUSE)
            </li>
            <li>
              <strong>ZFS</strong> — zaawansowane zarzadzanie danymi
            </li>
          </ul>
          <p className="text-sm font-semibold mb-1">
            Formatowanie i montowanie:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Utworzenie systemu plikow
sudo mkfs.ext4 /dev/sdb1

# Montowanie reczne
sudo mount /dev/sdb1 /mnt/data`}
          </pre>
          <p className="text-sm font-semibold mb-1">/etc/fstab — 6 pol:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# urzadzenie  punkt_mont  fs    opcje     dump fsck
UUID=abc123  /mnt/data   ext4  defaults  0    2`}
          </pre>
          <p className="text-xs text-[var(--c-warning)] font-semibold">
            Uwaga: Przed restartem przetestuj z <code>mount -a</code>. Uzywaj
            UUID (z <code>blkid</code>) zamiast /dev/sdX — nazwy urzadzen moga
            sie zmienic!
          </p>
        </Card>

        {/* === SEKCJA 2: Praca z plikami i folderami === */}
        <Card title="Operacje na plikach">
          <p className="text-sm font-semibold mb-1">Nawigacja:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`pwd       # aktualny katalog
ls        # lista plikow
ls -la    # lista z detalami i ukrytymi
cd /path  # zmien katalog`}
          </pre>
          <p className="text-sm font-semibold mb-1">Tworzenie i kopiowanie:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`mkdir katalog         # utworz katalog
mkdir -p a/b/c        # utworz z podkatalogami
cp plik kopia         # kopiuj plik
cp -r katalog/ kopia/ # kopiuj katalog rekurencyjnie
mv stary nowy         # przenies / zmien nazwe`}
          </pre>
          <p className="text-sm font-semibold mb-1">Usuwanie:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`rm plik       # usun plik
rm -r katalog # usun katalog rekurencyjnie
rmdir katalog # usun pusty katalog`}
          </pre>
          <p className="text-xs text-[var(--c-warning)] font-semibold">
            Uwaga: <code>rm -rf /</code> moze zniszczyc caly system! Nigdy nie
            uruchamiaj jako root bez przemyslenia.
          </p>
        </Card>

        <Card title="Wyszukiwanie i dowiazania">
          <p className="text-sm font-semibold mb-1">Wyszukiwanie plikow:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Po nazwie
find /var -name "*.log"

# Po typie (f=plik, d=katalog)
find /etc -type f -name "*.conf"

# Po czasie modyfikacji (ostatnie 7 dni)
find /home -mtime -7

# Z wykonaniem komendy
find /tmp -name "*.tmp" -exec rm {} \\;`}
          </pre>
          <p className="text-sm font-semibold mb-1">Laczenie i dzielenie:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`cat plik1 plik2 > polaczony
split -b 100M duzy.tar.gz czesc_`}
          </pre>
          <p className="text-sm font-semibold mb-1">Dowiazania:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-2">
            <li>
              <strong>Hard link</strong> (<code className="text-xs">ln</code>) —
              wskazuje na te same dane (inode)
            </li>
            <li>
              <strong>Symbolic link</strong> (
              <code className="text-xs">ln -s</code>) — wskazuje na sciezke
            </li>
          </ul>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Przyklady w DevOps:
ln -s /usr/bin/python3.11 /usr/bin/python3
ln -s /etc/nginx/sites-available/app \\
  /etc/nginx/sites-enabled/app`}
          </pre>
        </Card>

        <Card title="Kompresja i archiwizacja">
          <p className="text-sm font-semibold mb-1">
            tar — tworzenie archiwow:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Samo archiwum (bez kompresji)
tar -cvf archiwum.tar katalog/

# Z kompresja gzip (.tar.gz)
tar -czvf archiwum.tar.gz katalog/

# Z kompresja bzip2 (.tar.bz2)
tar -cjvf archiwum.tar.bz2 katalog/`}
          </pre>
          <p className="text-sm font-semibold mb-1">tar — rozpakowywanie:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`tar -xvf archiwum.tar
tar -xzvf archiwum.tar.gz
tar -xjvf archiwum.tar.bz2`}
          </pre>
          <p className="text-sm font-semibold mb-1">Porownanie algorytmow:</p>
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
        <Card title="Diagnostyka sieci">
          <p className="text-sm mb-2">
            Podstawowe narzedzia do sprawdzania polaczenia sieciowego i
            rozwiazywania problemow z dostepnoscia uslug.
          </p>
          <p className="text-sm font-semibold mb-1">Testowanie polaczenia:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Sprawdzenie dostepnosci hosta
ping -c 4 google.com

# Trasa pakietow do celu
traceroute google.com

# Rozwiazywanie nazw DNS
host google.com`}
          </pre>
          <p className="text-sm font-semibold mb-1">
            Informacje o interfejsach:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`ip addr show    # adresy IP (nowoczesne)
ifconfig        # adresy IP (starsza wersja)
ip route show   # tablica routingu
route           # tablica routingu (starsza)`}
          </pre>
          <p className="text-sm font-semibold mb-1">Otwarte porty:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Nowoczesne (ss)
ss -tulnp

# Starsza wersja (netstat)
netstat -tulnp`}
          </pre>
        </Card>

        <Card title="Konfiguracja sieci">
          <p className="text-sm font-semibold mb-1">
            Wlaczanie/wylaczanie interfejsu:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Nowoczesne
sudo ip link set eth0 up
sudo ip link set eth0 down

# Starsza wersja
sudo ifconfig eth0 up
sudo ifconfig eth0 down`}
          </pre>
          <p className="text-sm font-semibold mb-1">Adresy i trasy:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Dodanie adresu IP
sudo ip addr add 192.168.1.10/24 dev eth0

# Dodanie trasy
sudo ip route add 10.0.0.0/8 via 192.168.1.1`}
          </pre>
          <p className="text-sm font-semibold mb-1">DNS:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`cat /etc/resolv.conf   # serwery DNS
dig example.com        # szczegolowe info DNS
nslookup example.com   # proste zapytanie DNS`}
          </pre>
          <p className="text-xs text-[var(--c-warning)] font-semibold">
            Uwaga: Polecenia ip/ifconfig dzialaja tymczasowo! Trwala
            konfiguracja: /etc/netplan/*.yaml (Ubuntu) lub
            /etc/network/interfaces (Debian).
          </p>
        </Card>

        <Card title="Monitorowanie i SSH">
          <p className="text-sm font-semibold mb-1">Monitorowanie sieci:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Przechwytywanie pakietow
sudo tcpdump -i eth0 port 80

# Monitor przepustowosci
sudo iftop

# Ruch sieciowy per proces
sudo nethogs

# Skanowanie portow
nmap -sV 192.168.1.0/24`}
          </pre>
          <p className="text-sm font-semibold mb-1">SSH — polaczenia zdalne:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Polaczenie
ssh user@host
ssh -p 2222 user@host

# Kopiowanie plikow
scp plik.txt user@host:/tmp/
rsync -avz -e ssh src/ user@host:/dst/`}
          </pre>
          <p className="text-sm font-semibold mb-1">Serwer SSH:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`sudo apt install openssh-server
sudo systemctl start sshd
sudo systemctl enable sshd`}
          </pre>
          <p className="text-sm font-semibold mb-1">
            Kluczowe parametry /etc/ssh/sshd_config:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`PermitRootLogin no
PasswordAuthentication no
Port 2222
MaxAuthTries 3`}
          </pre>
        </Card>

        {/* === SEKCJA 4: Praca z kontami uzytkownikow === */}
        <Card title="Zarzadzanie uzytkownikami">
          <p className="text-sm mb-2">
            Informacje o uzytkownikach i grupach sa przechowywane w trzech
            kluczowych plikach systemowych.
          </p>
          <p className="text-sm font-semibold mb-1">Pliki konfiguracyjne:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`/etc/passwd  # dane uzytkownikow (UID, shell)
/etc/shadow  # zaszyfrowane hasla
/etc/group   # definicje grup (GID)`}
          </pre>
          <p className="text-sm font-semibold mb-1">Uzytkownicy:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Utworzenie uzytkownika
sudo useradd -m -s /bin/bash jan

# Usuniecie uzytkownika z katalogiem domowym
sudo userdel -r jan

# Ustawienie / zmiana hasla
sudo passwd jan

# Zablokowanie / odblokowanie konta
sudo passwd -l jan
sudo passwd -u jan`}
          </pre>
          <p className="text-sm font-semibold mb-1">Grupy:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`sudo groupadd devops
sudo groupdel devops
sudo usermod -aG devops jan
sudo gpasswd -d jan devops`}
          </pre>
        </Card>

        <Card title="Model uprawnien">
          <p className="text-sm mb-2">
            Kazdy plik ma trzy zestawy uprawnien: wlasciciel (u), grupa (g),
            pozostali (o). Kazdy zestaw to kombinacja r, w, x.
          </p>
          <p className="text-sm font-semibold mb-1">Wartosci numeryczne:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>
              <strong>r</strong> (read) = 4
            </li>
            <li>
              <strong>w</strong> (write) = 2
            </li>
            <li>
              <strong>x</strong> (execute) = 1
            </li>
          </ul>
          <p className="text-sm font-semibold mb-1">Przyklady:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`755 = rwxr-xr-x  # wlasciciel: all, reszta: r+x
770 = rwxrwx---  # wlasciciel+grupa: all, inni: nic
644 = rw-r--r--  # plik: wlasciciel rw, reszta r`}
          </pre>
          <p className="text-sm font-semibold mb-1">Bity specjalne:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>
              <strong>SUID</strong> (4xxx) — uruchamia z prawami wlasciciela
            </li>
            <li>
              <strong>SGID</strong> (2xxx) — uruchamia z prawami grupy
            </li>
            <li>
              <strong>Sticky bit</strong> (1xxx) — tylko wlasciciel moze usunac
              plik
            </li>
          </ul>
          <p className="text-sm font-semibold mb-1">Zmiana uprawnien:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`chmod 755 skrypt.sh
chmod u+x skrypt.sh
chown jan:devops plik.txt
chown -R jan:devops /opt/app/`}
          </pre>
        </Card>

        <Card title="Sudo i monitorowanie">
          <p className="text-sm font-semibold mb-1">Konfiguracja sudo:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Edycja konfiguracji (bezpieczna)
sudo visudo

# Pliki konfiguracyjne
/etc/sudoers
/etc/sudoers.d/`}
          </pre>
          <p className="text-sm font-semibold mb-1">Dodawanie do grupy sudo:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Debian / Ubuntu
sudo usermod -aG sudo jan

# RHEL / CentOS
sudo usermod -aG wheel jan`}
          </pre>
          <p className="text-sm font-semibold mb-1">Monitorowanie sesji:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`who       # zalogowani uzytkownicy
w         # zalogowani + co robia
last      # historia logowan
lastb     # nieudane logowania`}
          </pre>
          <p className="text-sm font-semibold mb-1">Limity zasobow:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Pokaz aktualne limity
ulimit -a

# Trwala konfiguracja
/etc/security/limits.conf`}
          </pre>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/08', label: '08 — Narzedzia Uniksa cz. 1' }}
        next={{ to: '/lessons/10', label: '10 — Repozytoria' }}
      />
    </div>
  );
}
