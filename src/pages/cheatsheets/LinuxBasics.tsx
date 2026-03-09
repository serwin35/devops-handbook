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
import Row from '../../components/Row';
import Divider from '../../components/Divider';
import InfoBox from '../../components/InfoBox';
import SectionLabel from '../../components/SectionLabel';
import LessonNav from '../../components/LessonNav';

export default function LinuxBasics() {
  usePageTitle('Linux Basics');
  return (
    <div>
      <PageHeader
        title="Linux Basic Commands"
        subtitle="Nawigacja · pliki · katalogi · wyświetlanie · pomoc"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Nawigacja" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Gdzie jestem?</Comment>
            <Cmd>pwd</Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Przejdź do katalogu</Comment>
            <Cmd>
              cd <V>/var/log</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Katalog wyżej</Comment>
            <Cmd>cd ..</Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Katalog domowy</Comment>
            <Cmd>cd ~</Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Poprzedni katalog</Comment>
            <Cmd>cd -</Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Tworzenie plików i katalogów" color="var(--c-yellow)">
          <SectionLabel>touch — pliki</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Utwórz pusty plik</Comment>
            <Cmd>
              touch <V>plik.txt</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Utwórz wiele plików naraz</Comment>
            <Cmd>
              touch <V>index.html style.css app.js</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>mkdir — katalogi</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Utwórz katalog</Comment>
            <Cmd>
              mkdir <V>projekty</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Utwórz zagnieżdżone katalogi</Comment>
            <Cmd>
              mkdir <H>-p</H> <V>projekty/frontend/src</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>touch</b> tworzy plik jeśli nie istnieje, a jeśli istnieje —
            aktualizuje jego timestamp. <b>mkdir -p</b> tworzy cała ścieżkę.
          </InfoBox>
        </Card>

        <Card title="Wyświetlanie zawartości" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># Cały plik</Comment>
            <Cmd>
              cat <V>plik.txt</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Pierwsze / ostatnie linie</Comment>
            <Cmd>
              head <H>-n 20</H> <V>plik.txt</V>
            </Cmd>
            <Cmd>
              tail <H>-n 20</H> <V>plik.txt</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Śledzenie pliku na zywo (logi)</Comment>
            <Cmd>
              tail <H>-f</H> <F>/var/log/syslog</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Przeglad z przewijaniem</Comment>
            <Cmd>
              less <V>plik.txt</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="cat">wyświetl cały plik</Row>
          <Row code="head -n N">pierwsze N linii</Row>
          <Row code="tail -n N">ostatnie N linii</Row>
          <Row code="tail -f">śledzenie na zywo</Row>
          <Row code="less">przeglad z przewijaniem (q = wyjście)</Row>
          <Row code="wc -l">policz linie w pliku</Row>
        </Card>

        <Card title="Listowanie (ls)" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Podstawowe listowanie</Comment>
            <Cmd>ls</Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Szczegółowe (uprawnienia, rozmiar, data)</Comment>
            <Cmd>
              ls <H>-la</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Czytelne rozmiary (KB, MB)</Comment>
            <Cmd>
              ls <H>-lh</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Sortowanie po dacie modyfikacji</Comment>
            <Cmd>
              ls <H>-lt</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="-a" codeVariant="green">
            pokaż ukryte pliki (. i ..)
          </Row>
          <Row code="-l" codeVariant="green">
            format szczegółowy
          </Row>
          <Row code="-h" codeVariant="green">
            czytelne rozmiary
          </Row>
          <Row code="-R" codeVariant="green">
            rekurencyjnie
          </Row>
          <Row code="-S" codeVariant="green">
            sortuj po rozmiarze
          </Row>
          <Row code="-t" codeVariant="green">
            sortuj po dacie
          </Row>
        </Card>

        <Card title="Kopiowanie i przenoszenie" color="var(--c-orange)">
          <SectionLabel>cp — kopiowanie</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>
              cp <V>plik.txt</V> <F>kopia.txt</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Kopiuj katalog rekurencyjnie</Comment>
            <Cmd>
              cp <H>-r</H> <V>katalog/</V> <F>backup/</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>mv — przenoszenie / zmiana nazwy</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>
              mv <V>stary.txt</V> <F>nowy.txt</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Cmd>
              mv <V>plik.txt</V> <F>/tmp/</F>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>mv</b> służy zarówno do przenoszenia jak i zmiany nazwy.
          </InfoBox>
        </Card>

        <Card title="Usuwanie" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Comment># Usuń plik</Comment>
            <Cmd>
              rm <V>plik.txt</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Usuń katalog (rekurencyjnie)</Comment>
            <Cmd>
              rm <H>-r</H> <V>katalog/</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Usuń pusty katalog</Comment>
            <Cmd>
              rmdir <V>pusty_katalog/</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="rm -i" codeVariant="orange">
            pytaj przed usunięciem
          </Row>
          <Row code="rm -f" codeVariant="orange">
            wymuszaj bez pytania
          </Row>
          <Row code="rm -rf" codeVariant="orange">
            rekurencyjnie + force
          </Row>
          <InfoBox warn>
            <code className="text-xs text-[var(--c-danger)]">rm -rf /</code> —
            NIGDY nie uruchamiaj! Usuwa cały system. Nie ma kosza w terminalu!
          </InfoBox>
        </Card>

        <Card title="Wyszukiwanie" color="var(--c-purple)">
          <SectionLabel>find — szukaj plików</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Szukaj po nazwie</Comment>
            <Cmd>
              find <F>/home</F> <H>-name</H> <V>"*.txt"</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Szukaj katalogów</Comment>
            <Cmd>
              find <F>.</F> <H>-type d</H> <V>-name "src"</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>grep — szukaj w treści</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Szukaj tekstu w pliku</Comment>
            <Cmd>
              grep <V>"error"</V> <F>/var/log/syslog</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Rekurencyjnie w katalogu</Comment>
            <Cmd>
              grep <H>-ri</H> <V>"TODO"</V> <F>src/</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="-r" codeVariant="purple">
            rekurencyjnie
          </Row>
          <Row code="-i" codeVariant="purple">
            ignoruj wielkość liter
          </Row>
          <Row code="-n" codeVariant="purple">
            pokaż numery linii
          </Row>
          <Row code="-c" codeVariant="purple">
            policz wystąpienia
          </Row>
          <Row code="which cmd" codeVariant="purple">
            gdzie jest program
          </Row>
        </Card>

        <Card title="Pomoc i informacje" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Comment># Manual komendy</Comment>
            <Cmd>
              man <V>ls</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Krótki opis</Comment>
            <Cmd>
              whatis <V>chmod</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Szybka pomoc</Comment>
            <Cmd>
              ls <H>--help</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Typ komendy</Comment>
            <Cmd>
              type <V>ls</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="man" codeVariant="yellow">
            pełna dokumentacja
          </Row>
          <Row code="--help" codeVariant="yellow">
            szybki reference
          </Row>
          <Row code="whatis" codeVariant="yellow">
            jednozdaniowy opis
          </Row>
          <Row code="apropos" codeVariant="yellow">
            szukaj w manualach
          </Row>
          <Row code="history" codeVariant="yellow">
            historia komend
          </Row>
          <InfoBox>
            <b>Tab</b> = autouzupełnianie. <b>Ctrl+R</b> = szukaj w historii.
            <b>Ctrl+C</b> = przerwij komendę.
          </InfoBox>
        </Card>

        <Card title="Przydatne skroty i triki" full>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div>
              <SectionLabel>Skroty klawiszowe</SectionLabel>
              <ExampleBlock variant="green">
                <Cmd>Tab # autouzupełnianie</Cmd>
                <Cmd>Ctrl+C # przerwij</Cmd>
                <Cmd>Ctrl+R # szukaj w historii</Cmd>
                <Cmd>Ctrl+L # wyczyść ekran</Cmd>
                <Cmd>Ctrl+A/E # początek/koniec linii</Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>Aliasy</SectionLabel>
              <ExampleBlock variant="yellow">
                <Comment># Utwórz alias</Comment>
                <Cmd>alias ll='ls -la'</Cmd>
                <Cmd>alias ..='cd ..'</Cmd>
                <Comment># Zapisz na stale w ~/.bashrc</Comment>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>Wildcards</SectionLabel>
              <ExampleBlock variant="purple">
                <Cmd>ls *.txt # wszystkie .txt</Cmd>
                <Cmd>ls foto?.jpg # foto1, foto2...</Cmd>
                <Cmd>{'ls [abc]*   # zaczyna sie a/b/c'}</Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>Łączenie komend</SectionLabel>
              <ExampleBlock variant="orange">
                <Cmd>cmd1 && cmd2 # cmd2 jeśli cmd1 OK</Cmd>
                <Cmd>cmd1 || cmd2 # cmd2 jeśli cmd1 fail</Cmd>
                <Cmd>cmd1 ; cmd2 # zawsze oba</Cmd>
                <Cmd>cmd1 | cmd2 # pipe</Cmd>
              </ExampleBlock>
            </div>
          </div>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/', label: 'Dashboard' }}
        next={{ to: '/cheatsheets/editors', label: 'Edytory Tekstu' }}
      />
    </div>
  );
}
