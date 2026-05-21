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

export default function Homework20() {
  usePageTitle('Homework 20');

  return (
    <div>
      <PageHeader
        title="Homework 20 — Docker basics: Nginx + PostgreSQL + wlasny obraz"
        subtitle="run · exec · logs · commit · build · multi-container"
        color="var(--c-accent)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* === 1 === */}
        <Card title="1. Aplikacja wielokontenerowa" color="var(--c-accent)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(0,217,255,0.15)] text-[var(--c-accent)] font-bold">
              CORE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Uruchom Nginx + PostgreSQL jako dwa niezalezne kontenery, wlasna
            strone w Nginx, sprawdz logi.
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>
              <code className="text-xs">docker pull nginx</code> i{' '}
              <code className="text-xs">docker pull postgres</code>
            </li>
            <li>Uruchom Nginx na porcie 8080</li>
            <li>
              Uruchom PostgreSQL na 5432 z{' '}
              <code className="text-xs">POSTGRES_PASSWORD</code>
            </li>
            <li>
              Wejdz do Nginx i podmien{' '}
              <code className="text-xs">index.html</code>
            </li>
            <li>
              Sprawdz <code className="text-xs">docker logs</code> obu
            </li>
          </ol>

          <Spoiler title="Pokaz komendy">
            <ExampleBlock variant="default">
              <Cmd>docker pull nginx</Cmd>
              <Cmd>docker pull postgres</Cmd>
              <Cmd> </Cmd>
              <Cmd>
                docker run -d --name web -p <V>8080:80</V> nginx
              </Cmd>
              <Cmd>
                docker run -d --name db -p <V>5432:5432</V> \
              </Cmd>
              <Cmd>
                {'  '}-e <V>POSTGRES_PASSWORD=secret</V> postgres
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Sprawdz status</Comment>
              <Cmd>docker ps</Cmd>
              <Cmd>curl http://localhost:8080</Cmd>
              <Cmd> </Cmd>
              <Comment># Podmien strone startowa</Comment>
              <Cmd>docker exec -it web bash</Cmd>
              <Cmd>
                echo <V>"&lt;h1&gt;Witaj z Dockera!&lt;/h1&gt;"</V> &gt;
                /usr/share/nginx/html/index.html
              </Cmd>
              <Cmd>exit</Cmd>
              <Cmd> </Cmd>
              <Comment># Logi</Comment>
              <Cmd>docker logs --tail 20 web</Cmd>
              <Cmd>docker logs --tail 20 db</Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === 2 === */}
        <Card
          title="2. docker commit — wlasny obraz z kontenera"
          color="var(--c-orange)"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(0,217,255,0.15)] text-[var(--c-accent)] font-bold">
              CORE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Zmodyfikuj zywy kontener Nginx, zapisz go jako nowy obraz, uruchom z
            niego nowy kontener i sprawdz ze zmiany "przeniknely". To recznie
            symuluje to, co automatyzuje Dockerfile.
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>Uruchom Nginx (jesli juz nie dziala)</li>
            <li>Wejdz i podmien index.html (jak w cw. 1)</li>
            <li>
              <code className="text-xs">docker commit web moj-nginx:v1</code>
            </li>
            <li>Stop + rm starego kontenera</li>
            <li>Uruchom z nowego obrazu na porcie 8080</li>
            <li>curl — modyfikacja przezyla</li>
            <li>Posprzataj</li>
          </ol>

          <Spoiler title="Pokaz komendy">
            <ExampleBlock variant="orange">
              <Cmd>docker commit web moj-nginx:v1</Cmd>
              <Cmd>docker images | grep moj-nginx</Cmd>
              <Cmd> </Cmd>
              <Cmd>docker stop web &amp;&amp; docker rm web</Cmd>
              <Cmd>docker run -d --name web2 -p 8080:80 moj-nginx:v1</Cmd>
              <Cmd>
                curl http://localhost:8080 <Comment># widac twoj h1</Comment>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>docker stop web2 &amp;&amp; docker rm web2</Cmd>
              <Cmd>docker rmi moj-nginx:v1</Cmd>
            </ExampleBlock>
          </Spoiler>
          <InfoBox>
            W praktyce <b>NIGDY</b> nie uzywamy{' '}
            <code className="text-xs">docker commit</code> na produkcji — obraz
            robi sie nieprzejrzysty i nieodtwarzalny. Zawsze Dockerfile (cw. 3).
          </InfoBox>
        </Card>

        {/* === 3 === */}
        <Card
          title="3. Wlasny obraz Nginx z Dockerfile"
          color="var(--c-green)"
          full
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Statyczna strona HTML serwowana przez Nginx — w pelni powtarzalnie
            przez Dockerfile.
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>
              Utworz katalog z plikiem{' '}
              <code className="text-xs">index.html</code>
            </li>
            <li>Napisz Dockerfile (FROM nginx, COPY)</li>
            <li>
              <code className="text-xs">docker build -t moj-web:1.0 .</code>
            </li>
            <li>Uruchom kontener na 8080</li>
            <li>Sprawdz w przegladarce</li>
          </ol>

          <Spoiler title="Pokaz Dockerfile + komendy">
            <SectionLabel>index.html</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>&lt;!doctype html&gt;</Cmd>
              <Cmd>&lt;html&gt;</Cmd>
              <Cmd>
                {'  '}&lt;head&gt;&lt;meta charset="utf-8"&gt;&lt;title&gt;Mój
                DevOps&lt;/title&gt;&lt;/head&gt;
              </Cmd>
              <Cmd>{'  '}&lt;body&gt;</Cmd>
              <Cmd>
                {'    '}&lt;h1&gt;Witaj z mojego obrazu Docker!&lt;/h1&gt;
              </Cmd>
              <Cmd>{'  '}&lt;/body&gt;</Cmd>
              <Cmd>&lt;/html&gt;</Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Dockerfile</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                <H>FROM</H> nginx:1.27-alpine
              </Cmd>
              <Cmd>
                <H>COPY</H> index.html /usr/share/nginx/html/index.html
              </Cmd>
              <Cmd>
                <H>EXPOSE</H> 80
              </Cmd>
            </ExampleBlock>
            <SectionLabel className="mt-2">Build + run</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>docker build -t moj-web:1.0 .</Cmd>
              <Cmd>docker run -d --name moj-web -p 8080:80 moj-web:1.0</Cmd>
              <Cmd>curl http://localhost:8080</Cmd>
              <Cmd>docker stop moj-web &amp;&amp; docker rm moj-web</Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>
      </div>

      <InfoBox>
        <b>Kryteria oceny:</b> 2 dzialajace kontenery (Nginx + Postgres),
        zmodyfikowany index.html widoczny w przegladarce, wlasny obraz z
        Dockerfile uruchomiony lokalnie, logi obu kontenerow przejrzane.
      </InfoBox>

      <LessonNav
        prev={{ to: '/lessons/20', label: '20 — Docker cz. 1' }}
        next={{ to: '/homework/21', label: 'Homework 21' }}
      />
    </div>
  );
}
