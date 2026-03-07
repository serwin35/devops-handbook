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

export default function GitCommands() {
  usePageTitle('Git Commands');
  return (
    <div>
      <PageHeader
        title="Git Commands"
        subtitle="Kontrola wersji · branche · merge · remote · historia · cofanie zmian"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Git — przeplyw pracy" full>
          <pre className="text-center text-[13px] leading-7 bg-[var(--c-code-bg)] border border-[var(--c-border)] rounded-md p-3 overflow-x-auto whitespace-pre">
            <span className="text-[var(--c-muted)]">Working Dir</span> —
            <span className="text-[var(--c-accent)] font-bold"> git add </span>
            —→ <span className="text-[var(--c-muted)]">Staging</span> —
            <span className="text-[var(--c-accent)] font-bold">
              {' '}
              git commit{' '}
            </span>
            —→ <span className="text-[var(--c-muted)]">Local Repo</span> —
            <span className="text-[var(--c-accent)] font-bold"> git push </span>
            —→ <span className="text-[var(--c-muted)]">Remote</span>
          </pre>
        </Card>

        <Card title="Konfiguracja">
          <ExampleBlock>
            <Comment># Ustawienia globalne (dla calego systemu)</Comment>
            <Cmd>
              git config --global <H>user.name</H> <V>"Imie Nazwisko"</V>
            </Cmd>
            <Cmd>
              git config --global <H>user.email</H> <V>"email@example.com"</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Domyslna galaz</Comment>
            <Cmd>
              git config --global <H>init.defaultBranch</H> <V>main</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Sprawdz aktualna konfiguracje</Comment>
            <Cmd>
              git config <H>--list</H>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Konfiguracja: <code className="text-xs">--global</code> = caly user,{' '}
            <code className="text-xs">--local</code> = tylko to repo (nadpisuje
            global).
          </InfoBox>
        </Card>

        <Card title="Podstawy" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Nowe repo</Comment>
            <Cmd>
              git <H>init</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Klonuj istniejace repo</Comment>
            <Cmd>
              git <H>clone</H> <V>https://github.com/user/repo.git</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Status (co sie zmienilo?)</Comment>
            <Cmd>
              git <H>status</H>
            </Cmd>
            <Cmd>
              git status <V>-s</V>{' '}
              <span className="text-[var(--c-muted)]"># skrocony format</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Dodaj do staging</Comment>
            <Cmd>
              git <H>add</H> <V>plik.txt</V>{' '}
              <span className="text-[var(--c-muted)]"># konkretny plik</span>
            </Cmd>
            <Cmd>
              git add <V>.</V>{' '}
              <span className="text-[var(--c-muted)]"># wszystko</span>
            </Cmd>
            <Cmd>
              git add <V>-p</V>{' '}
              <span className="text-[var(--c-muted)]">
                # interaktywnie (hunk po hunku)
              </span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Commit</Comment>
            <Cmd>
              git <H>commit</H> <V>-m "opis zmian"</V>
            </Cmd>
            <Cmd>
              git commit <V>-am "add+commit"</V>{' '}
              <span className="text-[var(--c-muted)]">
                # pomija staging (tracked files)
              </span>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Branche (galezie)" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># Lista galezi</Comment>
            <Cmd>
              git <H>branch</H>{' '}
              <span className="text-[var(--c-muted)]"># lokalne</span>
            </Cmd>
            <Cmd>
              git branch <V>-a</V>{' '}
              <span className="text-[var(--c-muted)]">
                # wszystkie (+ remote)
              </span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Utworz nowa galaz</Comment>
            <Cmd>
              git branch <H>feature/login</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Przelacz sie na galaz</Comment>
            <Cmd>
              git <H>checkout</H> <V>feature/login</V>
            </Cmd>
            <Cmd>
              git <H>switch</H> <V>feature/login</V>{' '}
              <span className="text-[var(--c-muted)]"># nowszy sposob</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Utworz i przelacz (jednoczesnie)</Comment>
            <Cmd>
              git checkout <H>-b</H> <V>feature/login</V>
            </Cmd>
            <Cmd>
              git switch <H>-c</H> <V>feature/login</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Usun galaz</Comment>
            <Cmd>
              git branch <H>-d</H> feature/login{' '}
              <span className="text-[var(--c-muted)]"># safe (merged)</span>
            </Cmd>
            <Cmd>
              git branch <H>-D</H> feature/login{' '}
              <span className="text-[var(--c-muted)]"># force</span>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Merge i Rebase" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Comment># Merge galezi do main</Comment>
            <Cmd>
              git checkout <V>main</V>
            </Cmd>
            <Cmd>
              git <H>merge</H> <V>feature/login</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Rebase (przenosl commity na czubek main)</Comment>
            <Cmd>
              git checkout <V>feature/login</V>
            </Cmd>
            <Cmd>
              git <H>rebase</H> <V>main</V>
            </Cmd>
          </ExampleBlock>
          <Concept title="Merge vs Rebase" color="var(--c-yellow)">
            <b>Merge</b> — tworzy merge commit, zachowuje historie.{' '}
            <b>Rebase</b> — przepisuje historie, czystsza linia commitow.
            Zasada: <b>nie rebase'uj publicznych galezi!</b>
          </Concept>
          <ExampleBlock variant="orange">
            <Comment># Konflikty merge — po rozwiazaniu:</Comment>
            <Cmd>
              git add <V>.</V>
            </Cmd>
            <Cmd>
              git <H>merge --continue</H>
            </Cmd>
            <Cmd>
              git merge <H>--abort</H>{' '}
              <span className="text-[var(--c-muted)]"># cofnij merge</span>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Remote (zdalne repo)">
          <ExampleBlock>
            <Comment># Dodaj zdalne repo</Comment>
            <Cmd>
              git remote <H>add</H> <V>origin</V>{' '}
              <F>https://github.com/user/repo.git</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Lista remote'ow</Comment>
            <Cmd>
              git remote <H>-v</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="green">
            <Comment># Wypchnij na remote</Comment>
            <Cmd>
              git <H>push</H> origin main
            </Cmd>
            <Cmd>
              git push <V>-u</V> origin main{' '}
              <span className="text-[var(--c-muted)]">
                # ustaw upstream (pierwszy raz)
              </span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Pobierz z remote</Comment>
            <Cmd>
              git <H>fetch</H>{' '}
              <span className="text-[var(--c-muted)]">
                # pobierz info (bez merge)
              </span>
            </Cmd>
            <Cmd>
              git <H>pull</H>{' '}
              <span className="text-[var(--c-muted)]"># fetch + merge</span>
            </Cmd>
            <Cmd>
              git pull <V>--rebase</V>{' '}
              <span className="text-[var(--c-muted)]"># fetch + rebase</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Wypchnij nowa galaz</Comment>
            <Cmd>
              git push <H>-u</H> origin <V>feature/login</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Historia i diff" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Comment># Log commitow</Comment>
            <Cmd>
              git <H>log</H>
            </Cmd>
            <Cmd>
              git log <V>--oneline</V>{' '}
              <span className="text-[var(--c-muted)]"># kompaktowy</span>
            </Cmd>
            <Cmd>
              git log <V>--graph --oneline --all</V>{' '}
              <span className="text-[var(--c-muted)]"># drzewko</span>
            </Cmd>
            <Cmd>
              git log <V>-5</V>{' '}
              <span className="text-[var(--c-muted)]"># ostatnie 5</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Roznice</Comment>
            <Cmd>
              git <H>diff</H>{' '}
              <span className="text-[var(--c-muted)]"># unstaged zmiany</span>
            </Cmd>
            <Cmd>
              git diff <V>--staged</V>{' '}
              <span className="text-[var(--c-muted)]">
                # staged (przed commit)
              </span>
            </Cmd>
            <Cmd>
              git diff <V>main..feature</V>{' '}
              <span className="text-[var(--c-muted)]"># miedzy branchami</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Kto zmienil ktora linijke</Comment>
            <Cmd>
              git <H>blame</H> <V>plik.txt</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Szczegoly commitu</Comment>
            <Cmd>
              git <H>show</H> <V>abc1234</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Cofanie zmian" color="var(--c-orange)">
          <ExampleBlock>
            <Comment># Cofnij plik ze staging (przed commit)</Comment>
            <Cmd>
              git <H>restore --staged</H> <V>plik.txt</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Odrzuc lokalne zmiany w pliku</Comment>
            <Cmd>
              git <H>restore</H> <V>plik.txt</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Popraw ostatni commit (tresc/pliki)</Comment>
            <Cmd>
              git commit <H>--amend</H> <V>-m "poprawiony opis"</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Cofnij commit (tworzac nowy — bezpieczne)</Comment>
            <Cmd>
              git <H>revert</H> <V>abc1234</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Reset (niebezpieczne — zmienia historie!)</Comment>
            <Cmd>
              git reset <V>--soft</V> HEAD~1{' '}
              <span className="text-[var(--c-muted)]">
                # cofnij commit, zachowaj staging
              </span>
            </Cmd>
            <Cmd>
              git reset <V>--mixed</V> HEAD~1{' '}
              <span className="text-[var(--c-muted)]">
                # cofnij commit + staging
              </span>
            </Cmd>
            <Cmd>
              git reset <H>--hard</H> HEAD~1{' '}
              <span className="text-[var(--c-muted)]"># cofnij WSZYSTKO</span>
            </Cmd>
          </ExampleBlock>
          <InfoBox warn>
            <code className="text-xs text-[var(--c-orange)]">reset --hard</code>{' '}
            traci dane! Uzywaj <code className="text-xs">revert</code> na
            publicznych branchach.
          </InfoBox>
        </Card>

        <Card title="Stash — schowek" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Tymczasowo odloz zmiany na bok (np. zeby przelaczac branche).
          </p>
          <ExampleBlock variant="purple">
            <Comment># Schowaj zmiany</Comment>
            <Cmd>
              git <H>stash</H>
            </Cmd>
            <Cmd>
              git stash <V>-m "opis"</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Przywroc ze schowka</Comment>
            <Cmd>
              git stash <H>pop</H>{' '}
              <span className="text-[var(--c-muted)]">
                # przywroc + usun ze stash
              </span>
            </Cmd>
            <Cmd>
              git stash <H>apply</H>{' '}
              <span className="text-[var(--c-muted)]">
                # przywroc, zostaw w stash
              </span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Cmd>
              git stash <H>list</H>{' '}
              <span className="text-[var(--c-muted)]"># lista schowkow</span>
            </Cmd>
            <Cmd>
              git stash <H>drop</H>{' '}
              <span className="text-[var(--c-muted)]"># usun ostatni</span>
            </Cmd>
            <Cmd>
              git stash <H>clear</H>{' '}
              <span className="text-[var(--c-muted)]"># usun wszystkie</span>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title=".gitignore" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Pliki/katalogi ignorowane przez Git.
          </p>
          <ExampleBlock variant="orange">
            <Comment># Typowy .gitignore</Comment>
            <Cmd>
              <F>node_modules/</F>
            </Cmd>
            <Cmd>
              <F>.env</F>
            </Cmd>
            <Cmd>
              <F>*.log</F>
            </Cmd>
            <Cmd>
              <F>dist/</F>
            </Cmd>
            <Cmd>
              <F>.DS_Store</F>
            </Cmd>
            <Cmd>
              <F>.idea/</F>
            </Cmd>
            <Cmd>
              <F>__pycache__/</F>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Juz sledzony? <code className="text-xs">git rm --cached plik</code>
          </InfoBox>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/cheatsheets/docker', label: 'Docker' }}
        next={{ to: '/cheatsheets/networking', label: 'Networking' }}
      />
    </div>
  );
}
