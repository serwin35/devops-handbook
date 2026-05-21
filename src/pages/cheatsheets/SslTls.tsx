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

export default function SslTls() {
  usePageTitle('SSL/TLS — cheatsheet');

  return (
    <div>
      <PageHeader
        title="SSL/TLS · openssl · certbot"
        subtitle="generowanie kluczy · CSR · inspekcja · Lets Encrypt · debug"
        color="var(--c-yellow)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === openssl: klucze === */}
        <Card title="openssl — klucze" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Comment># RSA 4096</Comment>
            <Cmd>
              openssl genrsa -out key.pem <V>4096</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># ECDSA (szybsze, mniejsze)</Comment>
            <Cmd>openssl ecparam -genkey -name prime256v1 -out key.pem</Cmd>
            <Cmd> </Cmd>
            <Comment># Klucz z haslem</Comment>
            <Cmd>
              openssl genrsa -aes256 -out key.pem <V>4096</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Pokaz klucz publiczny</Comment>
            <Cmd>openssl rsa -in key.pem -pubout</Cmd>
          </ExampleBlock>
        </Card>

        {/* === CSR === */}
        <Card title="CSR (Certificate Signing Request)" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Interaktywnie</Comment>
            <Cmd>openssl req -new -key key.pem -out cert.csr</Cmd>
            <Cmd> </Cmd>
            <Comment># Z parametrami w CLI</Comment>
            <Cmd>openssl req -new -key key.pem -out cert.csr \</Cmd>
            <Cmd>
              {'  '}-subj <V>"/C=PL/ST=MZ/L=Warszawa/O=Acme/CN=example.com"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Inspekcja CSR</Comment>
            <Cmd>openssl req -in cert.csr -text -noout</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Self-signed === */}
        <Card title="Self-signed cert" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Comment># Klucz + cert w jednym</Comment>
            <Cmd>
              openssl req -x509 -newkey rsa:<V>4096</V> -nodes \
            </Cmd>
            <Cmd>
              {'  '}-keyout key.pem -out cert.pem -days <V>365</V> \
            </Cmd>
            <Cmd>
              {'  '}-subj <V>"/CN=localhost"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Z SAN (kilka domen)</Comment>
            <Cmd>
              openssl req -x509 -newkey rsa:<V>2048</V> -nodes \
            </Cmd>
            <Cmd>
              {'  '}-keyout key.pem -out cert.pem -days <V>365</V> \
            </Cmd>
            <Cmd>
              {'  '}-subj <V>"/CN=example.com"</V> \
            </Cmd>
            <Cmd>
              {'  '}-addext{' '}
              <V>"subjectAltName=DNS:example.com,DNS:www.example.com"</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Inspekcja === */}
        <Card title="Inspekcja certyfikatu" color="var(--c-blue)" full>
          <ExampleBlock variant="default">
            <Comment># Pelne info</Comment>
            <Cmd>openssl x509 -in cert.pem -text -noout</Cmd>
            <Cmd> </Cmd>
            <Comment># Tylko daty waznosci</Comment>
            <Cmd>openssl x509 -in cert.pem -dates -noout</Cmd>
            <Cmd> </Cmd>
            <Comment># Subject + issuer</Comment>
            <Cmd>openssl x509 -in cert.pem -subject -issuer -noout</Cmd>
            <Cmd> </Cmd>
            <Comment># Fingerprint (SHA-256)</Comment>
            <Cmd>openssl x509 -in cert.pem -fingerprint -sha256 -noout</Cmd>
            <Cmd> </Cmd>
            <Comment># SAN</Comment>
            <Cmd>openssl x509 -in cert.pem -ext subjectAltName -noout</Cmd>
            <Cmd> </Cmd>
            <Comment># Pokaz cert z hosta (zdalnie)</Comment>
            <Cmd>
              echo <V>|</V> openssl s_client -connect example.com:<V>443</V> \
            </Cmd>
            <Cmd>
              {'  '}-servername example.com 2&gt;/dev/null <V>|</V> openssl x509
              -text -noout
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === certbot === */}
        <Card title="certbot — Lets Encrypt" color="var(--c-green)" full>
          <ExampleBlock variant="green">
            <Comment># Instalacja</Comment>
            <Cmd>
              <H>sudo</H> apt install -y certbot python3-certbot-nginx
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Auto-konfig Nginx (zalecane)</Comment>
            <Cmd>
              <H>sudo</H> certbot --nginx -d example.com -d www.example.com
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Tylko cert (bez modyfikacji nginx)</Comment>
            <Cmd>
              <H>sudo</H> certbot certonly --webroot -w /var/www/html -d
              example.com
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Standalone (zatrzymuje port 80)</Comment>
            <Cmd>
              <H>sudo</H> certbot certonly --standalone -d example.com
            </Cmd>
            <Cmd> </Cmd>
            <Comment># DNS-01 dla wildcardu</Comment>
            <Cmd>
              <H>sudo</H> certbot certonly --manual --preferred-challenges dns
              -d <V>'*.example.com'</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Test odnowienia</Comment>
            <Cmd>
              <H>sudo</H> certbot renew --dry-run
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Odnow konkretny cert</Comment>
            <Cmd>
              <H>sudo</H> certbot renew --cert-name example.com
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Usun cert</Comment>
            <Cmd>
              <H>sudo</H> certbot delete --cert-name example.com
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Lista wszystkich</Comment>
            <Cmd>
              <H>sudo</H> certbot certificates
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Sciezki Lets Encrypt</SectionLabel>
          <Row code="/etc/letsencrypt/live/<dom>/fullchain.pem">
            leaf + intermediate
          </Row>
          <Row code="/etc/letsencrypt/live/<dom>/privkey.pem">
            klucz prywatny
          </Row>
          <Row code="/etc/letsencrypt/live/<dom>/cert.pem">tylko leaf</Row>
          <Row code="/etc/letsencrypt/live/<dom>/chain.pem">
            tylko intermediate
          </Row>
        </Card>

        {/* === Nginx HTTPS === */}
        <Card title="Nginx — HTTPS config" color="var(--c-blue)" full>
          <ExampleBlock variant="purple">
            <Cmd>server {'{'}</Cmd>
            <Cmd>
              {'    '}listen <V>443</V> ssl http2;
            </Cmd>
            <Cmd>{'    '}server_name example.com;</Cmd>
            <Cmd> </Cmd>
            <Cmd>
              {'    '}ssl_certificate
              /etc/letsencrypt/live/example.com/fullchain.pem;
            </Cmd>
            <Cmd>
              {'    '}ssl_certificate_key
              /etc/letsencrypt/live/example.com/privkey.pem;
            </Cmd>
            <Cmd> </Cmd>
            <Comment>{'    '}# Mozilla modern</Comment>
            <Cmd>
              {'    '}ssl_protocols <V>TLSv1.2 TLSv1.3</V>;
            </Cmd>
            <Cmd>{'    '}ssl_prefer_server_ciphers off;</Cmd>
            <Cmd>
              {'    '}ssl_session_cache shared:SSL:<V>10m</V>;
            </Cmd>
            <Cmd>
              {'    '}ssl_session_timeout <V>1d</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Comment>{'    '}# OCSP stapling</Comment>
            <Cmd>{'    '}ssl_stapling on;</Cmd>
            <Cmd>{'    '}ssl_stapling_verify on;</Cmd>
            <Cmd> </Cmd>
            <Comment>{'    '}# Security headers</Comment>
            <Cmd>
              {'    '}add_header Strict-Transport-Security{' '}
              <V>"max-age=31536000; includeSubDomains"</V> always;
            </Cmd>
            <Cmd>
              {'    '}add_header X-Frame-Options <V>"SAMEORIGIN"</V> always;
            </Cmd>
            <Cmd>
              {'    '}add_header X-Content-Type-Options <V>"nosniff"</V> always;
            </Cmd>
            <Cmd>{'}'}</Cmd>
            <Cmd> </Cmd>
            <Comment># Redirect HTTP → HTTPS</Comment>
            <Cmd>server {'{'}</Cmd>
            <Cmd>
              {'    '}listen <V>80</V>;
            </Cmd>
            <Cmd>{'    '}server_name example.com;</Cmd>
            <Cmd>
              {'    '}return <V>301</V> https://<V>$host</V>
              <V>$request_uri</V>;
            </Cmd>
            <Cmd>{'}'}</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Debug === */}
        <Card title="Debug i testy" color="var(--c-purple)" full>
          <ExampleBlock variant="purple">
            <Comment># Pelne polaczenie + cert</Comment>
            <Cmd>
              openssl s_client -connect example.com:<V>443</V> -servername
              example.com
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Wymus konkretny TLS</Comment>
            <Cmd>
              openssl s_client -connect example.com:<V>443</V> -tls1_2
            </Cmd>
            <Cmd>
              openssl s_client -connect example.com:<V>443</V> -tls1_3
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Pokaz wszystkie ciphery serwera</Comment>
            <Cmd>
              nmap --script ssl-enum-ciphers -p <V>443</V> example.com
            </Cmd>
            <Cmd> </Cmd>
            <Comment># curl verbose</Comment>
            <Cmd>curl -vI https://example.com</Cmd>
            <Cmd> </Cmd>
            <Comment># Ignoruj cert (test)</Comment>
            <Cmd>curl -k https://localhost</Cmd>
            <Cmd> </Cmd>
            <Comment># Test renewal hook</Comment>
            <Cmd>
              <H>sudo</H> systemctl status certbot.timer
            </Cmd>
            <Cmd>
              <H>sudo</H> journalctl -u certbot.service
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Online narzedzia</SectionLabel>
          <ul className="text-[11px] text-[var(--c-muted)] space-y-1">
            <li>
              <a
                href="https://www.ssllabs.com/ssltest/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                SSL Labs — grade A+
              </a>
            </li>
            <li>
              <a
                href="https://ssl-config.mozilla.org/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Mozilla SSL Configuration Generator
              </a>
            </li>
            <li>
              <a
                href="https://crt.sh/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                crt.sh — Certificate Transparency
              </a>
            </li>
          </ul>
        </Card>

        {/* === Konwersje === */}
        <Card title="Konwersje formatow" color="var(--c-orange)">
          <ExampleBlock variant="default">
            <Comment># PEM → DER</Comment>
            <Cmd>openssl x509 -in cert.pem -outform DER -out cert.der</Cmd>
            <Cmd> </Cmd>
            <Comment># DER → PEM</Comment>
            <Cmd>
              openssl x509 -in cert.der -inform DER -outform PEM -out cert.pem
            </Cmd>
            <Cmd> </Cmd>
            <Comment># PEM → PKCS12 (.p12, .pfx)</Comment>
            <Cmd>
              openssl pkcs12 -export -in cert.pem -inkey key.pem -out cert.p12
            </Cmd>
            <Cmd> </Cmd>
            <Comment># PKCS12 → PEM</Comment>
            <Cmd>openssl pkcs12 -in cert.p12 -out cert.pem -nodes</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Sprawdz === */}
        <Card title="Cert pasuje do klucza?" color="up">
          <ExampleBlock variant="default">
            <Comment>
              # Pobierz modulus klucza i certu — musza byc identyczne
            </Comment>
            <Cmd>
              openssl rsa -noout -modulus -in key.pem <V>|</V> openssl md5
            </Cmd>
            <Cmd>
              openssl x509 -noout -modulus -in cert.pem <V>|</V> openssl md5
            </Cmd>
            <Cmd>
              openssl req -noout -modulus -in cert.csr <V>|</V> openssl md5
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Jesli MD5 sie nie zgadza, klucz nie pasuje do certyfikatu — nginx
            nie wystartuje.
          </InfoBox>
        </Card>
      </div>
    </div>
  );
}
