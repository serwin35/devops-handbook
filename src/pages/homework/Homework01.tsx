import { useState } from 'react';
import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import ExampleBlock, {
  Cmd,
  Comment,
  H,
  V,
  F,
} from '../../components/ExampleBlock';
import InfoBox from '../../components/InfoBox';
import SectionLabel from '../../components/SectionLabel';
import Divider from '../../components/Divider';
import LessonNav from '../../components/LessonNav';

function Spoiler({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="text-[11px] px-3 py-1.5 rounded border border-[var(--c-border)] bg-[var(--c-surface2)] text-[var(--c-accent)] hover:border-[var(--c-accent)] transition-colors"
      >
        {open ? '\u25BC' : '\u25B6'} {title}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

export default function Homework01() {
  usePageTitle('Homework 01');

  return (
    <div>
      <PageHeader
        title="Homework 01 — Pierwsze kroki w DevOps"
        subtitle="Konfiguracja srodowiska pracy · pierwszy projekt · automatyzacja"
        color="var(--c-accent)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Zadanie 1.1 — Instalacja narzedzi */}
        <Card
          title="1.1 Instalacja podstawowych narzedzi"
          color="var(--c-green)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Zainstaluj wszystkie niezbedne narzedzia: git, curl, wget, unzip,
            htop, tree, jq oraz Docker.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Krok 1 — aktualizacja systemu</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                sudo apt <H>update</H> && sudo apt <H>upgrade</H> -y
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 2 — instalacja narzedzi
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>sudo apt install -y git curl wget unzip htop tree jq</Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 3 — instalacja Dockera
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                curl <H>-fsSL</H> https://get.docker.com -o get-docker.sh
              </Cmd>
              <Cmd>sudo sh get-docker.sh</Cmd>
              <Cmd>
                sudo usermod <H>-aG</H> docker <V>$USER</V>
              </Cmd>
            </ExampleBlock>
            <InfoBox warn>
              Po dodaniu do grupy docker musisz sie{' '}
              <b>wylogowac i zalogowac ponownie</b>, aby zmiany zaczely dzialac!
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 1.2 — Konfiguracja Git */}
        <Card title="1.2 Konfiguracja Git" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Skonfiguruj Git z danymi uzytkownika i przydatnymi aliasami.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Krok 1 — dane uzytkownika</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                git config <H>--global</H> user.name <V>"Twoje Imie"</V>
              </Cmd>
              <Cmd>
                git config <H>--global</H> user.email{' '}
                <V>"twoj.email@example.com"</V>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 2 — przydatne aliasy
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                git config --global alias.s <V>"status -s"</V>
              </Cmd>
              <Cmd>
                git config --global alias.lg{' '}
                <V>"log --oneline --graph --decorate"</V>
              </Cmd>
              <Cmd>
                git config --global alias.amend{' '}
                <V>"commit --amend --no-edit"</V>
              </Cmd>
              <Cmd>
                git config --global alias.undo <V>"reset HEAD~1 --mixed"</V>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              Aliasy pozwalaja skrocic komendy:{' '}
              <code className="text-xs">git s</code> zamiast{' '}
              <code className="text-xs">git status -s</code>,{' '}
              <code className="text-xs">git lg</code> zamiast dlugiego log.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 1.3 — Konfiguracja terminala */}
        <Card title="1.3 Konfiguracja terminala" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Zainstaluj Oh My Zsh z wtyczka autosugestii dla wygodniejszej pracy.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Krok 1 — instalacja Oh My Zsh</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                sh -c{' '}
                <V>
                  "$(curl -fsSL
                  https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
                </V>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 2 — wtyczka autosugestii
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                git clone https://github.com/zsh-users/zsh-autosuggestions{' '}
                <F>
                  {'${ZSH_CUSTOM:-~/.oh-my-zsh/custom}'}
                  /plugins/zsh-autosuggestions
                </F>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 3 — wlacz wtyczke w ~/.zshrc
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Edytuj ~/.zshrc i znajdz linie plugins=(...)</Comment>
              <Cmd>
                plugins=(git <H>zsh-autosuggestions</H>)
              </Cmd>
              <Cmd>
                source <F>~/.zshrc</F>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              Oh My Zsh daje ladny prompt, kolorowanie skladni i wiele wtyczek.
              Autosugestie podpowiadaja komendy na podstawie historii.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 1.4 — Weryfikacja srodowiska */}
        <Card title="1.4 Sprawdzenie konfiguracji" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Zweryfikuj ze wszystkie narzedzia dzialaja poprawnie — stwórz
            projekt testowy.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Krok 1 — projekt testowy</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                mkdir <F>devops-test</F> && cd <F>devops-test</F>
              </Cmd>
              <Cmd>
                git <H>init</H>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 2 — test Dockera</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                docker run <V>hello-world</V>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 3 — test aliasów Git
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                git <H>s</H>
              </Cmd>
              <Comment># powinien wyswietlic status</Comment>
              <Cmd>
                git <H>lg</H>
              </Cmd>
              <Comment># powinien wyswietlic logi</Comment>
            </ExampleBlock>
            <InfoBox>
              Jesli wszystko dziala — srodowisko jest gotowe do pracy! Jesli
              Docker nie dziala, sprawdz czy wylogowales sie po dodaniu do
              grupy.
            </InfoBox>
          </Spoiler>
        </Card>

        <Divider />

        {/* Zadanie 2 — Pierwszy projekt */}
        <Card title="2. Pierwszy projekt DevOps" color="var(--c-yellow)" full>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,209,102,0.15)] text-[var(--c-yellow)] font-bold">
              PROJEKT
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Stwórz swój pierwszy projekt DevOps z poprawna struktura katalogów,
            inicjalizacja Git i pierwszym commitem.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <SectionLabel>Krok 1 — stwórz projekt</SectionLabel>
                <ExampleBlock variant="yellow">
                  <Cmd>
                    mkdir <F>first-devops-project</F>
                  </Cmd>
                  <Cmd>
                    cd <F>first-devops-project</F>
                  </Cmd>
                </ExampleBlock>
                <SectionLabel className="mt-2">
                  Krok 2 — inicjalizacja Git
                </SectionLabel>
                <ExampleBlock variant="yellow">
                  <Cmd>
                    git <H>init</H>
                  </Cmd>
                </ExampleBlock>
                <SectionLabel className="mt-2">
                  Krok 3 — struktura katalogów
                </SectionLabel>
                <ExampleBlock variant="yellow">
                  <Cmd>
                    mkdir <V>src docs tests</V>
                  </Cmd>
                  <Cmd>
                    touch <F>README.md</F>
                  </Cmd>
                </ExampleBlock>
              </div>
              <div>
                <SectionLabel>Krok 4 — sprawdz strukture</SectionLabel>
                <ExampleBlock variant="yellow">
                  <Cmd>tree</Cmd>
                  <Comment># .</Comment>
                  <Comment># ├── README.md</Comment>
                  <Comment># ├── docs/</Comment>
                  <Comment># ├── src/</Comment>
                  <Comment># └── tests/</Comment>
                </ExampleBlock>
                <SectionLabel className="mt-2">
                  Krok 5 — pierwszy commit
                </SectionLabel>
                <ExampleBlock variant="yellow">
                  <Cmd>
                    git add <H>.</H>
                  </Cmd>
                  <Cmd>
                    git commit -m <V>"Initial project structure"</V>
                  </Cmd>
                </ExampleBlock>
              </div>
            </div>
            <InfoBox>
              Dobra struktura projektu od poczatku oszczedza czas.{' '}
              <code className="text-xs">src/</code> = kod zrodlowy,{' '}
              <code className="text-xs">docs/</code> = dokumentacja,{' '}
              <code className="text-xs">tests/</code> = testy.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 3 — Dokumentacja README */}
        <Card
          title="3. Dokumentacja projektu — README.md"
          color="var(--c-yellow)"
          full
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,209,102,0.15)] text-[var(--c-yellow)] font-bold">
              PROJEKT
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz profesjonalny plik README.md z opisem, struktura i instrukcja
            konfiguracji.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Zawartosc README.md</SectionLabel>
            <ExampleBlock variant="yellow">
              <Comment># First DevOps Project</Comment>
              <Cmd>{''}</Cmd>
              <Cmd>## Opis</Cmd>
              <Cmd>Projekt do nauki praktyk DevOps</Cmd>
              <Cmd>{''}</Cmd>
              <Cmd>## Struktura</Cmd>
              <Cmd>- `/src` - kod zrodlowy</Cmd>
              <Cmd>- `/docs` - dokumentacja</Cmd>
              <Cmd>- `/tests` - testy</Cmd>
              <Cmd>{''}</Cmd>
              <Cmd>## Konfiguracja</Cmd>
              <Cmd>1. Sklonuj repozytorium</Cmd>
              <Cmd>2. Zainstaluj zaleznosci</Cmd>
              <Cmd>3. Postepuj zgodnie z instrukcjami w dokumentacji</Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Commit dokumentacji</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                git add <F>README.md</F>
              </Cmd>
              <Cmd>
                git commit -m <V>"Add project documentation"</V>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              Dobry README powinien zawierac: opis projektu, strukture,
              instrukcje instalacji, przykladowe uzycie i informacje o licencji.
            </InfoBox>
          </Spoiler>
        </Card>

        <Divider />

        {/* Czesc dodatkowa — Skrypt automatyzacji */}
        <Card
          title="4. Skrypt automatyzacji konfiguracji"
          color="var(--c-orange)"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,107,53,0.15)] text-[var(--c-orange)] font-bold">
              DODATKOWE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz skrypt Bash instalujacy wszystkie narzedzia automatycznie.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — stwórz skrypt</SectionLabel>
            <ExampleBlock variant="orange">
              <Comment># setup.sh</Comment>
              <Cmd>#!/bin/bash</Cmd>
              <Cmd>set -e</Cmd>
              <Cmd>{''}</Cmd>
              <Cmd>
                echo <V>"=== Aktualizacja systemu ==="</V>
              </Cmd>
              <Cmd>sudo apt update && sudo apt upgrade -y</Cmd>
              <Cmd>{''}</Cmd>
              <Cmd>
                echo <V>"=== Instalacja narzedzi ==="</V>
              </Cmd>
              <Cmd>sudo apt install -y git curl wget htop tree jq</Cmd>
              <Cmd>{''}</Cmd>
              <Cmd>
                echo <V>"=== Instalacja Dockera ==="</V>
              </Cmd>
              <Cmd>curl -fsSL https://get.docker.com | sudo sh</Cmd>
              <Cmd>sudo usermod -aG docker $USER</Cmd>
              <Cmd>{''}</Cmd>
              <Cmd>
                echo <V>"=== Gotowe! Wyloguj sie i zaloguj ponownie ==="</V>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 2 — uruchom</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                chmod <H>+x</H> <F>setup.sh</F>
              </Cmd>
              <Cmd>./setup.sh</Cmd>
            </ExampleBlock>
            <InfoBox>
              <code className="text-xs">set -e</code> przerywa skrypt przy
              pierwszym bledzie. Automatyzacja konfiguracji to fundament DevOps!
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Czesc dodatkowa — Dockerfile */}
        <Card title="5. Stwórz Dockerfile" color="var(--c-orange)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,107,53,0.15)] text-[var(--c-orange)] font-bold">
              DODATKOWE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Stwórz Dockerfile dla swojego projektu i zbuduj obraz.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — stwórz Dockerfile</SectionLabel>
            <ExampleBlock variant="orange">
              <Comment># Dockerfile</Comment>
              <Cmd>
                FROM <V>ubuntu:22.04</V>
              </Cmd>
              <Cmd>RUN apt-get update && apt-get install -y \</Cmd>
              <Cmd>{'    '}git curl wget htop tree jq</Cmd>
              <Cmd>
                WORKDIR <F>/app</F>
              </Cmd>
              <Cmd>COPY . .</Cmd>
              <Cmd>
                CMD [<V>"bash"</V>]
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 2 — zbuduj i uruchom
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                docker build <H>-t</H> <V>devops-project</V> <F>.</F>
              </Cmd>
              <Cmd>
                docker run <H>-it</H> <V>devops-project</V>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              Dockerfile pozwala odtworzyc identyczne srodowisko na kazdej
              maszynie. To jest esencja "Infrastructure as Code".
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Czesc dodatkowa — GitHub Actions */}
        <Card title="6. Podstawowe GitHub Actions" color="var(--c-orange)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,107,53,0.15)] text-[var(--c-orange)] font-bold">
              DODATKOWE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Dodaj prosty workflow CI, który uruchamia sie przy kazdym pushu.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — stwórz katalog</SectionLabel>
            <ExampleBlock variant="orange">
              <Cmd>
                mkdir -p <F>.github/workflows</F>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 2 — plik workflow</SectionLabel>
            <ExampleBlock variant="orange">
              <Comment># .github/workflows/ci.yml</Comment>
              <Cmd>
                name: <V>CI</V>
              </Cmd>
              <Cmd>
                on: <H>push</H>
              </Cmd>
              <Cmd>jobs:</Cmd>
              <Cmd>{'  '}build:</Cmd>
              <Cmd>
                {'    '}runs-on: <V>ubuntu-latest</V>
              </Cmd>
              <Cmd>{'    '}steps:</Cmd>
              <Cmd>
                {'      '}- uses: <H>actions/checkout@v4</H>
              </Cmd>
              <Cmd>
                {'      '}- run: <V>echo "Build successful!"</V>
              </Cmd>
              <Cmd>
                {'      '}- run: <V>docker build -t test .</V>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 3 — push na GitHub
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                git add . && git commit -m <V>"Add CI workflow"</V>
              </Cmd>
              <Cmd>git push origin main</Cmd>
            </ExampleBlock>
            <InfoBox>
              GitHub Actions uruchamia sie automatycznie po pushu. Sprawdz
              zakladke "Actions" w repozytorium na GitHub.
            </InfoBox>
          </Spoiler>
        </Card>
      </div>

      <LessonNav prev={{ to: '/lessons/01', label: '01 — Intro DevOps' }} />
    </div>
  );
}
