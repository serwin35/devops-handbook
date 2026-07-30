# Lekcja 34 (IaC cz. 2) — Zadanie domowe 1: Migracja kompletnego środowiska

Cel: ręcznie utworzyć wielokomponentowe środowisko Docker (sieć, wolumen, baza danych,
aplikacja web, load balancer), a następnie **zaimportować je do Terraform** bez przerywania
jego działania, używając struktury modułowej, zmiennych i outputów.

## Architektura

```text
przeglądarka ── :8080 ──> app-lb (nginx) ──> app-web (adminer) ──> app-db (postgres:16)
                                  │                 │                    │
                                  └───────── sieć app-net ──────────────┘
                                                                 wolumen app-db-data
```

- **app-net** — niestandardowa sieć bridge
- **app-db-data** — wolumen na dane bazy
- **app-db** — PostgreSQL 16
- **app-web** — Adminer (aplikacja web łącząca się z bazą)
- **app-lb** — Nginx jako load balancer / reverse proxy, jedyny wystawiony port (8080)

## Struktura plików

```text
lesson34/
├── README.md
├── setup-infra.sh          # krok 1: ręczne utworzenie infrastruktury (docker run)
├── cleanup-docker.sh       # awaryjne sprzątanie poza Terraformem
├── lb/
│   └── nginx.conf          # konfiguracja reverse proxy montowana do app-lb
└── terraform/
    ├── versions.tf         # wymagana wersja TF i provider kreuzwerker/docker
    ├── main.tf             # provider + wywołania modułów
    ├── variables.tf        # zmienne (nazwy, obrazy, porty, hasło bazy)
    ├── outputs.tf          # outputy (URL, nazwy kontenerów, id sieci)
    ├── import.sh           # krok 2: import wszystkich zasobów do stanu
    └── modules/
        ├── network/        # docker_network
        ├── database/       # docker_volume + docker_container (postgres)
        ├── web-app/        # docker_container (adminer)
        └── load-balancer/  # docker_container (nginx + port + mount configu)
```

## Wymagania wstępne

Zadanie wykonujemy na **VM z Linuksem** (poniżej Ubuntu/Debian). Skopiuj katalog na maszynę:

```bash
scp -r homework/lesson34 user@adres-vm:~/lesson34
ssh user@adres-vm
```

**Docker:**

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker "$USER"
newgrp docker            # albo przeloguj się
docker ps                # weryfikacja: działa bez sudo
```

**Terraform (oficjalne repo HashiCorp):**

```bash
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update
sudo apt install -y terraform
terraform version        # >= 1.0
```

## Krok 1 — ręczne utworzenie infrastruktury

```bash
cd ~/lesson34
chmod +x setup-infra.sh cleanup-docker.sh terraform/import.sh
./setup-infra.sh
```

Skrypt wykonuje dokładnie to, co zrobilibyśmy ręcznie:

```bash
docker network create --driver bridge app-net
docker volume create app-db-data

docker run -d --name app-db --network app-net --restart unless-stopped \
  -v app-db-data:/var/lib/postgresql/data \
  -e POSTGRES_DB=appdb -e POSTGRES_USER=app -e POSTGRES_PASSWORD=secret123 \
  postgres:16

docker run -d --name app-web --network app-net --restart unless-stopped \
  -e ADMINER_DEFAULT_SERVER=app-db \
  adminer:latest

docker run -d --name app-lb --network app-net --restart unless-stopped \
  -p 8080:80 \
  -v "$(pwd)/lb/nginx.conf:/etc/nginx/conf.d/default.conf:ro" \
  nginx:latest
```

### Weryfikacja

```bash
docker ps --filter "network=app-net"
curl -I http://localhost:8080
```

Otwórz http://localhost:8080 (z VM; z Twojego komputera: `http://<ip-vm>:8080`) —
przez Nginx zobaczysz Adminera. Zaloguj się do bazy:
system `PostgreSQL`, server `app-db`, user `app`, hasło `secret123`, baza `appdb`.
To potwierdza, że aplikacja web faktycznie łączy się z bazą przez sieć `app-net`.

## Krok 2 — inicjalizacja Terraform

```bash
cd terraform
terraform init
```

Oczekiwany wynik: `Terraform has been successfully initialized!` (pobrany provider
`kreuzwerker/docker`).

## Krok 3 — import zasobów do stanu

Konfiguracja w `main.tf` + modułach jest już napisana tak, aby odpowiadała ręcznie
utworzonym zasobom. Import wykonuje skrypt:

```bash
./import.sh
```

czyli kolejno:

```bash
terraform import 'module.network.docker_network.this'        "$(docker network inspect -f '{{.Id}}' app-net)"
terraform import 'module.database.docker_volume.data'        app-db-data
terraform import 'module.database.docker_container.this'     "$(docker inspect -f '{{.Id}}' app-db)"
terraform import 'module.web_app.docker_container.this'      "$(docker inspect -f '{{.Id}}' app-web)"
terraform import 'module.load_balancer.docker_container.this' "$(docker inspect -f '{{.Id}}' app-lb)"
```

Uwaga: sieci i kontenery importujemy po **ID**, wolumeny po **nazwie**.

### Weryfikacja stanu

```bash
terraform state list
```

Oczekiwany wynik:

```text
module.database.docker_container.this
module.database.docker_volume.data
module.load_balancer.docker_container.this
module.network.docker_network.this
module.web_app.docker_container.this
```

Szczegóły zaimportowanego zasobu: `terraform state show 'module.database.docker_container.this'`.

## Krok 4 — terraform plan i dopasowanie konfiguracji

```bash
terraform plan
```

Cel: **brak zmian wymagających odtworzenia kontenerów** (`must be replaced`).
Drobne aktualizacje "in-place" na atrybutach domyślnych są akceptowalne.

Najczęstsze rozbieżności po imporcie:

- **`image` wymusza replace** — w stanie po imporcie `image` to hash `sha256:...`,
  a w konfiguracji tag (np. `postgres:16`). Jeśli plan chce odtworzyć kontener tylko
  z tego powodu, podmień wartość zmiennej na hash obrazu:

  ```bash
  docker inspect -f '{{.Image}}' app-db
  terraform plan -var "db_image=sha256:..."
  ```

  albo zaakceptuj jednorazowe odtworzenie kontenera (dane bazy przetrwają, bo są na wolumenie).
- **ścieżka do `nginx.conf`** — moduł load-balancera liczy `abspath("${path.root}/../lb/nginx.conf")`,
  więc `terraform` uruchamiaj z katalogu `lesson34/terraform/`, tego samego, względem którego
  działał `setup-infra.sh`.
- **atrybuty domyślne** (`attach`, `logs`, `must_run`, `wait` itp.) — pokazują się jako
  update in-place przy pierwszym `apply`, to normalne.

## Krok 5 — terraform apply

```bash
terraform apply
```

Oczekiwany wynik: `Apply complete! Resources: 0 added, X changed, 0 destroyed.`
oraz outputy:

```text
database_container = "app-db"
load_balancer_url  = "http://localhost:8080"
network_id         = "..."
web_app_container  = "app-web"
```

Środowisko przez cały czas działa — sprawdź ponownie `curl -I http://localhost:8080`.

## Krok 6 — dowód, że Terraform zarządza infrastrukturą

Zmień np. port load balancera i zastosuj zmianę:

```bash
terraform apply -var "lb_external_port=9090"
curl -I http://localhost:9090
terraform apply   # powrót do 8080 (wartość domyślna)
```

## Sprzątanie

Gdy skończysz:

```bash
terraform destroy
```

(usuwa kontenery, sieć i wolumen ze stanu i z Dockera). Gdyby coś poszło nie tak
przed importem — `../cleanup-docker.sh`.

## Kryteria oceny (checklist)

Poziom podstawowy:

- [ ] Pomyślny import istniejących zasobów do Terraform (`terraform state list` pokazuje 5 zasobów)
- [ ] Zrozumienie procesu migracji infrastruktury (identyfikacja → import → konfiguracja → weryfikacja planem)
- [ ] Znajomość praktyk organizacji kodu (podział na `versions.tf` / `main.tf` / `variables.tf` / `outputs.tf`)

Poziom zaawansowany:

- [ ] Struktura modułowa (`modules/network`, `modules/database`, `modules/web-app`, `modules/load-balancer`)
- [ ] Zmienne z wartościami domyślnymi + `sensitive = true` dla hasła bazy
- [ ] Outputy na poziomie modułów i roota
- [ ] `.gitignore` dla plików stanu (`*.tfstate`)
