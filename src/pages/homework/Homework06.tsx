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
import Divider from '../../components/Divider';
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

export default function Homework06() {
  usePageTitle('Homework 06');

  return (
    <div>
      <PageHeader
        title="Homework 06 — DNS i Domeny"
        subtitle="Diagnostyka DNS, analiza polaczen, CORS"
        color="var(--c-purple)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Zadanie 1 */}
        <Card
          title="1. Podstawowa diagnostyka aplikacji webowej"
          color="var(--c-purple)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Uzytkownik zglasza: "Strona nie dziala". Stworz plan diagnostyczny i
            przetestuj go na dowolnej stronie internetowej: sprawdz dostepnosc,
            DNS, odpowiedz HTTP i czasy odpowiedzi.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — sprawdz dostepnosc (ping)</SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Czy serwer odpowiada na ICMP?</Comment>
              <Cmd>
                ping <H>-c 4</H> <V>google.com</V>
              </Cmd>
              <Comment># Jesli odpowiada — siec dziala, problem wyzej</Comment>
              <Comment>
                # Jesli nie — problem z siecia lub serwer blokuje ICMP
              </Comment>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — sprawdz DNS (dig)
            </SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Czy domena rozwiazuje sie na adres IP?</Comment>
              <Cmd>
                dig <V>google.com</V>
              </Cmd>
              <Comment>
                # Szukaj sekcji ANSWER — rekordy A z adresami IP
              </Comment>
              <Cmd> </Cmd>
              <Comment># Krotka wersja — tylko odpowiedz:</Comment>
              <Cmd>
                dig <H>+short</H> <V>google.com</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — sprawdz z konkretnym serwerem DNS
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Uzyj Google DNS (8.8.8.8) do weryfikacji:</Comment>
              <Cmd>
                nslookup <V>google.com</V> <V>8.8.8.8</V>
              </Cmd>
              <Comment>
                # Jesli tu dziala, a lokalnie nie — problem z lokalnym DNS
              </Comment>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — analiza czasow odpowiedzi HTTP
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Szczegolowa analiza czasow:</Comment>
              <Cmd>
                curl <H>-v -o /dev/null -w</H>{' '}
                <V>
                  "DNS: %{'{{'}time_namelookup{'}'}s\nConnect: %{'{{'}
                  time_connect{'}'}s\nTTFB: %{'{{'}time_starttransfer{'}'}
                  s\nTotal: %{'{{'}time_total{'}'}s\n"
                </V>{' '}
                <V>https://google.com</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># DNS — czas rozwiazywania domeny</Comment>
              <Comment># Connect — czas nawiazania polaczenia TCP</Comment>
              <Comment># TTFB — czas do pierwszego bajtu odpowiedzi</Comment>
              <Comment># Total — calkowity czas zadania</Comment>
            </ExampleBlock>

            <InfoBox>
              Diagnostyka "strona nie dziala" to 4 warstwy: (1) siec (ping), (2)
              DNS (dig/nslookup), (3) HTTP (curl), (4) czasy odpowiedzi. Jesli
              DNS jest wolny ({'>'}100ms), sprawdz konfiguracje resolvera w{' '}
              <code className="text-xs">/etc/resolv.conf</code>.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 2 */}
        <Card title="2. Analiza polaczen sieciowych" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Znajdz wszystkie procesy nasluchujace na portach, okresl ktore
            programy maja aktywne polaczenia i napisz krotki raport.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — porty nasluchujace</SectionLabel>
            <ExampleBlock variant="default">
              <Comment>
                # Pokaz wszystkie nasluchujace porty TCP z procesami:
              </Comment>
              <Cmd>
                ss <H>-tlnp</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Flagi:</Comment>
              <Comment>
                # -t = TCP, -l = listening, -n = numeryczne, -p = procesy
              </Comment>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — aktywne polaczenia
            </SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Wszystkie nawiazane polaczenia TCP:</Comment>
              <Cmd>
                ss <H>-tnp</H> state <V>established</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — format raportu
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># === RAPORT POLACZEN SIECIOWYCH ===</Comment>
              <Comment># Data: 2026-03-23</Comment>
              <Comment># </Comment>
              <Comment># --- NASLUCHUJACE PORTY ---</Comment>
              <Comment># Port 22 | sshd | SSH</Comment>
              <Comment># Port 80 | nginx | HTTP</Comment>
              <Comment># Port 443 | nginx | HTTPS</Comment>
              <Comment># Port 3000 | node | Aplikacja</Comment>
              <Comment># Port 5432 | postgres | Baza danych</Comment>
              <Comment># </Comment>
              <Comment># --- AKTYWNE POLACZENIA ---</Comment>
              <Comment>
                # 192.168.1.5:52431 {'<->'} 142.250.186.78:443 (chrome)
              </Comment>
              <Comment>
                # 192.168.1.5:38210 {'<->'} 151.101.1.69:443 (curl)
              </Comment>
            </ExampleBlock>

            <InfoBox>
              <code className="text-xs">ss</code> to nowoczesna alternatywa dla{' '}
              <code className="text-xs">netstat</code>. Warto zwrocic uwage na
              porty baz danych (3306, 5432, 27017) — nie powinny byc dostepne z
              zewnatrz. Sprawdz czy nasluchuja na{' '}
              <code className="text-xs">127.0.0.1</code> a nie{' '}
              <code className="text-xs">0.0.0.0</code>.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 3 — Challenge: CORS */}
        <Card title="3. Konfiguracja CORS w Express" color="var(--c-orange)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,107,53,0.15)] text-[var(--c-orange)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Skonfiguruj prosty backend Express z CORS, stworz frontend z fetch
            ktory wywola CORS, a nastepnie zdebuguj preflight request przy
            uzyciu curl.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — backend Express z CORS</SectionLabel>
            <ExampleBlock variant="default">
              <Comment># server.js</Comment>
              <Cmd>
                const express = <H>require</H>(<V>'express'</V>);
              </Cmd>
              <Cmd>
                const cors = <H>require</H>(<V>'cors'</V>);
              </Cmd>
              <Cmd>const app = express();</Cmd>
              <Cmd> </Cmd>
              <Comment>
                # Konfiguracja CORS — pozwol na requesty z localhost:5173
              </Comment>
              <Cmd>app.use(cors({'{{'}</Cmd>
              <Cmd>
                {'  '}origin: <V>'http://localhost:5173'</V>,
              </Cmd>
              <Cmd>
                {'  '}methods: [<V>'GET'</V>, <V>'POST'</V>],
              </Cmd>
              <Cmd>
                {'  '}allowedHeaders: [<V>'Content-Type'</V>,{' '}
                <V>'Authorization'</V>],
              </Cmd>
              <Cmd>{'}'}));</Cmd>
              <Cmd> </Cmd>
              <Cmd>
                app.get(<V>'/api/data'</V>, (req, res) ={'>'} {'{{'}
              </Cmd>
              <Cmd>
                {'  '}res.json({'{{ '}message: <V>'Hello from API!'</V>
                {' }}'});
              </Cmd>
              <Cmd>{'}'});</Cmd>
              <Cmd> </Cmd>
              <Cmd>
                app.listen(<V>3001</V>, () ={'>'} console.log(
                <V>'API on :3001'</V>));
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — frontend fetch (wywola CORS)
            </SectionLabel>
            <ExampleBlock variant="default">
              <Comment>{'// W aplikacji React (port 5173):'}</Comment>
              <Cmd>
                fetch(<V>'http://localhost:3001/api/data'</V>, {'{{'}
              </Cmd>
              <Cmd>
                {'  '}headers: {'{{ '}
                <V>'Content-Type'</V>: <V>'application/json'</V>
                {' }}'}
              </Cmd>
              <Cmd>{'}'})</Cmd>
              <Cmd>
                {'  '}.then(res ={'>'} res.json())
              </Cmd>
              <Cmd>
                {'  '}.then(data ={'>'} console.log(data));
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — debug preflight z curl
            </SectionLabel>
            <ExampleBlock variant="orange">
              <Comment># Symuluj preflight request (OPTIONS):</Comment>
              <Cmd>
                curl <H>-X OPTIONS</H> <V>http://localhost:3001/api/data</V> \
              </Cmd>
              <Cmd>
                {'  '}
                <H>-H</H> <V>"Origin: http://localhost:5173"</V> \
              </Cmd>
              <Cmd>
                {'  '}
                <H>-H</H> <V>"Access-Control-Request-Method: POST"</V> \
              </Cmd>
              <Cmd>
                {'  '}
                <H>-H</H> <V>"Access-Control-Request-Headers: Content-Type"</V>{' '}
                \
              </Cmd>
              <Cmd>
                {'  '}
                <H>-v</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Szukaj w odpowiedzi naglowkow:</Comment>
              <Comment>
                # Access-Control-Allow-Origin: http://localhost:5173
              </Comment>
              <Comment># Access-Control-Allow-Methods: GET,POST</Comment>
              <Comment>
                # Access-Control-Allow-Headers: Content-Type,Authorization
              </Comment>
            </ExampleBlock>

            <InfoBox>
              CORS preflight (OPTIONS) jest wysylany automatycznie przez
              przegladarke gdy request ma niestandardowe naglowki (np.{' '}
              <code className="text-xs">Content-Type: application/json</code>).
              Jesli backend nie odpowie poprawnie na OPTIONS, przegladarka
              zablokuje wlasciwy request. Curl omija CORS — dlatego "w curl
              dziala, w przegladarce nie".
            </InfoBox>
          </Spoiler>
        </Card>

        <Divider />

        {/* Zadanie 4 — Challenge: Skrypt DNS */}
        <Card title="4. Skrypt diagnostyki DNS" color="var(--c-yellow)" full>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,209,102,0.15)] text-[var(--c-yellow)] font-bold">
              CHALLENGE — SKRYPT
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz skrypt bash ktory przyjmuje domene jako argument i wykonuje
            pelna diagnostyke DNS: rekordy A, MX, TXT, CNAME oraz trace.
          </p>
          <Spoiler title="Pokaz pelny skrypt">
            <SectionLabel>Skrypt: dns-diag.sh</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Comment># dns-diag.sh — Pelna diagnostyka DNS domeny</Comment>
              <Comment># Uzycie: ./dns-diag.sh example.com</Comment>
              <Cmd> </Cmd>
              <Cmd>
                DOMAIN=<V>$1</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                if [ -z <V>"$DOMAIN"</V> ]; then
              </Cmd>
              <Cmd>
                {'  '}echo{' '}
                <V>
                  "Uzycie: $0 {'<'}domena{'>'}"
                </V>
              </Cmd>
              <Cmd>{'  '}exit 1</Cmd>
              <Cmd>fi</Cmd>
              <Cmd> </Cmd>
              <Cmd>
                echo <V>"=== DIAGNOSTYKA DNS: $DOMAIN ==="</V>
              </Cmd>
              <Cmd>
                echo <V>"Data: $(date)"</V>
              </Cmd>
              <Cmd>
                echo <V>""</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 1. Rekordy A (adresy IPv4)</Comment>
              <Cmd>
                echo <V>"--- REKORDY A ---"</V>
              </Cmd>
              <Cmd>
                dig <H>+short</H> <V>$DOMAIN</V> <H>A</H>
              </Cmd>
              <Cmd>
                echo <V>""</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 2. Rekordy MX (serwery pocztowe)</Comment>
              <Cmd>
                echo <V>"--- REKORDY MX ---"</V>
              </Cmd>
              <Cmd>
                dig <H>+short</H> <V>$DOMAIN</V> <H>MX</H>
              </Cmd>
              <Cmd>
                echo <V>""</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 3. Rekordy TXT (SPF, DKIM, weryfikacja)</Comment>
              <Cmd>
                echo <V>"--- REKORDY TXT ---"</V>
              </Cmd>
              <Cmd>
                dig <H>+short</H> <V>$DOMAIN</V> <H>TXT</H>
              </Cmd>
              <Cmd>
                echo <V>""</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 4. Rekordy CNAME (aliasy)</Comment>
              <Cmd>
                echo <V>"--- REKORDY CNAME ---"</V>
              </Cmd>
              <Cmd>
                dig <H>+short</H> <V>$DOMAIN</V> <H>CNAME</H>
              </Cmd>
              <Cmd>
                echo <V>""</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 5. Rekordy NS (serwery nazw)</Comment>
              <Cmd>
                echo <V>"--- SERWERY NS ---"</V>
              </Cmd>
              <Cmd>
                dig <H>+short</H> <V>$DOMAIN</V> <H>NS</H>
              </Cmd>
              <Cmd>
                echo <V>""</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 6. Pelne trace — sciezka rozwiazywania DNS</Comment>
              <Cmd>
                echo <V>"--- DNS TRACE ---"</V>
              </Cmd>
              <Cmd>
                dig <V>$DOMAIN</V> <H>+trace</H>
              </Cmd>
              <Cmd>
                echo <V>""</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 7. Porownanie z roznymi serwerami DNS</Comment>
              <Cmd>
                echo <V>"--- POROWNANIE SERWEROW DNS ---"</V>
              </Cmd>
              <Cmd>for dns in 8.8.8.8 1.1.1.1 9.9.9.9; do</Cmd>
              <Cmd>
                {'  '}RESULT=$(dig <H>+short</H> @<V>$dns</V> <V>$DOMAIN</V>{' '}
                <H>A</H>)
              </Cmd>
              <Cmd>
                {'  '}echo <V>"$dns: $RESULT"</V>
              </Cmd>
              <Cmd>done</Cmd>
              <Cmd>
                echo <V>""</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 8. Czas rozwiazywania DNS</Comment>
              <Cmd>
                echo <V>"--- CZAS ROZWIAZYWANIA ---"</V>
              </Cmd>
              <Cmd>
                dig <V>$DOMAIN</V> | grep <V>"Query time"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                echo <V>""</V>
              </Cmd>
              <Cmd>
                echo <V>"=== KONIEC DIAGNOSTYKI ==="</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-3">Uruchomienie skryptu</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                chmod +x <F>dns-diag.sh</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Diagnostyka domeny:</Comment>
              <Cmd>
                ./<F>dns-diag.sh</F> <V>google.com</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Zapisz wynik do pliku:</Comment>
              <Cmd>
                ./<F>dns-diag.sh</F> <V>example.com</V> {'>'}{' '}
                <F>dns-report.txt</F>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              <code className="text-xs">dig +trace</code> pokazuje cala sciezke
              rozwiazywania DNS — od root serwerow, przez TLD (.com), az do
              autorytywnego serwera domeny. Rekordy MX sa potrzebne do
              dostarczania poczty, TXT czesto zawieraja SPF/DKIM (weryfikacja
              email) i tokeny weryfikacji (Google, Let's Encrypt).
            </InfoBox>
          </Spoiler>
        </Card>
      </div>

      <LessonNav prev={{ to: '/lessons/06', label: '06 — DNS i Domeny' }} />
    </div>
  );
}
