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

export default function Homework15() {
  usePageTitle('Homework 15');

  return (
    <div>
      <PageHeader
        title="Homework 15 — SSL/TLS i HTTPS"
        subtitle="openssl · self-signed · Lets Encrypt · HSTS · SSL Labs"
        color="var(--c-yellow)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* === 1 === */}
        <Card title="1. Self-signed cert + Nginx HTTPS" color="var(--c-yellow)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(76,217,100,0.15)] text-[var(--c-green)] font-bold">
              BASIC
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Wygeneruj self-signed certyfikat, skonfiguruj Nginx z HTTPS na
            localhost. Otworz w przegladarce — zobacz ostrzezenie, dodaj
            wyjatek.
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>
              Wygeneruj klucz + cert za pomoca{' '}
              <code className="text-xs">openssl req -x509</code>
            </li>
            <li>
              Przenies do <code className="text-xs">/etc/ssl/private/</code> i{' '}
              <code className="text-xs">/etc/ssl/certs/</code>
            </li>
            <li>
              Skonfiguruj nginx z{' '}
              <code className="text-xs">listen 443 ssl</code>
            </li>
            <li>Sprawdz nginx -t i reload</li>
            <li>
              Test: <code className="text-xs">curl -k https://localhost</code>
            </li>
            <li>Otworz w przegladarce — porownaj komunikat z prawdziwym CA</li>
          </ol>

          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Generowanie self-signed</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                <H>sudo</H> openssl req -x509 -newkey rsa:<V>4096</V> -nodes \
              </Cmd>
              <Cmd>{'  '}-keyout /etc/ssl/private/selfsigned.key \</Cmd>
              <Cmd>{'  '}-out /etc/ssl/certs/selfsigned.crt \</Cmd>
              <Cmd>
                {'  '}-days <V>365</V> -subj <V>"/CN=localhost"</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">nginx config</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>server {'{'}</Cmd>
              <Cmd>
                {'    '}listen <V>443</V> ssl;
              </Cmd>
              <Cmd>{'    '}server_name localhost;</Cmd>
              <Cmd>{'    '}ssl_certificate /etc/ssl/certs/selfsigned.crt;</Cmd>
              <Cmd>
                {'    '}ssl_certificate_key /etc/ssl/private/selfsigned.key;
              </Cmd>
              <Cmd>
                {'    '}ssl_protocols <V>TLSv1.2 TLSv1.3</V>;
              </Cmd>
              <Cmd>{'    '}root /var/www/html;</Cmd>
              <Cmd>{'}'}</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Test</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                <H>sudo</H> nginx -t && <H>sudo</H> systemctl reload nginx
              </Cmd>
              <Cmd>
                curl -kv https://localhost{'   '}
                <Comment># -k = ignoruj cert</Comment>
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === 2 === */}
        <Card
          title="2. Lets Encrypt na prawdziwej domenie"
          color="var(--c-green)"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Wez darmowa domene (np. DuckDNS, freenom) lub uzyj swojej. Wystaw
            darmowy certyfikat z Lets Encrypt przez certbot. Sprawdz w SSL Labs.
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>Skieruj domene A-rekord na publiczne IP serwera</li>
            <li>Otworz port 80 i 443 w firewallu</li>
            <li>
              Zainstaluj certbot:{' '}
              <code className="text-xs">
                apt install certbot python3-certbot-nginx
              </code>
            </li>
            <li>
              <code className="text-xs">
                sudo certbot --nginx -d twoja.domena
              </code>
            </li>
            <li>
              Sprawdz auto-renew:{' '}
              <code className="text-xs">certbot renew --dry-run</code>
            </li>
            <li>
              Test na <code className="text-xs">ssllabs.com/ssltest</code> —
              celuj w A+
            </li>
            <li>Dodaj HSTS header w nginx</li>
            <li>Wymus redirect 80 → 443</li>
          </ol>

          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>certbot — flow</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                <H>sudo</H> apt install -y certbot python3-certbot-nginx
              </Cmd>
              <Cmd>
                <H>sudo</H> certbot --nginx -d twoja.domena -d www.twoja.domena
              </Cmd>
              <Cmd>
                <H>sudo</H> certbot renew --dry-run
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">HSTS w nginx</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                add_header Strict-Transport-Security{' '}
                <V>"max-age=31536000; includeSubDomains"</V> always;
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              <b>HSTS preload:</b> aby trafic na liste preload Chrome, dodaj{' '}
              <code className="text-xs">preload</code> i wyslij wniosek na{' '}
              <a
                href="https://hstspreload.org"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                hstspreload.org
              </a>
              .
            </InfoBox>
          </Spoiler>
        </Card>

        {/* === 3 === */}
        <Card
          title="3. Inspekcja certyfikatu (bonus)"
          color="var(--c-purple)"
          full
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,159,76,0.15)] text-[var(--c-orange)] font-bold">
              BONUS
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Sprawdz certyfikat 5 znanych domen: google.com, github.com,
            stackoverflow.com, twojej.domena, banku. Porownaj: typ walidacji,
            issuer, data waznosci, SAN, podpisany przez kogo.
          </p>

          <SectionLabel>Polecenia</SectionLabel>
          <ExampleBlock variant="purple">
            <Comment># pokaz pelny cert</Comment>
            <Cmd>
              echo <V>|</V> openssl s_client -connect google.com:<V>443</V>{' '}
              -servername google.com 2&gt;/dev/null <V>|</V> openssl x509 -text
              -noout
            </Cmd>
            <Cmd> </Cmd>
            <Comment># tylko daty</Comment>
            <Cmd>
              echo <V>|</V> openssl s_client -connect google.com:<V>443</V>{' '}
              2&gt;/dev/null <V>|</V> openssl x509 -noout -dates
            </Cmd>
            <Cmd> </Cmd>
            <Comment># tylko subject + issuer</Comment>
            <Cmd>
              echo <V>|</V> openssl s_client -connect google.com:<V>443</V>{' '}
              2&gt;/dev/null <V>|</V> openssl x509 -noout -subject -issuer
            </Cmd>
          </ExampleBlock>

          <SectionLabel className="mt-2">Tabela porownawcza</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>| Domena | Issuer | Typ | SAN | Waznosc |</Cmd>
            <Cmd>
              |--------------|-------------------|-----|-----|---------|
            </Cmd>
            <Cmd>| google.com | Google Trust Sv | DV | ... | ... |</Cmd>
            <Cmd>| github.com | DigiCert TLS | OV | ... | ... |</Cmd>
          </ExampleBlock>
        </Card>
      </div>

      <InfoBox>
        <b>Kryteria oceny:</b> HTTPS dziala lokalnie (self-signed), Lets Encrypt
        cert wystawiony na prawdziwej domenie, A grade w SSL Labs, HSTS
        skonfigurowane, redirect 80→443.
      </InfoBox>

      <LessonNav prev={{ to: '/lessons/15', label: '15 — SSL/TLS' }} />
    </div>
  );
}
