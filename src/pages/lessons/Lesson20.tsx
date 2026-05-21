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

export default function Lesson20() {
  usePageTitle('Lekcja 20 — Docker cz. 1');

  return (
    <div>
      <PageHeader
        title="Lekcja 20 — Architektura Dockera i mikroserwisow cz. 1"
        subtitle="mikroserwisy · instalacja · obraz vs kontener · podstawowe polecenia"
        color="var(--c-accent)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === Cele === */}
        <Card title="Cele lekcji" color="var(--c-accent)">
          <Concept title="Co poznasz?" color="var(--c-accent)">
            Czym roznia sie <b>mikroserwisy</b> od monolitu, jak Docker
            rozwiazuje problem "u mnie dziala", jak zainstalowac Dockera i
            pracowac z obrazami oraz kontenerami.
          </Concept>
          <Divider />
          <Row code="1">Architektura mikroserwisowa vs monolit</Row>
          <Row code="2">Architektura Dockera (klient + demon)</Row>
          <Row code="3">Instalacja Docker na Ubuntu 22.04</Row>
          <Row code="4">Obraz vs kontener — warstwy</Row>
          <Row code="5">Docker Hub i rejestry obrazow</Row>
          <Row code="6">Polecenia: run / ps / stop / rm / exec / logs</Row>
          <Row code="7">Polecenia: pull / build / push / inspect</Row>
        </Card>

        {/* === Dlaczego Docker === */}
        <Card title="Dlaczego Docker zmienil swiat IT" color="var(--c-purple)">
          <Concept title='"U mnie dziala!"' color="var(--c-purple)">
            Aplikacja chodzi na laptopie dewelopera, na serwerze pada. Inna
            wersja Pythona, brakujaca biblioteka, inny OS. Docker pakuje
            aplikacje <b>RAZEM z jej srodowiskiem</b>, wiec dziala identycznie
            wszedzie.
          </Concept>
          <Divider />
          <Row code="Izolacja">
            bez ciezkich VM — kontener startuje w sekundach
          </Row>
          <Row code="Powtarzalnosc">
            Dockerfile = przepis na identyczne srodowisko
          </Row>
          <Row code="Przenosnosc">ten sam obraz: laptop, CI, prod</Row>
          <Row code="Lekkosc">MB zamiast GB, jeden host = wiele kontenerow</Row>
          <Divider />
          <InfoBox>
            Firma z 5 deweloperami i 10 mikroserwisami: bez Dockera kazde
            srodowisko trzeba recznie konfigurowac. Z{' '}
            <code className="text-xs">docker compose up</code> wszystko wstaje
            identycznie u kazdego.
          </InfoBox>
        </Card>

        {/* === Monolit vs mikroserwisy === */}
        <Card title="Monolit vs Mikroserwisy" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Monolit</SectionLabel>
              <Row code="+">prosto rozwijac na starcie</Row>
              <Row code="+">latwo testowac lokalnie</Row>
              <Row code="+">prosty deploy (jeden artefakt)</Row>
              <Row code="-">kazda zmiana = redeploy calosci</Row>
              <Row code="-">trudno utrzymac dobra modulowsc</Row>
              <Row code="-">trzeba skalowac caly system</Row>
              <Row code="-">jeden stos technologiczny</Row>
            </div>
            <div>
              <SectionLabel>Mikroserwisy</SectionLabel>
              <Row code="+">deploy tylko zmienionych uslug</Row>
              <Row code="+">rozne jezyki / bazy per usluga</Row>
              <Row code="+">skalowanie selektywne</Row>
              <Row code="+">zespoly autonomiczne</Row>
              <Row code="-">zlozonosc operacyjna (10 uslug = 10 problemow)</Row>
              <Row code="-">koniecznosc CI/CD i orkiestracji</Row>
              <Row code="-">koszt komunikacji sieciowej</Row>
            </div>
          </div>
          <Divider />
          <InfoBox>
            Mikroserwisy <b>nie sa zawsze lepsze</b>. Maly zespol + startup{' '}
            {'->'} monolit. Duza domena, niezalezne zespoly, roznorodne
            wymagania techniczne {'->'} mikroserwisy.
          </InfoBox>
        </Card>

        {/* === Architektura Dockera === */}
        <Card
          title="Architektura Docker — jak to dziala"
          color="var(--c-green)"
          full
        >
          <Concept title="Model klient-serwer" color="var(--c-green)">
            Wpisujesz <code className="text-xs">docker run</code> - polecenie
            trafia do <b>Docker Client</b>, ktory rozmawia z{' '}
            <b>Docker Daemon</b> (dockerd) przez Unix socket. Demon zarzadza
            obrazami, kontenerami, sieciami, woluminami.
          </Concept>
          <Divider />
          <ExampleBlock variant="default">
            <Cmd>+----------------+ +-------------------+ +-----------+</Cmd>
            <Cmd>
              | docker CLI | ----&gt; | Docker Daemon | -----&gt; | Images |
            </Cmd>
            <Cmd>| (klient) | | (dockerd) | | Networks |</Cmd>
            <Cmd>+----------------+ +-------------------+ | Volumes |</Cmd>
            <Cmd>
              {'                                     '}|
              {'                       '}| Containers|
            </Cmd>
            <Cmd>
              {'                                     '}v
              {'                       '}+-----------+
            </Cmd>
            <Cmd>{'                            '}REST API + dockerd</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Skladniki</SectionLabel>
          <Row code="docker">CLI — wysyla polecenia do demona</Row>
          <Row code="dockerd">demon zarzadzajacy zasobami</Row>
          <Row code="containerd">
            runtime poziomu nizszego (uruchamia OCI bundles)
          </Row>
          <Row code="runc">
            faktyczne tworzenie kontenera (cgroups + namespaces)
          </Row>
          <Row code="registry">
            Docker Hub / GHCR / prywatne — przechowuje obrazy
          </Row>
        </Card>

        {/* === Obraz vs Kontener === */}
        <Card title="Obraz vs Kontener" color="var(--c-yellow)">
          <Concept title="Przepis vs danie" color="var(--c-yellow)">
            <b>Obraz</b> = szablon (read-only) zawierajacy OS, biblioteki, kod.{' '}
            <b>Kontener</b> = uruchomiona instancja z dodatkowa warstwa zapisu.
            Z jednego obrazu mozesz miec N kontenerow.
          </Concept>
          <Divider />
          <SectionLabel>Warstwy obrazu</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Kazda instrukcja w Dockerfile = nowa warstwa</Comment>
            <Cmd>
              <H>FROM</H> <V>ubuntu</V>
              {'              '}
              <Comment># warstwa 1: OS</Comment>
            </Cmd>
            <Cmd>
              <H>RUN</H> apt-get update{'      '}
              <Comment># warstwa 2: pakiety</Comment>
            </Cmd>
            <Cmd>
              <H>COPY</H> app.py /app/{'      '}
              <Comment># warstwa 3: kod</Comment>
            </Cmd>
            <Cmd>
              <H>CMD</H> [<V>"python"</V>, <V>"/app/app.py"</V>]{'  '}
              <Comment># warstwa 4: cmd</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment>
              # Wszystko read-only. Kontener dokleja writable layer.
            </Comment>
          </ExampleBlock>
          <InfoBox>
            Warstwy sa <b>cache'owane</b>. Druga budowa tego samego obrazu jest
            szybsza, bo Docker uzywa cache az do pierwszej zmienionej
            instrukcji.
          </InfoBox>
        </Card>

        {/* === Rejestr === */}
        <Card title="Docker Hub i rejestry" color="var(--c-purple)">
          <Concept title="GitHub dla obrazow" color="var(--c-purple)">
            Obrazy zyja w <b>rejestrach</b>. Docker Hub to publiczny rejestr
            (nginx, postgres, ubuntu, python). Mozesz tez hostowac wlasny
            (Harbor, GHCR, Nexus, AWS ECR).
          </Concept>
          <Divider />
          <ExampleBlock variant="purple">
            <Comment># Anatomia nazwy obrazu</Comment>
            <Cmd>nginx:1.27-alpine</Cmd>
            <Cmd>
              |{'    '}|{'        '}|
            </Cmd>
            <Cmd>
              |{'    '}|{'        '}+- wariant (alpine, slim)
            </Cmd>
            <Cmd>|{'    '}+--------- tag/wersja</Cmd>
            <Cmd>+-------------- nazwa repozytorium</Cmd>
            <Cmd> </Cmd>
            <Comment># Pelna sciezka do prywatnego rejestru</Comment>
            <Cmd>ghcr.io/codetronic/devops-handbook:1.0.0</Cmd>
          </ExampleBlock>
          <InfoBox>
            Brak tagu = <code className="text-xs">:latest</code> —
            <b> nie polegaj</b> na tym w produkcji (mutowalne, niepowtarzalne).
          </InfoBox>
        </Card>

        {/* === Instalacja Docker === */}
        <Card
          title="Instalacja Docker na Ubuntu 22.04"
          color="var(--c-blue)"
          full
        >
          <ExampleBlock variant="default">
            <Comment># 1. Zaktualizuj listy pakietow</Comment>
            <Cmd>sudo apt update</Cmd>
            <Cmd> </Cmd>
            <Comment># 2. Pakiety pomocnicze</Comment>
            <Cmd>
              sudo apt install -y curl software-properties-common
              ca-certificates apt-transport-https
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 3. Klucz GPG Dockera</Comment>
            <Cmd>
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo
              apt-key add -
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 4. Repozytorium</Comment>
            <Cmd>
              sudo add-apt-repository{' '}
              <V>
                "deb [arch=amd64] https://download.docker.com/linux/ubuntu jammy
                stable"
              </V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment>
              # 5. Zaktualizuj i sprawdz, ze instalacja idzie z repo Dockera
            </Comment>
            <Cmd>sudo apt update</Cmd>
            <Cmd>apt-cache policy docker-ce</Cmd>
            <Cmd> </Cmd>
            <Comment># 6. Wlasciwa instalacja</Comment>
            <Cmd>sudo apt install -y docker-ce</Cmd>
            <Cmd> </Cmd>
            <Comment># 7. Sprawdz, czy demon dziala</Comment>
            <Cmd>sudo systemctl status docker</Cmd>
            <Cmd> </Cmd>
            <Comment># 8. Dodaj siebie do grupy docker (bez sudo)</Comment>
            <Cmd>sudo usermod -aG docker $USER</Cmd>
            <Cmd>
              newgrp docker <Comment># odswiez bez wylogowania</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 9. Pierwszy test</Comment>
            <Cmd>docker run hello-world</Cmd>
          </ExampleBlock>
          <InfoBox>
            Na macOS / Windows uzyj <b>Docker Desktop</b> — pakiet GUI + CLI,
            dziala out-of-the-box.
          </InfoBox>
        </Card>

        {/* === Polecenia: container === */}
        <Card
          title="Polecenia: container (uruchamianie)"
          color="var(--c-green)"
        >
          <ExampleBlock variant="green">
            <Comment># Tworzy + uruchamia nowy kontener</Comment>
            <Cmd>
              docker <H>run</H> <V>nginx</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment>
              # W tle (-d), port hosta:portu kontenera (-p), nazwa
            </Comment>
            <Cmd>
              docker run <H>-d</H> <V>-p 8080:80</V> <F>--name web</F> nginx
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Interaktywnie (-it = -i tty)</Comment>
            <Cmd>
              docker run <H>-it</H> <V>ubuntu</V> bash
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Ze zmiennymi srodowiskowymi</Comment>
            <Cmd>
              docker run <H>-e</H> <V>POSTGRES_PASSWORD=secret</V> postgres
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Usun kontener po zakonczeniu</Comment>
            <Cmd>
              docker run <H>--rm</H> ubuntu echo hello
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="-d">detached — w tle</Row>
          <Row code="-it">interaktywny terminal</Row>
          <Row code="-p HOST:CONT">port mapping</Row>
          <Row code="--name">nazwa kontenera</Row>
          <Row code="-e KEY=VAL">zmienna srodowiskowa</Row>
          <Row code="--rm">auto-usun po stopie</Row>
          <Row code="--restart always">auto-restart po crash/reboot</Row>
        </Card>

        {/* === Polecenia: zarzadzanie === */}
        <Card
          title="Polecenia: container (zarzadzanie)"
          color="var(--c-orange)"
        >
          <ExampleBlock variant="orange">
            <Comment># Lista (running / wszystkie)</Comment>
            <Cmd>
              docker <H>ps</H>
            </Cmd>
            <Cmd>
              docker ps <H>-a</H>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Stop / start / restart</Comment>
            <Cmd>
              docker <H>stop</H> web{'    '}
              <Comment># SIGTERM -&gt; po 10s SIGKILL</Comment>
            </Cmd>
            <Cmd>
              docker <H>kill</H> web{'    '}
              <Comment># od razu SIGKILL</Comment>
            </Cmd>
            <Cmd>
              docker <H>start</H> web
            </Cmd>
            <Cmd>
              docker <H>restart</H> web
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Usun (force = nawet dzialajacy)</Comment>
            <Cmd>
              docker <H>rm</H> web
            </Cmd>
            <Cmd>
              docker rm <H>-f</H> web
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Wejdz do dzialajacego kontenera</Comment>
            <Cmd>
              docker <H>exec -it</H> web bash
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Logi (na zywo)</Comment>
            <Cmd>
              docker <H>logs -f</H> web
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Szczegoly w JSON</Comment>
            <Cmd>
              docker <H>inspect</H> web
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>SIGTERM</b> (signal 15) — grzeczna prosba o zakonczenie.
            <b>SIGKILL</b> (signal 9) — natychmiastowe zabicie.
            <code className="text-xs"> docker stop</code> wysyla TERM, po 10 s
            KILL.
          </InfoBox>
        </Card>

        {/* === Polecenia: images === */}
        <Card title="Polecenia: image" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># Pobierz z rejestru</Comment>
            <Cmd>
              docker <H>pull</H> <V>nginx:1.27-alpine</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Lista lokalnych obrazow</Comment>
            <Cmd>
              docker <H>images</H> <Comment># lub: docker image ls</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Build z Dockerfile w biezacym katalogu</Comment>
            <Cmd>
              docker <H>build</H> <V>-t myapp:1.0</V> .
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Tag (alias) — wymagany do push</Comment>
            <Cmd>
              docker <H>tag</H> myapp:1.0 user/myapp:latest
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Login + push do Docker Hub</Comment>
            <Cmd>
              docker <H>login</H> -u user
            </Cmd>
            <Cmd>
              docker <H>push</H> user/myapp:latest
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Historia warstw + inspekcja</Comment>
            <Cmd>
              docker image <H>history</H> nginx
            </Cmd>
            <Cmd>
              docker image <H>inspect</H> nginx
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Usun obraz</Comment>
            <Cmd>
              docker <H>rmi</H> nginx:1.27-alpine
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Inne polecenia === */}
        <Card title="Inne przydatne polecenia" color="var(--c-blue)">
          <ExampleBlock variant="default">
            <Comment># Wersja klienta i serwera</Comment>
            <Cmd>
              docker <H>version</H>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Globalna inspekcja systemu</Comment>
            <Cmd>
              docker <H>info</H>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Ile miejsca zajmuje Docker</Comment>
            <Cmd>
              docker <H>system df</H>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Sprzatanie nieuzywanych zasobow (bezpieczne)</Comment>
            <Cmd>
              docker <H>system prune</H>
            </Cmd>
            <Cmd> </Cmd>
            <Comment>
              # Sprzatanie WSZYSTKIEGO (kontenery, obrazy, sieci, woluminy)
            </Comment>
            <Cmd>
              docker <H>system prune</H> --all --volumes
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Statystyki zuzycia w czasie rzeczywistym</Comment>
            <Cmd>
              docker <H>stats</H>
            </Cmd>
          </ExampleBlock>
          <InfoBox warn>
            <b>NIGDY</b> na produkcji
            <code className="text-xs"> --all --volumes</code> — usuwa dane
            wolumenow bazodanowych bezpowrotnie.
          </InfoBox>
        </Card>

        {/* === Czeste bledy === */}
        <Card title="Czeste bledy i rozwiazania" color="var(--c-orange)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Permission denied (dockerd socket)</SectionLabel>
              <ExampleBlock variant="orange">
                <Comment># Twoj user nie jest w grupie docker</Comment>
                <Cmd>sudo usermod -aG docker $USER</Cmd>
                <Cmd>
                  newgrp docker <Comment># lub wyloguj i zaloguj</Comment>
                </Cmd>
                <Cmd>docker run hello-world</Cmd>
              </ExampleBlock>
              <SectionLabel className="mt-2">Port already in use</SectionLabel>
              <ExampleBlock variant="default">
                <Cmd>sudo ss -tlnp | grep :80</Cmd>
                <Cmd>sudo lsof -i :80</Cmd>
                <Cmd>
                  docker run -p <V>8080</V>:80 nginx{' '}
                  <Comment># inny port</Comment>
                </Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>Cannot connect to Docker daemon</SectionLabel>
              <ExampleBlock variant="default">
                <Cmd>sudo systemctl status docker</Cmd>
                <Cmd>sudo systemctl start docker</Cmd>
                <Cmd>sudo systemctl enable docker</Cmd>
              </ExampleBlock>
              <SectionLabel className="mt-2">
                Kontener startuje i od razu pada
              </SectionLabel>
              <ExampleBlock variant="default">
                <Cmd>docker logs &lt;nazwa&gt;</Cmd>
                <Cmd>
                  docker run -it &lt;obraz&gt; /bin/bash{' '}
                  <Comment># debug</Comment>
                </Cmd>
                <Cmd>
                  docker ps -a <Comment># status zatrzymanych</Comment>
                </Cmd>
              </ExampleBlock>
            </div>
          </div>
        </Card>

        {/* === Slownik === */}
        <Card title="Slownik" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <SectionLabel>Docker</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Platforma do konteneryzacji aplikacji.
              </p>
            </div>
            <div>
              <SectionLabel>Kontener</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Uruchomiony, izolowany proces z wlasnym FS, siecia, PID.
              </p>
            </div>
            <div>
              <SectionLabel>Obraz (Image)</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Read-only szablon warstwowy, baza dla kontenerow.
              </p>
            </div>
            <div>
              <SectionLabel>Dockerfile</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Przepis na build obrazu (FROM, RUN, COPY, CMD...).
              </p>
            </div>
            <div>
              <SectionLabel>Docker Hub</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Publiczny rejestr — tysiace gotowych obrazow.
              </p>
            </div>
            <div>
              <SectionLabel>Warstwa (Layer)</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Fragment obrazu odpowiadajacy 1 instrukcji Dockerfile.
              </p>
            </div>
            <div>
              <SectionLabel>Registry</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Repozytorium obrazow (Docker Hub / GHCR / ECR).
              </p>
            </div>
            <div>
              <SectionLabel>Daemon (dockerd)</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Proces serwerowy zarzadzajacy zasobami Dockera.
              </p>
            </div>
            <div>
              <SectionLabel>Mikroserwis</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Mala, niezalezna usluga komunikujaca sie przez API/RPC.
              </p>
            </div>
          </div>
        </Card>

        {/* === Dokumentacja === */}
        <Card title="Dokumentacja" color="var(--c-purple)">
          <ul className="text-[11px] text-[var(--c-muted)] space-y-1">
            <li>
              <a
                href="https://docs.docker.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Docker — oficjalna dokumentacja
              </a>
            </li>
            <li>
              <a
                href="https://docs.docker.com/reference/dockerfile/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Dockerfile reference
              </a>
            </li>
            <li>
              <a
                href="https://hub.docker.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Docker Hub
              </a>
            </li>
            <li>
              <a
                href="https://martinfowler.com/articles/microservices.html"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Martin Fowler — Microservices
              </a>
            </li>
          </ul>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/19', label: '19 — Ansible cz. 2' }}
        next={{ to: '/lessons/21', label: '21 — Docker cz. 2' }}
      />
    </div>
  );
}
