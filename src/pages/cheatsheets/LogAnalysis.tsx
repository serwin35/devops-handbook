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

export default function LogAnalysis() {
  usePageTitle('Analiza logów');

  return (
    <div>
      <PageHeader
        title="Analiza logów"
        subtitle="syslog · journalctl · grep · tail · logwatch · GoAccess"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* ── Lokalizacje logów ── */}
        <Card title="Lokalizacje logów systemowych" color="var(--c-green)">
          <SectionLabel>Debian/Ubuntu</SectionLabel>
          <Row code="/var/log/syslog" codeVariant="green">
            Log systemowy
          </Row>
          <Row code="/var/log/auth.log" codeVariant="green">
            Logi autoryzacji
          </Row>
          <Row code="/var/log/kern.log" codeVariant="green">
            Log jądra
          </Row>
          <Row code="/var/log/boot.log" codeVariant="green">
            Logi rozruchu
          </Row>
          <Row code="/var/log/cron.log" codeVariant="green">
            Logi CRON
          </Row>
          <Divider />
          <SectionLabel>RedHat/CentOS</SectionLabel>
          <Row code="/var/log/messages" codeVariant="green">
            Log systemowy
          </Row>
          <Row code="/var/log/secure" codeVariant="green">
            Logi autoryzacji
          </Row>
          <Row code="/var/log/dmesg" codeVariant="green">
            Log jądra
          </Row>
          <Row code="/var/log/cron" codeVariant="green">
            Logi CRON
          </Row>
        </Card>

        {/* ── Logi aplikacji ── */}
        <Card title="Logi aplikacji i usług" color="var(--c-green)">
          <SectionLabel>Apache</SectionLabel>
          <Row code="access.log" codeVariant="green">
            /var/log/apache2/ (Debian) lub /var/log/httpd/ (RHEL)
          </Row>
          <Row code="error.log" codeVariant="green">
            Logi błędów serwera
          </Row>
          <Divider />
          <SectionLabel>Nginx</SectionLabel>
          <Row code="access.log" codeVariant="green">
            /var/log/nginx/access.log
          </Row>
          <Row code="error.log" codeVariant="green">
            /var/log/nginx/error.log
          </Row>
          <Divider />
          <SectionLabel>Bazy danych</SectionLabel>
          <Row code="MySQL" codeVariant="green">
            /var/log/mysql/error.log
          </Row>
          <Row code="PostgreSQL" codeVariant="green">
            /var/log/postgresql/postgresql-*-main.log
          </Row>
          <Divider />
          <SectionLabel>Konfiguracja rsyslog</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              <F>/etc/rsyslog.conf</F>
            </Cmd>
            <Cmd>
              <F>/etc/rsyslog.d/</F>
            </Cmd>
            <Cmd>
              systemctl status <V>rsyslog</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* ── Podstawowe polecenia ── */}
        <Card title="Podstawowe polecenia" color="var(--c-green)">
          <ExampleBlock variant="default">
            <Comment># Śledzenie logu na żywo</Comment>
            <Cmd>
              tail <H>-f</H> <F>/var/log/syslog</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="default">
            <Comment># Ostatnie N linii</Comment>
            <Cmd>
              tail <H>-n</H> <V>50</V> <F>/var/log/syslog</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="default">
            <Comment># Szukanie błędów</Comment>
            <Cmd>
              grep <V>"ERROR"</V> <F>/var/log/apache2/error.log</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="default">
            <Comment># Szukanie bez uwzględniania wielkości liter</Comment>
            <Cmd>
              grep <H>-i</H> <V>error</V> <F>/var/log/syslog</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="default">
            <Comment># Logi z zakresu czasowego</Comment>
            <Cmd>
              grep <V>"Mar 30 1[4-5]:"</V> <F>/var/log/syslog</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* ── journalctl ── */}
        <Card title="journalctl (systemd)" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Logi usługi od dzisiaj</Comment>
            <Cmd>
              journalctl <H>-u</H> <V>apache2</V> <H>--since</H> <V>today</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="green">
            <Comment># Tylko błędy i wyżej</Comment>
            <Cmd>
              journalctl <H>-p</H> <V>err</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="green">
            <Comment># Śledzenie na żywo</Comment>
            <Cmd>
              journalctl <H>-f</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="green">
            <Comment># Logi jądra</Comment>
            <Cmd>
              journalctl <H>-k</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Priorytety (-p)</SectionLabel>
          <Row code="emerg" codeVariant="green">
            0 — system bezużyteczny
          </Row>
          <Row code="alert" codeVariant="green">
            1 — natychmiastowa interwencja
          </Row>
          <Row code="crit" codeVariant="green">
            2 — stan krytyczny
          </Row>
          <Row code="err" codeVariant="green">
            3 — błędy
          </Row>
          <Row code="warning" codeVariant="green">
            4 — ostrzeżenia
          </Row>
          <Row code="info" codeVariant="green">
            6 — informacyjne
          </Row>
          <Row code="debug" codeVariant="green">
            7 — debugowanie
          </Row>
        </Card>

        {/* ── Zaawansowana analiza ── */}
        <Card title="Zaawansowana analiza" color="var(--c-green)">
          <ExampleBlock variant="default">
            <Comment># Nieudane logowania — zliczanie wg użytkownika</Comment>
            <Cmd>
              grep <V>"Failed password"</V> <F>/var/log/auth.log</F> \
            </Cmd>
            <Cmd>
              {'  '}| awk{' '}
              <V>
                '{'{'}print $9{'}'}'
              </V>{' '}
              | sort | uniq <H>-c</H> | sort <H>-nr</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="default">
            <Comment># Top IP z nieudanymi logowaniami</Comment>
            <Cmd>
              grep <V>"Failed password"</V> <F>/var/log/auth.log</F> \
            </Cmd>
            <Cmd>
              {'  '}| grep <H>-oE</H> <V>"from [0-9.]+"</V> \
            </Cmd>
            <Cmd>
              {'  '}| cut <H>-d</H>
              <V>' '</V> <H>-f2</H> | sort | uniq <H>-c</H> | sort <H>-nr</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="default">
            <Comment># Kody HTTP w logach Apache</Comment>
            <Cmd>
              awk{' '}
              <V>
                '{'{'}print $9{'}'}'
              </V>{' '}
              <F>/var/log/apache2/access.log</F> \
            </Cmd>
            <Cmd>
              {'  '}| sort | uniq <H>-c</H> | sort <H>-nr</H>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* ── Narzędzia ── */}
        <Card title="Narzędzia do analizy logów" color="var(--c-green)">
          <SectionLabel>logwatch — raporty z logów</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              sudo apt install <V>logwatch</V>
            </Cmd>
            <Cmd>
              sudo logwatch <H>--output</H> <V>html</V> \
            </Cmd>
            <Cmd>
              {'  '}
              <H>--mailto</H> <V>user@example.com</V> \
            </Cmd>
            <Cmd>
              {'  '}
              <H>--detail</H> <V>high</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>GoAccess — analizator logów HTTP</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              sudo apt install <V>goaccess</V>
            </Cmd>
            <Cmd>
              goaccess <F>/var/log/apache2/access.log</F> <H>-c</H>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <InfoBox>
            GoAccess daje interaktywny interfejs terminalowy do analizy logów
            HTTP — statystyki odwiedzin, kody odpowiedzi, popularne URL-e,
            geolokalizacja i więcej.
          </InfoBox>
        </Card>
      </div>

      <LessonNav prev={{ to: '/cheatsheets', label: 'Cheatsheets' }} />
    </div>
  );
}
