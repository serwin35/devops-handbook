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

export default function Lesson10() {
  usePageTitle('Lekcja 10 — Repozytoria');

  return (
    <div>
      <PageHeader
        title="Lekcja 10 — Repozytoria"
        subtitle="Git, galezienie, Git Flow, GitHub, GitLab, Bitbucket, wspolpraca zespolowa"
        color="var(--c-accent)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === SEKCJA 1: Git — podstawy === */}
        <Card title="Git — podstawy" color="var(--c-accent)">
          <Concept title="System kontroli wersji" color="var(--c-accent)">
            Git sledzi zmiany w plikach i umozliwia wspolprace wielu osob nad
            jednym projektem. Kazda zmiana jest zapisana jako migawka (snapshot)
            calego projektu.
          </Concept>

          <Divider />
          <SectionLabel>Wewnetrzna struktura</SectionLabel>
          <Row code="Blob">zawartosc pliku (bez nazwy)</Row>
          <Row code="Tree">katalog (odwolania do blobow i innych tree)</Row>
          <Row code="Commit">
            migawka projektu + metadane (autor, data, wiadomosc)
          </Row>

          <Divider />
          <SectionLabel>Trzy obszary pracy</SectionLabel>
          <ExampleBlock>
            <Cmd>
              <F>Working directory</F> → <V>Staging area</V> → <H>Repository</H>
            </Cmd>
            <Comment>
              {'  '}(pliki lokalne) {'    '}(git add) {'       '}(git commit)
            </Comment>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Konfiguracja poczatkowa</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              <H>git config</H> --global <V>user.name</V> <F>"Jan Kowalski"</F>
            </Cmd>
            <Cmd>
              <H>git config</H> --global <V>user.email</V>{' '}
              <F>"jan@example.com"</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Sprawdzenie konfiguracji</Comment>
            <Cmd>
              <H>git config</H> --list
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Inicjalizacja i commity === */}
        <Card title="Inicjalizacja i commity" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Podstawowy cykl pracy z Gitem — od utworzenia repozytorium do
            zapisania zmian.
          </p>
          <ExampleBlock variant="green">
            <Comment># Inicjalizacja nowego repozytorium</Comment>
            <Cmd>
              <H>git init</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Dodanie pliku do staging area</Comment>
            <Cmd>
              <H>git add</H> <V>somefile.js</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Dodanie wszystkich zmian</Comment>
            <Cmd>
              <H>git add</H> <V>.</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Sprawdzenie statusu</Comment>
            <Cmd>
              <H>git status</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Zapisanie zmian (commit)</Comment>
            <Cmd>
              <H>git commit</H> -m <F>"message"</F>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Dobre wiadomosci commitow</SectionLabel>
          <Row code="1">Pierwsza linia: max 50 znakow, tryb rozkazujacy</Row>
          <Row code="2">Pusta linia oddzielajaca</Row>
          <Row code="3">Opcjonalny opis szczegolowy (max 72 znaki/linia)</Row>

          <ExampleBlock>
            <Cmd>
              <H>git commit</H> -m <F>"Add user login validation</F>
            </Cmd>
            <Cmd>
              <F>Validate email format and password length</F>
            </Cmd>
            <Cmd>
              <F>before sending request to API."</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Historia i przegladanie === */}
        <Card title="Historia i przegladanie" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Polecenia do przegladania historii commitow i zawartosci
            repozytorium.
          </p>
          <ExampleBlock variant="purple">
            <Comment># Historia commitow</Comment>
            <Cmd>
              <H>git log</H>
            </Cmd>
            <Cmd>
              <H>git log</H> <V>--oneline</V>
            </Cmd>
            <Cmd>
              <H>git log</H> <V>-p</V>
            </Cmd>
            <Comment># z diffami</Comment>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Wizualizacja galezi</Comment>
            <Cmd>
              <H>git log</H> <V>--graph --all --decorate</V>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Podglad commita</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Pelne szczegoly commita</Comment>
            <Cmd>
              <H>git show</H> <V>&lt;hash&gt;</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Tylko konkretny plik z commita</Comment>
            <Cmd>
              <H>git show</H> <V>&lt;hash&gt;</V> -- <F>file.js</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Tylko metadane (bez diffa)</Comment>
            <Cmd>
              <H>git show</H> <V>&lt;hash&gt;</V> --no-patch
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Usuwanie plikow</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Usun plik z repo i z dysku</Comment>
            <Cmd>
              <H>git rm</H> <V>somefile.js</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Usun tylko z repo (zostaw na dysku)</Comment>
            <Cmd>
              <H>git rm</H> --cached <V>somefile.js</V>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Cofanie zmian (Git 2.23+)</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Cofnij zmiany w pliku (working directory)</Comment>
            <Cmd>
              <H>git restore</H> <V>somefile.js</V>
            </Cmd>
            <Comment># Cofnij plik ze staging area</Comment>
            <Cmd>
              <H>git restore</H> --staged <V>somefile.js</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-xs">git switch</code> i{' '}
            <code className="text-xs">git restore</code> zostaly wprowadzone w
            Git 2.23 jako czytelniejsze zamienniki{' '}
            <code className="text-xs">git checkout</code>, ktory robil zbyt
            wiele rzeczy naraz (przelaczal galaz i cofal pliki).
          </InfoBox>
        </Card>

        {/* === SEKCJA 2: Galezienie i scalanie === */}
        <Card title="Galezienie (Branches)" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Galezienie pozwalaja na rownolegle pracowanie nad roznymi
            funkcjonalnosciami bez wplywu na glowny kod.
          </p>
          <ExampleBlock variant="yellow">
            <Comment># Utworzenie nowej galezi</Comment>
            <Cmd>
              <H>git branch</H> <V>nazwa</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Przelaczenie na galaz (klasyczne)</Comment>
            <Cmd>
              <H>git checkout</H> <V>nazwa</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Przelaczenie — nowsze polecenie (Git 2.23+)</Comment>
            <Cmd>
              <H>git switch</H> <V>nazwa</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Utworzenie i przelaczenie jednoczesnie</Comment>
            <Cmd>
              <H>git checkout</H> -b <V>nazwa</V>
            </Cmd>
            <Comment># lub (Git 2.23+)</Comment>
            <Cmd>
              <H>git switch</H> -c <V>nazwa</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Lista galezi</Comment>
            <Cmd>
              <H>git branch</H>
            </Cmd>
            <Comment># lokalne</Comment>
            <Cmd>
              <H>git branch</H> <V>-a</V>
            </Cmd>
            <Comment># wszystkie (+ zdalne)</Comment>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Konwencje nazewnictwa</SectionLabel>
          <Row code="main">kod produkcyjny (stabilny)</Row>
          <Row code="develop">galaz deweloperska</Row>
          <Row code="feature/*">nowe funkcjonalnosci</Row>
          <Row code="bugfix/*">poprawki bledow</Row>
          <Row code="hotfix/*">pilne poprawki produkcyjne</Row>
        </Card>

        {/* === Scalanie (Merge) === */}
        <Card title="Scalanie (Merge)" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Laczenie zmian z jednej galezi do drugiej.
          </p>
          <ExampleBlock variant="green">
            <Comment># Scalenie galezi do aktualnej</Comment>
            <Cmd>
              <H>git merge</H> <V>nazwa_galezi</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Zachowanie historii galezi (bez fast-forward)</Comment>
            <Cmd>
              <H>git merge</H> --no-ff <V>nazwa_galezi</V>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Typy scalania</SectionLabel>
          <Row code="Fast-forward">
            prosta aktualizacja wskaznika (liniowa historia)
          </Row>
          <Row code="Merge commit">nowy commit laczacy dwie galezi</Row>
          <Row code="--no-ff">
            wymusza merge commit, zachowuje historie galezi
          </Row>

          <Divider />
          <SectionLabel>Konflikty scalania</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>
              <F>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</F>
            </Cmd>
            <Cmd>kod z aktualnej galezi</Cmd>
            <Cmd>
              <V>=======</V>
            </Cmd>
            <Cmd>kod z scalanej galezi</Cmd>
            <Cmd>
              <F>&gt;&gt;&gt;&gt;&gt;&gt;&gt; branch-name</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Po rozwiazaniu konfliktow:</Comment>
            <Cmd>
              <H>git add</H> <V>plik_z_konfliktem.js</V>
            </Cmd>
            <Cmd>
              <H>git commit</H> -m <F>"Resolve merge conflict"</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Diff i Stash === */}
        <Card title="Diff, Stash i inne" color="var(--c-orange)">
          <SectionLabel>Porownywanie zmian</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Zmiany w working directory</Comment>
            <Cmd>
              <H>git diff</H>
            </Cmd>
            <Comment># Zmiany w staging area</Comment>
            <Cmd>
              <H>git diff</H> --staged
            </Cmd>
            <Comment># Porownanie dwoch galezi</Comment>
            <Cmd>
              <H>git diff</H> <V>main</V>..<V>feature/login</V>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Odkladanie zmian (Stash)</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Odloz biezace zmiany na polke</Comment>
            <Cmd>
              <H>git stash</H>
            </Cmd>
            <Comment># Przywroc odlozone zmiany</Comment>
            <Cmd>
              <H>git stash</H> pop
            </Cmd>
            <Comment># Lista odlozonych zmian</Comment>
            <Cmd>
              <H>git stash</H> list
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-xs">git stash</code> jest nieoceniony gdy
            musisz szybko przelaczac galaz, a masz niezacommitowane zmiany.
            Unika bledu "Your local changes would be overwritten".
          </InfoBox>
        </Card>

        {/* === Git Flow === */}
        <Card title="Git Flow" color="var(--c-purple)">
          <Concept title="Model branchowania" color="var(--c-purple)">
            Popularny model branchowania definiujacy jasne zasady wspolpracy
            zespolowej. Dwie glowne galezi: <b>main</b> (stabilny kod
            produkcyjny) i <b>develop</b> (galaz integracji).
          </Concept>

          <Divider />
          <SectionLabel>Przeplyw pracy</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              <F>feature/*</F> → <V>develop</V> → <H>release/*</H> → <H>main</H>
            </Cmd>
            <Cmd>{'                              '}↓</Cmd>
            <Cmd>
              {'                        '}
              <F>hotfix/*</F> → <H>main</H> + <V>develop</V>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>8 krokow Git Flow</SectionLabel>
          <Row code="1">Utworz galaz feature z develop</Row>
          <Row code="2">Pracuj nad funkcjonalnoscia (commity)</Row>
          <Row code="3">Scalenie feature do develop</Row>
          <Row code="4">Utworz galaz release z develop</Row>
          <Row code="5">Testy i poprawki na release</Row>
          <Row code="6">Scalenie release do main (tag wersji)</Row>
          <Row code="7">Scalenie release do develop</Row>
          <Row code="8">Hotfixy: z main, scalenie do main + develop</Row>
        </Card>

        {/* === SEKCJA 3: Rebase i zdalne repo === */}
        <Card title="Rebase" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Alternatywa dla merge — przepisuje historie commitow tak, aby byla
            liniowa.
          </p>
          <ExampleBlock variant="orange">
            <Comment># Rebase aktualnej galezi na inna</Comment>
            <Cmd>
              <H>git rebase</H> <V>nazwa_galezi</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Interaktywny rebase (edycja commitow)</Comment>
            <Cmd>
              <H>git rebase</H> -i <V>HEAD~3</V>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Merge vs Rebase</SectionLabel>
          <Row code="Merge">zachowuje pelna historie rozgalezien</Row>
          <Row code="Rebase">tworzy czysta, liniowa historie</Row>

          <InfoBox warn>
            <b>Zlota zasada:</b> NIGDY nie robimy rebase na publicznych
            galeziach (main, develop). Rebase stosujemy TYLKO na lokalnych
            galeziach feature. Przepisywanie historii publicznej galezi powoduje
            konflikty u innych czlonkow zespolu.
          </InfoBox>
        </Card>

        {/* === Klonowanie i zdalne repo === */}
        <Card title="Klonowanie i zdalne repo" color="var(--c-accent)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Praca ze zdalnymi repozytoriami — pobieranie, wysylanie i
            synchronizacja zmian.
          </p>
          <ExampleBlock>
            <Comment># Klonowanie zdalnego repozytorium</Comment>
            <Cmd>
              <H>git clone</H> <V>url</V>
            </Cmd>
            <Cmd>
              <H>git clone</H> <V>url</V> <F>my-directory</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># origin — domyslna nazwa zdalnego repo</Comment>
            <Cmd>
              <H>git remote</H> <V>-v</V>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Wysylanie i pobieranie</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Wyslanie zmian na serwer</Comment>
            <Cmd>
              <H>git push</H> <V>origin</V> <F>main</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Pobranie i scalenie zmian</Comment>
            <Cmd>
              <H>git pull</H>
            </Cmd>
            <Comment># = fetch + merge</Comment>
            <Cmd>
              <H>git pull</H> <V>--verbose</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Samo pobranie (bez scalania)</Comment>
            <Cmd>
              <H>git fetch</H> <V>origin</V>
            </Cmd>
          </ExampleBlock>

          <Divider />
          <SectionLabel>Przydatne komendy</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Dodanie nowego zdalnego repo</Comment>
            <Cmd>
              <H>git remote add</H> <V>upstream</V> <F>url</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Sledzenie zdalnej galezi</Comment>
            <Cmd>
              <H>git push</H> -u <V>origin</V> <F>feature/login</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Usuniecie zdalnej galezi</Comment>
            <Cmd>
              <H>git push</H> <V>origin</V> --delete <F>stara-galaz</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === GitHub, GitLab, Bitbucket === */}
        <Card title="GitHub, GitLab, Bitbucket" color="var(--c-yellow)" full>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Concept title="GitHub" color="var(--c-accent)">
              Nalezacy do Microsoftu, najwieksza platforma. Pull Requests,
              GitHub Actions (CI/CD), Issues, Wiki, GitHub Pages. Ogromna
              spolecznosc open-source.
            </Concept>
            <Concept title="GitLab" color="var(--c-orange)">
              Open-source, wbudowane CI/CD (GitLab CI). Mozliwosc self-hosted
              (wlasny serwer). Merge Requests, DevSecOps. Kompleksowe narzedzia
              do zarzadzania projektem.
            </Concept>
            <Concept title="Bitbucket" color="var(--c-purple)">
              Nalezacy do Atlassian (integracja z Jira). Darmowe prywatne
              repozytoria. Bitbucket Pipelines (CI/CD). Popularny w srodowiskach
              korporacyjnych.
            </Concept>
          </div>
          <InfoBox>
            Kazda z platform oferuje CI/CD, code review i zarzadzanie
            projektami. Wybor zalezy od potrzeb zespolu — GitHub dominuje w
            open-source, GitLab w self-hosted, Bitbucket w ekosystemie
            Atlassian.
          </InfoBox>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/09', label: '09 — Narzedzia Uniksa cz. 2' }}
        next={{ to: '/lessons/11', label: '11 — Wkrotce' }}
      />
    </div>
  );
}
