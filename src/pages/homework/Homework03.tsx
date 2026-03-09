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
        {open ? '▼' : '▶'} {title}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

export default function Homework03() {
  usePageTitle('Homework 03');

  return (
    <div>
      <PageHeader
        title="Homework 03 — Wiersz poleceń i Bash"
        subtitle="Rozwiązania krok po kroku · zadania proste + challenge"
        color="var(--c-orange)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Zadanie 1 */}
        <Card
          title="1. Wyświetl informacje o środowisku"
          color="var(--c-green)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Użyj <code>echo</code> i zmiennych środowiskowych, aby wyświetlić
            komunikat:{' '}
            <i>
              "Użytkownik [nazwa] pracuje na systemie z katalogiem domowym w
              [ścieżka]"
            </i>
            .
          </p>
          <Spoiler title="Pokaż rozwiązanie">
            <SectionLabel>Krok 1 — poznaj zmienne</SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Sprawdź dostępne zmienne</Comment>
              <Cmd>
                echo <V>$USER</V>
              </Cmd>
              <Cmd>
                echo <V>$HOME</V>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 2 — połącz w jedną linię
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                echo{' '}
                <F>
                  "Użytkownik $USER pracuje na systemie z katalogiem domowym w
                  $HOME"
                </F>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              Zmienne wewnątrz podwójnych cudzysłowów{' '}
              <code className="text-xs">"..."</code> są automatycznie rozwijane.
              W pojedynczych <code className="text-xs">'...'</code> — nie!
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 2 */}
        <Card title="2. Filtrowanie procesów" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Wyświetl listę wszystkich procesów, a następnie za pomocą potoku i{' '}
            <code>grep</code> znajdź procesy związane z <code>systemd</code>.
          </p>
          <Spoiler title="Pokaż rozwiązanie">
            <SectionLabel>Krok 1 — lista wszystkich procesów</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>ps aux</Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 2 — dodaj potok z grep
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                ps aux {' | '} grep <V>"systemd"</V>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              <code className="text-xs">ps aux</code> — <b>a</b>=wszystkie
              procesy,
              <b> u</b>=format z użytkownikiem, <b>x</b>=także bez terminala.
              Potok <code className="text-xs">|</code> przekazuje wynik do{' '}
              <code className="text-xs">grep</code>.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 3 */}
        <Card
          title="3. Wyszukiwanie i instalacja pakietu"
          color="var(--c-green)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Wyszukaj pakiet <code>htop</code> za pomocą menedżera pakietów, a
            następnie zainstaluj go.
          </p>
          <Spoiler title="Pokaż rozwiązanie">
            <SectionLabel>Krok 1 — wyszukaj pakiet</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                apt search <V>htop</V>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 2 — zaktualizuj listę pakietów
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Zawsze przed instalacją!</Comment>
              <Cmd>
                sudo apt <H>update</H>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 3 — zainstaluj</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                sudo apt install <V>htop</V>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 4 — sprawdź</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                htop <H>--version</H>
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* Zadanie 4 */}
        <Card title="4. Zmienna lokalna" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Stwórz zmienną <code>PROJEKT</code> z wartością "KursDevOps".
            Wyświetl ją. Otwórz nowy terminal i sprawdź ponownie.
          </p>
          <Spoiler title="Pokaż rozwiązanie">
            <SectionLabel>Krok 1 — utwórz zmienną</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                <V>PROJEKT</V>=<F>"KursDevOps"</F>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 2 — wyświetl</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                echo <V>$PROJEKT</V>
              </Cmd>
              <Comment># Wynik: KursDevOps</Comment>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 3 — nowy terminal</SectionLabel>
            <ExampleBlock variant="orange">
              <Comment># W nowym terminalu:</Comment>
              <Cmd>
                echo <V>$PROJEKT</V>
              </Cmd>
              <Comment># Wynik: (pusto!)</Comment>
            </ExampleBlock>
            <InfoBox>
              Zmienna lokalna istnieje <b>tylko w bieżącej sesji</b> powłoki.
              Nowy terminal = nowa sesja = zmienna nie istnieje. Aby była
              dostępna w nowych sesjach, użyj{' '}
              <code className="text-xs">export</code> i dodaj do{' '}
              <code className="text-xs">~/.bashrc</code>.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 5 */}
        <Card title="5. Zliczanie plików" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Przejdź do <code>/etc</code>. Policz ile plików ma w nazwie słowo{' '}
            <code>conf</code>.
          </p>
          <Spoiler title="Pokaż rozwiązanie">
            <SectionLabel>Krok 1 — przejdź do katalogu</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                cd <F>/etc</F>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 2 — listuj i filtruj
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                ls {' | '} grep <V>"conf"</V>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 3 — policz wyniki</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                ls {' | '} grep <V>"conf"</V> {' | '} wc <H>-l</H>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              <code className="text-xs">wc -l</code> = word count, tryb liczenia
              linii. Każda linia z grep to jeden plik pasujący do wzorca.
            </InfoBox>
          </Spoiler>
        </Card>

        <Divider />

        {/* Zadanie 6 — Challenge */}
        <Card title="6. Analiza logów UFW" color="var(--c-yellow)" full>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,209,102,0.15)] text-[var(--c-yellow)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Wyświetl <code>/var/log/ufw.log</code>, odfiltruj linie z{' '}
            <code>BLOCK</code>, policz ile było zablokowanych prób połączeń.
          </p>
          <Spoiler title="Pokaż rozwiązanie krok po kroku">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <SectionLabel>Krok 1 — podejrzyj plik</SectionLabel>
                <ExampleBlock variant="yellow">
                  <Comment># Sprawdź czy plik istnieje</Comment>
                  <Cmd>
                    ls -la <F>/var/log/ufw.log</F>
                  </Cmd>
                </ExampleBlock>
                <SectionLabel className="mt-2">
                  Krok 2 — wyświetl zawartość
                </SectionLabel>
                <ExampleBlock variant="yellow">
                  <Cmd>
                    cat <F>/var/log/ufw.log</F>
                  </Cmd>
                </ExampleBlock>
              </div>
              <div>
                <SectionLabel>Krok 3 — filtruj BLOCK</SectionLabel>
                <ExampleBlock variant="yellow">
                  <Cmd>
                    cat <F>/var/log/ufw.log</F> {' | '} grep <V>"BLOCK"</V>
                  </Cmd>
                </ExampleBlock>
                <SectionLabel className="mt-2">Krok 4 — policz</SectionLabel>
                <ExampleBlock variant="yellow">
                  <Cmd>
                    cat <F>/var/log/ufw.log</F> {' | '} grep <V>"BLOCK"</V>{' '}
                    {' | '} wc <H>-l</H>
                  </Cmd>
                </ExampleBlock>
              </div>
            </div>
            <InfoBox>
              Jeśli plik nie istnieje, musisz najpierw włączyć UFW:{' '}
              <code className="text-xs">sudo ufw enable</code>. Logi pojawiają
              się po zablokowanych połączeniach.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 7 — Challenge */}
        <Card title="7. Stała zmienna środowiskowa" color="var(--c-yellow)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,209,102,0.15)] text-[var(--c-yellow)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Stwórz zmienną <code>STATUS_KURSU</code> o wartości "w_trakcie".
            Spraw, aby przetrwała restart terminala.
          </p>
          <Spoiler title="Pokaż rozwiązanie krok po kroku">
            <SectionLabel>Krok 1 — utwórz i wyeksportuj</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                export <V>STATUS_KURSU</V>=<F>"w_trakcie"</F>
              </Cmd>
              <Cmd>
                echo <V>$STATUS_KURSU</V>
              </Cmd>
              <Comment># Wynik: w_trakcie</Comment>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 2 — dodaj do ~/.bashrc
            </SectionLabel>
            <ExampleBlock variant="yellow">
              <Comment># Dopisz na koniec pliku ~/.bashrc</Comment>
              <Cmd>
                echo <F>'export STATUS_KURSU="w_trakcie"'</F> {'>> '}{' '}
                <H>~/.bashrc</H>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 3 — zweryfikuj</SectionLabel>
            <ExampleBlock variant="yellow">
              <Comment># Załaduj bashrc bez restartu terminala</Comment>
              <Cmd>
                source <H>~/.bashrc</H>
              </Cmd>
              <Cmd>
                echo <V>$STATUS_KURSU</V>
              </Cmd>
              <Comment># Wynik: w_trakcie</Comment>
            </ExampleBlock>
            <InfoBox>
              <code className="text-xs">~/.bashrc</code> jest ładowany przy
              każdym otwarciu terminala. <code className="text-xs">{'>>'}</code>{' '}
              dopisuje na koniec pliku (nie nadpisuje!).{' '}
              <code className="text-xs">source</code> przeładowuje plik bez
              otwierania nowego terminala.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 8 — Challenge */}
        <Card title="8. Top 5 użytkowników wg procesów" color="var(--c-yellow)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,209,102,0.15)] text-[var(--c-yellow)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz jedno polecenie z potokami, które pokaże 5 użytkowników z
            największą liczbą procesów.
          </p>
          <Spoiler title="Pokaż rozwiązanie krok po kroku">
            <SectionLabel>Krok 1 — lista procesów</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>ps aux</Cmd>
              <Comment># Kolumna 1 = nazwa użytkownika</Comment>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 2 — wytnij tylko userów
            </SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                ps aux {' | '} awk{' '}
                <V>
                  '{'{'}print $1{'}'}'
                </V>
              </Cmd>
              <Comment># awk wyciąga pierwszą kolumnę</Comment>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 3 — posortuj</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                ps aux {' | '} awk{' '}
                <V>
                  '{'{'}print $1{'}'}'
                </V>{' '}
                {' | '} sort
              </Cmd>
              <Comment># Alfabetycznie — identyczne nazwy obok siebie</Comment>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 4 — zlicz unikalne
            </SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                ps aux {' | '} awk{' '}
                <V>
                  '{'{'}print $1{'}'}'
                </V>{' '}
                {' | '} sort {' | '} uniq <H>-c</H>
              </Cmd>
              <Comment># uniq -c zlicza powtórzenia</Comment>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 5 — sortuj numerycznie malejąco
            </SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                ps aux {' | '} awk{' '}
                <V>
                  '{'{'}print $1{'}'}'
                </V>{' '}
                {' | '} sort {' | '} uniq <H>-c</H> {' | '} sort <H>-rn</H>
              </Cmd>
              <Comment># -r = reverse (malejąco), -n = numerycznie</Comment>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 6 — weź top 5</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                ps aux {' | '} awk{' '}
                <V>
                  '{'{'}print $1{'}'}'
                </V>{' '}
                {' | '} sort {' | '} uniq <H>-c</H> {' | '} sort <H>-rn</H>{' '}
                {' | '} head <H>-5</H>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              Cały łańcuch: <b>ps</b> (dane) → <b>awk</b> (wytnij kolumnę) →{' '}
              <b>sort</b> (uporządkuj) → <b>uniq -c</b> (zlicz) →{' '}
              <b>sort -rn</b> (od największego) → <b>head -5</b> (top 5).
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 9 — Challenge */}
        <Card
          title="9. Identyfikacja właściciela pliku"
          color="var(--c-yellow)"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,209,102,0.15)] text-[var(--c-yellow)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Znajdź pakiet dostarczający polecenie <code>ss</code>. Zainstaluj
            go. Użyj <code>ss -ltn</code> aby wyświetlić nasłuchujące porty TCP.
          </p>
          <Spoiler title="Pokaż rozwiązanie krok po kroku">
            <SectionLabel>Krok 1 — sprawdź czy ss jest dostępne</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                which <V>ss</V>
              </Cmd>
              <Comment># Jeśli brak — trzeba zainstalować</Comment>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 2 — znajdź pakiet</SectionLabel>
            <ExampleBlock variant="yellow">
              <Comment># Na Debianie/Ubuntu:</Comment>
              <Cmd>
                apt search <V>iproute</V>
              </Cmd>
              <Comment># Pakiet: iproute2</Comment>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 3 — zainstaluj</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                sudo apt install <V>iproute2</V>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 4 — użyj ss</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                ss <H>-ltn</H>
              </Cmd>
              <Comment># -l = listening, -t = TCP, -n = numery portów</Comment>
            </ExampleBlock>
            <InfoBox>
              <code className="text-xs">ss</code> to nowoczesny zamiennik{' '}
              <code className="text-xs">netstat</code>. Szybszy i z większą
              ilością informacji. Pakiet{' '}
              <code className="text-xs">iproute2</code> dostarcza też{' '}
              <code className="text-xs">ip</code>.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 10 — Challenge */}
        <Card title="10. Sprzątanie w logach" color="var(--c-orange)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,107,53,0.15)] text-[var(--c-orange)] font-bold">
              CHALLENGE — UWAGA!
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            W <code>/var/log</code> znajdź wszystkie pliki <code>.gz</code> i
            usuń je za pomocą <code>xargs</code>.
          </p>
          <Spoiler title="Pokaż rozwiązanie krok po kroku">
            <SectionLabel>Krok 1 — najpierw TYLKO podejrzyj</SectionLabel>
            <ExampleBlock variant="yellow">
              <Comment># NIGDY nie usuwaj bez sprawdzenia!</Comment>
              <Cmd>
                find <F>/var/log/</F> -name <V>"*.gz"</V>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 2 — sprawdź ile ich jest
            </SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                find <F>/var/log/</F> -name <V>"*.gz"</V> {' | '} wc <H>-l</H>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 3 — usuń za pomocą xargs
            </SectionLabel>
            <ExampleBlock variant="orange">
              <Comment># Dopiero gdy jesteś pewien!</Comment>
              <Cmd>
                find <F>/var/log/</F> -name <V>"*.gz"</V> {' | '} xargs sudo rm
              </Cmd>
            </ExampleBlock>
            <InfoBox warn>
              <b>ZASADA:</b> Zawsze najpierw uruchom{' '}
              <code className="text-xs">find</code> BEZ{' '}
              <code className="text-xs">rm</code>, żeby zobaczyć co zostanie
              usunięte! <code className="text-xs">xargs</code> przekazuje listę
              plików z potoku jako argumenty do{' '}
              <code className="text-xs">rm</code>.
            </InfoBox>
          </Spoiler>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/03', label: '03 — Wiersz poleceń i Bash' }}
      />
    </div>
  );
}
