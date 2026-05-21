#!/bin/bash
# Uzycie:
#   ./dump.sh -d <baza> [-o <katalog>] [-r <dni>] [-v] [-h]
#
# Opcje:
#   -d DB     nazwa bazy do dumpu (wymagane)
#   -o DIR    katalog docelowy (domyslnie: ./backups)
#   -r DAYS   retention - usun pliki starsze niz N dni (domyslnie: 7)
#   -v        tryb verbose
#   -h        wyswietl pomoc
#
# Przyklady:
#   ./dump.sh -d sklep_internetowy -v
#   ./dump.sh -d sklep_internetowy -o /var/backups/mysql -r 14
#   ./dump.sh -h

set -euo pipefail

# ----------
# Wartosci domyslne
# ----------
db_name=""
dest_dir="./backups"
retention_days=7
verbose=0
temp_file=""

# Konfiguracja uzytkownika MySQL
mysql_user="dumper"
mysql_cnf="$HOME/.my.cnf.dumper"

# ----------
# Funkcje
# ----------

usage() {
  cat << EOF
Uzycie: $0 -d <db> [-o <dir>] [-r <days>] [-v] [-h]

Opcje:
  -d DB     nazwa bazy do dumpu (wymagane)
  -o DIR    katalog docelowy (domyslnie: ./backups)
  -r DAYS   retention - usun pliki starsze niz N dni (domyslnie: 7)
  -v        tryb verbose
  -h        ta pomoc

Wymagania:
  - uzytkownik MySQL "dumper" (patrz setup_dumper.sql)
  - plik konfiguracyjny ~/.my.cnf.dumper z haslem:

      [client]
      user=dumper
      password=DumperPass!2026

  - chmod 600 ~/.my.cnf.dumper

Przyklady:
  $0 -d sklep_internetowy -v
  $0 -d sklep_internetowy -o /var/backups/mysql -r 14
EOF
}

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

cleanup() {
  if [[ -n "$temp_file" && -f "$temp_file" ]]; then
    rm -f "$temp_file"
    log INFO "Usunieto plik tymczasowy: $temp_file"
  fi
}

trap cleanup EXIT

# ----------
# Parsowanie opcji
# ----------
while getopts "d:o:r:vh" opt; do
  case $opt in
    d) db_name="$OPTARG" ;;
    o) dest_dir="$OPTARG" ;;
    r) retention_days="$OPTARG" ;;
    v) verbose=1 ;;
    h) usage; exit 0 ;;
    *) usage; exit 1 ;;
  esac
done

# ----------
# Walidacja
# ----------
if [[ -z "$db_name" ]]; then
  log ERROR "Brak opcji -d (nazwa bazy jest wymagana)"
  usage
  exit 1
fi

if [[ ! -f "$mysql_cnf" ]]; then
  log ERROR "Brak pliku $mysql_cnf"
  log ERROR "Utworz go z zawartoscia:"
  log ERROR "  [client]"
  log ERROR "  user=$mysql_user"
  log ERROR "  password=<haslo>"
  exit 2
fi

# Sprawdzenie uprawnien pliku (musi byc 600 - tylko wlasciciel)
file_perm=$(stat -c "%a" "$mysql_cnf" 2>/dev/null || stat -f "%Lp" "$mysql_cnf")
if [[ "$file_perm" != "600" ]]; then
  log WARN "Plik $mysql_cnf ma uprawnienia $file_perm (zalecane: 600)"
fi

# Test polaczenia
if ! mysql --defaults-extra-file="$mysql_cnf" -e "SELECT 1" >/dev/null 2>&1; then
  log ERROR "Nie mozna polaczyc sie z MySQL jako $mysql_user"
  exit 3
fi

# Sprawdzenie czy baza istnieje
if ! mysql --defaults-extra-file="$mysql_cnf" \
     -e "SHOW DATABASES LIKE '$db_name'" 2>/dev/null | grep -q "$db_name"; then
  log ERROR "Baza '$db_name' nie istnieje lub uzytkownik $mysql_user nie ma do niej dostepu"
  exit 4
fi

# ----------
# Dump
# ----------
mkdir -p "$dest_dir"

date_suffix=$(date +%Y%m%d_%H%M%S)
backup_file="$dest_dir/${db_name}_${date_suffix}.sql.gz"
temp_file=$(mktemp)

log INFO "Baza:      $db_name"
log INFO "Plik:      $backup_file"
log INFO "Retention: $retention_days dni"

if mysqldump --defaults-extra-file="$mysql_cnf" \
     --single-transaction \
     --routines \
     --triggers \
     --events \
     --quick \
     --add-drop-database \
     --databases "$db_name" 2>"$temp_file" | gzip > "$backup_file"; then

  size=$(du -h "$backup_file" | cut -f1)
  log INFO "Dump zakonczony: $backup_file ($size)"
else
  log ERROR "Blad podczas dumpu"
  if [[ -s "$temp_file" ]]; then
    log ERROR "Szczegoly: $(cat "$temp_file")"
  fi
  rm -f "$backup_file"
  exit 5
fi

# ----------
# Retention - czyszczenie starych backupow
# ----------
old_files=$(find "$dest_dir" -name "${db_name}_*.sql.gz" -type f -mtime "+$retention_days" 2>/dev/null || true)

if [[ -n "$old_files" ]]; then
  echo "$old_files" | while read -r f; do
    log INFO "Usuwam stary backup: $f"
    rm -f "$f"
  done
fi

log INFO "Gotowe"