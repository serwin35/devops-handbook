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
import LessonNav from '../../components/LessonNav';

export default function PackageManagement() {
  usePageTitle('Package Management');

  return (
    <div>
      <PageHeader
        title="Package Management"
        subtitle="apt · yum · dnf · snap · flatpak — zarzadzanie pakietami"
        color="var(--c-orange)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="APT — podstawy (Debian/Ubuntu)" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Aktualizuj liste pakietow z repozytoriow</Comment>
            <Cmd>
              apt <H>update</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Zaktualizuj wszystkie zainstalowane pakiety</Comment>
            <Cmd>
              apt <H>upgrade</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Aktualizuj + usun niepotrzebne zaleznosci</Comment>
            <Cmd>
              apt <H>full-upgrade</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="green">
            <Comment># Zainstaluj pakiet</Comment>
            <Cmd>
              apt <H>install</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Zainstaluj bez pytania o potwierdzenie</Comment>
            <Cmd>
              apt install <H>-y</H> <V>nginx curl git</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="orange">
            <Comment># Usun pakiet (zachowaj konfiguracje)</Comment>
            <Cmd>
              apt <H>remove</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Usun pakiet wraz z konfiguracja</Comment>
            <Cmd>
              apt <H>purge</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Usun niepotrzebne zaleznosci</Comment>
            <Cmd>
              apt <H>autoremove</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock>
            <Comment># Szukaj pakietu po nazwie/opisie</Comment>
            <Cmd>
              apt <H>search</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Lista zainstalowanych pakietow</Comment>
            <Cmd>
              apt list <H>--installed</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Informacje o pakiecie</Comment>
            <Cmd>
              apt <H>show</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Zawsze wykonuj <code>apt update</code> przed{' '}
            <code>apt install</code>, aby miec aktualna liste pakietow.
          </InfoBox>
        </Card>

        <Card title="APT — zaawansowane" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># Szczegolowe informacje o pakiecie (z cache)</Comment>
            <Cmd>
              apt-cache <H>show</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Sprawdz zaleznosci pakietu</Comment>
            <Cmd>
              apt-cache <H>depends</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Sprawdz co wymaga danego pakietu</Comment>
            <Cmd>
              apt-cache <H>rdepends</H> <V>libssl3</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>apt-mark — blokowanie wersji</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Zablokuj pakiet — nie bedzie aktualizowany</Comment>
            <Cmd>
              apt-mark <H>hold</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Odblokuj pakiet</Comment>
            <Cmd>
              apt-mark <H>unhold</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Lista zablokowanych pakietow</Comment>
            <Cmd>
              apt-mark <H>showhold</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Repozytoria i dpkg</SectionLabel>
          <ExampleBlock>
            <Comment># Dodaj repozytorium PPA (Ubuntu)</Comment>
            <Cmd>
              add-apt-repository <V>ppa:ondrej/php</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Konfiguracja repozytoriow</Comment>
            <Cmd>
              <F>/etc/apt/sources.list</F>
            </Cmd>
            <Cmd>
              <F>/etc/apt/sources.list.d/</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="orange">
            <Comment># Zainstaluj lokalny plik .deb</Comment>
            <Cmd>
              dpkg <H>-i</H> <F>pakiet.deb</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Lista zainstalowanych pakietow (dpkg)</Comment>
            <Cmd>
              dpkg <H>-l</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Znajdz, ktory pakiet dostarcza plik</Comment>
            <Cmd>
              dpkg <H>-S</H> <F>/usr/bin/nginx</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Lista plikow zainstalowanych przez pakiet</Comment>
            <Cmd>
              dpkg <H>-L</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Po <code>dpkg -i</code> uruchom <code>apt install -f</code>, aby
            naprawic brakujace zaleznosci.
          </InfoBox>
        </Card>

        <Card
          title="YUM / DNF (RHEL / CentOS / Fedora)"
          color="var(--c-yellow)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            <code className="text-xs text-[var(--c-yellow)]">dnf</code> to
            nastepca <code className="text-xs text-[var(--c-yellow)]">yum</code>{' '}
            — w nowych systemach uzywaj{' '}
            <code className="text-xs text-[var(--c-yellow)]">dnf</code>.
          </p>
          <ExampleBlock variant="yellow">
            <Comment># Zainstaluj pakiet</Comment>
            <Cmd>
              dnf <H>install</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Usun pakiet</Comment>
            <Cmd>
              dnf <H>remove</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Zaktualizuj wszystko</Comment>
            <Cmd>
              dnf <H>update</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Zaktualizuj konkretny pakiet</Comment>
            <Cmd>
              dnf update <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock>
            <Comment># Szukaj pakietu</Comment>
            <Cmd>
              dnf <H>search</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Informacje o pakiecie</Comment>
            <Cmd>
              dnf <H>info</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Lista zainstalowanych pakietow</Comment>
            <Cmd>
              dnf list <H>installed</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Sprawdz co dostarcza dany plik</Comment>
            <Cmd>
              dnf <H>provides</H> <F>/usr/bin/python3</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Grupy pakietow</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Zainstaluj grupe pakietow</Comment>
            <Cmd>
              dnf <H>group install</H> <V>"Development Tools"</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Lista dostepnych grup</Comment>
            <Cmd>
              dnf <H>group list</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="orange">
            <Comment># Historia transakcji</Comment>
            <Cmd>
              dnf <H>history</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Cofnij poprzednia transakcje</Comment>
            <Cmd>
              dnf history <H>undo</H> <V>last</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code>yum</code> to alias na <code>dnf</code> w RHEL 8+ — komendy sa
            identyczne.
          </InfoBox>
        </Card>

        <Card title="Snap" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Snap to format pakietow od Canonical — dziala na Debianie, Ubuntu i
            innych dystrybucjach.
          </p>
          <ExampleBlock variant="green">
            <Comment># Zainstaluj pakiet snap</Comment>
            <Cmd>
              snap <H>install</H> <V>code</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment>
              # Zainstaluj w trybie klasycznym (pelny dostep do FS)
            </Comment>
            <Cmd>
              snap install <V>code</V> <H>--classic</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Zainstaluj konkretny kanal (wersje)</Comment>
            <Cmd>
              snap install <V>kubectl</V> <H>--channel=1.29/stable</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="orange">
            <Comment># Usun pakiet snap</Comment>
            <Cmd>
              snap <H>remove</H> <V>code</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Zaktualizuj pakiet</Comment>
            <Cmd>
              snap <H>refresh</H> <V>code</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Zaktualizuj wszystkie snapy</Comment>
            <Cmd>
              snap <H>refresh</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock>
            <Comment># Lista zainstalowanych snapow</Comment>
            <Cmd>
              snap <H>list</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Szukaj pakietu w Snap Store</Comment>
            <Cmd>
              snap <H>find</H> <V>editor</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Informacje o snapie</Comment>
            <Cmd>
              snap <H>info</H> <V>code</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="purple">
            <Comment># Cofnij do poprzedniej wersji</Comment>
            <Cmd>
              snap <H>revert</H> <V>code</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Wylacz snap (bez usuwania)</Comment>
            <Cmd>
              snap <H>disable</H> <V>code</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Wlacz snap</Comment>
            <Cmd>
              snap <H>enable</H> <V>code</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Snappy automatycznie aktualizuje pakiety w tle. Uzywaj{' '}
            <code>--classic</code> tylko gdy pakiet tego wymaga.
          </InfoBox>
        </Card>

        <Card title="Flatpak" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Flatpak to format pakietow sandbox dla aplikacji desktopowych.
            Glowne repozytorium:{' '}
            <code className="text-xs text-[var(--c-purple)]">Flathub</code>.
          </p>
          <ExampleBlock variant="purple">
            <Comment># Dodaj repozytorium Flathub</Comment>
            <Cmd>
              flatpak remote-add <H>--if-not-exists</H> flathub{' '}
              <V>https://flathub.org/repo/flathub.flatpakrepo</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="purple">
            <Comment># Zainstaluj pakiet z Flathub</Comment>
            <Cmd>
              flatpak <H>install</H> flathub <V>org.gimp.GIMP</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment>
              # Zainstaluj dla biezacego uzytkownika (nie systemowo)
            </Comment>
            <Cmd>
              flatpak install <H>--user</H> flathub <V>org.gimp.GIMP</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="green">
            <Comment># Uruchom aplikacje flatpak</Comment>
            <Cmd>
              flatpak <H>run</H> <V>org.gimp.GIMP</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock>
            <Comment># Lista zainstalowanych aplikacji</Comment>
            <Cmd>
              flatpak <H>list</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Szukaj aplikacji</Comment>
            <Cmd>
              flatpak <H>search</H> <V>gimp</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Informacje o pakiecie</Comment>
            <Cmd>
              flatpak <H>info</H> <V>org.gimp.GIMP</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="yellow">
            <Comment># Zaktualizuj wszystkie aplikacje</Comment>
            <Cmd>
              flatpak <H>update</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Usun aplikacje</Comment>
            <Cmd>
              flatpak <H>uninstall</H> <V>org.gimp.GIMP</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Usun nieuzywane dane runtime</Comment>
            <Cmd>
              flatpak <H>uninstall --unused</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Repozytoria</SectionLabel>
          <Row code="flatpak remotes">Lista skonfigurowanych repozytoriow</Row>
          <Row code="flatpak remote-list">
            Szczegolowa lista zdalnych repozytoriow
          </Row>
          <InfoBox>
            Aplikacje Flatpak sa uruchamiane w izolowanym sandboxie —
            ograniczony dostep do systemu zwiekszsa bezpieczenstwo.
          </InfoBox>
        </Card>

        <Card
          title="Porownanie menedzerow pakietow"
          color="var(--c-orange)"
          full
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            <div className="bg-[var(--c-code-bg)] border border-[var(--c-border)] rounded-md p-3">
              <p className="text-[var(--c-green)] font-bold text-sm mb-1.5">
                APT
              </p>
              <p className="text-[var(--c-muted)] text-xs leading-5">
                Debian, Ubuntu i pochodne. Pakiety <code>.deb</code>. Systemowy
                menedzer — instaluje natywnie, wspoldzieli biblioteki. Najlepsza
                integracja z systemem.
              </p>
              <p className="text-[var(--c-fg)] text-xs mt-2 font-medium">
                Kiedy uzywac:
              </p>
              <p className="text-[var(--c-muted)] text-xs">
                Oprogramowanie serwerowe, narzedzia systemowe, serwisy.
              </p>
            </div>
            <div className="bg-[var(--c-code-bg)] border border-[var(--c-border)] rounded-md p-3">
              <p className="text-[var(--c-yellow)] font-bold text-sm mb-1.5">
                DNF / YUM
              </p>
              <p className="text-[var(--c-muted)] text-xs leading-5">
                RHEL, CentOS, Fedora. Pakiety <code>.rpm</code>. Systemowy
                menedzer z historią transakcji i rollback. Silny w srodowiskach
                enterprise.
              </p>
              <p className="text-[var(--c-fg)] text-xs mt-2 font-medium">
                Kiedy uzywac:
              </p>
              <p className="text-[var(--c-muted)] text-xs">
                Serwery RHEL/CentOS, srodowiska enterprise, automatyzacja.
              </p>
            </div>
            <div className="bg-[var(--c-code-bg)] border border-[var(--c-border)] rounded-md p-3">
              <p className="text-[var(--c-green)] font-bold text-sm mb-1.5">
                Snap
              </p>
              <p className="text-[var(--c-muted)] text-xs leading-5">
                Pakiety z bundlowanymi zaleznosci — dziala na wielu
                dystrybucjach. Auto-aktualizacje. Sandbox. Dedykowany dla
                Ubuntu/Canonical.
              </p>
              <p className="text-[var(--c-fg)] text-xs mt-2 font-medium">
                Kiedy uzywac:
              </p>
              <p className="text-[var(--c-muted)] text-xs">
                Nowe wersje narzedzi (kubectl, helm, code), multi-distro
                deployment.
              </p>
            </div>
            <div className="bg-[var(--c-code-bg)] border border-[var(--c-border)] rounded-md p-3">
              <p className="text-[var(--c-purple)] font-bold text-sm mb-1.5">
                Flatpak
              </p>
              <p className="text-[var(--c-muted)] text-xs leading-5">
                Dedykowany aplikacjom desktopowym. Silny sandbox. Niezalezny od
                dystrybucji. Glowne repozytorium: Flathub. Swietny dla GUI.
              </p>
              <p className="text-[var(--c-fg)] text-xs mt-2 font-medium">
                Kiedy uzywac:
              </p>
              <p className="text-[var(--c-muted)] text-xs">
                Aplikacje desktopowe (GIMP, LibreOffice, Inkscape) na dowolnej
                dystrybucji.
              </p>
            </div>
          </div>
          <Divider />
          <SectionLabel className="mt-1.5">
            Szybkie porownanie komend
          </SectionLabel>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--c-border)]">
                  <th className="text-left py-1.5 pr-4 text-[var(--c-muted)] font-medium">
                    Operacja
                  </th>
                  <th className="text-left py-1.5 pr-4 text-[var(--c-green)] font-medium">
                    APT
                  </th>
                  <th className="text-left py-1.5 pr-4 text-[var(--c-yellow)] font-medium">
                    DNF
                  </th>
                  <th className="text-left py-1.5 pr-4 text-[var(--c-green)] font-medium">
                    Snap
                  </th>
                  <th className="text-left py-1.5 text-[var(--c-purple)] font-medium">
                    Flatpak
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--c-border)]">
                <tr>
                  <td className="py-1.5 pr-4 text-[var(--c-muted)]">
                    Instalacja
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    apt install
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    dnf install
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    snap install
                  </td>
                  <td className="py-1.5 font-mono text-[var(--c-fg)]">
                    flatpak install
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-4 text-[var(--c-muted)]">
                    Usuniecie
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    apt remove
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    dnf remove
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    snap remove
                  </td>
                  <td className="py-1.5 font-mono text-[var(--c-fg)]">
                    flatpak uninstall
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-4 text-[var(--c-muted)]">
                    Aktualizacja
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    apt upgrade
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    dnf update
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    snap refresh
                  </td>
                  <td className="py-1.5 font-mono text-[var(--c-fg)]">
                    flatpak update
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-4 text-[var(--c-muted)]">
                    Wyszukiwanie
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    apt search
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    dnf search
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    snap find
                  </td>
                  <td className="py-1.5 font-mono text-[var(--c-fg)]">
                    flatpak search
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-4 text-[var(--c-muted)]">
                    Lista zainstalowanych
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    apt list --installed
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    dnf list installed
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    snap list
                  </td>
                  <td className="py-1.5 font-mono text-[var(--c-fg)]">
                    flatpak list
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-4 text-[var(--c-muted)]">
                    Informacje
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    apt show
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    dnf info
                  </td>
                  <td className="py-1.5 pr-4 font-mono text-[var(--c-fg)]">
                    snap info
                  </td>
                  <td className="py-1.5 font-mono text-[var(--c-fg)]">
                    flatpak info
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <InfoBox>
            Na serwerach produkcyjnych uzywaj glownie <code>apt</code>{' '}
            (Debian/Ubuntu) lub <code>dnf</code> (RHEL/Fedora). Snap i Flatpak
            sa lepsze do aplikacji desktopowych i narzedzi deweloperskich na
            stacjach roboczych.
          </InfoBox>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/cheatsheets/filesystem', label: 'Filesystem' }}
        next={{ to: '/cheatsheets/docker', label: 'Docker' }}
      />
    </div>
  );
}
