# Ansible Role: dumper

Automated MySQL/MariaDB backups with retention, dedicated backup user, and cron scheduling.

## Requirements

- Target host: Debian 11+ or Ubuntu 20.04+
- Working MySQL/MariaDB server on the same host
- `community.mysql` Ansible collection
- Root access (for `mysql_unix_socket` login)

Install collection:

```bash
ansible-galaxy collection install community.mysql
```

## Role Variables

| Variable                    | Default                          | Description                            |
|-----------------------------|----------------------------------|----------------------------------------|
| `dumper_user`               | `dumper`                         | MySQL user for backups                 |
| `dumper_password`           | `ZmienToHaslo!2026`              | Password (change in production)        |
| `dumper_databases`          | `[]`                             | Databases to back up (`[]` = all)      |
| `dumper_excluded_databases` | system DBs                       | Skipped when `dumper_databases` empty  |
| `dumper_backup_dir`         | `/var/backups/mysql`             | Where to store dumps                   |
| `dumper_retention_days`     | `7`                              | Delete dumps older than N days         |
| `dumper_cron_hour`          | `"2"`                            | Cron hour (24h)                        |
| `dumper_cron_minute`        | `"0"`                            | Cron minute                            |
| `dumper_log_file`           | `/var/log/dumper.log`            | Log file for backup runs               |
| `dumper_install_scripts`    | `true`                           | Install scripts + cron job             |
| `dumper_scripts_dir`        | `/usr/local/sbin`                | Where to install scripts               |

## Dependencies

None.

## Example Playbook

Basic — backup all databases daily at 02:00:

```yaml
- hosts: db_servers
  become: true
  roles:
    - role: dumper
      vars:
        dumper_password: "{{ vault_dumper_password }}"
```

Selective — back up only specific databases with 14-day retention:

```yaml
- hosts: db_servers
  become: true
  roles:
    - role: dumper
      vars:
        dumper_password: "{{ vault_dumper_password }}"
        dumper_databases:
          - sklep_internetowy
          - blog
        dumper_retention_days: 14
        dumper_cron_hour: "3"
```

## What this role does

1. Installs `mysql-client`, `python3-pymysql`, `gzip`
2. Creates `dumper_backup_dir` with mode 0750 (root-only)
3. Creates MySQL user `dumper` with the **minimum** privileges needed for `mysqldump`:
   `SELECT, LOCK TABLES, SHOW VIEW, EVENT, TRIGGER, RELOAD, PROCESS, REPLICATION CLIENT`.
   No write privileges — leaked credentials cannot damage data.
4. Drops `/root/.my.cnf.dumper` (chmod 600) so scripts can authenticate
   without exposing passwords in `ps`/history.
5. Installs `dumper-backup` and `dumper-restore` scripts in `/usr/local/sbin/`.
6. Schedules a daily cron job.

## Manual usage

```bash
# Run a backup now
sudo dumper-backup

# Restore a specific dump
sudo dumper-restore /var/backups/mysql/sklep_internetowy_20260508_020000.sql.gz

# Restore to a different database
sudo dumper-restore backup.sql.gz sklep_test
```

## Testing

```bash
cd roles/dumper
ansible-playbook -i tests/inventory tests/test.yml --check
ansible-playbook -i tests/inventory tests/test.yml
```

## License

MIT

## Author

Mateusz Serwinowski