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
import Divider from '../../components/Divider';
import InfoBox from '../../components/InfoBox';
import SectionLabel from '../../components/SectionLabel';

export default function CiCd() {
  usePageTitle('CI/CD Pipelines');
  return (
    <div>
      <PageHeader
        title="CI/CD Pipelines"
        subtitle="GitHub Actions · pipeline stages · secrets · deploy strategies"
        color="var(--c-orange)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Koncept CI/CD */}
        <Card title="CI/CD — co to jest?" full>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Concept title="CI — Continuous Integration" color="var(--c-green)">
              Automatyczne budowanie i testowanie kodu przy każdym pushu. Cel:
              szybkie wykrycie błędów zanim trafią do głównej gałęzi.
            </Concept>
            <Concept title="CD — Continuous Delivery" color="var(--c-orange)">
              Kod zawsze gotowy do wdrożenia na produkcję. Deploy wymaga
              ręcznego zatwierdzenia.
            </Concept>
            <Concept title="CD — Continuous Deployment" color="var(--c-accent)">
              Każdy commit który przejdzie testy automatycznie ląduje na
              produkcji. Zero ręcznych kroków.
            </Concept>
          </div>
        </Card>

        {/* GitHub Actions — struktura */}
        <Card
          title="GitHub Actions — struktura workflow"
          color="var(--c-orange)"
        >
          <ExampleBlock variant="orange">
            <Comment># .github/workflows/ci.yml</Comment>
            <Cmd>
              <H>name:</H> <V>CI Pipeline</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>on:</H>
            </Cmd>
            <Cmd>
              {'  '}
              <H>push:</H>
            </Cmd>
            <Cmd>
              {'    '}
              <F>branches:</F> <V>[ main, develop ]</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>pull_request:</H>
            </Cmd>
            <Cmd>
              {'    '}
              <F>branches:</F> <V>[ main ]</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Cmd>
              <H>jobs:</H>
            </Cmd>
            <Cmd>
              {'  '}
              <H>build:</H>
            </Cmd>
            <Cmd>
              {'    '}
              <F>runs-on:</F> <V>ubuntu-latest</V>
            </Cmd>
            <Cmd>
              {'    '}
              <F>steps:</F>
            </Cmd>
            <Cmd>
              {'      '}- <H>uses:</H> <V>actions/checkout@v4</V>
            </Cmd>
            <Cmd>
              {'      '}- <H>name:</H> <V>Run tests</V>
            </Cmd>
            <Cmd>
              {'        '}
              <F>run:</F> <V>npm test</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Każdy plik <code className="text-xs">.yml</code> w{' '}
            <code className="text-xs">.github/workflows/</code> to osobny
            workflow.
          </InfoBox>
        </Card>

        {/* Triggery */}
        <Card title="Triggery — kiedy uruchamiać" color="var(--c-yellow)">
          <SectionLabel>Zdarzenia</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Push do brancha</Comment>
            <Cmd>
              <H>on:</H> <V>push</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Pull request</Comment>
            <Cmd>
              <H>on:</H> <V>pull_request</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Tag release</Comment>
            <Cmd>
              <H>on:</H>
            </Cmd>
            <Cmd>
              {'  '}
              <H>push:</H>
            </Cmd>
            <Cmd>
              {'    '}
              <F>tags:</F> <V>[ 'v*.*.*' ]</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Harmonogram (cron)</Comment>
            <Cmd>
              <H>on:</H>
            </Cmd>
            <Cmd>
              {'  '}
              <H>schedule:</H>
            </Cmd>
            <Cmd>
              {'    '}- <F>cron:</F> <V>'0 6 * * 1'</V>
            </Cmd>
            <Comment> # Pon–Pt o 6:00 UTC</Comment>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Ręczne uruchomienie</Comment>
            <Cmd>
              <H>on:</H> <V>workflow_dispatch</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* Środowiska runners */}
        <Card title="Runners — środowiska wykonania">
          <SectionLabel>Systemy operacyjne</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              <F>runs-on:</F> <V>ubuntu-latest</V>
            </Cmd>
            <Cmd>
              <F>runs-on:</F> <V>windows-latest</V>
            </Cmd>
            <Cmd>
              <F>runs-on:</F> <V>macos-latest</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Wiele systemów naraz (matrix)</SectionLabel>
          <ExampleBlock>
            <Cmd>
              <H>strategy:</H>
            </Cmd>
            <Cmd>
              {'  '}
              <H>matrix:</H>
            </Cmd>
            <Cmd>
              {'    '}
              <F>os:</F> <V>[ubuntu-latest, windows-latest]</V>
            </Cmd>
            <Cmd>
              {'    '}
              <F>node:</F> <V>[18, 20, 22]</V>
            </Cmd>
            <Cmd>
              <H>runs-on:</H> <V>{'${{ matrix.os }}'}</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Matrix tworzy osobny job dla każdej kombinacji — tu 2×3 = 6 jobów
            równolegle.
          </InfoBox>
        </Card>

        {/* Sekrety i zmienne */}
        <Card title="Sekrety i zmienne środowiskowe" color="var(--c-purple)">
          <SectionLabel>
            Dodaj sekret: Settings → Secrets → Actions
          </SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Użycie sekretu w workflow</Comment>
            <Cmd>
              <H>env:</H>
            </Cmd>
            <Cmd>
              {'  '}
              <F>DB_PASSWORD:</F> <V>{'${{ secrets.DB_PASSWORD }}'}</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Zmienne na poziomie repo</Comment>
            <Cmd>
              <H>env:</H>
            </Cmd>
            <Cmd>
              {'  '}
              <F>APP_ENV:</F> <V>production</V>
            </Cmd>
            <Cmd>
              {'  '}
              <F>NODE_VERSION:</F> <V>'20'</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Kontekst GitHub</SectionLabel>
          <ExampleBlock>
            <Comment># Wbudowane zmienne</Comment>
            <Cmd>
              <V>{'${{ github.sha }}'}</V>
              <Comment> # hash commita</Comment>
            </Cmd>
            <Cmd>
              <V>{'${{ github.ref_name }}'}</V>
              <Comment> # nazwa brancha/tagu</Comment>
            </Cmd>
            <Cmd>
              <V>{'${{ github.actor }}'}</V>
              <Comment> # kto uruchomił</Comment>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* Artefakty */}
        <Card title="Artefakty i cache" color="var(--c-green)">
          <SectionLabel>Zapis artefaktów (build output)</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              - <H>uses:</H> <V>actions/upload-artifact@v4</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>with:</H>
            </Cmd>
            <Cmd>
              {'    '}
              <F>name:</F> <V>build-output</V>
            </Cmd>
            <Cmd>
              {'    '}
              <F>path:</F> <V>./dist</V>
            </Cmd>
            <Cmd>
              {'    '}
              <F>retention-days:</F> <V>7</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Pobranie w kolejnym jobie</Comment>
            <Cmd>
              - <H>uses:</H> <V>actions/download-artifact@v4</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>with:</H>
            </Cmd>
            <Cmd>
              {'    '}
              <F>name:</F> <V>build-output</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Cache zależności (npm/composer)</SectionLabel>
          <ExampleBlock>
            <Cmd>
              - <H>uses:</H> <V>actions/cache@v4</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>with:</H>
            </Cmd>
            <Cmd>
              {'    '}
              <F>path:</F> <V>~/.npm</V>
            </Cmd>
            <Cmd>
              {'    '}
              <F>key:</F>{' '}
              <V>
                {"${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}"}
              </V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* Deploy SSH */}
        <Card title="Deploy przez SSH" color="var(--c-accent)">
          <InfoBox>
            Dodaj klucz SSH jako sekret:{' '}
            <code className="text-xs">SSH_PRIVATE_KEY</code>
          </InfoBox>
          <ExampleBlock variant="default">
            <Cmd>
              - <H>name:</H> <V>Deploy to server</V>
            </Cmd>
            <Cmd>
              {'  '}
              <H>run:</H> <V>|</V>
            </Cmd>
            <Cmd>{'    '}mkdir -p ~/.ssh</Cmd>
            <Cmd>
              {'    '}echo <V>"$SSH_PRIVATE_KEY"</V> {'>'} ~/.ssh/id_rsa
            </Cmd>
            <Cmd>{'    '}chmod 600 ~/.ssh/id_rsa</Cmd>
            <Cmd>
              {'    '}ssh <H>-o StrictHostKeyChecking=no</H> <V>user@host</V>{' '}
              <F>'cd /app && git pull && npm ci'</F>
            </Cmd>
            <Cmd>
              {'  '}
              <H>env:</H>
            </Cmd>
            <Cmd>
              {'    '}
              <F>SSH_PRIVATE_KEY:</F> <V>{'${{ secrets.SSH_PRIVATE_KEY }}'}</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* Strategie deploymentu */}
        <Card title="Strategie deploymentu" full>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Concept title="Rolling Deploy">
              Nowa wersja wdraża się stopniowo — instancja po instancji. Zero
              downtime. Łatwy rollback.
            </Concept>
            <Concept title="Blue/Green" color="var(--c-green)">
              Dwa identyczne środowiska. Ruch przełączany jednym przełącznikiem
              (load balancer). Natychmiastowy rollback.
            </Concept>
            <Concept title="Canary Release" color="var(--c-yellow)">
              Nowa wersja dostaje np. 5% ruchu. Jeśli OK — stopniowe zwiększanie
              do 100%.
            </Concept>
            <Concept title="Recreate" color="var(--c-orange)">
              Stara wersja wyłączona → nowa uruchomiona. Prosty, ale jest
              chwilowy downtime. Dobry na dev/staging.
            </Concept>
          </div>
        </Card>

        {/* Przykład pełny pipeline */}
        <Card
          title="Pełny pipeline — build → test → deploy"
          full
          color="var(--c-orange)"
        >
          <ExampleBlock variant="orange">
            <Comment># .github/workflows/deploy.yml</Comment>
            <Cmd>
              <H>name:</H> <V>Build, Test & Deploy</V>
            </Cmd>
            <Cmd>
              <H>on:</H>
            </Cmd>
            <Cmd>
              {'  '}
              <H>push:</H>
            </Cmd>
            <Cmd>
              {'    '}
              <F>branches:</F> <V>[ main ]</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Cmd>
              <H>jobs:</H>
            </Cmd>
            <Cmd>
              {'  '}
              <H>test:</H>
            </Cmd>
            <Cmd>
              {'    '}
              <F>runs-on:</F> <V>ubuntu-latest</V>
            </Cmd>
            <Cmd>
              {'    '}
              <F>steps:</F>
            </Cmd>
            <Cmd>
              {'      '}- <H>uses:</H> <V>actions/checkout@v4</V>
            </Cmd>
            <Cmd>
              {'      '}- <H>uses:</H> <V>actions/setup-node@v4</V>
            </Cmd>
            <Cmd>
              {'        '}
              <H>with:</H>
            </Cmd>
            <Cmd>
              {'          '}
              <F>node-version:</F> <V>'20'</V>
            </Cmd>
            <Cmd>
              {'      '}- <H>run:</H> <V>npm ci && npm test</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Cmd>
              {'  '}
              <H>deploy:</H>
            </Cmd>
            <Cmd>
              {'    '}
              <F>needs:</F> <V>test</V>
            </Cmd>
            <Cmd>
              {'    '}
              <F>runs-on:</F> <V>ubuntu-latest</V>
            </Cmd>
            <Cmd>
              {'    '}
              <F>environment:</F> <V>production</V>
            </Cmd>
            <Cmd>
              {'    '}
              <F>steps:</F>
            </Cmd>
            <Cmd>
              {'      '}- <H>uses:</H> <V>actions/checkout@v4</V>
            </Cmd>
            <Cmd>
              {'      '}- <H>name:</H> <V>Deploy</V>
            </Cmd>
            <Cmd>
              {'        '}
              <F>run:</F> <V>./scripts/deploy.sh</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-xs">needs: test</code> — job{' '}
            <code className="text-xs">deploy</code> uruchomi się tylko gdy{' '}
            <code className="text-xs">test</code> zakończy się sukcesem.
          </InfoBox>
        </Card>
      </div>
    </div>
  );
}
