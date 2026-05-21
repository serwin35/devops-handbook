# Lekcja 18 — Homework: Konfiguracja cz. 1 (Ansible)

**Zadanie 1 i 2 (obowiazkowe):** instalacja Ansible, konfiguracja srodowiska
oraz pierwszy playbook demonstrujacy idempotencje.

## Pliki

| Plik            | Opis                                    |
|-----------------|-----------------------------------------|
| `ansible.cfg`   | Konfiguracja Ansible (inventory, ssh)   |
| `inventory.ini` | Lista hostow + grupy                    |
| `playbook.yaml` | Pierwszy playbook (apt + paczki + plik) |

## Zadanie 1 — Instalacja i konfiguracja

### 1. Instalacja Ansible (Debian/Ubuntu)

```bash
sudo apt update
sudo apt install -y ansible

ansible --version
```

### 2. SSH dla localhost (do testow)

```bash
# Wygeneruj klucz jesli nie masz
[[ -f ~/.ssh/id_rsa ]] || ssh-keygen -t rsa -b 4096 -N "" -f ~/.ssh/id_rsa

# Dodaj klucz do localhost
ssh-copy-id localhost

# Test
ssh localhost "echo OK"
```

### 3. Test polaczenia

```bash
cd homework/lesson18

ansible local -m ping
ansible local -m setup -a 'filter=ansible_distribution*'
```

Oczekiwany wynik `ansible local -m ping`:

```
localhost | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

## Zadanie 2 — Pierwszy playbook

### Uruchomienie

```bash
# Dry-run (bez wprowadzania zmian)
ansible-playbook playbook.yaml --check --diff

# Pelna apliacja
ansible-playbook playbook.yaml

# Verbose
ansible-playbook playbook.yaml -v
```

### Co robi playbook

1. **Update apt cache** (jesli system to Debian/Ubuntu)
2. **Install common packages**: htop, vim, curl, git
3. **Create test directory** `/tmp/ansible_test`
4. **Deploy test file** `/tmp/ansible_test/test.txt` z faktami o hoscie
5. **Show test file** — wypisuje zawartosc

### Weryfikacja

```bash
ls -la /tmp/ansible_test/
cat /tmp/ansible_test/test.txt
```

### Demonstracja idempotencji

Drugi run powinien byc `0 changed`:

```bash
ansible-playbook playbook.yaml
```

Oczekiwane:

```
PLAY RECAP ****************************************************
localhost  : ok=6  changed=0  unreachable=0  failed=0
```

Jesli `changed=0` w drugim runie — idempotencja zachowana.

## Kryteria oceny

- [x] Ansible zainstalowany (`ansible --version`)
- [x] `ansible local -m ping` zwraca `pong`
- [x] Pierwszy run playbooka — `changed > 0` (system rzeczywiscie zmieniony)
- [x] Drugi run playbooka — `changed = 0` (idempotencja)
- [x] `/tmp/ansible_test/test.txt` zawiera fakty o hoscie
- [x] Pakiety htop/vim/curl/git zainstalowane (`which htop`)