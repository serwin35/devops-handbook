# Lekcja 19 — Zadanie 1: LAMP w rolach Ansible

Konfiguracja stosu LAMP (Linux, Apache, MySQL, PHP) z wykorzystaniem rol Ansible.

## Struktura

```
zadanie1/
├── ansible.cfg
├── inventory.ini
├── requirements.yml
├── site.yml
└── roles/
    ├── apache/
    │   ├── defaults/main.yml
    │   ├── handlers/main.yml
    │   ├── tasks/main.yml
    │   └── templates/vhost.conf.j2
    ├── mysql/
    │   ├── defaults/main.yml
    │   ├── handlers/main.yml
    │   └── tasks/main.yml
    └── php/
        ├── defaults/main.yml
        ├── handlers/main.yml
        ├── tasks/main.yml
        └── templates/info.php.j2
```

## Uruchomienie

```bash
cd homework/lesson19/zadanie1

# Instalacja kolekcji wymaganej przez modul mysql_db
ansible-galaxy collection install -r requirements.yml

# Dry-run
ansible-playbook site.yml --check --diff

# Aplikacja
ansible-playbook site.yml
```

## Weryfikacja

```bash
# Apache vhost
curl http://lamp.local/
curl http://lamp.local/info.php | head -20

# MySQL
mysql -u lamp_user -plamp_password -e "SHOW DATABASES"

# Wpis w /etc/hosts
grep lamp.local /etc/hosts
```

## Idempotencja

```bash
# Drugi run powinien dac changed=0
ansible-playbook site.yml
```

## Konfigurowane parametry (vars w site.yml)

| Zmienna                 | Wartosc           | Opis                     |
|-------------------------|-------------------|--------------------------|
| `apache_domain`         | lamp.local        | nazwa hosta              |
| `apache_document_root`  | /var/www/lamp.local | katalog dokumentow     |
| `mysql_db_name`         | lamp_db           | nazwa bazy               |
| `mysql_user`            | lamp_user         | uzytkownik bazy          |
| `mysql_password`        | lamp_password     | haslo (zmien w prod!)    |
| `php_test_file_path`    | (z apache_doc_root)/info.php | sciezka info.php |

## Kryteria oceny

- [x] 3 role: apache, mysql, php — kazda z defaults/tasks/handlers
- [x] Apache uzywa szablonu Jinja2 do generowania vhost.conf
- [x] MySQL tworzy baze + uzytkownika z odpowiednimi uprawnieniami
- [x] PHP zainstalowany z modulem dla Apache (libapache2-mod-php)
- [x] Handlery restartuja/reloaduja serwisy tylko gdy cos sie zmienilo
- [x] Smoke test po deployu — `curl http://lamp.local/` zwraca 200
- [x] Drugi run = 0 changed (idempotencja)