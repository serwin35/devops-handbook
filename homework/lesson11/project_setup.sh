#!/bin/bash
#
# Lekcja 11 - Zadanie 1: project_setup.sh
#
# Ulepszona wersja skryptu z lekcji. Tworzy strukture nowego projektu
# i przyjmuje argumenty pozycyjne.
#
# Uzycie:
#   ./project_setup.sh <nazwa_projektu> <jezyk> [katalogi_csv]
#
# Argumenty:
#   $1 - nazwa projektu   (wymagane)
#   $2 - jezyk: python | js | go   (wymagane)
#   $3 - niestandardowe katalogi (opcjonalne, CSV, domyslnie: src,tests,docs)
#
# Przyklady:
#   ./project_setup.sh api python
#   ./project_setup.sh web js "src,tests,public,styles"
#   ./project_setup.sh tool go "cmd,internal,pkg,docs"

set -uo pipefail

# ---------- Walidacja argumentow ----------
if [[ $# -lt 2 ]]; then
  echo "Uzycie: $0 <nazwa_projektu> <jezyk> [katalogi_csv]"
  echo "  jezyk:    python | js | go"
  echo "  katalogi: lista CSV, np. 'src,tests,docs' (domyslnie)"
  exit 1
fi

project_name="$1"
language="$2"
dirs_csv="${3:-src,tests,docs}"

# Walidacja jezyka
if [[ "$language" != "python" && "$language" != "js" && "$language" != "go" ]]; then
  echo "[ERROR] Nieznany jezyk: $language (dozwolone: python, js, go)"
  exit 2
fi

# Plik logu - w katalogu projektu
LOG_FILE=""

# ---------- Funkcje ----------

# Logowanie akcji - do stdout i do setup.log
log_action() {
  local msg="[$(date '+%Y-%m-%d %H:%M:%S')] $1"
  echo "$msg"
  if [[ -n "$LOG_FILE" ]]; then
    echo "$msg" >> "$LOG_FILE"
  fi
}

# Tworzenie katalogu z obsluga bledow
create_dir() {
  local dir="$1"
  if [[ -d "$dir" ]]; then
    log_action "[WARN] Katalog '$dir' juz istnieje - pomijam"
    return 1
  fi
  if mkdir -p "$dir"; then
    log_action "[OK] Utworzono katalog '$dir'"
    return 0
  else
    log_action "[ERROR] Nie udalo sie utworzyc katalogu '$dir'"
    return 2
  fi
}

# Tworzenie .gitignore zaleznie od jezyka
create_gitignore() {
  local project="$1"
  local lang="$2"
  local gitignore="$project/.gitignore"

  if [[ "$lang" == "python" ]]; then
    cat > "$gitignore" <<'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
.venv/
*.egg-info/
dist/
build/
.pytest_cache/
.coverage
EOF
  elif [[ "$lang" == "js" ]]; then
    cat > "$gitignore" <<'EOF'
# Node / JavaScript
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
dist/
build/
.env
.env.local
coverage/
.next/
.cache/
EOF
  elif [[ "$lang" == "go" ]]; then
    cat > "$gitignore" <<'EOF'
# Go
*.exe
*.exe~
*.dll
*.so
*.dylib
*.test
*.out
vendor/
bin/
EOF
  fi

  log_action "[OK] Utworzono .gitignore dla $lang"
}

# Tworzenie podstawowego pliku zrodlowego
create_main_file() {
  local project="$1"
  local lang="$2"
  local main_file=""

  if [[ "$lang" == "python" ]]; then
    main_file="$project/src/main.py"
    mkdir -p "$(dirname "$main_file")"
    cat > "$main_file" <<EOF
def main():
    print("Hello from $project!")


if __name__ == "__main__":
    main()
EOF
  elif [[ "$lang" == "js" ]]; then
    main_file="$project/src/index.js"
    mkdir -p "$(dirname "$main_file")"
    cat > "$main_file" <<EOF
function main() {
  console.log("Hello from $project!");
}

main();
EOF
  elif [[ "$lang" == "go" ]]; then
    main_file="$project/src/main.go"
    mkdir -p "$(dirname "$main_file")"
    cat > "$main_file" <<EOF
package main

import "fmt"

func main() {
    fmt.Println("Hello from $project!")
}
EOF
  fi

  log_action "[OK] Utworzono plik zrodlowy '$main_file'"
}

# Tworzenie README
create_readme() {
  local project="$1"
  cat > "$project/README.md" <<EOF
# $project

**Jezyk:** $language
**Utworzono:** $(date '+%Y-%m-%d %H:%M:%S')

## Struktura
$(echo "$dirs_csv" | tr ',' '\n' | sed 's/^/- /')
EOF
  log_action "[OK] Utworzono README.md"
}

# ---------- Glowna logika ----------

# 1) Katalog glowny projektu
if [[ -d "$project_name" ]]; then
  echo "[ERROR] Projekt '$project_name' juz istnieje - przerywam"
  exit 3
fi

mkdir -p "$project_name"
LOG_FILE="$project_name/setup.log"
: > "$LOG_FILE"

log_action "=== Start: tworzenie projektu '$project_name' (jezyk: $language) ==="
log_action "[OK] Utworzono katalog glowny '$project_name'"

# 2) Podkatalogi z CSV (petla for)
IFS=',' read -r -a dirs_array <<< "$dirs_csv"
for dir in "${dirs_array[@]}"; do
  # usun biale znaki wokol nazwy
  dir="$(echo "$dir" | xargs)"
  [[ -z "$dir" ]] && continue
  create_dir "$project_name/$dir"
done

# 3) Pliki specyficzne dla jezyka
create_gitignore "$project_name" "$language"
create_main_file "$project_name" "$language"
create_readme "$project_name"

# 4) Inicjalizacja git (opcjonalna)
if command -v git >/dev/null 2>&1; then
  ( cd "$project_name" && git init -q )
  log_action "[OK] Zainicjalizowano repozytorium git"
else
  log_action "[WARN] git niedostepny - pomijam init"
fi

log_action "=== Zakonczono tworzenie projektu '$project_name' ==="
echo
echo "Log zapisany w: $LOG_FILE"
