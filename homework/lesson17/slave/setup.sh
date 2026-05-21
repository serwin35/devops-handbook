#!/bin/bash
# Konfiguracja serwera slave (standby) dla streaming replication PostgreSQL.
# Uruchom na serwerze, ktory ma byc replika.
#
# Wymagania:
#   - zainstalowany PostgreSQL 15 (z domyslna baza, ktora zostanie skasowana)
#   - dostep sudo
#   - dzialajacy master ze skonfigurowanym uzytkownikiem replicator
#
# Zmienne:
#   MASTER_HOST           - IP/hostname mastera (wymagane)
#   REPLICATOR_PASSWORD   - haslo replicatora z mastera (wymagane)
#   PG_VERSION            - wersja PG (domyslnie: 15)

set -euo pipefail

PG_VERSION="${PG_VERSION:-15}"
PG_DATA="/var/lib/postgresql/${PG_VERSION}/main"
PG_CONF="/etc/postgresql/${PG_VERSION}/main/postgresql.conf"
MASTER_HOST="${MASTER_HOST:-}"
REPLICATOR_PASSWORD="${REPLICATOR_PASSWORD:-}"
SLOT_NAME="${SLOT_NAME:-replica_slot_1}"

if [[ -z "$MASTER_HOST" || -z "$REPLICATOR_PASSWORD" ]]; then
  echo "ERROR: ustaw MASTER_HOST i REPLICATOR_PASSWORD"
  echo "   export MASTER_HOST=192.168.1.10"
  echo "   export REPLICATOR_PASSWORD='SilneHaslo!2026'"
  exit 1
fi

echo "==> 1. Stop PostgreSQL"
sudo systemctl stop "postgresql@${PG_VERSION}-main"

echo "==> 2. Backup obecnego katalogu danych"
if [[ -d "$PG_DATA" ]] && [[ -n "$(ls -A "$PG_DATA" 2>/dev/null)" ]]; then
  ts=$(date +%Y%m%d_%H%M%S)
  sudo mv "$PG_DATA" "${PG_DATA}.bak.${ts}"
  sudo mkdir -p "$PG_DATA"
  sudo chown postgres:postgres "$PG_DATA"
  sudo chmod 700 "$PG_DATA"
  echo "    Stary katalog danych w: ${PG_DATA}.bak.${ts}"
fi

echo "==> 3. pg_basebackup z mastera"
sudo -u postgres PGPASSWORD="$REPLICATOR_PASSWORD" \
  pg_basebackup \
    --host="$MASTER_HOST" \
    --username=replicator \
    --pgdata="$PG_DATA" \
    --progress \
    --verbose \
    --wal-method=stream \
    --slot="$SLOT_NAME" \
    --write-recovery-conf

echo "==> 4. Konfiguracja standby"
sudo -u postgres touch "$PG_DATA/standby.signal"

# pg_basebackup --write-recovery-conf zapisuje primary_conninfo i primary_slot_name
# do postgresql.auto.conf - upewniamy sie ze hot_standby jest on
sudo tee -a "$PG_CONF" > /dev/null <<EOF

# --- standby (added by setup.sh) ---
hot_standby = on
hot_standby_feedback = on
EOF

echo "==> 5. Start PostgreSQL"
sudo systemctl start "postgresql@${PG_VERSION}-main"

sleep 3

echo "==> 6. Weryfikacja"
echo "Czy jestesmy w recovery (powinno byc 't'):"
sudo -u postgres psql -c "SELECT pg_is_in_recovery();"

echo ""
echo "Status WAL receiver:"
sudo -u postgres psql -c "SELECT status, sender_host, sender_port, slot_name FROM pg_stat_wal_receiver;"

echo ""
echo "Slave gotowy. Sprawdz pg_stat_replication na masterze."