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

export default function DockerImages() {
  usePageTitle('Docker Images & Dockerfile');
  return (
    <div>
      <PageHeader
        title="Docker Images &amp; Dockerfile"
        subtitle="FROM · RUN · COPY · CMD · ENTRYPOINT · USER · WORKDIR · ENV · ARG · LABEL · OCI"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Anatomia obrazu" full>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Concept title="FROM">
              Obraz bazowy. Pin wersji (
              <code className="text-xs">node:20-alpine</code>), nigdy{' '}
              <code className="text-xs">:latest</code> w prod.
            </Concept>
            <Concept title="Warstwy" color="var(--c-yellow)">
              Kazda instrukcja = nowa warstwa, cache'owana. Stabilne rzeczy daj
              wyzej, zmienne nizej.
            </Concept>
            <Concept title="RUN" color="var(--c-green)">
              Wykonuje komende w build time. Tworzy nowa warstwe ze zmianami w
              FS.
            </Concept>
            <Concept title="CMD / ENTRYPOINT" color="var(--c-purple)">
              Co odpalic na start kontenera. Exec form{' '}
              <code className="text-xs">["bin","arg"]</code> zalecane (PID 1).
            </Concept>
          </div>
        </Card>

        <Card title="Polecenia: docker image" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># Pobierz / lista / inspekcja</Comment>
            <Cmd>
              docker image <H>pull</H> <V>node:20-alpine</V>
            </Cmd>
            <Cmd>
              docker image <H>ls</H>
              {'                  '}
              <Comment># lub: docker images</Comment>
            </Cmd>
            <Cmd>
              docker image <H>inspect</H> nginx
            </Cmd>
            <Cmd>
              docker image <H>history</H> nginx{'      '}
              <Comment># warstwy + rozmiar</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Tagowanie + push</Comment>
            <Cmd>
              docker <H>tag</H> myapp:1.0 user/myapp:latest
            </Cmd>
            <Cmd>
              docker <H>login</H> -u user
            </Cmd>
            <Cmd>
              docker <H>push</H> user/myapp:latest
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Usuwanie + sprzatanie</Comment>
            <Cmd>
              docker image <H>rm</H> nginx:alpine{'   '}
              <Comment># lub: docker rmi</Comment>
            </Cmd>
            <Cmd>
              docker image <H>prune</H>
              {'              '}
              <Comment># dangling</Comment>
            </Cmd>
            <Cmd>
              docker image <H>prune</H> -a{'           '}
              <Comment># wszystkie nieuzywane</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Zapisz / wczytaj jako tarball</Comment>
            <Cmd>docker save myapp:1.0 | gzip &gt; myapp.tar.gz</Cmd>
            <Cmd>gunzip -c myapp.tar.gz | docker load</Cmd>
          </ExampleBlock>
        </Card>

        <Card title="docker build" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Comment># Build z biezacego katalogu</Comment>
            <Cmd>
              docker <H>build</H> -t <V>myapp:1.0</V> .
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Konkretny Dockerfile + context</Comment>
            <Cmd>
              docker build -f <V>Dockerfile.prod</V> -t <V>myapp:prod</V> .
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Argumenty build-time</Comment>
            <Cmd>
              docker build --build-arg <V>NODE_VERSION=20</V> -t myapp:1.0 .
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Bez cache + pull najnowszy bazowy</Comment>
            <Cmd>docker build --no-cache --pull -t myapp:1.0 .</Cmd>
            <Cmd> </Cmd>
            <Comment># Multi-arch przez buildx</Comment>
            <Cmd>docker buildx build \</Cmd>
            <Cmd>
              {'  '}--platform <V>linux/amd64,linux/arm64</V> \
            </Cmd>
            <Cmd>{'  '}-t user/myapp:1.0 --push .</Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Dockerfile — instrukcje" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Bazowe</SectionLabel>
              <Row code="FROM image:tag">
                obraz bazowy (zawsze pierwsza, oprocz ARG)
              </Row>
              <Row code="ARG NAME=val">
                argument build-time (nie widoczny w runtime)
              </Row>
              <Row code="LABEL k=v">metadane (OCI annotations)</Row>
              <Row code="ENV K=V">zmienna srodowiskowa (runtime)</Row>
              <Row code="WORKDIR /app">
                katalog roboczy dla kolejnych instrukcji
              </Row>
              <Row code="USER appuser">
                uzytkownik dla kolejnych instrukcji + runtime
              </Row>
              <SectionLabel className="mt-2">Filesystem</SectionLabel>
              <Row code="COPY src dst">kopiuj z contextu do obrazu</Row>
              <Row code="ADD src dst">
                jak COPY + auto-unpack tar + URL (uzywaj COPY!)
              </Row>
              <Row code="VOLUME /path">
                deklaracja wolumenu (anonimowy przy run)
              </Row>
            </div>
            <div>
              <SectionLabel>Build</SectionLabel>
              <Row code="RUN cmd">wykonaj w build time (nowa warstwa)</Row>
              <Row code="RUN --mount=type=cache">
                cache miedzy buildami (np. apt, pip)
              </Row>
              <SectionLabel className="mt-2">Runtime</SectionLabel>
              <Row code="CMD [...]">domyslna komenda (mozna nadpisac)</Row>
              <Row code="ENTRYPOINT [...]">
                niezmienny punkt wejścia (CMD jako argumenty)
              </Row>
              <Row code="EXPOSE 8080">dokumentacja portu (NIE otwiera)</Row>
              <Row code="HEALTHCHECK">test zywotnosci kontenera</Row>
              <Row code="STOPSIGNAL SIGTERM">jaki signal wysylac przy stop</Row>
            </div>
          </div>
        </Card>

        <Card title="OCI Labels (Open Container)" color="var(--c-purple)" full>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Standaryzowane etykiety{' '}
            <code className="text-xs">org.opencontainers.image.*</code> —
            rozpoznawane przez Docker Hub, GHCR, narzedzia security i CI.
          </p>
          <ExampleBlock variant="purple">
            <Cmd>
              <H>LABEL</H> org.opencontainers.image.title=<V>"myapp"</V>
            </Cmd>
            <Cmd>
              <H>LABEL</H> org.opencontainers.image.description=
              <V>"Krotki opis aplikacji"</V>
            </Cmd>
            <Cmd>
              <H>LABEL</H> org.opencontainers.image.version=<V>"1.2.3"</V>
            </Cmd>
            <Cmd>
              <H>LABEL</H> org.opencontainers.image.authors=
              <V>"Imie Nazwisko &lt;mail@example.com&gt;"</V>
            </Cmd>
            <Cmd>
              <H>LABEL</H> org.opencontainers.image.vendor=<V>"CodeTronic"</V>
            </Cmd>
            <Cmd>
              <H>LABEL</H> org.opencontainers.image.licenses=<V>"MIT"</V>
            </Cmd>
            <Cmd>
              <H>LABEL</H> org.opencontainers.image.source=
              <V>"https://github.com/user/myapp"</V>
            </Cmd>
            <Cmd>
              <H>LABEL</H> org.opencontainers.image.url=
              <V>"https://hub.docker.com/r/user/myapp"</V>
            </Cmd>
            <Cmd>
              <H>LABEL</H> org.opencontainers.image.documentation=
              <V>"https://example.com/docs"</V>
            </Cmd>
            <Cmd>
              <H>LABEL</H> org.opencontainers.image.created=
              <V>"2026-05-16T12:00:00Z"</V>
            </Cmd>
            <Cmd>
              <H>LABEL</H> org.opencontainers.image.revision=
              <V>"git-sha-here"</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Inspekcja labeli</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              docker inspect --format{' '}
              <V>
                '{'{'}
                {'{'}json .Config.Labels{'}'}
                {'}'}'
              </V>{' '}
              myapp:1.0 | jq
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Wzorzec: Python ze skryptem" color="var(--c-green)" full>
          <ExampleBlock variant="green">
            <Cmd># syntax=docker/dockerfile:1.7</Cmd>
            <Cmd>
              <H>FROM</H> python:3.12-slim
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>LABEL</H> org.opencontainers.image.title=<V>"my-python-app"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>ENV</H> PYTHONUNBUFFERED=<V>1</V> APP_ENV=<V>production</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>WORKDIR</H> /app
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Cache layera deps — copy requirements FIRST</Comment>
            <Cmd>
              <H>COPY</H> requirements.txt .
            </Cmd>
            <Cmd>
              <H>RUN</H> pip install --no-cache-dir -r requirements.txt
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Nie-root</Comment>
            <Cmd>
              <H>RUN</H> useradd --system --uid 10001 appuser \
            </Cmd>
            <Cmd> &amp;&amp; chown -R appuser:appuser /app</Cmd>
            <Cmd> </Cmd>
            <Comment># Reszta kodu (zmienia sie czesto)</Comment>
            <Cmd>
              <H>COPY</H> --chown=appuser:appuser . .
            </Cmd>
            <Cmd>
              <H>USER</H> appuser
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>CMD</H> [<V>"python"</V>, <V>"-m"</V>, <V>"myapp"</V>]
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Cache layera</b>: instrukcje, ktore zmieniaja sie rzadziej, daj{' '}
            <b>wyzej</b>. <code className="text-xs">pip install</code>
            cachuje sie, dopoki nie zmienisz requirements.txt.
          </InfoBox>
        </Card>

        <Card title="Multi-stage build" color="var(--c-orange)" full>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Build w jednym obrazie, runtime w innym — koncowy obraz jest maly i
            nie zawiera kompilatorow.
          </p>
          <ExampleBlock variant="orange">
            <Comment># Stage 1: builder</Comment>
            <Cmd>
              <H>FROM</H> node:20-alpine <H>AS</H> builder
            </Cmd>
            <Cmd>
              <H>WORKDIR</H> /app
            </Cmd>
            <Cmd>
              <H>COPY</H> package*.json ./
            </Cmd>
            <Cmd>
              <H>RUN</H> npm ci
            </Cmd>
            <Cmd>
              <H>COPY</H> . .
            </Cmd>
            <Cmd>
              <H>RUN</H> npm run build
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Stage 2: runtime (maly!)</Comment>
            <Cmd>
              <H>FROM</H> nginx:1.27-alpine
            </Cmd>
            <Cmd>
              <H>COPY</H> --from=builder /app/dist /usr/share/nginx/html
            </Cmd>
            <Cmd>
              <H>EXPOSE</H> 80
            </Cmd>
            <Cmd>
              <H>CMD</H> [<V>"nginx"</V>, <V>"-g"</V>, <V>"daemon off;"</V>]
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Przyklad: Node app 800 MB w jednoetapowym buildzie → 25 MB w
            multi-stage z nginx alpine.
          </InfoBox>
        </Card>

        <Card title="CMD vs ENTRYPOINT" color="var(--c-blue)">
          <SectionLabel>Tylko CMD</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              <H>CMD</H> [<V>"python"</V>, <V>"app.py"</V>]
            </Cmd>
            <Cmd> </Cmd>
            <Comment>
              # docker run myapp echo hi -&gt; uruchamia 'echo hi'
            </Comment>
          </ExampleBlock>
          <SectionLabel className="mt-2">ENTRYPOINT + CMD</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              <H>ENTRYPOINT</H> [<V>"python"</V>, <V>"app.py"</V>]
            </Cmd>
            <Cmd>
              <H>CMD</H> [<V>"--help"</V>]{'           '}
              <Comment># default args</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># docker run myapp --port=8080</Comment>
            <Comment># -&gt; python app.py --port=8080</Comment>
          </ExampleBlock>
          <InfoBox>
            <b>ENTRYPOINT</b> = uchwyt; <b>CMD</b> = jego argumenty. Razem to
            "aplikacja + domyslne argumenty".
          </InfoBox>
        </Card>

        <Card title="HEALTHCHECK" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Cmd>
              <H>HEALTHCHECK</H> --interval=<V>30s</V> --timeout=<V>3s</V> \
            </Cmd>
            <Cmd>
              {'  '}--start-period=<V>10s</V> --retries=<V>3</V> \
            </Cmd>
            <Cmd>
              {'  '}
              <H>CMD</H> curl -fsS http://localhost:8080/health || exit 1
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="--interval">jak czesto sprawdzac</Row>
          <Row code="--timeout">max czas jednej proby</Row>
          <Row code="--start-period">
            grace period po starcie (jeszcze nie raportowane)
          </Row>
          <Row code="--retries">ile bledow zanim status=unhealthy</Row>
          <InfoBox>
            Compose moze czekac na <b>service_healthy</b> w
            <code className="text-xs"> depends_on</code> — eliminuje race
            conditions na starcie.
          </InfoBox>
        </Card>

        <Card title=".dockerignore" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Cmd># Co NIE ma trafic do build context</Cmd>
            <Cmd>node_modules/</Cmd>
            <Cmd>.git/</Cmd>
            <Cmd>.env*</Cmd>
            <Cmd>**/*.log</Cmd>
            <Cmd>__pycache__/</Cmd>
            <Cmd>*.pyc</Cmd>
            <Cmd>.venv/</Cmd>
            <Cmd>.DS_Store</Cmd>
            <Cmd>README.md</Cmd>
            <Cmd>tests/</Cmd>
            <Cmd>coverage/</Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Bez tego</b> docker wysyla CALY katalog do demona przy kazdym
            buildzie — wolniej, wieksze obrazy, ryzyko leakowania sekretow.
          </InfoBox>
        </Card>

        <Card title="Best practices" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Rozmiar</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Alpine / slim / distroless gdy mozliwe</li>
                <li>Multi-stage build dla aplikacji kompilowanych</li>
                <li>
                  Jeden <code className="text-xs">RUN</code> z{' '}
                  <code className="text-xs">&amp;&amp;</code> dla apt (cleanup w
                  tej samej warstwie)
                </li>
                <li>
                  <code className="text-xs">--no-cache-dir</code> w pip,{' '}
                  <code className="text-xs">--prod</code> w npm
                </li>
              </ul>
              <SectionLabel className="mt-2">Bezpieczenstwo</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Nie-root user (USER w Dockerfile)</li>
                <li>
                  Pin wersji bazowych (
                  <code className="text-xs">:1.27-alpine</code>)
                </li>
                <li>
                  Skanuj: <code className="text-xs">docker scout</code>, trivy
                </li>
                <li>NIE wbijaj sekretow w obraz</li>
              </ul>
            </div>
            <div>
              <SectionLabel>Cache i build speed</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Stabilne instrukcje wyzej (deps przed source)</li>
                <li>
                  BuildKit (<code className="text-xs">DOCKER_BUILDKIT=1</code>)
                </li>
                <li>RUN --mount=type=cache dla pakietow</li>
                <li>.dockerignore minimalizuje context</li>
              </ul>
              <SectionLabel className="mt-2">Runtime</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Exec form CMD/ENTRYPOINT (PID 1, SIGTERM dziala)</li>
                <li>HEALTHCHECK definiuje "czy zywe"</li>
                <li>STOPSIGNAL dla graceful shutdown</li>
                <li>Loguj do stdout/stderr (12-factor)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <LessonNav
        prev={{
          to: '/cheatsheets/docker-volumes-networks',
          label: 'Volumes & Networks',
        }}
        next={{ to: '/cheatsheets/docker', label: 'Docker Basics' }}
      />
    </div>
  );
}
