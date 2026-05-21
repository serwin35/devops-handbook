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

export default function Homework19() {
  usePageTitle('Homework 19');

  return (
    <div>
      <PageHeader
        title="Homework 19 — LAMP w rolach + multi-env"
        subtitle="role · templates · multi-env · vault · ansible-galaxy"
        color="var(--c-orange)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* === 1 === */}
        <Card title="1. LAMP stack przez role" color="var(--c-orange)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Utworz 3 role: <b>apache</b>, <b>mysql</b>, <b>php</b>. Kazda z
            defaults, tasks, handlers, templates. Polacz w jednym playbooku
            site.yml.
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>
              <code className="text-xs">mkdir -p ~/lamp-project</code> i
              ansible.cfg
            </li>
            <li>
              <code className="text-xs">ansible-galaxy init roles/apache</code>
            </li>
            <li>To samo dla mysql i php</li>
            <li>Apache: install + template vhost.conf.j2 + a2ensite</li>
            <li>MySQL: install + utworz baze + uzytkownika</li>
            <li>PHP: install php + php-mysql + info.php</li>
            <li>site.yml: vars + 3 role + post_tasks (smoke test)</li>
            <li>
              Uruchom i odwiedz{' '}
              <code className="text-xs">http://lamp.local</code>
            </li>
          </ol>

          <Spoiler title="Pokaz strukture + przyklady">
            <SectionLabel>Drzewo</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>lamp-project/</Cmd>
              <Cmd>├── ansible.cfg</Cmd>
              <Cmd>├── inventory.ini</Cmd>
              <Cmd>├── site.yml</Cmd>
              <Cmd>└── roles/</Cmd>
              <Cmd>{'    '}├── apache/</Cmd>
              <Cmd>
                {'    '}│{'   '}├── tasks/main.yml
              </Cmd>
              <Cmd>
                {'    '}│{'   '}├── handlers/main.yml
              </Cmd>
              <Cmd>
                {'    '}│{'   '}├── defaults/main.yml
              </Cmd>
              <Cmd>
                {'    '}│{'   '}└── templates/vhost.conf.j2
              </Cmd>
              <Cmd>{'    '}├── mysql/</Cmd>
              <Cmd>{'    '}└── php/</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">site.yml</SectionLabel>
            <ExampleBlock variant="orange">
              <Cmd>---</Cmd>
              <Cmd>- name: LAMP stack</Cmd>
              <Cmd>{'  '}hosts: local</Cmd>
              <Cmd>
                {'  '}become: <V>true</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>{'  '}vars:</Cmd>
              <Cmd>{'    '}apache_domain: lamp.local</Cmd>
              <Cmd>{'    '}apache_document_root: /var/www/lamp.local</Cmd>
              <Cmd>{'    '}mysql_db_name: lamp_db</Cmd>
              <Cmd>{'    '}mysql_user: lamp_user</Cmd>
              <Cmd>
                {'    '}mysql_password:{' '}
                <V>
                  "{'{{'} vault_db_password {'}}'}"
                </V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>{'  '}pre_tasks:</Cmd>
              <Cmd>
                {'    '}- apt: update_cache=yes cache_valid_time=<V>3600</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>{'  '}roles:</Cmd>
              <Cmd>{'    '}- apache</Cmd>
              <Cmd>{'    '}- mysql</Cmd>
              <Cmd>{'    '}- php</Cmd>
              <Cmd> </Cmd>
              <Cmd>{'  '}post_tasks:</Cmd>
              <Cmd>{'    '}- name: Smoke test</Cmd>
              <Cmd>
                {'      '}uri: url=http://localhost/ status_code=<V>200</V>
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === 2 === */}
        <Card title="2. Multi-environment (dev/prod)" color="var(--c-blue)">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Rozszerz projekt o oddzielne inventory dla dev i prod. Rozne zmienne
            (log level, debug, domain).
          </p>

          <SectionLabel>Kroki</SectionLabel>
          <ol className="text-[11px] text-[var(--c-muted)] list-decimal pl-4 space-y-1">
            <li>environments/dev/inventory.ini i group_vars/all.yml</li>
            <li>environments/prod/inventory.ini i group_vars/all.yml</li>
            <li>W dev: debug_mode=true, log_level=debug</li>
            <li>W prod: debug_mode=false, log_level=error</li>
            <li>Template vhost.conf.j2 uzywa tych zmiennych</li>
            <li>
              Uruchom dla dev:{' '}
              <code className="text-xs">-i environments/dev/inventory.ini</code>
            </li>
            <li>Uruchom dla prod (--check pierwsze)</li>
          </ol>

          <Spoiler title="Pokaz strukture">
            <ExampleBlock variant="default">
              <Cmd>environments/</Cmd>
              <Cmd>├── dev/</Cmd>
              <Cmd>│{'   '}├── inventory.ini</Cmd>
              <Cmd>
                │{'   '}└── group_vars/all.yml{'    '}
                <Comment># debug=true</Comment>
              </Cmd>
              <Cmd>└── prod/</Cmd>
              <Cmd>{'    '}├── inventory.ini</Cmd>
              <Cmd>
                {'    '}└── group_vars/all.yml{'    '}
                <Comment># debug=false</Comment>
              </Cmd>
            </ExampleBlock>
          </Spoiler>
        </Card>

        {/* === 3 === */}
        <Card
          title="3. Ansible Vault dla sekretow"
          color="var(--c-yellow)"
          full
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,159,76,0.15)] text-[var(--c-orange)] font-bold">
              BONUS
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Zaszyfruj haslo bazy danych przez Vault. Trzymaj klucz w
            ~/.vault-pass. Playbook musi dzialac bez interakcji.
          </p>

          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Setup</SectionLabel>
            <ExampleBlock variant="yellow">
              <Comment># Hasla do vault</Comment>
              <Cmd>
                echo <V>"super-tajne-haslo"</V> &gt; ~/.vault-pass
              </Cmd>
              <Cmd>
                chmod <V>600</V> ~/.vault-pass
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Utworz zaszyfrowany plik</Comment>
              <Cmd>
                ansible-vault create --vault-password-file ~/.vault-pass \
              </Cmd>
              <Cmd>{'  '}group_vars/all/secrets.yml</Cmd>
              <Cmd> </Cmd>
              <Comment># W srodku:</Comment>
              <Cmd>
                vault_db_password: <V>"S3cret!Pass"</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">ansible.cfg</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>[defaults]</Cmd>
              <Cmd>inventory = inventory.ini</Cmd>
              <Cmd>roles_path = roles</Cmd>
              <Cmd>vault_password_file = ~/.vault-pass</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Inspekcja</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>ansible-vault view group_vars/all/secrets.yml</Cmd>
              <Cmd>ansible-vault edit group_vars/all/secrets.yml</Cmd>
              <Cmd>
                cat group_vars/all/secrets.yml{'  '}
                <Comment># &lt;-- zaszyfrowane</Comment>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              <b>NIGDY</b> nie commituj{' '}
              <code className="text-xs">~/.vault-pass</code> do Git. Dodaj go do{' '}
              <code className="text-xs">.gitignore</code>. Trzymaj osobno (np.
              password manager).
            </InfoBox>
          </Spoiler>
        </Card>
      </div>

      <InfoBox>
        <b>Kryteria oceny:</b> 3 role z poprawna struktura katalogow, dzialajacy
        LAMP stack, multi-env z roznymi zmiennymi, Vault ukrywa sekret w repo,
        --check przed prod.
      </InfoBox>

      <LessonNav prev={{ to: '/lessons/19', label: '19 — Ansible cz. 2' }} />
    </div>
  );
}
