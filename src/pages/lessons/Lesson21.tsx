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

export default function Lesson21() {
  usePageTitle('Lekcja 21 — Docker cz. 2');

  return (
    <div>
      <PageHeader
        title="Lekcja 21 — Architektura Dockera i mikroserwisow cz. 2"
        subtitle="woluminy · sieci · inspect · logi · debugging"
        color="var(--c-purple)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === Cele === */}
        <Card title="Cele lekcji" color="var(--c-purple)">
          <Concept title="Co poznasz?" color="var(--c-purple)">
            Jak <b>trwale</b> przechowywac dane (woluminy), jak laczyc kontenery{' '}
            <b>w sieci</b>, jak debugowac kontener przez
            <b> inspect i logi</b>.
          </Concept>
          <Divider />
          <Row code="1">Trwalosc danych: warstwa kontenera vs woluminy</Row>
          <Row code="2">Bind mount vs named volume vs tmpfs</Row>
          <Row code="3">VOLUME w Dockerfile</Row>
          <Row code="4">Sterowniki sieci: bridge / host / macvlan / none</Row>
          <Row code="5">DNS miedzy kontenerami (user-defined bridge)</Row>
          <Row code="6">docker inspect + --format</Row>
          <Row code="7">Logowanie demona i kontenera</Row>
        </Card>

        {/* === Dlaczego woluminy === */}
        <Card title="Dlaczego woluminy" color="var(--c-orange)">
          <Concept title="Kontener jest efemeryczny" color="var(--c-orange)">
            Kontener ma <b>warstwe zapisu</b> ponad warstwami obrazu. Po{' '}
            <code className="text-xs">docker rm</code> ta warstwa
            <b> znika</b> — wraz z baza danych, uploadami, configiem. Woluminy
            zyja <b>poza</b> kontenerem.
          </Concept>
          <Divider />
          <SectionLabel>Zalety woluminow</SectionLabel>
          <Row code="+">trwalosc — przezyje docker rm i restart</Row>
          <Row code="+">wspoldzielenie miedzy kontenerami</Row>
          <Row code="+">backup / migracja przez docker run --rm</Row>
          <Row code="+">sterowniki zewnetrzne (NFS, S3, EBS)</Row>
          <Divider />
          <InfoBox>
            Domyslnie woluminy zyja w
            <code className="text-xs"> /var/lib/docker/volumes/</code>
            na hoscie. Nie grzebaj tam recznie — uzywaj
            <code className="text-xs"> docker volume *</code>.
          </InfoBox>
        </Card>

        {/* === Typy mountow === */}
        <Card title="Typy mountow" color="var(--c-yellow)" full>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <SectionLabel>Bind mount</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)] mb-2">
                Konkretna sciezka z hosta -&gt; kontener. Wygodne w
                developmencie (hot reload).
              </p>
              <ExampleBlock variant="default">
                <Cmd>
                  docker run -v <V>$(pwd)/src:/app/src</V> myapp
                </Cmd>
                <Cmd>
                  docker run -v <V>/srv/www:/usr/share/nginx/html:ro</V> nginx
                </Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>Named volume</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)] mb-2">
                Wolumin zarzadzany przez Dockera. Zalecane do produkcji (bazy
                danych).
              </p>
              <ExampleBlock variant="yellow">
                <Cmd>docker volume create pg-data</Cmd>
                <Cmd>
                  docker run -v <V>pg-data:/var/lib/postgresql/data</V> postgres
                </Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>tmpfs</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)] mb-2">
                W RAM, znika po stopie. Sekrety w pamieci, cache.
              </p>
              <ExampleBlock variant="default">
                <Cmd>
                  docker run --tmpfs <V>/run/secrets</V> myapp
                </Cmd>
              </ExampleBlock>
            </div>
          </div>
        </Card>

        {/* === Polecenia volume === */}
        <Card title="Polecenia: docker volume" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># Utworz nazwany wolumin</Comment>
            <Cmd>
              docker volume <H>create</H> <V>pg-data</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Lista i szczegoly</Comment>
            <Cmd>
              docker volume <H>ls</H>
            </Cmd>
            <Cmd>
              docker volume <H>inspect</H> pg-data
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Wolumin na zewnetrznym sterowniku</Comment>
            <Cmd>
              docker volume create <H>--driver</H> local-persist{' '}
              <V>--name s3-backup</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Usun konkretny / nieuzywane</Comment>
            <Cmd>
              docker volume <H>rm</H> pg-data
            </Cmd>
            <Cmd>
              docker volume <H>prune</H>
              {'   '}
              <Comment># tylko nieuzywane</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Wspoldzielenie tego samego wolumenu</Comment>
            <Cmd>docker run -d -v pg-data:/var/lib/mysql --name db1 mysql</Cmd>
            <Cmd>docker run -d -v pg-data:/var/lib/mysql --name db2 mysql</Cmd>
          </ExampleBlock>
        </Card>

        {/* === VOLUME w Dockerfile === */}
        <Card title="VOLUME w Dockerfile" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Cmd>
              <H>FROM</H> mysql:8
            </Cmd>
            <Cmd>
              <H>VOLUME</H> /var/lib/mysql
            </Cmd>
            <Cmd>
              <H>EXPOSE</H> 3306
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="VOLUME">Tworzy anonimowy wolumin przy starcie</Row>
          <Row code="-v name:path">Nadpisuje go nazwanym wolumenem</Row>
          <Row code="--mount">
            Bardziej eksplicytna skladnia (rekomendowane)
          </Row>
          <InfoBox>
            <b>--mount</b> jest jaśniejszy od
            <code className="text-xs"> -v</code>:
            <code className="text-xs">
              {' '}
              --mount type=volume,src=pg,dst=/var/lib/postgresql/data
            </code>
          </InfoBox>
        </Card>

        {/* === Backup/restore === */}
        <Card title="Backup i restore wolumenu" color="var(--c-green)" full>
          <ExampleBlock variant="green">
            <Comment>
              # Backup wolumenu pg-data do tar.gz w biezacym katalogu
            </Comment>
            <Cmd>docker run --rm \</Cmd>
            <Cmd>{'  '}-v pg-data:/data \</Cmd>
            <Cmd>
              {'  '}-v <V>$(pwd)</V>:/backup \
            </Cmd>
            <Cmd>{'  '}ubuntu \</Cmd>
            <Cmd>{'  '}tar czf /backup/pg-data.tar.gz -C /data .</Cmd>
            <Cmd> </Cmd>
            <Comment># Restore z tar.gz do nowego wolumenu</Comment>
            <Cmd>docker volume create pg-data-new</Cmd>
            <Cmd>docker run --rm \</Cmd>
            <Cmd>{'  '}-v pg-data-new:/data \</Cmd>
            <Cmd>
              {'  '}-v <V>$(pwd)</V>:/backup \
            </Cmd>
            <Cmd>{'  '}ubuntu \</Cmd>
            <Cmd>{'  '}tar xzf /backup/pg-data.tar.gz -C /data</Cmd>
          </ExampleBlock>
          <InfoBox>
            Wzorzec: krotkozyjacy kontener montuje wolumin DB + katalog hosta,
            robi tar i ginie. Tak samo restore.
          </InfoBox>
        </Card>

        {/* === Sieci === */}
        <Card title="Model sieci Dockera" color="var(--c-blue)" full>
          <Concept title="Bridge + virtual ethernet" color="var(--c-blue)">
            Kazdy kontener dostaje wirtualny interfejs sieciowy podlaczony do
            mostu <code className="text-xs">docker0</code>. Most odpowiada za
            NAT do swiata zewnetrznego.
          </Concept>
          <Divider />
          <ExampleBlock variant="default">
            <Cmd>
              Kontener (eth0) &lt;-virtual eth-&gt; docker0 (bridge)
              &lt;-NAT-&gt; Host (eth0)
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="bridge">domyslny, izolowana siec hosta z NAT</Row>
          <Row code="host">brak izolacji, kontener uzywa stosu hosta</Row>
          <Row code="macvlan">
            wlasny adres MAC, wyglada jak osobne urzadzenie LAN
          </Row>
          <Row code="none">brak sieci (kontener offline)</Row>
          <Row code="overlay">multi-host (Swarm / Kubernetes)</Row>
        </Card>

        {/* === User-defined bridge === */}
        <Card title="User-defined bridge + DNS" color="var(--c-green)">
          <Concept title="Po nazwie, nie po IP" color="var(--c-green)">
            Domyslny <code className="text-xs">bridge</code> nie ma DNS.
            <b>Wlasna</b> siec bridge automatycznie rozwiazuje nazwy kontenerow
            — mozesz pingowac/curl-owac po nazwie.
          </Concept>
          <Divider />
          <ExampleBlock variant="green">
            <Comment># Utworz wlasna siec</Comment>
            <Cmd>
              docker network <H>create</H> moja-siec
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Uruchom 2 kontenery w tej samej sieci</Comment>
            <Cmd>docker run -d --network moja-siec --name web nginx</Cmd>
            <Cmd>docker run -it --network moja-siec --name app ubuntu bash</Cmd>
            <Cmd> </Cmd>
            <Comment># Z 'app' mozesz curl po nazwie</Comment>
            <Cmd>
              curl http://<V>web</V>
            </Cmd>
            <Cmd>
              ping <V>web</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Polecenia network === */}
        <Card title="Polecenia: docker network" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Cmd>
              docker network <H>ls</H>
              {'                       '}
              <Comment># lista sieci</Comment>
            </Cmd>
            <Cmd>
              docker network <H>inspect</H> moja-siec{'      '}
              <Comment># szczegoly</Comment>
            </Cmd>
            <Cmd>
              docker network <H>create</H> -d bridge api-net
            </Cmd>
            <Cmd>
              docker network <H>connect</H> moja-siec web
            </Cmd>
            <Cmd>
              docker network <H>disconnect</H> moja-siec web
            </Cmd>
            <Cmd>
              docker network <H>rm</H> moja-siec
            </Cmd>
            <Cmd>
              docker network <H>prune</H>
              {'                  '}
              <Comment># nieuzywane</Comment>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Kontener moze byc podlaczony do <b>wielu sieci</b>
            jednoczesnie — uzyteczne dla web/api/db splitu.
          </InfoBox>
        </Card>

        {/* === Inspect === */}
        <Card title="docker inspect (debug)" color="var(--c-purple)" full>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Wszystko o kontenerze w JSON. Z
            <code className="text-xs"> --format</code> (Go template) wyciagasz
            konkretne pole.
          </p>
          <ExampleBlock variant="purple">
            <Comment># Pelny JSON</Comment>
            <Cmd>docker inspect web</Cmd>
            <Cmd> </Cmd>
            <Comment># IP kontenera</Comment>
            <Cmd>
              docker inspect -f{' '}
              <V>
                '{'{'}
                {'{'} range .NetworkSettings.Networks {'}'}
                {'}'}
                {'{'}
                {'{'} .IPAddress {'}'}
                {'}'}
                {'{'}
                {'{'} end {'}'}
                {'}'} '
              </V>{' '}
              web
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Przekierowane porty</Comment>
            <Cmd>
              docker inspect --format=
              <V>
                '{'{'}
                {'{'} range $p, $conf := .NetworkSettings.Ports {'}'}
                {'}'}
                {'{'}
                {'{'} $p {'}'}
                {'}'} -&gt; {'{'}
                {'{'}(index $conf 0).HostPort{'}'}
                {'}'} {'{'}
                {'{'} end {'}'}
                {'}'}'
              </V>{' '}
              web
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Zamontowane woluminy</Comment>
            <Cmd>
              docker inspect --format=
              <V>
                '{'{'}
                {'{'} range $m := .Mounts {'}'}
                {'}'} {'{'}
                {'{'}$m.Source{'}'}
                {'}'} -&gt; {'{'}
                {'{'}$m.Destination{'}'}
                {'}'} {'{'}
                {'{'} end {'}'}
                {'}'}'
              </V>{' '}
              web
            </Cmd>
            <Cmd> </Cmd>
            <Comment># ENV kontenera</Comment>
            <Cmd>
              docker inspect --format=
              <V>
                '{'{'}
                {'{'} range $e := .Config.Env {'}'}
                {'}'} {'{'}
                {'{'}$e{'}'}
                {'}'} {'{'}
                {'{'} end {'}'}
                {'}'}'
              </V>{' '}
              web
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Komenda startowa</Comment>
            <Cmd>
              docker inspect --format=
              <V>
                '{'{'}
                {'{'} .Config.Cmd {'}'}
                {'}'}'
              </V>{' '}
              web
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Te same szablony dzialaja dla
            <code className="text-xs"> docker network inspect</code>,
            <code className="text-xs"> docker volume inspect</code>i{' '}
            <code className="text-xs"> docker image inspect</code>.
          </InfoBox>
        </Card>

        {/* === Logi kontenera === */}
        <Card title="Logi kontenera" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Pelne logi do tej pory</Comment>
            <Cmd>
              docker <H>logs</H> web
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Na zywo (Ctrl+C wychodzi)</Comment>
            <Cmd>
              docker logs <H>-f</H> web
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Ostatnie N linii</Comment>
            <Cmd>
              docker logs <H>--tail 50</H> web
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Logi od konkretnego czasu</Comment>
            <Cmd>
              docker logs <H>--since 30m</H> web
            </Cmd>
            <Cmd>
              docker logs <H>--since 2026-05-16T08:00:00</H> web
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Razem: tail + follow + timestamps</Comment>
            <Cmd>docker logs -f --tail 100 --timestamps web</Cmd>
          </ExampleBlock>
          <InfoBox>
            Docker zbiera stdout/stderr procesu PID 1.
            <b> Loguj do stdout</b>, nie do pliku — log driver hosta zrobi
            reszte (json-file, journald, fluentd, ...).
          </InfoBox>
        </Card>

        {/* === Logi demona === */}
        <Card title="Logi demona Docker" color="var(--c-blue)">
          <SectionLabel>Poziomy</SectionLabel>
          <Row code="debug">wszystko + traceing</Row>
          <Row code="info">domyslny, info + bledy</Row>
          <Row code="error">tylko bledy</Row>
          <Row code="fatal">tylko krytyczne</Row>
          <Divider />
          <ExampleBlock variant="default">
            <Comment># Recznie z poziomem debug</Comment>
            <Cmd>sudo service docker stop</Cmd>
            <Cmd>sudo dockerd -l debug &amp;</Cmd>
            <Cmd> </Cmd>
            <Comment># Albo stale w /etc/docker/daemon.json:</Comment>
            <Cmd>{`{`}</Cmd>
            <Cmd>
              {'  '}
              <V>"debug"</V>: true,
            </Cmd>
            <Cmd>
              {'  '}
              <V>"log-level"</V>: <V>"debug"</V>
            </Cmd>
            <Cmd>{`}`}</Cmd>
            <Cmd>sudo systemctl restart docker</Cmd>
            <Cmd> </Cmd>
            <Comment># Logi demona</Comment>
            <Cmd>journalctl -u docker -f</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Best practices === */}
        <Card title="Best practices" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Woluminy</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>
                  Bazy danych <b>zawsze</b> w named volume
                </li>
                <li>Bind mount tylko w developmencie / configi</li>
                <li>Static content do CDN, nie do volume</li>
                <li>Regularny backup wolumenow bazodanowych</li>
              </ul>
              <SectionLabel className="mt-2">Sieci</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>User-defined bridge zamiast domyslnego</li>
                <li>Splituj na strefy (web / app / db)</li>
                <li>Nie expose tego, czego nie musisz</li>
                <li>Wewnetrzne API tylko w sieci docker</li>
              </ul>
            </div>
            <div>
              <SectionLabel>Debug</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Loguj do stdout (12-factor)</li>
                <li>
                  <code className="text-xs">docker logs --tail</code> przy
                  alarmach
                </li>
                <li>
                  <code className="text-xs">inspect --format</code> w skryptach
                  monitoringu
                </li>
                <li>
                  <code className="text-xs">docker stats</code> dla zasobow
                </li>
              </ul>
              <SectionLabel className="mt-2">Produkcja</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Healthchecki (HEALTHCHECK w Dockerfile)</li>
                <li>
                  <code className="text-xs">--restart unless-stopped</code>
                </li>
                <li>
                  Limity zasobow (<code className="text-xs">--memory</code>,{' '}
                  <code className="text-xs">--cpus</code>)
                </li>
                <li>Rotacja logow (max-size + max-file)</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* === Slownik === */}
        <Card title="Slownik" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <SectionLabel>Volume</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Trwale przechowywanie danych poza warstwa kontenera.
              </p>
            </div>
            <div>
              <SectionLabel>Bind mount</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Konkretna sciezka hosta zamontowana w kontenerze.
              </p>
            </div>
            <div>
              <SectionLabel>tmpfs</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Mount w RAM, znika po stopie kontenera.
              </p>
            </div>
            <div>
              <SectionLabel>Bridge</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Domyslny driver sieci, izolowany NAT na hoscie.
              </p>
            </div>
            <div>
              <SectionLabel>Host network</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Kontener wspoldzieli stos sieciowy hosta (bez NAT).
              </p>
            </div>
            <div>
              <SectionLabel>Macvlan</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Kontener z wlasnym MAC, wyglada jak osobne urzadzenie LAN.
              </p>
            </div>
            <div>
              <SectionLabel>docker inspect</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Pelne info o obiekcie Dockera w JSON.
              </p>
            </div>
            <div>
              <SectionLabel>--format</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Szablon Go do wyciagania konkretnych pol z JSON.
              </p>
            </div>
            <div>
              <SectionLabel>Log driver</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                json-file / journald / fluentd / syslog / awslogs ...
              </p>
            </div>
          </div>
        </Card>

        {/* === Dokumentacja === */}
        <Card title="Dokumentacja" color="var(--c-purple)">
          <ul className="text-[11px] text-[var(--c-muted)] space-y-1">
            <li>
              <a
                href="https://docs.docker.com/storage/volumes/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Docker Volumes
              </a>
            </li>
            <li>
              <a
                href="https://docs.docker.com/network/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Docker Networking
              </a>
            </li>
            <li>
              <a
                href="https://docs.docker.com/config/containers/logging/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Docker Logging
              </a>
            </li>
            <li>
              <a
                href="https://docs.docker.com/engine/reference/commandline/inspect/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                docker inspect (CLI reference)
              </a>
            </li>
          </ul>
        </Card>
      </div>

      <LessonNav prev={{ to: '/lessons/20', label: '20 — Docker cz. 1' }} />
    </div>
  );
}
