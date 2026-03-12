import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import ExampleBlock, {
  Cmd,
  Comment,
  H,
  V,
} from '../../components/ExampleBlock';
import Divider from '../../components/Divider';
import InfoBox from '../../components/InfoBox';
import LessonNav from '../../components/LessonNav';

export default function SSHWelcome() {
  usePageTitle('SSH Welcome');
  return (
    <div>
      <PageHeader
        title="SSH Welcome Screen (MOTD)"
        subtitle="Jak skonfigurować własny komunikat powitalny po zalogowaniu się przez SSH"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Czym jest MOTD?" full>
          <p className="text-[var(--c-muted)] text-sm leading-relaxed">
            <b>MOTD</b> (Message of the Day) to tekst wyświetlany użytkownikowi
            tuż po poprawnym zalogowaniu się do systemu przez terminal (np.
            SSH). Służy do informowania o zasadach korzystania z systemu,
            wyświetlania statystyk serwera lub po prostu personalizacji
            środowiska.
          </p>
        </Card>

        <Card
          title="Metoda 1: Statyczny tekst (/etc/motd)"
          color="var(--c-accent)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-3">
            Najprostsza metoda wyświetlania stałego tekstu lub grafiki ASCII.
          </p>
          <ExampleBlock>
            <Comment># Edytuj plik motd</Comment>
            <Cmd>
              sudo <H>nano</H> <V>/etc/motd</V>
            </Cmd>
          </ExampleBlock>
          <p className="text-[var(--c-muted)] text-[10px] mt-2 italic">
            Wpisz tam cokolwiek, np. grafikę ASCII Art. Zmiany są widoczne
            natychmiast przy następnym logowaniu.
          </p>
        </Card>

        <Card
          title="Metoda 2: Dynamiczne skrypty (Ubuntu/Debian)"
          color="var(--c-green)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-3">
            Systemy te używają katalogu{' '}
            <code className="text-[var(--c-green)]">/etc/update-motd.d/</code>{' '}
            do generowania dynamicznych komunikatów.
          </p>
          <ExampleBlock variant="green">
            <Comment># Przejdź do katalogu skryptów</Comment>
            <Cmd>
              cd <V>/etc/update-motd.d/</V>
            </Cmd>
            <Comment>
              # Wyświetl istniejące skrypty (wykonywane numerami)
            </Comment>
            <Cmd>ls -l</Cmd>
          </ExampleBlock>
          <Divider />
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Możesz dodać własny skrypt:
          </p>
          <ExampleBlock variant="green">
            <Comment># Utwórz nowy skrypt (np. 99-custom)</Comment>
            <Cmd>
              sudo <H>nano</H> <V>99-custom</V>
            </Cmd>
            <Comment># Wklej treść:</Comment>
            <Cmd>#!/bin/bash</Cmd>
            <Cmd>echo "Witaj w systemie, $(whoami)!"</Cmd>
            <Comment># Nadaj uprawnienia do wykonywania</Comment>
            <Cmd>
              sudo <H>chmod +x</H> 99-custom
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Konfiguracja SSH (sshd_config)" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-3">
            Upewnij się, że SSH jest skonfigurowane do wyświetlania MOTD.
          </p>
          <ExampleBlock variant="yellow">
            <Comment># Sprawdź konfigurację</Comment>
            <Cmd>
              sudo <H>grep</H> <V>PrintMotd</V> /etc/ssh/sshd_config
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Domyślnie{' '}
            <code className="text-[var(--c-yellow)]">PrintMotd yes</code>{' '}
            powinno być ustawione. Jeśli chcesz używać tylko dynamicznych
            skryptów z Ubuntu, czasami ustawia się to na{' '}
            <code className="text-[var(--c-yellow)]">no</code>, aby uniknąć
            duplikacji.
          </InfoBox>
        </Card>

        <Card title="Przydatne narzędzia" color="var(--c-purple)">
          <ul className="list-disc list-inside text-[var(--c-muted)] text-xs space-y-2">
            <li>
              <b className="text-[var(--c-text)]">figlet / toilet</b>:
              Generowanie napisów ASCII Art
            </li>
            <li>
              <b className="text-[var(--c-text)]">neofetch / screenfetch</b>:
              Wyświetlanie info o systemie i logo dystrybucji
            </li>
            <li>
              <b className="text-[var(--c-text)]">lolcat</b>: Dodawanie
              tęczowych kolorów do wyjścia
            </li>
          </ul>
          <ExampleBlock variant="purple">
            <Comment># Przykład użycia figlet</Comment>
            <Cmd>
              sudo apt install <V>figlet</V>
            </Cmd>
            <Cmd>
              figlet <H>"DevOps HandBook"</H>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card
          title="Przykład rozbudowanego skryptu (Dashboard)"
          color="var(--c-purple)"
          full
        >
          <p className="text-[var(--c-muted)] text-xs mb-3">
            Skrypt wyświetlający statystyki systemu przy logowaniu:
          </p>
          <ExampleBlock variant="purple">
            <Cmd>#!/bin/bash</Cmd>
            <Cmd># Kolory</Cmd>
            <Cmd>GREEN='\033[0;32m'</Cmd>
            <Cmd>NC='\033[0m'</Cmd>
            <Cmd> </Cmd>
            <Cmd>
              echo -e "{' ${GREEN} '}--- SYSTEM STATUS ---{' ${NC} '}"
            </Cmd>
            <Cmd>echo "Data: $(date)"</Cmd>
            <Cmd>echo "Uptime: $(uptime -p)"</Cmd>
            <Cmd>
              echo "Load: $(cat /proc/loadavg | awk '{'{'} print $1, $2, $3{' '}
              {'}'}')"
            </Cmd>
            <Cmd>
              echo "Pamięć: $(free -m | awk '/Mem:/ {'{'} print $3 "/" $2 " MB"{' '}
              {'}'}')"
            </Cmd>
            <Cmd>
              echo "Dysk (/): $(df -h / | awk '/\// {'{'} print $3 "/" $2 {'}'}
              ')"
            </Cmd>
            <Cmd>
              echo -e "{' ${GREEN} '}----------------------{' ${NC} '}"
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Pamiętaj, aby plik miał uprawnienia{' '}
            <code className="text-[var(--c-purple)]">chmod +x</code> i znajdował
            się w{' '}
            <code className="text-[var(--c-purple)]">/etc/update-motd.d/</code>.
          </InfoBox>
        </Card>

        <Card
          title="Gotowy Skrypt: devops_banner.sh"
          color="var(--c-accent)"
          full
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <p className="text-[var(--c-muted)] text-xs mb-2">
                Podgląd efektu:
              </p>
              <div className="bg-[#0a0c10] border border-[var(--c-border)] rounded p-4 font-mono text-[10px] leading-tight overflow-x-auto">
                <div className="text-[var(--c-accent)] mb-2 whitespace-pre">
                  {`    ____              ____               __  __                __ __                __  
   / __ \\___ _   __  / __ \\____  _____  / / / /___ _____  ____/ / /_  ____  ____  / /__
  / / / / _ \\ | / / / / / / __ \\/ ___/ / /_/ / __ \`/ __ \\/ __  / __ \\/ __ \\/ __ \\/ //_/
 / /_/ /  __/ |/ / / /_/ / /_/ (__  ) / __  / /_/ / / / / /_/ / /_/ / /_/ / /_/ / ,<   
/_____/\\___/|___/  \\____/ .___/____/ /_/ /_/\\__,_/_| |_/\\__,_/_.___/\\____/\\____/_/|_|  
                       /_/`}
                </div>
                <div className="text-[var(--c-yellow)] mb-1">
                  --- SYSTEM STATUS ---
                </div>
                <div className="text-[var(--c-text)]">Użytkownik: serwin</div>
                <div className="text-[var(--c-text)]">
                  Host: devops-develop-01
                </div>
                <div className="text-[var(--c-text)]">
                  Data:{' '}
                  {new Date().toISOString().slice(0, 19).replace('T', ' ')}
                </div>
                <div className="text-[var(--c-text)]">
                  Uptime:{' '}
                  {(() => {
                    const startDate = new Date('2024-01-02');
                    const now = new Date();
                    const diff = now.getTime() - startDate.getTime();
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const weeks = Math.floor(days / 7);
                    const restDays = days % 7;
                    return `up ${weeks} weeks, ${restDays} days`;
                  })()}
                </div>
                <div className="text-[var(--c-yellow)]">
                  ---------------------
                </div>
              </div>
            </div>
            <div>
              <p className="text-[var(--c-muted)] text-xs mb-2">
                Skrypt do skopiowania:
              </p>
              <ExampleBlock variant="default">
                <Cmd>#!/bin/bash</Cmd>
                <Cmd> </Cmd>
                <Comment># Kolory ANSI</Comment>
                <Cmd>CYAN='\033[0;36m'</Cmd>
                <Cmd>GOLD='\033[0;33m'</Cmd>
                <Cmd>
                  NC='\033[0m' <Comment># No Color</Comment>
                </Cmd>
                <Cmd> </Cmd>
                <Cmd>echo -e "{'${CYAN}'}"</Cmd>
                <Cmd>cat {'<<'} "EOF"</Cmd>
                <Cmd>
                  {
                    '    ____              ____               __  __                __ __                __  '
                  }
                </Cmd>
                <Cmd>
                  {
                    '   / __ \\___ _   __  / __ \\____  _____  / / / /___ _____  ____/ / /_  ____  ____  / /__'
                  }
                </Cmd>
                <Cmd>
                  {
                    '  / / / / _ \\ | / / / / / / __ \\/ ___/ / /_/ / __ `/ __ \\/ __  / __ \\/ __ \\/ __ \\/ //_/'
                  }
                </Cmd>
                <Cmd>
                  {
                    ' / /_/ /  __/ |/ / / /_/ / /_/ (__  ) / __  / /_/ / / / / /_/ / /_/ / /_/ / /_/ / ,<'
                  }
                </Cmd>
                <Cmd>
                  {
                    '/_____/\\___/|___/  \\____/ .___/____/ /_/ /_/\\__,_/_| |_/\\__,_/_.___/\\____/\\____/_/|_|'
                  }
                </Cmd>
                <Cmd>{'                       /_/'}</Cmd>
                <Cmd>EOF</Cmd>
                <Cmd>echo -e "{'${NC}'}"</Cmd>
                <Cmd> </Cmd>
                <Comment># Dodatkowe info w stylu dashboardu</Comment>
                <Cmd>
                  echo -e "{'${GOLD}'}--- SYSTEM STATUS ---{'${NC}'}"
                </Cmd>
                <Cmd>echo -e "Użytkownik: $(whoami)"</Cmd>
                <Cmd>echo -e "Host: $(hostname)"</Cmd>
                <Cmd>echo -e "Data: $(date '+%Y-%m-%d %H:%M:%S')"</Cmd>
                <Cmd>echo -e "Uptime: $(uptime -p)"</Cmd>
                <Cmd>
                  echo -e "{'${GOLD}'}---------------------{'${NC}'}"
                </Cmd>
              </ExampleBlock>
            </div>
          </div>
          <Divider />
          <div className="mt-3">
            <p className="text-[var(--c-muted)] text-[10px] uppercase tracking-wider mb-2">
              Instrukcja użycia:
            </p>
            <ExampleBlock variant="yellow">
              <Comment>
                Krok 1: Utworzenie nowy plik MOTD i wklej do niego powyższy kod
              </Comment>
              <Cmd>sudo nano /etc/update-motd.d/00-devops-banner</Cmd>
            </ExampleBlock>
            <ExampleBlock variant="yellow">
              <Comment># 2. Nadanie uprawnień</Comment>
              <Cmd>sudo chmod +x /etc/update-motd.d/99-devops-banner</Cmd>
            </ExampleBlock>
            <ExampleBlock variant="yellow">
              <Comment># 3. Test (bez przelogowania)</Comment>
              <Cmd>/etc/update-motd.d/99-devops-banner</Cmd>
            </ExampleBlock>
          </div>
        </Card>

        <Card title="Inne style banerów (Podgląd)" color="var(--c-orange)" full>
          <p className="text-[var(--c-muted)] text-xs mb-3">
            Szybkie przykłady do wstawienia bezpośrednio do{' '}
            <code className="text-[var(--c-orange)]">/etc/motd</code>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ExampleBlock variant="orange">
              <Cmd>█▀▄ █▀▀ █ █ █▀█ █▀█ █▀▀ █ █ █▀█ █▀█ █▀▄ █▀▄ █▀█ █▀█ █ █</Cmd>
              <Cmd>
                █ █ █▀▀ ▀▄▀ █ █ █▀▀ ▄▄█ █▀▀█ █▀█ █ █ █ █ █▀▄ █ █ █ █ █▀▄
              </Cmd>
              <Cmd>▀▀ ▀▀▀ ▀ ▀▀▀ ▀ ▀▀▀ ▀ ▀ ▀ ▀ ▀ ▀ ▀▀ ▀▀ ▀▀▀ ▀▀▀ ▀ ▀</Cmd>
            </ExampleBlock>
            <ExampleBlock variant="purple">
              <Cmd>
                {
                  '    ____              ____               __  __                ____                __'
                }
              </Cmd>
              <Cmd>
                {
                  '   / __ \\___ _   __  / __ \\____  _____  / / / /___ _____  ____/ / /_  ____  ____  / /__'
                }
              </Cmd>
              <Cmd>
                {
                  '  / / / / _ \\ | / / / / / / __ \\/ ___/ / /_/ / __ `/ __ \\/ __  / __ \\/ __ \\/ __ \\/ //_/'
                }
              </Cmd>
              <Cmd>
                {
                  ' / /_/ /  __/ |/ / / /_/ / /_/ (__  ) / __  / /_/ / / / / /_/ / /_/ / /_/ / /_/ / ,<'
                }
              </Cmd>
              <Cmd>
                {
                  '/_____/\\___/|___/  \\____/ .___/____/ /_/ /_/\\__,_/_| |_/\\__,_/_.___/\\____/\\____/_/|_|'
                }
              </Cmd>
              <Cmd>{'                       /_/'}</Cmd>
            </ExampleBlock>
          </div>

          <InfoBox warn>
            Aby kolory działały w{' '}
            <code className="text-[var(--c-orange)]">/etc/motd</code>, musisz
            użyć prawdziwych znaków ucieczki (escape codes). W skryptach Bash
            używamy <code className="text-[var(--c-orange)]">echo -e</code>.
          </InfoBox>
        </Card>
      </div>

      <LessonNav
        prev={{
          to: '/cheatsheets/processes-monitoring',
          label: 'Procesy i Monitorowanie',
        }}
        next={{ to: '/dashboard', label: 'Dashboard' }}
      />
    </div>
  );
}
