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

export default function Homework05() {
  usePageTitle('Homework 05');

  return (
    <div>
      <PageHeader
        title="Homework 05 — Podstawy sieci"
        subtitle="Scenariusz: Detektyw w swiecie sieci · badanie, konflikty portow, mapa polaczen"
        color="var(--c-blue)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Zadanie 1 */}
        <Card title="1. Badanie sieci" color="var(--c-blue)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Uruchom prosty serwer internetowy (Flask). Sprawdz na jakim adresie
            IP dziala, ktore urzadzenia moga sie z nim polaczyc, a ktore nie i
            dlaczego. Porownaj wyniki dla <code>localhost</code> i adresu IP.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — stworzenie serwera Flask</SectionLabel>
            <ExampleBlock variant="default">
              <Comment># server.py</Comment>
              <Cmd>
                from flask <H>import</H> Flask
              </Cmd>
              <Cmd>
                app = Flask(<V>__name__</V>)
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                <H>@app.route</H>(<V>'/'</V>)
              </Cmd>
              <Cmd>def hello():</Cmd>
              <Cmd>
                {'    '}return <V>"Gratulacje! Znalazles serwer!"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                if __name__ == <V>'__main__'</V>:
              </Cmd>
              <Cmd>
                {'    '}app.run(host=<V>'0.0.0.0'</V>, port=<V>8080</V>)
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — instalacja i uruchomienie
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                pip install <V>flask</V>
              </Cmd>
              <Cmd>
                python <F>server.py</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — sprawdzanie polaczenia
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Z tego samego komputera:</Comment>
              <Cmd>
                curl <V>localhost:8080</V>
              </Cmd>
              <Comment># Powinno dzialac</Comment>
              <Cmd> </Cmd>
              <Comment># Przez adres IP:</Comment>
              <Cmd>
                curl <V>192.168.1.X:8080</V>
              </Cmd>
              <Comment># Powinno dzialac (host=0.0.0.0)</Comment>
              <Cmd> </Cmd>
              <Comment># Z innego urzadzenia w sieci lokalnej:</Comment>
              <Cmd>
                curl <V>192.168.1.X:8080</V>
              </Cmd>
              <Comment># Dziala jesli firewall przepuszcza port 8080</Comment>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — sprawdz adres IP serwera
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                ifconfig <Comment># Linux/Mac</Comment>
              </Cmd>
              <Cmd>
                ip addr show <Comment># nowsze Linuxy</Comment>
              </Cmd>
              <Cmd>
                ipconfig <Comment># Windows</Comment>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Kluczowa roznica:{' '}
              <code className="text-xs">host='127.0.0.1'</code> = serwer
              dostepny TYLKO lokalnie.{' '}
              <code className="text-xs">host='0.0.0.0'</code> = serwer
              nasluchuje na wszystkich interfejsach sieciowych (dostepny z sieci
              lokalnej). Jesli urzadzenie z sieci nie moze sie polaczyc, sprawdz
              firewall: <code className="text-xs">sudo ufw status</code>.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 2 */}
        <Card title='2. "Bitwa portow"' color="var(--c-blue)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Uruchom serwer z zadania 1 na porcie 8080. Nastepnie sprobuj
            uruchomic drugi serwer (Python HTTP) na tym samym porcie. Znajdz i
            rozwiaz konflikt.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — uruchom pierwszy serwer</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                python <F>server.py</F>
              </Cmd>
              <Comment># Serwer Flask na porcie 8080</Comment>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — drugi serwer (ten sam port)
            </SectionLabel>
            <ExampleBlock variant="default">
              <Comment># server2.py</Comment>
              <Cmd>
                from http.server <H>import</H> HTTPServer,
                SimpleHTTPRequestHandler
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                def run(port=<V>8080</V>):
              </Cmd>
              <Cmd>
                {'    '}server_address = (<V>''</V>, port)
              </Cmd>
              <Cmd>
                {'    '}httpd = HTTPServer(server_address,
                SimpleHTTPRequestHandler)
              </Cmd>
              <Cmd>
                {'    '}print(f
                <V>
                  'Uruchamianie drugiego serwera na porcie {'{'}port{'}'}'
                </V>
                )
              </Cmd>
              <Cmd>{'    '}httpd.serve_forever()</Cmd>
              <Cmd> </Cmd>
              <Cmd>run()</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — blad konfliktu portow
            </SectionLabel>
            <ExampleBlock variant="orange">
              <Cmd>
                python <F>server2.py</F>
              </Cmd>
              <Comment># OSError: [Errno 98] Address already in use</Comment>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — diagnostyka i rozwiazanie
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Znajdz co uzywa portu 8080:</Comment>
              <Cmd>
                lsof <H>-i</H> <V>:8080</V>
              </Cmd>
              <Comment># lub</Comment>
              <Cmd>
                ss <H>-tlnp</H> | grep <V>8080</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Opcja A: Zakoncz pierwszy serwer</Comment>
              <Cmd>
                kill <V>$(lsof -t -i:8080)</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Opcja B: Zmien port drugiego serwera</Comment>
              <Comment># W server2.py: run(port=8081)</Comment>
            </ExampleBlock>

            <InfoBox>
              <code className="text-xs">lsof -i :8080</code> pokazuje proces
              uzywajacy portu 8080.{' '}
              <code className="text-xs">lsof -t -i:8080</code> zwraca sam PID
              (przydatne w skryptach). <code className="text-xs">ss -tlnp</code>{' '}
              to nowoczesna alternatywa dla{' '}
              <code className="text-xs">netstat</code>.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 3 */}
        <Card title='3. "Mapa polaczen sieciowych"' color="var(--c-blue)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Zbadaj jakie polaczenia sieciowe sa aktywne na Twoim komputerze.
            Otworz przegladarke, wejdz na kilka stron, a nastepnie uzyj{' '}
            <code>netstat</code> lub <code>ss</code> aby je znalezc. Okresl
            ktore porty sa uzywane do polaczen HTTPS.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — wyswietl aktywne polaczenia</SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Wszystkie aktywne polaczenia TCP:</Comment>
              <Cmd>
                ss <H>-tn</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Tylko polaczenia ESTABLISHED:</Comment>
              <Cmd>
                ss <H>-tn</H> state <V>established</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Z nazwa procesu:</Comment>
              <Cmd>
                ss <H>-tnp</H>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — filtruj polaczenia HTTPS (port 443)
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                ss <H>-tn</H> | grep <V>:443</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Lub z netstat:</Comment>
              <Cmd>
                netstat <H>-an</H> | grep <V>:443</V> | grep <V>ESTABLISHED</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — sporzadz raport
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Format raportu dla kazdego polaczenia:</Comment>
              <Cmd> </Cmd>
              <Comment># Polaczenie 1:</Comment>
              <Comment># - Lokalny adres i port: 192.168.1.5:52431</Comment>
              <Comment># - Zdalny adres i port: 142.250.186.78:443</Comment>
              <Comment># - Stan: ESTABLISHED</Comment>
              <Comment># - Proces: Chrome</Comment>
            </ExampleBlock>

            <InfoBox>
              Port <strong>443</strong> = HTTPS. Jesli widzisz polaczenia na
              porcie 443, to sa zabezpieczone polaczenia do stron WWW.{' '}
              <code className="text-xs">ss</code> jest szybszy i nowszy niz{' '}
              <code className="text-xs">netstat</code>. Flagi:{' '}
              <code className="text-xs">-t</code> = TCP,{' '}
              <code className="text-xs">-n</code> = numeryczne adresy,{' '}
              <code className="text-xs">-p</code> = pokaz procesy.
            </InfoBox>
          </Spoiler>
        </Card>

        <Divider />

        {/* Skrypt do wrzucenia na serwer */}
        <Card
          title="4. Skrypt: Automatyczne sprawdzanie dostepnosci serwera"
          color="var(--c-yellow)"
          full
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,209,102,0.15)] text-[var(--c-yellow)] font-bold">
              BONUS — SKRYPT NA SERWER
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Skrypt diagnostyczny do wrzucenia na serwer — sprawdza porty,
            polaczenia, dostepnosc uslug i generuje raport.
          </p>
          <Spoiler title="Pokaz pelny skrypt + komendy">
            <SectionLabel>Skrypt: network-check.sh</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Comment>
                # network-check.sh — Diagnostyka sieciowa serwera
              </Comment>
              <Comment>
                # Uzycie: chmod +x network-check.sh && ./network-check.sh
              </Comment>
              <Cmd> </Cmd>
              <Cmd>
                LOG=<F>/tmp/network-report-$(date +%Y%m%d-%H%M%S).txt</F>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                echo <V>"=== RAPORT SIECIOWY ==="</V> | tee <F>$LOG</F>
              </Cmd>
              <Cmd>
                echo <V>"Data: $(date)"</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>
                echo <V>""</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 1. Adresy IP serwera</Comment>
              <Cmd>
                echo <V>"--- ADRESY IP ---"</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>
                ip addr show | grep <V>"inet "</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>
                echo <V>""</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 2. Publiczny IP</Comment>
              <Cmd>
                echo <V>"--- PUBLICZNY IP ---"</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>
                curl -s <V>ifconfig.me</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>
                echo <V>""</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 3. Otwarte porty (nasluchujace)</Comment>
              <Cmd>
                echo <V>"--- OTWARTE PORTY ---"</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>
                ss -tlnp | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>
                echo <V>""</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 4. Aktywne polaczenia</Comment>
              <Cmd>
                echo <V>"--- AKTYWNE POLACZENIA ---"</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>
                ss -tn state established | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>
                echo <V>""</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 5. Test lacznosci</Comment>
              <Cmd>
                echo <V>"--- TEST LACZNOSCI ---"</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>for host in google.com 8.8.8.8 1.1.1.1; do</Cmd>
              <Cmd>
                {'  '}if ping -c 1 -W 2 <V>$host</V> &gt;/dev/null 2&gt;&amp;1;
                then
              </Cmd>
              <Cmd>
                {'    '}echo <V>"OK: $host"</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>{'  '}else</Cmd>
              <Cmd>
                {'    '}echo <V>"FAIL: $host"</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>{'  '}fi</Cmd>
              <Cmd>done</Cmd>
              <Cmd>
                echo <V>""</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 6. Sprawdz kluczowe uslugi</Comment>
              <Cmd>
                echo <V>"--- STATUS USLUG ---"</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>
                for svc in nginx apache2 sshd postgresql mysql redis-server; do
              </Cmd>
              <Cmd>
                {'  '}if systemctl is-active --quiet <V>$svc</V> 2&gt;/dev/null;
                then
              </Cmd>
              <Cmd>
                {'    '}echo <V>"ACTIVE: $svc"</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>{'  '}else</Cmd>
              <Cmd>
                {'    '}echo <V>"INACTIVE: $svc"</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>{'  '}fi</Cmd>
              <Cmd>done</Cmd>
              <Cmd>
                echo <V>""</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 7. Firewall</Comment>
              <Cmd>
                echo <V>"--- FIREWALL ---"</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>
                sudo ufw status 2&gt;/dev/null || sudo iptables -L -n
                2&gt;/dev/null | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                echo <V>""</V> | tee -a <F>$LOG</F>
              </Cmd>
              <Cmd>
                echo <V>"Raport zapisany: $LOG"</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-3">
              Komendy — wrzucenie na serwer
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># 1. Skopiuj skrypt na serwer przez SCP:</Comment>
              <Cmd>
                scp <F>network-check.sh</F> <V>user@IP_SERWERA</V>:<F>~/</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 2. Zaloguj sie na serwer:</Comment>
              <Cmd>
                ssh <V>user@IP_SERWERA</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 3. Nadaj uprawnienia i uruchom:</Comment>
              <Cmd>
                chmod +x <F>~/network-check.sh</F>
              </Cmd>
              <Cmd>
                sudo ./<F>network-check.sh</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># 4. Obejrzyj raport:</Comment>
              <Cmd>
                cat <F>/tmp/network-report-*.txt</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-3">
              Alternatywa: wrzucenie jednolinijkowe
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Skopiuj + uruchom jednym poleceniem:</Comment>
              <Cmd>
                scp <F>network-check.sh</F> <V>user@IP</V>:<F>~/</F> {'&&'} ssh{' '}
                <V>user@IP</V>{' '}
                <V>"chmod +x ~/network-check.sh && sudo ~/network-check.sh"</V>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              <code className="text-xs">scp</code> kopiuje pliki przez SSH.{' '}
              <code className="text-xs">tee -a</code> wyswietla output na
              ekranie i dopisuje do pliku jednoczesnie. Skrypt sprawdza: adresy
              IP, otwarte porty, lacznosc, status uslug i firewall.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 5 — Challenge: Analiza bezpieczenstwa */}
        <Card
          title="5. Analiza bezpieczenstwa otwartych portow"
          color="var(--c-orange)"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,107,53,0.15)] text-[var(--c-orange)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Przeskanuj otwarte porty na swoim serwerze i oceń ktore z nich
            powinny byc zamkniete lub ograniczone firewallem.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Krok 1 — skanowanie portow</SectionLabel>
            <ExampleBlock variant="orange">
              <Comment># Wszystkie nasluchujace porty:</Comment>
              <Cmd>
                ss <H>-tlnp</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Lub z nmap (jesli zainstalowany):</Comment>
              <Cmd>
                sudo nmap <H>-sT</H> <V>localhost</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — zamknij niepotrzebne porty
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Wlacz firewall:</Comment>
              <Cmd>
                sudo ufw <H>enable</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Zezwol tylko na potrzebne porty:</Comment>
              <Cmd>
                sudo ufw allow <V>22/tcp</V>
              </Cmd>
              <Comment># SSH</Comment>
              <Cmd>
                sudo ufw allow <V>80/tcp</V>
              </Cmd>
              <Comment># HTTP</Comment>
              <Cmd>
                sudo ufw allow <V>443/tcp</V>
              </Cmd>
              <Comment># HTTPS</Comment>
              <Cmd> </Cmd>
              <Comment># Sprawdz reguly:</Comment>
              <Cmd>
                sudo ufw status <H>verbose</H>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Zasada: otwieraj tylko te porty, ktore sa absolutnie potrzebne.
              Bazy danych (3306, 5432, 27017, 6379) NIE powinny byc dostepne z
              internetu — nasluchuj na{' '}
              <code className="text-xs">127.0.0.1</code>.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 6 — Challenge: Monitoring */}
        <Card title="6. Skrypt monitoringu dostepnosci" color="var(--c-orange)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,107,53,0.15)] text-[var(--c-orange)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz skrypt ktory co 30 sekund sprawdza czy serwer HTTP odpowiada
            i loguje wynik. Jesli serwer nie odpowiada — probuje go
            zrestartowac.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Skrypt: http-watchdog.sh</SectionLabel>
            <ExampleBlock variant="orange">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Comment># http-watchdog.sh</Comment>
              <Cmd>
                URL=<V>"http://localhost:8080"</V>
              </Cmd>
              <Cmd>
                SERVICE=<V>"nginx"</V>
              </Cmd>
              <Cmd>
                LOG=<F>/var/log/http-watchdog.log</F>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>while true; do</Cmd>
              <Cmd>
                {'  '}HTTP_CODE=$(curl -s -o /dev/null -w{' '}
                <V>
                  "%{'{'}
                  {'{'}http_code{'}'}
                  {'}'}"
                </V>{' '}
                <V>$URL</V>)
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                {'  '}if [ <V>"$HTTP_CODE"</V> -eq <V>200</V> ]; then
              </Cmd>
              <Cmd>
                {'    '}echo <V>"$(date) OK [$HTTP_CODE]"</V> {'>>'} <F>$LOG</F>
              </Cmd>
              <Cmd>{'  '}else</Cmd>
              <Cmd>
                {'    '}echo{' '}
                <V>"$(date) FAIL [$HTTP_CODE] — restarting $SERVICE"</V> {'>>'}{' '}
                <F>$LOG</F>
              </Cmd>
              <Cmd>
                {'    '}sudo systemctl restart <V>$SERVICE</V>
              </Cmd>
              <Cmd>{'  '}fi</Cmd>
              <Cmd> </Cmd>
              <Cmd>{'  '}sleep 30</Cmd>
              <Cmd>done</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Wrzucenie na serwer + uruchomienie
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Kopiuj i uruchom:</Comment>
              <Cmd>
                scp <F>http-watchdog.sh</F> <V>user@IP</V>:<F>~/</F>
              </Cmd>
              <Cmd>
                ssh <V>user@IP</V>
              </Cmd>
              <Cmd>
                chmod +x <F>http-watchdog.sh</F>
              </Cmd>
              <Cmd>
                sudo cp <F>http-watchdog.sh</F> <F>/usr/local/bin/</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Uruchom w tle z nohup:</Comment>
              <Cmd>
                sudo nohup /usr/local/bin/<F>http-watchdog.sh</F> &amp;
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Sprawdz logi:</Comment>
              <Cmd>
                tail -f <F>/var/log/http-watchdog.log</F>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              <code className="text-xs">
                curl -s -o /dev/null -w "%{'{{'}http_code{'}}'}"
              </code>{' '}
              zwraca sam kod HTTP (200, 404, 502...).{' '}
              <code className="text-xs">nohup</code> sprawia ze skrypt dziala
              nawet po wylogowaniu z SSH. Lepsze rozwiazanie produkcyjne:
              stworzenie uslugi systemd + timer (jak w homework 04, zadanie 10).
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Podsumowanie komend */}
        <Card title="Sciaga: Komendy diagnostyczne" color="var(--c-green)" full>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <SectionLabel>Adresy IP</SectionLabel>
              <ExampleBlock variant="green">
                <Cmd>
                  ip addr show <Comment># adresy lokalne</Comment>
                </Cmd>
                <Cmd>
                  curl ifconfig.me <Comment># publiczny IP</Comment>
                </Cmd>
                <Cmd>
                  hostname -I <Comment># szybki IP</Comment>
                </Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>Porty i polaczenia</SectionLabel>
              <ExampleBlock variant="green">
                <Cmd>
                  ss -tlnp <Comment># nasluchujace porty</Comment>
                </Cmd>
                <Cmd>
                  ss -tn <Comment># aktywne polaczenia</Comment>
                </Cmd>
                <Cmd>
                  lsof -i :PORT <Comment># co uzywa portu</Comment>
                </Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>Lacznosc</SectionLabel>
              <ExampleBlock variant="green">
                <Cmd>
                  ping HOST <Comment># test ICMP</Comment>
                </Cmd>
                <Cmd>
                  curl -v URL <Comment># test HTTP</Comment>
                </Cmd>
                <Cmd>
                  traceroute HOST <Comment># trasa pakietu</Comment>
                </Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>Firewall</SectionLabel>
              <ExampleBlock variant="green">
                <Cmd>
                  sudo ufw status <Comment># stan firewalla</Comment>
                </Cmd>
                <Cmd>
                  sudo ufw allow PORT <Comment># otworz port</Comment>
                </Cmd>
                <Cmd>
                  sudo ufw deny PORT <Comment># zamknij port</Comment>
                </Cmd>
              </ExampleBlock>
            </div>
          </div>
        </Card>
      </div>

      <LessonNav prev={{ to: '/lessons/05', label: '05 — Podstawy sieci' }} />
    </div>
  );
}
