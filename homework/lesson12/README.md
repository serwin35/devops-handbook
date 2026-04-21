# Lekcja 12 - Homework

## Zadanie domowe 2: `backup.sh`

Skrypt tworzenia kopii zapasowych z profesjonalna obsluga opcji wiersza polecen.
Rozbudowana wersja backupu z cwiczenia 5 z lekcji 12.

### Opcje (getopts)

| Flaga | Argument | Wymagane | Domyslnie    | Opis                       |
|-------|----------|----------|--------------|----------------------------|
| `-s`  | SRC      | tak      | -            | Katalog zrodlowy           |
| `-d`  | DEST     | nie      | `./backups`  | Katalog docelowy           |
| `-v`  | -        | nie      | wylaczony    | Tryb verbose               |
| `-h`  | -        | nie      | -            | Wyswietl pomoc             |

### Wykorzystane elementy z lekcji 12

- **`getopts`** — parsowanie opcji `-s`, `-d`, `-v`, `-h` (sekcja 1, cwiczenie 1)
- **`log()` z poziomami** — INFO / WARN / ERROR z timestampem (sekcja 2, cwiczenie 2)
- **`set -euo pipefail`** — bezpieczna obsluga bledow (cwiczenie 3)
- **`trap cleanup EXIT`** — czyszczenie plikow tymczasowych (sekcja 3, cwiczenie 3)
- **Walidacja katalogow** — `if [[ -d ... ]]` (lekcja 11)
- **Heredoc** — blok pomocy w `usage()`
- **`mktemp`** — bezpieczny plik tymczasowy
- **`tar -czf`** — tworzenie archiwum z kompresja gzip

### Wymagania

| Narzedzie    | Wersja  | Uwagi                           |
|--------------|---------|----------------------------------|
| `bash`       | >= 3.2  | Dziala na macOS i Linux         |
| `tar`        | dowolna | Tworzenie archiwum .tar.gz      |
| `coreutils`  | -       | `mkdir`, `date`, `mktemp`, `rm` |

### Uruchomienie

```bash
chmod +x backup.sh

# Podstawowe uzycie - katalog zrodlowy + verbose
./backup.sh -s /tmp/test_source -v

# Pelne opcje - zrodlo + cel + verbose
./backup.sh -s /tmp/test_source -d /tmp/test_backup -v

# Tylko pomoc
./backup.sh -h
```

### Testowanie (krok po kroku)

```bash
# 1. Przygotowanie testowych katalogow
mkdir -p /tmp/test_source /tmp/test_backup
echo "test" > /tmp/test_source/file.txt

# 2. Uruchomienie backupu z verbose
./backup.sh -s /tmp/test_source -d /tmp/test_backup -v

# 3. Sprawdzenie wyniku
ls -la /tmp/test_backup/

# 4. Sprzatanie
rm -rf /tmp/test_source /tmp/test_backup ./backups
```

### Przykladowy output

```
[2026-04-16 14:30:00] [INFO]  Katalog zrodlowy: /tmp/test_source
[2026-04-16 14:30:00] [INFO]  Katalog docelowy: /tmp/test_backup
[2026-04-16 14:30:00] [INFO]  Tworzenie kopii zapasowej: /tmp/test_backup/backup_20260416_143000.tar.gz
[2026-04-16 14:30:00] [INFO]  Kopia zapasowa utworzona pomyslnie: /tmp/test_backup/backup_20260416_143000.tar.gz
-rw-r--r--  1 user  staff   150B Apr 16 14:30 /tmp/test_backup/backup_20260416_143000.tar.gz
```

### Kryteria oceny (z PDF)

1. Obsluga min. 2 opcji (`-s`, `-d`) + `-h` dla pomocy
2. Logowanie z min. 3 poziomami (INFO/WARN/ERROR)
3. `trap cleanup EXIT` do czyszczenia zasobow tymczasowych
4. `set -euo pipefail` do obslugi bledow
5. Walidacja katalogu zrodlowego (`-d` test)
