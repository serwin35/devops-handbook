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

export default function Homework16() {
  usePageTitle('Homework 16');

  return (
    <div>
      <PageHeader
        title="Homework 16 — Bazy danych cz. 1"
        subtitle="MySQL · schemat · JOIN · GROUP BY · backup"
        color="var(--c-blue)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* === 1 === */}
        <Card title="1. Instalacja + hardening MySQL" color="var(--c-blue)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(76,217,100,0.15)] text-[var(--c-green)] font-bold">
              BASIC
            </span>
          </div>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>Zainstaluj MySQL server</li>
            <li>
              Uruchom <code className="text-xs">mysql_secure_installation</code>
            </li>
            <li>
              Utworz uzytkownika <code className="text-xs">app</code> z silnym
              haslem
            </li>
            <li>
              Utworz baze <code className="text-xs">sklep_internetowy</code>
            </li>
            <li>Nadaj uprawnienia tylko do tej bazy (bez GRANT OPTION)</li>
            <li>
              Sprawdz{' '}
              <code className="text-xs">SHOW GRANTS FOR 'app'@'localhost'</code>
            </li>
          </ol>

          <Spoiler title="Pokaz rozwiazanie">
            <ExampleBlock variant="default">
              <Cmd>
                <H>sudo</H> apt install -y mysql-server
              </Cmd>
              <Cmd>
                <H>sudo</H> mysql_secure_installation
              </Cmd>
              <Cmd>
                <H>sudo</H> mysql -e <V>"</V>
              </Cmd>
              <Cmd>{'  '}CREATE DATABASE sklep_internetowy;</Cmd>
              <Cmd>
                {'  '}CREATE USER 'app'@'localhost' IDENTIFIED BY
                'StrongPass!23';
              </Cmd>
              <Cmd>
                {'  '}GRANT ALL PRIVILEGES ON sklep_internetowy.* TO
                'app'@'localhost';
              </Cmd>
              <Cmd>
                {'  '}FLUSH PRIVILEGES;<V>"</V>
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === 2 === */}
        <Card title="2. Schemat + dane sklepu" color="var(--c-green)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(76,217,100,0.15)] text-[var(--c-green)] font-bold">
              BASIC
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Utworz schemat: <b>klienci</b>, <b>produkty</b>, <b>zamowienia</b>,{' '}
            <b>zamowienia_szczegoly</b> z relacjami FK. Wypelnij danymi
            testowymi (5+ klientow, 10+ produktow, 20+ zamowien).
          </p>

          <Spoiler title="Pokaz schemat">
            <ExampleBlock variant="green">
              <Cmd>CREATE TABLE klienci (</Cmd>
              <Cmd>{'  '}id INT AUTO_INCREMENT PRIMARY KEY,</Cmd>
              <Cmd>
                {'  '}imie VARCHAR(<V>50</V>) NOT NULL,
              </Cmd>
              <Cmd>
                {'  '}nazwisko VARCHAR(<V>50</V>) NOT NULL,
              </Cmd>
              <Cmd>
                {'  '}email VARCHAR(<V>100</V>) UNIQUE NOT NULL,
              </Cmd>
              <Cmd>{'  '}created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP</Cmd>
              <Cmd>);</Cmd>
              <Cmd> </Cmd>
              <Cmd>CREATE TABLE produkty (</Cmd>
              <Cmd>{'  '}id INT AUTO_INCREMENT PRIMARY KEY,</Cmd>
              <Cmd>
                {'  '}nazwa VARCHAR(<V>100</V>) NOT NULL,
              </Cmd>
              <Cmd>
                {'  '}cena DECIMAL(<V>10,2</V>) NOT NULL,
              </Cmd>
              <Cmd>
                {'  '}ilosc_na_stanie INT DEFAULT <V>0</V>,
              </Cmd>
              <Cmd>
                {'  '}kategoria VARCHAR(<V>50</V>)
              </Cmd>
              <Cmd>);</Cmd>
              <Cmd> </Cmd>
              <Cmd>CREATE TABLE zamowienia (</Cmd>
              <Cmd>{'  '}id INT AUTO_INCREMENT PRIMARY KEY,</Cmd>
              <Cmd>{'  '}klient_id INT,</Cmd>
              <Cmd>
                {'  '}suma DECIMAL(<V>10,2</V>),
              </Cmd>
              <Cmd>
                {'  '}status ENUM(<V>'nowe'</V>,<V>'wyslane'</V>,
                <V>'dostarczone'</V>),
              </Cmd>
              <Cmd>{'  '}data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,</Cmd>
              <Cmd>{'  '}FOREIGN KEY (klient_id) REFERENCES klienci(id)</Cmd>
              <Cmd>);</Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === 3 === */}
        <Card title="3. Zaawansowane zapytania" color="var(--c-yellow)" full>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>

          <SectionLabel>Napisz zapytania</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>Top 5 klientow wedlug sumy zamowien</li>
            <li>Produkty nigdy nie zamawiane (LEFT JOIN ... IS NULL)</li>
            <li>Klienci ze srednia zamowien powyzej globalnej sredniej</li>
            <li>Liczba zamowien per kategoria produktu</li>
            <li>Klienci z 3+ zamowieniami w ostatnim miesiacu</li>
            <li>
              Widok <code className="text-xs">podsumowanie_klientow</code>
            </li>
          </ol>

          <Spoiler title="Pokaz przyklady rozwiazan">
            <SectionLabel>Top 5 klientow</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>SELECT k.imie, k.nazwisko, SUM(z.suma) AS lacznie</Cmd>
              <Cmd>FROM klienci k</Cmd>
              <Cmd>JOIN zamowienia z ON k.id = z.klient_id</Cmd>
              <Cmd>GROUP BY k.id, k.imie, k.nazwisko</Cmd>
              <Cmd>ORDER BY lacznie DESC</Cmd>
              <Cmd>
                LIMIT <V>5</V>;
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Produkty bez zamowien</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>SELECT p.id, p.nazwa</Cmd>
              <Cmd>FROM produkty p</Cmd>
              <Cmd>
                LEFT JOIN zamowienia_szczegoly zs ON p.id = zs.produkt_id
              </Cmd>
              <Cmd>WHERE zs.id IS NULL;</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Klienci z ponadprzecietnymi zamowieniami
            </SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>SELECT k.imie, AVG(z.suma) AS srednia</Cmd>
              <Cmd>FROM klienci k JOIN zamowienia z ON k.id = z.klient_id</Cmd>
              <Cmd>GROUP BY k.id, k.imie</Cmd>
              <Cmd>
                HAVING AVG(z.suma) &gt; (SELECT AVG(suma) FROM zamowienia);
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === 4 === */}
        <Card title="4. Backup + restore" color="var(--c-purple)" full>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,159,76,0.15)] text-[var(--c-orange)] font-bold">
              BONUS
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Wykonaj backup, usun jedna tabele, przywroc z backupu. Zautomatyzuj
            backup codzienny przez cron.
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>
              <code className="text-xs">mysqldump</code> bazy do pliku
            </li>
            <li>
              <code className="text-xs">DROP TABLE</code> wybranej tabeli
            </li>
            <li>Sprawdz, ze brakuje</li>
            <li>Restore z pliku</li>
            <li>
              Skrypt bash <code className="text-xs">backup.sh</code> z timestamp
            </li>
            <li>Cron: codziennie 2:00 + retention 7 dni</li>
          </ol>

          <Spoiler title="Pokaz rozwiazanie">
            <ExampleBlock variant="purple">
              <Cmd>#!/bin/bash</Cmd>
              <Cmd>set -euo pipefail</Cmd>
              <Cmd>BACKUP_DIR=/var/backups/mysql</Cmd>
              <Cmd>TS=$(date +%F_%H%M%S)</Cmd>
              <Cmd>
                FILE=<V>"$BACKUP_DIR/sklep-$TS.sql.gz"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                mkdir -p <V>"$BACKUP_DIR"</V>
              </Cmd>
              <Cmd>
                mysqldump -u backup -p<V>"$PASS"</V> sklep_internetowy <V>|</V>{' '}
                gzip &gt; <V>"$FILE"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Retention — usun starsze niz 7 dni</Comment>
              <Cmd>
                find <V>"$BACKUP_DIR"</V> -name <V>"*.sql.gz"</V> -mtime +
                <V>7</V> -delete
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Cron: 0 2 * * * /usr/local/bin/backup.sh</Comment>
            </ExampleBlock>
          </Spoiler>
        </Card>
      </div>

      <InfoBox>
        <b>Kryteria oceny:</b> MySQL hardened, schemat 3+ tabel z FK, 5 zapytan
        SQL (w tym JOIN i GROUP BY), wykonany backup i test restore, skrypt
        backup + cron.
      </InfoBox>

      <LessonNav
        prev={{ to: '/lessons/16', label: '16 — Bazy danych cz. 1' }}
      />
    </div>
  );
}
