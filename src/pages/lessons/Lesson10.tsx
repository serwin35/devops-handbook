import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import LessonNav from '../../components/LessonNav';
import { usePageTitle } from '../../hooks/usePageTitle';

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
        <Card title="Git — podstawy">
          <p className="text-sm mb-3">
            System kontroli wersji — sledzi zmiany w plikach i umozliwia
            wspolprace wielu osob nad jednym projektem.
          </p>
          <p className="text-sm font-semibold mb-1">Wewnetrzna struktura:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>
              <strong>Blob</strong> — zawartosc pliku (bez nazwy)
            </li>
            <li>
              <strong>Tree</strong> — katalog (odwolania do blobow i innych
              tree)
            </li>
            <li>
              <strong>Commit</strong> — migawka projektu + metadane (autor,
              data, wiadomosc)
            </li>
          </ul>
          <p className="text-sm font-semibold mb-1">Trzy obszary pracy:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`Working directory  →  Staging area  →  Repository
  (pliki lokalne)     (git add)        (git commit)`}
          </pre>
          <p className="text-sm font-semibold mb-1">Konfiguracja poczatkowa:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`git config --global user.name "Jan Kowalski"
git config --global user.email "jan@example.com"

# Sprawdzenie konfiguracji
git config --list`}
          </pre>
        </Card>

        <Card title="Inicjalizacja i commity">
          <p className="text-sm mb-2">
            Podstawowy cykl pracy z Gitem — od utworzenia repozytorium do
            zapisania zmian.
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Inicjalizacja nowego repozytorium
git init

# Dodanie pliku do staging area
git add somefile.js

# Dodanie wszystkich zmian
git add .

# Sprawdzenie statusu
git status

# Zapisanie zmian (commit)
git commit -m "message"`}
          </pre>
          <p className="text-sm font-semibold mb-1">
            Dobre wiadomosci commitow:
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>Pierwsza linia: max 50 znakow, tryb rozkazujacy</li>
            <li>Pusta linia oddzielajaca</li>
            <li>Opcjonalny opis szczegolowy (max 72 znaki/linia)</li>
          </ul>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mt-2">
            {`git commit -m "Add user login validation

Validate email format and password length
before sending request to API."`}
          </pre>
        </Card>

        <Card title="Historia i przegladanie">
          <p className="text-sm mb-2">
            Polecenia do przegladania historii commitow i zawartosci
            repozytorium.
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Historia commitow
git log
git log --oneline
git log -p          # z diffami

# Wizualizacja galezi
git log --graph --all --decorate`}
          </pre>
          <p className="text-sm font-semibold mb-1">Podglad commita:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Pelne szczegoly commita
git show <hash>

# Tylko konkretny plik z commita
git show <hash> -- file.js

# Tylko metadane (bez diffa)
git show <hash> --no-patch`}
          </pre>
          <p className="text-sm font-semibold mb-1">Usuwanie plikow:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Usun plik z repo i z dysku
git rm somefile.js

# Usun tylko z repo (zostaw na dysku)
git rm --cached somefile.js`}
          </pre>
        </Card>

        {/* === SEKCJA 2: Galezienie i scalanie === */}
        <Card title="Galezienie (Branches)">
          <p className="text-sm mb-2">
            Galezienie pozwalaja na rownolegle pracowanie nad roznymi
            funkcjonalnosciami bez wplywu na glowny kod.
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Utworzenie nowej galezi
git branch nazwa

# Przelaczenie na galaz
git checkout nazwa

# Utworzenie i przelaczenie jednoczesnie
git checkout -b nazwa

# Lista galezi
git branch        # lokalne
git branch -a     # wszystkie (+ zdalne)`}
          </pre>
          <p className="text-sm font-semibold mb-1">Konwencje nazewnictwa:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>
              <strong>main</strong> — kod produkcyjny (stabilny)
            </li>
            <li>
              <strong>develop</strong> — galaz deweloperska
            </li>
            <li>
              <strong>feature/*</strong> — nowe funkcjonalnosci
            </li>
            <li>
              <strong>bugfix/*</strong> — poprawki bledow
            </li>
            <li>
              <strong>hotfix/*</strong> — pilne poprawki produkcyjne
            </li>
          </ul>
        </Card>

        <Card title="Scalanie (Merge)">
          <p className="text-sm mb-2">
            Laczenie zmian z jednej galezi do drugiej.
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Scalenie galezi do aktualnej
git merge nazwa_galezi

# Zachowanie historii galezi (bez fast-forward)
git merge --no-ff nazwa_galezi`}
          </pre>
          <p className="text-sm font-semibold mb-1">Typy scalania:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>
              <strong>Fast-forward</strong> — prosta aktualizacja wskaznika
              (liniowa historia)
            </li>
            <li>
              <strong>Merge commit</strong> — nowy commit laczacy dwie galezi
            </li>
            <li>
              <strong>--no-ff</strong> — wymusza merge commit, zachowuje
              historie galezi
            </li>
          </ul>
          <p className="text-sm font-semibold mb-1">Konflikty scalania:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`<<<<<<< HEAD
kod z aktualnej galezi
=======
kod z scalanej galezi
>>>>>>> branch-name

# Po rozwiazaniu konfliktow:
git add plik_z_konfliktem.js
git commit -m "Resolve merge conflict"`}
          </pre>
        </Card>

        <Card title="Git Flow">
          <p className="text-sm mb-2">
            Popularny model branchowania definiujacy jasne zasady wspolpracy
            zespolowej.
          </p>
          <p className="text-sm font-semibold mb-1">Glowne galezi:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>
              <strong>main</strong> — stabilny kod produkcyjny
            </li>
            <li>
              <strong>develop</strong> — galaz integracji (development)
            </li>
          </ul>
          <p className="text-sm font-semibold mb-1">Przeplyw pracy:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`feature/* → develop → release/* → main
                                    ↓
                              hotfix/* → main + develop`}
          </pre>
          <p className="text-sm font-semibold mb-1">8 krokow Git Flow:</p>
          <ol className="list-decimal list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>Utworz galaz feature z develop</li>
            <li>Pracuj nad funkcjonalnoscia (commity)</li>
            <li>Scalenie feature do develop</li>
            <li>Utworz galaz release z develop</li>
            <li>Testy i poprawki na release</li>
            <li>Scalenie release do main (tag wersji)</li>
            <li>Scalenie release do develop</li>
            <li>Hotfixy: z main, scalenie do main + develop</li>
          </ol>
        </Card>

        {/* === SEKCJA 3: Rebase i zdalne repo === */}
        <Card title="Rebase">
          <p className="text-sm mb-2">
            Alternatywa dla merge — przepisuje historie commitow tak, aby byla
            liniowa.
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Rebase aktualnej galezi na inna
git rebase nazwa_galezi

# Interaktywny rebase (edycja commitow)
git rebase -i HEAD~3`}
          </pre>
          <p className="text-sm font-semibold mb-1">Merge vs Rebase:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>
              <strong>Merge</strong> — zachowuje pelna historie rozgalezien
            </li>
            <li>
              <strong>Rebase</strong> — tworzy czysta, liniowa historie
            </li>
          </ul>
          <p className="text-sm font-semibold text-red-400 mb-1">
            UWAGA — zlota zasada:
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>
              NIGDY nie robimy rebase na publicznych galeziach (main, develop)
            </li>
            <li>Rebase stosujemy TYLKO na lokalnych galeziach feature</li>
            <li>
              Przepisywanie historii publicznej galezi powoduje konflikty u
              innych czlonkow zespolu
            </li>
          </ul>
        </Card>

        <Card title="Klonowanie i zdalne repo">
          <p className="text-sm mb-2">
            Praca ze zdalnymi repozytoriami — pobieranie, wysylanie i
            synchronizacja zmian.
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Klonowanie zdalnego repozytorium
git clone url
git clone url my-directory

# origin — domyslna nazwa zdalnego repo
git remote -v`}
          </pre>
          <p className="text-sm font-semibold mb-1">Wysylanie i pobieranie:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Wyslanie zmian na serwer
git push origin main

# Pobranie i scalenie zmian
git pull              # = fetch + merge
git pull --verbose

# Samo pobranie (bez scalania)
git fetch origin`}
          </pre>
          <p className="text-sm font-semibold mb-1">Przydatne komendy:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Dodanie nowego zdalnego repo
git remote add upstream url

# Sledzenie zdalnej galezi
git push -u origin feature/login

# Usuniecie zdalnej galezi
git push origin --delete stara-galaz`}
          </pre>
        </Card>

        <Card title="GitHub, GitLab, Bitbucket">
          <p className="text-sm mb-2">
            Popularne platformy do hostowania repozytoriow Git i wspolpracy
            zespolowej.
          </p>
          <p className="text-sm font-semibold mb-1">GitHub:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>Nalezacy do Microsoftu, najwieksza platforma</li>
            <li>Pull Requests, GitHub Actions (CI/CD)</li>
            <li>Issues, Wiki, GitHub Pages</li>
            <li>Ogromna spolecznosc open-source</li>
          </ul>
          <p className="text-sm font-semibold mb-1">GitLab:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>Open-source, wbudowane CI/CD (GitLab CI)</li>
            <li>Mozliwosc self-hosted (wlasny serwer)</li>
            <li>Merge Requests, DevSecOps</li>
            <li>Kompleksowe narzedzia do zarzadzania projektem</li>
          </ul>
          <p className="text-sm font-semibold mb-1">Bitbucket:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>Nalezacy do Atlassian (integracja z Jira)</li>
            <li>Darmowe prywatne repozytoria</li>
            <li>Bitbucket Pipelines (CI/CD)</li>
            <li>Popularny w srodowiskach korporacyjnych</li>
          </ul>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/09', label: '09 — Narzedzia Uniksa cz. 2' }}
        next={{ to: '/lessons/11', label: '11 — Wkrotce' }}
      />
    </div>
  );
}
