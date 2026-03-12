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

export default function Homework04() {
  usePageTitle('Homework 04');

  return (
    <div>
      <PageHeader
        title="Homework 04 — Procesy i Usługi"
        subtitle="Rozwiązania krok po kroku · zadania proste + challenge"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Zadanie 1 */}
        <Card title="1. Status usług" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Użyj <code>systemctl</code>, aby sprawdzić czy usługa{' '}
            <code>cron</code> jest aktywna (active) i włączona na stałe
            (enabled).
          </p>
          <Spoiler title="Pokaż rozwiązanie">
            <SectionLabel>Krok 1 — status usługi</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                systemctl <H>status</H> <V>cron</V>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 2 — sprawdź poszczególne stany
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                systemctl <H>is-active</H> <V>cron</V>
              </Cmd>
              <Comment># active</Comment>
              <Cmd>
                systemctl <H>is-enabled</H> <V>cron</V>
              </Cmd>
              <Comment># enabled</Comment>
            </ExampleBlock>
            <InfoBox>
              Na CentOS/RHEL usługa nazywa się{' '}
              <code className="text-xs">crond</code> zamiast{' '}
              <code className="text-xs">cron</code>.{' '}
              <code className="text-xs">is-active</code> zwraca "active" lub
              "inactive", <code className="text-xs">is-enabled</code> zwraca
              "enabled" lub "disabled".
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 2 */}
        <Card title="2. Identyfikacja procesu" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Znajdź identyfikator procesu (PID) dla swojej obecnej sesji powłoki.
            Użyj do tego <code>ps</code> w połączeniu z <code>grep</code>.
          </p>
          <Spoiler title="Pokaż rozwiązanie">
            <SectionLabel>Krok 1 — szybki sposób</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                echo <V>$$</V>
              </Cmd>
              <Comment># Wypisuje PID bieżącej powłoki</Comment>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 2 — przez ps + grep
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                ps aux | grep <V>"bash"</V>
              </Cmd>
              <Comment># lub "zsh" jeśli używasz zsh</Comment>
            </ExampleBlock>
            <InfoBox>
              <code className="text-xs">$$</code> to zmienna specjalna basha
              zawierająca PID bieżącego procesu powłoki.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 3 */}
        <Card title="3. Sprawdzenie zasobów" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Wyświetl ilość wolnego miejsca na wszystkich partycjach oraz ilość
            wolnej pamięci RAM w formacie czytelnym dla człowieka.
          </p>
          <Spoiler title="Pokaż rozwiązanie">
            <SectionLabel>Krok 1 — przestrzeń dyskowa</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                df <H>-h</H>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 2 — pamięć RAM</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                free <H>-h</H>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              Flaga <code className="text-xs">-h</code> = human-readable (GB, MB
              zamiast bajtów). W <code className="text-xs">free</code> ważna
              jest kolumna "available", nie "free" — bufory/cache są
              automatycznie zwalniane.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 4 */}
        <Card title="4. Uruchomienie w tle" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Utwórz skrypt <code>licznik.sh</code>, który co sekundę wypisuje
            liczbę do pliku. Uruchom go w tle, sprawdź czy działa, a następnie
            zakończ.
          </p>
          <Spoiler title="Pokaż rozwiązanie">
            <SectionLabel>Krok 1 — stwórz skrypt</SectionLabel>
            <ExampleBlock variant="green">
              <Comment># licznik.sh</Comment>
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Cmd>i=0; while true; do echo ((i+1)); sleep 1; done</Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Krok 2 — uruchom w tle</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                chmod +x <F>licznik.sh</F>
              </Cmd>
              <Cmd>
                ./licznik.sh {'>'} <F>licznik.log</F> <H>&amp;</H>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Krok 3 — sprawdź i zakończ
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                ps aux | grep <V>licznik</V>
              </Cmd>
              <Cmd>
                kill <V>$(pgrep -f licznik.sh)</V>
              </Cmd>
              <Cmd>
                cat <F>licznik.log</F>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              <code className="text-xs">&amp;</code> uruchamia w tle.{' '}
              <code className="text-xs">pgrep -f</code> znajduje PID po wzorcu
              nazwy. Przekierowanie <code className="text-xs">{'>'}</code>{' '}
              zapisuje output do pliku.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 5 */}
        <Card title="5. Filtrowanie logów" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Użyj <code>journalctl</code>, aby wyświetlić komunikaty jądra
            (kernel) z dzisiaj, które mają priorytet "warning" lub wyższy.
          </p>
          <Spoiler title="Pokaż rozwiązanie">
            <SectionLabel>Rozwiązanie</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                sudo journalctl <H>-k</H> --since <V>today</V> -p <V>warning</V>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              <code className="text-xs">-k</code> = kernel messages (dmesg).{' '}
              <code className="text-xs">-p warning</code> = priorytet warning
              lub wyższy (err, crit, alert, emerg).
            </InfoBox>
          </Spoiler>
        </Card>

        <Divider />

        {/* Zadanie 6 — Challenge */}
        <Card title="6. Własna usługa systemd" color="var(--c-yellow)" full>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,209,102,0.15)] text-[var(--c-yellow)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz skrypt bash logujący datę i obciążenie co 10 sekund. Stwórz
            plik jednostki systemd, uruchom usługę i sprawdź logi.
          </p>
          <Spoiler title="Pokaż rozwiązanie krok po kroku">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <SectionLabel>Krok 1 — skrypt bash</SectionLabel>
                <ExampleBlock variant="yellow">
                  <Comment># /usr/local/bin/load-monitor.sh</Comment>
                  <Cmd>
                    <H>#!/bin/bash</H>
                  </Cmd>
                  <Cmd>while true; do</Cmd>
                  <Cmd>
                    {'  '}echo <V>"$(date): $(uptime)"</V> {'>>'}
                  </Cmd>
                  <Cmd>
                    {'    '}
                    <F>/var/log/system-load.log</F>
                  </Cmd>
                  <Cmd>{'  '}sleep 10</Cmd>
                  <Cmd>done</Cmd>
                </ExampleBlock>
                <ExampleBlock variant="yellow">
                  <Cmd>
                    sudo chmod +x <F>/usr/local/bin/load-monitor.sh</F>
                  </Cmd>
                </ExampleBlock>
              </div>
              <div>
                <SectionLabel>Krok 2 — plik .service</SectionLabel>
                <ExampleBlock variant="yellow">
                  <Comment># /etc/systemd/system/load-monitor.service</Comment>
                  <Cmd>
                    <H>[Unit]</H>
                  </Cmd>
                  <Cmd>
                    <V>Description</V>=System Load Monitor
                  </Cmd>
                  <Cmd> </Cmd>
                  <Cmd>
                    <H>[Service]</H>
                  </Cmd>
                  <Cmd>
                    <V>ExecStart</V>=<F>/usr/local/bin/load-monitor.sh</F>
                  </Cmd>
                  <Cmd>
                    <V>Restart</V>=always
                  </Cmd>
                  <Cmd> </Cmd>
                  <Cmd>
                    <H>[Install]</H>
                  </Cmd>
                  <Cmd>
                    <V>WantedBy</V>=multi-user.target
                  </Cmd>
                </ExampleBlock>
              </div>
            </div>
            <SectionLabel className="mt-2">
              Krok 3 — uruchom i sprawdź
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                sudo systemctl <H>daemon-reload</H>
              </Cmd>
              <Cmd>
                sudo systemctl <H>enable --now</H> <V>load-monitor</V>
              </Cmd>
              <Cmd>
                systemctl status <V>load-monitor</V>
              </Cmd>
              <Cmd>
                tail -f <F>/var/log/system-load.log</F>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              Pamiętaj: <code className="text-xs">daemon-reload</code> po każdej
              zmianie pliku .service!{' '}
              <code className="text-xs">enable --now</code> = enable + start w
              jednym kroku.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 7 — Challenge */}
        <Card title="7. Poszukiwacze zasobów" color="var(--c-yellow)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,209,102,0.15)] text-[var(--c-yellow)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz jednolinijkowe polecenie, które wyświetli 5 procesów
            zużywających najwięcej pamięci RAM.
          </p>
          <Spoiler title="Pokaż rozwiązanie krok po kroku">
            <SectionLabel>Rozwiązanie</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                ps aux <H>--sort=-%mem</H> | head -n <V>6</V>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              <code className="text-xs">--sort=-%mem</code> sortuje malejąco po
              zużyciu pamięci. <code className="text-xs">head -n 6</code> = 1
              nagłówek + 5 procesów. Zamień{' '}
              <code className="text-xs">%mem</code> na{' '}
              <code className="text-xs">%cpu</code> dla CPU.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 8 — Challenge */}
        <Card title="8. Śledztwo w logach" color="var(--c-yellow)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,209,102,0.15)] text-[var(--c-yellow)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Użytkownik zgłosił problem z logowaniem SSH wczoraj między 15:00 a
            16:00. Znajdź logi usługi <code>sshd</code> z tego przedziału.
          </p>
          <Spoiler title="Pokaż rozwiązanie krok po kroku">
            <SectionLabel>Rozwiązanie</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                sudo journalctl -u <V>sshd</V>
              </Cmd>
              <Cmd>
                {'  '}--since <V>"yesterday 15:00"</V>
              </Cmd>
              <Cmd>
                {'  '}--until <V>"yesterday 16:00"</V>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Filtruj tylko błędy</SectionLabel>
            <ExampleBlock variant="yellow">
              <Cmd>
                sudo journalctl -u <V>sshd</V> --since <V>"yesterday 15:00"</V>{' '}
                --until <V>"yesterday 16:00"</V> <H>-p err</H>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              journalctl rozumie względne daty: "yesterday", "today", "1 hour
              ago". Flaga <code className="text-xs">-p err</code> pokaże tylko
              błędy — szybki sposób na znalezienie problemu.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 9 — Challenge */}
        <Card title="9. Automatyczny strażnik" color="var(--c-orange)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,107,53,0.15)] text-[var(--c-orange)] font-bold">
              CHALLENGE — UWAGA!
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz skrypt <code>nginx-watcher.sh</code>, który sprawdza czy
            nginx jest uruchomiony. Jeśli nie — uruchamia go i loguje zdarzenie.
          </p>
          <Spoiler title="Pokaż rozwiązanie krok po kroku">
            <SectionLabel>Skrypt nginx-watcher.sh</SectionLabel>
            <ExampleBlock variant="orange">
              <Cmd>
                <H>#!/bin/bash</H>
              </Cmd>
              <Cmd>
                if ! systemctl is-active <H>--quiet</H> nginx; then
              </Cmd>
              <Cmd>
                {'  '}echo <V>"$(date): nginx DOWN - restarting"</V> {'>>'}
              </Cmd>
              <Cmd>
                {'    '}
                <F>/var/log/nginx-watcher.log</F>
              </Cmd>
              <Cmd>{'  '}systemctl start nginx</Cmd>
              <Cmd>fi</Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Testowanie</SectionLabel>
            <ExampleBlock variant="yellow">
              <Comment># Nadaj uprawnienia</Comment>
              <Cmd>
                sudo chmod +x <F>/usr/local/bin/nginx-watcher.sh</F>
              </Cmd>
              <Comment># Zatrzymaj nginx</Comment>
              <Cmd>sudo systemctl stop nginx</Cmd>
              <Comment># Uruchom watcher</Comment>
              <Cmd>sudo /usr/local/bin/nginx-watcher.sh</Cmd>
              <Comment># Sprawdź czy nginx wstał</Comment>
              <Cmd>systemctl is-active nginx</Cmd>
              <Cmd>
                cat <F>/var/log/nginx-watcher.log</F>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              <code className="text-xs">systemctl is-active --quiet</code>{' '}
              zwraca kod 0 jeśli usługa działa, bez wypisywania tekstu. Idealny
              do użycia w skryptach z <code className="text-xs">if</code>.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 10 — Challenge */}
        <Card
          title="10. Challenge z AI: Automatyzacja monitoringu"
          color="var(--c-orange)"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,107,53,0.15)] text-[var(--c-orange)] font-bold">
              CHALLENGE — AI
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Poproś narzędzie AI o wygenerowanie pliku .service i .timer dla
            skryptu nginx-watcher.sh z zadania 9. Timer powinien uruchamiać
            usługę co minutę.
          </p>
          <Spoiler title="Pokaż rozwiązanie krok po kroku">
            <SectionLabel>Plik .service</SectionLabel>
            <ExampleBlock variant="orange">
              <Comment># /etc/systemd/system/nginx-watcher.service</Comment>
              <Cmd>
                <H>[Unit]</H>
              </Cmd>
              <Cmd>
                <V>Description</V>=Nginx Watcher
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                <H>[Service]</H>
              </Cmd>
              <Cmd>
                <V>Type</V>=oneshot
              </Cmd>
              <Cmd>
                <V>ExecStart</V>=<F>/usr/local/bin/nginx-watcher.sh</F>
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Plik .timer</SectionLabel>
            <ExampleBlock variant="orange">
              <Comment># /etc/systemd/system/nginx-watcher.timer</Comment>
              <Cmd>
                <H>[Unit]</H>
              </Cmd>
              <Cmd>
                <V>Description</V>=Run nginx watcher every minute
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                <H>[Timer]</H>
              </Cmd>
              <Cmd>
                <V>OnCalendar</V>=*-*-* *:*:00
              </Cmd>
              <Cmd>
                <V>Persistent</V>=true
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                <H>[Install]</H>
              </Cmd>
              <Cmd>
                <V>WantedBy</V>=timers.target
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Aktywacja</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                sudo systemctl <H>daemon-reload</H>
              </Cmd>
              <Cmd>
                sudo systemctl <H>enable --now</H> <V>nginx-watcher.timer</V>
              </Cmd>
              <Cmd>
                systemctl <H>list-timers</H> | grep <V>nginx</V>
              </Cmd>
            </ExampleBlock>
            <InfoBox>
              <code className="text-xs">Type=oneshot</code> = uruchom raz i
              zakończ (idealny dla timerów).{' '}
              <code className="text-xs">Persistent=true</code> = jeśli system
              był wyłączony, nadrobi zaległe uruchomienie.
            </InfoBox>
          </Spoiler>
        </Card>
      </div>

      <LessonNav prev={{ to: '/lessons/04', label: '04 — Procesy i Usługi' }} />
    </div>
  );
}
