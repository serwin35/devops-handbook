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

export default function Homework09() {
  usePageTitle('Homework 09');

  return (
    <div>
      <PageHeader
        title="Homework 09 — Narzedzia Uniksa cz. 2"
        subtitle="Dyski, partycje, LVM, pliki, archiwa, siec, SSH, uzytkownicy"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Zadanie 1 */}
        <Card
          title="1. Zarzadzanie dyskami i partycjami"
          color="var(--c-green)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Wyswietl dyski i partycje, utworz nowa partycje za pomoca fdisk,
            sformatuj ja jako ext4, zamontuj i skonfiguruj automatyczne
            montowanie w /etc/fstab.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — identyfikacja dyskow</SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Wyswietl liste dyskow i partycji</Comment>
              <Cmd>
                sudo fdisk <H>-l</H>
              </Cmd>
              <Comment># Sprawdz zamontowane systemy plikow</Comment>
              <Cmd>
                df <H>-h</H>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — tworzenie partycji
            </SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Uruchom fdisk na wybranym dysku</Comment>
              <Cmd>
                sudo fdisk <F>/dev/sdb</F>
              </Cmd>
              <Comment># n → p → 1 → Enter → +5G → w</Comment>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — formatowanie i montowanie
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                sudo mkfs.ext4 <F>/dev/sdb1</F>
              </Cmd>
              <Cmd>
                sudo mkdir <H>-p</H> <F>/mnt/data</F>
              </Cmd>
              <Cmd>
                sudo mount <F>/dev/sdb1</F> <F>/mnt/data</F>
              </Cmd>
              <Cmd>
                df <H>-h</H> | grep <V>/mnt/data</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — automatyczne montowanie
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Dodaj wpis do /etc/fstab</Comment>
              <Cmd>
                sudo bash <H>-c</H>{' '}
                <V>
                  'echo "/dev/sdb1 /mnt/data ext4 defaults 0 2" {'>>'}{' '}
                  /etc/fstab'
                </V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Zweryfikuj poprawnosc</Comment>
              <Cmd>
                sudo umount <F>/mnt/data</F>
              </Cmd>
              <Cmd>
                sudo mount <H>-a</H>
              </Cmd>
              <Cmd>
                df <H>-h</H> | grep <V>/mnt/data</V>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Zawsze testuj wpis w fstab poleceniem{' '}
              <code className="text-xs">sudo mount -a</code> przed restartem.
              Blad w fstab moze uniemozliwic start systemu! Lepiej uzywac UUID
              zamiast <code className="text-xs">/dev/sdb1</code> — znajdziesz go
              poleceniem <code className="text-xs">blkid</code>.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 2 */}
        <Card
          title="2. Operacje na plikach i katalogach"
          color="var(--c-green)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Utworz strukture katalogow projektu, manipuluj plikami (cp, mv, rm),
            wyszukuj pliki (find, grep), utworz archiwa tar i dowiazania
            symboliczne/twarde.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — struktura katalogow</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                mkdir <H>-p</H>{' '}
                <F>
                  ~/projekt/{'{'}src,docs,tests,build{'}'}
                </F>
              </Cmd>
              <Cmd>
                find <F>~/projekt</F> <H>-type</H> <V>d</V> | sort
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — tworzenie i manipulacja plikami
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                echo <V>"To jest plik README"</V> {'>'}{' '}
                <F>~/projekt/README.md</F>
              </Cmd>
              <Cmd>
                echo <V>"Kod zrodlowy"</V> {'>'} <F>~/projekt/src/main.c</F>
              </Cmd>
              <Cmd>
                echo <V>"Dokumentacja"</V> {'>'}{' '}
                <F>~/projekt/docs/manual.txt</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Kopiowanie i przenoszenie</Comment>
              <Cmd>
                cp <F>~/projekt/README.md</F> <F>~/projekt/docs/</F>
              </Cmd>
              <Cmd>
                mv <F>~/projekt/docs/README.md</F>{' '}
                <F>~/projekt/docs/README_COPY.md</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — wyszukiwanie plikow
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                find <F>~/projekt</F> <H>-name</H> <V>"*.md"</V>
              </Cmd>
              <Cmd>
                grep <H>-r</H> <V>"Dokumentacja"</V> <F>~/projekt</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — archiwizacja i dowiazania
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Archiwum tar.gz</Comment>
              <Cmd>
                tar <H>-czvf</H> <F>~/projekt_backup.tar.gz</F> <F>~/projekt</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Rozpakowanie do innego katalogu</Comment>
              <Cmd>
                mkdir <F>~/rozpakowane</F>
              </Cmd>
              <Cmd>
                tar <H>-xzvf</H> <F>~/projekt_backup.tar.gz</F> <H>-C</H>{' '}
                <F>~/rozpakowane</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Dowiazanie symboliczne i twarde</Comment>
              <Cmd>
                ln <H>-s</H> <F>~/projekt/docs/manual.txt</F>{' '}
                <F>~/manual_link</F>
              </Cmd>
              <Cmd>
                ln <F>~/projekt/README.md</F> <F>~/readme_hardlink</F>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Dowiazanie symboliczne (symlink) to "skrot" — usuniesz oryginal,
              symlink stanie sie martwy. Dowiazanie twarde (hardlink) wskazuje
              na te same dane na dysku — plik istnieje dopoki istnieje choc
              jedno dowiazanie.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 3 */}
        <Card
          title="3. Konfiguracja i diagnostyka sieci"
          color="var(--c-green)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Sprawdz konfiguracje sieci (ip, route, DNS), przetestuj polaczenia
            (ping, traceroute), monitoruj porty (ss), skonfiguruj SSH i
            przeanalizuj problemy sieciowe.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — konfiguracja sieci</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>ip addr show</Cmd>
              <Cmd>ip route show</Cmd>
              <Cmd>
                cat <F>/etc/resolv.conf</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — testowanie polaczenia
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                ping <H>-c</H> <V>4</V> <V>8.8.8.8</V>
              </Cmd>
              <Cmd>
                ping <H>-c</H> <V>4</V> <V>www.google.com</V>
              </Cmd>
              <Cmd>
                traceroute <V>www.google.com</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — monitorowanie polaczen
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Aktywne polaczenia TCP</Comment>
              <Cmd>
                ss <H>-t</H> <H>-a</H>
              </Cmd>
              <Comment># Nasluchujace porty</Comment>
              <Cmd>
                sudo ss <H>-tuln</H>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — SSH i diagnostyka
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>sudo systemctl status sshd</Cmd>
              <Cmd>
                ssh-keygen <H>-t</H> <V>rsa</V> <H>-b</H> <V>4096</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Sprawdz dostepnosc uslugi na porcie</Comment>
              <Cmd>
                nc <H>-zv</H> <V>example.com</V> <V>80</V>
              </Cmd>
              <Comment># Sprawdz certyfikat SSL</Comment>
              <Cmd>
                openssl s_client <H>-connect</H> <V>example.com:443</V>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Typowa kolejnosc diagnostyki:{' '}
              <code className="text-xs">ping</code> (host odpowiada?) →{' '}
              <code className="text-xs">traceroute</code> (gdzie ginie ruch?) →{' '}
              <code className="text-xs">ss/netstat</code> (port nasluchuje?) →{' '}
              <code className="text-xs">dig/host</code> (DNS dziala?).
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 4 */}
        <Card
          title="4. Zarzadzanie uzytkownikami i uprawnieniami"
          color="var(--c-green)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Utworz grupy i uzytkownikow, skonfiguruj katalogi projektowe z
            odpowiednimi uprawnieniami (chmod, chown, SGID), skonfiguruj sudo i
            przetestuj separacje dostepow.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — uzytkownicy i grupy</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                sudo groupadd <V>developers</V>
              </Cmd>
              <Cmd>
                sudo groupadd <V>testers</V>
              </Cmd>
              <Cmd>
                sudo useradd <H>-m</H> <H>-s</H> <F>/bin/bash</F> <H>-c</H>{' '}
                <V>"Developer User"</V> <V>dev_user</V>
              </Cmd>
              <Cmd>
                sudo useradd <H>-m</H> <H>-s</H> <F>/bin/bash</F> <H>-c</H>{' '}
                <V>"Tester User"</V> <V>test_user</V>
              </Cmd>
              <Cmd>
                sudo passwd <V>dev_user</V>
              </Cmd>
              <Cmd>
                sudo passwd <V>test_user</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — katalogi z uprawnieniami
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                sudo mkdir <H>-p</H>{' '}
                <F>
                  /opt/project/{'{'}src,tests,docs,build{'}'}
                </F>
              </Cmd>
              <Cmd>
                sudo chown <H>-R</H> <V>root:developers</V> <F>/opt/project</F>
              </Cmd>
              <Cmd>
                sudo chmod <V>775</V> <F>/opt/project</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># src — tylko developers</Comment>
              <Cmd>
                sudo chmod <V>770</V> <F>/opt/project/src</F>
              </Cmd>
              <Comment># tests — tylko testers</Comment>
              <Cmd>
                sudo chown <H>-R</H> <V>root:testers</V>{' '}
                <F>/opt/project/tests</F>
              </Cmd>
              <Cmd>
                sudo chmod <V>770</V> <F>/opt/project/tests</F>
              </Cmd>
              <Comment># docs i build — wszyscy w projekcie</Comment>
              <Cmd>
                sudo chmod <V>775</V> <F>/opt/project/docs</F>
              </Cmd>
              <Cmd>
                sudo chmod <V>775</V> <F>/opt/project/build</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># SGID — nowe pliki dziedzicza grupe</Comment>
              <Cmd>
                sudo chmod <V>g+s</V> <F>/opt/project/src</F>
              </Cmd>
              <Cmd>
                sudo chmod <V>g+s</V> <F>/opt/project/tests</F>
              </Cmd>
              <Cmd>
                sudo chmod <V>g+s</V> <F>/opt/project/docs</F>
              </Cmd>
              <Cmd>
                sudo chmod <V>g+s</V> <F>/opt/project/build</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — konfiguracja sudo
            </SectionLabel>
            <ExampleBlock variant="default">
              <Comment># dev_user — pelne sudo</Comment>
              <Cmd>
                sudo usermod <H>-aG</H> <V>sudo</V> <V>dev_user</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># test_user — ograniczone sudo</Comment>
              <Cmd>
                sudo visudo <H>-f</H> <F>/etc/sudoers.d/test_user</F>
              </Cmd>
              <Comment>
                # test_user ALL=(ALL) NOPASSWD: /bin/systemctl restart httpd
              </Comment>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — testowanie uprawnien
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Jako dev_user</Comment>
              <Cmd>
                su - <V>dev_user</V>
              </Cmd>
              <Cmd>
                touch <F>/opt/project/src/test.c</F>
              </Cmd>
              <Comment># ^ powinno sie udac</Comment>
              <Cmd>
                touch <F>/opt/project/tests/test.py</F>
              </Cmd>
              <Comment># ^ powinno sie NIE udac</Comment>
              <Cmd> </Cmd>
              <Comment># Jako test_user</Comment>
              <Cmd>
                su - <V>test_user</V>
              </Cmd>
              <Cmd>
                touch <F>/opt/project/src/test2.c</F>
              </Cmd>
              <Comment># ^ powinno sie NIE udac</Comment>
              <Cmd>
                touch <F>/opt/project/tests/test2.py</F>
              </Cmd>
              <Comment># ^ powinno sie udac</Comment>
            </ExampleBlock>

            <InfoBox>
              Dodaj uzytkownikow do odpowiednich grup:{' '}
              <code className="text-xs">
                sudo usermod -aG developers dev_user
              </code>{' '}
              i{' '}
              <code className="text-xs">
                sudo usermod -aG testers test_user
              </code>
              . Bez tego nawet poprawne uprawnienia katalogu nie dadza dostepu.
            </InfoBox>
          </Spoiler>
        </Card>

        <Divider />

        {/* Zadanie domowe 1 */}
        <Card
          title="5. Kompresja, archiwizacja i backup"
          color="var(--c-purple)"
          full
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Stworz strukture testowa projektu, utworz archiwa w roznych
            formatach (tar, tar.gz, tar.bz2), porownaj rozmiary, oblicz checksum
            MD5, rozpakuj i zweryfikuj integralnosc danych.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Krok 1 — struktura testowa</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                mkdir <H>-p</H>{' '}
                <F>
                  ~/learning_project/{'{'}src,docs,config,data,logs{'}'}
                </F>
              </Cmd>
              <Cmd>
                echo <V>"Source code"</V> {'>'}{' '}
                <F>~/learning_project/src/main.sh</F>
              </Cmd>
              <Cmd>
                echo <V>"Documentation"</V> {'>'}{' '}
                <F>~/learning_project/docs/README.md</F>
              </Cmd>
              <Cmd>
                echo <V>"Config=value"</V> {'>'}{' '}
                <F>~/learning_project/config/settings.conf</F>
              </Cmd>
              <Cmd>
                dd <H>if=</H>
                <F>/dev/zero</F> <H>of=</H>
                <F>~/learning_project/data/sample.dat</F> <H>bs=</H>
                <V>1M</V> <H>count=</H>
                <V>20</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — sprawdz rozmiar oryginalny
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                du <H>-sh</H> <F>~/learning_project/</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — archiwa w roznych formatach
            </SectionLabel>
            <ExampleBlock variant="purple">
              <Comment># Tar bez kompresji</Comment>
              <Cmd>
                tar <H>-cvf</H> <F>~/backup_raw.tar</F>{' '}
                <F>~/learning_project/</F>
              </Cmd>
              <Cmd>
                ls <H>-lh</H> <F>~/backup_raw.tar</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Tar + gzip</Comment>
              <Cmd>
                tar <H>-czvf</H> <F>~/backup_gzip.tar.gz</F>{' '}
                <F>~/learning_project/</F>
              </Cmd>
              <Cmd>
                ls <H>-lh</H> <F>~/backup_gzip.tar.gz</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Tar + bzip2</Comment>
              <Cmd>
                tar <H>-cjvf</H> <F>~/backup_bzip2.tar.bz2</F>{' '}
                <F>~/learning_project/</F>
              </Cmd>
              <Cmd>
                ls <H>-lh</H> <F>~/backup_bzip2.tar.bz2</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — porownanie i checksum
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                ls <H>-lh</H> <F>~/backup_raw.tar</F>{' '}
                <F>~/backup_gzip.tar.gz</F> <F>~/backup_bzip2.tar.bz2</F>
              </Cmd>
              <Cmd>
                md5sum <F>~/backup_gzip.tar.gz</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 5 — rozpakowanie i weryfikacja
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                mkdir <H>-p</H> <F>~/restore</F>
              </Cmd>
              <Cmd>
                tar <H>-xzvf</H> <F>~/backup_gzip.tar.gz</F> <H>-C</H>{' '}
                <F>~/restore/</F>
              </Cmd>
              <Cmd>
                diff <H>-r</H> <F>~/learning_project/</F>{' '}
                <F>~/restore/root/learning_project/</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 6 — listowanie bez rozpakowywania
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                tar <H>-tzvf</H> <F>~/backup_gzip.tar.gz</F>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Oczekiwany wynik: bzip2 powinien byc najmniejszy, tar bez
              kompresji — najwiekszy. Po rozpakowaniu{' '}
              <code className="text-xs">diff -r</code> nie powinien wypisac
              zadnych roznic. Poziom zaawansowany: zaszyfruj archiwum{' '}
              <code className="text-xs">gpg -c ~/backup_gzip.tar.gz</code> lub
              uzyj rsync zamiast tar.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie domowe 2 */}
        <Card
          title="6. SSH — konfiguracja i bezpieczenstwo"
          color="var(--c-purple)"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Wygeneruj pare kluczy SSH, skonfiguruj dostep kluczem do serwera,
            utworz plik ~/.ssh/config, napisz dokumentacje SSH_SECURITY.md i
            przetestuj scenariusze bezpieczenstwa.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Krok 1 — generowanie kluczy</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                ssh-keygen <H>-t</H> <V>rsa</V> <H>-b</H> <V>4096</V> <H>-f</H>{' '}
                <F>~/.ssh/learning_key</F> <H>-C</H> <V>"learning@devops"</V>
              </Cmd>
              <Cmd>
                chmod <V>600</V> <F>~/.ssh/learning_key</F>
              </Cmd>
              <Cmd>
                chmod <V>644</V> <F>~/.ssh/learning_key.pub</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — konfiguracja dostepu
            </SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Skopiuj klucz na serwer</Comment>
              <Cmd>
                ssh-copy-id <H>-i</H> <F>~/.ssh/learning_key.pub</F>{' '}
                <V>user@remote_server</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — testowanie polaczenia
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                ssh <H>-i</H> <F>~/.ssh/learning_key</F> <H>-v</H>{' '}
                <V>user@remote_server</V>
              </Cmd>
              <Cmd>
                scp <H>-i</H> <F>~/.ssh/learning_key</F> <F>~/file.txt</F>{' '}
                <V>user@remote_server:/tmp/</V>
              </Cmd>
              <Cmd>
                sftp <H>-i</H> <F>~/.ssh/learning_key</F>{' '}
                <V>user@remote_server</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — SSH config file
            </SectionLabel>
            <ExampleBlock variant="purple">
              <Comment># ~/.ssh/config</Comment>
              <Cmd>
                Host <V>learning-server</V>
              </Cmd>
              <Cmd>
                {' '}
                HostName <V>192.168.x.x</V>
              </Cmd>
              <Cmd>
                {' '}
                User <V>dev</V>
              </Cmd>
              <Cmd>
                IdentityFile <F>~/.ssh/learning_key</F>
              </Cmd>
              <Cmd>
                {' '}
                Port <V>22</V>
              </Cmd>
              <Cmd>
                StrictHostKeyChecking <V>no</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 5 — cwiczenia bezpieczenstwa
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Zmien uprawnienia klucza i obserwuj blad</Comment>
              <Cmd>
                chmod <V>644</V> <F>~/.ssh/learning_key</F>
              </Cmd>
              <Cmd>
                ssh <H>-i</H> <F>~/.ssh/learning_key</F>{' '}
                <V>user@remote_server</V>
              </Cmd>
              <Comment># ^ "Permissions are too open" — napraw:</Comment>
              <Cmd>
                chmod <V>600</V> <F>~/.ssh/learning_key</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Analiza logow SSH</Comment>
              <Cmd>
                journalctl <H>-u</H> <V>ssh</V> <H>-n</H> <V>20</V>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Klucz prywatny musi miec uprawnienia{' '}
              <code className="text-xs">600</code> (tylko wlasciciel moze
              czytac). Poziom zaawansowany: skonfiguruj SSH tunneling{' '}
              <code className="text-xs">
                ssh -L 8080:localhost:80 user@server
              </code>{' '}
              i ServerAliveInterval w ~/.ssh/config.
            </InfoBox>
          </Spoiler>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/09', label: '09 — Narzedzia Uniksa cz. 2' }}
        next={{ to: '/homework/10', label: 'Homework 10' }}
      />
    </div>
  );
}
