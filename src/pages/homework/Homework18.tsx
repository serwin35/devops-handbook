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

export default function Homework18() {
  usePageTitle('Homework 18');

  return (
    <div>
      <PageHeader
        title="Homework 18 — Ansible podstawy"
        subtitle="inventory · playbook · moduly · ad-hoc · handlers"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* === 1 === */}
        <Card title="1. Pierwszy playbook" color="var(--c-green)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(76,217,100,0.15)] text-[var(--c-green)] font-bold">
              BASIC
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Napisz playbook ktory instaluje nginx, startuje go i deployuje
            prosta strone index.html. Uruchom na localhost.
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>Zainstaluj Ansible</li>
            <li>
              Utworz <code className="text-xs">inventory.ini</code> z localhost
            </li>
            <li>
              Test: <code className="text-xs">ansible all -m ping</code>
            </li>
            <li>
              Napisz <code className="text-xs">site.yml</code>
            </li>
            <li>
              4 zadania: install, start+enable, deploy index, restart on change
            </li>
            <li>
              Test: <code className="text-xs">ansible-playbook site.yml</code>
            </li>
            <li>Drugi run — powinno byc 0 changed (idempotencja)</li>
          </ol>

          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>inventory.ini</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>[local]</Cmd>
              <Cmd>127.0.0.1 ansible_connection=local</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">site.yml</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>---</Cmd>
              <Cmd>- name: Setup web server</Cmd>
              <Cmd>{'  '}hosts: local</Cmd>
              <Cmd>
                {'  '}become: <V>true</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>{'  '}tasks:</Cmd>
              <Cmd>{'    '}- name: Install nginx</Cmd>
              <Cmd>
                {'      '}apt: name=nginx state=present update_cache=yes
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>{'    '}- name: Start and enable nginx</Cmd>
              <Cmd>{'      '}service: name=nginx state=started enabled=yes</Cmd>
              <Cmd> </Cmd>
              <Cmd>{'    '}- name: Deploy index.html</Cmd>
              <Cmd>{'      '}copy:</Cmd>
              <Cmd>
                {'        '}content:{' '}
                <V>"&lt;h1&gt;Hello from Ansible&lt;/h1&gt;"</V>
              </Cmd>
              <Cmd>{'        '}dest: /var/www/html/index.nginx-debian.html</Cmd>
              <Cmd>{'      '}notify: reload nginx</Cmd>
              <Cmd> </Cmd>
              <Cmd>{'  '}handlers:</Cmd>
              <Cmd>{'    '}- name: reload nginx</Cmd>
              <Cmd>{'      '}service: name=nginx state=reloaded</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Run</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>ansible-playbook -i inventory.ini site.yml</Cmd>
              <Cmd>
                ansible-playbook -i inventory.ini site.yml --check --diff
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === 2 === */}
        <Card title="2. ad-hoc commands" color="var(--c-yellow)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(76,217,100,0.15)] text-[var(--c-green)] font-bold">
              BASIC
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Bez playbookow — wykonaj operacje na localhost przez ad-hoc.
          </p>

          <SectionLabel>Zadania</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>Ping wszystkich hostow</li>
            <li>Uptime na wszystkich (shell)</li>
            <li>Sprawdz wolne miejsce (df -h)</li>
            <li>Pobierz fakty z hosta (-m setup)</li>
            <li>Zainstaluj htop (apt, become)</li>
            <li>Restart serwisu nginx</li>
            <li>Skopiuj plik z localhost na host</li>
          </ol>

          <Spoiler title="Pokaz polecenia">
            <ExampleBlock variant="yellow">
              <Cmd>ansible all -m ping</Cmd>
              <Cmd>
                ansible all -m shell -a <V>"uptime"</V>
              </Cmd>
              <Cmd>
                ansible all -m shell -a <V>"df -h /"</V>
              </Cmd>
              <Cmd>
                ansible all -m setup{'   '}
                <Comment># wszystkie fakty</Comment>
              </Cmd>
              <Cmd>
                ansible all -m setup -a <V>"filter=ansible_distribution*"</V>
              </Cmd>
              <Cmd>
                ansible all --become -m apt -a <V>"name=htop state=present"</V>
              </Cmd>
              <Cmd>
                ansible all --become -m service -a{' '}
                <V>"name=nginx state=restarted"</V>
              </Cmd>
              <Cmd>
                ansible all --become -m copy -a{' '}
                <V>"src=./hosts dest=/etc/hosts"</V>
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === 3 === */}
        <Card title="3. Multi-host playbook" color="var(--c-blue)" full>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Postaw 2-3 VM-ki (lub kontenery). Skonfiguruj inventory z grupami.
            Napisz playbook ktory: na web instaluje nginx, na db instaluje
            PostgreSQL. Uzyj SSH keys (nie hasel).
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>Wygeneruj SSH key i wdroz na hostach</li>
            <li>Inventory z grupami [webservers] i [dbservers]</li>
            <li>Playbook z 2 play (kazdy dla innej grupy)</li>
            <li>Common task: update apt, install vim/htop</li>
            <li>Web task: install nginx, start, enable</li>
            <li>DB task: install postgresql, start, enable</li>
            <li>Sprawdz przez SSH ze wszystko dziala</li>
          </ol>

          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>inventory.ini</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>[webservers]</Cmd>
              <Cmd>
                web1 ansible_host=<V>192.168.1.10</V> ansible_user=ubuntu
              </Cmd>
              <Cmd>
                web2 ansible_host=<V>192.168.1.11</V> ansible_user=ubuntu
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>[dbservers]</Cmd>
              <Cmd>
                db1 ansible_host=<V>192.168.1.20</V> ansible_user=ubuntu
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>[all:vars]</Cmd>
              <Cmd>ansible_ssh_private_key_file=~/.ssh/id_rsa</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">site.yml</SectionLabel>
            <ExampleBlock variant="purple">
              <Cmd>---</Cmd>
              <Cmd>- name: Common setup</Cmd>
              <Cmd>{'  '}hosts: all</Cmd>
              <Cmd>
                {'  '}become: <V>true</V>
              </Cmd>
              <Cmd>{'  '}tasks:</Cmd>
              <Cmd>
                {'    '}- apt: name=[<V>'vim'</V>, <V>'htop'</V>] state=present
                update_cache=yes
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>- name: Web servers</Cmd>
              <Cmd>{'  '}hosts: webservers</Cmd>
              <Cmd>
                {'  '}become: <V>true</V>
              </Cmd>
              <Cmd>{'  '}tasks:</Cmd>
              <Cmd>{'    '}- apt: name=nginx state=present</Cmd>
              <Cmd>{'    '}- service: name=nginx state=started enabled=yes</Cmd>
              <Cmd> </Cmd>
              <Cmd>- name: DB servers</Cmd>
              <Cmd>{'  '}hosts: dbservers</Cmd>
              <Cmd>
                {'  '}become: <V>true</V>
              </Cmd>
              <Cmd>{'  '}tasks:</Cmd>
              <Cmd>{'    '}- apt: name=postgresql state=present</Cmd>
              <Cmd>
                {'    '}- service: name=postgresql state=started enabled=yes
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>
      </div>

      <InfoBox>
        <b>Kryteria oceny:</b> Ansible zainstalowane, ad-hoc commands dzialaja,
        playbook idempotentny (drugi run = 0 changed), handler uruchamia sie
        tylko po zmianie, dla zaawansowanego — multi-host + SSH keys.
      </InfoBox>

      <LessonNav prev={{ to: '/lessons/18', label: '18 — Ansible cz. 1' }} />
    </div>
  );
}
