#!/usr/bin/env bash
#
# Awaryjne sprzątanie infrastruktury utworzonej przez setup-infra.sh.
# Jeżeli zasoby są już zarządzane przez Terraform, użyj `terraform destroy`.
#
set -uo pipefail

docker rm --force app-lb app-web app-db 2>/dev/null
docker network rm app-net 2>/dev/null
docker volume rm app-db-data 2>/dev/null

echo "Posprzątane."