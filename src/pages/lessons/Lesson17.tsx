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

export default function Lesson17() {
  usePageTitle('Lekcja 17 — Bazy danych cz. 2');

  return (
    <div>
      <PageHeader
        title="Lekcja 17 — Wysoka dostepnosc baz: replikacja, Patroni, PgBouncer"
        subtitle="HA · failover · sharding · connection pooling · klaster"
        color="var(--c-purple)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === Cele === */}
        <Card title="Cele lekcji" color="var(--c-purple)">
          <Concept title="Co poznasz?" color="var(--c-purple)">
            Jak budowac systemy bazodanowe odporne na awarie:
            <b> replikacja</b>, <b>klastry HA</b>, <b>Patroni</b>,
            <b> PgBouncer</b>, sharding, monitoring.
          </Concept>
          <Divider />
          <Row code="1">Tolerancja bledow — definicje i cele</Row>
          <Row code="2">Rodzaje awarii (HW, SW, ludzkie)</Row>
          <Row code="3">Strategie: backup, replikacja, klaster</Row>
          <Row code="4">PostgreSQL streaming replication</Row>
          <Row code="5">Patroni + Consul/etcd — automatyczny failover</Row>
          <Row code="6">PgBouncer — connection pooling</Row>
          <Row code="7">Studium przypadku: Miro (PgBouncer + sharding)</Row>
        </Card>

        {/* === Tolerancja === */}
        <Card title="Tolerancja bledow" color="var(--c-blue)">
          <Concept title="Fault tolerance" color="var(--c-blue)">
            Zdolnosc systemu do dalszego dzialania pomimo awarii komponentow.
            Cel: <b>zero downtime</b> i zero utraty danych.
          </Concept>
          <Divider />
          <SectionLabel>Cele</SectionLabel>
          <Row code="HA">High Availability — minimalny przestoj</Row>
          <Row code="Resilience">odzyskanie po awarii</Row>
          <Row code="Consistency">spojnosc danych mimo awarii</Row>
          <Row code="Continuity">ciaglosc biznesowa</Row>
          <Divider />
          <SectionLabel>Metryki</SectionLabel>
          <Row code="RTO">Recovery Time Objective — ile czasu na powrot</Row>
          <Row code="RPO">
            Recovery Point Objective — ile danych mozemy stracic
          </Row>
          <Row code="MTBF">Mean Time Between Failures</Row>
          <Row code="MTTR">Mean Time To Recovery</Row>
        </Card>

        {/* === Rodzaje awarii === */}
        <Card title="Rodzaje awarii" color="var(--c-orange)">
          <Row code="Sprzet">dysk, RAM, CPU, sieci, zasilanie</Row>
          <Row code="Software">bugi w DBMS, OS, sterownikach</Row>
          <Row code="Ludzkie">DROP TABLE prod, zly skrypt</Row>
          <Row code="Katastrofy">pozar, powodz, atak</Row>
          <Row code="Cyber">ransomware, SQL injection, DDoS</Row>
          <Divider />
          <InfoBox>
            <b>Mityczna 9-tka:</b> 99.999% uptime = 5 minut/rok przestoju.
            Dzwiga to dopiero kompleksowy klaster.
          </InfoBox>
        </Card>

        {/* === Strategie === */}
        <Card title="Strategie HA" color="var(--c-green)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Backup</SectionLabel>
              <Row code="Pelny">
                cala baza — wolny restore, mala czestotliwosc
              </Row>
              <Row code="Przyrostowy">
                tylko zmiany od ostatniego (full lub incr)
              </Row>
              <Row code="Roznicowy">tylko zmiany od ostatniego pelnego</Row>
              <Row code="WAL/binlog">
                ciagly zapis log + odtworzenie point-in-time
              </Row>
            </div>
            <div>
              <SectionLabel>Narzedzia</SectionLabel>
              <Row code="pg_dump / pg_basebackup">PostgreSQL native</Row>
              <Row code="Barman">PG backup manager</Row>
              <Row code="pgBackRest">zaawansowane PG backupy</Row>
              <Row code="WAL-G / WAL-E">archiwizacja WAL do S3</Row>
              <Row code="Percona XtraBackup">MySQL hot backup</Row>
            </div>
          </div>
        </Card>

        {/* === Replikacja === */}
        <Card title="Replikacja — typy" color="var(--c-blue)" full>
          <SectionLabel>Modele</SectionLabel>
          <Row code="Master-Slave">1 zapis, N odczyt (klasyczne)</Row>
          <Row code="Multi-Master">kazdy moze pisac (konflikty!)</Row>
          <Row code="Cascading">
            slave-of-slave, redukcja obciazenia mastera
          </Row>
          <Divider />
          <SectionLabel>Synchronicznosc</SectionLabel>
          <Row code="Synchroniczna">
            commit po zapisie na replikach (bezpieczna, wolna)
          </Row>
          <Row code="Asynchroniczna">
            commit od razu, replika dolacza pozniej (szybka, mozna stracic)
          </Row>
          <Row code="Semi-sync">commit po zapisie na N replikach</Row>
          <Divider />
          <ExampleBlock variant="default">
            <Cmd> Aplikacja</Cmd>
            <Cmd> | |</Cmd>
            <Cmd> write read</Cmd>
            <Cmd> ▼ ▼</Cmd>
            <Cmd> [ Primary ]</Cmd>
            <Cmd> | WAL stream</Cmd>
            <Cmd> ▼</Cmd>
            <Cmd> [ Standby 1 ] -&gt; [ Standby 2 ] (cascading)</Cmd>
          </ExampleBlock>
        </Card>

        {/* === PG replikacja === */}
        <Card
          title="PostgreSQL streaming replication"
          color="var(--c-yellow)"
          full
        >
          <SectionLabel>1. Master — postgresql.conf</SectionLabel>
          <ExampleBlock variant="yellow">
            <Cmd>
              listen_addresses = <V>'*'</V>
            </Cmd>
            <Cmd>
              wal_level = <V>replica</V>
            </Cmd>
            <Cmd>
              max_wal_senders = <V>10</V>
            </Cmd>
            <Cmd>
              max_replication_slots = <V>10</V>
            </Cmd>
            <Cmd>hot_standby = on</Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">2. Master — pg_hba.conf</SectionLabel>
          <ExampleBlock variant="yellow">
            <Cmd>host replication replicator 10.0.0.0/24 md5</Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">3. User replikacji</SectionLabel>
          <ExampleBlock variant="yellow">
            <Cmd>
              CREATE ROLE replicator WITH REPLICATION PASSWORD <V>'pass'</V>{' '}
              LOGIN;
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">4. Standby — base backup</SectionLabel>
          <ExampleBlock variant="yellow">
            <Cmd>
              <H>sudo</H> systemctl stop postgresql
            </Cmd>
            <Cmd>
              <H>sudo</H> rm -rf /var/lib/postgresql/15/main/*
            </Cmd>
            <Cmd>
              <H>sudo</H> -u postgres pg_basebackup -h master_ip \
            </Cmd>
            <Cmd>{'  '}-U replicator -D /var/lib/postgresql/15/main \</Cmd>
            <Cmd>{'  '}-P -v --wal-method=stream</Cmd>
            <Cmd>
              <H>sudo</H> -u postgres touch
              /var/lib/postgresql/15/main/standby.signal
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">5. Sprawdzenie</SectionLabel>
          <ExampleBlock variant="default">
            <Comment># Na master</Comment>
            <Cmd>SELECT * FROM pg_stat_replication;</Cmd>
            <Cmd> </Cmd>
            <Comment># Na slave</Comment>
            <Cmd>
              SELECT pg_is_in_recovery();{'  '}
              <Comment># t = true</Comment>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Klastry === */}
        <Card title="Rodzaje klastrow" color="var(--c-orange)">
          <Row code="Active-Passive">
            <b>1 wezel aktywny</b>, reszta czeka. Failover automatyczny.
          </Row>
          <Row code="Active-Active">
            <b>Wszystkie aktywne</b>. Load balancing zapisow (konflikty!).
          </Row>
          <Row code="Sharding">
            <b>Dane podzielone</b> wedlug klucza na shardy (skala horyzontalna).
          </Row>
          <Divider />
          <SectionLabel>Narzedzia</SectionLabel>
          <Row code="Patroni">PG — auto-failover, najpopularniejszy</Row>
          <Row code="repmgr">PG — replication manager</Row>
          <Row code="Pacemaker">uniwersalny CRM dla Linux</Row>
          <Row code="Galera Cluster">MySQL/MariaDB multi-master</Row>
          <Row code="MySQL InnoDB Cluster">native MySQL HA</Row>
        </Card>

        {/* === Patroni === */}
        <Card title="Patroni — auto-failover PG" color="var(--c-blue)" full>
          <Concept title="Co robi Patroni?" color="var(--c-blue)">
            Demon Pythonowy zarzadzajacy PostgreSQL — automatycznie promuje
            standby na primary jesli primary padnie. Korzysta z DCS
            (etcd/Consul/ZK) jako "single source of truth".
          </Concept>
          <Divider />
          <SectionLabel>Architektura</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd> [ Aplikacja ]</Cmd>
            <Cmd> |</Cmd>
            <Cmd> ▼</Cmd>
            <Cmd> [ HAProxy / pgbouncer ]</Cmd>
            <Cmd> | | |</Cmd>
            <Cmd> ▼ ▼ ▼</Cmd>
            <Cmd> [Patroni1][Patroni2][Patroni3]</Cmd>
            <Cmd> | | |</Cmd>
            <Cmd> ▼ ▼ ▼</Cmd>
            <Cmd> [ PG-A ][ PG-B ][ PG-C ]</Cmd>
            <Cmd> primary standby standby</Cmd>
            <Cmd> \\ | /</Cmd>
            <Cmd> ▼ ▼ ▼</Cmd>
            <Cmd> [ etcd / Consul cluster ]</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Zalety</SectionLabel>
          <Row code="Auto failover">5-30s recovery</Row>
          <Row code="REST API">latwa integracja, monitoring</Row>
          <Row code="Tags">ustawianie priorytetu wezlow</Row>
          <Row code="Synchronous mode">opcjonalna replikacja sync</Row>
          <InfoBox>
            <b>DCS (Distributed Configuration Store):</b> etcd, Consul,
            ZooKeeper. Patroni przechowuje tam stan klastra (kto jest primary,
            leader lock).
          </InfoBox>
        </Card>

        {/* === PgBouncer === */}
        <Card
          title="PgBouncer — connection pooling"
          color="var(--c-green)"
          full
        >
          <Concept title="Po co?" color="var(--c-green)">
            PostgreSQL <b>fork-uje proces</b> dla kazdego polaczenia. 500
            polaczen = 500 procesow = duzo RAM. PgBouncer multiplexuje N
            klientow na M polaczen do PG.
          </Concept>
          <Divider />
          <SectionLabel>Instalacja i konfiguracja</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              <H>sudo</H> apt install -y pgbouncer
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">
            /etc/pgbouncer/pgbouncer.ini
          </SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>[databases]</Cmd>
            <Cmd>
              mydb = host=<V>127.0.0.1</V> port=<V>5432</V> dbname=mydb
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>[pgbouncer]</Cmd>
            <Cmd>
              listen_addr = <V>0.0.0.0</V>
            </Cmd>
            <Cmd>
              listen_port = <V>6432</V>
            </Cmd>
            <Cmd>auth_type = md5</Cmd>
            <Cmd>auth_file = /etc/pgbouncer/userlist.txt</Cmd>
            <Cmd>pool_mode = transaction</Cmd>
            <Cmd>
              max_client_conn = <V>1000</V>
            </Cmd>
            <Cmd>
              default_pool_size = <V>20</V>
            </Cmd>
            <Cmd>
              min_pool_size = <V>10</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Tryby pulowania</SectionLabel>
          <Row code="session">polaczenie po LOGIN do LOGOUT (jak PG)</Row>
          <Row code="transaction">zwalnianie po COMMIT/ROLLBACK (zalecane)</Row>
          <Row code="statement">
            zwalnianie po kazdym query (najagresywniejsze)
          </Row>
          <InfoBox>
            <b>transaction</b> mode dziala dla 99% aplikacji.
            <b> statement</b> wymaga aplikacji bez session state.
          </InfoBox>
        </Card>

        {/* === Sharding === */}
        <Card
          title="Sharding — skalowanie horyzontalne"
          color="var(--c-purple)"
        >
          <Concept title="Co to jest?" color="var(--c-purple)">
            Podzial danych miedzy wiele baz wedlug klucza (np. user_id % 4).
            Kazdy shard to osobna baza.
          </Concept>
          <Divider />
          <SectionLabel>Strategie</SectionLabel>
          <Row code="Hash">user_id % N — rownomierne</Row>
          <Row code="Range">A-M shard 1, N-Z shard 2</Row>
          <Row code="Geo">EU shard 1, US shard 2</Row>
          <Row code="Tenant">jeden klient = jeden shard</Row>
          <Divider />
          <SectionLabel>Wady</SectionLabel>
          <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
            <li>JOINy miedzy shardami sa drogie</li>
            <li>Re-shardowanie to powazna operacja</li>
            <li>Trudniejsze ACID transakcje</li>
            <li>Kazdy shard ma osobny backup/replikacje</li>
          </ul>
        </Card>

        {/* === Studium Miro === */}
        <Card title="Studium przypadku: Miro" color="var(--c-yellow)" full>
          <Concept title="Ewolucja architektury" color="var(--c-yellow)">
            Platforma kolaboracyjna ~20k QPS, 80-100k zapisow do Redis na
            minute. Pokazujemy etapy ewolucji do HA.
          </Concept>
          <Divider />
          <SectionLabel>Etapy</SectionLabel>
          <Row code="1">Monolit Java + 1 PG — limit polaczen</Row>
          <Row code="2">Dodanie PgBouncer (transaction pooling)</Row>
          <Row code="3">Sharding na poziomie aplikacji</Row>
          <Row code="4">Awaria pojedynczego PgBouncer = 25 min downtime</Row>
          <Row code="5">Multi-PgBouncer + Network Load Balancer</Row>
          <Row code="6">Patroni cluster z Consul + Consul-template</Row>
          <Divider />
          <SectionLabel>Finalna architektura</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd> [ App Servers ]</Cmd>
            <Cmd> ▼</Cmd>
            <Cmd>
              {' '}
              [ AWS NLB ]{'   '}
              <Comment># load balancer</Comment>
            </Cmd>
            <Cmd> ▼</Cmd>
            <Cmd>
              {' '}
              [PgBouncer 1] [PgBouncer 2]{'   '}
              <Comment># HA</Comment>
            </Cmd>
            <Cmd> ▼</Cmd>
            <Cmd> [Patroni Primary] -&gt; [Standby1] -&gt; [Standby2]</Cmd>
            <Cmd> ▼</Cmd>
            <Cmd>
              {' '}
              [ Consul cluster ] <Comment># DCS + service discovery</Comment>
            </Cmd>
            <Cmd> ▲</Cmd>
            <Cmd>
              {' '}
              [ Consul-template ]{' '}
              <Comment># auto-update PgBouncer config</Comment>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Lekcja:</b> kazdy single point of failure (SPOF) musi byc
            wyeliminowany — DB, pooler, load balancer, DCS.
          </InfoBox>
        </Card>

        {/* === Bezpieczenstwo === */}
        <Card title="Bezpieczenstwo bazy" color="var(--c-orange)">
          <Row code="Auth">silne hasla, certyfikaty klienta</Row>
          <Row code="Authz">role i RLS (row-level security)</Row>
          <Row code="Encryption at rest">TDE / LUKS</Row>
          <Row code="Encryption in transit">TLS dla polaczen</Row>
          <Row code="Audit">logowanie, alerting, anomalie</Row>
          <Divider />
          <ExampleBlock variant="default">
            <Comment># PG — wymus SSL</Comment>
            <Cmd>
              ssl = on{'   '}
              <Comment># postgresql.conf</Comment>
            </Cmd>
            <Cmd>
              hostssl all all 0.0.0.0/0 md5{'  '}
              <Comment># pg_hba.conf</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># MySQL</Comment>
            <Cmd>require_secure_transport = ON</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Monitoring === */}
        <Card title="Monitoring" color="var(--c-green)">
          <SectionLabel>Co monitorowac?</SectionLabel>
          <Row code="Replikacja">lag w sekundach lub bajtach</Row>
          <Row code="Polaczenia">aktywne, idle, max</Row>
          <Row code="Slow queries">&gt; 1s</Row>
          <Row code="Disk I/O">iops, throughput, latency</Row>
          <Row code="WAL/binlog">rozmiar, archiwizacja</Row>
          <Row code="Backup">ostatni successful, czas</Row>
          <Divider />
          <SectionLabel>Narzedzia</SectionLabel>
          <Row code="Prometheus + Grafana">de facto standard</Row>
          <Row code="postgres_exporter">PG metrics for Prometheus</Row>
          <Row code="pgMonitor">Crunchy Data dashboard</Row>
          <Row code="Datadog / New Relic">SaaS APM</Row>
          <Row code="Zabbix / Nagios">klasyczne</Row>
        </Card>

        {/* === Slownik === */}
        <Card title="Slownik" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <SectionLabel>Failover</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Automatyczne przelaczenie z uszkodzonego serwera na rezerwowy.
              </p>
            </div>
            <div>
              <SectionLabel>Switchover</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Reczne, kontrolowane przelaczenie (np. do konserwacji).
              </p>
            </div>
            <div>
              <SectionLabel>Split-brain</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Sytuacja gdy dwa wezly mysla, ze sa primary — rozjazd danych.
              </p>
            </div>
            <div>
              <SectionLabel>Quorum</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Minimum wezlow do podjecia decyzji (n/2+1). Zapobiega
                split-brain.
              </p>
            </div>
            <div>
              <SectionLabel>WAL (Write-Ahead Log)</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Log PG zapisywany przed modyfikacja danych. Podstawa replikacji
                i recovery.
              </p>
            </div>
            <div>
              <SectionLabel>binlog</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Odpowiednik WAL w MySQL — log zmian uzywany do replikacji.
              </p>
            </div>
            <div>
              <SectionLabel>DCS</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Distributed Configuration Store — etcd, Consul, ZK. Backend
                Patroni.
              </p>
            </div>
            <div>
              <SectionLabel>SPOF</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Single Point of Failure — komponent, ktorego awaria klada caly
                system.
              </p>
            </div>
            <div>
              <SectionLabel>Connection pool</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Pula gotowych polaczen do bazy uzywanych naprzemiennie.
              </p>
            </div>
          </div>
        </Card>

        {/* === Kryteria === */}
        <Card title="Kryteria oceny" color="var(--c-accent)">
          <Row code="1">PG master + slave z dzialajaca replikacja</Row>
          <Row code="2">Test: dane z mastera widoczne na slave</Row>
          <Row code="3">PgBouncer wystawia port 6432 i dziala</Row>
          <Row code="4">Backup ze slave nie wplywa na master</Row>
          <Row code="5">Failover (manualny) — slave staje sie primary</Row>
        </Card>

        {/* === Dokumentacja === */}
        <Card title="Dokumentacja" color="var(--c-purple)">
          <ul className="text-[11px] text-[var(--c-muted)] space-y-1">
            <li>
              <a
                href="https://patroni.readthedocs.io/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Patroni Documentation
              </a>
            </li>
            <li>
              <a
                href="https://www.pgbouncer.org/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                PgBouncer
              </a>
            </li>
            <li>
              <a
                href="https://www.postgresql.org/docs/current/high-availability.html"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                PG — High Availability chapter
              </a>
            </li>
            <li>
              <a
                href="https://galeracluster.com/library/documentation/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Galera Cluster (MySQL/MariaDB)
              </a>
            </li>
            <li>
              <a
                href="https://pgbackrest.org/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                pgBackRest
              </a>
            </li>
          </ul>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/16', label: '16 — Bazy cz. 1' }}
        next={{ to: '/lessons/18', label: '18 — Ansible cz. 1' }}
      />
    </div>
  );
}
