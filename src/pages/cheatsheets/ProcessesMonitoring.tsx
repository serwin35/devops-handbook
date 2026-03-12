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

export default function ProcessesMonitoring() {
  usePageTitle('Procesy i Monitorowanie');

  return (
    <div>
      <PageHeader
        title="Procesy i Monitorowanie"
        subtitle="ps · pstree · kill · top · htop · free · df · uptime · ss · lsof"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Card 1 — ps */}
        <Card title="ps — lista procesów" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># wszystkie procesy (pełny format)</Comment>
            <Cmd>
              <H>ps</H> aux
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># drzewko procesów</Comment>
            <Cmd>
              ps aux <H>--forest</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># drzewko procesów (dedykowane narzędzie)</Comment>
            <Cmd>
              <H>pstree</H> <V>-p</V>
            </Cmd>
            <Comment># -p = pokaż PID przy każdym procesie</Comment>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># procesy konkretnego użytkownika</Comment>
            <Cmd>
              ps <H>-u</H> <V>www-data</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># znajdź proces po nazwie</Comment>
            <Cmd>
              ps aux | grep <V>"nginx"</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Kolumny ps aux</SectionLabel>
          <Row code="USER">właściciel procesu</Row>
          <Row code="PID">identyfikator procesu</Row>
          <Row code="%CPU">zużycie procesora</Row>
          <Row code="%MEM">zużycie pamięci</Row>
          <Row code="VSZ">pamięć wirtualna (KB)</Row>
          <Row code="RSS">pamięć fizyczna (KB)</Row>
          <Row code="STAT">stan procesu (S=sleep, R=run, Z=zombie)</Row>
          <Row code="COMMAND">komenda uruchamiająca</Row>
        </Card>

        {/* Card 2 — kill i sygnały */}
        <Card title="kill — sygnały do procesów" color="var(--c-orange)">
          <ExampleBlock variant="green">
            <Comment># grzeczne zakończenie (SIGTERM)</Comment>
            <Cmd>
              <H>kill</H> <V>1234</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># brutalne zakończenie (SIGKILL)</Comment>
            <Cmd>
              kill <H>-9</H> <V>1234</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># zakończ po nazwie procesu</Comment>
            <Cmd>
              <H>killall</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># zakończ po wzorcu nazwy</Comment>
            <Cmd>
              <H>pkill</H> -f <V>"python app.py"</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Popularne sygnały</SectionLabel>
          <Row code="SIGTERM (15)">grzeczne zakończenie (domyślne)</Row>
          <Row code="SIGKILL (9)">
            natychmiastowe zabicie (nie można zignorować)
          </Row>
          <Row code="SIGHUP (1)">przeładuj konfigurację</Row>
          <Row code="SIGSTOP (19)">zatrzymaj (pause)</Row>
          <Row code="SIGCONT (18)">wznów zatrzymany proces</Row>
          <InfoBox warn>
            <code className="text-xs">kill -9</code> to ostateczność — proces
            nie ma szansy posprzątać (zamknąć plików, zwolnić zasobów). Zawsze
            najpierw spróbuj <code className="text-xs">kill</code> (SIGTERM).
          </InfoBox>
        </Card>

        {/* Card 3 — top / htop */}
        <Card title="top / htop — monitor na żywo" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># klasyczny monitor procesów</Comment>
            <Cmd>
              <H>top</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># jednorazowy snapshot</Comment>
            <Cmd>
              top <H>-b -n 1</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># kolorowy, interaktywny (wymaga instalacji)</Comment>
            <Cmd>
              <H>htop</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Skróty w top</SectionLabel>
          <Row code="P">sortuj po CPU</Row>
          <Row code="M">sortuj po pamięci</Row>
          <Row code="k">kill procesu (wpisz PID)</Row>
          <Row code="q">wyjdź</Row>
          <Row code="1">pokaż każdy rdzeń CPU osobno</Row>
          <Divider />
          <SectionLabel>Sortowanie przez ps</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># top 5 procesów wg RAM</Comment>
            <Cmd>
              ps aux <H>--sort=-%mem</H> | head -n <V>6</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># top 5 procesów wg CPU</Comment>
            <Cmd>
              ps aux <H>--sort=-%cpu</H> | head -n <V>6</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* Card 4 — Procesy w tle */}
        <Card title="Procesy w tle" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Comment># uruchom w tle</Comment>
            <Cmd>
              ./skrypt.sh <H>&amp;</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Ctrl+Z zatrzymuje bieżący proces</Comment>
            <Comment># przenieś do tła</Comment>
            <Cmd>
              <H>bg</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># przywróć na pierwszy plan</Comment>
            <Cmd>
              <H>fg</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># lista zadań w tle</Comment>
            <Cmd>
              <H>jobs</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="green">
            <Comment># nohup — przetrwa zamknięcie terminala</Comment>
            <Cmd>
              <H>nohup</H> ./skrypt.sh <H>&amp;</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># disown — odłącz od sesji</Comment>
            <Cmd>./długi-proces.sh &amp;</Cmd>
            <Cmd>
              <H>disown</H>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-xs">nohup</code> +{' '}
            <code className="text-xs">&amp;</code> = proces działa dalej nawet
            po wylogowaniu. Output ląduje w{' '}
            <code className="text-xs">nohup.out</code>.
          </InfoBox>
        </Card>

        {/* Card 5 — Pamięć */}
        <Card title="free — pamięć RAM i swap" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># human-readable</Comment>
            <Cmd>
              <H>free</H> <V>-h</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># odświeżaj co 2 sekundy</Comment>
            <Cmd>
              free -h <H>-s 2</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Kolumny free</SectionLabel>
          <Row code="total">całkowita pamięć</Row>
          <Row code="used">używana</Row>
          <Row code="free">wolna (nieużywana)</Row>
          <Row code="buff/cache">bufory i cache (do odzyskania)</Row>
          <Row code="available">dostępna dla aplikacji</Row>
          <InfoBox>
            Linux agresywnie cache'uje dane w RAM. Ważna jest kolumna{' '}
            <code className="text-xs">available</code>, nie{' '}
            <code className="text-xs">free</code> — cache jest automatycznie
            zwalniany gdy potrzeba.
          </InfoBox>
        </Card>

        {/* Card 6 — Dysk */}
        <Card title="df / du — przestrzeń dyskowa" color="var(--c-accent)">
          <SectionLabel>df — wolne miejsce per partycja</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              <H>df</H> <V>-h</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># tylko lokalne systemy plików</Comment>
            <Cmd>
              df -h <H>-l</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>du — rozmiar katalogów</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># rozmiar katalogu (summary)</Comment>
            <Cmd>
              <H>du</H> <V>-sh</V> <F>/var/log</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># top 10 największych katalogów</Comment>
            <Cmd>
              du -sh <F>/var/*</F> | sort <H>-rh</H> | head <V>-10</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># znajdź pliki &gt; 100MB</Comment>
            <Cmd>
              find <F>/</F> -type f -size <H>+100M</H> 2&gt;/dev/null
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Flagi: <code className="text-xs">-s</code> summary,{' '}
            <code className="text-xs">-h</code> human-readable,{' '}
            <code className="text-xs">-r</code> reverse (malejąco).
          </InfoBox>
        </Card>

        {/* Card 7 — uptime & load */}
        <Card title="uptime i load average" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Cmd>
              <H>uptime</H>
            </Cmd>
            <Comment>
              # 14:23:05 up 42 days, load average: 0.15, 0.10, 0.09
            </Comment>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Load average — co oznacza?</SectionLabel>
          <Concept title="3 liczby = 1min, 5min, 15min" color="var(--c-yellow)">
            Średnia liczba procesów czekających na CPU. Wartość 1.0 na
            jednordzeniowym CPU = 100% obciążenia. Na 4 rdzeniach: 4.0 = 100%.
          </Concept>
          <Divider />
          <Row code="< liczba rdzeni">system OK</Row>
          <Row code="= liczba rdzeni">pełne obciążenie</Row>
          <Row code="> liczba rdzeni">przeciążenie!</Row>
          <ExampleBlock>
            <Comment># ile rdzeni masz?</Comment>
            <Cmd>
              <H>nproc</H>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* Card 8 — ss / porty sieciowe */}
        <Card title="ss — porty i połączenia sieciowe" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Nowocześniejszy następca <code className="text-xs">netstat</code>.
            Szybszy i z większą ilością informacji.
          </p>
          <ExampleBlock variant="purple">
            <Comment># otwarte porty TCP/UDP z procesami</Comment>
            <Cmd>
              sudo <H>ss</H> <V>-tulpn</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># tylko TCP listening</Comment>
            <Cmd>
              ss <H>-tln</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># aktywne połączenia TCP</Comment>
            <Cmd>
              ss <H>-tn</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># połączenia na konkretnym porcie</Comment>
            <Cmd>
              ss -tn <H>sport = :443</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Flagi ss</SectionLabel>
          <Row code="-t">TCP</Row>
          <Row code="-u">UDP</Row>
          <Row code="-l">listening (nasłuchujące)</Row>
          <Row code="-p">pokaż nazwę procesu</Row>
          <Row code="-n">numeryczne (nie tłumacz na nazwy)</Row>
          <Row code="-a">wszystkie (listening + established)</Row>
        </Card>

        {/* Card 9 — lsof + dodatkowe */}
        <Card title="lsof i inne narzędzia" color="var(--c-orange)">
          <SectionLabel>lsof — kto używa pliku/portu</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># kto nasłuchuje na porcie 80?</Comment>
            <Cmd>
              sudo <H>lsof</H> -i <V>:80</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># otwarte pliki przez proces</Comment>
            <Cmd>
              lsof -p <V>1234</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># kto trzyma plik otwarty?</Comment>
            <Cmd>
              lsof <F>/var/log/syslog</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>vmstat — przegląd systemu</SectionLabel>
          <ExampleBlock>
            <Comment># odświeżaj co 1 sekundę</Comment>
            <Cmd>
              <H>vmstat</H> <V>1</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>iostat — obciążenie dysków</SectionLabel>
          <ExampleBlock>
            <Cmd>
              <H>iostat</H> <V>-xh 1</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-xs">lsof</code> to must-have przy debugowaniu
            — "kto blokuje port?", "kto ma otwarty ten plik?".
          </InfoBox>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/cheatsheets/systemd', label: 'Systemd' }}
        next={{ to: '/cheatsheets/ssh-welcome', label: 'SSH Welcome' }}
      />
    </div>
  );
}
