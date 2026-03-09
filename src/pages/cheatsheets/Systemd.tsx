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
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Systemd() {
  usePageTitle('Systemd');

  return (
    <div>
      <PageHeader
        title="Systemd"
        subtitle="Zarządzanie usługami · jednostki · logi · timery · targety"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="systemctl — zarządzanie usługami" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Uruchom usługę</Comment>
            <Cmd>
              systemctl <H>start</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Zatrzymaj usługę</Comment>
            <Cmd>
              systemctl <H>stop</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Zrestartuj usługę (stop + start)</Comment>
            <Cmd>
              systemctl <H>restart</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Przeładuj konfigurację (bez restartu)</Comment>
            <Cmd>
              systemctl <H>reload</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock>
            <Comment># Włącz autostart przy bootowaniu</Comment>
            <Cmd>
              systemctl <H>enable</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Wyłącz autostart</Comment>
            <Cmd>
              systemctl <H>disable</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Włącz + uruchom od razu</Comment>
            <Cmd>
              systemctl <H>enable --now</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="purple">
            <Comment># Sprawdz status usługi</Comment>
            <Cmd>
              systemctl <H>status</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Czy usługa działa?</Comment>
            <Cmd>
              systemctl <H>is-active</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Czy usługa jest włączona na starcie?</Comment>
            <Cmd>
              systemctl <H>is-enabled</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="yellow">
            <Comment># Przeładuj pliki unitów po zmianach</Comment>
            <Cmd>
              systemctl <H>daemon-reload</H>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Po każdej edycji pliku{' '}
            <code className="text-xs text-[var(--c-yellow)]">.service</code>{' '}
            trzeba wykonac{' '}
            <code className="text-xs text-[var(--c-yellow)]">
              daemon-reload
            </code>
            !
          </InfoBox>
        </Card>

        <Card title="journalctl — logi systemowe" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># Wszystkie logi</Comment>
            <Cmd>journalctl</Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Logi konkretnej usługi</Comment>
            <Cmd>
              journalctl <H>-u</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Śledź logi na zywo (jak tail -f)</Comment>
            <Cmd>
              journalctl <H>-f</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Śledź logi konkretnej usługi na zywo</Comment>
            <Cmd>
              journalctl <H>-u</H> <V>nginx</V> <H>-f</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock>
            <Comment># Logi od konkretnej daty</Comment>
            <Cmd>
              journalctl <H>--since</H> <V>"2024-01-15 10:00"</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Logi z zakresu czasu</Comment>
            <Cmd>
              journalctl <H>--since</H> <V>"1 hour ago"</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Logi do konkretnej daty</Comment>
            <Cmd>
              journalctl <H>--until</H> <V>"2024-01-15 12:00"</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="orange">
            <Comment># Filtruj po priorytecie (0=emerg ... 7=debug)</Comment>
            <Cmd>
              journalctl <H>-p</H> <V>err</V>{' '}
              <span className="text-[var(--c-muted)]"># błędy i wyżej</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Logi z bieżącego bootu</Comment>
            <Cmd>
              journalctl <H>-b</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Bez pagera — cały output na raz</Comment>
            <Cmd>
              journalctl <H>--no-pager</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Ostatnie N linii</Comment>
            <Cmd>
              journalctl <H>-n 50</H>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Priorytety:{' '}
            <code className="text-xs text-[var(--c-purple)]">emerg</code> &gt;{' '}
            <code className="text-xs text-[var(--c-purple)]">alert</code> &gt;{' '}
            <code className="text-xs text-[var(--c-purple)]">crit</code> &gt;{' '}
            <code className="text-xs text-[var(--c-purple)]">err</code> &gt;{' '}
            <code className="text-xs text-[var(--c-purple)]">warning</code> &gt;{' '}
            <code className="text-xs text-[var(--c-purple)]">notice</code> &gt;{' '}
            <code className="text-xs text-[var(--c-purple)]">info</code> &gt;{' '}
            <code className="text-xs text-[var(--c-purple)]">debug</code>
          </InfoBox>
        </Card>

        <Card title="Unit files — pliki .service" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Pliki unitów definiują usługi w systemd. Lokalizacja:{' '}
            <code className="text-xs text-[var(--c-yellow)]">
              /etc/systemd/system/
            </code>
          </p>
          <ExampleBlock variant="yellow">
            <Comment># /etc/systemd/system/myapp.service</Comment>
            <Cmd>
              <H>[Unit]</H>
            </Cmd>
            <Cmd>
              Description=<V>Moja aplikacja webowa</V>
            </Cmd>
            <Cmd>
              After=<V>network.target</V>
            </Cmd>
            <Cmd>
              Wants=<V>postgresql.service</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>[Service]</H>
            </Cmd>
            <Cmd>
              Type=<V>simple</V>
            </Cmd>
            <Cmd>
              User=<V>appuser</V>
            </Cmd>
            <Cmd>
              WorkingDirectory=<F>/opt/myapp</F>
            </Cmd>
            <Cmd>
              ExecStart=<F>/usr/bin/node server.js</F>
            </Cmd>
            <Cmd>
              Restart=<V>on-failure</V>
            </Cmd>
            <Cmd>
              RestartSec=<V>5</V>
            </Cmd>
            <Cmd>
              Environment=<V>NODE_ENV=production</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>[Install]</H>
            </Cmd>
            <Cmd>
              WantedBy=<V>multi-user.target</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Sekcje</SectionLabel>
          <Row code="[Unit]" codeVariant="yellow">
            Opis, zależności, kolejność uruchamiania
          </Row>
          <Row code="[Service]" codeVariant="yellow">
            Typ, użytkownik, komenda, restart
          </Row>
          <Row code="[Install]" codeVariant="yellow">
            Kiedy usługa ma być włączona (target)
          </Row>
          <Divider />
          <SectionLabel className="mt-1.5">Restart policies</SectionLabel>
          <Row code="no">Nie restartuj (domyślne)</Row>
          <Row code="on-failure">Restartuj tylko po błędzie (exit != 0)</Row>
          <Row code="always">Restartuj zawsze</Row>
          <Row code="on-abnormal">Restartuj po sygnale, timeout, watchdog</Row>
        </Card>

        <Card title="Typy unitów" color="var(--c-orange)">
          <Concept title=".service" color="var(--c-green)">
            Usługa — proces działający w tle (daemon). Najczęściej uzywany typ
            unitu.
          </Concept>
          <Concept title=".socket" color="var(--c-purple)">
            Socket — aktywacja usługi przy połączeniu. Np. SSH on-demand.
          </Concept>
          <Concept title=".timer" color="var(--c-yellow)">
            Timer — harmonogram zadań (alternatywa dla cron). Uruchamia
            powiązany .service.
          </Concept>
          <Concept title=".mount" color="var(--c-orange)">
            Mount — montowanie systemów plików. Odpowiednik wpisow w /etc/fstab.
          </Concept>
          <Concept title=".target" color="var(--c-accent)">
            Target — grupa unitów. Odpowiednik runleveli (multi-user,
            graphical).
          </Concept>
          <Concept title=".path">
            Path — monitorowanie sciezek w FS. Uruchamia usługę przy zmianie
            pliku.
          </Concept>
          <Divider />
          <ExampleBlock>
            <Comment># Lista wszystkich unitów danego typu</Comment>
            <Cmd>
              systemctl list-units <H>--type=service</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Lista wszystkich timerow</Comment>
            <Cmd>
              systemctl list-units <H>--type=timer</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Lista wszystkich zainstalowanych unitów</Comment>
            <Cmd>
              systemctl <H>list-unit-files</H>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Timery — alternatywa dla cron" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Timer + powiązany service = zaplanowane zadanie.
          </p>
          <SectionLabel>Plik timera</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># /etc/systemd/system/backup.timer</Comment>
            <Cmd>
              <H>[Unit]</H>
            </Cmd>
            <Cmd>
              Description=<V>Codzienny backup</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>[Timer]</H>
            </Cmd>
            <Cmd>
              <Comment># Uruchom 15min po starcie systemu</Comment>
            </Cmd>
            <Cmd>
              OnBootSec=<V>15min</V>
            </Cmd>
            <Cmd>
              <Comment># Powtarzaj codziennie o 2:00</Comment>
            </Cmd>
            <Cmd>
              OnCalendar=<V>*-*-* 02:00:00</V>
            </Cmd>
            <Cmd>
              Persistent=<V>true</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>[Install]</H>
            </Cmd>
            <Cmd>
              WantedBy=<V>timers.target</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Powiązany service</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># /etc/systemd/system/backup.service</Comment>
            <Cmd>
              <H>[Unit]</H>
            </Cmd>
            <Cmd>
              Description=<V>Skrypt backupu</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>[Service]</H>
            </Cmd>
            <Cmd>
              Type=<V>oneshot</V>
            </Cmd>
            <Cmd>
              ExecStart=<F>/usr/local/bin/backup.sh</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">OnCalendar — przykłady</SectionLabel>
          <Row code="*-*-* 02:00:00">Codziennie o 2:00</Row>
          <Row code="Mon *-*-* 09:00:00">Poniedziałki o 9:00</Row>
          <Row code="*-*-01 00:00:00">Pierwszy dzień miesiąca</Row>
          <Row code="hourly">Co godzinę</Row>
          <Row code="daily">Codziennie</Row>
          <Row code="weekly">Co tydzień</Row>
          <Divider />
          <ExampleBlock>
            <Comment># Aktywuj timer</Comment>
            <Cmd>
              systemctl <H>enable --now</H> <V>backup.timer</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Lista aktywnych timerow</Comment>
            <Cmd>
              systemctl <H>list-timers</H>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-xs text-[var(--c-yellow)]">
              Persistent=true
            </code>{' '}
            — jeśli system był wyłączony w czasie uruchomienia, zadanie wykona
            sie po starcie.
          </InfoBox>
        </Card>

        <Card title="Targety (runlevele)" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Targety grupuja unity i definiują stan systemu.
          </p>
          <Row code="poweroff.target" codeVariant="purple">
            Wyłączenie systemu (runlevel 0)
          </Row>
          <Row code="rescue.target" codeVariant="purple">
            Tryb awaryjny — single user (runlevel 1)
          </Row>
          <Row code="multi-user.target" codeVariant="purple">
            Tryb tekstowy z siecia (runlevel 3)
          </Row>
          <Row code="graphical.target" codeVariant="purple">
            Tryb graficzny — GUI (runlevel 5)
          </Row>
          <Row code="reboot.target" codeVariant="purple">
            Restart systemu (runlevel 6)
          </Row>
          <Divider />
          <ExampleBlock variant="purple">
            <Comment># Sprawdz domyślny target</Comment>
            <Cmd>
              systemctl <H>get-default</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Ustaw domyślny target</Comment>
            <Cmd>
              systemctl <H>set-default</H> <V>multi-user.target</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Przełącz na inny target (natychmiast)</Comment>
            <Cmd>
              systemctl <H>isolate</H> <V>rescue.target</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock>
            <Comment># Lista unitów w targecie</Comment>
            <Cmd>
              systemctl list-dependencies <V>multi-user.target</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Serwery produkcyjne zazwyczaj używają{' '}
            <code className="text-xs text-[var(--c-purple)]">
              multi-user.target
            </code>{' '}
            (bez GUI).
          </InfoBox>
        </Card>

        <Card title="Debugowanie" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Comment># Lista unitów z błędami</Comment>
            <Cmd>
              systemctl <H>list-units --failed</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Pokaż zawartość pliku unitu</Comment>
            <Cmd>
              systemctl <H>cat</H> <V>nginx.service</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Pokaż wszystkie właściwości unitu</Comment>
            <Cmd>
              systemctl <H>show</H> <V>nginx.service</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Pokaż konkretna właściwość</Comment>
            <Cmd>
              systemctl show <V>nginx</V> <H>-p</H> <V>ActiveState</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock>
            <Comment># Gdzie jest plik unitu?</Comment>
            <Cmd>
              systemctl show <V>nginx</V> <H>-p FragmentPath</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Drzewo zależności</Comment>
            <Cmd>
              systemctl <H>list-dependencies</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Czas bootowania — co trwało najdłużej</Comment>
            <Cmd>systemd-analyze</Cmd>
            <Cmd>
              systemd-analyze <H>blame</H>
            </Cmd>
            <Cmd>
              systemd-analyze <H>critical-chain</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock>
            <Comment># Zresetuj status "failed"</Comment>
            <Cmd>
              systemctl <H>reset-failed</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Sprawdz składnię pliku unitu</Comment>
            <Cmd>
              systemd-analyze <H>verify</H>{' '}
              <F>/etc/systemd/system/myapp.service</F>
            </Cmd>
          </ExampleBlock>
          <InfoBox warn>
            Jeśli usługa nie startuje, zawsze sprawdź logi:{' '}
            <code className="text-xs text-[var(--c-orange)]">
              journalctl -u nazwa -n 50 --no-pager
            </code>
          </InfoBox>
        </Card>

        <Card title="Przydatne komendy">
          <ExampleBlock variant="green">
            <Comment># Nazwa hosta</Comment>
            <Cmd>
              <H>hostnamectl</H>
            </Cmd>
            <Cmd>
              hostnamectl <H>set-hostname</H> <V>web-server-01</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Data, czas, strefa czasowa</Comment>
            <Cmd>
              <H>timedatectl</H>
            </Cmd>
            <Cmd>
              timedatectl <H>set-timezone</H> <V>Europe/Warsaw</V>
            </Cmd>
            <Cmd>
              timedatectl <H>set-ntp</H> <V>true</V>{' '}
              <span className="text-[var(--c-muted)]">
                # synchronizacja NTP
              </span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Lokalizacja i ustawienia klawiatury</Comment>
            <Cmd>
              <H>localectl</H>
            </Cmd>
            <Cmd>
              localectl <H>set-locale</H> <V>LANG=pl_PL.UTF-8</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Sesje użytkowników</Comment>
            <Cmd>
              <H>loginctl</H>
            </Cmd>
            <Cmd>
              loginctl <H>list-sessions</H>
            </Cmd>
            <Cmd>
              loginctl <H>show-user</H> <V>serwin</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock>
            <Comment># Reboot / shutdown przez systemctl</Comment>
            <Cmd>
              systemctl <H>reboot</H>
            </Cmd>
            <Cmd>
              systemctl <H>poweroff</H>
            </Cmd>
          </ExampleBlock>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/cheatsheets/networking', label: 'Networking' }}
        next={{ to: '/cheatsheets/ssh-welcome', label: 'SSH Welcome' }}
      />
    </div>
  );
}
