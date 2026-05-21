# Lekcja 22 — Homework: Pierwsze skrypty w Pythonie

## Zawartosc

| Plik                | Co realizuje                                                  |
|---------------------|---------------------------------------------------------------|
| `hello.py`          | Zadanie 1 z lekcji — pierwszy skrypt (print)                  |
| `calc.py`           | Zadanie 2 z lekcji — zmienne + operacje arytmetyczne          |
| `conditions.py`     | Zadanie 3 z lekcji — instrukcje warunkowe (if/elif/else)      |
| `bmi.py`            | Zadanie domowe 1 — kalkulator BMI z obsluga bledow            |
| `multiplication.py` | Zadanie domowe 2 — tabliczka mnozenia 1..10                   |

---

## Wymagania

- Python 3.10+ (`python3 --version`)
- Terminal / cmd

```bash
# Sprawdz wersje
python3 --version
# Spodziewane: Python 3.10.x lub nowszy
```

Brak zewnetrznych zaleznosci — wszystko z **biblioteki standardowej**.

---

## Uruchamianie

### Linux / macOS

```bash
cd homework/lesson22
python3 hello.py
python3 calc.py
python3 conditions.py
python3 bmi.py
python3 multiplication.py
```

### Windows

```cmd
cd homework\lesson22
python hello.py
python calc.py
python conditions.py
python bmi.py
python multiplication.py
```

---

## Oczekiwane wyniki

### `hello.py`

```
Witaj, swiecie!
To moj pierwszy program w Pythonie!
```

### `calc.py`

```
a = 10
b = 5
Suma:    15
Roznica: 5
Iloczyn: 50
Iloraz:  2.0
```

### `conditions.py`

```
Podaj swoj wiek: 30
Jestes doroslym.
```

### `bmi.py`

```
Podaj wage w kg: 75
Podaj wzrost w cm: 178
Twoje BMI: 23.67 -> waga prawidlowa
```

**Obsluga bledow** — sproboj wpisac `abc` zamiast wagi:

```
Podaj wage w kg: abc
To nie jest liczba. Sprobuj jeszcze raz.
Podaj wage w kg: -5
Wartosc musi byc dodatnia.
Podaj wage w kg: 75
...
```

### `multiplication.py`

Pierwszy wiersz to `i=1` (`1*j = j` -> liczby 1..10).
Pierwsza kolumna to `j=1` (`i*1 = i` -> liczby 1..10).
Reszta to iloczyny `i * j`. Kazda komorka w ramce ASCII.

```
+------+------+------+------+------+------+------+------+------+------+
|    1 |    2 |    3 |    4 |    5 |    6 |    7 |    8 |    9 |   10 |
+------+------+------+------+------+------+------+------+------+------+
|    2 |    4 |    6 |    8 |   10 |   12 |   14 |   16 |   18 |   20 |
+------+------+------+------+------+------+------+------+------+------+
|    3 |    6 |    9 |   12 |   15 |   18 |   21 |   24 |   27 |   30 |
+------+------+------+------+------+------+------+------+------+------+
|    4 |    8 |   12 |   16 |   20 |   24 |   28 |   32 |   36 |   40 |
+------+------+------+------+------+------+------+------+------+------+
|    5 |   10 |   15 |   20 |   25 |   30 |   35 |   40 |   45 |   50 |
+------+------+------+------+------+------+------+------+------+------+
|    6 |   12 |   18 |   24 |   30 |   36 |   42 |   48 |   54 |   60 |
+------+------+------+------+------+------+------+------+------+------+
|    7 |   14 |   21 |   28 |   35 |   42 |   49 |   56 |   63 |   70 |
+------+------+------+------+------+------+------+------+------+------+
|    8 |   16 |   24 |   32 |   40 |   48 |   56 |   64 |   72 |   80 |
+------+------+------+------+------+------+------+------+------+------+
|    9 |   18 |   27 |   36 |   45 |   54 |   63 |   72 |   81 |   90 |
+------+------+------+------+------+------+------+------+------+------+
|   10 |   20 |   30 |   40 |   50 |   60 |   70 |   80 |   90 |  100 |
+------+------+------+------+------+------+------+------+------+------+
```

---

## Checklist deliverable

### Podstawowe (obowiazkowe)

- [ ] Python 3 zainstalowany i `python3 --version` dziala
- [ ] `hello.py` uruchamia sie i wypisuje powitanie
- [ ] `calc.py` poprawnie liczy wszystkie 4 operacje
- [ ] `conditions.py` reaguje na wiek poprawnie
- [ ] `bmi.py` liczy BMI i wyswietla kategorie
- [ ] `multiplication.py` rysuje tabele 10x10

### Zaawansowane

- [ ] Kod ma poprawne wciecia (4 spacje, PEP 8)
- [ ] `bmi.py` obsluguje `ValueError` (try/except)
- [ ] Uzyto funkcji + `if __name__ == "__main__":`
- [ ] Dodano type hints (`x: int`, `-> str`)
- [ ] Wyjscie sformatowane (f-strings, `:.2f`)

---

## Dalsza nauka

- Oficjalny tutorial: <https://docs.python.org/3/tutorial/>
- PEP 8 (style guide): <https://peps.python.org/pep-0008/>
- "Automate the Boring Stuff with Python" — Al Sweigart (online za free)
