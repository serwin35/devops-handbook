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

export default function DockerCompose() {
  usePageTitle('Docker Compose');
  return (
    <div>
      <PageHeader
        title="Docker Compose"
        subtitle="services · depends_on · healthcheck · networks · volumes · profiles"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Po co Compose?" full>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Concept title="Wiele kontenerow razem">
              Web + db + cache + worker — jeden plik YAML, jedna komenda zamiast
              4 docker run.
            </Concept>
            <Concept title="Powtarzalnosc" color="var(--c-green)">
              Konfiguracja w Gicie. Kazdy developer dostaje identyczny stack
              przez <code className="text-xs">docker compose up</code>.
            </Concept>
            <Concept title="Sieci i woluminy" color="var(--c-purple)">
              Compose automatycznie tworzy siec i woluminy dla projektu. Serwisy
              widza sie po nazwie.
            </Concept>
            <Concept title="Profile" color="var(--c-yellow)">
              Wlaczaj/wylaczaj grupy serwisow (np. monitoring tylko gdy
              <code className="text-xs"> --profile monitoring</code>).
            </Concept>
          </div>
        </Card>

        <Card title="Minimalny compose.yml" color="var(--c-green)" full>
          <ExampleBlock variant="green">
            <Cmd>
              <H>services:</H>
            </Cmd>
            <Cmd>
              {'  '}
              <V>web:</V>
            </Cmd>
            <Cmd>
              {'    '}image: <F>nginx:1.27-alpine</F>
            </Cmd>
            <Cmd>{'    '}ports:</Cmd>
            <Cmd>
              {'      '}- <V>"8080:80"</V>
            </Cmd>
            <Cmd>
              {'  '}
              <V>db:</V>
            </Cmd>
            <Cmd>
              {'    '}image: <F>postgres:16-alpine</F>
            </Cmd>
            <Cmd>{'    '}environment:</Cmd>
            <Cmd>
              {'      '}POSTGRES_PASSWORD: <V>secret</V>
            </Cmd>
            <Cmd>{'    '}volumes:</Cmd>
            <Cmd>
              {'      '}- <V>db-data:/var/lib/postgresql/data</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>volumes:</H>
            </Cmd>
            <Cmd>
              {'  '}
              <V>db-data:</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Nazwa pliku <code className="text-xs">compose.yml</code> (nowa) lub{' '}
            <code className="text-xs">docker-compose.yml</code> (stara, tez
            dziala). Plik <code className="text-xs">compose.override.yml</code>
            jest auto-mergowany.
          </InfoBox>
        </Card>

        <Card title="Komendy compose" color="var(--c-blue)">
          <ExampleBlock variant="default">
            <Comment># Start w tle + budowa jesli trzeba</Comment>
            <Cmd>
              docker compose <H>up</H> <V>-d</V> --build
            </Cmd>
            <Cmd> </Cmd>
            <Comment>
              # Stop + usun kontenery i sieci (woluminy zostaja)
            </Comment>
            <Cmd>
              docker compose <H>down</H>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Stop + usun WSZYSTKO (z wolumenami!)</Comment>
            <Cmd>
              docker compose down <V>-v</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Status</Comment>
            <Cmd>
              docker compose <H>ps</H>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Logi (wszystkie lub konkretny serwis)</Comment>
            <Cmd>
              docker compose <H>logs -f</H>
            </Cmd>
            <Cmd>
              docker compose logs -f <V>web</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Shell w dzialajacym serwisie</Comment>
            <Cmd>
              docker compose <H>exec</H> web bash
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Jednorazowy run (np. migracje DB)</Comment>
            <Cmd>
              docker compose <H>run --rm</H> web rake db:migrate
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Restart konkretnego serwisu</Comment>
            <Cmd>
              docker compose <H>restart</H> web
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Przebuduj obrazy serwisow z build:</Comment>
            <Cmd>
              docker compose <H>build</H> <V>--no-cache</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="build vs image" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># Wariant 1: gotowy obraz z rejestru</Comment>
            <Cmd>
              {'  '}
              <V>web:</V>
            </Cmd>
            <Cmd>
              {'    '}image: <F>nginx:1.27-alpine</F>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Wariant 2: build lokalny + tag</Comment>
            <Cmd>
              {'  '}
              <V>app:</V>
            </Cmd>
            <Cmd>{'    '}build:</Cmd>
            <Cmd>
              {'      '}context: <V>./app</V>
            </Cmd>
            <Cmd>
              {'      '}dockerfile: <V>Dockerfile</V>
            </Cmd>
            <Cmd>{'      '}args:</Cmd>
            <Cmd>
              {'        '}NODE_ENV: <V>production</V>
            </Cmd>
            <Cmd>
              {'    '}image: <F>myapp:1.0</F>
              {'   '}
              <Comment># tag dla zbudowanego obrazu</Comment>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Gdy podasz oba: Compose buduje lokalnie z
            <code className="text-xs"> build:</code> i taguje wynik nazwa z{' '}
            <code className="text-xs"> image:</code>.
          </InfoBox>
        </Card>

        <Card title="depends_on + healthcheck" color="var(--c-orange)" full>
          <ExampleBlock variant="orange">
            <Cmd>
              {'  '}
              <V>db:</V>
            </Cmd>
            <Cmd>
              {'    '}image: <F>postgres:16-alpine</F>
            </Cmd>
            <Cmd>{'    '}environment: [POSTGRES_PASSWORD=secret]</Cmd>
            <Cmd>
              {'    '}
              <H>healthcheck:</H>
            </Cmd>
            <Cmd>
              {'      '}test: [<V>"CMD-SHELL"</V>,{' '}
              <V>"pg_isready -U postgres"</V>]
            </Cmd>
            <Cmd>
              {'      '}interval: <V>5s</V>
            </Cmd>
            <Cmd>
              {'      '}timeout: <V>3s</V>
            </Cmd>
            <Cmd>
              {'      '}retries: <V>10</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              {'  '}
              <V>api:</V>
            </Cmd>
            <Cmd>{'    '}image: myapi:1.0</Cmd>
            <Cmd>
              {'    '}
              <H>depends_on:</H>
            </Cmd>
            <Cmd>{'      '}db:</Cmd>
            <Cmd>
              {'        '}condition: <V>service_healthy</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="service_started">api startuje od razu po starcie db</Row>
          <Row code="service_healthy">api czeka az healthcheck db = OK</Row>
          <Row code="service_completed_successfully">
            api startuje po sukcesie joba
          </Row>
          <InfoBox>
            Bez <b>healthcheck + service_healthy</b> api czesto startuje zanim
            DB przyjmie polaczenia → losowe bledy startowe.
          </InfoBox>
        </Card>

        <Card title="Networks" color="var(--c-blue)">
          <ExampleBlock variant="default">
            <Cmd>
              <H>services:</H>
            </Cmd>
            <Cmd>
              {'  '}
              <V>web:</V>
            </Cmd>
            <Cmd>{'    '}image: nginx</Cmd>
            <Cmd>
              {'    '}networks: [<V>frontend</V>]
            </Cmd>
            <Cmd>
              {'  '}
              <V>api:</V>
            </Cmd>
            <Cmd>{'    '}image: myapi</Cmd>
            <Cmd>
              {'    '}networks: [<V>frontend</V>, <V>backend</V>]
            </Cmd>
            <Cmd>
              {'  '}
              <V>db:</V>
            </Cmd>
            <Cmd>{'    '}image: postgres</Cmd>
            <Cmd>
              {'    '}networks: [<V>backend</V>]
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>networks:</H>
            </Cmd>
            <Cmd>
              {'  '}
              <V>frontend:</V>
            </Cmd>
            <Cmd>
              {'  '}
              <V>backend:</V>
            </Cmd>
            <Cmd>
              {'    '}internal: <V>true</V>{' '}
              <Comment># bez NAT do swiata</Comment>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Web nie widzi db, api jest gateway'em. Sec by network segmentation w
            jednym pliku.
          </InfoBox>
        </Card>

        <Card title="env_file + zmienne" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Cmd>
              {'  '}
              <V>app:</V>
            </Cmd>
            <Cmd>{'    '}image: myapp</Cmd>
            <Cmd>{'    '}env_file:</Cmd>
            <Cmd>
              {'      '}- <V>.env</V>
            </Cmd>
            <Cmd>
              {'      '}- <V>.env.local</V>
            </Cmd>
            <Cmd>{'    '}environment:</Cmd>
            <Cmd>
              {'      '}NODE_ENV: <V>production</V>
            </Cmd>
            <Cmd>
              {'      '}DB_URL:{' '}
              <V>
                "postgres://${'{'}POSTGRES_USER{'}'}:${'{'}POSTGRES_PASSWORD
                {'}'}@db:5432/${'{'}POSTGRES_DB{'}'}"
              </V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="env_file">cala lista zmiennych z pliku</Row>
          <Row code="environment">pojedyncze (nadpisuje env_file)</Row>
          <Row code="${'{'}VAR{'}'}">interpolacja zmiennej z .env / shellu</Row>
          <InfoBox>
            <code className="text-xs">.env</code> w root projektu jest
            <b>automatycznie</b> wczytywany do interpolacji w compose.yml. Dodaj
            go do <code className="text-xs">.gitignore</code>.
          </InfoBox>
        </Card>

        <Card title="Profiles" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Cmd>
              {'  '}
              <V>web:</V>
            </Cmd>
            <Cmd>{'    '}image: nginx</Cmd>
            <Cmd> </Cmd>
            <Cmd>
              {'  '}
              <V>prometheus:</V>
            </Cmd>
            <Cmd>{'    '}image: prom/prometheus</Cmd>
            <Cmd>
              {'    '}profiles: [<V>monitoring</V>]
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              {'  '}
              <V>grafana:</V>
            </Cmd>
            <Cmd>{'    '}image: grafana/grafana</Cmd>
            <Cmd>
              {'    '}profiles: [<V>monitoring</V>]
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Standardowo: tylko web</Comment>
            <Cmd>docker compose up -d</Cmd>
            <Cmd> </Cmd>
            <Comment># Z monitoring stack</Comment>
            <Cmd>
              docker compose --profile <V>monitoring</V> up -d
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Restart policies" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Cmd>
              {'  '}
              <V>web:</V>
            </Cmd>
            <Cmd>{'    '}image: nginx</Cmd>
            <Cmd>
              {'    '}
              <H>restart:</H> <V>unless-stopped</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="no">domyslne, nigdy nie restartuje</Row>
          <Row code="always">zawsze, nawet po manualnym stop</Row>
          <Row code="on-failure">tylko gdy exit != 0</Row>
          <Row code="unless-stopped">
            jak always, ale szanuje manual stop (zalecane)
          </Row>
        </Card>

        <Card title="Resource limits" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Cmd>
              {'  '}
              <V>worker:</V>
            </Cmd>
            <Cmd>{'    '}image: myworker</Cmd>
            <Cmd>
              {'    '}
              <H>deploy:</H>
            </Cmd>
            <Cmd>{'      '}resources:</Cmd>
            <Cmd>{'        '}limits:</Cmd>
            <Cmd>
              {'          '}cpus: <V>"1.5"</V>
            </Cmd>
            <Cmd>
              {'          '}memory: <V>512M</V>
            </Cmd>
            <Cmd>{'        '}reservations:</Cmd>
            <Cmd>
              {'          '}memory: <V>256M</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Bez limitow jeden buggy serwis moze zjesc cala pamiec hosta i zabic
            inne. Zawsze ustaw <b>memory limit</b> na produkcji.
          </InfoBox>
        </Card>

        <Card title="Logging" color="var(--c-blue)">
          <ExampleBlock variant="default">
            <Cmd>
              {'  '}
              <V>web:</V>
            </Cmd>
            <Cmd>{'    '}image: nginx</Cmd>
            <Cmd>
              {'    '}
              <H>logging:</H>
            </Cmd>
            <Cmd>
              {'      '}driver: <V>json-file</V>
            </Cmd>
            <Cmd>{'      '}options:</Cmd>
            <Cmd>
              {'        '}max-size: <V>"10m"</V>
            </Cmd>
            <Cmd>
              {'        '}max-file: <V>"3"</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Zawsze</b> ustaw rotacje logow w produkcji — bez tego kontener
            moze zapelnic dysk hosta logami w kilka dni.
          </InfoBox>
        </Card>

        <Card title="Override / multi-env" color="var(--c-green)" full>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Bazowy <code className="text-xs">compose.yml</code> + nakladki per
            srodowisko. Merguje sie deklaratywnie.
          </p>
          <ExampleBlock variant="green">
            <Comment># compose.yml — bazowe</Comment>
            <Cmd>services:</Cmd>
            <Cmd>{'  '}web:</Cmd>
            <Cmd>{'    '}image: myapp:latest</Cmd>
            <Cmd>
              {'    '}ports: [<V>"8080:80"</V>]
            </Cmd>
            <Cmd> </Cmd>
            <Comment># compose.dev.yml — override dla developmentu</Comment>
            <Cmd>services:</Cmd>
            <Cmd>{'  '}web:</Cmd>
            <Cmd>
              {'    '}volumes: [<V>"./src:/app/src"</V>]{' '}
              <Comment># hot reload</Comment>
            </Cmd>
            <Cmd>
              {'    '}environment: [DEBUG=<V>true</V>]
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Uruchom z mergiem</Comment>
            <Cmd>docker compose -f compose.yml -f compose.dev.yml up -d</Cmd>
            <Cmd> </Cmd>
            <Comment># Lub: ENV COMPOSE_FILE</Comment>
            <Cmd>export COMPOSE_FILE=compose.yml:compose.dev.yml</Cmd>
            <Cmd>docker compose up -d</Cmd>
          </ExampleBlock>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/cheatsheets/docker', label: 'Docker Basics' }}
        next={{
          to: '/cheatsheets/docker-volumes-networks',
          label: 'Volumes & Networks',
        }}
      />
    </div>
  );
}
