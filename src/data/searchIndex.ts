// All searchable commands/concepts for the search page
export const searchIndex = [
  // Linux Basics — Navigation
  {
    cmd: 'pwd',
    desc: 'Wyświetl bieżący katalog roboczy',
    tags: ['basics', 'navigation', 'pwd'],
    page: '/cheatsheets/linux-basics',
  },
  {
    cmd: 'cd /var/log',
    desc: 'Przejdź do katalogu',
    tags: ['basics', 'navigation', 'cd'],
    page: '/cheatsheets/linux-basics',
  },
  {
    cmd: 'cd ..',
    desc: 'Przejdź katalog wyżej',
    tags: ['basics', 'navigation', 'cd'],
    page: '/cheatsheets/linux-basics',
  },
  {
    cmd: 'cd ~',
    desc: 'Przejdź do katalogu domowego',
    tags: ['basics', 'navigation', 'cd', 'home'],
    page: '/cheatsheets/linux-basics',
  },

  // Filesystem — ls
  {
    cmd: 'ls',
    desc: 'Listuj pliki w katalogu',
    tags: ['filesystem', 'ls', 'list'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'ls -l',
    desc: 'Szczegółowa lista z uprawnieniami',
    tags: ['filesystem', 'ls', 'list', 'permissions'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'ls -a',
    desc: 'Pokaż ukryte pliki',
    tags: ['filesystem', 'ls', 'hidden'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'ls -lah',
    desc: 'Szczegóły + ukryte + human-readable',
    tags: ['filesystem', 'ls', 'list'],
    page: '/cheatsheets/filesystem',
  },

  // Linux Basics — touch
  {
    cmd: 'touch plik.txt',
    desc: 'Utwórz pusty plik',
    tags: ['basics', 'touch', 'create', 'file'],
    page: '/cheatsheets/linux-basics',
  },

  // Filesystem — mkdir
  {
    cmd: 'mkdir nowy_katalog',
    desc: 'Utwórz katalog',
    tags: ['filesystem', 'mkdir', 'create', 'directory'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'mkdir -p projekt/src/components',
    desc: 'Utwórz zagnieżdżone katalogi',
    tags: ['filesystem', 'mkdir', 'recursive', 'directory'],
    page: '/cheatsheets/filesystem',
  },

  // Filesystem — rm
  {
    cmd: 'rm plik.txt',
    desc: 'Usuń plik',
    tags: ['filesystem', 'rm', 'remove', 'delete'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'rm -r katalog/',
    desc: 'Usuń katalog z zawartością',
    tags: ['filesystem', 'rm', 'remove', 'recursive'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'rm -rf katalog/',
    desc: 'Force usuń katalog (UWAGA!)',
    tags: ['filesystem', 'rm', 'remove', 'force', 'danger'],
    page: '/cheatsheets/filesystem',
  },

  // Filesystem — cat
  {
    cmd: 'cat /etc/hostname',
    desc: 'Wyświetl zawartość pliku',
    tags: ['filesystem', 'cat', 'read', 'file'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'cat -n /etc/passwd',
    desc: 'Wyświetl plik z numerami linii',
    tags: ['filesystem', 'cat', 'read', 'lines'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'tail -f /var/log/syslog',
    desc: 'Śledź logi na żywo',
    tags: ['filesystem', 'tail', 'logs', 'follow'],
    page: '/cheatsheets/filesystem',
  },

  // Linux Basics — nano
  {
    cmd: 'nano plik.txt',
    desc: 'Otwórz plik w edytorze nano',
    tags: ['basics', 'nano', 'editor', 'edit'],
    page: '/cheatsheets/linux-basics',
  },

  // Linux Basics — vim
  {
    cmd: 'vim plik.txt',
    desc: 'Otwórz plik w edytorze vim',
    tags: ['basics', 'vim', 'editor', 'edit'],
    page: '/cheatsheets/linux-basics',
  },

  // Filesystem — cp, mv
  {
    cmd: 'cp plik.txt kopia.txt',
    desc: 'Kopiuj plik',
    tags: ['filesystem', 'cp', 'copy'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'cp -r katalog/ backup/',
    desc: 'Kopiuj katalog rekurencyjnie',
    tags: ['filesystem', 'cp', 'copy', 'recursive'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'mv stary.txt nowy.txt',
    desc: 'Przenieś / zmień nazwę pliku',
    tags: ['filesystem', 'mv', 'move', 'rename'],
    page: '/cheatsheets/filesystem',
  },

  // Permissions
  {
    cmd: 'chmod u+x skrypt.sh',
    desc: 'Dodaj execute dla właściciela',
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
    desc: 'Rekurencyjnie na cały katalog',
    tags: ['permissions', 'chmod', 'recursive'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'chmod g+s katalog/',
    desc: 'Setgid — nowe pliki dziedziczą grupę',
    tags: ['permissions', 'setgid', 'special'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'chmod +t /shared/',
    desc: 'Sticky bit — tylko właściciel może usunąć',
    tags: ['permissions', 'sticky'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'chown www-data:www-data plik',
    desc: 'Zmień właściciela i grupę',
    tags: ['permissions', 'chown', 'owner'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'chown -R user:group katalog/',
    desc: 'Rekurencyjna zmiana właściciela',
    tags: ['permissions', 'chown', 'recursive'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'chgrp docker /var/run/docker.sock',
    desc: 'Zmień grupę pliku',
    tags: ['permissions', 'chgrp', 'docker'],
    page: '/cheatsheets/permissions',
  },

  // Users & Groups
  {
    cmd: 'useradd -m -s /bin/bash user',
    desc: 'Utwórz użytkownika z home i shell',
    tags: ['users', 'useradd'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'adduser user',
    desc: 'Interaktywne tworzenie użytkownika',
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
    desc: 'Usuń usera wraz z katalogiem domowym',
    tags: ['users', 'userdel'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'passwd user',
    desc: 'Zmień hasło użytkownika',
    tags: ['users', 'passwd', 'password'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'groupadd developers',
    desc: 'Utwórz nową grupę',
    tags: ['groups', 'groupadd'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'gpasswd -d user group',
    desc: 'Usuń usera z grupy',
    tags: ['groups', 'gpasswd'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'id',
    desc: 'Pokaż uid/gid/grupy bieżącego usera',
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
    desc: 'Interaktywna powłoka roota',
    tags: ['sudo', 'root'],
    page: '/cheatsheets/permissions',
  },
  {
    cmd: 'sudo -l',
    desc: 'Lista uprawnień sudo aktualnego usera',
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
    desc: 'Rozmiar katalogów',
    tags: ['filesystem', 'disk', 'size'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'mount | column -t',
    desc: 'Zamontowane systemy plików',
    tags: ['filesystem', 'mount'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'find /etc -name "*.conf"',
    desc: 'Znajdź pliki po nazwie',
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
    desc: 'Drzewo bloków (dyski, partycje, LVM)',
    tags: ['filesystem', 'lvm', 'disk'],
    page: '/cheatsheets/filesystem',
  },

  // LVM
  {
    cmd: 'pvcreate /dev/sdb1',
    desc: 'Utwórz Physical Volume',
    tags: ['lvm', 'pv'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'vgcreate data_vg /dev/sdb1',
    desc: 'Utwórz Volume Group',
    tags: ['lvm', 'vg'],
    page: '/cheatsheets/filesystem',
  },
  {
    cmd: 'lvcreate -L 100G -n data_lv data_vg',
    desc: 'Utwórz Logical Volume',
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
    desc: 'Podgląd Physical/Volume/Logical Volumes',
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
    desc: 'Lista uruchomionych kontenerów',
    tags: ['docker', 'container', 'status'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker ps -a',
    desc: 'Wszystkie kontenery (też zatrzymane)',
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
    desc: 'Usuń kontener (force)',
    tags: ['docker', 'container', 'remove'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker logs -f <name>',
    desc: 'Logi kontenera na żywo',
    tags: ['docker', 'logs', 'debug'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker exec -it <name> /bin/bash',
    desc: 'Wejdź do działającego kontenera',
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
    desc: 'Lista lokalnych obrazów',
    tags: ['docker', 'image', 'list'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker volume create app-data',
    desc: 'Utwórz named volume',
    tags: ['docker', 'volume', 'storage'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker network create my-net',
    desc: 'Utwórz sieć',
    tags: ['docker', 'network'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker compose up -d',
    desc: 'Start serwisów z docker-compose.yml',
    tags: ['docker', 'compose', 'start'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker compose down',
    desc: 'Stop + usuń kontenery compose',
    tags: ['docker', 'compose', 'stop'],
    page: '/cheatsheets/docker',
  },
  {
    cmd: 'docker system prune -a',
    desc: 'Usuń wszystko nieużywane',
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
    desc: 'Skrócony status zmian',
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
    desc: 'Utwórz i przełącz na nową gałąź',
    tags: ['git', 'branch', 'checkout'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git merge feature/login',
    desc: 'Merge gałęzi do aktualnej',
    tags: ['git', 'merge', 'branch'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git rebase main',
    desc: 'Przenoś commity na czubek main',
    tags: ['git', 'rebase'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git log --oneline --graph --all',
    desc: 'Drzewko commitów',
    tags: ['git', 'log', 'history'],
    page: '/cheatsheets/git',
  },
  {
    cmd: 'git diff --staged',
    desc: 'Różnice w staging (przed commit)',
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
    desc: 'Przywróć ze schowka',
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
    desc: 'Pobierz najnowsze listy pakietów',
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
    desc: 'Usuń pakiet (zachowaj config)',
    tags: ['apt', 'packages', 'remove'],
    page: '/lessons/01',
  },
  {
    cmd: 'sudo apt purge <pakiet>',
    desc: 'Usuń pakiet + konfigurację',
    tags: ['apt', 'packages', 'purge'],
    page: '/lessons/01',
  },

  // UFW
  {
    cmd: 'sudo ufw enable',
    desc: 'Włącz firewall',
    tags: ['ufw', 'firewall', 'security'],
    page: '/lessons/02',
  },
  {
    cmd: 'sudo ufw status numbered',
    desc: 'Status z numerami reguł (ID)',
    tags: ['ufw', 'firewall', 'status'],
    page: '/lessons/02',
  },
  {
    cmd: 'sudo ufw allow 80/tcp',
    desc: 'Zezwól na port 80 TCP (HTTP)',
    tags: ['ufw', 'firewall', 'allow', 'http'],
    page: '/lessons/02',
  },
  {
    cmd: 'sudo ufw allow 443',
    desc: 'Zezwól na HTTPS',
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
    desc: 'Usuń regułę po numerze ID',
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
    desc: 'Usuń wszystkie reguły',
    tags: ['ufw', 'firewall', 'reset'],
    page: '/lessons/02',
  },

  // Netplan
  {
    cmd: 'sudo netplan apply',
    desc: 'Zastosuj konfigurację sieci',
    tags: ['netplan', 'network', 'config'],
    page: '/lessons/02',
  },
  {
    cmd: 'sudo netplan try',
    desc: 'Testuj konfigurację (rollback po 120s)',
    tags: ['netplan', 'network', 'test'],
    page: '/lessons/02',
  },

  // Monitoring
  {
    cmd: 'htop',
    desc: 'Interaktywny monitor procesów',
    tags: ['monitoring', 'processes', 'htop'],
    page: '/lessons/02',
  },
  {
    cmd: 'top -b -n 1',
    desc: 'Jednokrotny snapshot procesów',
    tags: ['monitoring', 'processes', 'top'],
    page: '/lessons/02',
  },
  {
    cmd: 'free -h',
    desc: 'Użycie pamięci (human-readable)',
    tags: ['monitoring', 'memory', 'ram'],
    page: '/lessons/02',
  },
  {
    cmd: 'netstat -tuln',
    desc: 'Otwarte porty',
    tags: ['monitoring', 'network', 'ports'],
    page: '/lessons/02',
  },

  // Processes & Monitoring cheatsheet
  {
    cmd: 'killall nginx',
    desc: 'Zakończ wszystkie procesy po nazwie',
    tags: ['processes', 'kill', 'killall'],
    page: '/cheatsheets/processes-monitoring',
  },
  {
    cmd: 'pkill -f "python app.py"',
    desc: 'Zakończ proces po wzorcu nazwy',
    tags: ['processes', 'kill', 'pkill', 'pattern'],
    page: '/cheatsheets/processes-monitoring',
  },
  {
    cmd: 'ps aux --sort=-%mem | head -n 6',
    desc: 'Top 5 procesów wg zużycia RAM',
    tags: ['processes', 'ps', 'sort', 'memory'],
    page: '/cheatsheets/processes-monitoring',
  },
  {
    cmd: 'ps aux --sort=-%cpu | head -n 6',
    desc: 'Top 5 procesów wg zużycia CPU',
    tags: ['processes', 'ps', 'sort', 'cpu'],
    page: '/cheatsheets/processes-monitoring',
  },
  {
    cmd: 'nohup ./skrypt.sh &',
    desc: 'Uruchom proces odporny na zamknięcie terminala',
    tags: ['processes', 'nohup', 'background'],
    page: '/cheatsheets/processes-monitoring',
  },
  {
    cmd: 'du -sh /var/log',
    desc: 'Rozmiar katalogu (summary, human-readable)',
    tags: ['filesystem', 'disk', 'du', 'size'],
    page: '/cheatsheets/processes-monitoring',
  },
  {
    cmd: 'sudo lsof -i :80',
    desc: 'Kto nasłuchuje na porcie 80?',
    tags: ['monitoring', 'lsof', 'port', 'network'],
    page: '/cheatsheets/processes-monitoring',
  },
  {
    cmd: 'nproc',
    desc: 'Liczba rdzeni CPU',
    tags: ['monitoring', 'cpu', 'cores'],
    page: '/cheatsheets/processes-monitoring',
  },

  // Lesson 04 — Procesy i Usługi
  {
    cmd: 'sudo systemctl status sshd',
    desc: 'Sprawdź status usługi systemd',
    tags: ['systemd', 'systemctl', 'status', 'service'],
    page: '/lessons/04',
  },
  {
    cmd: 'sudo systemctl start/stop/restart sshd',
    desc: 'Uruchom / zatrzymaj / restartuj usługę',
    tags: ['systemd', 'systemctl', 'service'],
    page: '/lessons/04',
  },
  {
    cmd: 'sudo systemctl enable sshd',
    desc: 'Włącz autostart usługi przy starcie systemu',
    tags: ['systemd', 'systemctl', 'enable', 'autostart'],
    page: '/lessons/04',
  },
  {
    cmd: 'sudo systemctl disable sshd',
    desc: 'Wyłącz autostart usługi',
    tags: ['systemd', 'systemctl', 'disable'],
    page: '/lessons/04',
  },
  {
    cmd: 'sudo systemctl daemon-reload',
    desc: 'Przeładuj konfigurację jednostek systemd',
    tags: ['systemd', 'systemctl', 'reload', 'daemon'],
    page: '/lessons/04',
  },
  {
    cmd: 'sudo service nginx status',
    desc: 'Status usługi (SysVinit / init.d)',
    tags: ['service', 'init.d', 'sysvinit', 'status'],
    page: '/lessons/04',
  },
  {
    cmd: 'ps aux',
    desc: 'Wyświetl wszystkie procesy szczegółowo',
    tags: ['processes', 'ps', 'list'],
    page: '/lessons/04',
  },
  {
    cmd: 'ps aux | grep cron',
    desc: 'Znajdź proces po nazwie',
    tags: ['processes', 'ps', 'grep', 'filter'],
    page: '/lessons/04',
  },
  {
    cmd: 'kill 1234',
    desc: 'Zakończ proces (SIGTERM — grzecznie)',
    tags: ['processes', 'kill', 'signal', 'sigterm'],
    page: '/lessons/04',
  },
  {
    cmd: 'kill -9 1234',
    desc: 'Brutalne zakończenie procesu (SIGKILL)',
    tags: ['processes', 'kill', 'signal', 'sigkill', 'force'],
    page: '/lessons/04',
  },
  {
    cmd: 'uptime',
    desc: 'Czas pracy systemu i load average',
    tags: ['monitoring', 'uptime', 'load'],
    page: '/lessons/04',
  },
  {
    cmd: 'sudo ss -tulpn',
    desc: 'Otwarte porty TCP/UDP z procesami',
    tags: ['monitoring', 'network', 'ports', 'ss'],
    page: '/lessons/04',
  },
  {
    cmd: 'sudo journalctl -u nginx.service -f',
    desc: 'Logi usługi w czasie rzeczywistym',
    tags: ['journalctl', 'logs', 'systemd', 'follow'],
    page: '/lessons/04',
  },
  {
    cmd: 'sudo journalctl --since "1 hour ago"',
    desc: 'Logi z ostatniej godziny',
    tags: ['journalctl', 'logs', 'filter', 'time'],
    page: '/lessons/04',
  },
  {
    cmd: 'sudo journalctl -p err',
    desc: 'Tylko logi o priorytecie error lub wyższym',
    tags: ['journalctl', 'logs', 'error', 'priority'],
    page: '/lessons/04',
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
    desc: 'Stwórz dynamiczny skrypt powitalny',
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
    desc: 'Sprawdź czy MOTD jest włączone w SSH',
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
    desc: 'Dodaj tęczowe kolory do tekstu',
    tags: ['ssh', 'banner', 'colors', 'lolcat'],
    page: '/cheatsheets/ssh-welcome',
  },

  // DNS & Domains
  {
    cmd: 'dig google.com',
    desc: 'Zapytanie DNS o rekord A domeny',
    tags: ['dns', 'dig', 'domain', 'resolve'],
    page: '/cheatsheets/dns-domains',
  },
  {
    cmd: 'dig google.com MX',
    desc: 'Zapytanie DNS o serwery pocztowe',
    tags: ['dns', 'dig', 'mx', 'mail'],
    page: '/cheatsheets/dns-domains',
  },
  {
    cmd: 'dig +trace google.com',
    desc: 'Sledzenie pelnej sciezki rozwiazywania DNS',
    tags: ['dns', 'dig', 'trace', 'debug'],
    page: '/cheatsheets/dns-domains',
  },
  {
    cmd: 'dig +short google.com',
    desc: 'Krotka odpowiedz DNS (sam IP)',
    tags: ['dns', 'dig', 'short'],
    page: '/cheatsheets/dns-domains',
  },
  {
    cmd: 'nslookup google.com',
    desc: 'Proste zapytanie DNS',
    tags: ['dns', 'nslookup', 'resolve'],
    page: '/cheatsheets/dns-domains',
  },
  {
    cmd: 'nslookup google.com 8.8.8.8',
    desc: 'Zapytanie DNS do konkretnego serwera',
    tags: ['dns', 'nslookup', 'server'],
    page: '/cheatsheets/dns-domains',
  },
  {
    cmd: 'curl -X OPTIONS -I -H "Origin: http://localhost:3000" http://api.example.com',
    desc: 'Debugowanie CORS — sprawdz naglowki preflight',
    tags: ['cors', 'curl', 'debug', 'options', 'preflight'],
    page: '/cheatsheets/dns-domains',
  },

  // Virtualization
  {
    cmd: 'VBoxManage createvm --name "Ubuntu" --ostype Ubuntu_64 --register',
    desc: 'Utworz nowa VM w VirtualBox (CLI)',
    tags: ['vm', 'virtualbox', 'vboxmanage', 'create'],
    page: '/lessons/07',
  },
  {
    cmd: 'VBoxManage snapshot "VM" take "Snapshot Name"',
    desc: 'Utworz snapshot maszyny wirtualnej',
    tags: ['vm', 'virtualbox', 'snapshot'],
    page: '/lessons/07',
  },
  {
    cmd: 'VBoxManage clonevm "VM" --name "Clone" --register',
    desc: 'Klonuj maszyne wirtualna',
    tags: ['vm', 'virtualbox', 'clone'],
    page: '/lessons/07',
  },
  {
    cmd: 'aws ec2 run-instances --image-id ami-xxx --instance-type t2.micro',
    desc: 'Utworz instancje EC2 w AWS',
    tags: ['aws', 'ec2', 'vm', 'cloud'],
    page: '/lessons/07',
  },
  {
    cmd: 'az vm create --resource-group myRG --name myVM --image UbuntuLTS',
    desc: 'Utworz VM w Azure',
    tags: ['azure', 'vm', 'cloud'],
    page: '/lessons/07',
  },
  {
    cmd: 'egrep -c "(vmx|svm)" /proc/cpuinfo',
    desc: 'Sprawdz wsparcie CPU dla wirtualizacji',
    tags: ['vm', 'cpu', 'virtualization', 'check'],
    page: '/lessons/07',
  },

  // SSL/TLS
  {
    cmd: 'openssl genrsa -out key.pem 4096',
    desc: 'Wygeneruj klucz prywatny RSA 4096 bit',
    tags: ['ssl', 'tls', 'openssl', 'rsa', 'key'],
    page: '/cheatsheets/ssl-tls',
  },
  {
    cmd: 'openssl req -new -key key.pem -out cert.csr',
    desc: 'Utworz CSR (Certificate Signing Request)',
    tags: ['ssl', 'tls', 'openssl', 'csr'],
    page: '/cheatsheets/ssl-tls',
  },
  {
    cmd: 'openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365',
    desc: 'Self-signed certyfikat (do testow)',
    tags: ['ssl', 'tls', 'self-signed', 'openssl'],
    page: '/cheatsheets/ssl-tls',
  },
  {
    cmd: 'openssl x509 -in cert.pem -text -noout',
    desc: 'Inspekcja certyfikatu X.509',
    tags: ['ssl', 'tls', 'cert', 'inspect'],
    page: '/cheatsheets/ssl-tls',
  },
  {
    cmd: 'openssl s_client -connect example.com:443 -servername example.com',
    desc: 'Test TLS connection do hosta',
    tags: ['ssl', 'tls', 'debug', 's_client'],
    page: '/cheatsheets/ssl-tls',
  },
  {
    cmd: 'sudo certbot --nginx -d example.com',
    desc: 'Lets Encrypt cert z auto-config Nginx',
    tags: ['ssl', 'tls', 'certbot', 'letsencrypt', 'nginx'],
    page: '/cheatsheets/ssl-tls',
  },
  {
    cmd: 'sudo certbot renew --dry-run',
    desc: 'Test odnowienia certyfikatu Lets Encrypt',
    tags: ['ssl', 'tls', 'certbot', 'renew'],
    page: '/cheatsheets/ssl-tls',
  },
  {
    cmd: 'nmap --script ssl-enum-ciphers -p 443 example.com',
    desc: 'Pokaz wszystkie ciphery TLS serwera',
    tags: ['ssl', 'tls', 'nmap', 'cipher', 'audit'],
    page: '/cheatsheets/ssl-tls',
  },

  // SQL
  {
    cmd: 'mysql -u app -p sklep',
    desc: 'Logowanie do MySQL z baza domyslna',
    tags: ['sql', 'mysql', 'login'],
    page: '/cheatsheets/sql',
  },
  {
    cmd: 'sudo -u postgres psql',
    desc: 'Logowanie do PostgreSQL jako postgres',
    tags: ['sql', 'postgresql', 'psql', 'login'],
    page: '/cheatsheets/sql',
  },
  {
    cmd: "CREATE USER 'app'@'localhost' IDENTIFIED BY 'haslo'",
    desc: 'Utworz uzytkownika MySQL',
    tags: ['sql', 'mysql', 'user', 'create'],
    page: '/cheatsheets/sql',
  },
  {
    cmd: "GRANT ALL PRIVILEGES ON sklep.* TO 'app'@'localhost'",
    desc: 'Nadaj uprawnienia do bazy w MySQL',
    tags: ['sql', 'mysql', 'grant', 'permissions'],
    page: '/cheatsheets/sql',
  },
  {
    cmd: 'mysqldump -u root -p sklep > sklep.sql',
    desc: 'Backup bazy MySQL do pliku SQL',
    tags: ['sql', 'mysql', 'backup', 'mysqldump'],
    page: '/cheatsheets/sql',
  },
  {
    cmd: 'pg_dump -F c -U postgres sklep -f sklep.dump',
    desc: 'Backup PostgreSQL w formacie custom (kompresja)',
    tags: ['sql', 'postgresql', 'backup', 'pg_dump'],
    page: '/cheatsheets/sql',
  },
  {
    cmd: 'SELECT k.imie, z.kwota FROM klienci k INNER JOIN zamowienia z ON k.id = z.klient_id',
    desc: 'INNER JOIN — laczenie tabel po kluczu',
    tags: ['sql', 'join', 'select', 'inner join'],
    page: '/cheatsheets/sql',
  },
  {
    cmd: 'SELECT kategoria, COUNT(*) FROM produkty GROUP BY kategoria HAVING COUNT(*) > 5',
    desc: 'GROUP BY + HAVING — agregacja z filtrowaniem grup',
    tags: ['sql', 'group by', 'having', 'aggregate'],
    page: '/cheatsheets/sql',
  },
  {
    cmd: 'EXPLAIN ANALYZE SELECT * FROM klienci WHERE email = ...',
    desc: 'Plan wykonania zapytania PostgreSQL',
    tags: ['sql', 'postgresql', 'explain', 'performance'],
    page: '/cheatsheets/sql',
  },

  // Ansible
  {
    cmd: 'ansible all -m ping',
    desc: 'Test polaczenia ze wszystkimi hostami',
    tags: ['ansible', 'ad-hoc', 'ping'],
    page: '/cheatsheets/ansible',
  },
  {
    cmd: 'ansible all -m setup',
    desc: 'Pobierz fakty (info o systemach) z hostow',
    tags: ['ansible', 'facts', 'setup', 'ad-hoc'],
    page: '/cheatsheets/ansible',
  },
  {
    cmd: 'ansible all --become -m apt -a "name=htop state=present"',
    desc: 'Zainstaluj pakiet na wszystkich hostach (sudo)',
    tags: ['ansible', 'apt', 'install', 'ad-hoc'],
    page: '/cheatsheets/ansible',
  },
  {
    cmd: 'ansible-playbook -i inventory.ini site.yml',
    desc: 'Uruchom playbook z konkretnym inventory',
    tags: ['ansible', 'playbook', 'run'],
    page: '/cheatsheets/ansible',
  },
  {
    cmd: 'ansible-playbook site.yml --check --diff',
    desc: 'Dry-run playbooka z roznicami (bez zmian)',
    tags: ['ansible', 'check', 'diff', 'dry-run'],
    page: '/cheatsheets/ansible',
  },
  {
    cmd: 'ansible-playbook site.yml --tags "deploy" --limit web1',
    desc: 'Uruchom tylko wybrane tagi na wybranym hoscie',
    tags: ['ansible', 'tags', 'limit'],
    page: '/cheatsheets/ansible',
  },
  {
    cmd: 'ansible-galaxy init roles/apache',
    desc: 'Utworz szablon roli z pelna struktura katalogow',
    tags: ['ansible', 'galaxy', 'role', 'init'],
    page: '/cheatsheets/ansible',
  },
  {
    cmd: 'ansible-vault create secrets.yml',
    desc: 'Utworz zaszyfrowany plik z sekretami',
    tags: ['ansible', 'vault', 'secrets'],
    page: '/cheatsheets/ansible',
  },
  {
    cmd: 'ansible-vault encrypt_string "tajne" --name db_password',
    desc: 'Zaszyfruj pojedyncza wartosc do uzycia in-line',
    tags: ['ansible', 'vault', 'encrypt'],
    page: '/cheatsheets/ansible',
  },
  {
    cmd: 'ansible-playbook site.yml --vault-password-file ~/.vault',
    desc: 'Uruchom playbook z plikiem hasla vault',
    tags: ['ansible', 'vault', 'playbook'],
    page: '/cheatsheets/ansible',
  },

  // JMeter / Load testing
  {
    cmd: './jmeter -n -t plan.jmx -l result.jtl -e -o report/',
    desc: 'JMeter non-GUI run + raport HTML',
    tags: ['jmeter', 'load testing', 'performance'],
    page: '/lessons/14',
  },
  {
    cmd: 'siege -c 100 -t 60s http://localhost/',
    desc: 'Test obciazeniowy z Siege (100 userow, 60s)',
    tags: ['siege', 'load testing', 'performance'],
    page: '/lessons/14',
  },
  {
    cmd: 'wrk -t10 -c200 -d30s http://localhost/',
    desc: 'wrk benchmark — 10 watkow, 200 conn, 30s',
    tags: ['wrk', 'load testing', 'benchmark'],
    page: '/lessons/14',
  },
  {
    cmd: 'pgbench -h 127.0.0.1 -p 5432 -U app -c 200 -j 10 -T 60 app',
    desc: 'Benchmark PostgreSQL (pgbench)',
    tags: ['postgresql', 'pgbench', 'benchmark', 'performance'],
    page: '/lessons/17',
  },

  // Replication
  {
    cmd: 'pg_basebackup -h master_ip -U replicator -D /var/lib/postgresql/15/main -P --wal-method=stream',
    desc: 'Bootstrap slave z mastera (streaming replication)',
    tags: ['postgresql', 'replication', 'pg_basebackup', 'ha'],
    page: '/lessons/17',
  },
  {
    cmd: 'SELECT * FROM pg_stat_replication',
    desc: 'Status replikacji na master PostgreSQL',
    tags: ['postgresql', 'replication', 'pg_stat'],
    page: '/lessons/17',
  },
  {
    cmd: 'SELECT pg_is_in_recovery()',
    desc: 'Sprawdz czy host jest standby (t) czy primary (f)',
    tags: ['postgresql', 'replication', 'standby'],
    page: '/lessons/17',
  },
  {
    cmd: 'pg_ctl promote -D /var/lib/postgresql/15/main',
    desc: 'Promuj standby do primary (manualny failover)',
    tags: ['postgresql', 'failover', 'promote'],
    page: '/lessons/17',
  },

  // Docker — Images & Dockerfile (lesson 20 + cheatsheet)
  {
    cmd: 'docker build -t user/myapp:1.0 .',
    desc: 'Zbuduj obraz z Dockerfile w biezacym katalogu',
    tags: ['docker', 'build', 'image', 'dockerfile'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: 'docker buildx build --platform linux/amd64,linux/arm64 -t user/app:1.0 --push .',
    desc: 'Multi-arch build + push w jednym kroku',
    tags: ['docker', 'buildx', 'multi-arch', 'push'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: 'docker tag myapp:1.0 user/myapp:latest',
    desc: 'Tag obrazu (alias pod inna nazwa)',
    tags: ['docker', 'tag', 'image'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: 'docker login -u user',
    desc: 'Logowanie do Docker Hub (PAT jako haslo)',
    tags: ['docker', 'login', 'hub', 'registry'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: 'docker push user/myapp:1.0',
    desc: 'Wypchnij obraz do Docker Hub',
    tags: ['docker', 'push', 'hub', 'registry'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: "docker inspect --format '{{json .Config.Labels}}' myapp:1.0 | jq",
    desc: 'Wyswietl etykiety OCI obrazu',
    tags: ['docker', 'inspect', 'oci', 'labels'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: 'docker image history nginx',
    desc: 'Historia warstw obrazu z rozmiarami',
    tags: ['docker', 'image', 'history', 'layers'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: 'docker save myapp:1.0 | gzip > myapp.tar.gz',
    desc: 'Zapisz obraz do tarball (offline transport)',
    tags: ['docker', 'save', 'export', 'image'],
    page: '/cheatsheets/docker-images',
  },

  // Dockerfile keywords (lesson 20/21 + cheatsheet)
  {
    cmd: 'FROM python:3.12-slim',
    desc: 'Obraz bazowy z pinem wersji',
    tags: ['dockerfile', 'from', 'python', 'base'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: 'USER appuser',
    desc: 'Uzytkownik nie-root dla CMD i exec',
    tags: ['dockerfile', 'user', 'security', 'non-root'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: 'WORKDIR /app',
    desc: 'Katalog roboczy dla kolejnych instrukcji',
    tags: ['dockerfile', 'workdir'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: 'ENV GREETING_NAME=Student',
    desc: 'Zmienna srodowiskowa widoczna w runtime',
    tags: ['dockerfile', 'env', 'environment'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: 'LABEL org.opencontainers.image.title="myapp"',
    desc: 'OCI label — tytul obrazu',
    tags: ['dockerfile', 'label', 'oci', 'metadata'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: 'LABEL org.opencontainers.image.source="https://github.com/..."',
    desc: 'OCI label — link do repo zrodlowego',
    tags: ['dockerfile', 'label', 'oci', 'source'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: 'COPY --chown=appuser:appuser app.py /app/',
    desc: 'Kopiuj pliki z ustalonym wlascicielem',
    tags: ['dockerfile', 'copy', 'chown'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: 'CMD ["python", "app.py"]',
    desc: 'Domyslna komenda (exec form, PID 1)',
    tags: ['dockerfile', 'cmd', 'exec form'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: 'ENTRYPOINT ["python", "-m", "myapp"]',
    desc: 'Niezmienny punkt wejscia (CMD jako argumenty)',
    tags: ['dockerfile', 'entrypoint'],
    page: '/cheatsheets/docker-images',
  },
  {
    cmd: 'HEALTHCHECK --interval=30s CMD curl -fsS http://localhost/health || exit 1',
    desc: 'Test zywotnosci kontenera dla orkiestratora',
    tags: ['dockerfile', 'healthcheck', 'liveness'],
    page: '/cheatsheets/docker-images',
  },

  // Docker Compose (cheatsheet)
  {
    cmd: 'docker compose up -d --build',
    desc: 'Start serwisow w tle + przebuduj zmienione obrazy',
    tags: ['docker', 'compose', 'up', 'build'],
    page: '/cheatsheets/docker-compose',
  },
  {
    cmd: 'docker compose down -v',
    desc: 'Stop + usun kontenery, sieci, WOLUMINY (uwaga!)',
    tags: ['docker', 'compose', 'down', 'volumes'],
    page: '/cheatsheets/docker-compose',
  },
  {
    cmd: 'docker compose logs -f web',
    desc: 'Logi konkretnego serwisu na zywo',
    tags: ['docker', 'compose', 'logs'],
    page: '/cheatsheets/docker-compose',
  },
  {
    cmd: 'docker compose exec web bash',
    desc: 'Shell w dzialajacym serwisie',
    tags: ['docker', 'compose', 'exec', 'shell'],
    page: '/cheatsheets/docker-compose',
  },
  {
    cmd: 'docker compose run --rm app rake db:migrate',
    desc: 'Jednorazowy run zadania (np. migracje)',
    tags: ['docker', 'compose', 'run', 'job'],
    page: '/cheatsheets/docker-compose',
  },
  {
    cmd: 'docker compose --profile monitoring up -d',
    desc: 'Wlacz serwisy z profilu (Prometheus, Grafana)',
    tags: ['docker', 'compose', 'profile'],
    page: '/cheatsheets/docker-compose',
  },
  {
    cmd: 'depends_on: { db: { condition: service_healthy } }',
    desc: 'Czekaj na healthcheck zaleznego serwisu',
    tags: ['compose', 'depends_on', 'healthcheck'],
    page: '/cheatsheets/docker-compose',
  },

  // Docker Volumes & Networks (cheatsheet)
  {
    cmd: 'docker volume create pg-data',
    desc: 'Utworz nazwany wolumin',
    tags: ['docker', 'volume', 'create'],
    page: '/cheatsheets/docker-volumes-networks',
  },
  {
    cmd: 'docker run -v pg-data:/var/lib/postgresql/data postgres',
    desc: 'Podlacz named volume do kontenera',
    tags: ['docker', 'volume', 'run', 'postgres'],
    page: '/cheatsheets/docker-volumes-networks',
  },
  {
    cmd: 'docker run -v $(pwd)/src:/app/src myapp',
    desc: 'Bind mount katalogu hosta (dev / hot reload)',
    tags: ['docker', 'bind mount', 'volume', 'dev'],
    page: '/cheatsheets/docker-volumes-networks',
  },
  {
    cmd: 'docker run --mount type=volume,src=pg,dst=/var/lib/postgresql/data postgres',
    desc: 'Eksplicytna skladnia --mount dla woluminu',
    tags: ['docker', 'mount', 'volume'],
    page: '/cheatsheets/docker-volumes-networks',
  },
  {
    cmd: 'docker run --read-only --tmpfs /tmp myapp',
    desc: 'Kontener z read-only FS + tmpfs (hardening)',
    tags: ['docker', 'read-only', 'tmpfs', 'security'],
    page: '/cheatsheets/docker-volumes-networks',
  },
  {
    cmd: 'docker network create moja-siec',
    desc: 'Wlasna siec bridge (z DNS po nazwie kontenera)',
    tags: ['docker', 'network', 'create', 'bridge'],
    page: '/cheatsheets/docker-volumes-networks',
  },
  {
    cmd: 'docker network connect moja-siec web',
    desc: 'Podlacz dzialajacy kontener do sieci',
    tags: ['docker', 'network', 'connect'],
    page: '/cheatsheets/docker-volumes-networks',
  },
  {
    cmd: 'docker run -p 127.0.0.1:8080:80 nginx',
    desc: 'Bind portu tylko na localhost hosta',
    tags: ['docker', 'port', 'localhost', 'security'],
    page: '/cheatsheets/docker-volumes-networks',
  },
  {
    cmd: "docker inspect -f '{{.NetworkSettings.IPAddress}}' web",
    desc: 'Wyciagnij IP kontenera przez --format',
    tags: ['docker', 'inspect', 'ip', 'network'],
    page: '/cheatsheets/docker-volumes-networks',
  },
  {
    cmd: 'docker run --rm -v pg-data:/data -v $(pwd):/backup ubuntu tar czf /backup/pg-data.tar.gz -C /data .',
    desc: 'Backup wolumenu do tar.gz na host',
    tags: ['docker', 'backup', 'volume', 'tar'],
    page: '/cheatsheets/docker-volumes-networks',
  },

  // Docker Hub homework (lesson 21)
  {
    cmd: 'docker run --rm -e GREETING_NAME=Mateusz user/devops-handbook-hello:1.0.0',
    desc: 'Uruchom obraz Pythona z nadpisana ENV (homework 21)',
    tags: ['docker', 'run', 'env', 'homework'],
    page: '/homework/21',
  },

  // Python Basics (lesson 22)
  {
    cmd: 'python3 --version',
    desc: 'Sprawdz zainstalowana wersje Pythona',
    tags: ['python', 'version', 'install'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'python3 hello.py',
    desc: 'Uruchom skrypt Pythona (Linux/macOS)',
    tags: ['python', 'run', 'script'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'python3',
    desc: 'Uruchom REPL Pythona (tryb interaktywny)',
    tags: ['python', 'repl', 'interactive'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'print("Witaj, swiecie!")',
    desc: 'Wypisz tekst na ekran',
    tags: ['python', 'print', 'hello world'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'x = int(input("Wiek: "))',
    desc: 'Wczytaj liczbe od uzytkownika (input zawsze zwraca str)',
    tags: ['python', 'input', 'int'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'print(f"Witaj, {name}!")',
    desc: 'f-string — interpolacja zmiennych (Python 3.6+)',
    tags: ['python', 'fstring', 'format', 'string'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'for i in range(5):',
    desc: 'Petla for od 0 do 4',
    tags: ['python', 'for', 'range', 'loop'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'for i in range(1, 11):',
    desc: 'Petla for od 1 do 10 (od inclusive, do exclusive)',
    tags: ['python', 'for', 'range', 'loop'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'if x < 10:\\n    print("mniej")\\nelif x == 10:\\n    print("rowno")',
    desc: 'Instrukcja warunkowa if/elif/else',
    tags: ['python', 'if', 'elif', 'else', 'warunki'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'def add(x, y):\\n    return x + y',
    desc: 'Definicja funkcji',
    tags: ['python', 'def', 'function', 'return'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'fruits = ["a", "b", "c"]',
    desc: 'Lista — kolekcja uporzadkowana',
    tags: ['python', 'list', 'lista'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'fruits.append("d")',
    desc: 'Dodaj element na koniec listy',
    tags: ['python', 'list', 'append'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'user = {"name": "Mateusz", "age": 30}',
    desc: 'Slownik (dict) — pary klucz-wartosc',
    tags: ['python', 'dict', 'slownik'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'try: ... except ValueError as e:',
    desc: 'Obsluga bledow (try/except)',
    tags: ['python', 'try', 'except', 'error', 'exception'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'with open("data.txt") as f: content = f.read()',
    desc: 'Czytanie pliku z auto-close (context manager)',
    tags: ['python', 'open', 'file', 'read', 'with'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'import os; os.environ.get("HOME")',
    desc: 'Odczyt zmiennej srodowiskowej',
    tags: ['python', 'os', 'env', 'environment'],
    page: '/cheatsheets/python-basics',
  },
  {
    cmd: 'if __name__ == "__main__":',
    desc: 'Punkt wejscia CLI (uruchamiane bezposrednio vs importowane)',
    tags: ['python', 'main', 'cli', 'entrypoint'],
    page: '/cheatsheets/python-basics',
  },

  // pip & venv (lesson 22)
  {
    cmd: 'python3 -m venv .venv',
    desc: 'Utworz wirtualne srodowisko w folderze .venv',
    tags: ['python', 'venv', 'virtual', 'environment'],
    page: '/cheatsheets/pip-venv',
  },
  {
    cmd: 'source .venv/bin/activate',
    desc: 'Aktywuj venv (Linux/macOS)',
    tags: ['python', 'venv', 'activate', 'linux', 'macos'],
    page: '/cheatsheets/pip-venv',
  },
  {
    cmd: '.\\\\.venv\\\\Scripts\\\\Activate.ps1',
    desc: 'Aktywuj venv (Windows PowerShell)',
    tags: ['python', 'venv', 'activate', 'windows'],
    page: '/cheatsheets/pip-venv',
  },
  {
    cmd: 'deactivate',
    desc: 'Wyjdz z venv',
    tags: ['python', 'venv', 'deactivate'],
    page: '/cheatsheets/pip-venv',
  },
  {
    cmd: 'pip install requests',
    desc: 'Zainstaluj pakiet z PyPI',
    tags: ['python', 'pip', 'install', 'package'],
    page: '/cheatsheets/pip-venv',
  },
  {
    cmd: 'pip install -r requirements.txt',
    desc: 'Zainstaluj wszystkie zaleznosci z pliku',
    tags: ['python', 'pip', 'install', 'requirements'],
    page: '/cheatsheets/pip-venv',
  },
  {
    cmd: 'pip freeze > requirements.txt',
    desc: 'Zapisz biezace wersje pakietow do pliku',
    tags: ['python', 'pip', 'freeze', 'requirements'],
    page: '/cheatsheets/pip-venv',
  },
  {
    cmd: 'pip list --outdated',
    desc: 'Pokaz pakiety ze starszymi wersjami niz dostepne',
    tags: ['python', 'pip', 'list', 'outdated'],
    page: '/cheatsheets/pip-venv',
  },
  {
    cmd: 'pip install --upgrade pip',
    desc: 'Zaktualizuj sam pip',
    tags: ['python', 'pip', 'upgrade'],
    page: '/cheatsheets/pip-venv',
  },
  {
    cmd: 'pipx install ansible',
    desc: 'Globalne narzedzie CLI w izolowanym venv',
    tags: ['python', 'pipx', 'cli', 'ansible'],
    page: '/cheatsheets/pip-venv',
  },

  // Homework 22 (BMI + tablica mnozenia)
  {
    cmd: 'bmi = waga / (wzrost / 100) ** 2',
    desc: 'Wzor na BMI w Pythonie (homework 22)',
    tags: ['python', 'bmi', 'homework'],
    page: '/homework/22',
  },
];
