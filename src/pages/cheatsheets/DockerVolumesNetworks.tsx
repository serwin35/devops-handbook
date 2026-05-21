import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import Concept from '../../components/Concept';
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

export default function DockerVolumesNetworks() {
  usePageTitle('Docker Volumes & Networks');
  return (
    <div>
      <PageHeader
        title="Docker Volumes &amp; Networks"
        subtitle="bind mount · named volume · tmpfs · bridge · host · macvlan · DNS"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Czemu woluminy?" full>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Concept title="Warstwa zapisu kontenera">
              Znika po <code className="text-xs">docker rm</code>. Bez wolumenu
              tracisz baze danych przy kazdym redeploy.
            </Concept>
            <Concept title="Bind mount" color="var(--c-yellow)">
              Konkretna sciezka hosta → kontener. Najlepsze do dev (hot reload)
              i configów.
            </Concept>
            <Concept title="Named volume" color="var(--c-purple)">
              Wolumin zarzadzany przez Dockera w
              <code className="text-xs"> /var/lib/docker/volumes/</code>.
              Zalecane dla baz danych.
            </Concept>
            <Concept title="tmpfs" color="var(--c-green)">
              Mount w RAM, znika po stopie. Sekrety, cache, /tmp.
            </Concept>
          </div>
        </Card>

        <Card title="Woluminy — komendy" color="var(--c-purple)">
          <ExampleBlock variant="purple">
            <Comment># Tworzenie nazwanego wolumenu</Comment>
            <Cmd>
              docker volume <H>create</H> <V>pg-data</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Lista + szczegoly + sciezka na hoscie</Comment>
            <Cmd>
              docker volume <H>ls</H>
            </Cmd>
            <Cmd>
              docker volume <H>inspect</H> pg-data
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Mount przy run (named, bind, tmpfs)</Comment>
            <Cmd>
              docker run -v <V>pg-data:/var/lib/postgresql/data</V> postgres
            </Cmd>
            <Cmd>
              docker run -v <V>$(pwd)/conf:/etc/nginx:ro</V> nginx
            </Cmd>
            <Cmd>
              docker run --tmpfs <V>/run:rw,size=64m</V> myapp
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Skladnia --mount (bardziej explicytna)</Comment>
            <Cmd>docker run \</Cmd>
            <Cmd>
              {'  '}--mount{' '}
              <V>type=volume,src=pg-data,dst=/var/lib/postgresql/data</V> \
            </Cmd>
            <Cmd>{'  '}postgres</Cmd>
            <Cmd> </Cmd>
            <Comment># Usuwanie</Comment>
            <Cmd>
              docker volume <H>rm</H> pg-data
            </Cmd>
            <Cmd>
              docker volume <H>prune</H>
              {'   '}
              <Comment># tylko nieuzywane</Comment>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="-v vs --mount" color="var(--c-yellow)">
          <SectionLabel>-v (krotka)</SectionLabel>
          <ExampleBlock variant="yellow">
            <Cmd>
              -v <V>name_or_path</V>:<V>/dst</V>[<V>:ro</V>]
            </Cmd>
          </ExampleBlock>
          <SectionLabel className="mt-2">--mount (eksplicytna)</SectionLabel>
          <ExampleBlock variant="default">
            <Cmd>
              --mount type=<V>volume</V>,src=<V>pg</V>,dst=
              <V>/var/lib/postgresql/data</V>
            </Cmd>
            <Cmd>
              --mount type=<V>bind</V>,src=<V>/etc/cert</V>,dst=<V>/cert</V>
              ,readonly
            </Cmd>
            <Cmd>
              --mount type=<V>tmpfs</V>,dst=<V>/tmp</V>,tmpfs-size=<V>64m</V>
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Reguly Docker docs: <b>--mount</b> jest preferowane (jaśniej widac
            typ), <code className="text-xs">-v</code> dla zwiezlosci w
            jednorazowych komendach.
          </InfoBox>
        </Card>

        <Card title="Read-only mounty" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Comment># Sufix :ro przy -v</Comment>
            <Cmd>
              docker run -v <V>$(pwd)/html:/usr/share/nginx/html:ro</V> nginx
            </Cmd>
            <Cmd> </Cmd>
            <Comment># readonly w --mount</Comment>
            <Cmd>
              docker run --mount{' '}
              <V>type=bind,src=/etc/cert,dst=/cert,readonly</V> nginx
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Caly kontener read-only (oprocz tmpfs)</Comment>
            <Cmd>docker run --read-only --tmpfs /tmp --tmpfs /run nginx</Cmd>
          </ExampleBlock>
          <InfoBox>
            Read-only FS = mniej powierzchni ataku. Zapisuj tylko do
            <code className="text-xs"> /tmp</code> (tmpfs) i wolumenow.
          </InfoBox>
        </Card>

        <Card title="Backup / restore wolumenu" color="var(--c-green)" full>
          <ExampleBlock variant="green">
            <Comment># Backup → tar.gz w biezacym katalogu</Comment>
            <Cmd>docker run --rm \</Cmd>
            <Cmd>{'  '}-v pg-data:/data \</Cmd>
            <Cmd>
              {'  '}-v <V>$(pwd)</V>:/backup \
            </Cmd>
            <Cmd>{'  '}ubuntu \</Cmd>
            <Cmd>{'  '}tar czf /backup/pg-data.tar.gz -C /data .</Cmd>
            <Cmd> </Cmd>
            <Comment># Restore z tar.gz</Comment>
            <Cmd>docker volume create pg-data-new</Cmd>
            <Cmd>docker run --rm \</Cmd>
            <Cmd>{'  '}-v pg-data-new:/data \</Cmd>
            <Cmd>
              {'  '}-v <V>$(pwd)</V>:/backup \
            </Cmd>
            <Cmd>{'  '}ubuntu \</Cmd>
            <Cmd>{'  '}tar xzf /backup/pg-data.tar.gz -C /data</Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Sterowniki sieci" color="var(--c-blue)" full>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionLabel>bridge (default)</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)] mb-1">
                Izolowana siec z NAT. Wlasna (user-defined) bridge ma DNS miedzy
                kontenerami.
              </p>
              <SectionLabel className="mt-2">host</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)] mb-1">
                Brak izolacji — kontener uzywa stosu sieciowego hosta.
                Najszybsze, ale ryzykowne (kolizje portow).
              </p>
            </div>
            <div>
              <SectionLabel>macvlan</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)] mb-1">
                Kontener z wlasnym MAC, wyglada jak osobne urzadzenie LAN. Do
                migracji z VM albo gdy potrzeba broadcastu.
              </p>
              <SectionLabel className="mt-2">none / overlay</SectionLabel>
              <p className="text-[11px] text-[var(--c-muted)] mb-1">
                <b>none</b> — kontener offline. <b>overlay</b> — multi-host w
                Swarm / Kubernetes.
              </p>
            </div>
          </div>
        </Card>

        <Card title="Sieci — komendy" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Cmd>
              docker network <H>ls</H>
              {'                          '}
              <Comment># lista</Comment>
            </Cmd>
            <Cmd>
              docker network <H>inspect</H> bridge{'           '}
              <Comment># szczegoly</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Wlasna siec (z DNS!)</Comment>
            <Cmd>
              docker network <H>create</H> moja-siec
            </Cmd>
            <Cmd>
              docker network <H>create</H> -d bridge api-net --subnet=
              <V>10.20.0.0/16</V>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Connect / disconnect dzialajacego kontenera</Comment>
            <Cmd>
              docker network <H>connect</H> moja-siec web
            </Cmd>
            <Cmd>
              docker network <H>disconnect</H> moja-siec web
            </Cmd>
            <Cmd> </Cmd>
            <Cmd>
              docker network <H>rm</H> moja-siec
            </Cmd>
            <Cmd>
              docker network <H>prune</H>
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="DNS miedzy kontenerami" color="var(--c-green)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Domyslny <code className="text-xs">bridge</code> <b>nie ma DNS</b>.
            Wlasna siec ma — pingujesz po nazwie.
          </p>
          <ExampleBlock variant="green">
            <Cmd>docker network create app-net</Cmd>
            <Cmd>
              docker run -d --network <V>app-net</V> --name api myapi
            </Cmd>
            <Cmd>
              docker run -it --network <V>app-net</V> --name client ubuntu bash
            </Cmd>
            <Cmd> </Cmd>
            <Comment># W kontenerze client:</Comment>
            <Cmd>
              ping <V>api</V>
              {'              '}
              <Comment># dziala — DNS</Comment>
            </Cmd>
            <Cmd>
              curl http://<V>api</V>:8080
            </Cmd>
          </ExampleBlock>
          <InfoBox>
            Mozesz tez podac <b>alias</b> sieciowy:
            <code className="text-xs">--network-alias=db</code> — kontener
            bedzie widoczny pod ta nazwa nawet jesli ma inne{' '}
            <code className="text-xs">--name</code>.
          </InfoBox>
        </Card>

        <Card title="Port mapping" color="var(--c-blue)">
          <ExampleBlock variant="default">
            <Comment># host_port:container_port</Comment>
            <Cmd>
              docker run -p <V>8080:80</V> nginx
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Bind tylko na konkretny IP hosta</Comment>
            <Cmd>
              docker run -p <V>127.0.0.1:8080:80</V> nginx
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Losowy port hosta (publikuj wszystkie z EXPOSE)</Comment>
            <Cmd>docker run -P nginx</Cmd>
            <Cmd>
              docker port &lt;container&gt;{' '}
              <Comment># sprawdz mapowanie</Comment>
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Range</Comment>
            <Cmd>
              docker run -p <V>8000-8005:8000-8005</V> myapp
            </Cmd>
            <Cmd> </Cmd>
            <Comment># UDP</Comment>
            <Cmd>
              docker run -p <V>53:53/udp</V> dnsmasq
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Inspect (debug)" color="var(--c-purple)" full>
          <ExampleBlock variant="purple">
            <Comment># IP kontenera</Comment>
            <Cmd>
              docker inspect -f{' '}
              <V>
                '{'{'}
                {'{'}.NetworkSettings.IPAddress{'}'}
                {'}'}'
              </V>{' '}
              web
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Wszystkie sieci kontenera + IP w kazdej</Comment>
            <Cmd>
              docker inspect -f{' '}
              <V>
                '{'{'}
                {'{'}range $n, $c := .NetworkSettings.Networks{'}'}
                {'}'}
                {'{'}
                {'{'}$n{'}'}
                {'}'}={'{'}
                {'{'}$c.IPAddress{'}'}
                {'}'} {'{'}
                {'{'}end{'}'}
                {'}'}'
              </V>{' '}
              web
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Mounty</Comment>
            <Cmd>
              docker inspect -f{' '}
              <V>
                '{'{'}
                {'{'}range .Mounts{'}'}
                {'}'}
                {'{'}
                {'{'}.Type{'}'}
                {'}'} {'{'}
                {'{'}.Source{'}'}
                {'}'} -&gt; {'{'}
                {'{'}.Destination{'}'}
                {'}'} ({'{'}
                {'{'}.Mode{'}'}
                {'}'}){'\n'}
                {'{'}
                {'{'}end{'}'}
                {'}'}'
              </V>{' '}
              web
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Hostname kontenera</Comment>
            <Cmd>
              docker inspect -f{' '}
              <V>
                '{'{'}
                {'{'}.Config.Hostname{'}'}
                {'}'}'
              </V>{' '}
              web
            </Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Hardening" color="var(--c-orange)">
          <ExampleBlock variant="orange">
            <Comment># Nie-root user (lepsze - w Dockerfile)</Comment>
            <Cmd>docker run --user 1000:1000 myapp</Cmd>
            <Cmd> </Cmd>
            <Comment># Read-only FS + tmpfs</Comment>
            <Cmd>docker run --read-only --tmpfs /tmp --tmpfs /run myapp</Cmd>
            <Cmd> </Cmd>
            <Comment>
              # Zdejmij wszystkie capabilities, dodaj tylko potrzebne
            </Comment>
            <Cmd>
              docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE nginx
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Limity zasobow</Comment>
            <Cmd>
              docker run --memory=<V>512m</V> --cpus=<V>"1.5"</V> myapp
            </Cmd>
            <Cmd> </Cmd>
            <Comment># Bez privileged i bez --network=host w prod</Comment>
            <Cmd>--security-opt=no-new-privileges:true</Cmd>
          </ExampleBlock>
        </Card>

        <Card title="Common pitfalls" color="var(--c-yellow)">
          <Row code="-v rel:path">
            wzgledne sciezki w bind mount sa BLEDEM (musi byc /abs lub $(pwd))
          </Row>
          <Row code="vol-&gt;pusty">
            named volume nadpisuje katalog kontenera dopiero przy pierwszym
            mount
          </Row>
          <Row code="bridge DNS">
            domyslny bridge nie ma DNS — twórz wlasne sieci
          </Row>
          <Row code="prune -v">
            usuwa woluminy bazodanowe — bardzo niebezpieczne
          </Row>
          <Row code="port=0">
            brak <code className="text-xs">-p</code> = nie eksponowany na hoscie
          </Row>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/cheatsheets/docker-compose', label: 'Docker Compose' }}
        next={{ to: '/cheatsheets/docker-images', label: 'Docker Images' }}
      />
    </div>
  );
}
