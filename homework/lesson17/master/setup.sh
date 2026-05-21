#!/bin/bash
# Konfiguracja serwera master dla streaming replication PostgreSQL.
# Uruchom na serwerze, ktory ma byc primary.
#
# Wymagania:
#   - zainstalowany PostgreSQL 15
#   - dostep sudo
#   - haslo dla uzytkownika 'replicator' w zmiennej REPLICATOR_PASSWORD

set -euo pipefail

PG_VERSION="${PG_VERSION:-15}"
PG_CONF="/etc/postgresql/${PG_VERSION}/main/postgresql.conf"
PG_HBA="/etc/postgresql/${PG_VERSION}/main/pg_hba.conf"
REPLICATOR_PASSWORD="${REPLICATOR_PASSWORD:-}"
REPLICATION_NETWORK="${REPLICATION_NETWORK:-10.0.0.0/24}"

if [[ -z "$REPLICATOR_PASSWORD" ]]; then
  echo "ERROR: ustaw REPLICATOR_PASSWORD przed uruchomieniem"
  echo "   export REPLICATOR_PASSWORD='SilneHaslo!2026'"
  exit 1
fi

echo "==> 1. Backup konfiguracji"
sudo cp "$PG_CONF" "${PG_CONF}.bak.$(date +%s)"
sudo cp "$PG_HBA"  "${PG_HBA}.bak.$(date +%s)"

echo "==> 2. Aktualizacja postgresql.conf"
sudo tee -a "$PG_CONF" > /dev/null <<EOF

# --- replication (added by setup.sh) ---
listen_addresses = '*'
wal_level = replica
max_wal_senders = 10
max_replication_slots = 10
wal_keep_size = 512MB
hot_standby = on
hot_standby_feedback = on
EOF

echo "==> 3. Aktualizacja pg_hba.conf"
echo "host  replication  replicator  ${REPLICATION_NETWORK}  scram-sha-256" \
  | sudo tee -a "$PG_HBA" > /dev/null

echo "==> 4. Restart PostgreSQL"
sudo systemctl restart "postgresql@${PG_VERSION}-main"

echo "==> 5. Tworzenie uzytkownika replicator"
sudo -u postgres psql <<SQL
DO \$\$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'replicator') THEN
      CREATE ROLE replicator WITH REPLICATION LOGIN PASSWORD '${REPLICATOR_PASSWORD}';
   ELSE
      ALTER ROLE replicator WITH REPLICATION LOGIN PASSWORD '${REPLICATOR_PASSWORD}';
   END IF;
END
\$\$;
SQL

echo "==> 6. Tworzenie replication slot"
sudo -u postgres psql -c "SELECT pg_create_physical_replication_slot('replica_slot_1');" \
  2>/dev/null || echo "Slot 'replica_slot_1' juz istnieje - OK"

echo "==> 7. Status"
sudo -u postgres psql -c "SELECT slot_name, slot_type, active FROM pg_replication_slots;"

echo ""
echo "Master gotowy. Teraz odpal slave/setup.sh na drugim serwerze."
echo "Pamietaj: na slave wymagane:"
echo "  - MASTER_HOST=<ip mastera>"
echo "  - REPLICATOR_PASSWORD=<to samo haslo>"