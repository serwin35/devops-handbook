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

export default function Editors() {
  usePageTitle('Edytory');
  return (
    <div>
      <PageHeader
        title="Edytory Tekstu"
        subtitle="vim · nano · sed · awk — edycja plikow w terminalu"
        color="var(--c-purple)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* CARD 1: Vim — tryby pracy */}
        <Card title="Vim — tryby pracy" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Vim jest modalny — kazdy tryb ma inne zachowanie klawiatury.
          </p>
          <ExampleBlock variant="purple">
            <Comment># Otworz plik w vim</Comment>
            <Cmd>
              vim <F>plik.txt</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Tryby</SectionLabel>
          <Row code="NORMAL" codeVariant="purple">
            Tryb domyslny — nawigacja i komendy. Wejscie:{' '}
            <code className="text-xs">Esc</code>
          </Row>
          <Row code="INSERT" codeVariant="green">
            Tryb edycji tekstu. Wejscie: <code className="text-xs">i</code> lub{' '}
            <code className="text-xs">a</code>
          </Row>
          <Row code="VISUAL" codeVariant="yellow">
            Tryb zaznaczania tekstu. Wejscie: <code className="text-xs">v</code>{' '}
            / <code className="text-xs">V</code> /{' '}
            <code className="text-xs">Ctrl+v</code>
          </Row>
          <Row code="COMMAND" codeVariant="orange">
            Tryb komend. Wejscie: <code className="text-xs">:</code> z trybu
            NORMAL
          </Row>
          <Divider />
          <ExampleBlock variant="purple">
            <Comment># Przejscie miedzy trybami</Comment>
            <Cmd>
              <H>Esc</H>{' '}
              <span className="text-[var(--c-muted)]">
                # zawsze wraca do NORMAL
              </span>
            </Cmd>
            <Cmd>
              <H>i</H>{' '}
              <span className="text-[var(--c-muted)]">
                # INSERT przed kursorem
              </span>
            </Cmd>
            <Cmd>
              <H>v</H>{' '}
              <span className="text-[var(--c-muted)]">
                # VISUAL znak po znaku
              </span>
            </Cmd>
            <Cmd>
              <H>:</H>{' '}
              <span className="text-[var(--c-muted)]"># COMMAND (ex-mode)</span>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Jesli utknales w vim, zawsze nacisni <b>Esc</b> kilka razy, a
            nastepnie wpisz <code className="text-xs">:q!</code> aby wyjsc bez
            zapisu.
          </InfoBox>
        </Card>

        {/* CARD 2: Vim — nawigacja */}
        <Card title="Vim — nawigacja" color="var(--c-purple)">
          <SectionLabel>Podstawowy ruch (tryb NORMAL)</SectionLabel>
          <Row code="h / l" codeVariant="purple">
            lewo / prawo (znak po znaku)
          </Row>
          <Row code="j / k" codeVariant="purple">
            w dol / w gore (linia po linii)
          </Row>
          <Row code="w / b" codeVariant="purple">
            nastepne / poprzednie slowo (poczatek)
          </Row>
          <Row code="e" codeVariant="purple">
            koniec biezacego / nastepnego slowa
          </Row>
          <Divider />
          <SectionLabel className="mt-1.5">Skok do linii</SectionLabel>
          <Row code="0 / $" codeVariant="yellow">
            poczatek / koniec linii
          </Row>
          <Row code="gg / G" codeVariant="yellow">
            poczatek / koniec pliku
          </Row>
          <Row code="42G" codeVariant="yellow">
            przejdz do linii 42
          </Row>
          <Divider />
          <SectionLabel className="mt-1.5">Przewijanie</SectionLabel>
          <Row code="Ctrl+u" codeVariant="green">
            przewin pol ekranu w gore
          </Row>
          <Row code="Ctrl+d" codeVariant="green">
            przewin pol ekranu w dol
          </Row>
          <Row code="Ctrl+b" codeVariant="green">
            przewin caly ekran w gore
          </Row>
          <Row code="Ctrl+f" codeVariant="green">
            przewin caly ekran w dol
          </Row>
          <Divider />
          <SectionLabel className="mt-1.5">Wyszukiwanie</SectionLabel>
          <ExampleBlock variant="yellow">
            <Cmd>
              <H>/</H>
              <V>wzorzec</V>{' '}
              <span className="text-[var(--c-muted)]"># szukaj w przod</span>
            </Cmd>
            <Cmd>
              <H>?</H>
              <V>wzorzec</V>{' '}
              <span className="text-[var(--c-muted)]"># szukaj wstecz</span>
            </Cmd>
            <Cmd>
              <H>n</H>{' '}
              <span className="text-[var(--c-muted)]">
                # nastepne wystapienie
              </span>
            </Cmd>
            <Cmd>
              <H>N</H>{' '}
              <span className="text-[var(--c-muted)]">
                # poprzednie wystapienie
              </span>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* CARD 3: Vim — edycja */}
        <Card title="Vim — edycja" color="var(--c-green)">
          <SectionLabel>Wejscie w tryb INSERT</SectionLabel>
          <Row code="i" codeVariant="green">
            INSERT przed kursorem
          </Row>
          <Row code="a" codeVariant="green">
            INSERT za kursorem (append)
          </Row>
          <Row code="o" codeVariant="green">
            nowa linia ponizej, INSERT
          </Row>
          <Row code="O" codeVariant="green">
            nowa linia powyzej, INSERT
          </Row>
          <Row code="I" codeVariant="green">
            INSERT na poczatku linii
          </Row>
          <Row code="A" codeVariant="green">
            INSERT na koncu linii
          </Row>
          <Divider />
          <SectionLabel className="mt-1.5">Usuwanie i kopiowanie</SectionLabel>
          <Row code="x" codeVariant="orange">
            usun znak pod kursorem
          </Row>
          <Row code="dd" codeVariant="orange">
            usun (wytnij) cala linie
          </Row>
          <Row code="yy" codeVariant="yellow">
            kopiuj (yank) cala linie
          </Row>
          <Row code="p" codeVariant="yellow">
            wklej za kursorem / ponizej linii
          </Row>
          <Row code="P" codeVariant="yellow">
            wklej przed kursorem / powyzej linii
          </Row>
          <Divider />
          <SectionLabel className="mt-1.5">Cofanie i zmiana</SectionLabel>
          <Row code="u" codeVariant="purple">
            cofnij (undo)
          </Row>
          <Row code="Ctrl+r" codeVariant="purple">
            ponow (redo)
          </Row>
          <Row code="cw" codeVariant="green">
            zmien slowo (usun + INSERT)
          </Row>
          <Row code={'ci"'} codeVariant="green">
            zmien zawartosc cudzyslowow
          </Row>
          <Row code="ca(" codeVariant="green">
            zmien zawartosc nawiasow (wlacznie z nimi)
          </Row>
          <Row code="." codeVariant="yellow">
            powtorz ostatnia operacje
          </Row>
          <InfoBox>
            <b>Operatory</b> w vim skladaja sie z: [ilosc][operator][obiekt].
            Np. <code className="text-xs">3dd</code> usuwa 3 linie,{' '}
            <code className="text-xs">5yy</code> kopiuje 5 linii.
          </InfoBox>
        </Card>

        {/* CARD 4: Vim — komendy */}
        <Card title="Vim — komendy" color="var(--c-orange)">
          <SectionLabel>Zapis i wyjscie (tryb COMMAND)</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>
              <H>:w</H>{' '}
              <span className="text-[var(--c-muted)]"># zapisz plik</span>
            </Cmd>
            <Cmd>
              <H>:q</H>{' '}
              <span className="text-[var(--c-muted)]">
                # wyjdz (gdy brak zmian)
              </span>
            </Cmd>
            <Cmd>
              <H>:wq</H>{' '}
              <span className="text-[var(--c-muted)]"># zapisz i wyjdz</span>
            </Cmd>
            <Cmd>
              <H>:x</H>{' '}
              <span className="text-[var(--c-muted)]">
                # zapisz (jesli zmiany) i wyjdz
              </span>
            </Cmd>
            <Cmd>
              <H>:q!</H>{' '}
              <span className="text-[var(--c-muted)]"># wyjdz BEZ zapisu</span>
            </Cmd>
            <Cmd>
              <H>ZZ</H>{' '}
              <span className="text-[var(--c-muted)]">
                # skrot: zapisz i wyjdz
              </span>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Zamiana tekstu</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Zamien pierwsze wystapienie w linii</Comment>
            <Cmd>
              <H>:s/</H>
              <V>stary</V>
              <H>/</H>
              <V>nowy</V>
              <H>/</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Zamien wszystkie w linii</Comment>
            <Cmd>
              <H>:s/</H>
              <V>stary</V>
              <H>/</H>
              <V>nowy</V>
              <H>/g</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Zamien wszystkie w pliku</Comment>
            <Cmd>
              <H>:%s/</H>
              <V>stary</V>
              <H>/</H>
              <V>nowy</V>
              <H>/g</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Z potwierdzeniem przy kazdym</Comment>
            <Cmd>
              <H>:%s/</H>
              <V>stary</V>
              <H>/</H>
              <V>nowy</V>
              <H>/gc</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Opcje i pomoc</SectionLabel>
          <Row code=":set number" codeVariant="orange">
            pokaz numery linii
          </Row>
          <Row code=":set nonumber" codeVariant="orange">
            ukryj numery linii
          </Row>
          <Row code=":set paste" codeVariant="orange">
            tryb wklejania (wylacza auto-indent)
          </Row>
          <Row code=":syntax on" codeVariant="orange">
            podswietlanie skladni
          </Row>
          <Row code=":help slowo" codeVariant="purple">
            wbudowana dokumentacja
          </Row>
        </Card>

        {/* CARD 5: Nano — podstawy */}
        <Card title="Nano — podstawy" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Nano to najprostszy edytor terminala — skroty widoczne na dole
            ekranu.
          </p>
          <ExampleBlock variant="green">
            <Comment># Otworz plik w nano</Comment>
            <Cmd>
              nano <F>plik.txt</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Otworz z numerami linii</Comment>
            <Cmd>
              nano <H>-l</H> <F>plik.txt</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Otworz jako tylko do odczytu</Comment>
            <Cmd>
              nano <H>-v</H> <F>/etc/ssh/sshd_config</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Zapis i wyjscie</SectionLabel>
          <Row code="Ctrl+O" codeVariant="green">
            zapisz plik (Write Out) — zatwierdz Enter
          </Row>
          <Row code="Ctrl+X" codeVariant="green">
            wyjdz z nano (pyta o zapis jesli zmiany)
          </Row>
          <Divider />
          <SectionLabel className="mt-1.5">Edycja</SectionLabel>
          <Row code="Ctrl+K" codeVariant="orange">
            wytnij (cut) cala linie do schowka
          </Row>
          <Row code="Ctrl+U" codeVariant="orange">
            wklej (uncut) ze schowka
          </Row>
          <Row code="Alt+6" codeVariant="orange">
            kopiuj zaznaczona linie (bez usuwania)
          </Row>
          <Row code="Ctrl+^" codeVariant="yellow">
            rozpocznij zaznaczanie (mark set)
          </Row>
          <InfoBox>
            <b>^</b> w nano oznacza klawisz <b>Ctrl</b>, a <b>M-</b> oznacza
            klawisz <b>Alt</b>. Skroty sa zawsze widoczne na dole ekranu.
          </InfoBox>
        </Card>

        {/* CARD 6: Nano — nawigacja */}
        <Card title="Nano — nawigacja i wyszukiwanie" color="var(--c-yellow)">
          <SectionLabel>Ruch w pliku</SectionLabel>
          <Row code="Ctrl+A" codeVariant="yellow">
            poczatek linii
          </Row>
          <Row code="Ctrl+E" codeVariant="yellow">
            koniec linii
          </Row>
          <Row code="Ctrl+Y" codeVariant="yellow">
            przewin strone w gore
          </Row>
          <Row code="Ctrl+V" codeVariant="yellow">
            przewin strone w dol
          </Row>
          <Row code="Alt+\\" codeVariant="yellow">
            poczatek pliku
          </Row>
          <Row code="Alt+/" codeVariant="yellow">
            koniec pliku
          </Row>
          <Row code="Ctrl+_" codeVariant="yellow">
            przejdz do linii i kolumny (Go To Line)
          </Row>
          <Divider />
          <SectionLabel className="mt-1.5">Wyszukiwanie i zamiana</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Wyszukaj tekst</Comment>
            <Cmd>
              <H>Ctrl+W</H>{' '}
              <span className="text-[var(--c-muted)]">
                wpisz wzorzec → Enter
              </span>
            </Cmd>
            <Cmd>
              <H>Alt+W</H>{' '}
              <span className="text-[var(--c-muted)]">
                powtorz ostatnie wyszukiwanie
              </span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Zamien tekst (Search & Replace)</Comment>
            <Cmd>
              <H>Ctrl+\</H>{' '}
              <span className="text-[var(--c-muted)]">
                wpisz stary → Enter → nowy → Enter
              </span>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Inne</SectionLabel>
          <Row code="Alt+U" codeVariant="purple">
            cofnij (undo) — nano 2.4+
          </Row>
          <Row code="Alt+E" codeVariant="purple">
            ponow (redo) — nano 2.4+
          </Row>
          <Row code="Ctrl+G" codeVariant="green">
            wyswietl wbudowana pomoc (Help)
          </Row>
          <Row code="Ctrl+C" codeVariant="green">
            pokaz numer biezacej linii i kolumny
          </Row>
          <InfoBox>
            Nano nie ma trybob jak vim — piszesz od razu po otwarciu pliku.
            Idealny dla szybkich edycji plikow konfiguracyjnych.
          </InfoBox>
        </Card>

        {/* CARD 7: sed — edycja strumieniowa */}
        <Card title="sed — edycja strumieniowa" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Stream editor — przetwarza tekst linia po linii. Nie modyfikuje
            pliku bez <code className="text-xs">-i</code>.
          </p>
          <SectionLabel>Zamiana tekstu (s///)</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Zamien pierwsze wystapienie w linii</Comment>
            <Cmd>
              sed <H>'s/</H>
              <V>stary</V>
              <H>/</H>
              <V>nowy</V>
              <H>/'</H> <F>plik.txt</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Zamien wszystkie wystapienia (/g)</Comment>
            <Cmd>
              sed <H>'s/</H>
              <V>stary</V>
              <H>/</H>
              <V>nowy</V>
              <H>/g'</H> <F>plik.txt</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Edytuj plik w miejscu (in-place)</Comment>
            <Cmd>
              sed <H>-i</H> <V>'s/localhost/127.0.0.1/g'</V> <F>config.conf</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Kopia zapasowa przy edycji in-place</Comment>
            <Cmd>
              sed <H>-i.bak</H> <V>'s/foo/bar/g'</V> <F>plik.txt</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Filtrowanie linii</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Drukuj tylko linie pasujace do wzorca</Comment>
            <Cmd>
              sed <H>-n</H> <V>'/error/p'</V> <F>/var/log/syslog</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Usun linie pasujace do wzorca</Comment>
            <Cmd>
              sed <V>'/^#/d'</V> <F>config.conf</F>{' '}
              <span className="text-[var(--c-muted)]"># usun komentarze</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Usun puste linie</Comment>
            <Cmd>
              sed <V>'/^$/d'</V> <F>plik.txt</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Zakresy linii</SectionLabel>
          <ExampleBlock>
            <Comment># Drukuj linie 5-10</Comment>
            <Cmd>
              sed <H>-n</H> <V>'5,10p'</V> <F>plik.txt</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Zamien tylko w liniach 1-3</Comment>
            <Cmd>
              sed <V>'1,3s/foo/bar/g'</V> <F>plik.txt</F>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>sed</b> nie zmienia oryginalnego pliku bez flagi <b>-i</b>. Wynik
            idzie na stdout — mozna przekierowac do nowego pliku.
          </InfoBox>
        </Card>

        {/* CARD 8: awk — przetwarzanie tekstu */}
        <Card title="awk — przetwarzanie tekstu" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            awk przetwarza tekst strukturalny kolumna po kolumnie. Domyslny
            separator: spacja/tab.
          </p>
          <SectionLabel>Podstawowe drukowanie pol</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Drukuj pierwsza kolumne</Comment>
            <Cmd>
              awk <V>'{'{print $1}'}'</V> <F>plik.txt</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Drukuj 1. i 3. kolumne</Comment>
            <Cmd>
              awk <V>'{'{print $1, $3}'}'</V> <F>plik.txt</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># Drukuj cala linie ($0) z numerem</Comment>
            <Cmd>
              awk <V>'{'{print NR, $0}'}'</V> <F>plik.txt</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Separatory i pliki CSV</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Separator : (np. /etc/passwd)</Comment>
            <Cmd>
              awk <H>-F</H>
              <V>':'</V> <V>'{'{print $1, $3}'}'</V> <F>/etc/passwd</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Separator przecinek (CSV)</Comment>
            <Cmd>
              awk <H>-F</H>
              <V>','</V> <V>'{'{print $2}'}'</V> <F>dane.csv</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Wzorce i warunki</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Drukuj linie zawierajace "error"</Comment>
            <Cmd>
              awk <V>'/error/ {'{print}'}'</V> <F>/var/log/syslog</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment>{'# Drukuj linie gdzie kolumna 3 > 100'}</Comment>
            <Cmd>
              awk <V>{"'$3 > 100 {print $0}'"}</V> <F>plik.txt</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">BEGIN i END</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># Naglowek przed danymi</Comment>
            <Cmd>
              awk <V>{'\'BEGIN{print "USER UID"} -F: {print $1,$3}\''}</V>{' '}
              <F>/etc/passwd</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Licznik linii po przetworzeniu</Comment>
            <Cmd>
              awk <V>{'\'END{print "Linii:", NR}\''}</V> <F>plik.txt</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Zmienne wbudowane</SectionLabel>
          <Row code="NR" codeVariant="yellow">
            numer biezacej linii (Number of Records)
          </Row>
          <Row code="NF" codeVariant="yellow">
            liczba pol w linii (Number of Fields)
          </Row>
          <Row code="FS" codeVariant="yellow">
            separator wejsciowy (domyslnie spacja)
          </Row>
          <Row code="OFS" codeVariant="yellow">
            separator wyjsciowy (Output Field Sep.)
          </Row>
          <Row code="$0" codeVariant="yellow">
            cala biezaca linia
          </Row>
          <InfoBox>
            <b>awk</b> jest kompletnym jezykiem programowania. Obsluguje petley,
            tablice asocjacyjne i funkcje. Swietny do przetwarzania logow i CSV.
          </InfoBox>
        </Card>

        {/* CARD 9: Porownanie edytorow — full width */}
        <Card title="Porownanie edytorow" color="var(--c-purple)" full>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--c-border)]">
                  <th className="text-left py-2 pr-4 text-[var(--c-muted)] font-normal uppercase tracking-wider text-[11px]">
                    Cecha
                  </th>
                  <th
                    className="text-left py-2 pr-4 font-['Syne'] uppercase tracking-wider text-[11px]"
                    style={{ color: 'var(--c-purple)' }}
                  >
                    Vim
                  </th>
                  <th
                    className="text-left py-2 pr-4 font-['Syne'] uppercase tracking-wider text-[11px]"
                    style={{ color: 'var(--c-green)' }}
                  >
                    Nano
                  </th>
                  <th
                    className="text-left py-2 pr-4 font-['Syne'] uppercase tracking-wider text-[11px]"
                    style={{ color: 'var(--c-orange)' }}
                  >
                    sed
                  </th>
                  <th
                    className="text-left py-2 font-['Syne'] uppercase tracking-wider text-[11px]"
                    style={{ color: 'var(--c-yellow)' }}
                  >
                    awk
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--c-border)]">
                {[
                  [
                    'Typ',
                    'Interaktywny modalny',
                    'Interaktywny prosty',
                    'Strumieniowy (CLI)',
                    'Strumieniowy (CLI)',
                  ],
                  ['Krzywa nauki', 'Stroma', 'Latwa', 'Srednia', 'Srednia'],
                  [
                    'Edycja plikow',
                    'Tak — pelna',
                    'Tak — pelna',
                    'Tak — in-place (-i)',
                    'Nie (tylko stdout)',
                  ],
                  [
                    'Wyszukiwanie',
                    'Regex (/wzorzec)',
                    'Ctrl+W (tekst)',
                    'Regex w komendzie',
                    'Regex w wzorcu',
                  ],
                  [
                    'Zamiana tekstu',
                    ':%s/stary/nowy/g',
                    'Ctrl+\\',
                    's/stary/nowy/g',
                    'gsub(/stary/, "nowy")',
                  ],
                  [
                    'Przetwarzanie kolumn',
                    'Nie (natywnie)',
                    'Nie',
                    'Ograniczone',
                    'Tak — pelna obsluga',
                  ],
                  [
                    'Skrypty',
                    'Vimscript / Lua',
                    'Nie',
                    'Tak (-e skrypt)',
                    'Tak (pelny jezyk)',
                  ],
                  [
                    'Dostepnosc',
                    'Wszedzie',
                    'Prawie wszedzie',
                    'Wszedzie',
                    'Wszedzie',
                  ],
                  [
                    'Najlepszy do',
                    'Edycji plikow kodu',
                    'Szybkich edycji',
                    'Automatyzacji / pipelines',
                    'Przetwarzania danych tekstowych',
                  ],
                ].map(([cecha, vim, nano, sed, awkVal]) => (
                  <tr
                    key={cecha}
                    className="hover:bg-[var(--c-surface2)] transition-colors"
                  >
                    <td className="py-2 pr-4 text-[var(--c-muted)] text-[11px] uppercase tracking-wider whitespace-nowrap">
                      {cecha}
                    </td>
                    <td
                      className="py-2 pr-4"
                      style={{ color: 'var(--c-purple)' }}
                    >
                      {vim}
                    </td>
                    <td
                      className="py-2 pr-4"
                      style={{ color: 'var(--c-green)' }}
                    >
                      {nano}
                    </td>
                    <td
                      className="py-2 pr-4"
                      style={{ color: 'var(--c-orange)' }}
                    >
                      {sed}
                    </td>
                    <td className="py-2" style={{ color: 'var(--c-yellow)' }}>
                      {awkVal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Divider />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-2.5">
            <InfoBox>
              <b style={{ color: 'var(--c-purple)' }}>vim</b> — gdy chcesz
              efektywnie edytowac pliki w terminalu. Warto sie nauczyc na
              serwerach produkcyjnych.
            </InfoBox>
            <InfoBox>
              <b style={{ color: 'var(--c-green)' }}>nano</b> — gdy potrzebujesz
              szybkiej edycji i nie chcesz myslec o trybach. Idealny dla
              poczatkujacych.
            </InfoBox>
            <InfoBox>
              <b style={{ color: 'var(--c-orange)' }}>sed</b> — gdy chcesz
              automatycznie zamienic tekst w plikach lub strumieniu. Swietny w
              skryptach bash.
            </InfoBox>
            <InfoBox>
              <b style={{ color: 'var(--c-yellow)' }}>awk</b> — gdy przetwarzasz
              pliki kolumnowe, logi, CSV. Filtrowanie i obliczenia na danych.
            </InfoBox>
          </div>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/cheatsheets/linux-basics', label: 'Linux Basics' }}
        next={{ to: '/cheatsheets/permissions', label: 'Permissions' }}
      />
    </div>
  );
}
