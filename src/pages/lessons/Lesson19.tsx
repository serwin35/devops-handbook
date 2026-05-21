import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Concept from '../../components/Concept';
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
import LessonNav from '../../components/LessonNav';

export default function Lesson19() {
  usePageTitle('Lekcja 19 — Ansible cz. 2');

  return (
    <div>
      <PageHeader
        title="Lekcja 19 — Ansible: role, srodowiska, best practices"
        subtitle="role · galaxy · templates · vault · multi-env · debug"
        color="var(--c-orange)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === Cele === */}
        <Card title="Cele lekcji" color="var(--c-orange)">
          <Concept title="Co poznasz?" color="var(--c-orange)">
            Jak organizowac duze projekty Ansible: <b>role</b>,
            wieloszrodowiskowe inventory, szablony Jinja2,
            <b> Ansible Vault</b> i best practices.
          </Concept>
          <Divider />
          <Row code="1">Role — struktura katalogow</Row>
          <Row code="2">Defaults vs vars — priorytet zmiennych</Row>
          <Row code="3">Handlery i notyfikacje</Row>
          <Row code="4">Templates Jinja2 (.j2)</Row>
          <Row code="5">Zaleznosci miedzy rolami</Row>
          <Row code="6">Multi-environment (dev/staging/prod)</Row>
          <Row code="7">Vault, blocks, serial, debug</Row>
        </Card>

        {/* === Co to jest rola === */}
        <Card title="Co to jest rola?" color="var(--c-purple)">
          <Concept title="Modulowy zestaw zadan" color="var(--c-purple)">
            Rola to <b>nazwany katalog</b> z zadaniami, zmiennymi, plikami i
            szablonami zwiazanymi z jedna funkcja (np. apache, mysql,
            monitoring).
          </Concept>
          <Divider />
          <SectionLabel>Po co?</SectionLabel>
          <Row code="Modularnosc">jedna rola = jedna odpowiedzialnosc</Row>
          <Row code="Reuzywalnosc">ta sama rola w wielu playbookach</Row>
          <Row code="Czystosc">bez gigantycznych playbookow</Row>
          <Row code="Galaxy">spolecznosc dzieli sie rolami</Row>
        </Card>

        {/* === Struktura roli === */}
        <Card title="Struktura roli" color="var(--c-blue)" full>
          <ExampleBlock variant="default">
            <Cmd>roles/</Cmd>
            <Cmd>└── apache/</Cmd>
            <Cmd>
              {'    '}├── tasks/main.yml{'         '}
              <Comment># glowne zadania</Comment>
            </Cmd>
            <Cmd>
              {'    '}├── handlers/main.yml{'      '}
              <Comment># obsluga notyfikacji</Comment>
            </Cmd>
            <Cmd>
              {'    '}├── defaults/main.yml{'      '}
              <Comment># wartosci domyslne (low prio)</Comment>
            </Cmd>
            <Cmd>
              {'    '}├── vars/main.yml{'          '}
              <Comment># zmienne (wyzszy prio)</Comment>
            </Cmd>
            <Cmd>
              {'    '}├── files/{'                 '}
              <Comment># statyczne pliki</Comment>
            </Cmd>
            <Cmd>
              {'    '}│{'   '}└── apache.conf
            </Cmd>
            <Cmd>
              {'    '}├── templates/{'             '}
              <Comment># Jinja2 (.j2)</Comment>
            </Cmd>
            <Cmd>
              {'    '}│{'   '}└── vhost.conf.j2
            </Cmd>
            <Cmd>
              {'    '}├── meta/main.yml{'          '}
              <Comment># metadata + zaleznosci</Comment>
            </Cmd>
            <Cmd>
              {'    '}└── tests/test.yml{'         '}
              <Comment># test playbook</Comment>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Tworzenie szablonu</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>ansible-galaxy init roles/apache</Cmd>
            <Comment># utworzy cala strukture z plikami szablonowymi</Comment>
          </ExampleBlock>
        </Card>

        {/* === Priorytet zmiennych === */}
        <Card title="Priorytet zmiennych" color="var(--c-yellow)" full>
          <Concept
            title="Od najnizszego do najwyzszego"
            color="var(--c-yellow)"
          >
            Im nizsza pozycja, tym <b>silniej</b> nadpisuje. CLI
            <code className="text-xs"> -e</code> bije wszystko.
          </Concept>
          <Divider />
          <Row code="1">role defaults (defaults/main.yml)</Row>
          <Row code="2">inventory file vars</Row>
          <Row code="3">inventory group_vars/all</Row>
          <Row code="4">inventory group_vars/*</Row>
          <Row code="5">inventory host_vars/*</Row>
          <Row code="6">play vars</Row>
          <Row code="7">role vars (vars/main.yml)</Row>
          <Row code="8">block/task vars</Row>
          <Row code="9">--extra-vars (-e) — najwyzszy</Row>
          <Divider />
          <InfoBox>
            <b>defaults/</b> to "sugestie" — atak <b>vars/</b> to "wymagania". W
            rolach reuzywalnych kladziesz wszystko w defaults.
          </InfoBox>
        </Card>

        {/* === Tasks roli === */}
        <Card title="tasks/main.yml" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Cmd>---</Cmd>
            <Cmd>- name: Install Apache</Cmd>
            <Cmd>{'  '}apt:</Cmd>
            <Cmd>{'    '}name: apache2</Cmd>
            <Cmd>{'    '}state: present</Cmd>
            <Cmd>
              {'  '}when: ansible_os_family == <V>"Debian"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>- name: Deploy vhost config</Cmd>
            <Cmd>{'  '}template:</Cmd>
            <Cmd>{'    '}src: vhost.conf.j2</Cmd>
            <Cmd>
              {'    '}dest: /etc/apache2/sites-available/{'{{'} apache_domain{' '}
              {'}}'}.conf
            </Cmd>
            <Cmd>{'    '}owner: root</Cmd>
            <Cmd>
              {'    '}mode: <V>'0644'</V>
            </Cmd>
            <Cmd>{'  '}notify: reload apache</Cmd>
            <Cmd> </Cmd>
            <Cmd>- name: Enable site</Cmd>
            <Cmd>
              {'  '}command: a2ensite {'{{'} apache_domain {'}}'}.conf
            </Cmd>
            <Cmd>{'  '}args:</Cmd>
            <Cmd>
              {'    '}creates: /etc/apache2/sites-enabled/{'{{'} apache_domain{' '}
              {'}}'}.conf
            </Cmd>
            <Cmd>{'  '}notify: reload apache</Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>creates:</b> w command/shell zapewnia idempotencje — gdy plik
            istnieje, task sie nie wykonuje.
          </InfoBox>
        </Card>

        {/* === Handlery === */}
        <Card title="handlers/main.yml" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Cmd>---</Cmd>
            <Cmd>- name: reload apache</Cmd>
            <Cmd>{'  '}service:</Cmd>
            <Cmd>{'    '}name: apache2</Cmd>
            <Cmd>{'    '}state: reloaded</Cmd>
            <Cmd> </Cmd>
            <Cmd>- name: restart apache</Cmd>
            <Cmd>{'  '}service:</Cmd>
            <Cmd>{'    '}name: apache2</Cmd>
            <Cmd>{'    '}state: restarted</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Cechy handlerow</SectionLabel>
          <Row code="1">Tylko po zmianie (changed)</Row>
          <Row code="2">Wykonuja sie na koniec play</Row>
          <Row code="3">Zdeduplikowane (1x mimo wielu notify)</Row>
          <Row code="4">Mozesz wymusic: --force-handlers</Row>
        </Card>

        {/* === Templates === */}
        <Card title="Templates Jinja2" color="var(--c-blue)" full>
          <Concept
            title="Dynamiczne pliki konfiguracyjne"
            color="var(--c-blue)"
          >
            Plik z rozszerzeniem <code className="text-xs">.j2</code> uzywajacy
            zmiennych Ansible.
          </Concept>
          <Divider />
          <SectionLabel>templates/vhost.conf.j2</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              &lt;VirtualHost *:{'{{'} apache_port {'}}'}&gt;
            </Cmd>
            <Cmd>
              {'    '}ServerName {'{{'} apache_domain {'}}'}
            </Cmd>
            <Cmd>
              {'    '}ServerAdmin {'{{'} apache_admin_email {'}}'}
            </Cmd>
            <Cmd>
              {'    '}DocumentRoot {'{{'} apache_document_root {'}}'}
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              {'    '}
              {'{% for site in apache_sites %}'}
            </Cmd>
            <Cmd>
              {'    '}# Site: {'{{'} site.name {'}}'}
            </Cmd>
            <Cmd>
              {'    '}
              {'{% endfor %}'}
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              {'    '}
              {'{% if enable_ssl | default(false) %}'}
            </Cmd>
            <Cmd>{'    '}SSLEngine on</Cmd>
            <Cmd>
              {'    '}
              {'{% endif %}'}
            </Cmd>
            <Cmd>&lt;/VirtualHost&gt;</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Skladnia Jinja2</SectionLabel>
          <Row code="{{ var }}">interpolacja zmiennej</Row>
          <Row code="{% if %}{% endif %}">warunek</Row>
          <Row code="{% for %}{% endfor %}">petla</Row>
          <Row code="{# komentarz #}">komentarz</Row>
          <Row code="| filter">filter (np. upper, default)</Row>
          <Row code="{{ var | default('x') }}">domyslna wartosc</Row>
        </Card>

        {/* === Defaults === */}
        <Card title="defaults/main.yml" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Cmd>---</Cmd>
            <Cmd>
              apache_port: <V>80</V>
            </Cmd>
            <Cmd>apache_domain: example.com</Cmd>
            <Cmd>apache_admin_email: webmaster@example.com</Cmd>
            <Cmd>
              apache_document_root: /var/www/{'{{'} apache_domain {'}}'}
            </Cmd>
            <Cmd>
              enable_ssl: <V>false</V>
            </Cmd>
            <Cmd>apache_modules:</Cmd>
            <Cmd>{'  '}- rewrite</Cmd>
            <Cmd>{'  '}- ssl</Cmd>
            <Cmd>{'  '}- headers</Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Tip:</b> kazda zmienna w roli powinna byc w defaults. Inaczej nie
            wiesz co konfigurowac.
          </InfoBox>
        </Card>

        {/* === Uzycie roli === */}
        <Card title="Uzycie roli w playbook" color="var(--c-green)" full>
          <ExampleBlock variant="green">
            <Cmd>---</Cmd>
            <Cmd>- name: Configure web servers</Cmd>
            <Cmd>{'  '}hosts: web_servers</Cmd>
            <Cmd>
              {'  '}become: <V>true</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>{'  '}roles:</Cmd>
            <Cmd>{'    '}- common</Cmd>
            <Cmd>{'    '}- role: apache</Cmd>
            <Cmd>{'      '}vars:</Cmd>
            <Cmd>
              {'        '}apache_port: <V>8080</V>
            </Cmd>
            <Cmd>{'        '}apache_domain: site.example.com</Cmd>
            <Cmd>{'    '}- role: monitoring</Cmd>
            <Cmd>
              {'      '}when: enable_monitoring | default(<V>true</V>)
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>pre_tasks i post_tasks</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>{'  '}pre_tasks:</Cmd>
            <Cmd>{'    '}- name: Update apt cache</Cmd>
            <Cmd>
              {'      '}apt: update_cache=yes cache_valid_time=<V>3600</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>{'  '}roles:</Cmd>
            <Cmd>{'    '}- apache</Cmd>
            <Cmd> </Cmd>
            <Cmd>{'  '}post_tasks:</Cmd>
            <Cmd>{'    '}- name: Smoke test</Cmd>
            <Cmd>{'      '}uri:</Cmd>
            <Cmd>{'        '}url: http://localhost/</Cmd>
            <Cmd>
              {'        '}status_code: <V>200</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Zaleznosci === */}
        <Card title="Zaleznosci miedzy rolami" color="var(--c-purple)">
          <SectionLabel>meta/main.yml</SectionLabel>
          <ExampleBlock variant="purple">
            <Cmd>---</Cmd>
            <Cmd>galaxy_info:</Cmd>
            <Cmd>{'  '}author: Twoje Imie</Cmd>
            <Cmd>{'  '}license: MIT</Cmd>
            <Cmd>
              {'  '}min_ansible_version: <V>2.10</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>dependencies:</Cmd>
            <Cmd>{'  '}- role: common</Cmd>
            <Cmd>{'    '}vars:</Cmd>
            <Cmd>{'      '}common_packages: [git, curl, vim]</Cmd>
            <Cmd>{'  '}- role: security</Cmd>
          </ExampleBlock>
          <InfoBox>
            Zaleznosci uruchamiaja sie <b>przed</b> glowna rola. Pozwala to na
            hierarchie: web_server zalezy od common + security.
          </InfoBox>
        </Card>

        {/* === Multi-env === */}
        <Card
          title="Wiele srodowisk (dev/staging/prod)"
          color="var(--c-orange)"
          full
        >
          <Concept title="Oddzielne katalogi inventory" color="var(--c-orange)">
            Najlepsza praktyka — kazde srodowisko ma osobny inventory i
            group_vars.
          </Concept>
          <Divider />
          <ExampleBlock variant="default">
            <Cmd>environments/</Cmd>
            <Cmd>├── dev/</Cmd>
            <Cmd>│{'   '}├── inventory.ini</Cmd>
            <Cmd>│{'   '}└── group_vars/</Cmd>
            <Cmd>│{'       '}├── all.yml</Cmd>
            <Cmd>│{'       '}└── webservers.yml</Cmd>
            <Cmd>├── staging/</Cmd>
            <Cmd>│{'   '}├── inventory.ini</Cmd>
            <Cmd>│{'   '}└── group_vars/...</Cmd>
            <Cmd>└── prod/</Cmd>
            <Cmd>{'    '}├── inventory.ini</Cmd>
            <Cmd>{'    '}└── group_vars/...</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>environments/dev/group_vars/all.yml</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>---</Cmd>
            <Cmd>env_name: development</Cmd>
            <Cmd>
              debug_mode: <V>true</V>
            </Cmd>
            <Cmd>log_level: debug</Cmd>
            <Cmd>db_host: dev-db.local</Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">
            environments/prod/group_vars/all.yml
          </SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>---</Cmd>
            <Cmd>env_name: production</Cmd>
            <Cmd>
              debug_mode: <V>false</V>
            </Cmd>
            <Cmd>log_level: error</Cmd>
            <Cmd>db_host: prod-db.internal</Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">Uruchomienie</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              ansible-playbook -i environments/dev/inventory.ini site.yml
            </Cmd>
            <Cmd>
              ansible-playbook -i environments/prod/inventory.ini site.yml
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Vault === */}
        <Card title="Ansible Vault — sekrety" color="var(--c-yellow)" full>
          <Concept title="Sekrety w repo" color="var(--c-yellow)">
            Vault szyfruje pliki YAML — mozesz je commitowac w Git bezpiecznie.
            Klucz vault trzymasz osobno.
          </Concept>
          <Divider />
          <ExampleBlock variant="yellow">
            <Comment># Utworz zaszyfrowany plik</Comment>
            <Cmd>ansible-vault create secrets.yml</Cmd>
            <Cmd> </Cmd>
            <Comment># Edytuj</Comment>
            <Cmd>ansible-vault edit secrets.yml</Cmd>
            <Cmd> </Cmd>
            <Comment># Zaszyfruj istniejacy plik</Comment>
            <Cmd>ansible-vault encrypt vars/db.yml</Cmd>
            <Cmd> </Cmd>
            <Comment># Odszyfruj (tylko do podgladu)</Comment>
            <Cmd>ansible-vault view secrets.yml</Cmd>
            <Cmd> </Cmd>
            <Comment># Odszyfruj plik na stale</Comment>
            <Cmd>ansible-vault decrypt secrets.yml</Cmd>
            <Cmd> </Cmd>
            <Comment># Uruchom playbook z vault</Comment>
            <Cmd>ansible-playbook site.yml --ask-vault-pass</Cmd>
            <Cmd>ansible-playbook site.yml --vault-password-file ~/.vault</Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Pojedyncze zmienne</b> mozna szyfrowac in-line:
            <code className="text-xs"> ansible-vault encrypt_string</code>.
          </InfoBox>
        </Card>

        {/* === Bloki === */}
        <Card title="Bloki (block/rescue/always)" color="var(--c-blue)" full>
          <ExampleBlock variant="default">
            <Cmd>- name: Update with rollback</Cmd>
            <Cmd>{'  '}block:</Cmd>
            <Cmd>{'    '}- name: Stop app</Cmd>
            <Cmd>{'      '}service: name=myapp state=stopped</Cmd>
            <Cmd>{'    '}- name: Update files</Cmd>
            <Cmd>{'      '}copy: src=app/ dest=/opt/myapp/</Cmd>
            <Cmd>{'    '}- name: Start app</Cmd>
            <Cmd>{'      '}service: name=myapp state=started</Cmd>
            <Cmd>{'  '}rescue:</Cmd>
            <Cmd>{'    '}- name: Rollback from backup</Cmd>
            <Cmd>{'      '}command: /opt/restore.sh</Cmd>
            <Cmd>{'    '}- name: Notify ops</Cmd>
            <Cmd>
              {'      '}mail: subject=<V>"Update failed"</V>
            </Cmd>
            <Cmd>{'  '}always:</Cmd>
            <Cmd>{'    '}- name: Log attempt</Cmd>
            <Cmd>
              {'      '}lineinfile: path=/var/log/updates.log line=<V>"..."</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="block">grupa zadan</Row>
          <Row code="rescue">uruchom przy bledzie (catch)</Row>
          <Row code="always">zawsze (finally)</Row>
        </Card>

        {/* === Strategie === */}
        <Card title="Kontrolowany rollout — serial" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Cmd>- name: Rolling update</Cmd>
            <Cmd>{'  '}hosts: app_servers</Cmd>
            <Cmd>{'  '}serial:</Cmd>
            <Cmd>
              {'    '}- <V>1</V>
              {'        '}
              <Comment># najpierw 1 host (canary)</Comment>
            </Cmd>
            <Cmd>
              {'    '}- <V>25%</V>
              {'      '}
              <Comment># potem 25%</Comment>
            </Cmd>
            <Cmd>
              {'    '}- <V>50%</V>
              {'      '}
              <Comment># reszta</Comment>
            </Cmd>
            <Cmd>
              {'  '}max_fail_percentage: <V>10</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>{'  '}tasks:</Cmd>
            <Cmd>{'    '}- ...</Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Canary deployment:</b> pierwszy host = test, jak wszystko OK to
            kontynuuj. Bezpieczenstwo prod.
          </InfoBox>
        </Card>

        {/* === Debug === */}
        <Card title="Debug i testowanie" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># Verbose levels</Comment>
            <Cmd>ansible-playbook play.yml -v</Cmd>
            <Cmd>
              ansible-playbook play.yml -vvv{'    '}
              <Comment># debug calej komunikacji</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Dry run</Comment>
            <Cmd>ansible-playbook play.yml --check</Cmd>
            <Cmd>ansible-playbook play.yml --check --diff</Cmd>
            <Cmd> </Cmd>
            <Comment># Krok po kroku (potwierdzanie)</Comment>
            <Cmd>ansible-playbook play.yml --step</Cmd>
            <Cmd> </Cmd>
            <Comment># Start od konkretnego zadania</Comment>
            <Cmd>
              ansible-playbook play.yml --start-at-task=<V>"Install Apache"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Tylko niektore tagi</Comment>
            <Cmd>
              ansible-playbook play.yml --tags <V>"deploy,configure"</V>
            </Cmd>
            <Cmd>
              ansible-playbook play.yml --skip-tags <V>"slow"</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Best practices === */}
        <Card title="Best practices" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Struktura</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>site.yml + import_playbook</li>
                <li>roles/ z ansible-galaxy init</li>
                <li>oddzielne inventories per env</li>
                <li>group_vars + host_vars hierarchia</li>
              </ul>
              <SectionLabel className="mt-2">Modul vs shell</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Zawsze prefer modul (idempotencja)</li>
                <li>shell tylko gdy nic innego</li>
                <li>
                  Zawsze: <code className="text-xs">creates:</code> lub{' '}
                  <code className="text-xs">changed_when:</code>
                </li>
              </ul>
              <SectionLabel className="mt-2">Bezpieczenstwo</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Vault dla sekretow</li>
                <li>SSH keys, nie hasla</li>
                <li>become tylko gdy potrzeba</li>
                <li>Code review przed prod</li>
              </ul>
            </div>
            <div>
              <SectionLabel>Git</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Wszystko w Git (oprocz vault password)</li>
                <li>Branche feature/* + PR</li>
                <li>Tag wersje (semver)</li>
                <li>CHANGELOG.md</li>
              </ul>
              <SectionLabel className="mt-2">Nazewnictwo</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>name: dla kazdego task</li>
                <li>Opisowe nazwy zmiennych</li>
                <li>Prefix zmiennych roli (apache_*)</li>
                <li>snake_case</li>
              </ul>
              <SectionLabel className="mt-2">Testowanie</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>ansible-lint</li>
                <li>molecule (test ról)</li>
                <li>--check w CI/CD</li>
                <li>Smoke testy w post_tasks</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* === Slownik === */}
        <Card title="Slownik" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <SectionLabel>Role</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Modulowy zestaw zadan, zmiennych, plikow i szablonow.
              </p>
            </div>
            <div>
              <SectionLabel>Galaxy</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Repo spolecznosciowe rol Ansible.
              </p>
            </div>
            <div>
              <SectionLabel>Template</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Plik Jinja2 (.j2) z dynamicznymi zmiennymi.
              </p>
            </div>
            <div>
              <SectionLabel>Vault</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Szyfrowanie sekretow w plikach YAML.
              </p>
            </div>
            <div>
              <SectionLabel>Tag</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Etykieta zadania dla selektywnego uruchomienia.
              </p>
            </div>
            <div>
              <SectionLabel>Register</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Zmienna z wynikiem zadania dla nastepnych krokow.
              </p>
            </div>
            <div>
              <SectionLabel>Block / Rescue / Always</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Try/catch/finally dla zadan.
              </p>
            </div>
            <div>
              <SectionLabel>Serial</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Liczba/% hostow aktualizowanych jednoczesnie.
              </p>
            </div>
            <div>
              <SectionLabel>Pre/Post Tasks</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Zadania przed/po roli (np. cache update, smoke test).
              </p>
            </div>
          </div>
        </Card>

        {/* === Kryteria === */}
        <Card title="Kryteria oceny" color="var(--c-accent)">
          <Row code="1">Utworzona rola apache (ansible-galaxy init)</Row>
          <Row code="2">Defaults + template + handler dziala razem</Row>
          <Row code="3">Playbook LAMP z 3 rolami (apache + mysql + php)</Row>
          <Row code="4">Multi-env (dev/staging) — rozne zmienne</Row>
          <Row code="5">Vault na haslo bazy</Row>
          <Row code="6">--check + --diff przed prawdziwym deployem</Row>
        </Card>

        {/* === Dokumentacja === */}
        <Card title="Dokumentacja" color="var(--c-purple)">
          <ul className="text-[11px] text-[var(--c-muted)] space-y-1">
            <li>
              <a
                href="https://docs.ansible.com/ansible/latest/user_guide/playbooks_reuse_roles.html"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Ansible — Roles
              </a>
            </li>
            <li>
              <a
                href="https://docs.ansible.com/ansible/latest/user_guide/vault.html"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Ansible Vault
              </a>
            </li>
            <li>
              <a
                href="https://galaxy.ansible.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Ansible Galaxy
              </a>
            </li>
            <li>
              <a
                href="https://ansible.readthedocs.io/projects/lint/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                ansible-lint
              </a>
            </li>
            <li>
              <a
                href="https://ansible.readthedocs.io/projects/molecule/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Molecule (testowanie rol)
              </a>
            </li>
          </ul>
        </Card>
      </div>

      <LessonNav prev={{ to: '/lessons/18', label: '18 — Ansible cz. 1' }} />
    </div>
  );
}
