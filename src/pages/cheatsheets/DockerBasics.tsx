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

export default function DockerBasics() {
  usePageTitle('Docker Basics');
  return (
    <div>
      <PageHeader
        title="Docker Basics"
        subtitle="Kontenery · obrazy · wolumeny · sieci · Dockerfile · compose"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Docker — jak to dziala?" full>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Concept title="Image (Obraz)">
              Szablon tylko-do-odczytu. Zawiera OS, zaleznosci, kod aplikacji.
              Budowany z Dockerfile.
            </Concept>
            <Concept title="Container" color="var(--c-green)">
              Uruchomiona instancja obrazu. Izolowany proces z wlasnym FS,
              siecia, PID. Lekki i efemeryczny.
            </Concept>
            <Concept title="Volume" color="var(--c-purple)">
              Trwale dane poza kontenerem. Przezywa restart i usuwanie
              kontenerow.
            </Concept>
            <Concept title="Network" color="var(--c-yellow)">
              Kontenery komunikuja sie przez wirtualne sieci. Domyslnie bridge,
              mozna tworzyc wlasne.
            </Concept>
          </div>
        </Card>

        <Card title="Kontenery — uruchamianie" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Uruchom kontener</Comment>
            <Cmd>
              docker <H>run</H> <V>nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Interaktywny shell w kontenerze</Comment>
            <Cmd>
              docker run <H>-it</H> <V>ubuntu</V> <F>/bin/bash</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># W tle + port mapping + nazwa</Comment>
            <Cmd>
              docker run <H>-d</H> <V>-p 8080:80</V> <F>--name moj-nginx</F>{' '}
              nginx
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Ze zmiennymi srodowiskowymi</Comment>
            <Cmd>
              docker run <H>-e</H> <V>MYSQL_ROOT_PASSWORD=secret</V> mysql
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Z woluminem</Comment>
            <Cmd>
              docker run <H>-v</H> <V>./dane:/app/data</V> myapp
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="-d" codeVariant="green">
            detached — w tle
          </Row>
          <Row code="-it" codeVariant="green">
            interaktywny terminal
          </Row>
          <Row code="-p 8080:80" codeVariant="green">
            port hosta:port kontenera
          </Row>
          <Row code="--name" codeVariant="green">
            nadaj nazwe kontenerowi
          </Row>
          <Row code="-e KEY=VAL" codeVariant="green">
            zmienna srodowiskowa
          </Row>
          <Row code="-v src:dst" codeVariant="green">
            bind mount / wolumin
          </Row>
          <Row code="--rm" codeVariant="green">
            usun kontener po zakonczeniu
          </Row>
          <Row code="--restart always" codeVariant="green">
            auto-restart po crashu/reboot
          </Row>
        </Card>

        <Card title="Zarzadzanie kontenerami">
          <ExampleBlock>
            <Comment># Lista uruchomionych</Comment>
            <Cmd>
              docker <H>ps</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Lista WSZYSTKICH (tez zatrzymanych)</Comment>
            <Cmd>
              docker ps <H>-a</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Zatrzymaj / uruchom / restart</Comment>
            <Cmd>
              docker <H>stop</H> <V>moj-nginx</V>
            </Cmd>
            <Cmd>
              docker <H>start</H> <V>moj-nginx</V>
            </Cmd>
            <Cmd>
              docker <H>restart</H> <V>moj-nginx</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Usun kontener</Comment>
            <Cmd>
              docker <H>rm</H> <V>moj-nginx</V>
            </Cmd>
            <Cmd>
              docker rm <H>-f</H> moj-nginx{' '}
              <span className="text-[var(--c-muted)]">
                # force (dzialajacy)
              </span>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock>
            <Comment># Logi kontenera</Comment>
            <Cmd>
              docker <H>logs</H> <V>moj-nginx</V>
            </Cmd>
            <Cmd>
              docker logs <H>-f</H> moj-nginx{' '}
              <span className="text-[var(--c-muted)]"># follow (na zywo)</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Wejdz do dzialajacego kontenera</Comment>
            <Cmd>
              docker <H>exec -it</H> <V>moj-nginx</V> <F>/bin/bash</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Statystyki zuzycia zasobow</Comment>
            <Cmd>
              docker <H>stats</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Szczegoly kontenera (IP, mounts, env...)</Comment>
            <Cmd>
              docker <H>inspect</H> <V>moj-nginx</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Obrazy (Images)" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># Pobierz obraz z Docker Hub</Comment>
            <Cmd>
              docker <H>pull</H> <V>nginx:alpine</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Lista lokalnych obrazow</Comment>
            <Cmd>
              docker <H>images</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Zbuduj obraz z Dockerfile</Comment>
            <Cmd>
              docker <H>build</H> <V>-t myapp:1.0</V> <F>.</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Tagowanie obrazu</Comment>
            <Cmd>
              docker <H>tag</H> <V>myapp:1.0</V> <F>user/myapp:latest</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Wypchnij na Docker Hub</Comment>
            <Cmd>
              docker <H>push</H> <V>user/myapp:latest</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Usun obraz</Comment>
            <Cmd>
              docker <H>rmi</H> <V>nginx:alpine</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-xs text-[var(--c-purple)]">nginx:alpine</code>{' '}
            — <b>nazwa:tag</b>. Brak tagu = :latest. Alpine = ~5MB.
          </InfoBox>
        </Card>

        <Card title="Dockerfile" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Przepis na budowanie obrazu — warstwa po warstwie.
          </p>
          <ExampleBlock variant="yellow">
            <Comment># Przykladowy Dockerfile</Comment>
            <Cmd>
              <H>FROM</H> <V>node:20-alpine</V>
            </Cmd>
            <Cmd>
              <H>WORKDIR</H> <V>/app</V>
            </Cmd>
            <Cmd>
              <H>COPY</H> package*.json <V>./</V>
            </Cmd>
            <Cmd>
              <H>RUN</H> npm ci --production
            </Cmd>
            <Cmd>
              <H>COPY</H> . <V>.</V>
            </Cmd>
            <Cmd>
              <H>EXPOSE</H> <V>3000</V>
            </Cmd>
            <Cmd>
              <H>CMD</H> [<V>"node"</V>, <V>"server.js"</V>]
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="FROM" codeVariant="yellow">
            Obraz bazowy — zawsze pierwsza instrukcja
          </Row>
          <Row code="WORKDIR" codeVariant="yellow">
            Katalog roboczy w kontenerze
          </Row>
          <Row code="COPY" codeVariant="yellow">
            Kopiuj pliki z hosta do obrazu
          </Row>
          <Row code="RUN" codeVariant="yellow">
            Wykonaj komende podczas buildu
          </Row>
          <Row code="EXPOSE" codeVariant="yellow">
            Dokumentuj port (nie otwiera go!)
          </Row>
          <Row code="CMD" codeVariant="yellow">
            Domyslna komenda przy starcie kontenera
          </Row>
          <Row code="ENV" codeVariant="yellow">
            Zmienna srodowiskowa
          </Row>
          <Row code="ARG" codeVariant="yellow">
            Argument build-time (nie widoczny w runtime)
          </Row>
          <Row code="ENTRYPOINT" codeVariant="yellow">
            Niezmienny punkt wejscia (CMD jako argumenty)
          </Row>
        </Card>

        <Card title="Woluminy (Volumes)" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Dane w kontenerze sa efemeryczne — woluminy je utrwalaja.
          </p>
          <ExampleBlock variant="purple">
            <Comment># Utworz named volume</Comment>
            <Cmd>
              docker volume <H>create</H> <V>app-data</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Uzyj named volume</Comment>
            <Cmd>
              docker run <H>-v</H> <V>app-data:/app/data</V> myapp
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Bind mount (katalog hosta)</Comment>
            <Cmd>
              docker run <H>-v</H> <V>$(pwd)/src:/app/src</V> myapp
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock>
            <Cmd>
              docker volume <H>ls</H>{' '}
              <span className="text-[var(--c-muted)]"># lista woluminow</span>
            </Cmd>
            <Cmd>
              docker volume <H>inspect</H> app-data
            </Cmd>
            <Cmd>
              docker volume <H>rm</H> app-data
            </Cmd>
            <Cmd>
              docker volume <H>prune</H>{' '}
              <span className="text-[var(--c-muted)]"># usun nieuzywane</span>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Sieci (Networks)" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Comment># Utworz siec</Comment>
            <Cmd>
              docker network <H>create</H> <V>my-net</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Uruchom kontener w sieci</Comment>
            <Cmd>
              docker run <H>--network</H> <V>my-net</V> --name api myapp
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Kontenery w tej samej sieci widza sie po nazwie</Comment>
            <Cmd>
              curl <H>http://api:3000</H>{' '}
              <span className="text-[var(--c-muted)]">
                # z innego kontenera w my-net
              </span>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="bridge" codeVariant="orange">
            Domyslna — izolowana siec na hoscie
          </Row>
          <Row code="host" codeVariant="orange">
            Kontener uzywa sieci hosta bezposrednio
          </Row>
          <Row code="none" codeVariant="orange">
            Brak sieci
          </Row>
          <Divider />
          <ExampleBlock>
            <Cmd>
              docker network <H>ls</H>
            </Cmd>
            <Cmd>
              docker network <H>inspect</H> my-net
            </Cmd>
            <Cmd>
              docker network <H>rm</H> my-net
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Docker Compose" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Wiele kontenerow zdefiniowanych w jednym pliku YAML.
          </p>
          <ExampleBlock variant="green">
            <Comment># docker-compose.yml</Comment>
            <Cmd>
              <H>services:</H>
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;<V>web:</V>
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;build: <F>.</F>
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;ports: [<V>"8080:3000"</V>]
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;depends_on: [<F>db</F>]
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;<V>db:</V>
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;image: <F>postgres:16</F>
            </Cmd>
            <Cmd>&nbsp;&nbsp;&nbsp;&nbsp;environment:</Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTGRES_PASSWORD:{' '}
              <V>secret</V>
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;volumes: [
              <V>db-data:/var/lib/postgresql/data</V>]
            </Cmd>
            <Cmd>
              <H>volumes:</H>
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;<V>db-data:</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock>
            <Cmd>
              docker compose <H>up -d</H>{' '}
              <span className="text-[var(--c-muted)]"># start w tle</span>
            </Cmd>
            <Cmd>
              docker compose <H>down</H>{' '}
              <span className="text-[var(--c-muted)]">
                # stop + usun kontenery
              </span>
            </Cmd>
            <Cmd>
              docker compose <H>logs -f</H>{' '}
              <span className="text-[var(--c-muted)]"># logi na zywo</span>
            </Cmd>
            <Cmd>
              docker compose <H>ps</H>{' '}
              <span className="text-[var(--c-muted)]"># status serwisow</span>
            </Cmd>
            <Cmd>
              docker compose <H>build</H>{' '}
              <span className="text-[var(--c-muted)]"># przebuduj obrazy</span>
            </Cmd>
            <Cmd>
              docker compose <H>exec</H> web bash{' '}
              <span className="text-[var(--c-muted)]"># shell w serwisie</span>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Sprzatanie" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Comment>
              # Usun WSZYSTKO nieuzywane (kontenery, obrazy, sieci, cache)
            </Comment>
            <Cmd>
              docker <H>system prune -a</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Usun zatrzymane kontenery</Comment>
            <Cmd>
              docker <H>container prune</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Usun nieuzywane obrazy</Comment>
            <Cmd>
              docker <H>image prune -a</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Ile miejsca zajmuje Docker</Comment>
            <Cmd>
              docker <H>system df</H>
            </Cmd>
          </ExampleBlock>
          <InfoBox warn>
            <code className="text-xs text-[var(--c-orange)]">prune -a</code>{' '}
            usuwa WSZYSTKIE nieuzywane zasoby — uzywaj ostroznie na produkcji!
          </InfoBox>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/cheatsheets/filesystem', label: 'Filesystem' }}
        next={{ to: '/cheatsheets/git', label: 'Git' }}
      />
    </div>
  );
}
