import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import ExampleBlock, {
  Cmd,
  Comment,
  H,
  V,
  F,
} from '../../components/ExampleBlock';
import Row from '../../components/Row';
import Divider from '../../components/Divider';
import InfoBox from '../../components/InfoBox';
import SectionLabel from '../../components/SectionLabel';
import LessonNav from '../../components/LessonNav';

export default function Rsync() {
  usePageTitle('rsync');

  return (
    <div>
      <PageHeader
        title="rsync"
        subtitle="synchronizacja · kopie zapasowe · transfer różnicowy · SSH"
        color="var(--c-yellow)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* ── Składnia ── */}
        <Card title="Podstawowa składnia" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Cmd>
              rsync [OPCJE] <V>ŹRÓDŁO</V> <V>CEL</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Najważniejsze opcje</SectionLabel>
          <Row code="-a" codeVariant="yellow">
            archive — zachowaj uprawnienia, czasy, linki
          </Row>
          <Row code="-v" codeVariant="yellow">
            verbose — szczegółowe informacje
          </Row>
          <Row code="-z" codeVariant="yellow">
            compress — kompresja podczas transferu
          </Row>
          <Row code="-r" codeVariant="yellow">
            recursive — rekursywnie katalogi
          </Row>
          <Row code="-P" codeVariant="yellow">
            progress + partial (wznawianie)
          </Row>
          <Row code="--delete" codeVariant="yellow">
            usuń w celu pliki nieistniejące w źródle
          </Row>
          <Row code="--dry-run" codeVariant="yellow">
            symulacja bez rzeczywistych zmian
          </Row>
          <Row code="--exclude" codeVariant="yellow">
            wyklucz pliki/katalogi z synchronizacji
          </Row>
          <Row code="--exclude-from" codeVariant="yellow">
            wyklucz wg listy z pliku
          </Row>
          <Row code="--no-owner" codeVariant="yellow">
            nie zachowuj właściciela
          </Row>
          <Row code="--no-group" codeVariant="yellow">
            nie zachowuj grupy
          </Row>
        </Card>

        {/* ── Lokalna synchronizacja ── */}
        <Card title="Synchronizacja lokalna" color="var(--c-yellow)">
          <ExampleBlock variant="default">
            <Comment># Podstawowa synchronizacja</Comment>
            <Cmd>
              rsync <H>-av</H> <F>~/source/</F> <F>~/backup/</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="default">
            <Comment># Z usunięciem zbędnych plików w celu</Comment>
            <Cmd>
              rsync <H>-av</H> <H>--delete</H> <F>~/source/</F> <F>~/backup/</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="default">
            <Comment># Symulacja (bez zmian)</Comment>
            <Cmd>
              rsync <H>-av</H> <H>--dry-run</H> <H>--delete</H> <F>~/source/</F>{' '}
              <F>~/backup/</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <InfoBox>
            Uwaga na trailing slash! <code className="text-xs">src/</code> →
            kopiuje zawartość. <code className="text-xs">src</code> (bez /) →
            kopiuje cały katalog z nazwą.
          </InfoBox>
        </Card>

        {/* ── Zdalna synchronizacja ── */}
        <Card title="Zdalna synchronizacja (SSH)" color="var(--c-yellow)">
          <ExampleBlock variant="green">
            <Comment># Kopiowanie NA serwer</Comment>
            <Cmd>
              rsync <H>-avz</H> <F>/var/www/site/</F> <V>user@server</V>:
              <F>/backup/</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="green">
            <Comment># Kopiowanie Z serwera</Comment>
            <Cmd>
              rsync <H>-avz</H> <V>user@server</V>:<F>/var/www/</F>{' '}
              <F>/local/backup/</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="green">
            <Comment># Z kompresją, postępem, bez właściciela</Comment>
            <Cmd>
              rsync <H>-zvarP</H> <H>--no-owner</H> <H>--no-group</H>{' '}
              <F>/var/www/</F> <V>user@server</V>:<F>/backup/</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* ── Wykluczenia ── */}
        <Card title="Wykluczenia i filtry" color="var(--c-yellow)">
          <ExampleBlock variant="default">
            <Comment># Wyklucz pliki .tmp i katalog cache/</Comment>
            <Cmd>
              rsync <H>-av</H> <H>--exclude=</H>
              <V>'*.tmp'</V> \
            </Cmd>
            <Cmd>
              {'  '}
              <H>--exclude=</H>
              <V>'cache/'</V> <F>src/</F> <F>dst/</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="default">
            <Comment># Wyklucz z pliku listy</Comment>
            <Cmd>
              echo <V>"*.log"</V> {'>'} <F>exclude.txt</F>
            </Cmd>
            <Cmd>
              echo <V>"node_modules/"</V> {'>>'} <F>exclude.txt</F>
            </Cmd>
            <Cmd>
              rsync <H>-av</H> <H>--exclude-from=</H>
              <F>exclude.txt</F> <F>src/</F> <F>dst/</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="default">
            <Comment># Uwzględnij tylko pliki .py</Comment>
            <Cmd>
              rsync <H>-av</H> <H>--include=</H>
              <V>'*.py'</V> <H>--exclude=</H>
              <V>'*'</V> <F>src/</F> <F>dst/</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* ── Skrypt backupu ── */}
        <Card title="Skrypt automatycznego backupu" color="var(--c-yellow)">
          <ExampleBlock variant="purple">
            <Cmd>
              <H>#!/bin/bash</H>
            </Cmd>
            <Comment># backup.sh</Comment>
            <Cmd>
              SOURCE=<F>~/source_dir/</F>
            </Cmd>
            <Cmd>
              BACKUP=<F>~/backup_dir/</F>
            </Cmd>
            <Cmd>
              LOG=<F>~/backup_$(date +%Y%m%d).log</F>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              echo <V>"Start: $(date)"</V> {'>>'} <V>$LOG</V>
            </Cmd>
            <Cmd>
              rsync <H>-avz</H> <H>--delete</H> \
            </Cmd>
            <Cmd>
              {'  '}
              <V>$SOURCE</V> <V>$BACKUP</V> {'>>'} <V>$LOG</V> <V>2&gt;&1</V>
            </Cmd>
            <Cmd>
              echo <V>"Done: $(date)"</V> {'>>'} <V>$LOG</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="green">
            <Comment># Uruchomienie</Comment>
            <Cmd>
              chmod <V>+x</V> <F>backup.sh</F>
            </Cmd>
            <Cmd>
              ./<F>backup.sh</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="green">
            <Comment># Cron — codziennie o północy</Comment>
            <Cmd>
              <V>0 0 * * *</V> <F>/home/user/backup.sh</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* ── Porady ── */}
        <Card title="Porady i triki" color="var(--c-yellow)">
          <SectionLabel>Cechy rsync</SectionLabel>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)] mb-3">
            <li>Przesyła tylko różnice (delta transfer)</li>
            <li>Synchronizacja przez SSH (bezpieczna)</li>
            <li>Wznawianie przerwanych transferów (-P)</li>
            <li>Praca lokalna i zdalna</li>
          </ul>
          <Divider />
          <SectionLabel>Częste pułapki</SectionLabel>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>
              Trailing slash (<code className="text-xs">/</code>) zmienia
              zachowanie
            </li>
            <li>
              <code className="text-xs">--delete</code> usuwa pliki w celu —
              zawsze najpierw <code className="text-xs">--dry-run</code>
            </li>
            <li>
              <code className="text-xs">-a</code> nie zachowuje hardlinków
              (dodaj <code className="text-xs">-H</code>)
            </li>
            <li>
              Duże transfery: użyj{' '}
              <code className="text-xs">--bwlimit=KBPS</code> do ograniczenia
              pasma
            </li>
          </ul>
        </Card>
      </div>

      <LessonNav prev={{ to: '/cheatsheets', label: 'Cheatsheets' }} />
    </div>
  );
}
