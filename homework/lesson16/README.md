# Lekcja 16 — Homework: Bazy danych cz. 1

**Zadanie 4 (obowiazkowe):** automatyczny dump bazy MySQL przez dedykowanego
uzytkownika `dumper` oraz skrypt przywracajacy backup.

## Pliki

| Plik                | Opis                                         |
|---------------------|----------------------------------------------|
| `setup_dumper.sql`  | Tworzenie uzytkownika `dumper` z minimalnymi uprawnieniami |
| `dump.sh`           | Skrypt robiacy backup (gzip + retention)      |
| `restore.sh`        | Skrypt przywracajacy backup                  |

## Uzytkownik `dumper`

Backup robimy z osobnego konta, ktore ma **tylko niezbedne uprawnienia**
(SELECT, LOCK TABLES, SHOW VIEW, EVENT, TRIGGER, RELOAD, PROCESS,
REPLICATION CLIENT). Nie ma CREATE/DROP/INSERT/UPDATE/DELETE — nawet
jesli haslo wycieknie, nie zniszczy danych.

```bash
sudo mysql < setup_dumper.sql
```

## Konfiguracja hasel

Hasla trzymamy w plikach `~/.my.cnf.*` z chmod 600 — `dump.sh` i
`restore.sh` korzystaja z `--defaults-extra-file`, dzieki czemu hasla
nie pojawiaja sie w `ps aux` ani w historii powloki.

```bash
# Dla dumpu (user: dumper)
cat > ~/.my.cnf.dumper << 'EOF'
[client]
user=dumper
password=DumperPass!2026
EOF
chmod 600 ~/.my.cnf.dumper

# Dla restore (admin z CREATE/DROP DATABASE)
cat > ~/.my.cnf.admin << 'EOF'
[client]
user=root
password=<haslo_root>
EOF
chmod 600 ~/.my.cnf.admin
```

## Uzycie

### Dump

```bash
chmod +x dump.sh

# Pojedynczy backup z verbose
./dump.sh -d sklep_internetowy -v

# Backup do katalogu /var/backups/mysql z retention 14 dni
./dump.sh -d sklep_internetowy -o /var/backups/mysql -r 14
```

Pliki wynikowe: `<dest_dir>/<db>_YYYYMMDD_HHMMSS.sql.gz`.

### Restore

```bash
chmod +x restore.sh

# Interaktywnie (z potwierdzeniem)
./restore.sh -f backups/sklep_internetowy_20260508_120000.sql.gz -v

# Bez pytania, do innej bazy (np. test)
./restore.sh -f backup.sql.gz -d sklep_test -y
```

## Automatyzacja przez cron

```bash
# crontab -e
0 2 * * *  /home/user/devops-handbook/homework/lesson16/dump.sh -d sklep_internetowy -o /var/backups/mysql -r 14 >> /var/log/mysql-backup.log 2>&1
```

## Test scenariusza

```bash
# 1. Backup
./dump.sh -d sklep_internetowy -v

# 2. Symulacja awarii - upuszczamy baze
mysql --defaults-extra-file=~/.my.cnf.admin -e "DROP DATABASE sklep_internetowy"

# 3. Restore z ostatniego backupu
latest=$(ls -t backups/sklep_internetowy_*.sql.gz | head -1)
./restore.sh -f "$latest" -y -v

# 4. Weryfikacja
mysql --defaults-extra-file=~/.my.cnf.admin sklep_internetowy \
  -e "SELECT COUNT(*) FROM klienci"
```

## Kryteria oceny

- [x] Utworzony uzytkownik `dumper` z minimalnymi uprawnieniami
- [x] `dump.sh` tworzy plik `.sql.gz` z timestampem
- [x] `dump.sh` obsluguje retention (-r N)
- [x] Hasla trzymane w `~/.my.cnf.*` (chmod 600), nie w argumentach
- [x] `restore.sh` rozpakowuje `.gz` automatycznie
- [x] `restore.sh` pyta o potwierdzenie (chyba ze `-y`)
- [x] Pelen cykl backup -> drop -> restore dziala