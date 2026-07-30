#!/usr/bin/env bash
#
# Krok 2 zadania: import ręcznie utworzonych zasobów Docker do stanu Terraform.
# Uruchamiaj z katalogu terraform/ po wykonaniu `terraform init`.
#
set -euo pipefail

echo "==> Import sieci app-net"
terraform import 'module.network.docker_network.this' \
  "$(docker network inspect --format '{{.Id}}' app-net)"

echo "==> Import wolumenu app-db-data"
terraform import 'module.database.docker_volume.data' app-db-data

echo "==> Import kontenera bazy danych app-db"
terraform import 'module.database.docker_container.this' \
  "$(docker inspect --format '{{.Id}}' app-db)"

echo "==> Import kontenera aplikacji app-web"
terraform import 'module.web_app.docker_container.this' \
  "$(docker inspect --format '{{.Id}}' app-web)"

echo "==> Import kontenera load balancera app-lb"
terraform import 'module.load_balancer.docker_container.this' \
  "$(docker inspect --format '{{.Id}}' app-lb)"

echo
echo "==> Zaimportowane zasoby w stanie:"
terraform state list
