import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import ExampleBlock, {
  Cmd,
  Comment,
  H,
  V,
} from '../../components/ExampleBlock';
import Divider from '../../components/Divider';
import InfoBox from '../../components/InfoBox';
import LessonNav from '../../components/LessonNav';

export default function LinuxBasics() {
  usePageTitle('Linux Basics');
  return (
    <div>
      <PageHeader
        title="Linux Basic Commands"
        subtitle="Podstawowe komendy terminala — nawigacja, tworzenie plikow, edytory"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Nawigacja" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Gdzie jestem?</Comment>
            <Cmd>pwd</Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Przejdz do katalogu</Comment>
            <Cmd>
              cd <V>/var/log</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Katalog wyzej</Comment>
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

        <Card title="Tworzenie plikow (touch)" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Comment># Utworz pusty plik</Comment>
            <Cmd>
              touch <V>plik.txt</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Utworz wiele plikow naraz</Comment>
            <Cmd>
              touch <V>index.html style.css app.js</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Zaktualizuj date modyfikacji</Comment>
            <Cmd>
              touch <V>istniejacy.txt</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>touch</b> tworzy plik jesli nie istnieje, a jesli istnieje —
            aktualizuje jego timestamp.
          </InfoBox>
        </Card>

        <Card title="Edytor: nano" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Otworz plik w nano</Comment>
            <Cmd>
              nano <V>plik.txt</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Otworz z numerami linii</Comment>
            <Cmd>
              nano <H>-l</H> <V>plik.txt</V>
            </Cmd>
          </ExampleBlock>
          <p className="text-[var(--c-muted)] text-xs mt-3 mb-2">
            Skroty klawiszowe:
          </p>
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <code className="text-[var(--c-green)]">Ctrl+O</code>
              <span className="text-[var(--c-muted)]">Zapisz plik</span>
            </div>
            <div className="flex justify-between">
              <code className="text-[var(--c-green)]">Ctrl+X</code>
              <span className="text-[var(--c-muted)]">Wyjdz</span>
            </div>
            <div className="flex justify-between">
              <code className="text-[var(--c-green)]">Ctrl+K</code>
              <span className="text-[var(--c-muted)]">Wytnij linie</span>
            </div>
            <div className="flex justify-between">
              <code className="text-[var(--c-green)]">Ctrl+U</code>
              <span className="text-[var(--c-muted)]">Wklej linie</span>
            </div>
            <div className="flex justify-between">
              <code className="text-[var(--c-green)]">Ctrl+W</code>
              <span className="text-[var(--c-muted)]">Szukaj</span>
            </div>
            <div className="flex justify-between">
              <code className="text-[var(--c-green)]">Ctrl+G</code>
              <span className="text-[var(--c-muted)]">Pomoc</span>
            </div>
          </div>
          <InfoBox>
            <b>nano</b> to najprostszy edytor w terminalu — idealny dla
            poczatkujacych.
          </InfoBox>
        </Card>

        <Card title="Edytor: vim" color="var(--c-accent)">
          <ExampleBlock>
            <Comment># Otworz plik w vim</Comment>
            <Cmd>
              vim <V>plik.txt</V>
            </Cmd>
          </ExampleBlock>
          <p className="text-[var(--c-muted)] text-xs mt-3 mb-2">
            Tryby pracy:
          </p>
          <div className="text-xs space-y-1 mb-3">
            <div className="flex justify-between">
              <code className="text-[var(--c-accent)]">i</code>
              <span className="text-[var(--c-muted)]">
                Tryb INSERT (edycja)
              </span>
            </div>
            <div className="flex justify-between">
              <code className="text-[var(--c-accent)]">Esc</code>
              <span className="text-[var(--c-muted)]">
                Wroc do trybu NORMAL
              </span>
            </div>
            <div className="flex justify-between">
              <code className="text-[var(--c-accent)]">:w</code>
              <span className="text-[var(--c-muted)]">Zapisz</span>
            </div>
            <div className="flex justify-between">
              <code className="text-[var(--c-accent)]">:q</code>
              <span className="text-[var(--c-muted)]">Wyjdz</span>
            </div>
            <div className="flex justify-between">
              <code className="text-[var(--c-accent)]">:wq</code>
              <span className="text-[var(--c-muted)]">Zapisz i wyjdz</span>
            </div>
            <div className="flex justify-between">
              <code className="text-[var(--c-accent)]">:q!</code>
              <span className="text-[var(--c-muted)]">Wyjdz bez zapisu</span>
            </div>
          </div>
          <Divider />
          <p className="text-[var(--c-muted)] text-xs mt-2 mb-2">
            Przydatne komendy (tryb NORMAL):
          </p>
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <code className="text-[var(--c-accent)]">dd</code>
              <span className="text-[var(--c-muted)]">Usun linie</span>
            </div>
            <div className="flex justify-between">
              <code className="text-[var(--c-accent)]">yy</code>
              <span className="text-[var(--c-muted)]">Kopiuj linie</span>
            </div>
            <div className="flex justify-between">
              <code className="text-[var(--c-accent)]">p</code>
              <span className="text-[var(--c-muted)]">Wklej</span>
            </div>
            <div className="flex justify-between">
              <code className="text-[var(--c-accent)]">u</code>
              <span className="text-[var(--c-muted)]">Cofnij (undo)</span>
            </div>
            <div className="flex justify-between">
              <code className="text-[var(--c-accent)]">/tekst</code>
              <span className="text-[var(--c-muted)]">Szukaj</span>
            </div>
            <div className="flex justify-between">
              <code className="text-[var(--c-accent)]">gg / G</code>
              <span className="text-[var(--c-muted)]">
                Poczatek / koniec pliku
              </span>
            </div>
          </div>
          <InfoBox>
            <b>vim</b> ma stroma krzywa nauki, ale jest niezwykle wydajny po
            opanowaniu.
          </InfoBox>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/', label: 'Dashboard' }}
        next={{ to: '/cheatsheets/permissions', label: 'Permissions' }}
      />
    </div>
  );
}
