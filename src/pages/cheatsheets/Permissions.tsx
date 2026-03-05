import { useState } from 'react'
import { usePageTitle } from '../../hooks/usePageTitle'
import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import ExampleBlock, { Cmd, Comment, H, V, F } from '../../components/ExampleBlock'
import Row from '../../components/Row'
import Divider from '../../components/Divider'
import InfoBox from '../../components/InfoBox'
import SectionLabel from '../../components/SectionLabel'
import LessonNav from '../../components/LessonNav'

function ChmodCalculator() {
  const [bits, setBits] = useState({ u: { r: true, w: true, x: false }, g: { r: true, w: false, x: false }, o: { r: true, w: false, x: false } })

  const toggle = (who, perm) => setBits(prev => ({ ...prev, [who]: { ...prev[who], [perm]: !prev[who][perm] } }))

  const toOctal = (b) => (b.r ? 4 : 0) + (b.w ? 2 : 0) + (b.x ? 1 : 0)
  const toSym = (b) => (b.r ? 'r' : '-') + (b.w ? 'w' : '-') + (b.x ? 'x' : '-')

  const oct = `${toOctal(bits.u)}${toOctal(bits.g)}${toOctal(bits.o)}`
  const sym = toSym(bits.u) + toSym(bits.g) + toSym(bits.o)

  const bitColors = { r: { on: 'bg-[rgba(255,107,53,0.15)] text-[var(--c-orange)] border-[rgba(255,107,53,0.3)]', off: '' }, w: { on: 'bg-[rgba(255,190,11,0.15)] text-[var(--c-yellow)] border-[rgba(255,190,11,0.3)]', off: '' }, x: { on: 'bg-[rgba(127,255,107,0.15)] text-[var(--c-green)] border-[rgba(127,255,107,0.3)]', off: '' } }
  const whoLabels = { u: { label: 'Owner (u)', color: 'var(--c-accent)' }, g: { label: 'Group (g)', color: 'var(--c-purple)' }, o: { label: 'Others (o)', color: 'var(--c-yellow)' } }

  return (
    <div>
      <div className="bg-[var(--c-surface2)] border border-[var(--c-border)] rounded-lg p-3 mb-2.5">
        {Object.entries(whoLabels).map(([who, { label, color }]) => (
          <div key={who} className="flex justify-between items-center mb-2 last:mb-0">
            <div className="text-[11px] uppercase tracking-wider" style={{ color }}>{label}</div>
            <div className="flex gap-1">
              {['r', 'w', 'x'].map(p => (
                <button key={p} onClick={() => toggle(who, p)} className={`w-7 h-7 rounded border border-[var(--c-border)] flex items-center justify-center text-xs font-bold cursor-pointer transition-all ${bits[who][p] ? bitColors[p].on : 'bg-[var(--c-bg)] text-[var(--c-muted)]'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 bg-[#0d1117] border border-[var(--c-border)] rounded-md px-3 py-2">
        <span className="text-2xl font-extrabold text-[var(--c-yellow)]">{oct}</span>
        <span className="text-[15px] tracking-widest">{sym}</span>
        <span className="text-[var(--c-muted)] text-[11px]">chmod {oct} plik</span>
      </div>
    </div>
  )
}

export default function Permissions() {
  return (
    <div>
      <PageHeader title="Linux Permissions" subtitle="chmod · chown · users · groups — kompletny reference board" color="var(--c-green)" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        <Card title="Anatomia uprawnien" full>
          <div className="flex flex-wrap gap-6 items-start">
            <div>
              <div className="flex items-center gap-0.5 text-sm font-bold bg-[var(--c-surface2)] border border-[var(--c-border)] rounded-md px-3 py-2 mb-2 tracking-wider">
                <span className="text-[var(--c-purple)]">-</span>
                <span className="mx-1 text-[var(--c-border)]">|</span>
                <span className="text-[var(--c-orange)]">r</span><span className="text-[var(--c-yellow)]">w</span><span className="text-[var(--c-green)]">x</span>
                <span className="mx-1 text-[var(--c-border)]">|</span>
                <span className="text-[var(--c-orange)]">r</span><span className="text-[var(--c-muted)]">-</span><span className="text-[var(--c-green)]">x</span>
                <span className="mx-1 text-[var(--c-border)]">|</span>
                <span className="text-[var(--c-orange)]">r</span><span className="text-[var(--c-muted)]">-</span><span className="text-[var(--c-muted)]">-</span>
              </div>
              <div className="text-[var(--c-muted)] text-[11px]">-rwxr-xr-- = oktalnie <span className="text-[var(--c-yellow)]">754</span></div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Row code="r" codeVariant="orange"><b>read</b> — czytanie pliku / listowanie katalogu (4)</Row>
              <Row code="w" codeVariant="yellow"><b>write</b> — zapis, modyfikacja, usuwanie (2)</Row>
              <Row code="x" codeVariant="green"><b>execute</b> — uruchamianie / cd do katalogu (1)</Row>
            </div>
          </div>
        </Card>

        <Card title="Interaktywny kalkulator chmod" color="var(--c-yellow)">
          <ChmodCalculator />
        </Card>

        <Card title="Tabela oktalna" color="var(--c-yellow)">
          <div className="grid grid-cols-4 gap-1.5 mb-2.5">
            {[
              [0,'000','---'],[1,'001','--x'],[2,'010','-w-'],[3,'011','-wx'],
              [4,'100','r--'],[5,'101','r-x'],[6,'110','rw-'],[7,'111','rwx']
            ].map(([n,b,p]) => (
              <div key={n} className="bg-[var(--c-surface2)] border border-[var(--c-border)] rounded-md py-2 text-center">
                <div className={`text-xl font-extrabold ${n===7?'text-[var(--c-green)]':'text-[var(--c-yellow)]'}`}>{n}</div>
                <div className="text-[10px] text-[var(--c-muted)]">{b}</div>
                <div className={`text-[11px] ${n===7?'text-[var(--c-green)]':''}`}>{p}</div>
              </div>
            ))}
          </div>
          <Divider />
          <Row code="644" codeVariant="yellow">rw-r--r-- typowy plik</Row>
          <Row code="755" codeVariant="yellow">rwxr-xr-x typowy katalog / skrypt</Row>
          <Row code="600" codeVariant="yellow">rw------- prywatny klucz SSH</Row>
          <Row code="777" codeVariant="yellow">rwxrwxrwx <span className="text-[10px] px-1.5 py-0.5 rounded bg-[rgba(255,59,59,0.15)] text-[var(--c-danger)]">NIEBEZPIECZNE</span></Row>
          <Row code="400" codeVariant="yellow">r-------- tylko odczyt, np. ~/.ssh/id_rsa</Row>
          <Row code="664" codeVariant="yellow">rw-rw-r-- pliki grup deweloperskich</Row>
        </Card>

        <Card title="chmod — tryb symboliczny" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">chmod [kto][operator][uprawnienie] plik</p>
          <Row code="+" codeVariant="green"><span className="text-[10px] px-1.5 py-0.5 rounded bg-[rgba(127,255,107,0.15)] text-[var(--c-green)]">dodaj</span> dodaje uprawnienie bez ruszania reszty</Row>
          <Row code="-" codeVariant="orange"><span className="text-[10px] px-1.5 py-0.5 rounded bg-[rgba(255,107,53,0.15)] text-[var(--c-orange)]">usun</span> usuwa uprawnienie bez ruszania reszty</Row>
          <Row code="="><span className="text-[10px] px-1.5 py-0.5 rounded bg-[rgba(0,229,255,0.15)] text-[var(--c-accent)]">ustaw</span> zastepuje uprawnienia DOKLADNIE podanymi</Row>
          <Divider />
          <ExampleBlock variant="green"><Comment># execute dla wlasciciela</Comment><Cmd>chmod <H>u+x</H> skrypt.sh</Cmd></ExampleBlock>
          <ExampleBlock variant="orange"><Comment># usun write dla grupy i innych</Comment><Cmd>chmod <H>go-w</H> plik.txt</Cmd></ExampleBlock>
          <ExampleBlock><Comment># ustaw dokladnie rw-r--r--</Comment><Cmd>chmod <H>u=rw,g=r,o=r</H> plik.txt</Cmd></ExampleBlock>
          <ExampleBlock variant="purple"><Comment># execute dla wszystkich</Comment><Cmd>chmod <H>a+x</H> skrypt.sh</Cmd></ExampleBlock>
          <ExampleBlock variant="yellow"><Comment># rekurencyjnie</Comment><Cmd>chmod <H>-R</H> <V>755</V> <F>/var/www/html</F></Cmd></ExampleBlock>
        </Card>

        <Card title="chown — zmiana wlasciciela" color="var(--c-purple)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">Skladnia: chown [opcje] uzytkownik[:grupa] plik/katalog</p>
          <ExampleBlock variant="purple"><Comment># zmien wlasciciela na www-data</Comment><Cmd>chown <H>www-data</H> plik.php</Cmd></ExampleBlock>
          <ExampleBlock variant="purple"><Comment># zmien wlasciciela i grupe</Comment><Cmd>chown <H>serwin</H><V>:developers</V> projekt/</Cmd></ExampleBlock>
          <ExampleBlock variant="purple"><Comment># zmien tylko grupe</Comment><Cmd>chown <V>:docker</V> /var/run/docker.sock</Cmd></ExampleBlock>
          <ExampleBlock variant="purple"><Comment># rekurencyjnie</Comment><Cmd>chown <H>-R</H> <V>serwin:serwin</V> <F>~/projekty/</F></Cmd></ExampleBlock>
          <Divider />
          <Row code="-R" codeVariant="purple">rekurencyjnie — cale drzewo katalogow</Row>
          <Row code="-v" codeVariant="purple">verbose — wyswietla kazda zmiane</Row>
          <Row code="--reference=plik" codeVariant="purple">kopiuje wlasnosc z innego pliku</Row>
        </Card>

        <Card title="useradd / usermod" color="var(--c-accent)">
          <ExampleBlock><Comment># adduser = interaktywny</Comment><Cmd>adduser <H>serwin</H></Cmd></ExampleBlock>
          <ExampleBlock><Cmd>useradd <H>-m</H> <V>-s /bin/bash</V> <F>-G sudo,docker</F> serwin</Cmd></ExampleBlock>
          <Row code="-g grupa">glowna grupa (primary)</Row>
          <Row code="-u 1500">reczne UID</Row>
          <Row code="-d /custom/home">niestandardowy home</Row>
          <Row code="-r">system account</Row>
          <ExampleBlock variant="green"><Comment># dodaj do grupy (zachowaj stare)</Comment><Cmd>usermod <H>-aG</H> <V>docker</V> <F>serwin</F></Cmd></ExampleBlock>
          <ExampleBlock variant="orange"><Comment># UWAGA: -G bez -a ZASTEPUJE!</Comment><Cmd>usermod <H>-G</H> docker serwin</Cmd></ExampleBlock>
          <Divider />
          <Row code="-aG grp" codeVariant="green">ZAWSZE uzywaj -a przy -G</Row>
          <Row code="-L">zablokuj konto</Row>
          <Row code="-U">odblokuj konto</Row>
          <Row code="-l nowa">zmien login</Row>
          <Row code="-d /nowy -m">zmien i przenies home</Row>
          <Row code="-s /bin/zsh">zmien shell</Row>
        </Card>

        <Card title="chgrp — zmiana grupy" color="var(--c-orange)">
          <p className="text-[var(--c-muted)] text-[11px] mb-2.5">Dedykowane narzedzie do zmiany grupy pliku/katalogu</p>
          <ExampleBlock variant="orange"><Comment># zmien grupe pliku</Comment><Cmd>chgrp <H>docker</H> /var/run/docker.sock</Cmd></ExampleBlock>
          <ExampleBlock variant="orange"><Comment># rekurencyjnie</Comment><Cmd>chgrp <H>-R</H> <V>www-data</V> <F>/var/www/</F></Cmd></ExampleBlock>
          <Divider />
          <p className="text-[var(--c-muted)] text-[11px] mb-2">chgrp to skrot dla chown :grupa</p>
          <InfoBox><span className="text-[var(--c-accent)] text-[11px]">Sprawdzenie uprawnien</span><br /><code className="text-xs">ls -la</code> plik.txt · <code className="text-xs">stat</code> plik.txt · <code className="text-xs">getfacl</code> plik.txt</InfoBox>
        </Card>

        <Card title="groupadd / groupmod / groupdel" color="var(--c-purple)">
          <ExampleBlock variant="purple"><Comment># utworz grupe</Comment><Cmd>groupadd <H>developers</H></Cmd></ExampleBlock>
          <ExampleBlock variant="purple"><Comment># zmien nazwe grupy</Comment><Cmd>groupmod <H>-n</H> newname oldname</Cmd></ExampleBlock>
          <ExampleBlock variant="orange"><Comment># usun grupe</Comment><Cmd>groupdel <H>developers</H></Cmd></ExampleBlock>
          <Divider />
          <ExampleBlock><Comment># usun/dodaj usera z/do grupy</Comment><Cmd>gpasswd <H>-d</H> <V>serwin</V> <F>docker</F> <span className="text-[var(--c-muted)]"># usun</span></Cmd><Cmd>gpasswd <H>-a</H> <V>serwin</V> <F>docker</F> <span className="text-[var(--c-muted)]"># dodaj</span></Cmd></ExampleBlock>
        </Card>

        <Card title="userdel / passwd / su / sudo">
          <ExampleBlock variant="orange"><Cmd>userdel <H>serwin</H> <span className="text-[var(--c-muted)]"># zachowaj home</span></Cmd><Cmd>userdel <H>-r</H> serwin <span className="text-[var(--c-muted)]"># usun z home</span></Cmd></ExampleBlock>
          <Divider />
          <ExampleBlock><Cmd>passwd <H>serwin</H> <span className="text-[var(--c-muted)]"># zmien haslo</span></Cmd><Cmd>passwd <H>-l</H> serwin <span className="text-[var(--c-muted)]"># zablokuj</span></Cmd><Cmd>passwd <H>-e</H> serwin <span className="text-[var(--c-muted)]"># wymus zmiane</span></Cmd></ExampleBlock>
          <Divider />
          <Row code="su - user">przelacz na konto usera</Row>
          <Row code="sudo -u user cmd">wykonaj jako inny user</Row>
          <Row code="sudo -i">interaktywna powloka roota</Row>
          <Row code="sudo -l">lista uprawnien sudo</Row>
        </Card>

        <Card title="Diagnostyka i podglad" color="var(--c-yellow)">
          <SectionLabel>Uzytkownicy</SectionLabel>
          <Row code="id">uid/gid/grupy</Row>
          <Row code="whoami">aktualny user</Row>
          <Row code="who">zalogowani</Row>
          <Row code="groups user">grupy usera</Row>
          <Row code="cat /etc/passwd">lista userow</Row>
          <Divider />
          <SectionLabel className="mt-1.5">Grupy i pliki</SectionLabel>
          <Row code="cat /etc/group">lista grup</Row>
          <Row code="getent group">grupy (+ LDAP)</Row>
          <Row code="ls -la">uprawnienia plikow</Row>
          <Row code="stat plik">pelne metadane</Row>
          <Row code="find / -user u">pliki usera</Row>
          <InfoBox>Po dodaniu usera do grupy: <code className="text-xs">newgrp docker</code> — lub wyloguj/zaloguj sie ponownie</InfoBox>
        </Card>

        <Card title="Specjalne bity" color="var(--c-green)">
          <Row code="setuid" codeVariant="orange">Wykonaj jako wlasciciel. <code className="text-xs">s</code> w pozycji x ownera.</Row>
          <ExampleBlock variant="orange"><Cmd>chmod <H>u+s</H> plik <span className="text-[var(--c-muted)]"># lub 4755</span></Cmd></ExampleBlock>
          <Row code="setgid" codeVariant="purple">Na katalogu: nowe pliki dziedzicza grupe.</Row>
          <ExampleBlock variant="purple"><Cmd>chmod <H>g+s</H> katalog/ <span className="text-[var(--c-muted)]"># lub 2755</span></Cmd></ExampleBlock>
          <Row code="sticky" codeVariant="green">Tylko wlasciciel/root moze usunac. Np. /tmp</Row>
          <ExampleBlock variant="green"><Cmd>chmod <H>+t</H> /shared/ <span className="text-[var(--c-muted)]"># lub 1777</span></Cmd></ExampleBlock>
        </Card>

        <Card title="sudo i sudoers" color="var(--c-orange)">
          <ExampleBlock variant="orange"><Cmd>usermod <H>-aG sudo</H> serwin <span className="text-[var(--c-muted)]"># Debian/Ubuntu</span></Cmd></ExampleBlock>
          <ExampleBlock variant="orange"><Cmd>usermod <H>-aG wheel</H> serwin <span className="text-[var(--c-muted)]"># RHEL/CentOS</span></Cmd></ExampleBlock>
          <Divider />
          <p className="text-[var(--c-muted)] text-[11px] mb-1.5">Edytuj TYLKO przez: <code className="text-xs">visudo</code></p>
          <ExampleBlock variant="orange"><Comment># pelny sudo</Comment><Cmd><H>serwin</H> ALL=(ALL:ALL) ALL</Cmd></ExampleBlock>
          <ExampleBlock variant="orange"><Comment># bez hasla</Comment><Cmd><H>serwin</H> ALL=(ALL) <V>NOPASSWD:</V> ALL</Cmd></ExampleBlock>
          <ExampleBlock variant="orange"><Comment># tylko wybrane komendy</Comment><Cmd><H>serwin</H> ALL=(ALL) /usr/bin/systemctl, /usr/bin/apt</Cmd></ExampleBlock>
          <ExampleBlock variant="orange"><Comment># dla grupy</Comment><Cmd><H>%developers</H> ALL=(ALL) NOPASSWD: /usr/bin/docker</Cmd></ExampleBlock>
          <InfoBox><span className="text-[var(--c-accent)] text-[11px]">Pliki drop-in (bezpieczniejsze)</span><br /><code className="text-xs">visudo -f /etc/sudoers.d/serwin</code></InfoBox>
        </Card>

        <Card title="Wzorce — realne scenariusze" full>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div>
              <SectionLabel>Serwer WWW</SectionLabel>
              <ExampleBlock><Cmd>chown -R www-data:www-data /var/www/html</Cmd><Cmd>chmod -R 755 /var/www/html</Cmd><Cmd>chmod g+s /var/www/html</Cmd><Cmd>usermod -aG www-data serwin</Cmd></ExampleBlock>
            </div>
            <div>
              <SectionLabel>SSH Keys</SectionLabel>
              <ExampleBlock variant="green"><Cmd>chmod 700 ~/.ssh</Cmd><Cmd>chmod 600 ~/.ssh/id_rsa</Cmd><Cmd>chmod 644 ~/.ssh/id_rsa.pub</Cmd><Cmd>chmod 600 ~/.ssh/authorized_keys</Cmd></ExampleBlock>
            </div>
            <div>
              <SectionLabel>Docker bez sudo</SectionLabel>
              <ExampleBlock variant="purple"><Cmd>usermod -aG docker serwin</Cmd><Cmd>newgrp docker</Cmd><Cmd>docker ps</Cmd></ExampleBlock>
            </div>
            <div>
              <SectionLabel>Katalog wspoldzielony</SectionLabel>
              <ExampleBlock variant="yellow"><Cmd>chown root:developers /shared/team</Cmd><Cmd>chmod 2770 /shared/team</Cmd><Comment># 2=setgid, 7=rwx owner, 7=rwx group, 0=--- other</Comment></ExampleBlock>
            </div>
          </div>
        </Card>

      </div>

      <LessonNav prev={{ to: '/', label: 'Dashboard' }} next={{ to: '/cheatsheets/filesystem', label: 'Filesystem' }} />
    </div>
  )
}
