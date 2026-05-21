import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Concept from '../../components/Concept';
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
import LessonNav from '../../components/LessonNav';

export default function Lesson16() {
  usePageTitle('Lekcja 16 — Bazy danych cz. 1');

  return (
    <div>
      <PageHeader
        title="Lekcja 16 — Bazy danych: SQL, NoSQL, MySQL/PostgreSQL"
        subtitle="DBMS · modele · MySQL · PostgreSQL · SQL · backupy · replikacja"
        color="var(--c-blue)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === Cele === */}
        <Card title="Cele lekcji" color="var(--c-blue)">
          <Concept title="Co poznasz?" color="var(--c-blue)">
            Czym jest baza danych i DBMS, roznice <b>SQL vs NoSQL</b>,
            instalacja i zabezpieczenie <b>MySQL/PostgreSQL</b>, podstawy{' '}
            <b>SQL</b> (SELECT, JOIN, GROUP BY) i strategia backupow.
          </Concept>
          <Divider />
          <Row code="1">DBMS i modele baz danych</Row>
          <Row code="2">Charakterystyka SQL (relacyjne, ACID)</Row>
          <Row code="3">Charakterystyka NoSQL (Mongo, Redis, Cassandra)</Row>
          <Row code="4">Instalacja MySQL i PostgreSQL na Linux</Row>
          <Row code="5">Administracja: uzytkownicy, uprawnienia</Row>
          <Row code="6">SQL: DDL, DML, JOIN, GROUP BY, widoki</Row>
          <Row code="7">Backupy (mysqldump, pg_dump) i replikacja</Row>
        </Card>

        {/* === DBMS === */}
        <Card title="Co to jest DBMS?" color="var(--c-purple)">
          <Concept title="Database Management System" color="var(--c-purple)">
            Oprogramowanie zarzadzajace baza: tworzy, modyfikuje, chroni dane,
            kontroluje wspolbiezny dostep, robi backupy.
          </Concept>
          <Divider />
          <SectionLabel>Popularne DBMS</SectionLabel>
          <Row code="MySQL">open source, popularne w LAMP/LEMP</Row>
          <Row code="PostgreSQL">open source, zaawansowane (JSON, GIS)</Row>
          <Row code="MariaDB">fork MySQL po przejeciu przez Oracle</Row>
          <Row code="Oracle DB">komercyjne, enterprise</Row>
          <Row code="MS SQL Server">komercyjne, Microsoft</Row>
          <Row code="MongoDB">NoSQL, dokumentowe (JSON)</Row>
          <Row code="Redis">NoSQL, klucz-wartosc, in-memory</Row>
        </Card>

        {/* === Modele === */}
        <Card title="Modele baz danych" color="var(--c-orange)">
          <Row code="Relacyjne">tabele + relacje (SQL): MySQL, PG</Row>
          <Row code="Dokumentowe">JSON/BSON: MongoDB, CouchDB</Row>
          <Row code="Klucz-wartosc">key=value: Redis, DynamoDB</Row>
          <Row code="Kolumnowe">kolumny: Cassandra, HBase (Big Data)</Row>
          <Row code="Grafowe">wezly + krawedzie: Neo4j</Row>
          <Row code="Obiektowe">obiekty: db4o (rzadkie)</Row>
          <Divider />
          <InfoBox>
            <b>90% projektow</b> dziala na bazie relacyjnej. NoSQL wybieraj
            swiadomie, gdy SQL nie wystarcza.
          </InfoBox>
        </Card>

        {/* === SQL === */}
        <Card title="Bazy SQL — relacyjne" color="var(--c-green)" full>
          <Concept title="Tabele + klucze + ACID" color="var(--c-green)">
            Dane w tabelach (wiersze + kolumny). Powiazania przez klucze obce.
            Transakcje gwarantuja spojnosc (ACID).
          </Concept>
          <Divider />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Cechy SQL</SectionLabel>
              <Row code="Schemat">sztywny — ALTER TABLE</Row>
              <Row code="Klucze">PRIMARY KEY, FOREIGN KEY</Row>
              <Row code="Normalizacja">
                redukcja redundancji (1NF, 2NF, 3NF)
              </Row>
              <Row code="ACID">
                Atomicity, Consistency, Isolation, Durability
              </Row>
              <Row code="Jezyk">standard SQL — DDL, DML, DQL, DCL</Row>
            </div>
            <div>
              <SectionLabel>Typy relacji</SectionLabel>
              <Row code="1:1">user — profile</Row>
              <Row code="1:N">klient — zamowienia</Row>
              <Row code="M:N">studenci — kursy (tabela posrednia)</Row>
              <Divider />
              <SectionLabel>ACID</SectionLabel>
              <Row code="A">caly transakcja albo nic</Row>
              <Row code="C">naruszenia constraintow odrzucone</Row>
              <Row code="I">rownolegle transakcje sie nie psuja</Row>
              <Row code="D">po commit dane przezyja crash</Row>
            </div>
          </div>
        </Card>

        {/* === NoSQL === */}
        <Card title="Bazy NoSQL — kiedy?" color="var(--c-purple)" full>
          <SectionLabel>Kiedy NoSQL ma sens</SectionLabel>
          <Row code="Skala">horyzontalna na 100+ wezlach</Row>
          <Row code="Schema-less">struktura zmienia sie czesto</Row>
          <Row code="Latency">&lt; 100ms wymagane (Redis cache)</Row>
          <Row code="IoT/streaming">duzy strumien zdarzen</Row>
          <Row code="Big Data">analityka petabytes</Row>
          <Divider />
          <SectionLabel>Typy NoSQL</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Row code="Dokumentowe">MongoDB, CouchDB — JSON</Row>
              <Row code="Klucz-wartosc">Redis, Memcached — cache, sesje</Row>
              <Row code="Kolumnowe">Cassandra, HBase — Big Data</Row>
              <Row code="Grafowe">Neo4j — relacje, social</Row>
            </div>
            <div>
              <SectionLabel>Wady NoSQL</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Brak standardowego SQL</li>
                <li>Eventual consistency (nie ACID)</li>
                <li>Slabe transakcje wieloobiektowe</li>
                <li>Trudniejsze modelowanie</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* === Instalacja MySQL === */}
        <Card title="Instalacja MySQL" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Comment># 1. Instalacja</Comment>
            <Cmd>
              <H>sudo</H> apt update && <H>sudo</H> apt install -y mysql-server
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 2. Hardening (interaktywnie)</Comment>
            <Cmd>
              <H>sudo</H> mysql_secure_installation
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 3. Status + autostart</Comment>
            <Cmd>
              <H>sudo</H> systemctl status mysql
            </Cmd>
            <Cmd>
              <H>sudo</H> systemctl enable mysql
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 4. Logowanie</Comment>
            <Cmd>
              <H>sudo</H> mysql
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>mysql_secure_installation</b> usuwa anonimowych userow, blokuje
            zdalny root i kasuje testowa baze.
          </InfoBox>
        </Card>

        {/* === Instalacja PostgreSQL === */}
        <Card title="Instalacja PostgreSQL" color="var(--c-blue)">
          <ExampleBlock variant="purple">
            <Cmd>
              <H>sudo</H> apt install -y postgresql postgresql-contrib
            </Cmd>
            <Cmd>
              <H>sudo</H> systemctl enable --now postgresql
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Logowanie jako uzytkownik postgres</Comment>
            <Cmd>
              <H>sudo</H> -i -u postgres
            </Cmd>
            <Cmd>psql</Cmd>
            <Cmd> </Cmd>
            <Comment># W psql:</Comment>
            <Cmd>postgres=# \password postgres</Cmd>
            <Cmd>postgres=# \q</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Konfiguracja dostepu</SectionLabel>
          <Row code="/etc/postgresql/X/main/postgresql.conf">
            listen_addresses, port
          </Row>
          <Row code="/etc/postgresql/X/main/pg_hba.conf">
            kontrola dostepu (host based)
          </Row>
        </Card>

        {/* === Uzytkownicy === */}
        <Card title="Uzytkownicy i uprawnienia" color="var(--c-green)" full>
          <SectionLabel>MySQL</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              CREATE USER <V>'app'</V>@<V>'localhost'</V> IDENTIFIED BY{' '}
              <V>'haslo'</V>;
            </Cmd>
            <Cmd>CREATE DATABASE sklep;</Cmd>
            <Cmd>
              GRANT ALL PRIVILEGES ON sklep.* TO <V>'app'</V>@<V>'localhost'</V>
              ;
            </Cmd>
            <Cmd>FLUSH PRIVILEGES;</Cmd>
            <Cmd> </Cmd>
            <Comment># Granularne uprawnienia</Comment>
            <Cmd>
              GRANT SELECT, INSERT ON sklep.klienci TO <V>'app'</V>@
              <V>'localhost'</V>;
            </Cmd>
            <Cmd>
              SHOW GRANTS FOR <V>'app'</V>@<V>'localhost'</V>;
            </Cmd>
            <Cmd>
              REVOKE INSERT ON sklep.klienci FROM <V>'app'</V>@
              <V>'localhost'</V>;
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">PostgreSQL</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              CREATE ROLE app WITH LOGIN PASSWORD <V>'haslo'</V>;
            </Cmd>
            <Cmd>CREATE DATABASE sklep OWNER app;</Cmd>
            <Cmd>GRANT ALL PRIVILEGES ON DATABASE sklep TO app;</Cmd>
            <Cmd>
              \du{'   '}
              <Comment># lista roli</Comment>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Zasada minimum:</b> aplikacja niech ma tylko
            SELECT/INSERT/UPDATE/DELETE. Bez DROP, ALTER, CREATE.
          </InfoBox>
        </Card>

        {/* === DDL === */}
        <Card title="SQL — DDL (struktura)" color="var(--c-blue)">
          <ExampleBlock variant="purple">
            <Cmd>CREATE TABLE klienci (</Cmd>
            <Cmd>{'    '}id INT PRIMARY KEY AUTO_INCREMENT,</Cmd>
            <Cmd>
              {'    '}imie VARCHAR(<V>50</V>) NOT NULL,
            </Cmd>
            <Cmd>
              {'    '}email VARCHAR(<V>100</V>) UNIQUE,
            </Cmd>
            <Cmd>{'    '}created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP</Cmd>
            <Cmd>);</Cmd>
            <Cmd> </Cmd>
            <Cmd>
              ALTER TABLE klienci ADD telefon VARCHAR(<V>20</V>);
            </Cmd>
            <Cmd>ALTER TABLE klienci DROP COLUMN telefon;</Cmd>
            <Cmd>DROP TABLE klienci;</Cmd>
          </ExampleBlock>
        </Card>

        {/* === DML === */}
        <Card title="SQL — DML (dane)" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Cmd>INSERT INTO klienci (imie, email)</Cmd>
            <Cmd>
              VALUES (<V>'Jan'</V>, <V>'jan@example.com'</V>);
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              UPDATE klienci SET imie = <V>'Janek'</V> WHERE id = <V>1</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              DELETE FROM klienci WHERE id = <V>1</V>;
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Bez WHERE</b> — UPDATE/DELETE zmodyfikuje wszystkie wiersze.
            Zawsze najpierw SELECT do testu warunku!
          </InfoBox>
        </Card>

        {/* === DQL === */}
        <Card title="SQL — DQL (SELECT)" color="var(--c-yellow)" full>
          <ExampleBlock variant="yellow">
            <Comment># Filtracja</Comment>
            <Cmd>
              SELECT imie, email FROM klienci WHERE id &gt; <V>10</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Sortowanie + limit</Comment>
            <Cmd>
              SELECT * FROM klienci ORDER BY created_at DESC LIMIT <V>10</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Grupowanie</Comment>
            <Cmd>SELECT YEAR(created_at) AS rok, COUNT(*) AS ile</Cmd>
            <Cmd>FROM klienci GROUP BY YEAR(created_at);</Cmd>
            <Cmd> </Cmd>
            <Comment># HAVING — filtrowanie grup</Comment>
            <Cmd>SELECT kategoria, COUNT(*) AS ile</Cmd>
            <Cmd>
              FROM produkty GROUP BY kategoria HAVING COUNT(*) &gt; <V>2</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Funkcje agregujace</Comment>
            <Cmd>
              SELECT COUNT(*), AVG(cena), MIN(cena), MAX(cena), SUM(cena)
            </Cmd>
            <Cmd>FROM produkty;</Cmd>
          </ExampleBlock>
        </Card>

        {/* === JOIN === */}
        <Card title="JOIN — laczenie tabel" color="var(--c-orange)" full>
          <ExampleBlock variant="orange">
            <Comment># INNER JOIN — tylko dopasowane</Comment>
            <Cmd>SELECT k.imie, z.kwota</Cmd>
            <Cmd>FROM klienci k</Cmd>
            <Cmd>INNER JOIN zamowienia z ON k.id = z.klient_id;</Cmd>
            <Cmd> </Cmd>
            <Comment># LEFT JOIN — wszyscy klienci, nawet bez zamowien</Comment>
            <Cmd>SELECT k.imie, z.kwota</Cmd>
            <Cmd>FROM klienci k</Cmd>
            <Cmd>LEFT JOIN zamowienia z ON k.id = z.klient_id;</Cmd>
            <Cmd> </Cmd>
            <Comment># Klienci bez zamowien</Comment>
            <Cmd>SELECT k.imie</Cmd>
            <Cmd>FROM klienci k</Cmd>
            <Cmd>LEFT JOIN zamowienia z ON k.id = z.klient_id</Cmd>
            <Cmd>WHERE z.id IS NULL;</Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="INNER">tylko pasujace pary</Row>
          <Row code="LEFT">wszystkie z lewej + dopasowane z prawej</Row>
          <Row code="RIGHT">wszystkie z prawej + dopasowane z lewej</Row>
          <Row code="FULL">wszystkie po obu stronach (PG, MS SQL)</Row>
        </Card>

        {/* === Widoki + podzapytania === */}
        <Card title="Widoki i podzapytania" color="var(--c-purple)" full>
          <ExampleBlock variant="purple">
            <Comment># Podzapytanie w WHERE</Comment>
            <Cmd>SELECT imie FROM klienci</Cmd>
            <Cmd>
              WHERE id IN (SELECT klient_id FROM zamowienia WHERE kwota &gt;{' '}
              <V>1000</V>);
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Widok</Comment>
            <Cmd>CREATE VIEW podsumowanie AS</Cmd>
            <Cmd>
              SELECT k.id, k.imie, COUNT(z.id) AS ile, SUM(z.kwota) AS suma
            </Cmd>
            <Cmd>
              FROM klienci k LEFT JOIN zamowienia z ON k.id = z.klient_id
            </Cmd>
            <Cmd>GROUP BY k.id, k.imie;</Cmd>
            <Cmd> </Cmd>
            <Cmd>SELECT * FROM podsumowanie ORDER BY suma DESC;</Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Widok</b> to "zapisane SELECT". Nie zawiera danych — za kazdym
            razem przelicza sie z bazowych tabel.
          </InfoBox>
        </Card>

        {/* === Backupy === */}
        <Card title="Backupy" color="var(--c-yellow)" full>
          <Concept title="Bez backupow baza to bomba" color="var(--c-yellow)">
            Nie pytanie, czy padnie — tylko kiedy. Strategia: codziennie pelny +
            co godzine przyrostowy + offline copy + miesieczny test odtworzenia.
          </Concept>
          <Divider />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>MySQL — mysqldump</SectionLabel>
              <ExampleBlock variant="default">
                <Comment># Dump jednej bazy</Comment>
                <Cmd>mysqldump -u root -p sklep &gt; sklep.sql</Cmd>
                <Cmd> </Cmd>
                <Comment># Wszystkie bazy</Comment>
                <Cmd>mysqldump -u root -p --all-databases &gt; all.sql</Cmd>
                <Cmd> </Cmd>
                <Comment># Tylko struktura (--no-data)</Comment>
                <Cmd>mysqldump -u root -p --no-data sklep &gt; struct.sql</Cmd>
                <Cmd> </Cmd>
                <Comment># Restore</Comment>
                <Cmd>mysql -u root -p sklep &lt; sklep.sql</Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>PostgreSQL — pg_dump</SectionLabel>
              <ExampleBlock variant="default">
                <Comment># SQL format</Comment>
                <Cmd>pg_dump -U postgres sklep &gt; sklep.sql</Cmd>
                <Cmd> </Cmd>
                <Comment># Custom format (kompresja)</Comment>
                <Cmd>pg_dump -F c -U postgres sklep &gt; sklep.dump</Cmd>
                <Cmd> </Cmd>
                <Comment># Wszystkie bazy + role</Comment>
                <Cmd>pg_dumpall -U postgres &gt; all.sql</Cmd>
                <Cmd> </Cmd>
                <Comment># Restore</Comment>
                <Cmd>pg_restore -U postgres -d sklep sklep.dump</Cmd>
              </ExampleBlock>
            </div>
          </div>
        </Card>

        {/* === Replikacja === */}
        <Card title="Replikacja master-slave" color="var(--c-blue)" full>
          <Concept title="Po co?" color="var(--c-blue)">
            Wysoka dostepnosc, podzial obciazenia (write na master, read na
            slave), backup ze slave bez wplywu na produkcje.
          </Concept>
          <Divider />
          <ExampleBlock variant="default">
            <Cmd> Aplikacja</Cmd>
            <Cmd> write{'   '}read</Cmd>
            <Cmd> ▼{'    '}▼</Cmd>
            <Cmd> [ MySQL Master ]</Cmd>
            <Cmd> | |</Cmd>
            <Cmd> ▼ ▼</Cmd>
            <Cmd>
              {' '}
              [ Slave 1 ] [ Slave 2 ]{'  '}
              <Comment># read-only</Comment>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Konfiguracja MySQL master</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>[mysqld]</Cmd>
            <Cmd>
              server-id = <V>1</V>
            </Cmd>
            <Cmd>log_bin = mysql-bin</Cmd>
            <Cmd>binlog_format = ROW</Cmd>
            <Cmd> </Cmd>
            <Comment># Uzytkownik replikacji</Comment>
            <Cmd>
              CREATE USER <V>'repl'</V>@<V>'%'</V> IDENTIFIED BY{' '}
              <V>'repl_pass'</V>;
            </Cmd>
            <Cmd>
              GRANT REPLICATION SLAVE ON *.* TO <V>'repl'</V>@<V>'%'</V>;
            </Cmd>
            <Cmd>SHOW MASTER STATUS;</Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">Slave</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>CHANGE MASTER TO</Cmd>
            <Cmd>
              {'  '}MASTER_HOST = <V>'master_ip'</V>,
            </Cmd>
            <Cmd>
              {'  '}MASTER_USER = <V>'repl'</V>,
            </Cmd>
            <Cmd>
              {'  '}MASTER_PASSWORD = <V>'repl_pass'</V>,
            </Cmd>
            <Cmd>
              {'  '}MASTER_LOG_FILE = <V>'mysql-bin.000001'</V>,
            </Cmd>
            <Cmd>
              {'  '}MASTER_LOG_POS = <V>4</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>START SLAVE;</Cmd>
            <Cmd>SHOW SLAVE STATUS\G</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Slownik === */}
        <Card title="Slownik" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <SectionLabel>PRIMARY KEY</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Unikatowy identyfikator wiersza. Indeksowany, nie-NULL.
              </p>
            </div>
            <div>
              <SectionLabel>FOREIGN KEY</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Referencja do PK w innej tabeli. Wymusza integralnosc relacyjna.
              </p>
            </div>
            <div>
              <SectionLabel>INDEX</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Struktura przyspieszajaca SELECT (drzewo B-tree). Spowalnia
                INSERT/UPDATE.
              </p>
            </div>
            <div>
              <SectionLabel>Transakcja</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                BEGIN ... COMMIT/ROLLBACK. Atomowy ciag operacji.
              </p>
            </div>
            <div>
              <SectionLabel>Normalizacja</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Redukcja redundancji przez podzial tabel (1NF, 2NF, 3NF).
              </p>
            </div>
            <div>
              <SectionLabel>Schema</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Definicja struktury bazy (tabele, kolumny, typy).
              </p>
            </div>
          </div>
        </Card>

        {/* === Kryteria === */}
        <Card title="Kryteria oceny" color="var(--c-accent)">
          <Row code="1">MySQL/PostgreSQL zainstalowany i hardened</Row>
          <Row code="2">Utworzony user aplikacji z ograniczeniami</Row>
          <Row code="3">Utworzona baza ze schematem (3 tabele + FK)</Row>
          <Row code="4">Zapytania SELECT z JOIN i GROUP BY</Row>
          <Row code="5">Wykonany i przetestowany backup</Row>
        </Card>

        {/* === Dokumentacja === */}
        <Card title="Dokumentacja" color="var(--c-purple)">
          <ul className="text-[11px] text-[var(--c-muted)] space-y-1">
            <li>
              <a
                href="https://dev.mysql.com/doc/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                MySQL Reference Manual
              </a>
            </li>
            <li>
              <a
                href="https://www.postgresql.org/docs/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                PostgreSQL Documentation
              </a>
            </li>
            <li>
              <a
                href="https://www.w3schools.com/sql/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                W3Schools SQL Tutorial
              </a>
            </li>
            <li>
              <a
                href="https://use-the-index-luke.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Use The Index, Luke! — performance
              </a>
            </li>
          </ul>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/15', label: '15 — SSL/TLS' }}
        next={{ to: '/lessons/17', label: '17 — Bazy cz. 2 (HA)' }}
      />
    </div>
  );
}
