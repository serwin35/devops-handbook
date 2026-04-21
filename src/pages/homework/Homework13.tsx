import { useState } from 'react';
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
        {open ? '\u25BC' : '\u25B6'} {title}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

export default function Homework13() {
  usePageTitle('Homework 13');

  return (
    <div>
      <PageHeader
        title="Homework 13 — Serwery WWW"
        subtitle="virtual hosts · reverse proxy · logi · Nginx + Apache"
        color="var(--c-blue)"
      />

      <InfoBox>
        Materialy zrodlowe lekcji:{' '}
        <a
          href="/materials/lesson-13-www-servers_dqNbKWf.pdf"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--c-accent)] hover:underline"
        >
          lesson-13-www-servers.pdf
        </a>
      </InfoBox>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* === Zadanie 1: Virtual Hosts === */}
        <Card
          title="1. Nginx z dwoma virtual hostami"
          color="var(--c-blue)"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(62,190,255,0.15)] text-[var(--c-blue)] font-bold">
              BASIC
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Skonfiguruj Nginx tak, aby obslugiwal dwie rozne strony pod
            oddzielnymi domenami: <code className="text-xs">project1.local</code>{' '}
            i <code className="text-xs">project2.local</code>.
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>
              Utworz katalogi{' '}
              <code className="text-xs">/var/www/project1</code> i{' '}
              <code className="text-xs">/var/www/project2</code>
            </li>
            <li>
              W kazdym utworz <code className="text-xs">index.html</code>
            </li>
            <li>
              Napisz 2 pliki konfiguracyjne w{' '}
              <code className="text-xs">sites-available/</code>
            </li>
            <li>
              Aktywuj przez <code className="text-xs">ln -s</code> do{' '}
              <code className="text-xs">sites-enabled/</code>
            </li>
            <li>
              Dodaj wpisy do <code className="text-xs">/etc/hosts</code>
            </li>
            <li>
              Przetestuj{' '}
              <code className="text-xs">curl http://project1.local</code>
            </li>
            <li>
              Utworz <code className="text-xs">NGINX_VHOSTS.md</code> z
              dokumentacja
            </li>
          </ol>

          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Przygotowanie katalogow</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                <H>sudo</H> mkdir -p /var/www/project1 /var/www/project2
              </Cmd>
              <Cmd>
                <H>echo</H> <V>"&lt;h1&gt;Project 1&lt;/h1&gt;"</V> <V>|</V> <H>sudo</H> tee /var/www/project1/index.html
              </Cmd>
              <Cmd>
                <H>echo</H> <V>"&lt;h1&gt;Project 2&lt;/h1&gt;"</V> <V>|</V> <H>sudo</H> tee /var/www/project2/index.html
              </Cmd>
              <Cmd>
                <H>sudo</H> chown -R www-data:www-data /var/www/project1 /var/www/project2
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              /etc/nginx/sites-available/project1.conf
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>server {'{'}</Cmd>
              <Cmd>
                {'    '}listen <V>80</V>;
              </Cmd>
              <Cmd>
                {'    '}server_name project1.local;
              </Cmd>
              <Cmd>
                {'    '}root <V>/var/www/project1</V>;
              </Cmd>
              <Cmd>
                {'    '}index index.html;
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                {'    '}access_log /var/log/nginx/project1.access.log;
              </Cmd>
              <Cmd>
                {'    '}error_log /var/log/nginx/project1.error.log;
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                {'    '}location / {'{'}
              </Cmd>
              <Cmd>
                {'        '}try_files <V>$uri</V> <V>$uri/</V> =<V>404</V>;
              </Cmd>
              <Cmd>{'    '}{'}'}</Cmd>
              <Cmd>{'}'}</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              /etc/nginx/sites-available/project2.conf
            </SectionLabel>
            <ExampleBlock variant="purple">
              <Cmd>server {'{'}</Cmd>
              <Cmd>
                {'    '}listen <V>80</V>;
              </Cmd>
              <Cmd>
                {'    '}server_name project2.local;
              </Cmd>
              <Cmd>
                {'    '}root <V>/var/www/project2</V>;
              </Cmd>
              <Cmd>
                {'    '}index index.html;
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                {'    '}access_log /var/log/nginx/project2.access.log;
              </Cmd>
              <Cmd>
                {'    '}error_log /var/log/nginx/project2.error.log;
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                {'    '}location / {'{'}
              </Cmd>
              <Cmd>
                {'        '}try_files <V>$uri</V> <V>$uri/</V> =<V>404</V>;
              </Cmd>
              <Cmd>{'    '}{'}'}</Cmd>
              <Cmd>{'}'}</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Aktywacja i test</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                <H>sudo</H> ln -s /etc/nginx/sites-available/project1.conf /etc/nginx/sites-enabled/
              </Cmd>
              <Cmd>
                <H>sudo</H> ln -s /etc/nginx/sites-available/project2.conf /etc/nginx/sites-enabled/
              </Cmd>
              <Cmd>
                <H>sudo</H> nginx -t
              </Cmd>
              <Cmd>
                <H>sudo</H> systemctl reload nginx
              </Cmd>
              <Cmd> </Cmd>
              <Comment># /etc/hosts — mapowanie domen na localhost</Comment>
              <Cmd>
                <H>sudo</H> bash -c <V>'echo "127.0.0.1 project1.local" &gt;&gt; /etc/hosts'</V>
              </Cmd>
              <Cmd>
                <H>sudo</H> bash -c <V>'echo "127.0.0.1 project2.local" &gt;&gt; /etc/hosts'</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>curl http://project1.local</Cmd>
              <Cmd>curl http://project2.local</Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === Zadanie 2: Reverse Proxy === */}
        <Card
          title="2. Nginx jako reverse proxy dla Apache"
          color="var(--c-yellow)"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Skonfiguruj architekture <b>Nginx (port 80) → Apache (port 8080)</b>.
            Klient widzi tylko Nginx, Apache jest w tle.
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>Zainstaluj Apache</li>
            <li>
              Zmien Apache na port 8080 (<code className="text-xs">ports.conf</code>)
            </li>
            <li>Utworz konfiguracje Nginx proxy</li>
            <li>
              Dodaj naglowki <code className="text-xs">X-Real-IP</code>,{' '}
              <code className="text-xs">X-Forwarded-For</code>
            </li>
            <li>
              Dodaj health check endpoint <code className="text-xs">/health</code>
            </li>
            <li>Przetestuj i zmonitoruj logi</li>
            <li>
              Utworz <code className="text-xs">NGINX_REVERSE_PROXY.md</code>
            </li>
          </ol>

          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Apache na porcie 8080</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                <H>sudo</H> apt install -y apache2
              </Cmd>
              <Cmd>
                <H>sudo</H> nano /etc/apache2/ports.conf
              </Cmd>
              <Comment># Zmien: Listen 80 → Listen 8080</Comment>
              <Cmd>
                <H>sudo</H> nano /etc/apache2/sites-available/000-default.conf
              </Cmd>
              <Comment># Zmien: &lt;VirtualHost *:80&gt; → &lt;VirtualHost *:8080&gt;</Comment>
              <Cmd>
                <H>sudo</H> systemctl restart apache2
              </Cmd>
              <Cmd>
                <H>sudo</H> ss -tlnp <V>|</V> grep <V>8080</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              /etc/nginx/sites-available/apache_proxy.conf
            </SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>upstream apache_backend {'{'}</Cmd>
              <Cmd>
                {'    '}server <V>127.0.0.1:8080</V>;
              </Cmd>
              <Cmd>{'}'}</Cmd>
              <Cmd> </Cmd>
              <Cmd>server {'{'}</Cmd>
              <Cmd>
                {'    '}listen <V>80</V>;
              </Cmd>
              <Cmd>
                {'    '}server_name localhost;
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                {'    '}location / {'{'}
              </Cmd>
              <Cmd>
                {'        '}proxy_pass <V>http://apache_backend</V>;
              </Cmd>
              <Cmd>
                {'        '}proxy_set_header Host <V>$host</V>;
              </Cmd>
              <Cmd>
                {'        '}proxy_set_header X-Real-IP <V>$remote_addr</V>;
              </Cmd>
              <Cmd>
                {'        '}proxy_set_header X-Forwarded-For <V>$proxy_add_x_forwarded_for</V>;
              </Cmd>
              <Cmd>
                {'        '}proxy_set_header X-Forwarded-Proto <V>$scheme</V>;
              </Cmd>
              <Cmd>{'    '}{'}'}</Cmd>
              <Cmd> </Cmd>
              <Cmd>
                {'    '}location /health {'{'}
              </Cmd>
              <Cmd>
                {'        '}access_log off;
              </Cmd>
              <Cmd>
                {'        '}return <V>200</V> <V>"healthy\n"</V>;
              </Cmd>
              <Cmd>
                {'        '}add_header Content-Type text/plain;
              </Cmd>
              <Cmd>{'    '}{'}'}</Cmd>
              <Cmd> </Cmd>
              <Cmd>
                {'    '}access_log /var/log/nginx/app-proxy.access.log;
              </Cmd>
              <Cmd>
                {'    '}error_log /var/log/nginx/app-proxy.error.log;
              </Cmd>
              <Cmd>{'}'}</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Aktywacja i test</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                <H>sudo</H> ln -s /etc/nginx/sites-available/apache_proxy.conf /etc/nginx/sites-enabled/
              </Cmd>
              <Cmd>
                <H>sudo</H> rm /etc/nginx/sites-enabled/default
              </Cmd>
              <Cmd>
                <H>sudo</H> nginx -t
              </Cmd>
              <Cmd>
                <H>sudo</H> systemctl reload nginx
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>curl -v http://localhost</Cmd>
              <Cmd>curl http://localhost/health</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Monitoring</SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Terminal 1 — logi na biezaco</Comment>
              <Cmd>
                <H>sudo</H> tail -f /var/log/nginx/app-proxy.access.log
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Terminal 2 — generuj ruch</Comment>
              <Cmd>
                <H>for</H> i <H>in</H> {'{1..10}'}; <H>do</H> curl http://localhost; <H>done</H>
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === Zadanie 3: Analiza logow === */}
        <Card title="3. Analiza logow (bonus)" color="var(--c-green)" full>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(76,217,100,0.15)] text-[var(--c-green)] font-bold">
              BONUS
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Wygeneruj mieszany ruch na serwer i przeanalizuj logi —{' '}
            znajdz top IP, top zasoby, policz kody statusu.
          </p>

          <SectionLabel>Generacja ruchu</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>curl http://localhost/index.html</Cmd>
            <Cmd>curl http://localhost/nieistnieje.html</Cmd>
            <Cmd>curl -X POST http://localhost</Cmd>
            <Cmd>curl -H <V>"User-Agent: MyBot/1.0"</V> http://localhost</Cmd>
            <Cmd>
              <H>for</H> i <H>in</H> {'{1..20}'}; <H>do</H> curl http://localhost/health; <H>done</H>
            </Cmd>
          </ExampleBlock>

          <SectionLabel className="mt-2">Analiza</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># Top kody statusu</Comment>
            <Cmd>
              <H>sudo</H> awk <V>{"'{print $9}'"}</V> /var/log/nginx/access.log <V>|</V> sort <V>|</V> uniq -c <V>|</V> sort -rn
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Top IP</Comment>
            <Cmd>
              <H>sudo</H> awk <V>{"'{print $1}'"}</V> /var/log/nginx/access.log <V>|</V> sort <V>|</V> uniq -c <V>|</V> sort -rn <V>|</V> head
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Top zasoby</Comment>
            <Cmd>
              <H>sudo</H> awk <V>{"'{print $7}'"}</V> /var/log/nginx/access.log <V>|</V> sort <V>|</V> uniq -c <V>|</V> sort -rn <V>|</V> head
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Tylko bledy 4xx/5xx</Comment>
            <Cmd>
              <H>sudo</H> grep -E <V>' [45][0-9]{'{2}'} '</V> /var/log/nginx/access.log
            </Cmd>
          </ExampleBlock>
        </Card>
      </div>

      <InfoBox>
        <b>Kryteria oceny:</b> dwa dzialajace virtual hosts (<F>project1.local</F>
        , <F>project2.local</F>), Nginx jako reverse proxy dla Apache na
        porcie 8080, dzialajacy <code className="text-xs">/health</code>{' '}
        endpoint, dokumentacja MD z diagramem.
      </InfoBox>

      <LessonNav
        prev={{ to: '/lessons/13', label: '13 — Serwery WWW' }}
      />
    </div>
  );
}