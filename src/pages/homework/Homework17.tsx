import { useState } from 'react';
import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import ExampleBlock, {
  Cmd,
  Comment,
  H,
  V,
} from '../../components/ExampleBlock';
import InfoBox from '../../components/InfoBox';
import SectionLabel from '../../components/SectionLabel';
import LessonNav from '../../components/LessonNav';

function Spoiler({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="text-[11px] px-3 py-1.5 rounded border border-[var(--c-border)] bg-[var(--c-surface2)] text-[var(--c-accent)] hover:border-[var(--c-accent)] transition-colors"
      >
        {open ? '▼' : '▶'} {title}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

export default function Homework17() {
  usePageTitle('Homework 17');

  return (
    <div>
      <PageHeader
        title="Homework 17 — Bazy danych cz. 2 (HA)"
        subtitle="replikacja PG · PgBouncer · failover · backup ze slave"
        color="var(--c-purple)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* === 1 === */}
        <Card title="1. Replikacja PG master-slave" color="var(--c-purple)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Postaw 2 VM-ki (master + slave). Skonfiguruj streaming replication.
            Sprawdz ze dane z mastera natychmiast pojawiaja sie na slave.
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>VM1: zainstaluj PG, edytuj postgresql.conf + pg_hba.conf</li>
            <li>CREATE ROLE replicator</li>
            <li>VM2: zainstaluj PG, stop, wyczysc data dir</li>
            <li>pg_basebackup z mastera</li>
            <li>touch standby.signal</li>
            <li>primary_conninfo do mastera</li>
            <li>Start slave</li>
            <li>Test: CREATE TABLE na master → SELECT na slave</li>
            <li>
              Sprawdz <code className="text-xs">pg_stat_replication</code>
            </li>
          </ol>

          <Spoiler title="Pokaz konfiguracje">
            <SectionLabel>Master: postgresql.conf</SectionLabel>
            <ExampleBlock variant="purple">
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

            <SectionLabel className="mt-2">Master: pg_hba.conf</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>host replication replicator 10.0.0.0/24 md5</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Slave bootstrap</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                <H>sudo</H> systemctl stop postgresql
              </Cmd>
              <Cmd>
                <H>sudo</H> -u postgres rm -rf /var/lib/postgresql/15/main/*
              </Cmd>
              <Cmd>
                <H>sudo</H> -u postgres pg_basebackup -h MASTER_IP \
              </Cmd>
              <Cmd>
                {'  '}-U replicator -D /var/lib/postgresql/15/main -P -v
                --wal-method=stream
              </Cmd>
              <Cmd>
                <H>sudo</H> -u postgres touch
                /var/lib/postgresql/15/main/standby.signal
              </Cmd>
              <Cmd>
                <H>sudo</H> systemctl start postgresql
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Weryfikacja</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                SELECT * FROM pg_stat_replication;{'  '}
                <Comment># na master</Comment>
              </Cmd>
              <Cmd>
                SELECT pg_is_in_recovery();{'         '}
                <Comment># t na slave</Comment>
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === 2 === */}
        <Card title="2. PgBouncer + benchmark" color="var(--c-green)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Zainstaluj PgBouncer na master. Skonfiguruj transaction pooling.
            Zmierz roznice w wydajnosci przy 200 polaczeniach bezposrednio vs
            przez pooler (pgbench).
          </p>

          <Spoiler title="Pokaz konfiguracje + test">
            <SectionLabel>/etc/pgbouncer/pgbouncer.ini</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>[databases]</Cmd>
              <Cmd>
                app = host=<V>127.0.0.1</V> port=<V>5432</V> dbname=app
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
            </ExampleBlock>

            <SectionLabel className="mt-2">Benchmark (pgbench)</SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Bezposrednio (5432)</Comment>
              <Cmd>
                pgbench -h <V>127.0.0.1</V> -p <V>5432</V> -U app -c <V>200</V>{' '}
                -j <V>10</V> -T <V>60</V> app
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Przez pooler (6432)</Comment>
              <Cmd>
                pgbench -h <V>127.0.0.1</V> -p <V>6432</V> -U app -c <V>200</V>{' '}
                -j <V>10</V> -T <V>60</V> app
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Przy 200 polaczeniach pooler zwykle pokazuje 2-3x wyzszy TPS
              dzieki multiplexingowi.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* === 3 === */}
        <Card title="3. Manualny failover" color="var(--c-orange)" full>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,159,76,0.15)] text-[var(--c-orange)] font-bold">
              BONUS
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Symuluj awarie mastera (stop). Wykonaj promote na slave — stanie sie
            nowym primary. Zmierz RTO (czas potrzebny).
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>
              Na master:{' '}
              <code className="text-xs">sudo systemctl stop postgresql</code>
            </li>
            <li>
              Na slave:{' '}
              <code className="text-xs">
                sudo -u postgres pg_ctl promote -D /var/lib/postgresql/15/main
              </code>
            </li>
            <li>
              Sprawdz:{' '}
              <code className="text-xs">SELECT pg_is_in_recovery();</code> = f
            </li>
            <li>Test zapisu: CREATE TABLE works</li>
            <li>Skonfiguruj aplikacje aby pisala do nowego mastera</li>
            <li>Stary master jako nowy slave (re-init)</li>
          </ol>

          <Spoiler title="Wskazowki">
            <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-1">
              <li>
                Patroni robi to automatycznie w 10-30s — przetestuj rownolegle
              </li>
              <li>RTO &lt; 1min to dobry wynik dla manualnego failover</li>
              <li>
                Pamietaj o redirect ruchu z aplikacji (HAProxy / DNS /
                connection string)
              </li>
              <li>
                Po failover stary master nie moze "wrocic" jako primary —
                split-brain risk
              </li>
            </ul>
          </Spoiler>
        </Card>
      </div>

      <InfoBox>
        <b>Kryteria oceny:</b> 2 wezly PG z dzialajaca replikacja, dane widoczne
        na slave po 1-2s, PgBouncer routujacy ruch, udany manualny failover,
        dokumentacja architektury w MD.
      </InfoBox>

      <LessonNav prev={{ to: '/lessons/17', label: '17 — Bazy cz. 2 (HA)' }} />
    </div>
  );
}
