#!/usr/bin/env bash
#
# Krok 1 zadania: ręczne utworzenie infrastruktury Docker,
# którą następnie zaimportujemy do Terraform.
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "==> Tworzenie sieci app-net"
docker network create --driver bridge app-net

echo "==> Tworzenie wolumenu app-db-data"
docker volume create app-db-data

echo "==> Uruchamianie bazy danych (PostgreSQL)"
docker run --detach \
  --name app-db \
  --network app-net \
  --restart unless-stopped \
  --volume app-db-data:/var/lib/postgresql/data \
  --env POSTGRES_DB=appdb \
  --env POSTGRES_USER=app \
  --env POSTGRES_PASSWORD=secret123 \
  postgres:16

echo "==> Uruchamianie aplikacji web (Adminer)"
docker run --detach \
  --name app-web \
  --network app-net \
  --restart unless-stopped \
  --env ADMINER_DEFAULT_SERVER=app-db \
  adminer:latest

echo "==> Uruchamianie load balancera (Nginx)"
docker run --detach \
  --name app-lb \
  --network app-net \
  --restart unless-stopped \
  --publish 8080:80 \
  --volume "${SCRIPT_DIR}/lb/nginx.conf:/etc/nginx/conf.d/default.conf:ro" \
  nginx:latest

echo
echo "==> Gotowe. Stan kontenerów:"
docker ps --filter "network=app-net"
echo
echo "Aplikacja dostępna pod: http://localhost:8080"
echo "Login do bazy w Adminerze: system=PostgreSQL, server=app-db, user=app, password=secret123, db=appdb"