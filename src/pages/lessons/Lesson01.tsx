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

export default function Lesson01() {
  return (
    <div>
      <PageHeader
        title="01 — Wprowadzenie do DevOps"
        subtitle="DevOps · konteneryzacja · Kubernetes · Linux · Docker · Git · CI/CD"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Czym jest DevOps?" full>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Concept title="Development + Operations">
              DevOps łączy zespoły programistyczne (Dev) i operacyjne (Ops) —
              likwiduje bariery między pisaniem kodu a jego wdrażaniem.
            </Concept>
            <Concept
              title="Infrastructure as Code (IaC)"
              color="var(--c-green)"
            >
              Cała infrastruktura zarządzana kodem — można ją wersjonować,
              testować i odtwarzać. Terraform, Ansible, Pulumi.
            </Concept>
            <Concept title="CI/CD Pipeline" color="var(--c-yellow)">
              Continuous Integration / Continuous Delivery — automatyczne
              budowanie, testowanie i wdrażanie kodu.
            </Concept>
            <Concept title="Mikrousługi" color="var(--c-purple)">
              Zamiast monolitu — wiele małych serwisów komunikujących się przez
              API.
            </Concept>
          </div>
        </Card>

        <Card title="Wirtualizacja vs Konteneryzacja" color="var(--c-purple)">
          <Concept title="Maszyna wirtualna (VM)" color="var(--c-purple)">
            Pełna kopia OS na hypervisorze. Ciężka (GB), wolny start. VMware,
            VirtualBox, Hyper-V.
          </Concept>
          <Concept title="Kontener (Docker)" color="var(--c-green)">
            Współdzieli jądro hosta, izoluje procesy. Lekki (MB), start w
            sekundach. Docker, Podman.
          </Concept>
          <InfoBox>
            VM = izolacja na poziomie <b>hardware</b>. Kontener = izolacja na
            poziomie <b>procesu</b>.
          </InfoBox>
        </Card>

        <Card title="Kubernetes (K8s) — orkiestracja" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Zarządza klastrem kontenerów — deployment, skalowanie, restart, load
            balancing.
          </p>
          <Row code="Pod" codeVariant="yellow">
            Najmniejsza jednostka — jeden lub więcej kontenerów
          </Row>
          <Row code="Service" codeVariant="yellow">
            Stabilny endpoint sieciowy do grupy Podów
          </Row>
          <Row code="Deployment" codeVariant="yellow">
            Deklaratywny opis stanu — ile replik, jaki obraz
          </Row>
          <Row code="Namespace" codeVariant="yellow">
            Logiczna separacja zasobów w klastrze
          </Row>
          <Divider />
          <p className="text-[var(--c-muted)] text-[11px]">
            Certyfikacja: CKA (Certified Kubernetes Administrator)
          </p>
        </Card>

        <Card title="Docker — podstawy">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Enkapsulacja aplikacji w kontenerze — izolacja procesów od systemu
            hosta.
          </p>
          <ExampleBlock>
            <Comment># Testowe uruchomienie kontenera</Comment>
            <Cmd>
              docker <H>run</H> <V>hello-world</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Uruchomienie z interaktywnym shellem</Comment>
            <Cmd>
              docker run <H>-it</H> <V>ubuntu</V> <F>/bin/bash</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Lista uruchomionych kontenerów</Comment>
            <Cmd>
              docker <H>ps</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment>
              # Lista WSZYSTKICH kontenerów (także zatrzymanych)
            </Comment>
            <Cmd>
              docker ps <H>-a</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Zatrzymanie kontenera</Comment>
            <Cmd>
              docker <H>stop</H> <V>&lt;container_id&gt;</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Git — kontrola wersji" color="var(--c-green)">
          <SectionLabel>Konfiguracja globalna</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              git config --global <H>user.name</H> <V>"Twoja Nazwa"</V>
            </Cmd>
            <Cmd>
              git config --global <H>user.email</H> <V>"email@example.com"</V>
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2.5">Podstawowe komendy</SectionLabel>
          <ExampleBlock>
            <Comment># Inicjalizacja repozytorium</Comment>
            <Cmd>
              git <H>init</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Stan repo (skrócony format)</Comment>
            <Cmd>
              git <H>status</H> <V>-s</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Dodaj + commit</Comment>
            <Cmd>
              git <H>add</H> . && git <H>commit</H> -m <V>"opis"</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Wypchnij na remote</Comment>
            <Cmd>
              git <H>push</H> origin main
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="APT — menedżer pakietów" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Menedżer pakietów Debian/Ubuntu. Wymaga sudo.
          </p>
          <ExampleBlock variant="orange">
            <Comment># Pobierz najnowsze listy pakietów</Comment>
            <Cmd>
              sudo apt <H>update</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Zainstaluj aktualizacje pakietów</Comment>
            <Cmd>
              sudo apt <H>upgrade</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Instalacja</Comment>
            <Cmd>
              sudo apt <H>install</H> <V>nazwa_pakietu</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Usuń pakiet (zachowaj konfigurację)</Comment>
            <Cmd>
              sudo apt <H>remove</H> <V>nazwa_pakietu</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Usuń pakiet + konfigurację</Comment>
            <Cmd>
              sudo apt <H>purge</H> <V>nazwa_pakietu</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Wyszukaj pakiet</Comment>
            <Cmd>
              apt <H>search</H> <V>słowo_kluczowe</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="--help" codeVariant="orange">
            Pomoc — składnia i opcje każdej komendy
          </Row>
        </Card>

        <Card title="GitHub Actions — CI/CD" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Automatyzacja build/test/deploy w repo GitHub.
          </p>
          <ExampleBlock variant="yellow">
            <Comment># .github/workflows/build.yml</Comment>
            <Cmd>
              name: <V>Build</V>
            </Cmd>
            <Cmd>
              on: <H>push</H>
            </Cmd>
            <Cmd>jobs:</Cmd>
            <Cmd>&nbsp;&nbsp;build:</Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;runs-on: <V>ubuntu-latest</V>
            </Cmd>
            <Cmd>&nbsp;&nbsp;&nbsp;&nbsp;steps:</Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- uses:{' '}
              <H>actions/checkout@v4</H>
            </Cmd>
            <Cmd>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- run: <V>echo "Hello CI!"</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Triggery: <b>push</b>, <b>pull_request</b>, <b>schedule</b>,{' '}
            <b>manual dispatch</b>.
          </InfoBox>
        </Card>

        <Card title="Monitoring i logi" color="var(--c-green)">
          <Row code="Grafana" codeVariant="green">
            Dashboardy do wizualizacji metryk — CPU, RAM, ruch sieciowy
          </Row>
          <Row code="Prometheus" codeVariant="green">
            Zbieranie i przechowywanie metryk (time series DB)
          </Row>
          <Row code="ELK Stack" codeVariant="green">
            Elasticsearch + Logstash + Kibana — centralne logowanie
          </Row>
          <Divider />
          <p className="text-[var(--c-muted)] text-[11px]">
            Monitoring środowisk produkcyjnych to kluczowy element pracy DevOps
            — pozwala reagować na problemy zanim zauważą je użytkownicy.
          </p>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/', label: 'Dashboard' }}
        next={{ to: '/lessons/02', label: '02 — Systemy operacyjne' }}
      />
    </div>
  );
}
