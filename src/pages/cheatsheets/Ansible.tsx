import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
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

export default function Ansible() {
  usePageTitle('Ansible — cheatsheet');

  return (
    <div>
      <PageHeader
        title="Ansible · playbook · role · vault"
        subtitle="inventory · ad-hoc · moduly · jinja2 · multi-env"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === ad-hoc === */}
        <Card title="ad-hoc commands" color="var(--c-green)" full>
          <ExampleBlock variant="green">
            <Comment># Test polaczenia</Comment>
            <Cmd>ansible all -m ping</Cmd>
            <Cmd>ansible web_servers -m ping -i inventory.ini</Cmd>
            <Cmd> </Cmd>
            <Comment># Shell command</Comment>
            <Cmd>
              ansible all -m shell -a <V>"uptime"</V>
            </Cmd>
            <Cmd>
              ansible all -m command -a <V>"df -h"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Pakiety</Comment>
            <Cmd>
              ansible all --become -m apt -a{' '}
              <V>"name=htop state=present update_cache=yes"</V>
            </Cmd>
            <Cmd>
              ansible all --become -m yum -a <V>"name=htop state=latest"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Uslugi</Comment>
            <Cmd>
              ansible all --become -m service -a{' '}
              <V>"name=nginx state=restarted"</V>
            </Cmd>
            <Cmd>
              ansible all --become -m systemd -a{' '}
              <V>"name=nginx state=started enabled=yes"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Pliki</Comment>
            <Cmd>
              ansible all --become -m copy -a{' '}
              <V>"src=./file dest=/tmp/file owner=root mode=0644"</V>
            </Cmd>
            <Cmd>
              ansible all --become -m file -a{' '}
              <V>"path=/tmp/dir state=directory mode=0755"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Fakty (info o hostach)</Comment>
            <Cmd>ansible all -m setup</Cmd>
            <Cmd>
              ansible all -m setup -a <V>"filter=ansible_distribution*"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Reboot + czekanie</Comment>
            <Cmd>ansible all --become -m reboot</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Inventory === */}
        <Card title="Inventory (INI)" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Cmd>[web_servers]</Cmd>
            <Cmd>web1.example.com</Cmd>
            <Cmd>
              web2 ansible_host=<V>10.0.0.5</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>[db_servers]</Cmd>
            <Cmd>
              db1.example.com ansible_port=<V>2222</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>[production:children]</Cmd>
            <Cmd>web_servers</Cmd>
            <Cmd>db_servers</Cmd>
            <Cmd> </Cmd>
            <Cmd>[all:vars]</Cmd>
            <Cmd>ansible_user=ubuntu</Cmd>
            <Cmd>ansible_ssh_private_key_file=~/.ssh/id_rsa</Cmd>
            <Cmd> </Cmd>
            <Cmd>[local]</Cmd>
            <Cmd>127.0.0.1 ansible_connection=local</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Inventory YAML === */}
        <Card title="Inventory (YAML)" color="var(--c-yellow)">
          <ExampleBlock variant="default">
            <Cmd>all:</Cmd>
            <Cmd>{'  '}children:</Cmd>
            <Cmd>{'    '}web_servers:</Cmd>
            <Cmd>{'      '}hosts:</Cmd>
            <Cmd>{'        '}web1.example.com:</Cmd>
            <Cmd>{'        '}web2:</Cmd>
            <Cmd>
              {'          '}ansible_host: <V>10.0.0.5</V>
            </Cmd>
            <Cmd>{'    '}db_servers:</Cmd>
            <Cmd>{'      '}hosts:</Cmd>
            <Cmd>{'        '}db1.example.com:</Cmd>
            <Cmd>{'    '}production:</Cmd>
            <Cmd>{'      '}children:</Cmd>
            <Cmd>{'        '}web_servers:</Cmd>
            <Cmd>{'        '}db_servers:</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Playbook === */}
        <Card title="Playbook (site.yml)" color="var(--c-blue)" full>
          <ExampleBlock variant="purple">
            <Cmd>---</Cmd>
            <Cmd>- name: Configure web servers</Cmd>
            <Cmd>{'  '}hosts: web_servers</Cmd>
            <Cmd>
              {'  '}become: <V>true</V>
            </Cmd>
            <Cmd>
              {'  '}gather_facts: <V>true</V>
            </Cmd>
            <Cmd>
              {'  '}serial: <V>2</V>
              {'    '}
              <Comment># rolling update</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>{'  '}vars:</Cmd>
            <Cmd>
              {'    '}port: <V>80</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>{'  '}vars_files:</Cmd>
            <Cmd>{'    '}- vars/common.yml</Cmd>
            <Cmd> </Cmd>
            <Cmd>{'  '}pre_tasks:</Cmd>
            <Cmd>{'    '}- name: Update cache</Cmd>
            <Cmd>
              {'      '}apt: update_cache=yes cache_valid_time=<V>3600</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>{'  '}roles:</Cmd>
            <Cmd>{'    '}- common</Cmd>
            <Cmd>{'    '}- role: nginx</Cmd>
            <Cmd>{'      '}vars:</Cmd>
            <Cmd>
              {'        '}nginx_port:{' '}
              <V>
                "{'{{'} port {'}}'}"
              </V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>{'  '}tasks:</Cmd>
            <Cmd>{'    '}- name: Custom task</Cmd>
            <Cmd>
              {'      '}debug: msg=<V>"Konfiguracja zakonczona"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>{'  '}post_tasks:</Cmd>
            <Cmd>{'    '}- name: Smoke test</Cmd>
            <Cmd>
              {'      '}uri: url=http://localhost/ status_code=<V>200</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>{'  '}handlers:</Cmd>
            <Cmd>{'    '}- name: reload nginx</Cmd>
            <Cmd>{'      '}service: name=nginx state=reloaded</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Uruchamianie === */}
        <Card title="Uruchamianie playbookow" color="var(--c-orange)" full>
          <ExampleBlock variant="orange">
            <Comment># Podstawowe</Comment>
            <Cmd>ansible-playbook -i inventory.ini site.yml</Cmd>
            <Cmd> </Cmd>
            <Comment># Dry-run (--check) + diff</Comment>
            <Cmd>ansible-playbook -i inv site.yml --check --diff</Cmd>
            <Cmd> </Cmd>
            <Comment># Verbose levels</Comment>
            <Cmd>ansible-playbook site.yml -v</Cmd>
            <Cmd>
              ansible-playbook site.yml -vvv{'   '}
              <Comment># debug SSH</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Krok po kroku</Comment>
            <Cmd>ansible-playbook site.yml --step</Cmd>
            <Cmd> </Cmd>
            <Comment># Zacznij od konkretnego zadania</Comment>
            <Cmd>
              ansible-playbook site.yml --start-at-task=<V>"Install nginx"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Tagi</Comment>
            <Cmd>
              ansible-playbook site.yml --tags <V>"deploy,config"</V>
            </Cmd>
            <Cmd>
              ansible-playbook site.yml --skip-tags <V>"slow"</V>
            </Cmd>
            <Cmd>ansible-playbook site.yml --list-tags</Cmd>
            <Cmd>ansible-playbook site.yml --list-tasks</Cmd>
            <Cmd> </Cmd>
            <Comment># Zmienne z CLI</Comment>
            <Cmd>
              ansible-playbook site.yml -e <V>"user=app port=8080"</V>
            </Cmd>
            <Cmd>ansible-playbook site.yml -e @vars/prod.yml</Cmd>
            <Cmd> </Cmd>
            <Comment># Wybrane hosty</Comment>
            <Cmd>ansible-playbook site.yml --limit web1</Cmd>
            <Cmd>
              ansible-playbook site.yml --limit{' '}
              <V>'web_servers:&amp;production'</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Task === */}
        <Card title="Task — features" color="var(--c-green)" full>
          <ExampleBlock variant="green">
            <Cmd>- name: Install packages</Cmd>
            <Cmd>{'  '}apt:</Cmd>
            <Cmd>
              {'    '}name:{' '}
              <V>
                "{'{{'} item {'}}'}"
              </V>
            </Cmd>
            <Cmd>{'    '}state: present</Cmd>
            <Cmd>{'  '}loop:</Cmd>
            <Cmd>{'    '}- nginx</Cmd>
            <Cmd>{'    '}- htop</Cmd>
            <Cmd>{'    '}- vim</Cmd>
            <Cmd>
              {'  '}when: ansible_os_family == <V>"Debian"</V>
            </Cmd>
            <Cmd>{'  '}tags: [packages, install]</Cmd>
            <Cmd>{'  '}register: install_result</Cmd>
            <Cmd>{'  '}notify: reload nginx</Cmd>
            <Cmd>
              {'  '}ignore_errors: <V>false</V>
            </Cmd>
            <Cmd>
              {'  '}retries: <V>3</V>
            </Cmd>
            <Cmd>
              {'  '}delay: <V>5</V>
            </Cmd>
            <Cmd>{'  '}until: install_result is succeeded</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Loop z dictionary</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>loop:</Cmd>
            <Cmd>
              {'  '}- {'{'} name: <V>'jan'</V>, group: <V>'admin'</V> {'}'}
            </Cmd>
            <Cmd>
              {'  '}- {'{'} name: <V>'anna'</V>, group: <V>'user'</V> {'}'}
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              name:{' '}
              <V>
                "{'{{'} item.name {'}}'}"
              </V>
            </Cmd>
            <Cmd>
              groups:{' '}
              <V>
                "{'{{'} item.group {'}}'}"
              </V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Moduly === */}
        <Card title="Najczestsze moduly" color="var(--c-purple)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Pakiety i uslugi</SectionLabel>
              <Row code="apt / yum / dnf">menedzer dystrybucji</Row>
              <Row code="package">uniwersalny</Row>
              <Row code="pip">Python pkgs</Row>
              <Row code="npm">Node pkgs</Row>
              <Row code="service / systemd">uslugi</Row>
              <SectionLabel className="mt-2">Pliki</SectionLabel>
              <Row code="copy">prosty kopia</Row>
              <Row code="template">Jinja2 (.j2)</Row>
              <Row code="file">prawa, link, dir</Row>
              <Row code="lineinfile">edycja linii</Row>
              <Row code="blockinfile">blok tekstu</Row>
              <Row code="unarchive">tar/zip</Row>
              <Row code="archive">utworz archiwum</Row>
              <Row code="fetch">pobierz z hosta</Row>
            </div>
            <div>
              <SectionLabel>Uzytkownicy</SectionLabel>
              <Row code="user">tworzenie/edycja</Row>
              <Row code="group">grupy</Row>
              <Row code="authorized_key">SSH keys</Row>
              <SectionLabel className="mt-2">Network</SectionLabel>
              <Row code="uri">HTTP request</Row>
              <Row code="get_url">pobierz plik</Row>
              <Row code="ufw / iptables">firewall</Row>
              <SectionLabel className="mt-2">VCS / Container</SectionLabel>
              <Row code="git">clone/pull</Row>
              <Row code="community.docker.docker_container">Docker</Row>
              <SectionLabel className="mt-2">Debug</SectionLabel>
              <Row code="debug">print zmiennej</Row>
              <Row code="assert">walidacja</Row>
              <Row code="fail">stop z bledem</Row>
              <Row code="wait_for">czekaj na warunek</Row>
            </div>
          </div>
        </Card>

        {/* === Role === */}
        <Card title="Role — struktura" color="var(--c-blue)" full>
          <ExampleBlock variant="default">
            <Cmd>roles/apache/</Cmd>
            <Cmd>
              ├── tasks/main.yml{'         '}
              <Comment># wymagany</Comment>
            </Cmd>
            <Cmd>
              ├── handlers/main.yml{'      '}
              <Comment># notyfikacje</Comment>
            </Cmd>
            <Cmd>
              ├── defaults/main.yml{'      '}
              <Comment># low priority vars</Comment>
            </Cmd>
            <Cmd>
              ├── vars/main.yml{'          '}
              <Comment># high priority vars</Comment>
            </Cmd>
            <Cmd>
              ├── files/{'                 '}
              <Comment># statyczne pliki</Comment>
            </Cmd>
            <Cmd>
              ├── templates/{'             '}
              <Comment># Jinja2 .j2</Comment>
            </Cmd>
            <Cmd>
              ├── meta/main.yml{'          '}
              <Comment># metadata + deps</Comment>
            </Cmd>
            <Cmd>└── tests/test.yml</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Tworzenie + Galaxy</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>ansible-galaxy init roles/apache</Cmd>
            <Cmd> </Cmd>
            <Comment># Instalacja roli z Galaxy</Comment>
            <Cmd>ansible-galaxy install geerlingguy.nginx</Cmd>
            <Cmd>ansible-galaxy install -r requirements.yml</Cmd>
            <Cmd> </Cmd>
            <Comment># Lista zainstalowanych</Comment>
            <Cmd>ansible-galaxy list</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Vault === */}
        <Card title="Ansible Vault" color="var(--c-yellow)" full>
          <ExampleBlock variant="yellow">
            <Comment># Tworzenie</Comment>
            <Cmd>ansible-vault create secrets.yml</Cmd>
            <Cmd> </Cmd>
            <Comment># Edycja</Comment>
            <Cmd>ansible-vault edit secrets.yml</Cmd>
            <Cmd> </Cmd>
            <Comment># Zaszyfruj istniejacy</Comment>
            <Cmd>ansible-vault encrypt vars/db.yml</Cmd>
            <Cmd> </Cmd>
            <Comment># Odszyfruj na stale</Comment>
            <Cmd>ansible-vault decrypt vars/db.yml</Cmd>
            <Cmd> </Cmd>
            <Comment># Podglad bez modyfikacji</Comment>
            <Cmd>ansible-vault view secrets.yml</Cmd>
            <Cmd> </Cmd>
            <Comment># Zmiana hasla vault</Comment>
            <Cmd>ansible-vault rekey secrets.yml</Cmd>
            <Cmd> </Cmd>
            <Comment># Pojedyncza zmienna in-line</Comment>
            <Cmd>
              ansible-vault encrypt_string <V>'tajne-haslo'</V> --name
              db_password
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Run z vault</Comment>
            <Cmd>ansible-playbook site.yml --ask-vault-pass</Cmd>
            <Cmd>ansible-playbook site.yml --vault-password-file ~/.vault</Cmd>
          </ExampleBlock>
          <InfoBox>
            Trzymaj <code className="text-xs">~/.vault</code> osobno (nie w
            Git!). W <code className="text-xs">ansible.cfg</code> ustaw{' '}
            <code className="text-xs">vault_password_file</code>.
          </InfoBox>
        </Card>

        {/* === Jinja2 === */}
        <Card title="Jinja2 templates" color="var(--c-orange)" full>
          <ExampleBlock variant="default">
            <Cmd># vhost.conf.j2</Cmd>
            <Cmd>server {'{'}</Cmd>
            <Cmd>
              {'    '}listen {'{{'} port {'}}'};
            </Cmd>
            <Cmd>
              {'    '}server_name {'{{'} domain | default(<V>'localhost'</V>){' '}
              {'}}'};
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              {'    '}
              {'{% if enable_ssl %}'}
            </Cmd>
            <Cmd>
              {'    '}ssl_certificate {'{{'} ssl_cert {'}}'};
            </Cmd>
            <Cmd>
              {'    '}
              {'{% endif %}'}
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              {'    '}
              {'{% for upstream in upstreams %}'}
            </Cmd>
            <Cmd>
              {'    '}upstream {'{{'} upstream.name {'}}'} {'{'}
            </Cmd>
            <Cmd>
              {'        '}server {'{{'} upstream.host {'}}'}:{'{{'}{' '}
              upstream.port {'}}'};
            </Cmd>
            <Cmd>
              {'    '}
              {'}'}
            </Cmd>
            <Cmd>
              {'    '}
              {'{% endfor %}'}
            </Cmd>
            <Cmd>{'}'}</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Filtry</SectionLabel>
          <Row code="| default('x')">domyslna wartosc</Row>
          <Row code="| upper / | lower">wielkosc liter</Row>
          <Row code="| length">dlugosc</Row>
          <Row code="| join(',')">polacz liste</Row>
          <Row code="| to_json / to_yaml">serializacja</Row>
          <Row code="| b64encode">base64</Row>
          <Row code="| regex_replace">regex</Row>
        </Card>

        {/* === Bloki === */}
        <Card title="Block / rescue / always" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Cmd>- name: Try update</Cmd>
            <Cmd>{'  '}block:</Cmd>
            <Cmd>{'    '}- service: name=app state=stopped</Cmd>
            <Cmd>{'    '}- copy: src=new/ dest=/opt/app/</Cmd>
            <Cmd>{'    '}- service: name=app state=started</Cmd>
            <Cmd>{'  '}rescue:</Cmd>
            <Cmd>{'    '}- command: /opt/restore.sh</Cmd>
            <Cmd>
              {'    '}- fail: msg=<V>"Update failed"</V>
            </Cmd>
            <Cmd>{'  '}always:</Cmd>
            <Cmd>
              {'    '}- lineinfile: path=/var/log/upd.log line=<V>"..."</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        {/* === Konfig === */}
        <Card title="ansible.cfg" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Cmd>[defaults]</Cmd>
            <Cmd>inventory = inventory.ini</Cmd>
            <Cmd>roles_path = roles</Cmd>
            <Cmd>
              host_key_checking = <V>False</V>
            </Cmd>
            <Cmd>
              retry_files_enabled = <V>False</V>
            </Cmd>
            <Cmd>vault_password_file = ~/.vault</Cmd>
            <Cmd>stdout_callback = yaml</Cmd>
            <Cmd>
              forks = <V>50</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>[ssh_connection]</Cmd>
            <Cmd>
              pipelining = <V>True</V>
            </Cmd>
            <Cmd>ssh_args = -o ControlMaster=auto -o ControlPersist=60s</Cmd>
          </ExampleBlock>
        </Card>
      </div>
    </div>
  );
}
