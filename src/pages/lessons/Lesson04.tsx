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

export default function Lesson04() {
  usePageTitle('Lekcja 04');

  return (
    <div>
      <PageHeader
        title="04 — Administracja systemem: Procesy i Usługi"
        subtitle="init.d vs systemd · systemctl · procesy · PID · kill · monitorowanie · journalctl"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Card 1 — Systemy inicjujące */}
        <Card
          title="Systemy inicjujące: init.d vs systemd"
          color="var(--c-green)"
          full
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Concept title="System inicjujący (init)" color="var(--c-green)">
              Pierwszy proces uruchamiany przez jadro systemu (PID 1). Odpowiada
              za inicjalizacje systemu — uruchomienie usług (demonów) i
              przygotowanie środowiska do pracy.
            </Concept>
            <Concept title="Dwa podejścia" color="var(--c-purple)">
              <b>SysVinit (init.d)</b> — starszy, oparty na skryptach w{' '}
              <code>/etc/init.d/</code>. <b>systemd</b> — nowoczesny standard w
              Ubuntu, CentOS 7+, Debian, Fedora. Zarządza usługami poprzez
              "jednostki" (units).
            </Concept>
          </div>
        </Card>

        {/* Card 2 — init.d / SysVinit */}
        <Card title="init.d / SysVinit" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Klasyczny system init oparty na skryptach powłoki w{' '}
            <code className="text-xs">/etc/init.d/</code>. Zarządzanie usługami
            przez polecenie <code className="text-xs">service</code>.
          </p>
          <ExampleBlock variant="yellow">
            <Comment># sprawdzenie statusu usługi</Comment>
            <Cmd>
              sudo <H>service</H> <V>nginx</V> status
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># uruchomienie usługi</Comment>
            <Cmd>
              sudo <H>service</H> <V>nginx</V> start
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># zatrzymanie usługi</Comment>
            <Cmd>
              sudo <H>service</H> <V>nginx</V> stop
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># restart usługi</Comment>
            <Cmd>
              sudo <H>service</H> <V>nginx</V> restart
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Przepływ startu SysVinit</SectionLabel>
          <Row code="1">Uruchomienie systemu</Row>
          <Row code="2">Jądro Linux startuje</Row>
          <Row code="3">
            Proces <code>init</code> (PID 1)
          </Row>
          <Row code="4">
            <code>/etc/inittab</code> — poziomy uruchomienia
          </Row>
          <Row code="5">
            <code>/etc/init.d/</code> — skrypty startowe
          </Row>
          <Row code="6">Usługi: ssh, cron, nginx...</Row>
          <InfoBox>
            Chociaż systemd jest standardem, wciąż możesz spotkać init.d w
            starszych systemach — warto wiedzieć, jak działa.
          </InfoBox>
        </Card>

        {/* Card 3 — systemd i systemctl */}
        <Card title="systemd i systemctl" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Nowoczesny system init. Zarządza usługami, urządzeniami, punktami
            montowania za pomocą "jednostek" (units). Główna zaleta: równoległe
            uruchamianie usług.
          </p>
          <ExampleBlock variant="green">
            <Comment># sprawdź status usługi</Comment>
            <Cmd>
              sudo <H>systemctl</H> status <V>sshd</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># uruchom / zatrzymaj / restartuj</Comment>
            <Cmd>
              sudo <H>systemctl</H> start <V>sshd</V>
            </Cmd>
            <Cmd>
              sudo <H>systemctl</H> stop <V>sshd</V>
            </Cmd>
            <Cmd>
              sudo <H>systemctl</H> restart <V>sshd</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Autostart przy starcie systemu</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># włącz usługę na stałe</Comment>
            <Cmd>
              sudo systemctl <H>enable</H> <V>sshd</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># wyłącz autostart</Comment>
            <Cmd>
              sudo systemctl <H>disable</H> <V>sshd</V>
            </Cmd>
          </ExampleBlock>
          <div className="text-center mt-2">
            <Link
              to="/cheatsheets/systemd"
              className="text-[11px] text-[var(--c-accent)] hover:text-[var(--c-green)]"
            >
              Pełny cheatsheet systemd &rarr;
            </Link>
          </div>
        </Card>

        {/* Card 4 — Plik jednostki .service */}
        <Card title="Plik jednostki .service" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Jednostki systemd definiowane w plikach{' '}
            <code className="text-xs">.service</code>,{' '}
            <code className="text-xs">.socket</code>,{' '}
            <code className="text-xs">.timer</code> itd.
          </p>
          <ExampleBlock variant="purple">
            <Comment># /etc/systemd/system/moj-serwer.service</Comment>
            <Cmd>
              <H>[Unit]</H>
            </Cmd>
            <Cmd>
              <V>Description</V>=Moja prosta aplikacja webowa
            </Cmd>
            <Cmd>
              <V>After</V>=network.target
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Cmd>
              <H>[Service]</H>
            </Cmd>
            <Cmd>
              <V>User</V>=www-data
            </Cmd>
            <Cmd>
              <V>WorkingDirectory</V>=<F>/var/www/moja-aplikacja</F>
            </Cmd>
            <Cmd>
              <V>ExecStart</V>=
              <F>/usr/bin/python3 /var/www/moja-aplikacja/app.py</F>
            </Cmd>
            <Cmd>
              <V>Restart</V>=always
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Cmd>
              <H>[Install]</H>
            </Cmd>
            <Cmd>
              <V>WantedBy</V>=multi-user.target
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Po utworzeniu pliku</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># przeładuj konfigurację</Comment>
            <Cmd>
              sudo systemctl <H>daemon-reload</H>
            </Cmd>
            <Comment># włącz i uruchom</Comment>
            <Cmd>
              sudo systemctl <H>enable --now</H> <V>moj-serwer</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            AI tip: poproś narzędzie AI o wygenerowanie pliku .service — podaj
            ścieżkę do programu, użytkownika i krótki opis.
          </InfoBox>
        </Card>

        {/* Card 5 — Procesy w Linuksie */}
        <Card title="Procesy w Linuksie" color="var(--c-orange)">
          <Concept title="Czym jest proces?" color="var(--c-orange)">
            Instancja uruchomionego programu. Posiada własną przestrzeń pamięci,
            zasoby systemowe i unikalny identyfikator <b>PID</b>. Każdy proces
            (oprócz init) ma swój proces nadrzędny (PPID).
          </Concept>
          <Divider />
          <SectionLabel>Cykl życia procesu</SectionLabel>
          <Row code="fork()">proces macierzysty tworzy kopię siebie</Row>
          <Row code="exec()">nowy program zastępuje kopię</Row>
          <Row code="wait()">rodzic czeka na zakończenie potomka</Row>
          <Row code="exit()">
            proces kończy działanie (zombie do odczytu statusu)
          </Row>
          <Divider />
          <SectionLabel>Kluczowe polecenia</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># wszystkie procesy szczegółowo</Comment>
            <Cmd>
              <H>ps</H> aux
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># znajdź proces po nazwie</Comment>
            <Cmd>
              ps aux <H>|</H> grep <V>"cron"</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* Card 6 — Sygnały i kill */}
        <Card title="Sygnały i kill" color="var(--c-accent)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Polecenie <code className="text-xs">kill</code> wysyła sygnały do
            procesów — najczęściej aby je zakończyć.
          </p>
          <ExampleBlock variant="green">
            <Comment># grzeczne zakończenie (SIGTERM)</Comment>
            <Cmd>
              <H>kill</H> <V>1234</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># brutalne zakończenie (SIGKILL)</Comment>
            <Comment># proces nie ma szansy posprzątać!</Comment>
            <Cmd>
              kill <H>-9</H> <V>1234</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Procesy w tle</SectionLabel>
          <ExampleBlock>
            <Comment># uruchom w tle</Comment>
            <Cmd>
              ./skrypt.sh <H>&amp;</H>
            </Cmd>
          </ExampleBlock>
          <Row code="jobs">lista zadań w tle</Row>
          <Row code="bg">przenieś do tła</Row>
          <Row code="fg">przenieś na pierwszy plan</Row>
          <InfoBox>
            Dodaj <code className="text-xs">&amp;</code> na końcu polecenia aby
            uruchomić proces w tle. Zarządzaj za pomocą{' '}
            <code className="text-xs">jobs</code>,{' '}
            <code className="text-xs">bg</code>,{' '}
            <code className="text-xs">fg</code>.
          </InfoBox>
        </Card>

        {/* Card 7 — top / htop */}
        <Card
          title="Monitorowanie procesów: top / htop"
          color="var(--c-yellow)"
        >
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Interaktywne narzędzia do monitorowania procesów w czasie
            rzeczywistym. <code className="text-xs">htop</code> jest bardziej
            przyjazny dla użytkownika.
          </p>
          <ExampleBlock variant="yellow">
            <Comment># klasyczny monitor</Comment>
            <Cmd>
              <H>top</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># ładniejszy, interaktywny</Comment>
            <Cmd>
              <H>htop</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># top 5 procesów wg pamięci RAM</Comment>
            <Cmd>
              ps aux <H>--sort=-%mem</H> | head <V>-n 6</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            W DevOps monitorowanie to nie tylko zadanie administratorów —
            deweloperzy też powinni rozumieć, jak ich aplikacje wpływają na
            zasoby systemowe.
          </InfoBox>
        </Card>

        {/* Card 8 — Monitorowanie zasobów */}
        <Card title="Monitorowanie zasobów systemu" color="var(--c-purple)">
          <SectionLabel>Pamięć RAM i swap</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># użycie pamięci (human-readable)</Comment>
            <Cmd>
              <H>free</H> <V>-h</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Przestrzeń dyskowa</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># użycie dysku per partycja</Comment>
            <Cmd>
              <H>df</H> <V>-h</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Uptime i obciążenie</SectionLabel>
          <ExampleBlock>
            <Comment># czas pracy + load average</Comment>
            <Cmd>
              <H>uptime</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Porty sieciowe</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># otwarte porty TCP/UDP z nazwami procesów</Comment>
            <Cmd>
              sudo <H>ss</H> <V>-tulpn</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-xs">ss</code> to nowocześniejszy następca{' '}
            <code className="text-xs">netstat</code>. Flagi:{' '}
            <code className="text-xs">-t</code> TCP,{' '}
            <code className="text-xs">-u</code> UDP,{' '}
            <code className="text-xs">-l</code> listening,{' '}
            <code className="text-xs">-p</code> process,{' '}
            <code className="text-xs">-n</code> numeric.
          </InfoBox>
          <div className="text-center mt-2">
            <Link
              to="/cheatsheets/processes-monitoring"
              className="text-[11px] text-[var(--c-accent)] hover:text-[var(--c-green)]"
            >
              Pełny cheatsheet &rarr;
            </Link>
          </div>
        </Card>

        {/* Card 9 — journalctl */}
        <Card title="Analiza logów: journalctl" color="var(--c-accent)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Potężne narzędzie do przeglądania logów systemowych zbieranych przez{' '}
            <code className="text-xs">systemd</code>. Pozwala na zaawansowane
            filtrowanie.
          </p>
          <ExampleBlock variant="green">
            <Comment># logi konkretnej usługi w czasie rzeczywistym</Comment>
            <Cmd>
              sudo <H>journalctl</H> -u <V>nginx.service</V> <H>-f</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># logi z ostatniej godziny</Comment>
            <Cmd>
              sudo <H>journalctl</H> --since <V>"1 hour ago"</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># tylko błędy (error) lub wyższy priorytet</Comment>
            <Cmd>
              sudo <H>journalctl</H> -p <V>err</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># logi sshd z konkretnego przedziału</Comment>
            <Cmd>
              sudo journalctl -u <V>sshd</V> --since <V>"2025-03-10 15:00"</V>{' '}
              --until <V>"2025-03-10 16:00"</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            AI tip: masz dużo logów? Skopiuj fragment i wklej do narzędzia AI z
            prośbą: "Znajdź przyczynę błędu i zaproponuj rozwiązanie."
          </InfoBox>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/03', label: '03 — Wiersz poleceń i Bash' }}
        next={{ to: '/lessons/05', label: '05 — Wkrótce...' }}
      />
    </div>
  );
}
