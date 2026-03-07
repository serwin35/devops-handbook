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

export default function CronJobs() {
  usePageTitle('Cron Jobs');

  return (
    <div>
      <PageHeader
        title="Cron Jobs"
        subtitle="crontab · systemd timers · at · anacron — zadania zaplanowane"
        color="var(--c-yellow)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* ── CARD 1 — Crontab syntax diagram ── */}
        <Card title="Crontab — skladnia" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Kazdy wpis w crontabie sklada sie z 5 pol czasowych i komendy.
          </p>
          <ExampleBlock variant="yellow">
            <Comment># minuta godzina dzien miesiac dzien-tyg komenda</Comment>
            <Cmd>
              <H>*</H>
              {'       '}
              <H>*</H>
              {'       '}
              <H>*</H>
              {'     '}
              <H>*</H>
              {'       '}
              <H>*</H>
              {'         '}/sciezka/do/skryptu.sh
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Pola czasowe</SectionLabel>
          <Row code="minuta" codeVariant="yellow">
            0–59 — minuta wykonania
          </Row>
          <Row code="godzina" codeVariant="yellow">
            0–23 — godzina wykonania
          </Row>
          <Row code="dzien-m" codeVariant="yellow">
            1–31 — dzien miesiaca
          </Row>
          <Row code="miesiac" codeVariant="yellow">
            1–12 (lub jan–dec)
          </Row>
          <Row code="dzien-t" codeVariant="yellow">
            0–7 (0 i 7 = niedziela, lub sun–sat)
          </Row>
          <Divider />
          <SectionLabel className="mt-1.5">Operatory</SectionLabel>
          <Row code="*">Kazda wartosc (wildcard)</Row>
          <Row code=",">
            {'"'}Lub{"'"} — lista wartosci (1,3,5)
          </Row>
          <Row code="-">Zakres wartosci (1-5)</Row>
          <Row code="/">
            {'"'}Co{"'"} — krok (*/5 = co 5 minut)
          </Row>
          <Divider />
          <ExampleBlock variant="yellow">
            <Comment># Przyklad: o 3:30 w kazdą srode</Comment>
            <Cmd>
              <V>30</V> <V>3</V> <H>*</H> <H>*</H> <V>3</V>{' '}
              <F>/usr/local/bin/raport.sh</F>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Pole{' '}
            <code className="text-xs text-[var(--c-yellow)]">
              dzien-tygodnia
            </code>{' '}
            i{' '}
            <code className="text-xs text-[var(--c-yellow)]">
              dzien-miesiaca
            </code>{' '}
            sa laczone operatorem OR — wystarczy ze jedno pasuje.
          </InfoBox>
        </Card>

        {/* ── CARD 2 — Crontab management ── */}
        <Card title="Crontab — zarzadzanie" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Edytuj crontab biezacego uzytkownika</Comment>
            <Cmd>
              crontab <H>-e</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Wyswietl crontab biezacego uzytkownika</Comment>
            <Cmd>
              crontab <H>-l</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Usun crontab biezacego uzytkownika</Comment>
            <Cmd>
              crontab <H>-r</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="orange">
            <Comment># Edytuj crontab innego uzytkownika (root)</Comment>
            <Cmd>
              crontab <H>-u</H> <V>www-data</V> <H>-e</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Wyswietl crontab innego uzytkownika</Comment>
            <Cmd>
              crontab <H>-u</H> <V>www-data</V> <H>-l</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Pliki cron systemowy</SectionLabel>
          <Row code="/etc/crontab" codeVariant="green">
            Systemowy crontab (ma dodatkowe pole user)
          </Row>
          <Row code="/etc/cron.d/" codeVariant="green">
            Katalog z dodatkowymi plikami crontab
          </Row>
          <Row code="/var/spool/cron/" codeVariant="green">
            Crontaby uzytkownikow
          </Row>
          <Divider />
          <ExampleBlock>
            <Comment>
              # Format /etc/crontab — dodatkowe pole uzytkownika
            </Comment>
            <Cmd>
              <H>*</H> <H>*</H> <H>*</H> <H>*</H> <H>*</H> <V>root</V>{' '}
              <F>/usr/local/bin/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Wybrany edytor dla{' '}
            <code className="text-xs text-[var(--c-green)]">crontab -e</code>{' '}
            mozna zmienic przez{' '}
            <code className="text-xs text-[var(--c-green)]">
              VISUAL=nano crontab -e
            </code>
            .
          </InfoBox>
        </Card>

        {/* ── CARD 3 — Cron examples ── */}
        <Card title="Przyklady crona" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># Co minute</Comment>
            <Cmd>
              <V>*</V> <V>*</V> <V>*</V> <V>*</V> <V>*</V> <F>/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Co godzine (na pelna godzine)</Comment>
            <Cmd>
              <H>0</H> <V>*</V> <V>*</V> <V>*</V> <V>*</V> <F>/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Codziennie o 3:00</Comment>
            <Cmd>
              <H>0</H> <H>3</H> <V>*</V> <V>*</V> <V>*</V> <F>/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Co poniedzialek o 8:00</Comment>
            <Cmd>
              <H>0</H> <H>8</H> <V>*</V> <V>*</V> <H>1</H> <F>/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Co 5 minut</Comment>
            <Cmd>
              <H>*/5</H> <V>*</V> <V>*</V> <V>*</V> <V>*</V> <F>/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Pierwszy dzien miesiaca o polnocy</Comment>
            <Cmd>
              <H>0</H> <H>0</H> <H>1</H> <V>*</V> <V>*</V> <F>/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Co 15 minut w godzinach 9-17 (dni robocze)</Comment>
            <Cmd>
              <H>*/15</H> <H>9-17</H> <V>*</V> <V>*</V> <H>1-5</H>{' '}
              <F>/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Dwa razy dziennie — o 6:00 i 18:00</Comment>
            <Cmd>
              <H>0</H> <H>6,18</H> <V>*</V> <V>*</V> <V>*</V> <F>/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Co roku — 1 stycznia o polnocy</Comment>
            <Cmd>
              <H>0</H> <H>0</H> <H>1</H> <H>1</H> <V>*</V> <F>/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* ── CARD 4 — Special strings ── */}
        <Card title="Specjalne ciagi" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Skrocone zapisy zamiast 5 pol — czytelniejsze i mniej podatne na
            bledy.
          </p>
          <ExampleBlock variant="orange">
            <Comment># Uruchom po kazdym restarcie systemu</Comment>
            <Cmd>
              <H>@reboot</H> <F>/usr/local/bin/startup.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Raz dziennie (rownowaznie: 0 0 * * *)</Comment>
            <Cmd>
              <H>@daily</H> <F>/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Co tydzien — niedziela o polnocy (0 0 * * 0)</Comment>
            <Cmd>
              <H>@weekly</H> <F>/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Co miesiac — pierwszy dzien (0 0 1 * *)</Comment>
            <Cmd>
              <H>@monthly</H> <F>/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Co godzine (0 * * * *)</Comment>
            <Cmd>
              <H>@hourly</H> <F>/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Co rok — 1 stycznia (0 0 1 1 *)</Comment>
            <Cmd>
              <H>@annually</H> <F>/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Podsumowanie</SectionLabel>
          <Row code="@reboot" codeVariant="orange">
            Po kazdym restarcie systemu
          </Row>
          <Row code="@hourly" codeVariant="orange">
            Co godzine — 0 * * * *
          </Row>
          <Row code="@daily / @midnight" codeVariant="orange">
            Codziennie — 0 0 * * *
          </Row>
          <Row code="@weekly" codeVariant="orange">
            Co tydzien — 0 0 * * 0
          </Row>
          <Row code="@monthly" codeVariant="orange">
            Co miesiac — 0 0 1 * *
          </Row>
          <Row code="@annually / @yearly" codeVariant="orange">
            Co rok — 0 0 1 1 *
          </Row>
          <InfoBox>
            <code className="text-xs text-[var(--c-orange)]">@midnight</code>{' '}
            jest aliasem dla{' '}
            <code className="text-xs text-[var(--c-orange)]">@daily</code> — oba
            sa rownoważne.
          </InfoBox>
        </Card>

        {/* ── CARD 5 — Systemd Timers ── */}
        <Card title="Systemd Timers" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Nowoczesna alternatywa dla cron — integracja z journald, zależnosci,
            catch-up po wylaczeniu.
          </p>
          <SectionLabel>Plik timera (.timer)</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># /etc/systemd/system/backup.timer</Comment>
            <Cmd>
              <H>[Unit]</H>
            </Cmd>
            <Cmd>
              Description=<V>Codzienny backup bazy danych</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>[Timer]</H>
            </Cmd>
            <Cmd>
              OnCalendar=<V>*-*-* 02:00:00</V>
            </Cmd>
            <Cmd>
              OnBootSec=<V>10min</V>
            </Cmd>
            <Cmd>
              Persistent=<V>true</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              <H>[Install]</H>
            </Cmd>
            <Cmd>
              WantedBy=<V>timers.target</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">OnCalendar — przyklady</SectionLabel>
          <Row code="daily">Codziennie o polnocy</Row>
          <Row code="weekly">Co tydzien (poniedzialek 00:00)</Row>
          <Row code="monthly">Co miesiac (1. dzien 00:00)</Row>
          <Row code="*-*-* 03:30:00">Codziennie o 3:30</Row>
          <Row code="Mon *-*-* 09:00:00">Poniedzialki o 9:00</Row>
          <Row code="*:0/15">Co 15 minut</Row>
          <Divider />
          <SectionLabel className="mt-1.5">Zarzadzanie timerami</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Lista wszystkich aktywnych timerow</Comment>
            <Cmd>
              systemctl <H>list-timers</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># Aktywuj i uruchom timer</Comment>
            <Cmd>
              systemctl <H>enable --now</H> <V>backup.timer</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># Przetestuj wyrazenie OnCalendar</Comment>
            <Cmd>
              systemd-analyze <H>calendar</H> <V>"Mon *-*-* 09:00:00"</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-xs text-[var(--c-green)]">
              Persistent=true
            </code>{' '}
            — jesli system byl wylaczony w momencie planowanego uruchomienia,
            zadanie wykona sie przy nastepnym starcie.
          </InfoBox>
        </Card>

        {/* ── CARD 6 — at command ── */}
        <Card title="at — jednorazowe zadania" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-xs mb-2.5">
            Komenda <code className="text-xs">at</code> uruchamia zadanie
            jednorazowo o podanej godzinie.
          </p>
          <ExampleBlock variant="purple">
            <Comment># Uruchom skrypt za 5 minut</Comment>
            <Cmd>
              at <H>now + 5 minutes</H>
            </Cmd>
            <Cmd>
              <span className="text-[var(--c-muted)]">at&gt; </span>
              <F>/usr/local/bin/skrypt.sh</F>
            </Cmd>
            <Cmd>
              <span className="text-[var(--c-muted)]">at&gt; </span>
              <H>Ctrl+D</H>{' '}
              <span className="text-[var(--c-muted)]"># zatwierdz</span>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Uruchom o konkretnej godzinie</Comment>
            <Cmd>
              at <H>14:30</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Uruchom jutro o 9:00</Comment>
            <Cmd>
              at <H>9:00 tomorrow</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># Podaj komende inline przez echo</Comment>
            <Cmd>
              echo <V>"/skrypt.sh"</V> | at <H>now + 1 hour</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Zarzadzanie kolejka at</SectionLabel>
          <ExampleBlock variant="orange">
            <Comment># Wyswietl kolejke zadan at</Comment>
            <Cmd>
              <H>atq</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># Usun zadanie o numerze 3</Comment>
            <Cmd>
              atrm <V>3</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment>
              # batch — uruchom gdy obciazenie CPU spadnie ponizej 1.5
            </Comment>
            <Cmd>
              <H>batch</H>
            </Cmd>
            <Cmd>
              <span className="text-[var(--c-muted)]">at&gt; </span>
              <F>/skrypt.sh</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel className="mt-1.5">Jednostki czasu</SectionLabel>
          <Row code="now + N minutes">Za N minut</Row>
          <Row code="now + N hours">Za N godzin</Row>
          <Row code="now + N days">Za N dni</Row>
          <Row code="now + N weeks">Za N tygodni</Row>
          <InfoBox>
            Usluga <code className="text-xs text-[var(--c-purple)]">atd</code>{' '}
            musi byc uruchomiona:{' '}
            <code className="text-xs text-[var(--c-purple)]">
              systemctl enable --now atd
            </code>
          </InfoBox>
        </Card>

        {/* ── CARD 7 — Best practices (full width) ── */}
        <Card
          title="Wzorce i dobre praktyki"
          color="var(--c-yellow)"
          className="md:col-span-2 xl:col-span-3"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <SectionLabel>Logowanie outputu</SectionLabel>
              <ExampleBlock variant="yellow">
                <Comment># Przekieruj stdout i stderr do pliku logu</Comment>
                <Cmd>
                  <H>0 3 * * *</H> root <F>/skrypt.sh</F> <H>{'>>'}</H>{' '}
                  <F>/var/log/skrypt.log</F> <H>2&gt;&1</H>
                </Cmd>
              </ExampleBlock>
              <ExampleBlock>
                <Comment># Wycisz output — nie wysylaj maili</Comment>
                <Cmd>
                  <H>0 3 * * *</H> <F>/skrypt.sh</F>{' '}
                  <H>&gt; /dev/null 2&gt;&1</H>
                </Cmd>
              </ExampleBlock>
              <ExampleBlock>
                <Comment># Loguj z data i godzina</Comment>
                <Cmd>
                  <H>0 3 * * *</H> <F>/skrypt.sh</F> <H>{'>>'}</H>{' '}
                  <F>/var/log/skrypt.log</F> <H>2&gt;&1</H>
                </Cmd>
              </ExampleBlock>
              <InfoBox>
                Domyslnie cron wysyla output mailem do uzytkownika. Zawsze
                przekierowuj output do pliku lub{' '}
                <code className="text-xs text-[var(--c-yellow)]">
                  /dev/null
                </code>
                .
              </InfoBox>
            </div>

            <div>
              <SectionLabel>MAILTO i PATH w crontabie</SectionLabel>
              <ExampleBlock variant="orange">
                <Comment># Ustaw adres email dla powiadomien</Comment>
                <Cmd>
                  <H>MAILTO</H>=<V>admin@example.com</V>
                </Cmd>
                <Cmd>
                  <Comment># Wylacz powiadomienia email</Comment>
                </Cmd>
                <Cmd>
                  <H>MAILTO</H>=<V>""</V>
                </Cmd>
              </ExampleBlock>
              <ExampleBlock variant="orange">
                <Comment># Ustaw PATH — cron ma ograniczony PATH!</Comment>
                <Cmd>
                  <H>PATH</H>=
                  <V>
                    /usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
                  </V>
                </Cmd>
              </ExampleBlock>
              <ExampleBlock>
                <Comment># Lub uzywaj pelnych sciezek w skryptach</Comment>
                <Cmd>
                  <H>0 3 * * *</H> <F>/usr/bin/python3</F>{' '}
                  <F>/opt/app/skrypt.py</F>
                </Cmd>
              </ExampleBlock>
              <InfoBox warn>
                Cron uruchamia zadania z minimalnym srodowiskiem. Zawsze testuj
                skrypty ze sciezkami bezwzglednymi.
              </InfoBox>
            </div>

            <div>
              <SectionLabel>Lock files — zapobieganie duplikatom</SectionLabel>
              <ExampleBlock variant="purple">
                <Comment>
                  # Uzyj flock aby zapobiec rownoczesnemu uruchomieniu
                </Comment>
                <Cmd>
                  <H>* * * * *</H> <F>/usr/bin/flock</F> <H>-n</H>{' '}
                  <F>/tmp/skrypt.lock</F> <F>/skrypt.sh</F>
                </Cmd>
              </ExampleBlock>
              <ExampleBlock variant="purple">
                <Comment># Wbudowany lock w samym skrypcie bash</Comment>
                <Cmd>
                  LOCKFILE=<F>/tmp/skrypt.lock</F>
                </Cmd>
                <Cmd>
                  [ <H>-f</H> <V>$LOCKFILE</V> ] && exit 0
                </Cmd>
                <Cmd>
                  <H>trap</H> <V>"rm -f $LOCKFILE"</V> EXIT
                </Cmd>
                <Cmd>
                  <H>touch</H> <V>$LOCKFILE</V>
                </Cmd>
              </ExampleBlock>
              <Divider />
              <SectionLabel className="mt-1.5">
                /etc/cron.d/ vs crontab
              </SectionLabel>
              <Row code="/etc/cron.d/" codeVariant="purple">
                Pliki pakietow — format jak /etc/crontab (z polem user)
              </Row>
              <Row code="crontab -e" codeVariant="purple">
                Crontab uzytkownika — bez pola user
              </Row>
              <Row code="/etc/cron.daily/" codeVariant="purple">
                Skrypty uruchamiane przez run-parts codziennie
              </Row>
              <Row code="/etc/cron.weekly/" codeVariant="purple">
                Skrypty uruchamiane co tydzien
              </Row>
              <InfoBox>
                Preferuj{' '}
                <code className="text-xs text-[var(--c-purple)]">
                  /etc/cron.d/
                </code>{' '}
                dla zadan systemowych — latwiej zarzadzac przez pakiety i
                kontrole wersji.
              </InfoBox>
            </div>
          </div>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/cheatsheets/systemd', label: 'Systemd' }}
        next={{ to: '/cheatsheets/networking', label: 'Networking' }}
      />
    </div>
  );
}
