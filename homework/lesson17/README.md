# Lekcja 17 — Homework: Bazy danych cz. 2

**Zadanie 1 (obowiazkowe):** konfiguracja replikacji master-slave w PostgreSQL.

## Architektura

```
   [ Client ]
       |
    write/read                read-only
       |                          ^
       v                          |
  +---------+                +---------+
  | MASTER  | --- WAL --->   | SLAVE   |
  | :5432   |    stream      | :5432   |
  +---------+                +---------+
   primary                    standby
```

## Pliki

| Plik                              | Opis                                       |
|-----------------------------------|--------------------------------------------|
| `master/postgresql.conf.snippet`  | Fragmenty do `postgresql.conf` na master   |
| `master/pg_hba.conf.snippet`      | Wpis dla replicatora w `pg_hba.conf`       |
| `master/setup.sh`                 | Konfiguracja mastera (idempotentna)         |
| `slave/setup.sh`                  | Konfiguracja slave (pg_basebackup)          |
| `test_replication.sh`             | Weryfikacja: master -> slave przyplyw danych |

## Wymagania wstepne

- Dwa serwery z Ubuntu/Debian i zainstalowanym PostgreSQL 15
- Sieciowy dostep slave -> master na port 5432
- Sudo na obu maszynach

## Krok 1 — Master

```bash
ssh master.example.com

cd homework/lesson17
export REPLICATOR_PASSWORD='SilneHaslo!2026'
export REPLICATION_NETWORK='10.0.0.0/24'   # zakres sieci slave
chmod +x master/setup.sh
./master/setup.sh
```

Co robi skrypt:

1. Backup `postgresql.conf` i `pg_hba.conf`
2. Dopisuje konfiguracje replikacji (`wal_level=replica`, `max_wal_senders=10` itd.)
3. Dopisuje regule `pg_hba.conf` dla uzytkownika `replicator`
4. Restart PostgreSQL
5. Tworzy role `replicator` (idempotentnie)
6. Tworzy physical replication slot `replica_slot_1`

## Krok 2 — Slave

```bash
ssh slave.example.com

cd homework/lesson17
export MASTER_HOST='192.168.1.10'
export REPLICATOR_PASSWORD='SilneHaslo!2026'
chmod +x slave/setup.sh
./slave/setup.sh
```

Co robi skrypt:

1. Stop PostgreSQL na slave
2. Backup obecnego katalogu danych (`.bak.<timestamp>`)
3. `pg_basebackup` z mastera (z `--write-recovery-conf` i `--slot`)
4. Utworzenie `standby.signal`
5. Start PostgreSQL — slave laczy sie z masterem i zaczyna nadrabiac WAL

## Krok 3 — Weryfikacja

Z dowolnej maszyny majacej `psql`:

```bash
chmod +x test_replication.sh
./test_replication.sh 192.168.1.10 192.168.1.11
```

Test wykonuje:

1. `pg_stat_replication` na master
2. `pg_is_in_recovery()` na slave (powinno byc `t`)
3. CREATE TABLE + INSERT na master
4. SELECT na slave (powinien zobaczyc dane)
5. INSERT na slave (powinien sie nie udac — read-only)
6. Pomiar lagu replikacji (bytes + sekundy)

## Rozwiazywanie problemow

### Slave nie laczy sie z masterem

```bash
# Na slave
sudo tail -f /var/log/postgresql/postgresql-15-main.log
```

Typowe komunikaty:

- `could not connect to the primary server: connection refused`
  -> sprawdz `listen_addresses` na master + firewall
- `password authentication failed`
  -> niezgodne haslo lub brak wpisu w `pg_hba.conf`
- `the database system is starting up`
  -> normalne, daj 10s

### Lag rosnie

```sql
SELECT pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) AS lag_bytes
FROM pg_stat_replication;
```

Jesli lag rosnie liniowo:

- slave nie nadaza (CPU/IO bottleneck) -> mocniejszy sprzet
- siec wolna -> sprawdz `iperf3` miedzy serwerami
- za malo `max_wal_senders` na master

### Replikacja rozjechala sie

```bash
# Na slave - re-init od zera
sudo systemctl stop postgresql@15-main
sudo rm -rf /var/lib/postgresql/15/main/*
# i ponownie odpal slave/setup.sh
```

## Kryteria oceny

- [x] Master ma `wal_level=replica` i `max_wal_senders >= 10`
- [x] Master ma role `replicator` z `REPLICATION` privilege
- [x] Slave w `pg_is_in_recovery()` zwraca `t`
- [x] Master w `pg_stat_replication` widzi slave (state=streaming)
- [x] CREATE TABLE na master -> widoczne na slave w 2s
- [x] INSERT na slave -> blad (read-only)
- [x] Lag replikacji < 1MB w spoczynku