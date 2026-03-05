import { usePageTitle } from '../../hooks/usePageTitle'
import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import ExampleBlock, { Cmd, Comment, H, V, F } from '../../components/ExampleBlock'
import Row from '../../components/Row'
import Divider from '../../components/Divider'
import InfoBox from '../../components/InfoBox'
import SectionLabel from '../../components/SectionLabel'
import Concept from '../../components/Concept'
import LessonNav from '../../components/LessonNav'

export default function Filesystem() {
  return (
    <div>
      <PageHeader title="Filesystem Hierarchy" subtitle="Struktura katalogow Linux — FHS" color="var(--c-yellow)" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        <Card title="Kluczowe pliki w /etc">
          <Row code="/etc/passwd">Lista uzytkownikow — login, UID, GID, shell</Row>
          <Row code="/etc/shadow">Hashe hasel (tylko root)</Row>
          <Row code="/etc/group">Definicje grup i ich czlonkowie</Row>
          <Row code="/etc/fstab">Montowanie systemow plikow przy starcie</Row>
          <Row code="/etc/hostname">Nazwa hosta</Row>
          <Row code="/etc/hosts">Lokalne mapowanie nazw DNS</Row>
          <Row code="/etc/resolv.conf">Konfiguracja DNS</Row>
          <Row code="/etc/sudoers">Konfiguracja sudo (edycja: visudo)</Row>
          <Row code="/etc/ssh/sshd_config">Konfiguracja serwera SSH</Row>
          <Row code="/etc/apt/sources.list">Repozytoria pakietow (Debian/Ubuntu)</Row>
        </Card>

        <Card title="Wirtualne systemy plikow" color="var(--c-purple)">
          <Concept title="/proc — procfs" color="var(--c-purple)">Informacje o procesach i jadrze. Nie istnieje fizycznie na dysku.</Concept>
          <ExampleBlock variant="purple">
            <Cmd>cat <H>/proc/cpuinfo</H> <span className="text-[var(--c-muted)]"># CPU</span></Cmd>
            <Cmd>cat <H>/proc/meminfo</H> <span className="text-[var(--c-muted)]"># pamiec</span></Cmd>
            <Cmd>cat <H>/proc/version</H> <span className="text-[var(--c-muted)]"># jadro</span></Cmd>
            <Cmd>ls <H>/proc/$$</H> <span className="text-[var(--c-muted)]"># info o biezacym procesie</span></Cmd>
          </ExampleBlock>
          <Concept title="/sys — sysfs" color="var(--c-green)">Urzadzenia, sterowniki, moduly jadra. Interfejs do konfiguracji hardware.</Concept>
          <Concept title="/dev — devtmpfs" color="var(--c-yellow)">Pliki urzadzen — "wszystko jest plikiem".</Concept>
          <ExampleBlock variant="yellow">
            <Cmd><H>/dev/sda</H> <span className="text-[var(--c-muted)]"># pierwszy dysk</span></Cmd>
            <Cmd><H>/dev/null</H> <span className="text-[var(--c-muted)]"># czarna dziura (odrzuca dane)</span></Cmd>
            <Cmd><H>/dev/zero</H> <span className="text-[var(--c-muted)]"># nieskonczone zera</span></Cmd>
            <Cmd><H>/dev/urandom</H> <span className="text-[var(--c-muted)]"># losowe dane</span></Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Przydatne komendy" color="var(--c-green)">
          <ExampleBlock variant="green"><Comment># Miejsce na dysku</Comment><Cmd>df <H>-h</H></Cmd></ExampleBlock>
          <ExampleBlock variant="green"><Comment># Rozmiar katalogow</Comment><Cmd>du <H>-sh</H> <F>/var/log/*</F></Cmd></ExampleBlock>
          <ExampleBlock><Comment># Zamontowane FS</Comment><Cmd>mount | column -t</Cmd></ExampleBlock>
          <ExampleBlock><Comment># Znajdz plik</Comment><Cmd>find <F>/etc</F> <H>-name</H> <V>"*.conf"</V></Cmd></ExampleBlock>
          <ExampleBlock><Comment># Typ pliku</Comment><Cmd>file <V>/bin/bash</V></Cmd></ExampleBlock>
          <ExampleBlock variant="purple"><Comment># Gdzie jest program</Comment><Cmd>which <V>nginx</V></Cmd><Cmd>whereis <V>nginx</V></Cmd></ExampleBlock>
          <ExampleBlock><Comment># Drzewo blokow (dyski, partycje, LVM)</Comment><Cmd>lsblk</Cmd></ExampleBlock>
        </Card>

        <Card title="LVM — Logical Volume Management" color="var(--c-orange)">
          <pre className="text-xs leading-7 bg-[#0d1117] border border-[var(--c-border)] rounded-md p-3 overflow-x-auto whitespace-pre mb-2.5">
{`Dysk fizyczny
  /dev/sdb1          → Physical Volume (PV)
    data_vg          → Volume Group (VG)
      data_lv        → Logical Volume (LV)
        /mnt/data    → Mount point`}
          </pre>
          <InfoBox><b>PV</b> = fizyczny dysk → <b>VG</b> = pula z PV → <b>LV</b> = wirtualna partycja</InfoBox>
          <SectionLabel className="mt-2.5">Tworzenie</SectionLabel>
          <ExampleBlock variant="orange"><Comment># 1. PV</Comment><Cmd>pvcreate <F>/dev/sdb1</F></Cmd></ExampleBlock>
          <ExampleBlock variant="purple"><Comment># 2. VG</Comment><Cmd>vgcreate <H>data_vg</H> <F>/dev/sdb1</F></Cmd></ExampleBlock>
          <ExampleBlock variant="green"><Comment># 3. LV</Comment><Cmd>lvcreate <H>-L 100G</H> <V>-n data_lv</V> <F>data_vg</F></Cmd></ExampleBlock>
          <ExampleBlock><Comment># 4. Format + mount</Comment><Cmd>mkfs.ext4 <F>/dev/data_vg/data_lv</F></Cmd><Cmd>mount <F>/dev/data_vg/data_lv</F> <V>/mnt/data</V></Cmd></ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Zarzadzanie</SectionLabel>
          <ExampleBlock><Cmd>lvextend <H>-L +50G</H> <F>/dev/data_vg/data_lv</F></Cmd><Cmd>resize2fs <F>/dev/data_vg/data_lv</F></Cmd></ExampleBlock>
          <ExampleBlock variant="yellow"><Comment># Snapshot</Comment><Cmd>lvcreate <H>-s</H> <V>-n snap01</V> -L 10G <F>/dev/data_vg/data_lv</F></Cmd></ExampleBlock>
          <SectionLabel className="mt-1.5">Podglad</SectionLabel>
          <ExampleBlock><Cmd>pvs <span className="text-[var(--c-muted)]"># lista PV</span></Cmd><Cmd>vgs <span className="text-[var(--c-muted)]"># lista VG</span></Cmd><Cmd>lvs <span className="text-[var(--c-muted)]"># lista LV</span></Cmd></ExampleBlock>
        </Card>

        <Card title="Pelna struktura" color="var(--c-yellow)" full>
          <pre className="text-[13px] leading-7 bg-[#0d1117] border border-[var(--c-border)] rounded-md p-4 overflow-x-auto whitespace-pre">
<span className="text-[var(--c-accent)] font-bold">/</span>                        <span className="text-[var(--c-muted)]">Root — poczatek calego systemu plikow</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /bin</span>                  <span className="text-[var(--c-muted)]">Podstawowe binaria (ls, cp, mv, cat, bash)</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /boot</span>                 <span className="text-[var(--c-muted)]">Jadro (vmlinuz), initramfs, GRUB bootloader</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /dev</span>                  <span className="text-[var(--c-muted)]">Pliki urzadzen (/dev/sda, /dev/null, /dev/tty)</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /etc</span>                  <span className="text-[var(--c-muted)]">Konfiguracja systemowa (passwd, fstab, nginx/)</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /home</span>                 <span className="text-[var(--c-muted)]">Katalogi domowe uzytkownikow (/home/serwin)</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /lib</span>                  <span className="text-[var(--c-muted)]">Biblioteki wspoldzielone (*.so) dla /bin i /sbin</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /media</span>                <span className="text-[var(--c-muted)]">Automatyczne montowanie (USB, CD-ROM)</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /mnt</span>                  <span className="text-[var(--c-muted)]">Reczne montowanie systemow plikow</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /opt</span>                  <span className="text-[var(--c-muted)]">Opcjonalne oprogramowanie (zewnetrzne paczki)</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /proc</span>                 <span className="text-[var(--c-muted)]">Wirtualny FS — info o procesach i jadrze</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /root</span>                 <span className="text-[var(--c-muted)]">Katalog domowy root</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /run</span>                  <span className="text-[var(--c-muted)]">Dane runtime (PID files, sockety) — tmpfs</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /sbin</span>                 <span className="text-[var(--c-muted)]">Binaria systemowe (fdisk, iptables, mount)</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /srv</span>                  <span className="text-[var(--c-muted)]">Dane serwisow (www, ftp)</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /sys</span>                  <span className="text-[var(--c-muted)]">Wirtualny FS — info o sprzecie</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /tmp</span>                  <span className="text-[var(--c-muted)]">Pliki tymczasowe (czyszczone przy restarcie)</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">├── /usr</span>                  <span className="text-[var(--c-muted)]">Programy uzytkownika, man pages, biblioteki</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">│   ├── /usr/bin</span>          <span className="text-[var(--c-muted)]">Wiekszosc programow</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">│   ├── /usr/lib</span>          <span className="text-[var(--c-muted)]">Biblioteki dla /usr/bin</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">│   ├── /usr/local</span>        <span className="text-[var(--c-muted)]">Oprogramowanie lokalne (make install)</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">│   └── /usr/share</span>        <span className="text-[var(--c-muted)]">Dane niezalezne od architektury</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">└── /var</span>                  <span className="text-[var(--c-muted)]">Dane zmienne (logi, bazy, cache, spools)</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">    ├── /var/log</span>          <span className="text-[var(--c-muted)]">Logi systemowe (syslog, auth.log, nginx/)</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">    ├── /var/cache</span>        <span className="text-[var(--c-muted)]">Cache pakietow (apt, yum)</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">    ├── /var/lib</span>          <span className="text-[var(--c-muted)]">Dane aplikacji (mysql, docker)</span>{'\n'}
<span className="text-[var(--c-accent)] font-bold">    └── /var/www</span>          <span className="text-[var(--c-muted)]">Domyslny root serwera www</span>
          </pre>
        </Card>

      </div>

      <LessonNav prev={{ to: '/cheatsheets/permissions', label: 'Permissions' }} next={{ to: '/cheatsheets/docker', label: 'Docker' }} />
    </div>
  )
}
