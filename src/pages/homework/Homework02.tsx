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

export default function Homework02() {
  usePageTitle('Homework 02');

  return (
    <div>
      <PageHeader
        title="Homework 02 — Praktyka pracy z systemem"
        subtitle="Instalacja Linux · LVM · zarzadzanie uzytkownikami"
        color="var(--c-purple)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* ===== ZADANIE 1: Instalacja i konfiguracja ===== */}

        <Card title="1.1 Instalacja Linuxa" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Zainstaluj system Linux wybierajac jedna z metod: WSL (Windows),
            VirtualBox lub dual boot.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Opcja A — WSL (Windows)</SectionLabel>
            <ExampleBlock variant="green">
              <Comment># W PowerShell jako administrator</Comment>
              <Cmd>
                wsl <H>--install</H>
              </Cmd>
              <Comment># Domyslnie instaluje Ubuntu</Comment>
            </ExampleBlock>
            <SectionLabel className="mt-2">Opcja B — VirtualBox</SectionLabel>
            <ExampleBlock variant="green">
              <Comment># 1. Pobierz VirtualBox z virtualbox.org</Comment>
              <Comment># 2. Pobierz ISO Ubuntu z ubuntu.com</Comment>
              <Comment># 3. Stwórz nowa maszyne wirtualna:</Comment>
              <Comment># - RAM: min. 2 GB</Comment>
              <Comment># - Dysk: min. 20 GB</Comment>
              <Comment># 4. Zamontuj ISO i zainstaluj</Comment>
            </ExampleBlock>
            <InfoBox>
              WSL to najszybsza opcja dla uzytkownikow Windows — nie wymaga
              restartu ani osobnej partycji. VirtualBox daje pelne doswiadczenie
              Linux.
            </InfoBox>
          </Spoiler>
        </Card>

        <Card title="1.2 Aktualizacja systemu" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Zaktualizuj system i zainstaluj podstawowe narzedzia.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Krok 1 — aktualizacja</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                sudo apt <H>update</H>
              </Cmd>
              <Cmd>
                sudo apt <H>upgrade</H> -y
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 2 — instalacja narzedzi
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                sudo apt install <V>build-essential git curl wget</V>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              <code className="text-xs">update</code> = aktualizuje liste
              pakietów, <code className="text-xs">upgrade</code> = aktualizuje
              zainstalowane pakiety.
            </InfoBox>
          </Spoiler>
        </Card>

        <Card
          title="1.3 Konfiguracja sieci i bezpieczenstwa"
          color="var(--c-green)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Skonfiguruj siec i podstawowe zabezpieczenia systemu.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Krok 1 — konfiguracja sieci</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                sudo netplan <H>apply</H>
              </Cmd>
              <Comment># Lub sprawdz biezaca konfiguracje:</Comment>
              <Cmd>
                ip <H>addr</H> show
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 2 — firewall</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                sudo ufw <H>enable</H>
              </Cmd>
              <Cmd>
                sudo ufw allow <V>ssh</V>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 3 — weryfikacja</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                sudo ufw <H>status</H>
              </Cmd>
            </ExampleBlock>
            <InfoBox warn>
              Zawsze dodaj regule SSH <b>przed</b> wlaczeniem UFW na zdalnym
              serwerze, inaczej mozesz sie zablokowac!
            </InfoBox>
          </Spoiler>
        </Card>

        <Divider />

        {/* ===== ZADANIE 2: Praca z LVM ===== */}

        <Card title="2.1 Tworzenie woluminu fizycznego" color="var(--c-yellow)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,209,102,0.15)] text-[var(--c-yellow)] font-bold">
              LVM
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Utwórz wolumin fizyczny (PV) na dostepnym dysku lub partycji.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Krok 1 — sprawdz dyski</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                <H>lsblk</H>
              </Cmd>
              <Comment># Znajdz dostepny dysk, np. /dev/sdb1</Comment>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 2 — stwórz Physical Volume
            </SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                sudo <H>pvcreate</H> <F>/dev/sdb1</F>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 3 — zweryfikuj</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                sudo <H>pvs</H>
              </Cmd>
              <Cmd>
                sudo pvdisplay <F>/dev/sdb1</F>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              Physical Volume (PV) to warstwa abstrakcji LVM nad fizycznym
              dyskiem. Komenda <code className="text-xs">pvs</code> wyswietla
              skrót, <code className="text-xs">pvdisplay</code> — szczególy.
            </InfoBox>
          </Spoiler>
        </Card>

        <Card title="2.2 Grupa woluminów (VG)" color="var(--c-yellow)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,209,102,0.15)] text-[var(--c-yellow)] font-bold">
              LVM
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Stwórz grupe woluminów (VG) i dodaj do niej wolumin fizyczny.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Krok 1 — stwórz Volume Group</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                sudo <H>vgcreate</H> <V>data_vg</V> <F>/dev/sdb1</F>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 2 — zweryfikuj</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                sudo <H>vgs</H>
              </Cmd>
              <Cmd>
                sudo vgdisplay <V>data_vg</V>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              Volume Group laczy jeden lub wiecej PV w pule miejsca. Mozna
              pozniej dynamicznie dodawac nowe dyski:{' '}
              <code className="text-xs">vgextend data_vg /dev/sdc1</code>.
            </InfoBox>
          </Spoiler>
        </Card>

        <Card title="2.3 Wolumin logiczny (LV)" color="var(--c-yellow)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,209,102,0.15)] text-[var(--c-yellow)] font-bold">
              LVM
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Utwórz wolumin logiczny, sformatuj go i zamontuj.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Krok 1 — stwórz Logical Volume</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                sudo <H>lvcreate</H> -L <V>100G</V> -n <V>data_lv</V>{' '}
                <F>data_vg</F>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 2 — sformatuj</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                sudo <H>mkfs.ext4</H> <F>/dev/data_vg/data_lv</F>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 3 — zamontuj</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                sudo mkdir <F>/mnt/data</F>
              </Cmd>
              <Cmd>
                sudo <H>mount</H> <F>/dev/data_vg/data_lv</F> <F>/mnt/data</F>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 4 — zweryfikuj</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                df <H>-h</H> <F>/mnt/data</F>
              </Cmd>
              <Cmd>
                sudo <H>lvs</H>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              Aby montowanie bylo trwale (po restarcie), dodaj wpis do{' '}
              <code className="text-xs">/etc/fstab</code>. Zaleta LVM: rozmiar
              LV mozna zmienic w locie komenda{' '}
              <code className="text-xs">lvresize</code>.
            </InfoBox>
          </Spoiler>
        </Card>

        <Divider />

        {/* ===== ZADANIE 3: Zarzadzanie uzytkownikami ===== */}

        <Card title="3.1 Tworzenie uzytkowników" color="var(--c-orange)" full>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,107,53,0.15)] text-[var(--c-orange)] font-bold">
              UZYTKOWNICY
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Utwórz kilku uzytkowników z katalogami domowymi i powloka bash.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <SectionLabel>Krok 1 — stwórz uzytkowników</SectionLabel>
                <ExampleBlock variant="orange">
                  <Cmd>
                    sudo useradd <H>-m -s /bin/bash</H> <V>developer</V>
                  </Cmd>
                  <Cmd>
                    sudo useradd <H>-m -s /bin/bash</H> <V>tester</V>
                  </Cmd>
                  <Cmd>
                    sudo useradd <H>-m -s /bin/bash</H> <V>devops</V>
                  </Cmd>
                </ExampleBlock>
                <SectionLabel className="mt-2">
                  Krok 2 — ustaw hasla
                </SectionLabel>
                <ExampleBlock variant="orange">
                  <Cmd>
                    sudo passwd <V>developer</V>
                  </Cmd>
                  <Cmd>
                    sudo passwd <V>tester</V>
                  </Cmd>
                  <Cmd>
                    sudo passwd <V>devops</V>
                  </Cmd>
                </ExampleBlock>
              </div>
              <div>
                <SectionLabel>Krok 3 — zweryfikuj</SectionLabel>
                <ExampleBlock variant="orange">
                  <Cmd>
                    id <V>developer</V>
                  </Cmd>
                  <Cmd>
                    id <V>tester</V>
                  </Cmd>
                  <Cmd>
                    id <V>devops</V>
                  </Cmd>
                </ExampleBlock>
                <SectionLabel className="mt-2">
                  Krok 4 — sprawdz /etc/passwd
                </SectionLabel>
                <ExampleBlock variant="orange">
                  <Cmd>
                    grep -E <V>"developer|tester|devops"</V> <F>/etc/passwd</F>
                  </Cmd>
                </ExampleBlock>
              </div>
            </div>
            <InfoBox>
              <code className="text-xs">-m</code> = utwórz katalog domowy,{' '}
              <code className="text-xs">-s</code> = ustaw domyslna powloke.
              Kazdy uzytkownik dostaje wpis w{' '}
              <code className="text-xs">/etc/passwd</code> i{' '}
              <code className="text-xs">/etc/shadow</code> (hasla).
            </InfoBox>
          </Spoiler>
        </Card>

        <Card
          title="3.2 Konfiguracja grup i praw dostepu"
          color="var(--c-orange)"
          full
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,107,53,0.15)] text-[var(--c-orange)] font-bold">
              UZYTKOWNICY
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Stwórz grupe <code>developers</code>, dodaj uzytkowników i
            skonfiguruj prawa dostepu.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <SectionLabel>Krok 1 — stwórz grupe</SectionLabel>
                <ExampleBlock variant="orange">
                  <Cmd>
                    sudo <H>groupadd</H> <V>developers</V>
                  </Cmd>
                </ExampleBlock>
                <SectionLabel className="mt-2">
                  Krok 2 — dodaj uzytkowników do grupy
                </SectionLabel>
                <ExampleBlock variant="orange">
                  <Cmd>
                    sudo usermod <H>-aG</H> <V>developers</V> developer
                  </Cmd>
                  <Cmd>
                    sudo usermod <H>-aG</H> <V>developers</V> tester
                  </Cmd>
                  <Cmd>
                    sudo usermod <H>-aG</H> <V>developers</V> devops
                  </Cmd>
                </ExampleBlock>
              </div>
              <div>
                <SectionLabel>Krok 3 — zweryfikuj</SectionLabel>
                <ExampleBlock variant="orange">
                  <Cmd>
                    getent group <V>developers</V>
                  </Cmd>
                  <Comment># developers:x:1004:developer,tester,devops</Comment>
                </ExampleBlock>
                <SectionLabel className="mt-2">
                  Krok 4 — sprawdz grupy uzytkownika
                </SectionLabel>
                <ExampleBlock variant="orange">
                  <Cmd>
                    groups <V>developer</V>
                  </Cmd>
                </ExampleBlock>
              </div>
            </div>
            <InfoBox>
              <code className="text-xs">-aG</code> = <b>append</b> to groups —
              nie nadpisuje istniejacych grup! Bez{' '}
              <code className="text-xs">-a</code> uzytkownik zostanie usuniety
              ze wszystkich pozostalych grup.
            </InfoBox>
          </Spoiler>
        </Card>

        <Card
          title="3.3 Wspólny katalog dla grupy"
          color="var(--c-orange)"
          full
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,107,53,0.15)] text-[var(--c-orange)] font-bold">
              UZYTKOWNICY
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Zorganizuj wspólny katalog projektowy dla grupy{' '}
            <code>developers</code> z odpowiednimi uprawnieniami.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <SectionLabel>Krok 1 — stwórz katalog</SectionLabel>
                <ExampleBlock variant="orange">
                  <Cmd>
                    sudo mkdir -p <F>/opt/projects</F>
                  </Cmd>
                </ExampleBlock>
                <SectionLabel className="mt-2">
                  Krok 2 — ustaw wlasciciela grupy
                </SectionLabel>
                <ExampleBlock variant="orange">
                  <Cmd>
                    sudo chown <H>:developers</H> <F>/opt/projects</F>
                  </Cmd>
                </ExampleBlock>
                <SectionLabel className="mt-2">
                  Krok 3 — ustaw uprawnienia
                </SectionLabel>
                <ExampleBlock variant="orange">
                  <Comment># rwxrwx--- (owner + grupa = pelny dostep)</Comment>
                  <Cmd>
                    sudo chmod <H>770</H> <F>/opt/projects</F>
                  </Cmd>
                </ExampleBlock>
              </div>
              <div>
                <SectionLabel>Krok 4 — ustaw SGID</SectionLabel>
                <ExampleBlock variant="orange">
                  <Comment>
                    # SGID = nowe pliki dziedzicza grupe katalogu
                  </Comment>
                  <Cmd>
                    sudo chmod <H>g+s</H> <F>/opt/projects</F>
                  </Cmd>
                </ExampleBlock>
                <SectionLabel className="mt-2">
                  Krok 5 — zweryfikuj
                </SectionLabel>
                <ExampleBlock variant="green">
                  <Cmd>
                    ls -ld <F>/opt/projects</F>
                  </Cmd>
                  <Comment># drwxrws--- ... developers /opt/projects</Comment>
                </ExampleBlock>
                <SectionLabel className="mt-2">
                  Krok 6 — przetestuj
                </SectionLabel>
                <ExampleBlock variant="green">
                  <Cmd>su - developer</Cmd>
                  <Cmd>
                    touch <F>/opt/projects/test.txt</F>
                  </Cmd>
                  <Cmd>
                    ls -l <F>/opt/projects/test.txt</F>
                  </Cmd>
                  <Comment># Plik powinien nalezec do grupy developers</Comment>
                </ExampleBlock>
              </div>
            </div>
            <InfoBox>
              Bit <b>SGID</b> (<code className="text-xs">g+s</code>) na katalogu
              sprawia, ze nowe pliki automatycznie dziedzicza grupe katalogu
              zamiast glównej grupy uzytkownika. To kluczowe dla wspólpracy
              zespolowej!
            </InfoBox>
          </Spoiler>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/02', label: '02 — Systemy operacyjne' }}
      />
    </div>
  );
}
