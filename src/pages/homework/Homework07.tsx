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

export default function Homework07() {
  usePageTitle('Homework 07');

  return (
    <div>
      <PageHeader
        title="Homework 07 — Wirtualizacja"
        subtitle="VirtualBox CLI, snapshoty, migracja, VM vs Docker"
        color="var(--c-orange)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Zadanie 1 */}
        <Card title='1. "Wirtualny zoo"' color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Stworz 3 maszyny wirtualne z roznymi systemami operacyjnymi: Windows
            10, Ubuntu Server, FreeBSD. Skonfiguruj siec miedzy VM-ami, folder
            wspoldzielony, snapshoty i przeprowadz testy wydajnosci.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — tworzenie VM (Ubuntu)</SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Utworz i zarejestruj nowa VM:</Comment>
              <Cmd>
                VBoxManage createvm <H>--name</H> <V>"Ubuntu"</V>{' '}
                <H>--ostype</H> <V>Ubuntu_64</V> <H>--register</H>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — konfiguracja zasobow
            </SectionLabel>
            <ExampleBlock variant="default">
              <Comment># RAM i CPU:</Comment>
              <Cmd>
                VBoxManage modifyvm <V>"Ubuntu"</V> <H>--memory</H> <V>2048</V>{' '}
                <H>--cpus</H> <V>2</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Krok 3 — dysk twardy</SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Utworz dysk 20 GB:</Comment>
              <Cmd>
                VBoxManage createhd <H>--filename</H> <F>Ubuntu.vdi</F>{' '}
                <H>--size</H> <V>20480</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Dodaj kontroler SATA:</Comment>
              <Cmd>
                VBoxManage storagectl <V>"Ubuntu"</V> <H>--name</H>{' '}
                <V>"SATA"</V> <H>--add</H> <V>sata</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Podlacz dysk:</Comment>
              <Cmd>
                VBoxManage storageattach <V>"Ubuntu"</V> <H>--storagectl</H>{' '}
                <V>"SATA"</V> <H>--port</H> <V>0</V> <H>--type</H> <V>hdd</V>{' '}
                <H>--medium</H> <F>Ubuntu.vdi</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — konfiguracja sieci
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># NIC1: NAT (dostep do internetu)</Comment>
              <Comment># NIC2: Host-only (komunikacja miedzy VM)</Comment>
              <Cmd>
                VBoxManage modifyvm <V>"Ubuntu"</V> <H>--nic1</H> <V>nat</V>{' '}
                <H>--nic2</H> <V>hostonly</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 5 — folder wspoldzielony
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                VBoxManage sharedfolder add <V>"Ubuntu"</V> <H>--name</H>{' '}
                <V>"shared"</V> <H>--hostpath</H> <F>"/path/to/shared"</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Krok 6 — snapshot</SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Zapisz stan po czystej instalacji:</Comment>
              <Cmd>
                VBoxManage snapshot <V>"Ubuntu"</V> take <V>"clean-install"</V>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Powtorz te kroki dla kazdej VM (Windows 10, FreeBSD), zmieniajac{' '}
              <code className="text-xs">--ostype</code> odpowiednio na{' '}
              <code className="text-xs">Windows10_64</code> i{' '}
              <code className="text-xs">FreeBSD_64</code>. Siec host-only
              pozwala VM-om komunikowac sie miedzy soba bez dostepu z zewnatrz.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 2 */}
        <Card
          title='2. "Migracja fizycznego serwera do VM"'
          color="var(--c-orange)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Wybierz fizyczny serwer lub komputer, stworz jego wirtualny klon,
            skonfiguruj wszystkie uslugi i przetestuj dzialanie.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — klon dysku</SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Skopiuj caly dysk do obrazu:</Comment>
              <Cmd>
                dd <H>if=</H>
                <F>/dev/sda</F> <H>of=</H>
                <F>disk.img</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — konwersja do formatu VDI
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                VBoxManage convertfromraw <F>disk.img</F> <F>disk.vdi</F>{' '}
                <H>--format</H> <V>VDI</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — alternatywa: automatyczna migracja P2V
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Uzyj virt-v2v do automatycznej migracji:</Comment>
              <Cmd>
                virt-v2v <H>-i</H> <V>disk</V> <F>disk.img</F> <H>-o</H>{' '}
                <V>local</V> <H>-os</H> <F>/output/dir</F>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              <code className="text-xs">dd</code> tworzy dokladna kopie
              bit-po-bicie calego dysku.{' '}
              <code className="text-xs">VBoxManage convertfromraw</code>{' '}
              konwertuje surowy obraz do formatu VDI (VirtualBox Disk Image).{' '}
              <code className="text-xs">virt-v2v</code> to narzedzie
              automatyzujace caly proces migracji P2V (Physical-to-Virtual),
              wlacznie z dostosowaniem sterownikow.
            </InfoBox>
          </Spoiler>
        </Card>

        <Divider />

        {/* Zadanie 3 — Challenge: Automatyzacja */}
        <Card
          title="3. Automatyzacja VirtualBox CLI"
          color="var(--c-purple)"
          full
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz skrypt bash, ktory tworzy VM od zera za pomoca komend
            VBoxManage — tworzenie, konfiguracja RAM/CPU/dysku/sieci,
            podlaczenie ISO, uruchomienie.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Skrypt: create-vm.sh</SectionLabel>
            <ExampleBlock variant="purple">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Comment># create-vm.sh — Automatyczne tworzenie VM</Comment>
              <Comment># Uzycie: ./create-vm.sh VM_NAME ISO_PATH</Comment>
              <Cmd> </Cmd>
              <Cmd>
                VM_NAME=<V>"${'${1:-MyVM}'}"</V>
              </Cmd>
              <Cmd>
                ISO_PATH=<V>"${'${2:-ubuntu.iso}'}"</V>
              </Cmd>
              <Cmd>
                RAM=<V>2048</V>
              </Cmd>
              <Cmd>
                CPUS=<V>2</V>
              </Cmd>
              <Cmd>
                DISK_SIZE=<V>20480</V>
              </Cmd>
              <Cmd>
                DISK_PATH=<V>"$VM_NAME.vdi"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 1. Utworz VM</Comment>
              <Cmd>
                echo <V>"[1/7] Tworzenie VM: $VM_NAME"</V>
              </Cmd>
              <Cmd>
                VBoxManage createvm <H>--name</H> <V>"$VM_NAME"</V>{' '}
                <H>--ostype</H> <V>Ubuntu_64</V> <H>--register</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 2. Konfiguracja RAM i CPU</Comment>
              <Cmd>
                echo{' '}
                <V>
                  "[2/7] Konfiguracja: ${'{'}RAM{'}'}MB RAM, ${'{'}CPUS{'}'}{' '}
                  CPU"
                </V>
              </Cmd>
              <Cmd>
                VBoxManage modifyvm <V>"$VM_NAME"</V> <H>--memory</H>{' '}
                <V>$RAM</V> <H>--cpus</H> <V>$CPUS</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 3. Utworz dysk</Comment>
              <Cmd>
                echo{' '}
                <V>
                  "[3/7] Tworzenie dysku: ${'{'}DISK_SIZE{'}'}MB"
                </V>
              </Cmd>
              <Cmd>
                VBoxManage createhd <H>--filename</H> <V>"$DISK_PATH"</V>{' '}
                <H>--size</H> <V>$DISK_SIZE</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 4. Kontroler SATA + podlacz dysk</Comment>
              <Cmd>
                echo <V>"[4/7] Podlaczanie dysku"</V>
              </Cmd>
              <Cmd>
                VBoxManage storagectl <V>"$VM_NAME"</V> <H>--name</H>{' '}
                <V>"SATA"</V> <H>--add</H> <V>sata</V>
              </Cmd>
              <Cmd>
                VBoxManage storageattach <V>"$VM_NAME"</V> <H>--storagectl</H>{' '}
                <V>"SATA"</V> <H>--port</H> <V>0</V> <H>--type</H> <V>hdd</V>{' '}
                <H>--medium</H> <V>"$DISK_PATH"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 5. Kontroler IDE + podlacz ISO</Comment>
              <Cmd>
                echo <V>"[5/7] Podlaczanie ISO: $ISO_PATH"</V>
              </Cmd>
              <Cmd>
                VBoxManage storagectl <V>"$VM_NAME"</V> <H>--name</H>{' '}
                <V>"IDE"</V> <H>--add</H> <V>ide</V>
              </Cmd>
              <Cmd>
                VBoxManage storageattach <V>"$VM_NAME"</V> <H>--storagectl</H>{' '}
                <V>"IDE"</V> <H>--port</H> <V>0</V> <H>--device</H> <V>0</V>{' '}
                <H>--type</H> <V>dvddrive</V> <H>--medium</H> <V>"$ISO_PATH"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 6. Konfiguracja sieci</Comment>
              <Cmd>
                echo <V>"[6/7] Konfiguracja sieci"</V>
              </Cmd>
              <Cmd>
                VBoxManage modifyvm <V>"$VM_NAME"</V> <H>--nic1</H> <V>nat</V>{' '}
                <H>--nic2</H> <V>hostonly</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 7. Uruchom VM</Comment>
              <Cmd>
                echo <V>"[7/7] Uruchamianie VM..."</V>
              </Cmd>
              <Cmd>
                VBoxManage startvm <V>"$VM_NAME"</V> <H>--type</H>{' '}
                <V>headless</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                echo <V>"VM $VM_NAME uruchomiona!"</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-3">Uruchomienie skryptu</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                chmod +x <F>create-vm.sh</F>
              </Cmd>
              <Cmd>
                ./<F>create-vm.sh</F> <V>"TestVM"</V>{' '}
                <F>/path/to/ubuntu-22.04.iso</F>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Flaga <code className="text-xs">--type headless</code> uruchamia
              VM bez okna graficznego (idealne dla serwerow). Mozna pozniej
              polaczyc sie przez SSH lub VBoxManage console. Skrypt mozna
              rozbudowac o parsowanie argumentow, walidacje i automatyczna
              instalacje z pliku preseed/kickstart.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 4 — Challenge: VM vs Docker */}
        <Card title="4. VM vs Docker — benchmark" color="var(--c-purple)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Porownaj czas startu, zuzycie pamieci i rozmiar dysku miedzy VM a
            kontenerem Docker uruchamiajacym ten sam system Ubuntu.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Czas startu</SectionLabel>
            <ExampleBlock variant="default">
              <Comment># VM:</Comment>
              <Cmd>
                time VBoxManage startvm <V>"Ubuntu"</V> <H>--type</H>{' '}
                <V>headless</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Docker:</Comment>
              <Cmd>
                time docker run <H>-d</H> <V>ubuntu</V> sleep infinity
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Zuzycie pamieci</SectionLabel>
            <ExampleBlock variant="orange">
              <Comment># VM — sprawdz przydzielona pamiec:</Comment>
              <Cmd>
                VBoxManage showvminfo <V>"Ubuntu"</V> | grep <V>Memory</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Docker — rzeczywiste zuzycie:</Comment>
              <Cmd>
                docker stats <H>--no-stream</H>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Rozmiar dysku</SectionLabel>
            <ExampleBlock variant="orange">
              <Comment># VM — rozmiar pliku VDI:</Comment>
              <Cmd>
                ls <H>-lh</H> <F>Ubuntu.vdi</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Docker — rozmiar obrazu:</Comment>
              <Cmd>
                docker image ls <V>ubuntu</V>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Typowe wyniki: Docker startuje w sekundach vs minuty dla VM. Obraz
              Docker Ubuntu zajmuje ~30 MB vs kilka GB dla VM. Zuzycie pamieci
              Docker: kilka MB vs stale przydzielony RAM dla VM. VM oferuje
              pelna izolacje na poziomie hardware, Docker dzieli kernel z
              hostem.
            </InfoBox>
          </Spoiler>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/07', label: '07 — Wirtualizacja' }}
        next={{ to: '/homework/08', label: 'Homework 08' }}
      />
    </div>
  );
}
