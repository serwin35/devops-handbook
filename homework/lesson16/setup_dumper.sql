-- Uzytkownik dedykowany do robienia backupow
-- Posiada tylko uprawnienia niezbedne dla mysqldump:
--   SELECT          - czytanie danych
--   LOCK TABLES     - spojny snapshot tabel MyISAM
--   SHOW VIEW       - dump definicji widokow
--   EVENT, TRIGGER  - dump trigerow i eventow
--   RELOAD          - FLUSH TABLES WITH READ LOCK
--   PROCESS         - SHOW PROCESSLIST
--   REPLICATION CLIENT - SHOW MASTER STATUS (do --master-data)

CREATE USER IF NOT EXISTS 'dumper'@'localhost' IDENTIFIED BY 'DumperPass!2026';

GRANT SELECT, LOCK TABLES, SHOW VIEW, EVENT, TRIGGER
  ON *.* TO 'dumper'@'localhost';

GRANT RELOAD, PROCESS, REPLICATION CLIENT
  ON *.* TO 'dumper'@'localhost';

FLUSH PRIVILEGES;

-- Weryfikacja
SHOW GRANTS FOR 'dumper'@'localhost';
