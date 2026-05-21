#!/bin/bash
# Weryfikacja dzialajacej replikacji.
# Uruchom: ./test_replication.sh <master_ip> <slave_ip>
#
# Skrypt zaklada ze masz uprawnienia psql do obu serwerow przez postgres.

set -euo pipefail

MASTER="${1:-}"
SLAVE="${2:-}"

if [[ -z "$MASTER" || -z "$SLAVE" ]]; then
  echo "Uzycie: $0 <master_ip> <slave_ip>"
  exit 1
fi

run_master() {
  sudo -u postgres psql -h "$MASTER" -d postgres -c "$1"
}

run_slave() {
  sudo -u postgres psql -h "$SLAVE" -d postgres -c "$1"
}

echo "==> 1. Status replikacji na master"
run_master "SELECT client_addr, state, sent_lsn, write_lsn, flush_lsn, replay_lsn FROM pg_stat_replication;"

echo ""
echo "==> 2. Slave w recovery?"
run_slave "SELECT pg_is_in_recovery();"

echo ""
echo "==> 3. Tworzenie tabeli testowej na master"
run_master "DROP TABLE IF EXISTS replication_test;"
run_master "CREATE TABLE replication_test (id serial PRIMARY KEY, msg text, ts timestamp DEFAULT now());"
run_master "INSERT INTO replication_test (msg) VALUES ('test replikacji'), ('drugi wiersz');"

echo ""
echo "==> 4. Czekam 2s na replikacje..."
sleep 2

echo ""
echo "==> 5. Odczyt ze slave"
run_slave "SELECT * FROM replication_test;"

echo ""
echo "==> 6. Test zapisu na slave (powinien byc blad)"
if run_slave "INSERT INTO replication_test (msg) VALUES ('to powinno sie nie udac');" 2>&1; then
  echo "ERROR: slave przyjal zapis - cos jest zle!"
  exit 2
else
  echo "OK - slave odrzucil zapis (zachowuje sie jak read-only standby)"
fi

echo ""
echo "==> 7. Lag replikacji"
run_master "SELECT application_name, client_addr,
  pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) AS lag_bytes,
  EXTRACT(EPOCH FROM (now() - reply_time)) AS lag_seconds
FROM pg_stat_replication;"

echo ""
echo "Replikacja dziala poprawnie."