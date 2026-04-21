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

export default function NginxApache() {
  usePageTitle('Nginx & Apache');

  return (
    <div>
      <PageHeader
        title="Nginx & Apache"
        subtitle="instalacja · konfiguracja · vhost · reverse proxy · logi · debugging"
        color="var(--c-blue)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Instalacja */}
        <Card title="Instalacja" color="var(--c-green)">
          <SectionLabel>Nginx (Ubuntu/Debian)</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              <H>sudo</H> apt update
            </Cmd>
            <Cmd>
              <H>sudo</H> apt install -y nginx
            </Cmd>
            <Cmd>
              <H>sudo</H> systemctl enable --now nginx
            </Cmd>
          </ExampleBlock>
          <SectionLabel>Apache (Ubuntu/Debian)</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>
              <H>sudo</H> apt install -y apache2
            </Cmd>
            <Cmd>
              <H>sudo</H> systemctl enable --now apache2
            </Cmd>
          </ExampleBlock>
          <SectionLabel>CentOS/RHEL</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              <H>sudo</H> dnf install nginx httpd
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* Zarzadzanie usluga */}
        <Card title="Zarzadzanie usluga" color="var(--c-purple)">
          <SectionLabel>systemctl</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>
              <H>sudo</H> systemctl start nginx
            </Cmd>
            <Cmd>
              <H>sudo</H> systemctl stop nginx
            </Cmd>
            <Cmd>
              <H>sudo</H> systemctl restart nginx
            </Cmd>
            <Cmd>
              <H>sudo</H> systemctl reload nginx
            </Cmd>
            <Cmd>
              <H>sudo</H> systemctl status nginx
            </Cmd>
            <Cmd>
              <H>sudo</H> systemctl enable nginx
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="reload">graceful — bez przerwy</Row>
          <Row code="restart">pelny restart (krotka przerwa)</Row>
          <Row code="enable">autostart przy boot</Row>
          <InfoBox>
            Zamien <code className="text-xs">nginx</code> na{' '}
            <code className="text-xs">apache2</code> dla Apache (na Ubuntu) lub{' '}
            <code className="text-xs">httpd</code> (CentOS).
          </InfoBox>
        </Card>

        {/* Test skladni */}
        <Card title="Test skladni (ZAWSZE!)" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            <b>Zawsze</b> testuj skladnie przed reload — inaczej serwer moze
            sie nie uruchomic.
          </p>
          <ExampleBlock variant="orange">
            <Comment># Nginx</Comment>
            <Cmd>
              <H>sudo</H> nginx -t
            </Cmd>
            <Cmd>
              <H>sudo</H> nginx -T{'  '}
              <Comment># pokaz pelna konfiguracje</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Apache</Comment>
            <Cmd>
              <H>sudo</H> apache2ctl -t
            </Cmd>
            <Cmd>
              <H>sudo</H> apache2ctl configtest
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* Nginx — sciezki */}
        <Card title="Nginx — waznie sciezki" color="var(--c-blue)">
          <Row code="/etc/nginx/nginx.conf">glowna konfiguracja</Row>
          <Row code="/etc/nginx/sites-available/">konfiguracje vhost</Row>
          <Row code="/etc/nginx/sites-enabled/">aktywne vhost (symlinki)</Row>
          <Row code="/etc/nginx/conf.d/">dodatki konfiguracji</Row>
          <Row code="/etc/nginx/mime.types">typy MIME</Row>
          <Row code="/var/www/html/">domyslny root</Row>
          <Row code="/var/log/nginx/access.log">logi dostepu</Row>
          <Row code="/var/log/nginx/error.log">logi bledow</Row>
          <Row code="/run/nginx.pid">plik PID</Row>
        </Card>

        {/* Apache — sciezki */}
        <Card title="Apache — waznie sciezki" color="var(--c-orange)">
          <Row code="/etc/apache2/apache2.conf">glowna konfiguracja</Row>
          <Row code="/etc/apache2/ports.conf">porty nasluchiwania</Row>
          <Row code="/etc/apache2/sites-available/">konfiguracje vhost</Row>
          <Row code="/etc/apache2/sites-enabled/">aktywne vhost</Row>
          <Row code="/etc/apache2/mods-enabled/">aktywne moduly</Row>
          <Row code="/var/www/html/">domyslny root</Row>
          <Row code="/var/log/apache2/access.log">logi dostepu</Row>
          <Row code="/var/log/apache2/error.log">logi bledow</Row>
          <Divider />
          <SectionLabel>Apache — komendy</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>
              <H>sudo</H> a2ensite example.conf{'   '}
              <Comment># aktywuj vhost</Comment>
            </Cmd>
            <Cmd>
              <H>sudo</H> a2dissite example.conf{'  '}
              <Comment># wylacz vhost</Comment>
            </Cmd>
            <Cmd>
              <H>sudo</H> a2enmod rewrite{'          '}
              <Comment># wlacz modul</Comment>
            </Cmd>
            <Cmd>
              <H>sudo</H> a2enconf servername
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* Virtual Host — Nginx */}
        <Card title="Virtual Host — Nginx" color="var(--c-blue)">
          <ExampleBlock variant="default">
            <Cmd>server {'{'}</Cmd>
            <Cmd>
              {'  '}listen <V>80</V>;
            </Cmd>
            <Cmd>
              {'  '}server_name example.com www.example.com;
            </Cmd>
            <Cmd>
              {'  '}root <V>/var/www/example</V>;
            </Cmd>
            <Cmd>
              {'  '}index index.html;
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              {'  '}location / {'{'}
            </Cmd>
            <Cmd>
              {'    '}try_files <V>$uri</V> <V>$uri/</V> =<V>404</V>;
            </Cmd>
            <Cmd>{'  '}{'}'}</Cmd>
            <Cmd> </Cmd>
            <Cmd>
              {'  '}error_page <V>404</V> /404.html;
            </Cmd>
            <Cmd>
              {'  '}access_log /var/log/nginx/example.access.log;
            </Cmd>
            <Cmd>
              {'  '}error_log /var/log/nginx/example.error.log;
            </Cmd>
            <Cmd>{'}'}</Cmd>
          </ExampleBlock>
          <ExampleBlock variant="default">
            <Cmd>
              <H>sudo</H> ln -s /etc/nginx/sites-available/example /etc/nginx/sites-enabled/
            </Cmd>
            <Cmd>
              <H>sudo</H> nginx -t && <H>sudo</H> systemctl reload nginx
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* Reverse proxy */}
        <Card title="Reverse proxy" color="var(--c-yellow)" full>
          <ExampleBlock variant="yellow">
            <Cmd>upstream backend {'{'}</Cmd>
            <Cmd>
              {'  '}server <V>127.0.0.1:8080</V>;
            </Cmd>
            <Cmd>
              {'  '}server <V>127.0.0.1:8081</V> backup;
            </Cmd>
            <Cmd>{'}'}</Cmd>
            <Cmd> </Cmd>
            <Cmd>server {'{'}</Cmd>
            <Cmd>
              {'  '}listen <V>80</V>;
            </Cmd>
            <Cmd>
              {'  '}server_name example.com;
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              {'  '}location / {'{'}
            </Cmd>
            <Cmd>
              {'    '}proxy_pass <V>http://backend</V>;
            </Cmd>
            <Cmd>
              {'    '}proxy_set_header Host <V>$host</V>;
            </Cmd>
            <Cmd>
              {'    '}proxy_set_header X-Real-IP <V>$remote_addr</V>;
            </Cmd>
            <Cmd>
              {'    '}proxy_set_header X-Forwarded-For <V>$proxy_add_x_forwarded_for</V>;
            </Cmd>
            <Cmd>
              {'    '}proxy_set_header X-Forwarded-Proto <V>$scheme</V>;
            </Cmd>
            <Cmd>
              {'    '}proxy_connect_timeout <V>60s</V>;
            </Cmd>
            <Cmd>
              {'    '}proxy_read_timeout <V>60s</V>;
            </Cmd>
            <Cmd>{'  '}{'}'}</Cmd>
            <Cmd>{'}'}</Cmd>
          </ExampleBlock>
        </Card>

        {/* Porty i nasluchiwanie */}
        <Card title="Porty i nasluchiwanie" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># Co nasluchuje (socket listener)</Comment>
            <Cmd>
              <H>sudo</H> ss -tlnp
            </Cmd>
            <Cmd>
              <H>sudo</H> ss -tlnp <V>|</V> grep nginx
            </Cmd>
            <Cmd>
              <H>sudo</H> ss -tlnp <V>|</V> grep <V>:80</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Alternatywnie - netstat</Comment>
            <Cmd>
              <H>sudo</H> netstat -tlnp <V>|</V> grep nginx
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code=":80">HTTP</Row>
          <Row code=":443">HTTPS (SSL/TLS)</Row>
          <Row code=":8080">typowy backend</Row>
          <Row code="127.0.0.1:x">tylko lokalnie</Row>
          <Row code="0.0.0.0:x">wszystkie interfejsy</Row>
        </Card>

        {/* Testowanie */}
        <Card title="Testowanie HTTP (curl)" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Prosty GET</Comment>
            <Cmd>curl http://localhost</Cmd>
            <Cmd> </Cmd>
            <Comment># Verbose z naglowkami</Comment>
            <Cmd>curl -v http://localhost</Cmd>
            <Cmd> </Cmd>
            <Comment># Tylko naglowki odpowiedzi</Comment>
            <Cmd>curl -I http://localhost</Cmd>
            <Cmd> </Cmd>
            <Comment># Z custom header</Comment>
            <Cmd>
              curl -H <V>"Host: example.com"</V> http://127.0.0.1
            </Cmd>
            <Cmd> </Cmd>
            <Comment># POST</Comment>
            <Cmd>
              curl -X POST http://localhost -d <V>"key=value"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Pokaz kod statusu</Comment>
            <Cmd>
              curl -s -o /dev/null -w <V>"%{'{http_code}'}\n"</V> http://localhost
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* Logi */}
        <Card title="Logi — odczyt i analiza" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Comment># Follow na biezaco</Comment>
            <Cmd>
              <H>sudo</H> tail -f /var/log/nginx/access.log
            </Cmd>
            <Cmd>
              <H>sudo</H> tail -20 /var/log/nginx/error.log
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Tylko bledy 4xx/5xx</Comment>
            <Cmd>
              <H>sudo</H> grep -E <V>' [45][0-9]{'{2}'} '</V> access.log
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Top kody statusu</Comment>
            <Cmd>awk <V>{"'{print $9}'"}</V> access.log <V>|</V> sort <V>|</V> uniq -c</Cmd>
            <Cmd> </Cmd>
            <Comment># Top IP</Comment>
            <Cmd>awk <V>{"'{print $1}'"}</V> access.log <V>|</V> sort <V>|</V> uniq -c <V>|</V> sort -rn</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Format Nginx access.log</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>$remote_addr - $remote_user [$time_local]</Cmd>
            <Cmd>"$request" $status $body_bytes_sent</Cmd>
            <Cmd>"$http_referer" "$http_user_agent"</Cmd>
          </ExampleBlock>
        </Card>

        {/* Bledy */}
        <Card title="Najczestsze bledy" color="var(--c-accent)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>502 Bad Gateway</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)] mb-1">
                Nginx nie moze polaczyc sie z backendem.
              </p>
              <ExampleBlock variant="default">
                <Cmd>
                  <H>sudo</H> systemctl status apache2
                </Cmd>
                <Cmd>
                  <H>sudo</H> ss -tlnp <V>|</V> grep <V>8080</V>
                </Cmd>
                <Cmd>curl http://127.0.0.1:8080</Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>403 Forbidden</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)] mb-1">
                Prawa dostepu do katalogu/pliku.
              </p>
              <ExampleBlock variant="default">
                <Cmd>
                  <H>sudo</H> chown -R www-data:www-data /var/www/site
                </Cmd>
                <Cmd>
                  <H>sudo</H> chmod -R <V>755</V> /var/www/site
                </Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>404 Not Found</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)] mb-1">
                Zle <code className="text-xs">root</code> lub brak pliku.
              </p>
              <ExampleBlock variant="default">
                <Cmd>
                  <H>ls</H> -la /var/www/site/
                </Cmd>
                <Cmd>
                  <H>sudo</H> grep root /etc/nginx/sites-enabled/*
                </Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>Domyslna strona zamiast Twojej</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)] mb-1">
                Plik <code className="text-xs">default</code> ma priorytet.
              </p>
              <ExampleBlock variant="default">
                <Cmd>
                  <H>sudo</H> rm /etc/nginx/sites-enabled/default
                </Cmd>
                <Cmd>
                  <H>sudo</H> systemctl reload nginx
                </Cmd>
              </ExampleBlock>
            </div>
          </div>
        </Card>

        {/* Gzip i cache */}
        <Card title="Gzip i static cache" color="var(--c-green)">
          <SectionLabel>Gzip (Nginx)</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              gzip <V>on</V>;
            </Cmd>
            <Cmd>
              gzip_types text/plain text/css application/json
            </Cmd>
            <Cmd>
              {'  '}application/javascript text/xml;
            </Cmd>
            <Cmd>
              gzip_min_length <V>1000</V>;
            </Cmd>
            <Cmd>
              gzip_comp_level <V>6</V>;
            </Cmd>
          </ExampleBlock>
          <SectionLabel>Cache statycznych plikow</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              location ~* \.(jpg|jpeg|png|css|js)$ {'{'}
            </Cmd>
            <Cmd>
              {'  '}expires <V>30d</V>;
            </Cmd>
            <Cmd>
              {'  '}add_header Cache-Control <V>"public, no-transform"</V>;
            </Cmd>
            <Cmd>{'}'}</Cmd>
          </ExampleBlock>
        </Card>

        {/* HTTPS */}
        <Card title="HTTPS + Let's Encrypt" color="var(--c-accent)">
          <ExampleBlock variant="default">
            <Comment># Instalacja certbot (Nginx plugin)</Comment>
            <Cmd>
              <H>sudo</H> apt install -y certbot python3-certbot-nginx
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Pozyskanie certyfikatu (modyfikuje konfig Nginx)</Comment>
            <Cmd>
              <H>sudo</H> certbot --nginx -d example.com -d www.example.com
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Test auto-odnawiania</Comment>
            <Cmd>
              <H>sudo</H> certbot renew --dry-run
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Skladnia HTTPS</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              listen <V>443</V> ssl http2;
            </Cmd>
            <Cmd>
              ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
            </Cmd>
            <Cmd>
              ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* Diagnostyka - quick checks */}
        <Card title="Szybkie checki diagnostyczne" color="var(--c-purple)" full>
          <ExampleBlock variant="purple">
            <Comment># 1. Error log — ZAWSZE tutaj zaczynaj</Comment>
            <Cmd>
              <H>sudo</H> tail -20 /var/log/nginx/error.log
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 2. Status</Comment>
            <Cmd>
              <H>sudo</H> systemctl status nginx apache2
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 3. Skladnia</Comment>
            <Cmd>
              <H>sudo</H> nginx -t && <H>sudo</H> apache2ctl -t
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 4. Nasluchiwanie</Comment>
            <Cmd>
              <H>sudo</H> ss -tlnp <V>|</V> grep -E <V>'nginx|apache'</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 5. Testy HTTP</Comment>
            <Cmd>
              curl -v http://localhost
            </Cmd>
            <Cmd>
              curl -I -H <V>"Host: example.com"</V> http://127.0.0.1
            </Cmd>
            <Cmd> </Cmd>
            <Comment># 6. Pelna konfiguracja Nginx</Comment>
            <Cmd>
              <H>sudo</H> nginx -T <V>|</V> less
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Zasada:</b> <code className="text-xs">nginx -t</code> →{' '}
            <code className="text-xs">systemctl reload</code> →{' '}
            <code className="text-xs">curl -v</code> →{' '}
            <code className="text-xs">tail -f error.log</code>. 90% problemow
            znajdziesz w tej kolejnosci.
          </InfoBox>
        </Card>

        {/* Linki */}
        <Card title="Dokumentacja i linki" color="var(--c-blue)">
          <ul className="text-[11px] text-[var(--c-muted)] space-y-1">
            <li>
              <a
                href="https://nginx.org/en/docs/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Nginx Official Docs
              </a>
            </li>
            <li>
              <a
                href="https://nginx.org/en/docs/beginners_guide.html"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Nginx Beginner's Guide
              </a>
            </li>
            <li>
              <a
                href="https://httpd.apache.org/docs/2.4/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Apache 2.4 Documentation
              </a>
            </li>
            <li>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                MDN — HTTP
              </a>
            </li>
            <li>
              <a
                href="https://letsencrypt.org/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Let's Encrypt
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}