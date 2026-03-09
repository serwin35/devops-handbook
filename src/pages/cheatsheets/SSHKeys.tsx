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
import Row from '../../components/Row';
import Divider from '../../components/Divider';
import InfoBox from '../../components/InfoBox';
import SectionLabel from '../../components/SectionLabel';
import LessonNav from '../../components/LessonNav';

export default function SSHKeys() {
  usePageTitle('SSH Keys');

  return (
    <div>
      <PageHeader
        title="SSH Keys"
        subtitle="ssh-keygen · ssh-copy-id · authorized_keys · agent — zarządzanie kluczami SSH"
        color="var(--c-accent)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Generowanie klucza" color="var(--c-accent)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            ssh-keygen generuje pare kluczy: prywatny + publiczny (.pub)
          </p>
          <ExampleBlock>
            <Comment># domyślny klucz Ed25519 (zalecany)</Comment>
            <Cmd>
              ssh-keygen <H>-t ed25519</H> <V>-C "serwin@devops"</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># RSA 4096-bit (kompatybilnosc)</Comment>
            <Cmd>
              ssh-keygen <H>-t rsa</H> <V>-b 4096</V> -C "serwin@devops"
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># niestandardowa nazwa pliku</Comment>
            <Cmd>
              ssh-keygen -t ed25519 <H>-f</H> <F>~/.ssh/klucz_prod</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="-t">typ klucza (ed25519, rsa, ecdsa)</Row>
          <Row code="-b">długość w bitach (RSA: 4096)</Row>
          <Row code="-C">komentarz (email/nazwa)</Row>
          <Row code="-f">ścieżka do pliku klucza</Row>
          <Row code="-N ''">puste passphrase (bez pytania)</Row>
          <InfoBox>
            <span className="text-[var(--c-accent)] text-[11px]">
              Ed25519 vs RSA
            </span>
            <br />
            Ed25519 jest krótszy, szybszy i bezpieczniejszy. Używaj RSA tylko
            gdy serwer nie wspiera Ed25519.
          </InfoBox>
        </Card>

        <Card title="ssh-copy-id — kopiowanie klucza" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Najszybszy sposob na dodanie klucza publicznego do zdalnego serwera
          </p>
          <ExampleBlock variant="green">
            <Comment># domyślny klucz</Comment>
            <Cmd>
              ssh-copy-id <H>user@serwer</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># konkretny klucz</Comment>
            <Cmd>
              ssh-copy-id <H>-i</H> <F>~/.ssh/klucz_prod.pub</F>{' '}
              <V>user@serwer</V>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># niestandardowy port</Comment>
            <Cmd>
              ssh-copy-id <H>-p 2222</H> user@serwer
            </Cmd>
          </ExampleBlock>
          <Divider />
          <p className="text-[var(--c-muted)] text-[11px]">
            ssh-copy-id automatycznie: dodaje klucz do{' '}
            <code className="text-xs">~/.ssh/authorized_keys</code>, tworzy{' '}
            <code className="text-xs">~/.ssh</code> jeśli nie istnieje, ustawia
            odpowiednie uprawnienia
          </p>
        </Card>

        <Card title="Ręczne dodawanie klucza (echo)" color="var(--c-yellow)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Gdy ssh-copy-id nie jest dostępny lub jesteś już zalogowany na
            serwerze
          </p>
          <SectionLabel>Z lokalnej maszyny (pipe)</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># wyślij klucz przez SSH pipe</Comment>
            <Cmd>
              cat <F>~/.ssh/id_ed25519.pub</F> | ssh <H>user@serwer</H>{' '}
              <V>"mkdir -p ~/.ssh && cat &gt;&gt; ~/.ssh/authorized_keys"</V>
            </Cmd>
          </ExampleBlock>
          <SectionLabel>Już zalogowany na serwerze</SectionLabel>
          <ExampleBlock variant="yellow">
            <Comment># utwórz katalog .ssh</Comment>
            <Cmd>
              mkdir <H>-p</H> <F>~/.ssh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># dodaj klucz publiczny</Comment>
            <Cmd>
              echo <V>"ssh-ed25519 AAAA...klucz... komentarz"</V>{' '}
              <H>&gt;&gt;</H> <F>~/.ssh/authorized_keys</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># UWAGA: &gt; nadpisuje! Używaj &gt;&gt; (dopisz)</Comment>
            <Cmd>
              echo <V>"klucz"</V> <H>&gt;</H> ~/.ssh/authorized_keys{' '}
              <span className="text-[var(--c-danger)]">NADPISZE!</span>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Uprawnienia SSH" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Błędne uprawnienia = SSH odmowi połączenia!
          </p>
          <ExampleBlock variant="orange">
            <Comment># katalog .ssh — tylko właściciel</Comment>
            <Cmd>
              chmod <H>700</H> <F>~/.ssh</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># klucz prywatny — TYLKO odczyt właściciela</Comment>
            <Cmd>
              chmod <H>600</H> <F>~/.ssh/id_ed25519</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># klucz publiczny</Comment>
            <Cmd>
              chmod <H>644</H> <F>~/.ssh/id_ed25519.pub</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># authorized_keys</Comment>
            <Cmd>
              chmod <H>600</H> <F>~/.ssh/authorized_keys</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="orange">
            <Comment># config</Comment>
            <Cmd>
              chmod <H>600</H> <F>~/.ssh/config</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="green">
            <Comment># napraw wszystko naraz</Comment>
            <Cmd>chmod 700 ~/.ssh</Cmd>
            <Cmd>chmod 600 ~/.ssh/*</Cmd>
            <Cmd>chmod 644 ~/.ssh/*.pub</Cmd>
          </ExampleBlock>
          <InfoBox>
            <span className="text-[var(--c-danger)] text-[11px]">
              Typowy błąd
            </span>
            <br />
            <code className="text-xs">Permission denied (publickey)</code> —
            często wynik złych uprawnień, nie złego klucza!
          </InfoBox>
        </Card>

        <Card title="SSH Agent" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Agent przechowuje odszyfrowane klucze w pamięci — nie musisz
            wpisywac passphrase za każdym razem
          </p>
          <ExampleBlock variant="purple">
            <Comment># uruchom agenta</Comment>
            <Cmd>
              eval <H>"$(ssh-agent -s)"</H>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># dodaj klucz do agenta</Comment>
            <Cmd>
              ssh-add <F>~/.ssh/id_ed25519</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="purple">
            <Comment># dodaj z limitem czasu (1h)</Comment>
            <Cmd>
              ssh-add <H>-t 3600</H> <F>~/.ssh/id_ed25519</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <Row code="ssh-add -l">lista załadowanych kluczy</Row>
          <Row code="ssh-add -D">usuń wszystkie klucze z agenta</Row>
          <Row code="ssh-add -d klucz">usuń konkretny klucz</Row>
          <InfoBox>
            <span className="text-[var(--c-accent)] text-[11px]">
              macOS Keychain
            </span>
            <br />
            <code className="text-xs">
              ssh-add --apple-use-keychain ~/.ssh/id_ed25519
            </code>{' '}
            — zapamiętuje passphrase w Keychain
          </InfoBox>
        </Card>

        <Card title="~/.ssh/config" color="var(--c-accent)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">
            Plik konfiguracyjny SSH — aliasy, domyślne opcje, klucze per host
          </p>
          <ExampleBlock>
            <Comment># ~/.ssh/config</Comment>
            <Cmd>
              <H>Host</H> <V>prod</V>
            </Cmd>
            <Cmd>
              {'    '}
              <H>HostName</H> <V>192.168.1.100</V>
            </Cmd>
            <Cmd>
              {'    '}
              <H>User</H> <V>serwin</V>
            </Cmd>
            <Cmd>
              {'    '}
              <H>Port</H> <V>2222</V>
            </Cmd>
            <Cmd>
              {'    '}
              <H>IdentityFile</H> <F>~/.ssh/klucz_prod</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># teraz wystarczy:</Comment>
            <Cmd>
              ssh <H>prod</H>
            </Cmd>
            <Comment>
              # zamiast: ssh -p 2222 -i ~/.ssh/klucz_prod serwin@192.168.1.100
            </Comment>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="purple">
            <Comment># domyślne ustawienia dla wszystkich hostow</Comment>
            <Cmd>
              <H>Host</H> <V>*</V>
            </Cmd>
            <Cmd>
              {'    '}
              <H>AddKeysToAgent</H> <V>yes</V>
            </Cmd>
            <Cmd>
              {'    '}
              <H>ServerAliveInterval</H> <V>60</V>
            </Cmd>
            <Cmd>
              {'    '}
              <H>ServerAliveCountMax</H> <V>3</V>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Zmiana passphrase" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Comment># zmień passphrase istniejacego klucza</Comment>
            <Cmd>
              ssh-keygen <H>-p</H> <V>-f</V> <F>~/.ssh/id_ed25519</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># usuń passphrase (niezalecane!)</Comment>
            <Cmd>
              ssh-keygen <H>-p</H> -f ~/.ssh/id_ed25519 <V>-N ""</V>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Wyświetlanie fingerprint</SectionLabel>
          <ExampleBlock>
            <Comment># fingerprint klucza (SHA256)</Comment>
            <Cmd>
              ssh-keygen <H>-lf</H> <F>~/.ssh/id_ed25519.pub</F>
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># art wizualny klucza</Comment>
            <Cmd>
              ssh-keygen <H>-lvf</H> <F>~/.ssh/id_ed25519.pub</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="authorized_keys — zarządzanie" color="var(--c-green)">
          <SectionLabel>Struktura wpisu</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># typ klucz komentarz</Comment>
            <Cmd>
              <H>ssh-ed25519</H> <V>AAAAC3NzaC1lZDI1NTE5AAAA...</V>{' '}
              <F>serwin@laptop</F>
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Opcje ograniczajace</SectionLabel>
          <ExampleBlock variant="green">
            <Comment># tylko konkretna komenda</Comment>
            <Cmd>
              <H>command="/usr/bin/backup.sh"</H> ssh-ed25519 AAAA...
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># ograniczenie IP</Comment>
            <Cmd>
              <H>from="192.168.1.0/24"</H> ssh-ed25519 AAAA...
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="green">
            <Comment># bez forwarding, bez pty</Comment>
            <Cmd>
              <H>no-port-forwarding,no-pty</H> ssh-ed25519 AAAA...
            </Cmd>
          </ExampleBlock>
          <Divider />
          <ExampleBlock variant="orange">
            <Comment># usuń konkretny klucz z authorized_keys</Comment>
            <Cmd>
              sed <H>-i</H> <V>'/komentarz_klucza/d'</V>{' '}
              <F>~/.ssh/authorized_keys</F>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Diagnostyka i debugowanie" color="var(--c-yellow)">
          <ExampleBlock variant="yellow">
            <Comment># verbose — pokazuje negocjacje klucza</Comment>
            <Cmd>
              ssh <H>-v</H> user@serwer
            </Cmd>
          </ExampleBlock>
          <ExampleBlock variant="yellow">
            <Comment># bardzo verbose</Comment>
            <Cmd>
              ssh <H>-vvv</H> user@serwer
            </Cmd>
          </ExampleBlock>
          <ExampleBlock>
            <Comment># testuj połączenie bez logowania</Comment>
            <Cmd>
              ssh <H>-T</H> git@github.com
            </Cmd>
          </ExampleBlock>
          <Divider />
          <SectionLabel>Typowe problemy</SectionLabel>
          <Row code="Permission denied" codeVariant="orange">
            sprawdź chmod 600/700
          </Row>
          <Row code="Too many auth" codeVariant="orange">
            użyj <code className="text-xs">-i klucz</code> lub config
          </Row>
          <Row code="Host key changed" codeVariant="orange">
            <code className="text-xs">ssh-keygen -R host</code>
          </Row>
          <Row code="Agent refused" codeVariant="orange">
            uruchom <code className="text-xs">eval "$(ssh-agent)"</code>
          </Row>
        </Card>

        <Card title="Wzorce — realne scenariusze" full>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div>
              <SectionLabel>Nowy serwer — pełny setup</SectionLabel>
              <ExampleBlock>
                <Cmd>ssh-keygen -t ed25519 -C "serwin@dev"</Cmd>
                <Cmd>ssh-copy-id user@serwer</Cmd>
                <Cmd>ssh user@serwer</Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>Klucz na serwerze (echo)</SectionLabel>
              <ExampleBlock variant="yellow">
                <Cmd>mkdir -p ~/.ssh</Cmd>
                <Cmd>chmod 700 ~/.ssh</Cmd>
                <Cmd>
                  echo "ssh-ed25519 AAAA..." &gt;&gt; ~/.ssh/authorized_keys
                </Cmd>
                <Cmd>chmod 600 ~/.ssh/authorized_keys</Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>GitHub / GitLab</SectionLabel>
              <ExampleBlock variant="green">
                <Cmd>ssh-keygen -t ed25519 -C "email@git"</Cmd>
                <Cmd>cat ~/.ssh/id_ed25519.pub</Cmd>
                <Comment># skopiuj i wklej w Settings &gt; SSH Keys</Comment>
                <Cmd>ssh -T git@github.com</Cmd>
              </ExampleBlock>
            </div>
            <div>
              <SectionLabel>Wiele kluczy (config)</SectionLabel>
              <ExampleBlock variant="purple">
                <Cmd>Host github.com</Cmd>
                <Cmd>{'  '}IdentityFile ~/.ssh/github_key</Cmd>
                <Cmd>Host gitlab.com</Cmd>
                <Cmd>{'  '}IdentityFile ~/.ssh/gitlab_key</Cmd>
                <Cmd>Host prod</Cmd>
                <Cmd>{'  '}IdentityFile ~/.ssh/prod_key</Cmd>
              </ExampleBlock>
            </div>
          </div>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/cheatsheets/ssh-welcome', label: 'SSH Welcome' }}
        next={{ to: '/cheatsheets/permissions', label: 'Linux Permissions' }}
      />
    </div>
  );
}
