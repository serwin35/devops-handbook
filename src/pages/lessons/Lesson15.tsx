import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Concept from '../../components/Concept';
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

export default function Lesson15() {
  usePageTitle('Lekcja 15 — SSL/TLS i HTTPS');

  return (
    <div>
      <PageHeader
        title="Lekcja 15 — SSL/TLS, certyfikaty, HTTPS"
        subtitle="TLS handshake · X.509 · openssl · Lets Encrypt · certbot · HSTS"
        color="var(--c-yellow)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === Cele lekcji === */}
        <Card title="Cele lekcji" color="var(--c-yellow)">
          <Concept title="Co poznasz?" color="var(--c-yellow)">
            Czym jest <b>TLS</b>, jak dziala handshake, czym sa certyfikaty
            X.509, jak wystawiac wlasne (self-signed) i jak uzyskac darmowy
            certyfikat z <b>Lets Encrypt</b> za pomoca <b>certbot</b>.
          </Concept>
          <Divider />
          <Row code="1">SSL vs TLS — historia i terminologia</Row>
          <Row code="2">TLS handshake i klucze (sym/asym)</Row>
          <Row code="3">Certyfikaty X.509, CA, lancuch zaufania</Row>
          <Row code="4">openssl — generowanie kluczy i CSR</Row>
          <Row code="5">Lets Encrypt + certbot (HTTP-01 / DNS-01)</Row>
          <Row code="6">HTTPS w Nginx i Apache, HSTS, OCSP</Row>
        </Card>

        {/* === SSL vs TLS === */}
        <Card title="SSL vs TLS — historia" color="var(--c-purple)">
          <Concept
            title="Wszystko nazywaja SSL — to mit"
            color="var(--c-purple)"
          >
            SSL 2.0/3.0 sa <b>martwe i niebezpieczne</b>. Mowiac SSL mamy na
            mysli TLS — nowoczesny nastepca.
          </Concept>
          <Divider />
          <Row code="SSL 1.0">nigdy nie wydane (Netscape, 1994)</Row>
          <Row code="SSL 2.0">1995 — zlamane</Row>
          <Row code="SSL 3.0">1996 — POODLE attack</Row>
          <Row code="TLS 1.0">1999 — odradzane</Row>
          <Row code="TLS 1.1">2006 — odradzane</Row>
          <Row code="TLS 1.2">2008 — minimum dzisiaj</Row>
          <Row code="TLS 1.3">
            2018 — preferowane (szybsze, bezpieczniejsze)
          </Row>
          <Divider />
          <InfoBox>
            W konfiguracji nginx/apache <b>wlacz tylko TLS 1.2 i 1.3</b>.
            Wszystko ponizej wylacz.
          </InfoBox>
        </Card>

        {/* === Co daje TLS === */}
        <Card title="Co daje TLS?" color="var(--c-blue)">
          <SectionLabel>Trzy gwarancje</SectionLabel>
          <Row code="Poufnosc">szyfrowanie — nikt nie podsluchuje</Row>
          <Row code="Integralnosc">MAC/AEAD — nikt nie zmodyfikowal</Row>
          <Row code="Autentycznosc">certyfikat — to naprawde ten serwer</Row>
          <Divider />
          <SectionLabel>Czego TLS NIE daje</SectionLabel>
          <Row code="-">ukrycia faktu polaczenia (SNI ujawnia hostname)</Row>
          <Row code="-">ochrony aplikacji od bledow (XSS, SQLi)</Row>
          <Row code="-">anonimowosci (IP zostaje)</Row>
          <InfoBox>
            HTTPS nie jest "bezpieczna strona" — to tylko{' '}
            <b>bezpieczny kanal</b> do strony. Reszta zalezy od aplikacji.
          </InfoBox>
        </Card>

        {/* === Handshake === */}
        <Card title="TLS Handshake (1.3)" color="var(--c-green)" full>
          <Concept title="Co sie dzieje w 100ms" color="var(--c-green)">
            Klient i serwer ustalaja: jakie szyfry, klucz sesji, sprawdzaja
            certyfikat — wszystko zanim leci pierwszy bajt HTTP.
          </Concept>
          <Divider />
          <ExampleBlock variant="default">
            <Cmd>Client Server</Cmd>
            <Cmd>
              {'  '}|--- ClientHello + key share ----&gt;{'  '}|
            </Cmd>
            <Cmd>{'  '}| (lista cipher suites,) |</Cmd>
            <Cmd>{'  '}| (TLS version, SNI) |</Cmd>
            <Cmd>{'  '}| |</Cmd>
            <Cmd>{'  '}|&lt;-- ServerHello + cert + finish ---|</Cmd>
            <Cmd>{'  '}| (wybrany cipher, klucz) |</Cmd>
            <Cmd>{'  '}| (certyfikat X.509) |</Cmd>
            <Cmd>{'  '}| |</Cmd>
            <Cmd>{'  '}|--- Finished ----------------------&gt;|</Cmd>
            <Cmd>{'  '}|=== zaszyfrowane HTTP =============&gt;|</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Klucze: sym vs asym</SectionLabel>
          <Row code="Asym (RSA/ECDSA)">do uwierzytelnienia + key exchange</Row>
          <Row code="Sym (AES, ChaCha20)">szybkie szyfrowanie sesji</Row>
          <InfoBox>
            TLS 1.3 ma <b>1-RTT handshake</b> (poprzednio 2-RTT). Z 0-RTT
            (resumption) — jeszcze szybciej.
          </InfoBox>
        </Card>

        {/* === Certyfikat X.509 === */}
        <Card title="Certyfikat X.509" color="var(--c-orange)" full>
          <Concept title="Co to jest?" color="var(--c-orange)">
            Plik podpisany przez <b>CA</b> (Certificate Authority) mowiacy:
            "klucz publiczny K nalezy do domeny example.com".
          </Concept>
          <Divider />
          <SectionLabel>Pola certyfikatu</SectionLabel>
          <Row code="Subject">CN=example.com (komu wystawiono)</Row>
          <Row code="Issuer">CN=Lets Encrypt R3 (kto wystawil)</Row>
          <Row code="Not Before / Not After">okres waznosci</Row>
          <Row code="Subject Public Key">klucz publiczny serwera</Row>
          <Row code="SAN">Subject Alternative Names (lista domen)</Row>
          <Row code="Signature">podpis CA (gwarant)</Row>
          <Divider />
          <SectionLabel>Lancuch zaufania</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              [ Root CA ]{'         '}
              <Comment># w przegladarce/OS</Comment>
            </Cmd>
            <Cmd>
              {'   '}|{'  '}podpisuje
            </Cmd>
            <Cmd>{'   '}▼</Cmd>
            <Cmd>
              [ Intermediate CA ] <Comment># np. Lets Encrypt R3</Comment>
            </Cmd>
            <Cmd>
              {'   '}|{'  '}podpisuje
            </Cmd>
            <Cmd>{'   '}▼</Cmd>
            <Cmd>
              [ Leaf certyfikat ] <Comment># Twoja domena</Comment>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>fullchain.pem</b> = leaf + intermediate. Server
            <b> musi</b> wyslac caly lancuch (oprocz root) — inaczej "untrusted
            CA".
          </InfoBox>
        </Card>

        {/* === Typy certyfikatow === */}
        <Card title="Typy certyfikatow" color="var(--c-purple)">
          <SectionLabel>Wedlug walidacji</SectionLabel>
          <Row code="DV">Domain Validation — automat (Lets Encrypt)</Row>
          <Row code="OV">Organization Validation — weryfikacja firmy</Row>
          <Row code="EV">Extended Validation — restrykcyjne (banki)</Row>
          <Divider />
          <SectionLabel>Wedlug zakresu</SectionLabel>
          <Row code="Single">jedna domena: example.com</Row>
          <Row code="Wildcard">*.example.com (subdomeny)</Row>
          <Row code="SAN">wiele domen na jednym certyfikacie</Row>
          <Divider />
          <InfoBox>
            <b>Self-signed</b> = sam siebie podpisujesz. Dziala wewnatrz, ale
            przegladarka pokaze ostrzezenie.
          </InfoBox>
        </Card>

        {/* === openssl === */}
        <Card
          title="openssl — narzedzie podstawowe"
          color="var(--c-green)"
          full
        >
          <SectionLabel>Generowanie klucza prywatnego</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># RSA 4096 bit</Comment>
            <Cmd>
              openssl genrsa -out server.key <V>4096</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Nowsze: ECDSA (szybsze, mniejsze)</Comment>
            <Cmd>openssl ecparam -genkey -name prime256v1 -out server.key</Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">
            CSR — Certificate Signing Request
          </SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>openssl req -new -key server.key -out server.csr</Cmd>
            <Cmd> </Cmd>
            <Comment># Z parametrami w CLI</Comment>
            <Cmd>openssl req -new -key server.key -out server.csr \</Cmd>
            <Cmd>
              {'  '}-subj{' '}
              <V>"/C=PL/ST=Mazowsze/L=Warszawa/O=Acme/CN=example.com"</V>
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">Self-signed (do testow)</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              openssl req -x509 -newkey rsa:<V>4096</V> -nodes \
            </Cmd>
            <Cmd>
              {'  '}-keyout server.key -out server.crt -days <V>365</V> \
            </Cmd>
            <Cmd>
              {'  '}-subj <V>"/CN=localhost"</V>
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">Inspekcja certyfikatu</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>openssl x509 -in server.crt -text -noout</Cmd>
            <Cmd>openssl x509 -in server.crt -dates -noout</Cmd>
            <Cmd>openssl x509 -in server.crt -subject -issuer -noout</Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">Test polaczenia TLS</SectionLabel>
          <ExampleBlock variant="green">
            <Cmd>
              openssl s_client -connect example.com:<V>443</V> -servername
              example.com
            </Cmd>
            <Cmd>
              openssl s_client -connect example.com:<V>443</V> &lt;/dev/null
              2&gt;/dev/null <V>|</V> openssl x509 -text -noout
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Lets Encrypt === */}
        <Card title="Lets Encrypt + certbot" color="var(--c-yellow)" full>
          <Concept title="Darmowe certyfikaty DV" color="var(--c-yellow)">
            Lets Encrypt to CA wystawiajacy <b>darmowe</b> certyfikaty DV (90
            dni waznosci) automatycznie via ACME protocol.
            <b>certbot</b> to klient ACME.
          </Concept>
          <Divider />
          <SectionLabel>Instalacja certbot</SectionLabel>
          <ExampleBlock variant="yellow">
            <Cmd>
              <H>sudo</H> apt update
            </Cmd>
            <Cmd>
              <H>sudo</H> apt install -y certbot python3-certbot-nginx
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">
            Wystawienie certyfikatu (HTTP-01)
          </SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># Auto-konfiguracja Nginx</Comment>
            <Cmd>
              <H>sudo</H> certbot --nginx -d example.com -d www.example.com
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Tylko certyfikat (bez modyfikacji nginx)</Comment>
            <Cmd>
              <H>sudo</H> certbot certonly --webroot -w /var/www/html -d
              example.com
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">DNS-01 — dla wildcardu</SectionLabel>
          <ExampleBlock variant="yellow">
            <Cmd>
              <H>sudo</H> certbot certonly --manual --preferred-challenges dns \
            </Cmd>
            <Cmd>
              {'  '}-d <V>"*.example.com"</V> -d example.com
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">Auto-renew</SectionLabel>
          <ExampleBlock variant="default">
            <Comment># Test (dry-run)</Comment>
            <Cmd>
              <H>sudo</H> certbot renew --dry-run
            </Cmd>
            <Cmd> </Cmd>
            <Comment># systemd timer juz dziala out-of-the-box</Comment>
            <Cmd>
              <H>sudo</H> systemctl status certbot.timer
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Lokalizacja plikow</SectionLabel>
          <Row code="/etc/letsencrypt/live/<domena>/fullchain.pem">
            leaf + intermediate
          </Row>
          <Row code="/etc/letsencrypt/live/<domena>/privkey.pem">
            klucz prywatny
          </Row>
          <Row code="/etc/letsencrypt/live/<domena>/chain.pem">
            tylko intermediate
          </Row>
          <Row code="/etc/letsencrypt/renewal/">konfigi odnowienia</Row>
        </Card>

        {/* === HTTPS w nginx === */}
        <Card title="HTTPS w Nginx" color="var(--c-blue)" full>
          <ExampleBlock variant="purple">
            <Cmd>server {'{'}</Cmd>
            <Cmd>
              {'    '}listen <V>443</V> ssl http2;
            </Cmd>
            <Cmd>{'    '}server_name example.com;</Cmd>
            <Cmd> </Cmd>
            <Cmd>
              {'    '}ssl_certificate{' '}
              <V>/etc/letsencrypt/live/example.com/fullchain.pem</V>;
            </Cmd>
            <Cmd>
              {'    '}ssl_certificate_key{' '}
              <V>/etc/letsencrypt/live/example.com/privkey.pem</V>;
            </Cmd>
            <Cmd> </Cmd>
            <Comment>{'    '}# Modern config (Mozilla)</Comment>
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
            <Comment>{'    '}# HSTS — wymus HTTPS na 1 rok</Comment>
            <Cmd>
              {'    '}add_header Strict-Transport-Security{' '}
              <V>"max-age=31536000; includeSubDomains"</V> always;
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>{'    '}root /var/www/example.com;</Cmd>
            <Cmd>{'}'}</Cmd>
            <Cmd> </Cmd>
            <Comment># Redirect HTTP -&gt; HTTPS</Comment>
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
          <InfoBox>
            <b>HSTS</b> mowi przegladarce: "do tej domeny chodz tylko po HTTPS".
            Po pierwszym pobraniu naglowka wszystkie kolejne polaczenia HTTP sa
            konwertowane lokalnie.
          </InfoBox>
        </Card>

        {/* === Testy === */}
        <Card title="Testy i diagnostyka" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># curl z verbose</Comment>
            <Cmd>curl -vI https://example.com</Cmd>
            <Cmd> </Cmd>
            <Comment># Tylko data wygasniecia</Comment>
            <Cmd>
              echo <V>|</V> openssl s_client -connect example.com:<V>443</V>{' '}
              2&gt;/dev/null <V>|</V> openssl x509 -noout -dates
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Test wszystkich cipherow</Comment>
            <Cmd>
              nmap --script ssl-enum-ciphers -p <V>443</V> example.com
            </Cmd>
            <Cmd> </Cmd>
            <Comment># SSL Labs (online)</Comment>
            <Cmd>
              <F>https://www.ssllabs.com/ssltest/</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <InfoBox>
            Cel: <b>SSL Labs grade A+</b>. Wszystko ponizej A wymaga poprawy
            konfiguracji.
          </InfoBox>
        </Card>

        {/* === Bledy === */}
        <Card title="Najczestsze bledy" color="var(--c-orange)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>NET::ERR_CERT_DATE_INVALID</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Certyfikat wygasl. Sprawdz{' '}
                <code className="text-xs">certbot renew</code> i timer.
              </p>
            </div>
            <div>
              <SectionLabel>NET::ERR_CERT_AUTHORITY_INVALID</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Brak intermediate w lancuchu. Uzyj{' '}
                <code className="text-xs">fullchain.pem</code>, nie{' '}
                <code className="text-xs">cert.pem</code>.
              </p>
            </div>
            <div>
              <SectionLabel>NET::ERR_CERT_COMMON_NAME_INVALID</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Domena nie pasuje do CN/SAN w certyfikacie.
              </p>
            </div>
            <div>
              <SectionLabel>SSL_ERROR_NO_CYPHER_OVERLAP</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Klient i serwer nie maja wspolnego ciphera. Sprawdz{' '}
                <code className="text-xs">ssl_protocols</code>.
              </p>
            </div>
            <div>
              <SectionLabel>Mixed content</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Strona po HTTPS, ale ladowane skrypty/obrazy po HTTP. Konsola
                pokaze warning. Naprawic w aplikacji.
              </p>
            </div>
            <div>
              <SectionLabel>Rate limit Lets Encrypt</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Max 5 certyfikatow/tydzien dla domeny. Test najpierw na{' '}
                <code className="text-xs">--staging</code>.
              </p>
            </div>
          </div>
        </Card>

        {/* === Slownik === */}
        <Card title="Slownik" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <SectionLabel>CA (Certificate Authority)</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Zaufana strona wystawiajaca certyfikaty. Lets Encrypt, DigiCert,
                GlobalSign.
              </p>
            </div>
            <div>
              <SectionLabel>CSR (Certificate Signing Request)</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Plik z prosba do CA o wystawienie certyfikatu (zawiera klucz
                publiczny i dane domeny).
              </p>
            </div>
            <div>
              <SectionLabel>SAN (Subject Alternative Name)</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Lista alternatywnych domen w certyfikacie.
              </p>
            </div>
            <div>
              <SectionLabel>SNI (Server Name Indication)</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Klient w handshake wysyla nazwe hosta — serwer wybiera wlasciwy
                certyfikat (jeden IP, wiele domen).
              </p>
            </div>
            <div>
              <SectionLabel>OCSP / OCSP Stapling</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Mechanizm sprawdzania czy certyfikat nie zostal odwolany.
                Stapling — serwer sam dolacza odpowiedz.
              </p>
            </div>
            <div>
              <SectionLabel>HSTS</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                HTTP Strict-Transport-Security — naglowek wymuszajacy HTTPS w
                przegladarce na X dni.
              </p>
            </div>
            <div>
              <SectionLabel>ACME</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Automatic Certificate Management Environment — protokol Lets
                Encrypt do automatycznego wystawiania.
              </p>
            </div>
            <div>
              <SectionLabel>PEM / DER</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Formaty certyfikatow. PEM = base64 (tekstowy), DER = binarny.
              </p>
            </div>
            <div>
              <SectionLabel>Forward Secrecy</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Wlasnosc TLS — nawet jesli klucz serwera wycieknie, stare sesje
                pozostaja niedeszyfrowalne.
              </p>
            </div>
          </div>
        </Card>

        {/* === Kryteria === */}
        <Card title="Kryteria oceny" color="var(--c-accent)">
          <Row code="1">Wystawiony self-signed cert via openssl</Row>
          <Row code="2">Strona dziala po HTTPS w nginx (cert + key)</Row>
          <Row code="3">Lets Encrypt cert via certbot</Row>
          <Row code="4">Redirect 80 → 443 i HSTS skonfigurowane</Row>
          <Row code="5">SSL Labs grade A lub A+</Row>
        </Card>

        {/* === Dokumentacja === */}
        <Card title="Dokumentacja" color="var(--c-purple)">
          <ul className="text-[11px] text-[var(--c-muted)] space-y-1">
            <li>
              <a
                href="https://letsencrypt.org/getting-started/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Lets Encrypt — Getting Started
              </a>
            </li>
            <li>
              <a
                href="https://certbot.eff.org/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                certbot
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
                href="https://www.ssllabs.com/ssltest/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                SSL Labs Server Test
              </a>
            </li>
            <li>
              <a
                href="https://datatracker.ietf.org/doc/html/rfc8446"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                RFC 8446 — TLS 1.3
              </a>
            </li>
          </ul>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/14', label: '14 — Testowanie WWW' }}
        next={{ to: '/lessons/16', label: '16 — Bazy danych cz. 1' }}
      />
    </div>
  );
}
