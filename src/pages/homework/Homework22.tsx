import { useState } from 'react';
import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import ExampleBlock, {
  Cmd,
  Comment,
  H,
  V,
} from '../../components/ExampleBlock';
import InfoBox from '../../components/InfoBox';
import SectionLabel from '../../components/SectionLabel';
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

export default function Homework22() {
  usePageTitle('Homework 22');

  return (
    <div>
      <PageHeader
        title="Homework 22 — Pierwsze skrypty w Pythonie"
        subtitle="kalkulator BMI · tabliczka mnozenia · obsluga bledow"
        color="var(--c-blue)"
      />

      <InfoBox>
        Gotowe rozwiazania (z obsluga bledow + PEP 8) znajdziesz w repo pod:{' '}
        <code className="text-xs">homework/lesson22/</code>. Tutaj rozpiska krok
        po kroku — najpierw sproboj sam, potem porownaj.
      </InfoBox>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* === Zadanie 1 — BMI === */}
        <Card title="1. Kalkulator BMI" color="var(--c-blue)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(0,217,255,0.15)] text-[var(--c-accent)] font-bold">
              CORE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Program oblicza wskaznik masy ciala (BMI) na podstawie wagi i
            wzrostu, potem interpretuje wynik.
          </p>

          <SectionLabel>Wymagania</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>
              Zapytaj o <b>wage w kg</b> i <b>wzrost w cm</b>
            </li>
            <li>
              Wzor:{' '}
              <code className="text-xs">
                BMI = waga / (wzrost/100)<sup>2</sup>
              </code>
            </li>
            <li>Wyswietl wynik z interpretacja:</li>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>BMI &lt; 18.5 — niedowaga</li>
              <li>18.5 ≤ BMI &lt; 25 — waga prawidlowa</li>
              <li>25 ≤ BMI &lt; 30 — nadwaga</li>
              <li>BMI ≥ 30 — otylosc</li>
            </ul>
          </ol>

          <Spoiler title="Pokaz rozwiazanie">
            <ExampleBlock variant="default">
              <Comment># bmi.py</Comment>
              <Cmd>
                waga = <H>float</H>(input(<V>"Podaj wage w kg: "</V>))
              </Cmd>
              <Cmd>
                wzrost = <H>float</H>(input(<V>"Podaj wzrost w cm: "</V>))
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                bmi = waga / (wzrost / <V>100</V>) ** <V>2</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                <H>if</H> bmi &lt; <V>18.5</V>:
              </Cmd>
              <Cmd>
                {'    '}kategoria = <V>"niedowaga"</V>
              </Cmd>
              <Cmd>
                <H>elif</H> bmi &lt; <V>25</V>:
              </Cmd>
              <Cmd>
                {'    '}kategoria = <V>"waga prawidlowa"</V>
              </Cmd>
              <Cmd>
                <H>elif</H> bmi &lt; <V>30</V>:
              </Cmd>
              <Cmd>
                {'    '}kategoria = <V>"nadwaga"</V>
              </Cmd>
              <Cmd>
                <H>else</H>:
              </Cmd>
              <Cmd>
                {'    '}kategoria = <V>"otylosc"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                print(
                <V>
                  f"Twoje BMI: {`{bmi:.2f}`} -&gt; {`{kategoria}`}"
                </V>
                )
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === Zadanie 2 — Tabliczka === */}
        <Card title="2. Tabliczka mnozenia" color="var(--c-green)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(0,217,255,0.15)] text-[var(--c-accent)] font-bold">
              CORE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Wyswietl tabliczke mnozenia 1..10 w postaci tabeli.
          </p>

          <SectionLabel>Wymagania</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>
              <b>Zagniezdzone</b> petle (for w for)
            </li>
            <li>
              Wynik sformatowany jako <b>tabela</b>
            </li>
            <li>Pierwszy wiersz i pierwsza kolumna: liczby 1..10</li>
            <li>Na przecieciu: iloczyn (np. 3 × 7 = 21)</li>
          </ol>

          <Spoiler title="Pokaz rozwiazanie">
            <ExampleBlock variant="green">
              <Comment># multiplication.py</Comment>
              <Cmd>
                ROZMIAR = <V>10</V>
              </Cmd>
              <Cmd>
                SZEROKOSC = <V>4</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                separator = <V>"+"</V> + (<V>"-"</V> * (SZEROKOSC + <V>2</V>) +{' '}
                <V>"+"</V>) * ROZMIAR
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>print(separator)</Cmd>
              <Cmd>
                <H>for</H> i <H>in</H> range(<V>1</V>, ROZMIAR + <V>1</V>):
              </Cmd>
              <Cmd>
                {'    '}
                <H>for</H> j <H>in</H> range(<V>1</V>, ROZMIAR + <V>1</V>):
              </Cmd>
              <Cmd>
                {'        '}print(<V>f"| {`{i*j:4}`} "</V>, end=<V>""</V>)
              </Cmd>
              <Cmd>
                {'    '}print(<V>"|"</V>)
              </Cmd>
              <Cmd>{'    '}print(separator)</Cmd>
              <Cmd> </Cmd>
              <Comment># Pierwszy wiersz (i=1): 1*j daje 1, 2, ..., 10</Comment>
              <Comment>
                # Pierwsza kolumna (j=1): i*1 daje 1, 2, ..., 10
              </Comment>
              <Comment># Reszta: iloczyny i*j, kazda komorka w ramce</Comment>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Oczekiwany wynik (fragment)
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>+------+------+------+...+------+</Cmd>
              <Cmd>| 1 | 2 | 3 |...| 10 |</Cmd>
              <Cmd>+------+------+------+...+------+</Cmd>
              <Cmd>| 2 | 4 | 6 |...| 20 |</Cmd>
              <Cmd>+------+------+------+...+------+</Cmd>
              <Cmd>| 3 | 6 | 9 |...| 30 |</Cmd>
              <Cmd>...</Cmd>
              <Cmd>| 10 | 20 | 30 |...| 100 |</Cmd>
              <Cmd>+------+------+------+...+------+</Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === Zadania praktyczne === */}
        <Card title="3. Cwiczenia z lekcji" color="var(--c-purple)" full>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              WARMUP
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Zrob te trzy zadania <b>przed</b> BMI/tabliczka — sa rozgrzewka.
          </p>

          <SectionLabel>3a. hello.py</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              print(<V>"Witaj, swiecie!"</V>)
            </Cmd>
            <Cmd>
              print(<V>"To moj pierwszy program w Pythonie!"</V>)
            </Cmd>
          </ExampleBlock>

          <SectionLabel className="mt-2">
            3b. calc.py — zmienne i arytmetyka
          </SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              a = <V>10</V>
            </Cmd>
            <Cmd>
              b = <V>5</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              print(<V>"a ="</V>, a)
            </Cmd>
            <Cmd>
              print(<V>"b ="</V>, b)
            </Cmd>
            <Cmd>
              print(<V>"Suma: "</V>, a + b)
            </Cmd>
            <Cmd>
              print(<V>"Roznica: "</V>, a - b)
            </Cmd>
            <Cmd>
              print(<V>"Iloczyn: "</V>, a * b)
            </Cmd>
            <Cmd>
              print(<V>"Iloraz: "</V>, a / b)
            </Cmd>
          </ExampleBlock>

          <SectionLabel className="mt-2">
            3c. conditions.py — warunki
          </SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              wiek = <H>int</H>(input(<V>"Podaj swoj wiek: "</V>))
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>if</H> wiek &lt; <V>18</V>:
            </Cmd>
            <Cmd>
              {'    '}print(<V>"Jestes niepelnoletni."</V>)
            </Cmd>
            <Cmd>
              <H>elif</H> wiek &lt; <V>65</V>:
            </Cmd>
            <Cmd>
              {'    '}print(<V>"Jestes doroslym."</V>)
            </Cmd>
            <Cmd>
              <H>else</H>:
            </Cmd>
            <Cmd>
              {'    '}print(<V>"Jestes seniorem."</V>)
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Bonus === */}
        <Card
          title="4. (Bonus) Wersja z try/except"
          color="var(--c-orange)"
          full
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,159,76,0.15)] text-[var(--c-orange)] font-bold">
              BONUS
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            BMI z obsluga bledow — wpisz "abc" zamiast wagi i zobacz co sie
            stanie. Wersja "produkcyjna" lapie{' '}
            <code className="text-xs">ValueError</code>i pyta ponownie.
          </p>

          <Spoiler title="Pokaz rozwiazanie bonus">
            <ExampleBlock variant="orange">
              <Cmd>
                <H>def</H> read_float(prompt: <H>str</H>) -&gt; <H>float</H>:
              </Cmd>
              <Cmd>
                {'    '}
                <H>while</H> <V>True</V>:
              </Cmd>
              <Cmd>
                {'        '}
                <H>try</H>:
              </Cmd>
              <Cmd>
                {'            '}value = <H>float</H>(input(prompt))
              </Cmd>
              <Cmd>
                {'            '}
                <H>if</H> value &lt;= <V>0</V>:
              </Cmd>
              <Cmd>
                {'                '}print(<V>"Wartosc musi byc dodatnia."</V>)
              </Cmd>
              <Cmd>
                {'                '}
                <H>continue</H>
              </Cmd>
              <Cmd>
                {'            '}
                <H>return</H> value
              </Cmd>
              <Cmd>
                {'        '}
                <H>except</H> ValueError:
              </Cmd>
              <Cmd>
                {'            '}print(
                <V>"To nie liczba. Sprobuj jeszcze raz."</V>)
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                <H>def</H> klasyfikuj_bmi(bmi: <H>float</H>) -&gt; <H>str</H>:
              </Cmd>
              <Cmd>
                {'    '}
                <H>if</H> bmi &lt; <V>18.5</V>: <H>return</H> <V>"niedowaga"</V>
              </Cmd>
              <Cmd>
                {'    '}
                <H>if</H> bmi &lt; <V>25</V>: <H>return</H>{' '}
                <V>"waga prawidlowa"</V>
              </Cmd>
              <Cmd>
                {'    '}
                <H>if</H> bmi &lt; <V>30</V>: <H>return</H> <V>"nadwaga"</V>
              </Cmd>
              <Cmd>
                {'    '}
                <H>return</H> <V>"otylosc"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                <H>def</H> main() -&gt; <H>None</H>:
              </Cmd>
              <Cmd>
                {'    '}waga = read_float(<V>"Podaj wage w kg: "</V>)
              </Cmd>
              <Cmd>
                {'    '}wzrost = read_float(<V>"Podaj wzrost w cm: "</V>)
              </Cmd>
              <Cmd>
                {'    '}bmi = waga / (wzrost / <V>100</V>) ** <V>2</V>
              </Cmd>
              <Cmd>
                {'    '}print(
                <V>
                  f"BMI: {`{bmi:.2f}`} -&gt; {`{klasyfikuj_bmi(bmi)}`}"
                </V>
                )
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                <H>if</H> __name__ == <V>"__main__"</V>:
              </Cmd>
              <Cmd>{'    '}main()</Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>
      </div>

      <InfoBox>
        <b>Kryteria oceny — podstawowe:</b> Python zainstalowany, oba skrypty
        (BMI + tabliczka) dzialaja, kod ma poprawne wciecia, wynik tabliczki
        sformatowany jako tabela.
        <br />
        <br />
        <b>Zaawansowane:</b> obsluga bledow (try/except), PEP 8 (snake_case, 4
        spacje), uzycie funkcji, type hints,{' '}
        <code className="text-xs">if __name__ == "__main__"</code>.
      </InfoBox>

      <LessonNav prev={{ to: '/lessons/22', label: '22 — Python cz. 1' }} />
    </div>
  );
}
