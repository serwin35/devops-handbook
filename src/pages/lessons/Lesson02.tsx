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
import { Link } from 'react-router-dom';

export default function Lesson02() {
  return (
    <div>
      <PageHeader
        title="02 — Systemy operacyjne i Linux"
        subtitle="Unix · kernel · filesystem · LVM · dystrybucje · użytkownicy · UFW · Netplan"
        color="var(--c-purple)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Od Unix do Linux — historia" full>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Concept title="Unix (1969) — Bell Labs" color="var(--c-purple)">
              Ken Thompson + Dennis Ritchie. Zasady: modularność, prostota,
              tekstowe strumienie, <b>"wszystko jest plikiem"</b>.
            </Concept>
            <Concept
              title="Linux (1991) — Linus Torvalds"
              color="var(--c-green)"
            >
              Zainspirowany Minixem. Pierwsza wersja: ~10 239 linii kodu, tylko
              i386. Dzis (6.x): <b>33+ mln linii</b>.
            </Concept>
          </div>
        </Card>

        <Card title="System operacyjny — co robi?">
          <Row code="1">Zarządzanie zasobami sprzętowymi (CPU, RAM, dysk)</Row>
          <Row code="2">Interfejs uzytkownika (terminal, GUI)</Row>
          <Row code="3">Uruchamianie i zarządzanie procesami</Row>
          <Row code="4">Bezpieczeństwo i kontrola dostępu</Row>
          <Divider />
          <SectionLabel className="mt-2">Kluczowe komponenty</SectionLabel>
          <Concept title="Jadro (Kernel)">
            Centralny element OS. Działa w uprzywilejowanym trybie procesora.
            Planowanie procesów, zarządzanie pamiecią, system plików.
          </Concept>
          <Concept title="Biblioteki systemowe">
            API: fork(), open(), read(), write(). Interfejs między aplikacjami a
            jądrem.
          </Concept>
          <Concept title="Narzedzia systemowe">
            ps, top, free, df, du — podstawowe narzędzia do monitorowania i
            zarządzania.
          </Concept>
        </Card>

        <Card title="Kernel space vs User space" color="var(--c-yellow)">
          <Concept title="Przestrzen jadra" color="var(--c-orange)">
            Pełny dostęp do sprzętu. Operacje uprzywilejowane.
          </Concept>
          <Concept title="Przestrzen uzytkownika" color="var(--c-green)">
            Ograniczony dostęp. Izolacja procesów. Tu działaja aplikacje.
          </Concept>
          <Divider />
          <SectionLabel className="mt-2">
            Wywolania systemowe (syscalls)
          </SectionLabel>
          <p className="text-[var(--c-muted)] text-[11px] mb-2">
            Kontrolowany interfejs między user space a kernel:
          </p>
          <Row code="fork, exec, exit" codeVariant="green">
            Zarządzanie procesami
          </Row>
          <Row code="open, read, write" codeVariant="yellow">
            Operacje na plikach
          </Row>
          <Row code="socket, connect, bind" codeVariant="purple">
            Komunikacja sieciowa
          </Row>
          <Row code="mmap, brk" codeVariant="orange">
            Zarządzanie pamięcią
          </Row>
        </Card>

        <Card title="Dystrybucje Linuxa" color="var(--c-green)">
          <SectionLabel>Rodzina Debian</SectionLabel>
          <Row code="Debian">
            Stabilność, długie cykle wsparcia, wolne oprogramowanie
          </Row>
          <Row code="Ubuntu">
            Regularne aktualizacje, szerokie wsparcie, duża spoleczność
          </Row>
          <Row code="Linux Mint">
            Dla końcowego użytkownika, zgodny z Ubuntu
          </Row>
          <Divider />
          <SectionLabel className="mt-2">Rodzina Red Hat</SectionLabel>
          <Row code="RHEL" codeVariant="orange">
            Standard korporacyjny
          </Row>
          <Row code="Fedora" codeVariant="orange">
            Innowacyjność, najnowsze tech, platforma testowa dla RHEL
          </Row>
          <Row code="CentOS / Rocky" codeVariant="orange">
            Darmowa alternatywa dla RHEL, popularna na serwerach
          </Row>
          <InfoBox>
            Debian/Ubuntu: <code className="text-[var(--c-accent)]">apt</code> ·
            Red Hat/Fedora: <code className="text-[var(--c-orange)]">dnf</code>{' '}
            / <code className="text-[var(--c-orange)]">yum</code>
          </InfoBox>
        </Card>

        <Card title="System plikow — hierarchia" color="var(--c-yellow)">
          <pre className="text-xs leading-7 bg-[#0d1117] border border-[var(--c-border)] rounded-md p-3 overflow-x-auto whitespace-pre">
            {`/                  Root
├── /bin           Podstawowe binaria
├── /etc           Konfiguracja systemowa
├── /home          Katalogi domowe
├── /proc          Wirtualny FS procesow
├── /tmp           Pliki tymczasowe
├── /usr           Programy uzytkownika
└── /var           Dane zmienne (logi, bazy)`}
          </pre>
          <div className="text-center mt-2">
            <Link
              to="/cheatsheets/filesystem"
              className="text-[11px] text-[var(--c-accent)] hover:text-[var(--c-green)]"
            >
              Pelny cheatsheet &rarr;
            </Link>
          </div>
        </Card>

        <Card title="LVM — Logical Volume Management" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Elastyczna warstwa abstrakcji nad fizycznymi dyskami. Pozwala
            dynamicznie zmieniac rozmiar, laczyc dyski, tworzyc snapshoty.
          </p>
          <Row code="PV" codeVariant="orange">
            <b>Physical Volume</b> — fizyczny dysk/partycja
          </Row>
          <Row code="VG" codeVariant="purple">
            <b>Volume Group</b> — pula z PV
          </Row>
          <Row code="LV" codeVariant="green">
            <b>Logical Volume</b> — wirtualna partycja z VG
          </Row>
          <Divider />
          <ExampleBlock variant="orange">
            <Comment># PV</Comment>
            <Cmd>
              pvcreate <F>/dev/sdb1</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># VG</Comment>
            <Cmd>
              vgcreate <H>data_vg</H> <F>/dev/sdb1</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># LV</Comment>
            <Cmd>
              lvcreate <H>-L 100G</H> <V>-n data_lv</V> <F>data_vg</F>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Zalety: dynamiczna zmiana rozmiaru, laczenie dyskow, snapshoty,
            migracja danych online
          </InfoBox>
        </Card>

        <Card title="Uzytkownicy, grupy, uprawnienia">
          <ExampleBlock>
            <Comment># Utworz uzytkownika</Comment>
            <Cmd>
              sudo useradd <H>-m -s /bin/bash</H> <V>developer</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Grupa + dodaj usera</Comment>
            <Cmd>
              sudo groupadd <H>developers</H>
            </Cmd>
            <Cmd>
              sudo usermod <H>-aG</H> <V>developers</V> <F>developer</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="755" codeVariant="yellow">
            rwxr-xr-x — pliki wykonywalne, katalogi
          </Row>
          <Row code="644" codeVariant="yellow">
            rw-r--r-- — zwykle pliki
          </Row>
          <Row code="600" codeVariant="yellow">
            rw------- — klucze SSH
          </Row>
          <div className="text-center mt-2.5">
            <Link
              to="/cheatsheets/permissions"
              className="text-[11px] text-[var(--c-accent)] hover:text-[var(--c-green)]"
            >
              Pelny cheatsheet &rarr;
            </Link>
          </div>
        </Card>

        <Card title="Monitorowanie systemu" color="var(--c-green)">
          <SectionLabel>Procesy</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              top <H>-b -n 1</H>{' '}
              <span className="text-[var(--c-muted)]">
                # jednokrotny snapshot procesow
              </span>
            </Cmd>
            <Cmd>
              htop{' '}
              <span className="text-[var(--c-muted)]">
                # interaktywny monitor (kolorowy, mysz, sortowanie)
              </span>
            </Cmd>
            <Cmd>
              ps aux {' | '} grep <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-[var(--c-green)] text-xs">htop</code> — lepszy
            top. Instalacja:{' '}
            <code className="text-xs">sudo apt install htop</code>. Kolorowe
            drzewo procesow, filtrowanie, kill bezposrednio z UI.
          </InfoBox>
          <SectionLabel className="mt-2.5">Pamiec</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              free <H>-h</H>
            </Cmd>
            <Cmd>
              vmstat <V>1</V>{' '}
              <span className="text-[var(--c-muted)]"># co 1 sekunde</span>
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2.5">Dysk i siec</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              df <H>-h</H>{' '}
              <span className="text-[var(--c-muted)]"># miejsce na dysku</span>
            </Cmd>
            <Cmd>
              du <H>-sh</H> <F>/*</F>{' '}
              <span className="text-[var(--c-muted)]"># rozmiar katalogow</span>
            </Cmd>
            <Cmd>
              netstat <H>-tuln</H>{' '}
              <span className="text-[var(--c-muted)]"># otwarte porty</span>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="UFW — firewall" color="var(--c-orange)">
          <SectionLabel>Wlaczanie / wylaczanie</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>
              sudo ufw <H>enable</H>{' '}
              <span className="text-[var(--c-muted)]"># wlacz firewall</span>
            </Cmd>
            <Cmd>
              sudo ufw <H>disable</H>{' '}
              <span className="text-[var(--c-muted)]"># wylacz firewall</span>
            </Cmd>
            <Cmd>
              sudo ufw <H>status</H>{' '}
              <span className="text-[var(--c-muted)]"># aktualny stan</span>
            </Cmd>
            <Cmd>
              sudo ufw <H>status numbered</H>{' '}
              <span className="text-[var(--c-muted)]">
                # z numerami regul (ID)
              </span>
            </Cmd>
            <Cmd>
              sudo ufw <H>status verbose</H>{' '}
              <span className="text-[var(--c-muted)]"># szczegolowy</span>
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">Dodawanie regul (allow)</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Zezwol na port</Comment>
            <Cmd>
              sudo ufw allow <H>80</H>{' '}
              <span className="text-[var(--c-muted)]"># HTTP</span>
            </Cmd>
            <Cmd>
              sudo ufw allow <H>443</H>{' '}
              <span className="text-[var(--c-muted)]"># HTTPS</span>
            </Cmd>
            <Cmd>
              sudo ufw allow <H>22</H>{' '}
              <span className="text-[var(--c-muted)]"># SSH</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Po nazwie serwisu</Comment>
            <Cmd>
              sudo ufw allow <H>ssh</H>
            </Cmd>
            <Cmd>
              sudo ufw allow <H>'Nginx Full'</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Konkretny protokol</Comment>
            <Cmd>
              sudo ufw allow <H>80/tcp</H>
            </Cmd>
            <Cmd>
              sudo ufw allow <H>53/udp</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Zakres portow</Comment>
            <Cmd>
              sudo ufw allow <H>8000:8100/tcp</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Z konkretnego IP</Comment>
            <Cmd>
              sudo ufw allow from <V>192.168.1.100</V>
            </Cmd>
            <Cmd>
              sudo ufw allow from <V>192.168.1.0/24</V> to any port <H>22</H>
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">Blokowanie (deny)</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>
              sudo ufw deny <V>3306</V>{' '}
              <span className="text-[var(--c-muted)]"># zablokuj MySQL</span>
            </Cmd>
            <Cmd>
              sudo ufw deny from <V>10.0.0.50</V>
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">Usuwanie regul</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>
              sudo ufw delete <V>3</V>{' '}
              <span className="text-[var(--c-muted)]"># usun regule nr 3</span>
            </Cmd>
            <Cmd>
              sudo ufw delete allow <V>80</V>
            </Cmd>
            <Cmd>
              sudo ufw delete deny <V>3306</V>
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">Reset i domyslne</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>
              sudo ufw <H>reset</H>{' '}
              <span className="text-[var(--c-muted)]">
                # usun wszystkie reguly
              </span>
            </Cmd>
            <Cmd>
              sudo ufw default <H>deny incoming</H>
            </Cmd>
            <Cmd>
              sudo ufw default <H>allow outgoing</H>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Typowy setup: default deny incoming + default allow outgoing + allow
            tylko potrzebne porty (22, 80, 443)
          </InfoBox>
        </Card>

        <Card title="Netplan — konfiguracja sieci" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Cmd>
              sudo netplan <H>apply</H>{' '}
              <span className="text-[var(--c-muted)]">
                # zastosuj konfiguracje
              </span>
            </Cmd>
            <Cmd>
              sudo netplan <H>try</H>{' '}
              <span className="text-[var(--c-muted)]">
                # testuj (rollback po 120s)
              </span>
            </Cmd>
            <Cmd>
              sudo netplan <H>get</H>{' '}
              <span className="text-[var(--c-muted)]">
                # podglad konfiguracji
              </span>
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2.5">
            DHCP — /etc/netplan/*.yaml
          </SectionLabel>
          <ExampleBlock>
            <Cmd>
              <H>network:</H>
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;<V>ethernets:</V>
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;<F>eth0:</F>
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dhcp4: <H>true</H>
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2.5">Statyczne IP</SectionLabel>
          <ExampleBlock>
            <Cmd>
              <H>network:</H>
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;<V>ethernets:</V>
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;<F>eth0:</F>
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addresses: [
              <H>192.168.1.10/24</H>]
            </Cmd>
            <Cmd>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;routes:</Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- to:{' '}
              <V>default</V>
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;via:{' '}
              <V>192.168.1.1</V>
            </Cmd>
            <Cmd>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nameservers:</Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addresses: [
              <V>8.8.8.8, 1.1.1.1</V>]
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Niezbedne narzedzia" color="var(--c-yellow)">
          <ExampleBlock>
            <Comment># Kompilatory i naglowki</Comment>
            <Cmd>
              sudo apt install <H>build-essential</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Kontrola wersji</Comment>
            <Cmd>
              sudo apt install <H>git</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Pobieranie plikow</Comment>
            <Cmd>
              sudo apt install <H>curl wget</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Edytory tekstu</Comment>
            <Cmd>
              sudo apt install <H>vim nano</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Narzedzia sieciowe</Comment>
            <Cmd>
              sudo apt install <H>net-tools htop tree</H>
            </Cmd>
          </ExampleBlock>
        </Card>
      </div>

      <p className="text-[var(--c-muted)] text-[11px] mt-6 px-1">
        Metody instalacji Linux: <b>WSL</b> (Windows) · <b>VirtualBox</b> /
        VMware · <b>Dual boot</b> · <b>Cloud VM</b> (AWS, Azure, DigitalOcean)
      </p>

      <LessonNav
        prev={{ to: '/lessons/01', label: '01 — Intro DevOps' }}
        next={{ to: '/lessons/03', label: '03 — Docker w praktyce' }}
      />
    </div>
  );
}
