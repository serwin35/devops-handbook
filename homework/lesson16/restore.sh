#!/bin/bash
# Uzycie:
#   ./restore.sh -f <plik> [-d <baza>] [-y] [-v] [-h]
#
# Opcje:
#   -f FILE   plik z dumpem (.sql lub .sql.gz, wymagane)
#   -d DB     nazwa bazy docelowej (domyslnie: z nazwy pliku)
#   -y        bez interaktywnego potwierdzenia
#   -v        tryb verbose
#   -h        wyswietl pomoc
#
# UWAGA: restore wymaga konta z uprawnieniem do CREATE/DROP DATABASE.
# Uzytkownik "dumper" celowo NIE ma takich uprawnien - restore robi sie
# kontem administratora (root lub admin).
#
# Przyklady:
#   ./restore.sh -f backups/sklep_internetowy_20260508_120000.sql.gz -v
#   ./restore.sh -f backup.sql.gz -d sklep_test -y

set -euo pipefail

# ----------
# Wartosci domyslne
# ----------
backup_file=""
db_name=""
auto_yes=0
verbose=0
temp_dir=""

# Konto administratora (nie dumper - dumper nie ma CREATE/DROP)
mysql_admin_cnf="$HOME/.my.cnf.admin"

# ----------
# Funkcje
# ----------

usage() {
  cat << EOF
Uzycie: $0 -f <plik> [-d <baza>] [-y] [-v] [-h]

Opcje:
  -f FILE   plik z dumpem (.sql lub .sql.gz, wymagane)
  -d DB     nazwa bazy docelowej (domyslnie: z nazwy pliku)
  -y        bez interaktywnego potwierdzenia
  -v        tryb verbose
  -h        ta pomoc

Wymagania:
  - plik konfiguracyjny ~/.my.cnf.admin z kontem majacym CREATE/DROP DATABASE
  - chmod 600 ~/.my.cnf.admin

Przyklady:
  $0 -f backups/sklep_internetowy_20260508_120000.sql.gz -v
  $0 -f backup.sql.gz -d sklep_test -y
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
  if [[ -n "$temp_dir" && -d "$temp_dir" ]]; then
    rm -rf "$temp_dir"
    log INFO "Usunieto katalog tymczasowy: $temp_dir"
  fi
}

trap cleanup EXIT

# ----------
# Parsowanie opcji
# ----------
while getopts "f:d:yvh" opt; do
  case $opt in
    f) backup_file="$OPTARG" ;;
    d) db_name="$OPTARG" ;;
    y) auto_yes=1 ;;
    v) verbose=1 ;;
    h) usage; exit 0 ;;
    *) usage; exit 1 ;;
  esac
done

# ----------
# Walidacja
# ----------
if [[ -z "$backup_file" ]]; then
  log ERROR "Brak opcji -f (plik z dumpem jest wymagany)"
  usage
  exit 1
fi

if [[ ! -f "$backup_file" ]]; then
  log ERROR "Plik nie istnieje: $backup_file"
  exit 2
fi

if [[ ! -f "$mysql_admin_cnf" ]]; then
  log ERROR "Brak pliku $mysql_admin_cnf z kontem administratora MySQL"
  exit 3
fi

# Jesli nie podano -d, wyciagamy nazwe z pliku (przed pierwszym _DATE)
if [[ -z "$db_name" ]]; then
  base=$(basename "$backup_file")
  base="${base%.gz}"
  base="${base%.sql}"
  db_name="${base%_[0-9]*_[0-9]*}"
  log INFO "Wykryta nazwa bazy: $db_name"
fi

# Test polaczenia
if ! mysql --defaults-extra-file="$mysql_admin_cnf" -e "SELECT 1" >/dev/null 2>&1; then
  log ERROR "Nie mozna polaczyc sie z MySQL kontem admin"
  exit 4
fi

# ----------
# Potwierdzenie (chyba ze -y)
# ----------
echo "==================================="
echo "Plik:    $backup_file"
echo "Baza:    $db_name"
echo "==================================="

db_exists=$(mysql --defaults-extra-file="$mysql_admin_cnf" \
            -Nse "SELECT COUNT(*) FROM information_schema.schemata WHERE schema_name='$db_name'")

if [[ "$db_exists" -gt 0 ]]; then
  echo "UWAGA: baza '$db_name' juz istnieje - zostanie nadpisana."
fi

if [[ $auto_yes -ne 1 ]]; then
  read -r -p "Kontynuowac? [y/N]: " ans
  case "$ans" in
    [yY]|[yY][eE][sS]) ;;
    *) log INFO "Anulowano"; exit 0 ;;
  esac
fi

# ----------
# Restore
# ----------
temp_dir=$(mktemp -d)

# Rozpakuj jesli .gz
if [[ "$backup_file" == *.gz ]]; then
  log INFO "Dekompresja..."
  gunzip -c "$backup_file" > "$temp_dir/dump.sql"
  sql_file="$temp_dir/dump.sql"
else
  sql_file="$backup_file"
fi

# Upewnij sie ze baza istnieje (utworz jesli trzeba)
mysql --defaults-extra-file="$mysql_admin_cnf" \
  -e "CREATE DATABASE IF NOT EXISTS \`$db_name\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"

log INFO "Restore $sql_file -> $db_name ..."

if mysql --defaults-extra-file="$mysql_admin_cnf" "$db_name" < "$sql_file"; then
  log INFO "Restore zakonczony pomyslnie"
else
  log ERROR "Blad podczas restore"
  exit 5
fi

# Weryfikacja
tables=$(mysql --defaults-extra-file="$mysql_admin_cnf" -Nse "USE \`$db_name\`; SHOW TABLES" | wc -l)
log INFO "Liczba tabel po restore: $tables"

echo "Gotowe. Baza '$db_name' przywrocona z $backup_file"