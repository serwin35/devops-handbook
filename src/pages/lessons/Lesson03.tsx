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

export default function Lesson03() {
  usePageTitle('Lekcja 03');

  return (
    <div>
      <PageHeader
        title="03 — Wiersz poleceń i Bash"
        subtitle="shell · potoki · zmienne środowiskowe · menedżer pakietów · PATH"
        color="var(--c-orange)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Jak działa powłoka (shell)?" full>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Concept title="Powłoka (Shell)" color="var(--c-orange)">
              Program, który tłumaczy polecenia użytkownika na instrukcje
              zrozumiałe dla jądra systemu. Najpopularniejsza:{' '}
              <b>Bash (Bourne Again SHell)</b>.
            </Concept>
            <Concept title="Inne powłoki" color="var(--c-purple)">
              <b>Zsh</b> — lepsze autouzupełnianie, motywy. <b>Fish</b> —
              kolorowa składnia, sugestie. Bash pozostaje standardem na
              serwerach.
            </Concept>
          </div>
        </Card>

        <Card title="Cykl życia polecenia" color="var(--c-yellow)">
          <Row code="1">Powłoka odczytuje i analizuje polecenie</Row>
          <Row code="2">
            Wyszukuje program w katalogach z <code>$PATH</code>
          </Row>
          <Row code="3">Prosi jądro (kernel) o uruchomienie procesu</Row>
          <Row code="4">Jądro wykonuje program</Row>
          <Row code="5">Wynik wraca do powłoki</Row>
          <Row code="6">Powłoka wyświetla wynik w terminalu</Row>
          <InfoBox>
            Gdy wpisujesz <code className="text-xs">ls</code>, system
            przeszukuje katalogi z <code className="text-xs">$PATH</code> (np.{' '}
            <code className="text-xs">/bin</code>,{' '}
            <code className="text-xs">/usr/bin</code>) aż znajdzie plik
            wykonywalny.
          </InfoBox>
        </Card>

        <Card title="Potoki (pipes) |" color="var(--c-green)">
          <Concept title="Czym jest potok?" color="var(--c-green)">
            Znak <b>|</b> przekierowuje wyjście jednego polecenia na wejście
            kolejnego. Łączy proste narzędzia w złożone operacje.
          </Concept>
          <Divider />
          <SectionLabel className="mt-2">
            Przykład: filtrowanie logów
          </SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Listuj pliki .log w /var/log</Comment>
            <Cmd>
              ls -l <F>/var/log/</F> {' | '} grep <V>".log"</V>
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">
            Przykład: zliczanie sesji SSH
          </SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Policz procesy sshd</Comment>
            <Cmd>
              ps aux {' | '} grep <V>"sshd"</V> {' | '} wc <H>-l</H>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Każdy <code className="text-xs">|</code> to połączenie: wyjście A
            {' → '} wejście B {' → '} wyjście B {' → '} wejście C...
          </InfoBox>
        </Card>

        <Card title="Zmienne i środowisko" color="var(--c-purple)">
          <Concept title="Zmienna środowiskowa" color="var(--c-purple)">
            Dynamiczna wartość używana przez procesy w systemie. Przechowuje np.
            nazwę użytkownika, ścieżkę domową, listę katalogów do przeszukania.
          </Concept>
          <Divider />
          <SectionLabel className="mt-2">Tworzenie i użycie</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Zmienna lokalna</Comment>
            <Cmd>
              <V>POZDROWIENIE</V>=<F>"Witaj w świecie DevOps!"</F>
            </Cmd>
            <Cmd>
              echo <V>$POZDROWIENIE</V>
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">Wbudowane zmienne</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              echo <V>$USER</V>{' '}
              <span className="text-[var(--c-muted)]">
                # aktualny użytkownik
              </span>
            </Cmd>
            <Cmd>
              echo <V>$HOME</V>{' '}
              <span className="text-[var(--c-muted)]"># katalog domowy</span>
            </Cmd>
            <Cmd>
              echo <V>$SHELL</V>{' '}
              <span className="text-[var(--c-muted)]"># używana powłoka</span>
            </Cmd>
            <Cmd>
              echo <V>$PATH</V>{' '}
              <span className="text-[var(--c-muted)]">
                # ścieżki do programów
              </span>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card
          title="$PATH — jak system znajduje programy"
          color="var(--c-accent)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Lista katalogów oddzielonych dwukropkami, w których powłoka szuka
            plików wykonywalnych.
          </p>
          <ExampleBlock>
            <Comment># Wyświetl PATH</Comment>
            <Cmd>
              echo <V>$PATH</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Wynik (przykładowy)</Comment>
            <Cmd>
              <span className="text-[var(--c-muted)] text-[10px]">
                /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
              </span>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Gdy wpisujesz <code className="text-xs">grep</code>, powłoka
            sprawdza po kolei:{' '}
            <code className="text-xs">/usr/local/bin/grep</code>
            {' → '}
            <code className="text-xs">/usr/bin/grep</code> {' → '} ...aż
            znajdzie.
          </InfoBox>
        </Card>

        <Card
          title="export — zmienne dla procesów potomnych"
          color="var(--c-orange)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Zmienna lokalna jest widoczna tylko w bieżącej sesji. Aby była
            dostępna dla programów uruchamianych z tej powłoki, należy ją
            wyeksportować.
          </p>
          <ExampleBlock variant="orange">
            <Comment># Eksportuj zmienną</Comment>
            <Cmd>
              export <V>POZDROWIENIE</V>=<F>"Witaj!"</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Stała zmienna (po restarcie terminala)</Comment>
            <Cmd>
              echo <F>'export STATUS="aktywny"'</F> {'>> '} <H>~/.bashrc</H>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Zmienne w <code className="text-xs">~/.bashrc</code> lub{' '}
            <code className="text-xs">~/.profile</code> są ładowane przy każdym
            otwarciu terminala.
          </InfoBox>
        </Card>

        <Card title="Menedżer pakietów" color="var(--c-green)" full>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Concept title="APT (Debian / Ubuntu)" color="var(--c-green)">
              <code>apt</code> — Advanced Package Tool. Standard w dystrybucjach
              opartych na Debianie.
            </Concept>
            <Concept title="DNF (Red Hat / Fedora)" color="var(--c-orange)">
              <code>dnf</code> — Dandified YUM. Standard w nowszych wersjach Red
              Hat, CentOS, Fedora.
            </Concept>
          </div>
          <Divider />
          <p className="text-[var(--c-muted)] text-xs mb-2 mt-2">
            Automatyzuje instalację, aktualizację, usuwanie i rozwiązywanie
            zależności.
          </p>
        </Card>

        <Card title="APT — podstawowe operacje" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment>
              # Aktualizuj listę pakietów (zawsze przed install!)
            </Comment>
            <Cmd>
              sudo apt <H>update</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Zainstaluj pakiet</Comment>
            <Cmd>
              sudo apt install <V>nano</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Odinstaluj pakiet</Comment>
            <Cmd>
              sudo apt remove <V>nano</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Wyszukaj pakiet</Comment>
            <Cmd>
              apt search <V>"web server"</V>
            </Cmd>
          </ExampleBlock>
          <div className="text-center mt-2">
            <Link
              to="/cheatsheets/package-management"
              className="text-[11px] text-[var(--c-accent)] hover:text-[var(--c-green)]"
            >
              Pełny cheatsheet &rarr;
            </Link>
          </div>
        </Card>

        <Card title="Potoki w praktyce — zaawansowane" color="var(--c-yellow)">
          <SectionLabel>Filtrowanie logów UFW</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Policz zablokowane połączenia</Comment>
            <Cmd>
              cat <F>/var/log/ufw.log</F> {' | '} grep <V>"BLOCK"</V> {' | '} wc{' '}
              <H>-l</H>
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">Zliczanie plików conf</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Ile plików z "conf" w /etc?</Comment>
            <Cmd>
              ls <F>/etc</F> {' | '} grep <V>"conf"</V> {' | '} wc <H>-l</H>
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">
            Top 5 użytkowników wg procesów
          </SectionLabel>
          <ExampleBlock variant="yellow">
            <Cmd>
              ps aux {' | '} awk{' '}
              <V>
                '{'{'}print $1{'}'}'
              </V>{' '}
              {' | '} sort {' | '} uniq <H>-c</H> {' | '} sort <H>-rn</H>{' '}
              {' | '} head <H>-5</H>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="AI w terminalu" color="var(--c-accent)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Asystenci AI (ChatGPT, Gemini, Copilot) pomagają w pracy z CLI:
          </p>
          <Row code="Generowanie">
            "Napisz polecenie które znajdzie pliki {'>'} 100MB w /var/log"
          </Row>
          <Row code="Tłumaczenie">
            Wklej skomplikowane polecenie i poproś o wyjaśnienie krok po kroku
          </Row>
          <Row code="Debugowanie">
            Wklej skrypt który nie działa — AI znajdzie błąd
          </Row>
          <InfoBox>
            AI nie zastąpi zrozumienia — zawsze weryfikuj sugerowane polecenia
            przed uruchomieniem na produkcji!
          </InfoBox>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/02', label: '02 — Systemy operacyjne i Linux' }}
        next={{ to: '/lessons/04', label: '04 — Wkrótce...' }}
      />
    </div>
  );
}
