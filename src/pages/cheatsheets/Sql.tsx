import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import ExampleBlock, {
  Cmd,
  Comment,
  H,
  V,
} from '../../components/ExampleBlock';
import Row from '../../components/Row';
import Divider from '../../components/Divider';
import InfoBox from '../../components/InfoBox';
import SectionLabel from '../../components/SectionLabel';

export default function Sql() {
  usePageTitle('SQL — cheatsheet');

  return (
    <div>
      <PageHeader
        title="SQL · MySQL · PostgreSQL"
        subtitle="DDL · DML · SELECT · JOIN · GROUP BY · backup · admin"
        color="var(--c-blue)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === Logowanie === */}
        <Card title="Logowanie" color="var(--c-blue)">
          <SectionLabel>MySQL</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>mysql -u root -p</Cmd>
            <Cmd>
              mysql -u app -p -h <V>10.0.0.5</V> -D sklep
            </Cmd>
            <Cmd>mysql -u app -p &lt; script.sql</Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">PostgreSQL</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              <H>sudo</H> -u postgres psql
            </Cmd>
            <Cmd>psql -U app -d sklep -h localhost</Cmd>
            <Cmd>psql -U app -d sklep -f script.sql</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Meta === */}
        <Card title="Meta-polecenia" color="var(--c-green)">
          <SectionLabel>MySQL</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>SHOW DATABASES;</Cmd>
            <Cmd>USE sklep;</Cmd>
            <Cmd>SHOW TABLES;</Cmd>
            <Cmd>DESCRIBE klienci;</Cmd>
            <Cmd>SHOW CREATE TABLE klienci;</Cmd>
            <Cmd>SHOW PROCESSLIST;</Cmd>
            <Cmd>SHOW STATUS;</Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">PostgreSQL (psql)</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              \l{'         '}
              <Comment># bazy</Comment>
            </Cmd>
            <Cmd>
              \c sklep{'   '}
              <Comment># wybierz baze</Comment>
            </Cmd>
            <Cmd>
              \dt{'        '}
              <Comment># tabele</Comment>
            </Cmd>
            <Cmd>
              \d klienci{'  '}
              <Comment># opis</Comment>
            </Cmd>
            <Cmd>
              \du{'        '}
              <Comment># role</Comment>
            </Cmd>
            <Cmd>
              \q{'         '}
              <Comment># wyjscie</Comment>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === DDL === */}
        <Card title="DDL — struktura" color="var(--c-yellow)" full>
          <ExampleBlock variant="yellow">
            <Comment># Tworzenie bazy</Comment>
            <Cmd>CREATE DATABASE sklep CHARACTER SET utf8mb4;</Cmd>
            <Cmd>DROP DATABASE sklep;</Cmd>
            <Cmd> </Cmd>
            <Comment># Tabela</Comment>
            <Cmd>CREATE TABLE klienci (</Cmd>
            <Cmd>
              {'    '}id INT AUTO_INCREMENT PRIMARY KEY,{'  '}
              <Comment># MySQL</Comment>
            </Cmd>
            <Cmd>
              {'    '}
              <Comment># id SERIAL PRIMARY KEY, -- PostgreSQL</Comment>
            </Cmd>
            <Cmd>
              {'    '}imie VARCHAR(<V>50</V>) NOT NULL,
            </Cmd>
            <Cmd>
              {'    '}email VARCHAR(<V>100</V>) UNIQUE,
            </Cmd>
            <Cmd>
              {'    '}wiek INT CHECK (wiek &gt; <V>0</V>),
            </Cmd>
            <Cmd>{'    '}created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP</Cmd>
            <Cmd>);</Cmd>
            <Cmd> </Cmd>
            <Comment># Modyfikacja</Comment>
            <Cmd>
              ALTER TABLE klienci ADD COLUMN telefon VARCHAR(<V>20</V>);
            </Cmd>
            <Cmd>ALTER TABLE klienci DROP COLUMN telefon;</Cmd>
            <Cmd>ALTER TABLE klienci RENAME TO customers;</Cmd>
            <Cmd>
              ALTER TABLE klienci MODIFY COLUMN imie VARCHAR(<V>100</V>);{'   '}
              <Comment># MySQL</Comment>
            </Cmd>
            <Cmd>
              ALTER TABLE klienci ALTER COLUMN imie TYPE VARCHAR(<V>100</V>);
              {'  '}
              <Comment># PG</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Indeks</Comment>
            <Cmd>CREATE INDEX idx_email ON klienci(email);</Cmd>
            <Cmd>CREATE UNIQUE INDEX uniq_email ON klienci(email);</Cmd>
            <Cmd>
              DROP INDEX idx_email ON klienci;{'   '}
              <Comment># MySQL</Comment>
            </Cmd>
            <Cmd>
              DROP INDEX idx_email;{'                '}
              <Comment># PG</Comment>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === DML === */}
        <Card title="DML — dane" color="var(--c-orange)" full>
          <ExampleBlock variant="orange">
            <Comment># INSERT</Comment>
            <Cmd>
              INSERT INTO klienci (imie, email) VALUES (<V>'Jan'</V>,{' '}
              <V>'jan@x.pl'</V>);
            </Cmd>
            <Cmd> </Cmd>
            <Comment># INSERT wielokrotny</Comment>
            <Cmd>INSERT INTO klienci (imie, email) VALUES</Cmd>
            <Cmd>
              {'  '}(<V>'Anna'</V>, <V>'anna@x.pl'</V>),
            </Cmd>
            <Cmd>
              {'  '}(<V>'Piotr'</V>, <V>'piotr@x.pl'</V>);
            </Cmd>
            <Cmd> </Cmd>
            <Comment># INSERT z SELECT</Comment>
            <Cmd>
              INSERT INTO klienci_archiwum SELECT * FROM klienci WHERE id &lt;{' '}
              <V>100</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Comment># UPSERT — MySQL</Comment>
            <Cmd>
              INSERT INTO klienci (id, imie) VALUES (<V>1</V>, <V>'Jan'</V>)
            </Cmd>
            <Cmd>
              {'  '}ON DUPLICATE KEY UPDATE imie = <V>'Jan'</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Comment># UPSERT — PostgreSQL</Comment>
            <Cmd>
              INSERT INTO klienci (id, imie) VALUES (<V>1</V>, <V>'Jan'</V>)
            </Cmd>
            <Cmd>
              {'  '}ON CONFLICT (id) DO UPDATE SET imie = EXCLUDED.imie;
            </Cmd>
            <Cmd> </Cmd>
            <Comment># UPDATE</Comment>
            <Cmd>
              UPDATE klienci SET email = <V>'new@x.pl'</V> WHERE id = <V>1</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Comment># DELETE</Comment>
            <Cmd>
              DELETE FROM klienci WHERE id = <V>1</V>;
            </Cmd>
            <Cmd>
              TRUNCATE TABLE klienci;{'   '}
              <Comment># szybsze, resetuje AUTO_INCREMENT</Comment>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>ZAWSZE</b> testuj WHERE przez SELECT zanim wykonasz
            UPDATE/DELETE!
          </InfoBox>
        </Card>

        {/* === SELECT === */}
        <Card title="SELECT — czesto uzywane" color="var(--c-blue)" full>
          <ExampleBlock variant="purple">
            <Comment># Podstawowe</Comment>
            <Cmd>SELECT * FROM klienci;</Cmd>
            <Cmd>SELECT imie, email FROM klienci;</Cmd>
            <Cmd>SELECT DISTINCT kategoria FROM produkty;</Cmd>
            <Cmd> </Cmd>
            <Comment># Filtrowanie</Comment>
            <Cmd>
              SELECT * FROM klienci WHERE wiek &gt;= <V>18</V> AND city ={' '}
              <V>'Warszawa'</V>;
            </Cmd>
            <Cmd>
              SELECT * FROM klienci WHERE email LIKE <V>'%@gmail.com'</V>;
            </Cmd>
            <Cmd>
              SELECT * FROM klienci WHERE id IN (<V>1</V>, <V>2</V>, <V>3</V>);
            </Cmd>
            <Cmd>
              SELECT * FROM klienci WHERE created_at BETWEEN <V>'2026-01-01'</V>{' '}
              AND <V>'2026-12-31'</V>;
            </Cmd>
            <Cmd>SELECT * FROM klienci WHERE telefon IS NULL;</Cmd>
            <Cmd> </Cmd>
            <Comment># Sortowanie + limit</Comment>
            <Cmd>
              SELECT * FROM klienci ORDER BY created_at DESC LIMIT <V>10</V>;
            </Cmd>
            <Cmd>
              SELECT * FROM klienci ORDER BY nazwisko, imie LIMIT <V>20</V>{' '}
              OFFSET <V>40</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Agregacje</Comment>
            <Cmd>
              SELECT COUNT(*), AVG(wiek), MIN(wiek), MAX(wiek), SUM(wiek)
            </Cmd>
            <Cmd>FROM klienci;</Cmd>
            <Cmd> </Cmd>
            <Comment># GROUP BY + HAVING</Comment>
            <Cmd>SELECT kategoria, COUNT(*) AS ile</Cmd>
            <Cmd>FROM produkty</Cmd>
            <Cmd>GROUP BY kategoria</Cmd>
            <Cmd>
              HAVING COUNT(*) &gt; <V>5</V>
            </Cmd>
            <Cmd>ORDER BY ile DESC;</Cmd>
          </ExampleBlock>
        </Card>

        {/* === JOIN === */}
        <Card title="JOIN" color="var(--c-green)" full>
          <ExampleBlock variant="green">
            <Comment># INNER — tylko dopasowane pary</Comment>
            <Cmd>SELECT k.imie, z.kwota</Cmd>
            <Cmd>FROM klienci k</Cmd>
            <Cmd>INNER JOIN zamowienia z ON k.id = z.klient_id;</Cmd>
            <Cmd> </Cmd>
            <Comment># LEFT — wszyscy klienci, nawet bez zamowien</Comment>
            <Cmd>SELECT k.imie, z.kwota</Cmd>
            <Cmd>FROM klienci k</Cmd>
            <Cmd>LEFT JOIN zamowienia z ON k.id = z.klient_id;</Cmd>
            <Cmd> </Cmd>
            <Comment># Bez zamowien (anti-join)</Comment>
            <Cmd>SELECT k.imie FROM klienci k</Cmd>
            <Cmd>LEFT JOIN zamowienia z ON k.id = z.klient_id</Cmd>
            <Cmd>WHERE z.id IS NULL;</Cmd>
            <Cmd> </Cmd>
            <Comment># 3 tabele</Comment>
            <Cmd>SELECT k.imie, z.id, p.nazwa, zs.ilosc</Cmd>
            <Cmd>FROM klienci k</Cmd>
            <Cmd>JOIN zamowienia z ON k.id = z.klient_id</Cmd>
            <Cmd>JOIN zamowienia_szczegoly zs ON z.id = zs.zamowienie_id</Cmd>
            <Cmd>JOIN produkty p ON zs.produkt_id = p.id;</Cmd>
            <Cmd> </Cmd>
            <Comment># SELF JOIN — hierarchia</Comment>
            <Cmd>SELECT p.imie AS pracownik, m.imie AS manager</Cmd>
            <Cmd>FROM pracownicy p</Cmd>
            <Cmd>LEFT JOIN pracownicy m ON p.manager_id = m.id;</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Subqueries / CTE === */}
        <Card title="Podzapytania / CTE" color="var(--c-purple)" full>
          <ExampleBlock variant="purple">
            <Comment># Podzapytanie w WHERE</Comment>
            <Cmd>SELECT * FROM klienci WHERE id IN (</Cmd>
            <Cmd>
              {'  '}SELECT klient_id FROM zamowienia WHERE kwota &gt;{' '}
              <V>1000</V>
            </Cmd>
            <Cmd>);</Cmd>
            <Cmd> </Cmd>
            <Comment># Skorelowane (per row)</Comment>
            <Cmd>SELECT p.nazwa, p.cena FROM produkty p</Cmd>
            <Cmd>WHERE p.cena &gt; (</Cmd>
            <Cmd>
              {'  '}SELECT AVG(cena) FROM produkty WHERE kategoria = p.kategoria
            </Cmd>
            <Cmd>);</Cmd>
            <Cmd> </Cmd>
            <Comment># CTE (Common Table Expression) — czytelnie</Comment>
            <Cmd>WITH top_klienci AS (</Cmd>
            <Cmd>{'  '}SELECT klient_id, SUM(kwota) AS suma</Cmd>
            <Cmd>{'  '}FROM zamowienia</Cmd>
            <Cmd>{'  '}GROUP BY klient_id</Cmd>
            <Cmd>
              {'  '}HAVING SUM(kwota) &gt; <V>10000</V>
            </Cmd>
            <Cmd>)</Cmd>
            <Cmd>SELECT k.imie, tk.suma</Cmd>
            <Cmd>FROM klienci k</Cmd>
            <Cmd>JOIN top_klienci tk ON k.id = tk.klient_id</Cmd>
            <Cmd>ORDER BY tk.suma DESC;</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Uzytkownicy === */}
        <Card title="Uzytkownicy i uprawnienia" color="var(--c-orange)" full>
          <SectionLabel>MySQL</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>
              CREATE USER <V>'app'</V>@<V>'localhost'</V> IDENTIFIED BY{' '}
              <V>'haslo'</V>;
            </Cmd>
            <Cmd>
              CREATE USER <V>'app'</V>@<V>'%'</V> IDENTIFIED BY <V>'haslo'</V>;
              {'  '}
              <Comment># z dowolnego IP</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              GRANT ALL PRIVILEGES ON sklep.* TO <V>'app'</V>@<V>'localhost'</V>
              ;
            </Cmd>
            <Cmd>
              GRANT SELECT, INSERT, UPDATE ON sklep.klienci TO <V>'app'</V>@
              <V>'localhost'</V>;
            </Cmd>
            <Cmd>FLUSH PRIVILEGES;</Cmd>
            <Cmd> </Cmd>
            <Cmd>
              SHOW GRANTS FOR <V>'app'</V>@<V>'localhost'</V>;
            </Cmd>
            <Cmd>
              REVOKE INSERT ON sklep.* FROM <V>'app'</V>@<V>'localhost'</V>;
            </Cmd>
            <Cmd>
              DROP USER <V>'app'</V>@<V>'localhost'</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Reset hasla</Comment>
            <Cmd>
              ALTER USER <V>'app'</V>@<V>'localhost'</V> IDENTIFIED BY{' '}
              <V>'new'</V>;
            </Cmd>
          </ExampleBlock>

          <SectionLabel className="mt-2">PostgreSQL</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>
              CREATE ROLE app WITH LOGIN PASSWORD <V>'haslo'</V>;
            </Cmd>
            <Cmd>CREATE DATABASE sklep OWNER app;</Cmd>
            <Cmd> </Cmd>
            <Cmd>GRANT ALL PRIVILEGES ON DATABASE sklep TO app;</Cmd>
            <Cmd>GRANT SELECT, INSERT ON klienci TO app;</Cmd>
            <Cmd>GRANT USAGE ON SCHEMA public TO app;</Cmd>
            <Cmd> </Cmd>
            <Cmd>
              \du{'                 '}
              <Comment># lista roli</Comment>
            </Cmd>
            <Cmd>REVOKE INSERT ON klienci FROM app;</Cmd>
            <Cmd>DROP ROLE app;</Cmd>
            <Cmd> </Cmd>
            <Comment># Reset hasla</Comment>
            <Cmd>
              ALTER ROLE app WITH PASSWORD <V>'new'</V>;
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Backup === */}
        <Card title="Backup i restore" color="var(--c-yellow)" full>
          <SectionLabel>MySQL — mysqldump</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Pojedyncza baza</Comment>
            <Cmd>mysqldump -u root -p sklep &gt; sklep.sql</Cmd>
            <Cmd>
              mysqldump -u root -p sklep <V>|</V> gzip &gt; sklep.sql.gz
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Wszystkie bazy</Comment>
            <Cmd>mysqldump -u root -p --all-databases &gt; all.sql</Cmd>
            <Cmd> </Cmd>
            <Comment># Tylko struktura</Comment>
            <Cmd>mysqldump -u root -p --no-data sklep &gt; struct.sql</Cmd>
            <Cmd> </Cmd>
            <Comment># Wybrane tabele</Comment>
            <Cmd>
              mysqldump -u root -p sklep klienci zamowienia &gt; partial.sql
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Restore</Comment>
            <Cmd>mysql -u root -p sklep &lt; sklep.sql</Cmd>
            <Cmd>
              zcat sklep.sql.gz <V>|</V> mysql -u root -p sklep
            </Cmd>
          </ExampleBlock>

          <SectionLabel className="mt-2">PostgreSQL — pg_dump</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Format SQL (czytelny)</Comment>
            <Cmd>pg_dump -U postgres sklep &gt; sklep.sql</Cmd>
            <Cmd> </Cmd>
            <Comment># Format custom (kompresja, selektywny restore)</Comment>
            <Cmd>pg_dump -F c -U postgres sklep -f sklep.dump</Cmd>
            <Cmd> </Cmd>
            <Comment># Wszystkie bazy + role</Comment>
            <Cmd>pg_dumpall -U postgres &gt; all.sql</Cmd>
            <Cmd> </Cmd>
            <Comment># Restore</Comment>
            <Cmd>psql -U postgres sklep &lt; sklep.sql</Cmd>
            <Cmd>pg_restore -U postgres -d sklep sklep.dump</Cmd>
            <Cmd> </Cmd>
            <Comment># Tylko schemat / tylko dane</Comment>
            <Cmd>pg_dump --schema-only sklep</Cmd>
            <Cmd>pg_dump --data-only sklep</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Transakcje === */}
        <Card title="Transakcje" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Cmd>
              BEGIN; <Comment>-- lub START TRANSACTION;</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              UPDATE konta SET saldo = saldo - <V>100</V> WHERE id = <V>1</V>;
            </Cmd>
            <Cmd>
              UPDATE konta SET saldo = saldo + <V>100</V> WHERE id = <V>2</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              COMMIT;{'    '}
              <Comment>-- lub ROLLBACK</Comment>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Poziomy izolacji</SectionLabel>
          <Row code="READ UNCOMMITTED">dirty reads</Row>
          <Row code="READ COMMITTED">domyslny PG</Row>
          <Row code="REPEATABLE READ">domyslny MySQL</Row>
          <Row code="SERIALIZABLE">najmocniejszy</Row>
        </Card>

        {/* === Wydajnosc === */}
        <Card title="Wydajnosc i debug" color="var(--c-blue)">
          <ExampleBlock variant="default">
            <Comment># Plan wykonania</Comment>
            <Cmd>
              EXPLAIN SELECT * FROM klienci WHERE email = <V>'x@y.pl'</V>;
            </Cmd>
            <Cmd>
              EXPLAIN ANALYZE SELECT ...; {'    '}
              <Comment># PG</Comment>
            </Cmd>
            <Cmd>
              EXPLAIN FORMAT=JSON SELECT ...;{'  '}
              <Comment># MySQL</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Slow queries — MySQL</Comment>
            <Cmd>
              SHOW VARIABLES LIKE <V>'slow_query%'</V>;
            </Cmd>
            <Cmd>
              SET GLOBAL slow_query_log = <V>'ON'</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Aktywne polaczenia</Comment>
            <Cmd>
              SHOW PROCESSLIST;{'              '}
              <Comment># MySQL</Comment>
            </Cmd>
            <Cmd>
              SELECT * FROM pg_stat_activity;{'  '}
              <Comment># PG</Comment>
            </Cmd>
          </ExampleBlock>
        </Card>
      </div>
    </div>
  );
}
