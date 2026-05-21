# Lekcja 19 — Zadanie domowe 2: Wlasna rola Ansible + publikacja na Galaxy

**Cel:** zaprojektowac, zaimplementowac i opublikowac wlasna role Ansible
spelniajaca konkretna potrzebe. Rezultat: link do roli na Ansible Galaxy
(do wyslania na Slack).

## Wybrana rola: `dumper`

Rola automatyzujaca backupy baz MySQL/MariaDB:

- Tworzy dedykowanego uzytkownika `dumper` z **minimalnymi** uprawnieniami
  do robienia backupow (bez prawa zapisu — bezpieczne nawet przy wycieku hasla)
- Instaluje skrypt `dumper-backup` w `/usr/local/sbin/`
- Konfiguruje cron job (domyslnie codziennie 2:00)
- Obsluguje retention (usuwa stare backupy)
- Wspiera Ubuntu/Debian, parametryzowana, idempotentna

## Struktura projektu

```
zadanie-domowe-2/
└── roles/dumper/
    ├── .ansible-lint
    ├── .github/workflows/ci.yml
    ├── LICENSE
    ├── README.md
    ├── defaults/main.yml
    ├── handlers/main.yml
    ├── meta/main.yml
    ├── tasks/main.yml
    ├── templates/
    │   ├── dump.sh.j2
    │   ├── my.cnf.dumper.j2
    │   └── restore.sh.j2
    └── tests/
        ├── inventory
        └── test.yml
```

## Krok 1 — Lokalne testowanie

```bash
cd roles/dumper

# Lint
pip install ansible-lint ansible
ansible-lint .

# Dry-run
ansible-playbook -i tests/inventory tests/test.yml --check

# Aplikacja (wymaga zainstalowanego MySQL)
ansible-playbook -i tests/inventory tests/test.yml
```

## Krok 2 — Publikacja na GitHub

```bash
# 1. Utworz repo na GitHub: ansible-role-dumper
#    (Galaxy konwencja: ansible-role-<NAZWA>)

cd roles/dumper
git init -b main
git add .
git commit -m "Initial release: dumper role v1.0.0"
git remote add origin git@github.com:<TWOJ_USER>/ansible-role-dumper.git
git push -u origin main

# 2. Tag pierwszej wersji (Galaxy uzywa tagow do wersjonowania)
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0
```

## Krok 3 — Konfiguracja Galaxy

1. Zaloguj sie na <https://galaxy.ansible.com/> kontem GitHub
2. Settings -> Repositories -> sync wszystkie repo
3. My Content -> Add Content -> Import Role from GitHub
4. Wybierz `<TWOJ_USER>/ansible-role-dumper`
5. Galaxy zaimportuje role i pokaze status

URL roli bedzie:
`https://galaxy.ansible.com/<TWOJ_USER>/dumper`

## Krok 4 — Automatyczna re-import przy kazdym push

W repo GitHub:

1. Wygeneruj API token: <https://galaxy.ansible.com/me/preferences>
2. Settings -> Secrets and variables -> Actions -> New repository secret
   - Name: `GALAXY_API_KEY`
   - Value: <token z Galaxy>
3. Push -> workflow `.github/workflows/ci.yml` automatycznie odpali
   `ansible-lint` i przy push do `main` zaimportuje nowa wersje do Galaxy

## Krok 5 — Test publicznego uzycia

Po opublikowaniu rola jest dostepna globalnie:

```bash
ansible-galaxy install <TWOJ_USER>.dumper

# I uzywana w playbookach:
- hosts: db_servers
  roles:
    - role: <TWOJ_USER>.dumper
      vars:
        dumper_password: "{{ vault_dumper_password }}"
```

## Krok 6 — Wyslanie linku

Po pomyslnym imporcie wyslij link na Slack:

```
https://galaxy.ansible.com/<TWOJ_USER>/dumper
```

## Checklist (wymagania zadania)

- [x] Rola dla konkretnego zadania (automatyczny backup MySQL)
- [x] Parametryzowana (z domyslnymi wartosciami w `defaults/main.yml`)
- [x] Obsluguje rozne dystrybucje Linux (Debian, Ubuntu — `platforms` w meta)
- [x] Zawiera testy (`tests/test.yml`)
- [x] Idempotentna (uzycie modulow `package`, `mysql_user`, `cron`, `template`)
- [x] Pelna dokumentacja (`README.md` z requirements/variables/examples)
- [x] Repozytorium GitHub
- [x] Testy CI (GitHub Actions: ansible-lint + auto-import)
- [x] Semantyczne wersjonowanie (tagi `v1.0.0` itd.)
- [x] Plik LICENSE (MIT)
- [x] Tagi w `meta/main.yml` (mysql, backup, database, cron, dump, devops)
- [x] Link do roli na Galaxy

## Wersjonowanie

Stosujemy semver:

- `v1.0.0` — pierwsza stabilna wersja
- `v1.0.1` — bugfix
- `v1.1.0` — backward-compatible feature (np. nowa zmienna w defaults)
- `v2.0.0` — breaking change (np. zmiana nazwy zmiennej, usuniecie funkcji)

Po kazdej zmianie aktualizuj `CHANGELOG.md`, taguj wersje i pushuj
tag — CI zrobi re-import na Galaxy.
