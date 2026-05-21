import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import ExampleBlock, {
  Cmd,
  Comment,
  H,
  V,
} from '../../components/ExampleBlock';
import Row from '../../components/Row';
import Divider from '../../components/Divider';
import InfoBox from '../../components/InfoBox';
import SectionLabel from '../../components/SectionLabel';

export default function PipVenv() {
  usePageTitle('pip & venv');

  return (
    <div>
      <PageHeader
        title="pip & venv"
        subtitle="instalacja pakietow · srodowiska wirtualne · requirements · pipx · uv"
        color="var(--c-yellow)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === Po co venv === */}
        <Card title="Po co venv?" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Globalne instalowanie pakietow przez{' '}
            <code className="text-xs">pip install</code>
            <b> robi balagan</b> — projekty walcza o wersje, system Python sie
            psuje. <b>venv</b> daje kazdemu projektowi izolowane srodowisko.
          </p>
          <Row code="-">brak konfliktow wersji miedzy projektami</Row>
          <Row code="-">
            latwy <code className="text-xs">requirements.txt</code>
          </Row>
          <Row code="-">nie dotykasz systemowego Pythona</Row>
          <Row code="-">replikacja na produkcji 1:1</Row>
          <InfoBox>
            Od Debian 12 / Ubuntu 23.04 globalne{' '}
            <code className="text-xs">pip install</code>
            <b> jest zablokowane</b> (PEP 668). Musisz uzyc venv lub pipx.
          </InfoBox>
        </Card>

        {/* === venv === */}
        <Card title="venv — stworz i aktywuj" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Utworz srodowisko (folder .venv)</Comment>
            <Cmd>
              python3 -m venv <V>.venv</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Aktywuj (Linux / macOS)</Comment>
            <Cmd>source .venv/bin/activate</Cmd>
            <Cmd> </Cmd>
            <Comment># Aktywuj (Windows PowerShell)</Comment>
            <Cmd>.\.venv\Scripts\Activate.ps1</Cmd>
            <Cmd> </Cmd>
            <Comment># Aktywuj (Windows cmd)</Comment>
            <Cmd>.venv\Scripts\activate.bat</Cmd>
            <Cmd> </Cmd>
            <Comment># Po aktywacji prompt zmienia sie na (.venv)</Comment>
            <Cmd>
              which python <Comment># /sciezka/.venv/bin/python</Comment>
            </Cmd>
            <Cmd>python --version</Cmd>
            <Cmd> </Cmd>
            <Comment># Wyjdz z venv</Comment>
            <Cmd>deactivate</Cmd>
          </ExampleBlock>
          <InfoBox>
            Folder <code className="text-xs">.venv/</code> dodaj do
            <code className="text-xs"> .gitignore</code> — to artefakt lokalny,
            nie commit-uj go.
          </InfoBox>
        </Card>

        {/* === pip podstawy === */}
        <Card title="pip — instalacja pakietow" color="var(--c-accent)">
          <ExampleBlock>
            <Comment># Zainstaluj pakiet</Comment>
            <Cmd>
              pip install <V>requests</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Konkretna wersja</Comment>
            <Cmd>
              pip install <V>"requests==2.31.0"</V>
            </Cmd>
            <Cmd>
              pip install <V>"requests&gt;=2.30,&lt;3"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Wiele pakietow</Comment>
            <Cmd>pip install requests pyyaml boto3</Cmd>
            <Cmd> </Cmd>
            <Comment># Upgrade</Comment>
            <Cmd>
              pip install <H>--upgrade</H> requests
            </Cmd>
            <Cmd>
              pip install <H>-U</H> pip <Comment># sam pip</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Odinstaluj</Comment>
            <Cmd>pip uninstall requests</Cmd>
            <Cmd> </Cmd>
            <Comment># Lista zainstalowanych</Comment>
            <Cmd>pip list</Cmd>
            <Cmd>
              pip list <H>--outdated</H> <Comment># stare wersje</Comment>
            </Cmd>
            <Cmd>
              pip show requests <Comment># info o pakiecie</Comment>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === requirements.txt === */}
        <Card title="requirements.txt" color="var(--c-blue)" full>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Plik z lista zaleznosci projektu — pozwala odtworzyc srodowisko
            <b> 1:1</b> na innym kompie / serwerze / w CI.
          </p>
          <SectionLabel>Wygeneruj z aktywnego venv</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>pip freeze &gt; requirements.txt</Cmd>
          </ExampleBlock>
          <SectionLabel>Przykladowa zawartosc</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>requests==2.31.0</Cmd>
            <Cmd>pyyaml==6.0.1</Cmd>
            <Cmd>boto3&gt;=1.34.0,&lt;2</Cmd>
            <Cmd>
              flask~=3.0 <Comment># compatible release</Comment>
            </Cmd>
          </ExampleBlock>
          <SectionLabel>Instaluj z pliku</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              pip install <H>-r</H> requirements.txt
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Bez cache (CI/CD, mniejsze obrazy Docker)</Comment>
            <Cmd>
              pip install <H>--no-cache-dir</H> -r requirements.txt
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Tylko sprawdz, nie instaluj</Comment>
            <Cmd>
              pip install <H>--dry-run</H> -r requirements.txt
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Zalecane <b>pinowanie</b> dokladnych wersji (
            <code className="text-xs">==</code>) w produkcji — inaczej build
            dzialajacy dzis moze sie zepsuc jutro przez transitive update.
          </InfoBox>
        </Card>

        {/* === Workflow === */}
        <Card title="Typowy workflow projektu" color="var(--c-purple)" full>
          <ExampleBlock variant="purple">
            <Comment># 1. Sklonuj repo i wejdz</Comment>
            <Cmd>git clone https://... project &amp;&amp; cd project</Cmd>
            <Cmd> </Cmd>
            <Comment># 2. Stworz i aktywuj venv</Comment>
            <Cmd>python3 -m venv .venv</Cmd>
            <Cmd>source .venv/bin/activate</Cmd>
            <Cmd> </Cmd>
            <Comment># 3. Upgrade pip (zalecane)</Comment>
            <Cmd>pip install --upgrade pip</Cmd>
            <Cmd> </Cmd>
            <Comment># 4. Zainstaluj zaleznosci</Comment>
            <Cmd>pip install -r requirements.txt</Cmd>
            <Cmd> </Cmd>
            <Comment># 5. Pracuj nad projektem</Comment>
            <Cmd>python app.py</Cmd>
            <Cmd> </Cmd>
            <Comment># 6. Dodano nowa zaleznosc? Zapisz</Comment>
            <Cmd>pip install httpx</Cmd>
            <Cmd>pip freeze &gt; requirements.txt</Cmd>
            <Cmd>
              git add requirements.txt &amp;&amp; git commit -m{' '}
              <V>"add httpx"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 7. Po pracy</Comment>
            <Cmd>deactivate</Cmd>
          </ExampleBlock>
        </Card>

        {/* === pipx === */}
        <Card title="pipx — globalne narzedzia CLI" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Do narzedzi CLI pisanych w Pythonie (ansible, ruff, httpie,
            youtube-dl) — instaluje kazde w osobnym venv, ale wystawia jako
            globalna komenda.
          </p>
          <ExampleBlock variant="orange">
            <Cmd>
              sudo apt install pipx <Comment># Debian/Ubuntu</Comment>
            </Cmd>
            <Cmd>
              brew install pipx <Comment># macOS</Comment>
            </Cmd>
            <Cmd>
              pipx ensurepath <Comment># PATH setup</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>pipx install ansible</Cmd>
            <Cmd>pipx install ruff</Cmd>
            <Cmd>pipx install httpie</Cmd>
            <Cmd> </Cmd>
            <Cmd>
              pipx list <Comment># lista narzedzi</Comment>
            </Cmd>
            <Cmd>pipx upgrade ruff</Cmd>
            <Cmd>pipx uninstall httpie</Cmd>
            <Cmd> </Cmd>
            <Comment># Uruchom jednorazowo (bez instalacji)</Comment>
            <Cmd>
              pipx run cowsay <V>"hello"</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === uv === */}
        <Card title="uv — nowoczesna alternatywa" color="var(--c-accent)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            <code className="text-xs">uv</code> (Astral, autorzy ruff) —
            <b> 10-100x szybszy</b> niz pip, zarzadza tez wersjami Pythona.
            Coraz popularniejszy w nowych projektach.
          </p>
          <ExampleBlock>
            <Comment># Instalacja (Linux/macOS)</Comment>
            <Cmd>curl -LsSf https://astral.sh/uv/install.sh | sh</Cmd>
            <Cmd> </Cmd>
            <Comment># Stworz venv</Comment>
            <Cmd>uv venv .venv</Cmd>
            <Cmd>source .venv/bin/activate</Cmd>
            <Cmd> </Cmd>
            <Comment># Instalacja (drop-in replacement dla pip)</Comment>
            <Cmd>uv pip install requests</Cmd>
            <Cmd>uv pip install -r requirements.txt</Cmd>
            <Cmd> </Cmd>
            <Comment># Pelen workflow (nowy projekt)</Comment>
            <Cmd>uv init myapp &amp;&amp; cd myapp</Cmd>
            <Cmd>uv add requests boto3</Cmd>
            <Cmd>uv run python app.py</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Docker === */}
        <Card title="W Dockerze" color="var(--c-blue)" full>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            W obrazie Dockera <b>nie potrzebujesz venv</b> — sam kontener jest
            izolacja. Ale pin pip i kopiuj{' '}
            <code className="text-xs">requirements.txt</code>
            <b> osobno</b> dla lepszego cache.
          </p>
          <ExampleBlock variant="default">
            <Cmd>
              <H>FROM</H> python:3.12-slim
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>WORKDIR</H> /app
            </Cmd>
            <Cmd> </Cmd>
            <Comment>
              # 1) Najpierw tylko requirements — cache pip layer
            </Comment>
            <Cmd>
              <H>COPY</H> requirements.txt .
            </Cmd>
            <Cmd>
              <H>RUN</H> pip install --no-cache-dir -r requirements.txt
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 2) Potem kod (zmienia sie czesciej)</Comment>
            <Cmd>
              <H>COPY</H> . .
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>CMD</H> [<V>"python"</V>, <V>"app.py"</V>]
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Dlaczego ten porzadek? Docker cache-uje layery. Jak zmienisz tylko
            kod, pip zostanie z cache (~30s oszczednosci na rebuild).
          </InfoBox>
        </Card>

        {/* === Czesto === */}
        <Card title="Najczestsze problemy" color="var(--c-purple)" full>
          <SectionLabel>error: externally-managed-environment</SectionLabel>
          <p className="text-[11px] text-[var(--c-muted)] mb-2">
            Debian 12+ / Ubuntu 23.04+ blokuje globalny{' '}
            <code className="text-xs">pip install</code>. Rozwiazanie: uzyj venv
            lub pipx (nie{' '}
            <code className="text-xs">--break-system-packages</code>).
          </p>
          <Divider />
          <SectionLabel>ModuleNotFoundError mimo pip install</SectionLabel>
          <p className="text-[11px] text-[var(--c-muted)] mb-2">
            Sprawdz: aktywne venv? <code className="text-xs">which python</code>{' '}
            vs
            <code className="text-xs"> which pip</code> — czy to ten sam Python?
            Czesto pip instaluje w Python 2, a uruchamiasz Python 3. Uzyj{' '}
            <code className="text-xs">python3 -m pip install ...</code>.
          </p>
          <Divider />
          <SectionLabel>SSL Error / TUF</SectionLabel>
          <p className="text-[11px] text-[var(--c-muted)] mb-2">
            Stare certyfikaty CA. Update{' '}
            <code className="text-xs">ca-certificates</code>
            albo <code className="text-xs">pip install --upgrade certifi</code>.
          </p>
          <Divider />
          <SectionLabel>Wolne pip na CI</SectionLabel>
          <p className="text-[11px] text-[var(--c-muted)] mb-2">
            Wlacz cache w GitHub Actions / GitLab CI (
            <code className="text-xs">~/.cache/pip</code>). Albo zmien na{' '}
            <code className="text-xs">uv pip install</code> — 10x szybszy.
          </p>
        </Card>

        {/* === Sciaga === */}
        <Card title="Najwazniejsze komendy" color="var(--c-green)" full>
          <Row code="python3 -m venv .venv">utworz venv</Row>
          <Row code="source .venv/bin/activate">aktywuj (Linux/macOS)</Row>
          <Row code="deactivate">wyjdz z venv</Row>
          <Row code="pip install requests">zainstaluj pakiet</Row>
          <Row code="pip install -r requirements.txt">instaluj z pliku</Row>
          <Row code="pip freeze &gt; requirements.txt">
            zapisz biezace wersje
          </Row>
          <Row code="pip list --outdated">co jest stare</Row>
          <Row code="pip show requests">szczegoly pakietu</Row>
          <Row code="pip uninstall requests">odinstaluj</Row>
          <Row code="pipx install ansible">global CLI tool</Row>
          <Row code="python3 -m pip install ...">
            jak masz watpliwosci ktory pip
          </Row>
        </Card>
      </div>
    </div>
  );
}
