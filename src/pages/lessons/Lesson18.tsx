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

export default function Lesson18() {
  usePageTitle('Lekcja 18 — Ansible cz. 1');

  return (
    <div>
      <PageHeader
        title="Lekcja 18 — Zarzadzanie konfiguracja: Ansible podstawy"
        subtitle="IaC · idempotencja · YAML · inventory · playbook · moduly"
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* === Cele === */}
        <Card title="Cele lekcji" color="var(--c-green)">
          <Concept title="Co poznasz?" color="var(--c-green)">
            Czym jest <b>Configuration Management</b>, jaka jest roznica miedzy
            podejsciem deklaratywnym i imperatywnym, jak zaczac z <b>Ansible</b>{' '}
            — playbook, inventory, moduly.
          </Concept>
          <Divider />
          <Row code="1">Po co zarzadzanie konfiguracja</Row>
          <Row code="2">IaC i idempotencja</Row>
          <Row code="3">Przeglad: Ansible, Chef, Puppet, Salt, Terraform</Row>
          <Row code="4">Architektura Ansible (agentless, SSH)</Row>
          <Row code="5">Inventory + playbook + moduly</Row>
          <Row code="6">Pierwszy playbook (apt, service, copy, template)</Row>
          <Row code="7">ad-hoc commands</Row>
        </Card>

        {/* === Po co CM === */}
        <Card title="Po co Configuration Management?" color="var(--c-purple)">
          <Concept title="Snowflake server" color="var(--c-purple)">
            Kazdy serwer recznie konfigurowany roznia sie roznymi ustawieniami.
            Powtorzenie staje sie niemozliwe.
          </Concept>
          <Divider />
          <SectionLabel>Problemy bez CM</SectionLabel>
          <Row code="-">Reczna konfiguracja podatna na bledy</Row>
          <Row code="-">Brak powtarzalnosci srodowiska</Row>
          <Row code="-">Slaba dokumentacja stanu</Row>
          <Row code="-">Wolne wdrazanie zmian</Row>
          <Row code="-">Trudny rollback</Row>
          <Divider />
          <SectionLabel>Korzysci CM</SectionLabel>
          <Row code="+">Automatyzacja</Row>
          <Row code="+">Spojnosc na N hostach</Row>
          <Row code="+">Powtarzalnosc srodowisk</Row>
          <Row code="+">Wersjonowanie konfiguracji w Git</Row>
          <Row code="+">Kod = dokumentacja</Row>
        </Card>

        {/* === IaC === */}
        <Card title="Infrastructure as Code" color="var(--c-blue)">
          <Concept
            title="IaC = traktuj infrastrukture jak kod"
            color="var(--c-blue)"
          >
            Definiujesz infrastrukture w plikach (YAML, HCL). Trzymasz w Git.
            Code review. Pipeline CI/CD.
          </Concept>
          <Divider />
          <SectionLabel>Filary IaC</SectionLabel>
          <Row code="Deklaratywnie">
            opisujesz <b>jaki ma byc</b> stan
          </Row>
          <Row code="Idempotencja">N-krotne uruchomienie = jeden efekt</Row>
          <Row code="Kontrola wersji">Git, branche, PR</Row>
          <Row code="Automatyzacja">CI/CD pipeline</Row>
          <Row code="Testowalnosc">linty, dry-run, integracja</Row>
          <Divider />
          <InfoBox>
            <b>Deklaratywnie</b> ("pakiet X ma byc zainstalowany") kontra{' '}
            <b>imperatywnie</b> ("uruchom apt install X"). Ansible jest{' '}
            <b>deklaratywne na poziomie modulow</b>.
          </InfoBox>
        </Card>

        {/* === Idempotencja === */}
        <Card title="Idempotencja" color="var(--c-yellow)">
          <Concept title="f(f(x)) == f(x)" color="var(--c-yellow)">
            Operacja jest idempotentna gdy{' '}
            <b>wielokrotne wykonanie daje ten sam wynik</b> co jednokrotne.
          </Concept>
          <Divider />
          <ExampleBlock variant="default">
            <Comment># IDEMPOTENTNE — modul apt</Comment>
            <Cmd>- name: Install nginx</Cmd>
            <Cmd>{'  '}apt: name=nginx state=present</Cmd>
            <Cmd>
              {'  '}
              <Comment># 100x uruchomione = zainstaluje raz</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># NIE-IDEMPOTENTNE — shell</Comment>
            <Cmd>- name: Append line</Cmd>
            <Cmd>
              {'  '}shell: <V>"echo line &gt;&gt; /etc/file"</V>
            </Cmd>
            <Cmd>
              {'  '}
              <Comment># 100x = 100 linii w pliku!</Comment>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            <b>Zawsze preferuj moduly</b> nad{' '}
            <code className="text-xs">shell/command</code>. Modul wie czy
            zmienia stan i raportuje <code className="text-xs">changed</code>.
          </InfoBox>
        </Card>

        {/* === Przeglad narzedzi === */}
        <Card title="Narzedzia CM — przeglad" color="var(--c-orange)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Ansible</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Agentless (SSH)</li>
                <li>YAML — niski prog wejscia</li>
                <li>Push model</li>
                <li>Najpopularniejszy w 2026</li>
              </ul>
              <SectionLabel className="mt-2">Puppet</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Wlasny DSL (Ruby-like)</li>
                <li>Pull model — agent na hoscie</li>
                <li>Dojrzaly, enterprise</li>
              </ul>
              <SectionLabel className="mt-2">Chef</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Ruby DSL — recipes</li>
                <li>Pull model — agent</li>
                <li>Stroma krzywa nauki</li>
              </ul>
            </div>
            <div>
              <SectionLabel>SaltStack</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Python + YAML</li>
                <li>Push i Pull</li>
                <li>Event-driven, szybki</li>
              </ul>
              <SectionLabel className="mt-2">Terraform</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>HCL DSL</li>
                <li>Provisioning chmury (AWS/Azure/GCP)</li>
                <li>Stan deklaratywny + plan/apply</li>
              </ul>
              <SectionLabel className="mt-2">Docker</SectionLabel>
              <ul className="text-[11px] text-[var(--c-muted)] list-disc pl-4 space-y-0.5">
                <li>Dockerfile — IaC dla aplikacji</li>
                <li>Czesto laczone z Ansible</li>
              </ul>
            </div>
          </div>
          <InfoBox>
            <b>W praktyce:</b> Terraform stawia VM-ki, Ansible je konfiguruje,
            Docker pakuje aplikacje, Kubernetes je orkiestruje.
          </InfoBox>
        </Card>

        {/* === Ansible architektura === */}
        <Card title="Architektura Ansible" color="var(--c-blue)" full>
          <Concept title="Agentless + SSH" color="var(--c-blue)">
            Ansible nic nie instaluje na zarzadzanych maszynach. Loguje sie
            SSH-em i wykonuje moduly Pythonowe ad-hoc.
          </Concept>
          <Divider />
          <ExampleBlock variant="default">
            <Cmd>
              {' '}
              [ Control Node ]{'    '}
              <Comment># Twoja maszyna</Comment>
            </Cmd>
            <Cmd> ansible-playbook</Cmd>
            <Cmd> |</Cmd>
            <Cmd> reads → inventory.ini</Cmd>
            <Cmd> playbook.yml</Cmd>
            <Cmd> |</Cmd>
            <Cmd> ▼ SSH</Cmd>
            <Cmd> +------+-------+-------+</Cmd>
            <Cmd> ▼ ▼ ▼</Cmd>
            <Cmd>
              {' '}
              [web1]{'         '}[web2]{'  '}[db1]
            </Cmd>
            <Cmd> managed nodes (no agent!)</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Komponenty</SectionLabel>
          <Row code="Control Node">maszyna z zainstalowanym Ansible</Row>
          <Row code="Managed Node">zarzadzana maszyna (tylko SSH + Python)</Row>
          <Row code="Inventory">lista hostow + grupy</Row>
          <Row code="Playbook">YAML z zadaniami</Row>
          <Row code="Module">Pythonowy worker (apt, service, copy)</Row>
          <Row code="Plugin">rozszerzenie (callback, lookup, filter)</Row>
        </Card>

        {/* === Instalacja === */}
        <Card title="Instalacja Ansible" color="var(--c-green)">
          <ExampleBlock variant="green">
            <Comment># Debian/Ubuntu</Comment>
            <Cmd>
              <H>sudo</H> apt update && <H>sudo</H> apt install -y ansible
            </Cmd>
            <Cmd> </Cmd>
            <Comment># RHEL/CentOS</Comment>
            <Cmd>
              <H>sudo</H> yum install -y epel-release ansible
            </Cmd>
            <Cmd> </Cmd>
            <Comment># macOS</Comment>
            <Cmd>brew install ansible</Cmd>
            <Cmd> </Cmd>
            <Comment># Pip (najnowsza wersja)</Comment>
            <Cmd>pip install ansible</Cmd>
            <Cmd> </Cmd>
            <Cmd>ansible --version</Cmd>
          </ExampleBlock>
          <InfoBox>
            Windows nie obsluguje Control Node natywnie. Uzyj WSL lub VM z
            Linux.
          </InfoBox>
        </Card>

        {/* === Inventory === */}
        <Card title="Inventory" color="var(--c-yellow)" full>
          <Concept title="Lista zarzadzanych maszyn" color="var(--c-yellow)">
            Plik INI lub YAML. Definiuje hosty, grupy i zmienne.
          </Concept>
          <Divider />
          <SectionLabel>inventory.ini</SectionLabel>
          <ExampleBlock variant="yellow">
            <Cmd>[web_servers]</Cmd>
            <Cmd>web1.example.com</Cmd>
            <Cmd>
              web2.example.com ansible_host=<V>10.0.0.5</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>[db_servers]</Cmd>
            <Cmd>db1.example.com</Cmd>
            <Cmd> </Cmd>
            <Cmd>[production:children]</Cmd>
            <Cmd>web_servers</Cmd>
            <Cmd>db_servers</Cmd>
            <Cmd> </Cmd>
            <Cmd>[local]</Cmd>
            <Cmd>127.0.0.1 ansible_connection=local</Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">
            inventory.yml (alternatywnie)
          </SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>all:</Cmd>
            <Cmd>{'  '}children:</Cmd>
            <Cmd>{'    '}web_servers:</Cmd>
            <Cmd>{'      '}hosts:</Cmd>
            <Cmd>{'        '}web1.example.com:</Cmd>
            <Cmd>{'        '}web2.example.com:</Cmd>
            <Cmd>
              {'          '}ansible_host: <V>10.0.0.5</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Test polaczenia</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>ansible all -i inventory.ini -m ping</Cmd>
            <Cmd>ansible web_servers -i inventory.ini -m ping</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Playbook === */}
        <Card title="Playbook — pierwszy" color="var(--c-orange)" full>
          <Concept title="Sekwencja zadan w YAML" color="var(--c-orange)">
            Playbook = lista <b>play</b>. Play = zestaw <b>tasks</b> dla zestawu
            hostow. Task = wywolanie
            <b> modulu</b>.
          </Concept>
          <Divider />
          <SectionLabel>playbook.yml</SectionLabel>
          <ExampleBlock variant="orange">
            <Cmd>---</Cmd>
            <Cmd>- name: Configure web servers</Cmd>
            <Cmd>{'  '}hosts: web_servers</Cmd>
            <Cmd>
              {'  '}become: <V>true</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>{'  '}vars:</Cmd>
            <Cmd>
              {'    '}apache_port: <V>80</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>{'  '}tasks:</Cmd>
            <Cmd>{'    '}- name: Install Apache</Cmd>
            <Cmd>{'      '}ansible.builtin.apt:</Cmd>
            <Cmd>{'        '}name: apache2</Cmd>
            <Cmd>{'        '}state: present</Cmd>
            <Cmd>
              {'        '}update_cache: <V>yes</V>
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>{'    '}- name: Start and enable Apache</Cmd>
            <Cmd>{'      '}ansible.builtin.service:</Cmd>
            <Cmd>{'        '}name: apache2</Cmd>
            <Cmd>{'        '}state: started</Cmd>
            <Cmd>
              {'        '}enabled: <V>true</V>
            </Cmd>
            <Cmd>{'      '}notify: reload apache</Cmd>
            <Cmd> </Cmd>
            <Cmd>{'  '}handlers:</Cmd>
            <Cmd>{'    '}- name: reload apache</Cmd>
            <Cmd>{'      '}ansible.builtin.service:</Cmd>
            <Cmd>{'        '}name: apache2</Cmd>
            <Cmd>{'        '}state: reloaded</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Uruchomienie</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>ansible-playbook -i inventory.ini playbook.yml</Cmd>
            <Cmd>
              ansible-playbook -i inventory.ini playbook.yml --check{'  '}
              <Comment># dry-run</Comment>
            </Cmd>
            <Cmd>ansible-playbook -i inventory.ini playbook.yml --diff</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Moduly === */}
        <Card title="Najczestsze moduly" color="var(--c-purple)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>Pakiety</SectionLabel>
              <Row code="apt">Debian/Ubuntu</Row>
              <Row code="yum / dnf">RHEL/CentOS/Fedora</Row>
              <Row code="package">uniwersalny</Row>
              <Row code="pip">Python</Row>
              <Row code="npm">Node.js</Row>
              <SectionLabel className="mt-2">Uslugi</SectionLabel>
              <Row code="service">stary, uniwersalny</Row>
              <Row code="systemd">systemd-specific</Row>
              <SectionLabel className="mt-2">Pliki</SectionLabel>
              <Row code="copy">prosty kopia ze srodla</Row>
              <Row code="template">Jinja2 — dynamiczne</Row>
              <Row code="file">uprawnienia, link, katalog</Row>
              <Row code="lineinfile">edycja konkretnej linii</Row>
              <Row code="blockinfile">blok tekstu</Row>
            </div>
            <div>
              <SectionLabel>Uzytkownicy</SectionLabel>
              <Row code="user">utworz/zmien</Row>
              <Row code="group">grupa</Row>
              <Row code="authorized_key">SSH keys</Row>
              <SectionLabel className="mt-2">Kontrola wersji</SectionLabel>
              <Row code="git">clone, pull</Row>
              <SectionLabel className="mt-2">Wykonanie</SectionLabel>
              <Row code="command">bez powloki (no pipe)</Row>
              <Row code="shell">z powloka</Row>
              <Row code="script">lokalny skrypt</Row>
              <SectionLabel className="mt-2">Debug</SectionLabel>
              <Row code="debug">print zmiennej</Row>
              <Row code="assert">walidacja warunku</Row>
              <Row code="fail">stop z bledem</Row>
            </div>
          </div>
        </Card>

        {/* === ad-hoc === */}
        <Card title="ad-hoc commands" color="var(--c-green)" full>
          <Concept title="Bez playbooka — szybka akcja" color="var(--c-green)">
            Wywolanie pojedynczego modulu na wybranych hostach. Idealne do
            diagnostyki.
          </Concept>
          <Divider />
          <ExampleBlock variant="green">
            <Comment># Ping</Comment>
            <Cmd>ansible all -m ping</Cmd>
            <Cmd> </Cmd>
            <Comment># Shell command</Comment>
            <Cmd>
              ansible web_servers -m shell -a <V>"uptime"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Install pakiet (--become = sudo)</Comment>
            <Cmd>
              ansible web_servers --become -m apt -a{' '}
              <V>"name=htop state=present"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Restart serwisu</Comment>
            <Cmd>
              ansible web_servers --become -m service -a{' '}
              <V>"name=nginx state=restarted"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Skopiuj plik</Comment>
            <Cmd>
              ansible web_servers --become -m copy -a{' '}
              <V>"src=./hosts dest=/etc/hosts"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Sprawdz fakty (info o hoscie)</Comment>
            <Cmd>ansible web1 -m setup</Cmd>
          </ExampleBlock>
        </Card>

        {/* === Tasks szczegoly === */}
        <Card title="Task — szczegoly" color="var(--c-blue)">
          <SectionLabel>Pelna anatomia</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>- name: Install package</Cmd>
            <Cmd>{'  '}ansible.builtin.apt:</Cmd>
            <Cmd>
              {'    '}name:{' '}
              <V>
                "{'{{'} pkg_name {'}}'}"
              </V>
            </Cmd>
            <Cmd>{'    '}state: present</Cmd>
            <Cmd>
              {'  '}when: ansible_os_family == <V>"Debian"</V>
            </Cmd>
            <Cmd>{'  '}tags: [packages]</Cmd>
            <Cmd>{'  '}register: install_result</Cmd>
            <Cmd>{'  '}notify: restart service</Cmd>
            <Cmd>{'  '}loop:</Cmd>
            <Cmd>{'    '}- nginx</Cmd>
            <Cmd>{'    '}- htop</Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="name">opisowa nazwa (logi)</Row>
          <Row code="when">warunek (z faktow lub zmiennych)</Row>
          <Row code="loop">iteracja</Row>
          <Row code="register">zapisz wynik do zmiennej</Row>
          <Row code="notify">handler do uruchomienia po zmianie</Row>
          <Row code="tags">selektywne uruchamianie</Row>
        </Card>

        {/* === Zmienne === */}
        <Card title="Zmienne i fakty" color="var(--c-yellow)">
          <SectionLabel>Definiowanie</SectionLabel>
          <ExampleBlock variant="default">
            <Comment># W playbook</Comment>
            <Cmd>vars:</Cmd>
            <Cmd>
              {'  '}port: <V>80</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># W pliku</Comment>
            <Cmd>vars_files:</Cmd>
            <Cmd>{'  '}- vars/main.yml</Cmd>
            <Cmd> </Cmd>
            <Comment># Z CLI</Comment>
            <Cmd>
              ansible-playbook play.yml -e <V>"port=8080"</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Group_vars / host_vars</Comment>
            <Cmd>group_vars/web_servers.yml</Cmd>
            <Cmd>host_vars/web1.example.com.yml</Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Fakty</SectionLabel>
          <Row code="ansible_os_family">Debian / RedHat</Row>
          <Row code="ansible_distribution">Ubuntu, CentOS</Row>
          <Row code="ansible_hostname">krotka nazwa</Row>
          <Row code="ansible_default_ipv4.address">IP</Row>
          <Row code="ansible_processor_vcpus">liczba CPU</Row>
        </Card>

        {/* === Slownik === */}
        <Card title="Slownik" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <SectionLabel>Playbook</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Plik YAML z lista play (sekwencji zadan dla zestawu hostow).
              </p>
            </div>
            <div>
              <SectionLabel>Inventory</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Lista hostow + grupy + zmienne. INI lub YAML.
              </p>
            </div>
            <div>
              <SectionLabel>Task</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Pojedynczy krok wywolujacy modul.
              </p>
            </div>
            <div>
              <SectionLabel>Module</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Skrypt Pythonowy wykonujacy zadanie (apt, service, copy).
              </p>
            </div>
            <div>
              <SectionLabel>Handler</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Specjalny task uruchamiany przez{' '}
                <code className="text-xs">notify</code> tylko po zmianie.
              </p>
            </div>
            <div>
              <SectionLabel>Fact</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Zmienna zebrana z hosta (OS, IP, CPU).
              </p>
            </div>
            <div>
              <SectionLabel>Idempotencja</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Wielokrotne uruchomienie = ten sam efekt.
              </p>
            </div>
            <div>
              <SectionLabel>Agentless</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Bez agenta na hoscie — tylko SSH + Python.
              </p>
            </div>
            <div>
              <SectionLabel>YAML</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)]">
                Format konfiguracyjny — wciecia, dwukropki, listy.
              </p>
            </div>
          </div>
        </Card>

        {/* === Kryteria === */}
        <Card title="Kryteria oceny" color="var(--c-accent)">
          <Row code="1">Ansible zainstalowany, dziala ansible --version</Row>
          <Row code="2">Inventory + ping na localhost dziala</Row>
          <Row code="3">Playbook instalujacy nginx i startujacy go</Row>
          <Row code="4">Handler reload uruchamia sie po zmianie configu</Row>
          <Row code="5">Uzycie ad-hoc commands do diagnostyki</Row>
        </Card>

        {/* === Dokumentacja === */}
        <Card title="Dokumentacja" color="var(--c-purple)">
          <ul className="text-[11px] text-[var(--c-muted)] space-y-1">
            <li>
              <a
                href="https://docs.ansible.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Ansible Documentation
              </a>
            </li>
            <li>
              <a
                href="https://docs.ansible.com/ansible/latest/collections/index_module.html"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Module Index
              </a>
            </li>
            <li>
              <a
                href="https://docs.ansible.com/ansible/latest/user_guide/playbooks_best_practices.html"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--c-accent)] hover:underline"
              >
                Playbook Best Practices
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
          </ul>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/17', label: '17 — Bazy cz. 2 (HA)' }}
        next={{ to: '/lessons/19', label: '19 — Ansible cz. 2' }}
      />
    </div>
  );
}
