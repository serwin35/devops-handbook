// All searchable commands/concepts for the search page
export const searchIndex = [
  // Permissions
  {
    cmd: 'chmod u+x skrypt.sh',
    desc: 'Dodaj execute dla wlasciciela',
    tags: ['permissions', 'chmod'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'chmod 755 plik',
    desc: 'rwxr-xr-x — typowy katalog/skrypt',
    tags: ['permissions', 'chmod', 'octal'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'chmod 644 plik',
    desc: 'rw-r--r-- — typowy plik',
    tags: ['permissions', 'chmod', 'octal'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'chmod 600 plik',
    desc: 'rw------- — prywatny klucz SSH',
    tags: ['permissions', 'chmod', 'ssh'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'chmod -R 755 /var/www/html',
    desc: 'Rekurencyjnie na caly katalog',
    tags: ['permissions', 'chmod', 'recursive'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'chmod g+s katalog/',
    desc: 'Setgid — nowe pliki dziedzicza grupe',
    tags: ['permissions', 'setgid', 'special'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'chmod +t /shared/',
    desc: 'Sticky bit — tylko wlasciciel moze usunac',
    tags: ['permissions', 'sticky'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'chown www-data:www-data plik',
    desc: 'Zmien wlasciciela i grupe',
    tags: ['permissions', 'chown', 'owner'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'chown -R user:group katalog/',
    desc: 'Rekurencyjna zmiana wlasciciela',
    tags: ['permissions', 'chown', 'recursive'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'chgrp docker /var/run/docker.sock',
    desc: 'Zmien grupe pliku',
    tags: ['permissions', 'chgrp', 'docker'],
    page: '/cheatsheets/permissions',
  },

  // Users & Groups
  {
    cmd: 'useradd -m -s /bin/bash user',
    desc: 'Utworz uzytkownika z home i shell',
    tags: ['users', 'useradd'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'adduser user',
    desc: 'Interaktywne tworzenie uzytkownika',
    tags: ['users', 'adduser'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'usermod -aG docker serwin',
    desc: 'Dodaj usera do grupy (zachowaj stare)',
    tags: ['users', 'usermod', 'groups', 'docker'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'userdel -r user',
    desc: 'Usun usera wraz z katalogiem domowym',
    tags: ['users', 'userdel'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'passwd user',
    desc: 'Zmien haslo uzytkownika',
    tags: ['users', 'passwd', 'password'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'groupadd developers',
    desc: 'Utworz nowa grupe',
    tags: ['groups', 'groupadd'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'gpasswd -d user group',
    desc: 'Usun usera z grupy',
    tags: ['groups', 'gpasswd'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'id',
    desc: 'Pokaz uid/gid/grupy biezacego usera',
    tags: ['users', 'diagnostics'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'whoami',
    desc: 'Kto aktualnie uruchamia shell',
    tags: ['users', 'diagnostics'],
    page: '/cheatsheets/permissions',
  },

  // Sudo
  {
    cmd: 'visudo',
    desc: 'Bezpieczna edycja /etc/sudoers',
    tags: ['sudo', 'sudoers', 'security'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'sudo -i',
    desc: 'Interaktywna powloka roota',
    tags: ['sudo', 'root'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'sudo -l',
    desc: 'Lista uprawnien sudo aktualnego usera',
    tags: ['sudo'],
    page: '/cheatsheets/permissions',
  },

  // Filesystem
  {
    cmd: 'df -h',
    desc: 'Miejsce na dysku per partycja',
    tags: ['filesystem', 'disk', 'monitoring'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'du -sh /var/log/*',
    desc: 'Rozmiar katalogow',
    tags: ['filesystem', 'disk', 'size'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'mount | column -t',
    desc: 'Zamontowane systemy plikow',
    tags: ['filesystem', 'mount'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'find /etc -name "*.conf"',
    desc: 'Znajdz pliki po nazwie',
    tags: ['filesystem', 'find', 'search'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'which nginx',
    desc: 'Gdzie jest zainstalowany program',
    tags: ['filesystem', 'which', 'path'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'lsblk',
    desc: 'Drzewo blokow (dyski, partycje, LVM)',
    tags: ['filesystem', 'lvm', 'disk'],
    page: '/cheatsheets/filesystem',
  },

  // LVM
  {
    cmd: 'pvcreate /dev/sdb1',
    desc: 'Utworz Physical Volume',
    tags: ['lvm', 'pv'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'vgcreate data_vg /dev/sdb1',
    desc: 'Utworz Volume Group',
    tags: ['lvm', 'vg'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'lvcreate -L 100G -n data_lv data_vg',
    desc: 'Utworz Logical Volume',
    tags: ['lvm', 'lv'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'lvextend -L +50G /dev/data_vg/data_lv',
    desc: 'Rozszerz LV o 50GB',
    tags: ['lvm', 'extend', 'resize'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'pvs / vgs / lvs',
    desc: 'Podglad Physical/Volume/Logical Volumes',
    tags: ['lvm', 'status'],
    page: '/cheatsheets/filesystem',
  },

  // Docker
  {
    cmd: 'docker run -d -p 8080:80 --name nginx nginx',
    desc: 'Uruchom kontener w tle z port mapping',
    tags: ['docker', 'run', 'container'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker run -it ubuntu /bin/bash',
    desc: 'Interaktywny shell w kontenerze',
    tags: ['docker', 'run', 'interactive'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker ps',
    desc: 'Lista uruchomionych kontenerow',
    tags: ['docker', 'container', 'status'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker ps -a',
    desc: 'Wszystkie kontenery (tez zatrzymane)',
    tags: ['docker', 'container', 'status'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker stop <id>',
    desc: 'Zatrzymaj kontener',
    tags: ['docker', 'container', 'stop'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker rm -f <id>',
    desc: 'Usun kontener (force)',
    tags: ['docker', 'container', 'remove'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker logs -f <name>',
    desc: 'Logi kontenera na zywo',
    tags: ['docker', 'logs', 'debug'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker exec -it <name> /bin/bash',
    desc: 'Wejdz do dzialajacego kontenera',
    tags: ['docker', 'exec', 'shell'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker build -t myapp:1.0 .',
    desc: 'Zbuduj obraz z Dockerfile',
    tags: ['docker', 'build', 'image'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker pull nginx:alpine',
    desc: 'Pobierz obraz z Docker Hub',
    tags: ['docker', 'image', 'pull'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker images',
    desc: 'Lista lokalnych obrazow',
    tags: ['docker', 'image', 'list'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker volume create app-data',
    desc: 'Utworz named volume',
    tags: ['docker', 'volume', 'storage'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker network create my-net',
    desc: 'Utworz siec',
    tags: ['docker', 'network'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker compose up -d',
    desc: 'Start serwisow z docker-compose.yml',
    tags: ['docker', 'compose', 'start'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker compose down',
    desc: 'Stop + usun kontenery compose',
    tags: ['docker', 'compose', 'stop'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker system prune -a',
    desc: 'Usun wszystko nieuzywane',
    tags: ['docker', 'cleanup', 'prune'],
    page: '/cheatsheets/docker',
  },

  // Git
  {
    cmd: 'git init',
    desc: 'Nowe repozytorium',
    tags: ['git', 'init', 'basics'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git clone <url>',
    desc: 'Klonuj zdalne repo',
    tags: ['git', 'clone', 'remote'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git status -s',
    desc: 'Skrocony status zmian',
    tags: ['git', 'status'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git add .',
    desc: 'Dodaj wszystko do staging',
    tags: ['git', 'add', 'staging'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git commit -m "opis"',
    desc: 'Commit ze zmianami',
    tags: ['git', 'commit'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git push origin main',
    desc: 'Wypchnij na remote',
    tags: ['git', 'push', 'remote'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git pull',
    desc: 'Pobierz i merge z remote',
    tags: ['git', 'pull', 'remote'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git checkout -b feature/login',
    desc: 'Utworz i przelacz na nowa galaz',
    tags: ['git', 'branch', 'checkout'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git merge feature/login',
    desc: 'Merge galezi do aktualnej',
    tags: ['git', 'merge', 'branch'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git rebase main',
    desc: 'Przenosl commity na czubek main',
    tags: ['git', 'rebase'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git log --oneline --graph --all',
    desc: 'Drzewko commitow',
    tags: ['git', 'log', 'history'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git diff --staged',
    desc: 'Roznice w staging (przed commit)',
    tags: ['git', 'diff'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git stash',
    desc: 'Schowaj zmiany na bok',
    tags: ['git', 'stash'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git stash pop',
    desc: 'Przywroc ze schowka',
    tags: ['git', 'stash'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git revert <hash>',
    desc: 'Cofnij commit (bezpieczne)',
    tags: ['git', 'revert', 'undo'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git reset --hard HEAD~1',
    desc: 'Cofnij WSZYSTKO (niebezpieczne!)',
    tags: ['git', 'reset', 'undo', 'danger'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git restore --staged plik',
    desc: 'Cofnij plik ze staging',
    tags: ['git', 'restore', 'undo'],
    page: '/cheatsheets/git',
  },

  // APT
  {
    cmd: 'sudo apt update',
    desc: 'Pobierz najnowsze listy pakietow',
    tags: ['apt', 'packages', 'update'],
    page: '/lessons/01',
  },
  {
    cmd: 'sudo apt upgrade',
    desc: 'Zainstaluj aktualizacje',
    tags: ['apt', 'packages', 'upgrade'],
    page: '/lessons/01',
  },
  {
    cmd: 'sudo apt install <pakiet>',
    desc: 'Instalacja pakietu',
    tags: ['apt', 'packages', 'install'],
    page: '/lessons/01',
  },
  {
    cmd: 'sudo apt remove <pakiet>',
    desc: 'Usun pakiet (zachowaj config)',
    tags: ['apt', 'packages', 'remove'],
    page: '/lessons/01',
  },
  {
    cmd: 'sudo apt purge <pakiet>',
    desc: 'Usun pakiet + konfiguracje',
    tags: ['apt', 'packages', 'purge'],
    page: '/lessons/01',
  },

  // UFW
  {
    cmd: 'sudo ufw enable',
    desc: 'Wlacz firewall',
    tags: ['ufw', 'firewall', 'security'],
    page: '/lessons/02',
  },
  {
    cmd: 'sudo ufw status numbered',
    desc: 'Status z numerami regul (ID)',
    tags: ['ufw', 'firewall', 'status'],
    page: '/lessons/02',
  },
  {
    cmd: 'sudo ufw allow 80/tcp',
    desc: 'Zezwol na port 80 TCP (HTTP)',
    tags: ['ufw', 'firewall', 'allow', 'http'],
    page: '/lessons/02',
  },
  {
    cmd: 'sudo ufw allow 443',
    desc: 'Zezwol na HTTPS',
    tags: ['ufw', 'firewall', 'allow', 'https'],
    page: '/lessons/02',
  },
  {
    cmd: 'sudo ufw deny 3306',
    desc: 'Zablokuj MySQL',
    tags: ['ufw', 'firewall', 'deny'],
    page: '/lessons/02',
  },
  {
    cmd: 'sudo ufw delete 3',
    desc: 'Usun regule po numerze ID',
    tags: ['ufw', 'firewall', 'delete'],
    page: '/lessons/02',
  },
  {
    cmd: 'sudo ufw allow from 192.168.1.0/24 to any port 22',
    desc: 'SSH tylko z lokalnej sieci',
    tags: ['ufw', 'firewall', 'subnet', 'ssh'],
    page: '/lessons/02',
  },
  {
    cmd: 'sudo ufw reset',
    desc: 'Usun wszystkie reguly',
    tags: ['ufw', 'firewall', 'reset'],
    page: '/lessons/02',
  },

  // Netplan
  {
    cmd: 'sudo netplan apply',
    desc: 'Zastosuj konfiguracje sieci',
    tags: ['netplan', 'network', 'config'],
    page: '/lessons/02',
  },
  {
    cmd: 'sudo netplan try',
    desc: 'Testuj konfiguracje (rollback po 120s)',
    tags: ['netplan', 'network', 'test'],
    page: '/lessons/02',
  },

  // Monitoring
  {
    cmd: 'htop',
    desc: 'Interaktywny monitor procesow',
    tags: ['monitoring', 'processes', 'htop'],
    page: '/lessons/02',
  },
  {
    cmd: 'top -b -n 1',
    desc: 'Jednokrotny snapshot procesow',
    tags: ['monitoring', 'processes', 'top'],
    page: '/lessons/02',
  },
  {
    cmd: 'free -h',
    desc: 'Uzycie pamieci (human-readable)',
    tags: ['monitoring', 'memory', 'ram'],
    page: '/lessons/02',
  },
  {
    cmd: 'netstat -tuln',
    desc: 'Otwarte porty',
    tags: ['monitoring', 'network', 'ports'],
    page: '/lessons/02',
  },

  // SSH Welcome
  {
    cmd: 'sudo nano /etc/motd',
    desc: 'Edytuj statyczny komunikat powitalny',
    tags: ['ssh', 'motd', 'banner'],
    page: '/cheatsheets/ssh-welcome',
  },
  {
    cmd: 'sudo nano /etc/update-motd.d/99-custom',
    desc: 'Stworz dynamiczny skrypt powitalny',
    tags: ['ssh', 'motd', 'banner', 'dynamic', 'script'],
    page: '/cheatsheets/ssh-welcome',
  },
  {
    cmd: 'sudo chmod +x /etc/update-motd.d/99-custom',
    desc: 'Aktywuj skrypt dynamicznego MOTD',
    tags: ['ssh', 'motd', 'permissions', 'chmod'],
    page: '/cheatsheets/ssh-welcome',
  },
  {
    cmd: 'sudo grep PrintMotd /etc/ssh/sshd_config',
    desc: 'Sprawdz czy MOTD jest wlaczone w SSH',
    tags: ['ssh', 'config', 'motd'],
    page: '/cheatsheets/ssh-welcome',
  },
  {
    cmd: 'figlet "Text"',
    desc: 'Generuj napis ASCII Art',
    tags: ['ssh', 'banner', 'ascii', 'art', 'figlet'],
    page: '/cheatsheets/ssh-welcome',
  },
  {
    cmd: 'lolcat',
    desc: 'Dodaj teczowe kolory do tekstu',
    tags: ['ssh', 'banner', 'colors', 'lolcat'],
    page: '/cheatsheets/ssh-welcome',
  },
];
