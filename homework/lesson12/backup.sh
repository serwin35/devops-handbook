#!/bin/bash
# Uzycie:
#   ./backup.sh -s <katalog_zrodlowy> [-d <katalog_docelowy>] [-v] [-h]
#
# Opcje:
#   -s SRC    katalog zrodlowy (wymagane)
#   -d DEST   katalog docelowy (domyslnie: ./backups)
#   -v        tryb verbose
#   -h        wyswietl pomoc
#
# Przyklady:
#   ./backup.sh -s /var/www -d /backup -v
#   ./backup.sh -s /tmp/test_source -d /tmp/test_backup -v
#   ./backup.sh -h

set -euo pipefail

# ----------
# Wartosci domyslne
# ----------
source_dir=""
dest_dir="./backups"
verbose=0
temp_file=""

# ----------
# Funkcje
# ----------

# Wyswietlanie pomocy (heredoc)
usage() {
  cat << EOF
Uzycie: $0 -s <src> [-d <dest>] [-v] [-h]

Opcje:
  -s SRC    katalog zrodlowy (wymagane)
  -d DEST   katalog docelowy (domyslnie: ./backups)
  -v        tryb verbose
  -h        ta pomoc

Przyklady:
  $0 -s /var/www -d /backup -v
  $0 -s ./projekt -v
EOF
}

# Funkcja logowania z poziomami (INFO/WARN/ERROR)
log() {
  local level="$1"; shift
  local msg="$*"
  local ts
  ts=$(date '+%Y-%m-%d %H:%M:%S')

  case $level in
    INFO)  [[ $verbose -eq 1 ]] && echo "[$ts] [INFO]  $msg" ;;
    WARN)  echo "[$ts] [WARN]  $msg" >&2 ;;
    ERROR) echo "[$ts] [ERROR] $msg" >&2 ;;
  esac
}

# Funkcja czyszczaca - usuwanie plikow tymczasowych
cleanup() {
  if [[ -n "$temp_file" && -f "$temp_file" ]]; then
    rm -f "$temp_file"
    log INFO "Usunieto plik tymczasowy: $temp_file"
  fi
}

# Rejestracja cleanup na EXIT (dziala przy normalnym zakonczeniu, bledzie, Ctrl+C)
trap cleanup EXIT

# ---------- Parsowanie opcji (getopts) ----------
while getopts "s:d:vh" opt; do
  case $opt in
    s) source_dir="$OPTARG" ;;
    d) dest_dir="$OPTARG" ;;
    v) verbose=1 ;;
    h) usage; exit 0 ;;
    *) usage; exit 1 ;;
  esac
done

# ----------
# Walidacja argumentow
# ----------

# Sprawdzenie czy podano katalog zrodlowy (-s jest wymagane)
if [[ -z "$source_dir" ]]; then
  log ERROR "Brak opcji -s (katalog zrodlowy jest wymagany)"
  usage
  exit 1
fi

# Sprawdzenie czy katalog zrodlowy istnieje
if [[ ! -d "$source_dir" ]]; then
  log ERROR "Katalog zrodlowy nie istnieje: $source_dir"
  exit 2
fi

# ----------
# Tworzenie kopii zapasowej
# ----------

# Utworz katalog docelowy jesli nie istnieje
mkdir -p "$dest_dir"

# Przygotowanie nazwy pliku backupu
date_suffix=$(date +%Y%m%d_%H%M%S)
backup_file="$dest_dir/backup_${date_suffix}.tar.gz"

# Plik tymczasowy (do czyszczenia przez trap)
temp_file=$(mktemp)

log INFO "Katalog zrodlowy: $source_dir"
log INFO "Katalog docelowy: $dest_dir"
log INFO "Tworzenie kopii zapasowej: $backup_file"

# Tworzenie archiwum tar.gz
if tar -czf "$backup_file" -C "$(dirname "$source_dir")" "$(basename "$source_dir")" 2>"$temp_file"; then
  log INFO "Kopia zapasowa utworzona pomyslnie: $backup_file"

  # Pokaz rozmiar pliku w trybie verbose
  if [[ $verbose -eq 1 ]]; then
    ls -lh "$backup_file"
  fi
else
  log ERROR "Blad podczas tworzenia kopii zapasowej"
  if [[ $verbose -eq 1 && -s "$temp_file" ]]; then
    log ERROR "Szczegoly: $(cat "$temp_file")"
  fi
  exit 3
fi
