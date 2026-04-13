# Lekcja 11 - Homework

## Zadanie 1: `project_setup.sh`

Ulepszona wersja skryptu z lekcji - tworzy strukture nowego projektu
w oparciu o wybrany jezyk programowania.

### Argumenty pozycyjne

| Pozycja | Nazwa          | Wymagane | Domyslnie          | Opis                                       |
|---------|----------------|----------|--------------------|--------------------------------------------|
| `$1`    | nazwa projektu | tak      | -                  | Nazwa katalogu / projektu                  |
| `$2`    | jezyk          | tak      | -                  | `python` \| `js` \| `go`                   |
| `$3`    | katalogi CSV   | nie      | `src,tests,docs`   | Lista katalogow oddzielona przecinkami     |

### Funkcjonalnosci (zgodnie z zadaniem)

- **Walidacja argumentow** - `if [[ $# -lt 2 ]]` + kontrola jezyka
- **`.gitignore` zaleznie od jezyka** - if/elif wybiera tresc (Python / Node / Go)
- **Plik startowy** - `main.py`, `index.js` lub `main.go` w `src/`
- **Logowanie do `setup.log`** - funkcja `log_action()` pisze na stdout i do pliku
- **Obsluga bledow** - katalog juz istnieje, nieznany jezyk, blad `mkdir`

Wykorzystane konstrukcje z lekcji: funkcje z `local`, tablice, `for`, `if/elif/else`,
`case` (przez if/elif), heredoc, `command -v`, `IFS`, `read -a`.

### Wymagania

| Narzedzie | Wersja  | Uwagi                                    |
|-----------|---------|------------------------------------------|
| `bash`    | >= 3.2  | Dziala na macOS (stary bash) i Linux    |
| `git`     | dowolna | Opcjonalne - pominie init jesli brak     |
| `coreutils` | -     | `mkdir`, `date`, `tr`, `sed`, `xargs`    |

### Uruchomienie

```bash
chmod +x project_setup.sh

# Minimalne wywolanie - nazwa + jezyk (domyslne katalogi src,tests,docs)
./project_setup.sh api python
./project_setup.sh web js
./project_setup.sh tool go

# Wlasne katalogi (CSV)
./project_setup.sh api python "src,tests,docs,config"
./project_setup.sh web js "src,tests,public,styles"
./project_setup.sh tool go "cmd,internal,pkg,docs"
```

### Przykladowy output

```
[2026-04-13 17:20:15] === Start: tworzenie projektu 'api' (jezyk: python) ===
[2026-04-13 17:20:15] [OK] Utworzono katalog glowny 'api'
[2026-04-13 17:20:15] [OK] Utworzono katalog 'api/src'
[2026-04-13 17:20:15] [OK] Utworzono katalog 'api/tests'
[2026-04-13 17:20:15] [OK] Utworzono katalog 'api/docs'
[2026-04-13 17:20:15] [OK] Utworzono .gitignore dla python
[2026-04-13 17:20:15] [OK] Utworzono plik zrodlowy 'api/src/main.py'
[2026-04-13 17:20:15] [OK] Utworzono README.md
[2026-04-13 17:20:15] [OK] Zainicjalizowano repozytorium git
[2026-04-13 17:20:15] === Zakonczono tworzenie projektu 'api' ===

Log zapisany w: api/setup.log
```

### Sprzatanie po testach

```bash
rm -rf api web tool
```
