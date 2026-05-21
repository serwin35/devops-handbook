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

export default function Homework21() {
  usePageTitle('Homework 21');

  return (
    <div>
      <PageHeader
        title="Homework 21 — Wlasny obraz Pythona + push na Docker Hub"
        subtitle="Dockerfile · USER · WORKDIR · OCI labels · ENV · docker push"
        color="var(--c-purple)"
      />

      <InfoBox>
        Gotowy szablon (Dockerfile + <code className="text-xs">app.py</code> +
        README z komendami) znajdziesz w repo pod:{' '}
        <code className="text-xs">homework/lesson21/</code>. Ponizej rozpiska
        zadania krok po kroku.
      </InfoBox>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* === 1 === */}
        <Card title="1. Dockerfile z Pythonem" color="var(--c-purple)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(0,217,255,0.15)] text-[var(--c-accent)] font-bold">
              CORE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Bazujemy na <code className="text-xs">python:3.12-slim</code>. Slim
            = mniejszy obraz, szybciej sie pobiera.
          </p>

          <SectionLabel>Wymagania</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>
              <code className="text-xs">FROM python:3.12-slim</code> (pin
              wersji!)
            </li>
            <li>
              Skrypt <code className="text-xs">app.py</code> jako domyslny CMD
            </li>
            <li>Nie-root user + WORKDIR</li>
            <li>OCI labels (org.opencontainers.image.*)</li>
            <li>ENV uzywana w skrypcie</li>
          </ol>

          <Spoiler title="Pokaz pelny Dockerfile">
            <ExampleBlock variant="purple">
              <Cmd># syntax=docker/dockerfile:1.7</Cmd>
              <Cmd>
                <H>FROM</H> python:3.12-slim
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                <H>LABEL</H> org.opencontainers.image.title=
                <V>"devops-handbook-hello"</V>
              </Cmd>
              <Cmd>
                <H>LABEL</H> org.opencontainers.image.description=
                <V>"Prosty Python z ENV"</V>
              </Cmd>
              <Cmd>
                <H>LABEL</H> org.opencontainers.image.version=<V>"1.0.0"</V>
              </Cmd>
              <Cmd>
                <H>LABEL</H> org.opencontainers.image.authors=
                <V>"&lt;YOUR_USER&gt;"</V>
              </Cmd>
              <Cmd>
                <H>LABEL</H> org.opencontainers.image.licenses=<V>"MIT"</V>
              </Cmd>
              <Cmd>
                <H>LABEL</H> org.opencontainers.image.source=
                <V>"https://github.com/..."</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                <H>ENV</H> GREETING_NAME=<V>"Student DevOps"</V>
              </Cmd>
              <Cmd>
                <H>ENV</H> PYTHONUNBUFFERED=1
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                <H>RUN</H> groupadd --system --gid 10001 appuser \
              </Cmd>
              <Cmd>
                {' '}
                &amp;&amp; useradd --system --uid 10001 --gid appuser \
              </Cmd>
              <Cmd>{'      '}--home /app --shell /sbin/nologin appuser \</Cmd>
              <Cmd>
                {' '}
                &amp;&amp; mkdir -p /app &amp;&amp; chown -R appuser:appuser
                /app
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                <H>WORKDIR</H> /app
              </Cmd>
              <Cmd>
                <H>COPY</H> --chown=appuser:appuser app.py /app/app.py
              </Cmd>
              <Cmd>
                <H>USER</H> appuser
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                <H>CMD</H> [<V>"python"</V>, <V>"app.py"</V>]
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === 2 === */}
        <Card title="2. Skrypt Python czytajacy ENV" color="var(--c-green)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(0,217,255,0.15)] text-[var(--c-accent)] font-bold">
              CORE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            <code className="text-xs">app.py</code> uzywa zmiennej
            <code className="text-xs"> GREETING_NAME</code>. Domyslnie z ENV w
            Dockerfile, mozna nadpisac
            <code className="text-xs"> docker run -e GREETING_NAME=...</code>.
          </p>

          <Spoiler title="Pokaz app.py">
            <ExampleBlock variant="green">
              <Cmd>
                <H>import</H> os, socket, platform
              </Cmd>
              <Cmd>
                <H>from</H> datetime <H>import</H> datetime, timezone
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                name = os.environ.get(<V>"GREETING_NAME"</V>, <V>"anonim"</V>)
              </Cmd>
              <Cmd>
                print(
                <V>
                  f"Witaj, {`{`}name{`}`}!"
                </V>
                )
              </Cmd>
              <Cmd>
                print(<V>"hostname:"</V>, socket.gethostname())
              </Cmd>
              <Cmd>
                print(<V>"python:"</V>, platform.python_version())
              </Cmd>
              <Cmd>
                print(<V>"uid:"</V>, os.getuid())
              </Cmd>
              <Cmd>
                print(<V>"cwd:"</V>, os.getcwd())
              </Cmd>
              <Cmd>
                print(<V>"utc:"</V>, datetime.now(timezone.utc).isoformat())
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === 3 === */}
        <Card title="3. Build i test lokalny" color="var(--c-yellow)" full>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(0,217,255,0.15)] text-[var(--c-accent)] font-bold">
              CORE
            </span>
          </div>
          <ExampleBlock variant="yellow">
            <Comment># Z katalogu homework/lesson21/</Comment>
            <Cmd>docker build \</Cmd>
            <Cmd>
              {'  '}-t <V>&lt;USER&gt;</V>/devops-handbook-hello:1.0.0 \
            </Cmd>
            <Cmd>
              {'  '}-t <V>&lt;USER&gt;</V>/devops-handbook-hello:latest .
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Run z domyslna ENV</Comment>
            <Cmd>
              docker run --rm <V>&lt;USER&gt;</V>/devops-handbook-hello:1.0.0
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Run z nadpisana ENV</Comment>
            <Cmd>
              docker run --rm -e GREETING_NAME=<V>"Mateusz"</V> \
            </Cmd>
            <Cmd>
              {'  '}
              <V>&lt;USER&gt;</V>/devops-handbook-hello:1.0.0
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Weryfikacja: nie-root + WORKDIR</Comment>
            <Cmd>
              docker run --rm <V>&lt;USER&gt;</V>/devops-handbook-hello:1.0.0 \
            </Cmd>
            <Cmd>
              {'  '}python -c{' '}
              <V>"import os; print(os.getuid(), os.getcwd())"</V>
            </Cmd>
            <Cmd># Oczekiwane: 10001 /app</Cmd>
            <Cmd> </Cmd>
            <Comment># Weryfikacja OCI labels</Comment>
            <Cmd>
              docker inspect --format{' '}
              <V>
                '{'{'}
                {'{'}json .Config.Labels{'}'}
                {'}'}'
              </V>{' '}
              \
            </Cmd>
            <Cmd>
              {'  '}
              <V>&lt;USER&gt;</V>/devops-handbook-hello:1.0.0 | jq
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === 4 === */}
        <Card
          title="4. Docker Hub: konto + login + push"
          color="var(--c-accent)"
          full
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>
              Zaloz konto na{' '}
              <a
                href="https://hub.docker.com/signup"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                hub.docker.com/signup
              </a>
            </li>
            <li>
              (Zalecane) Account Settings → Security → <b>New Access Token</b>{' '}
              (Read &amp; Write)
            </li>
            <li>
              <code className="text-xs">docker login -u &lt;USER&gt;</code> —
              uzyj PAT jako haslo
            </li>
            <li>Push obu tagow</li>
            <li>Sprawdz stronę obrazu, skopiuj link, wyslij prowadzacemu</li>
          </ol>

          <Spoiler title="Pokaz komendy push">
            <ExampleBlock variant="default">
              <Cmd>
                docker login -u <V>&lt;USER&gt;</V>
              </Cmd>
              <Cmd>
                docker push <V>&lt;USER&gt;</V>/devops-handbook-hello:1.0.0
              </Cmd>
              <Cmd>
                docker push <V>&lt;USER&gt;</V>/devops-handbook-hello:latest
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Link do wyslania prowadzacemu:</Comment>
              <Cmd>
                https://hub.docker.com/r/<V>&lt;USER&gt;</V>
                /devops-handbook-hello
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">
              Smoke test z czystej maszyny
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                docker rmi <V>&lt;USER&gt;</V>/devops-handbook-hello:1.0.0
              </Cmd>
              <Cmd>
                docker run --rm -e GREETING_NAME=<V>"Prowadzacy"</V> \
              </Cmd>
              <Cmd>
                {'  '}
                <V>&lt;USER&gt;</V>/devops-handbook-hello:1.0.0
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === 5 === */}
        <Card title="5. (Bonus) Multi-arch build" color="var(--c-orange)" full>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,159,76,0.15)] text-[var(--c-orange)] font-bold">
              BONUS
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Jesli budujesz na Apple Silicon (arm64) a prowadzacy ma x86_64,
            obraz nie odpali sie u niego natywnie.{' '}
            <code className="text-xs">buildx</code> robi obraz na obie
            architektury w jednym przebiegu.
          </p>
          <ExampleBlock variant="orange">
            <Cmd>
              docker buildx create --use --name multiarch || <H>true</H>
            </Cmd>
            <Cmd>docker buildx build \</Cmd>
            <Cmd>
              {'  '}--platform <V>linux/amd64,linux/arm64</V> \
            </Cmd>
            <Cmd>
              {'  '}-t <V>&lt;USER&gt;</V>/devops-handbook-hello:1.0.0 \
            </Cmd>
            <Cmd>
              {'  '}-t <V>&lt;USER&gt;</V>/devops-handbook-hello:latest \
            </Cmd>
            <Cmd>{'  '}--push .</Cmd>
          </ExampleBlock>
          <InfoBox>
            <code className="text-xs">--push</code> w buildx zastepuje osobne{' '}
            <code className="text-xs">docker push</code> — jeden krok buduje i
            wypycha.
          </InfoBox>
        </Card>
      </div>

      <InfoBox>
        <b>Kryteria oceny:</b> Dockerfile z FROM python, USER + WORKDIR, OCI
        labels (min. title/version/authors/source), ENV uzywana w skrypcie,
        obraz wypchniety na Docker Hub, link wyslany.
      </InfoBox>

      <LessonNav prev={{ to: '/lessons/21', label: '21 — Docker cz. 2' }} />
    </div>
  );
}
