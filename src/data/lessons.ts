export interface LessonItem {
  num: string;
  title: string;
  desc: string;
  color: string;
  tags: string[];
  to: string;
  disabled?: boolean;
}

export const lessons: LessonItem[] = [
  {
    num: '01',
    title: 'Wprowadzenie do DevOps',
    desc: 'DevOps, konteneryzacja, Kubernetes, Linux, Docker, Git, GitHub Actions, CI/CD, pakiety APT',
    color: 'var(--c-accent)',
    tags: ['DevOps', 'Docker', 'Kubernetes', 'Git', 'CI/CD', 'APT'],
    to: '/lessons/01',
  },
  {
    num: '02',
    title: 'Systemy operacyjne i Linux',
    desc: 'Historia Unix/Linux, jądro systemu, system plików, LVM, dystrybucje, użytkownicy, uprawnienia, UFW, Netplan',
    color: 'var(--c-purple)',
    tags: ['Unix', 'Kernel', 'Filesystem', 'LVM', 'Permissions', 'UFW'],
    to: '/lessons/02',
  },
  {
    num: '03',
    title: 'Wiersz poleceń i Bash',
    desc: 'Shell, potoki, zmienne środowiskowe, PATH, export, menedżer pakietów APT/DNF',
    color: 'var(--c-orange)',
    tags: ['Bash', 'Shell', 'Pipes', 'PATH', 'APT', 'DNF', 'Zmienne'],
    to: '/lessons/03',
  },
  {
    num: '04',
    title: 'Administracja systemem: Procesy i Usługi',
    desc: 'init.d vs systemd, systemctl, procesy, PID, kill, monitorowanie zasobów, journalctl',
    color: 'var(--c-green)',
    tags: [
      'systemd',
      'systemctl',
      'procesy',
      'PID',
      'kill',
      'journalctl',
      'monitoring',
    ],
    to: '/lessons/04',
  },
  {
    num: '05',
    title: 'Podstawy sieci',
    desc: 'Adresy IP (localhost, prywatne, publiczne), porty, NAT, diagnostyka problemów sieciowych, narzędzia (curl, ngrok, Postman)',
    color: 'var(--c-blue)',
    tags: ['Networking', 'IP', 'Porty', 'curl', 'ngrok', 'Diagnostyka'],
    to: '/lessons/05',
  },
  {
    num: '06',
    title: 'DNS i Domeny',
    desc: 'DNS, rekordy A/CNAME/MX/TXT, konfiguracja domen, narzedzia dig/nslookup, CORS',
    color: 'var(--c-purple)',
    tags: ['DNS', 'Domeny', 'CORS', 'dig', 'nslookup', 'A', 'CNAME', 'MX'],
    to: '/lessons/06',
  },
  {
    num: '07',
    title: 'Wirtualizacja',
    desc: 'VirtualBox, VMware, Hyper-V, AWS EC2, Azure VM, snapshoty, klonowanie, VM vs kontenery',
    color: 'var(--c-orange)',
    tags: [
      'VM',
      'VirtualBox',
      'VMware',
      'Hyper-V',
      'AWS',
      'Azure',
      'Snapshoty',
    ],
    to: '/lessons/07',
  },
  {
    num: '08',
    title: 'Narzędzia Uniksa cz. 1',
    desc: 'Użytkownicy, uprawnienia, rsync, edytory konsolowe (Vim, Nano, Emacs), monitoring wydajności, analiza logów',
    color: 'var(--c-yellow)',
    tags: [
      'rsync',
      'Vim',
      'Nano',
      'htop',
      'logi',
      'chmod',
      'chown',
      'monitoring',
    ],
    to: '/lessons/08',
  },
  {
    num: '09',
    title: 'Narzędzia Uniksa cz. 2',
    desc: 'Dyski, partycje, LVM, pliki, archiwa, kompresja, sieć, SSH, użytkownicy i uprawnienia',
    color: 'var(--c-green)',
    tags: ['fdisk', 'LVM', 'tar', 'gzip', 'SSH', 'chmod', 'ip', 'mount'],
    to: '/lessons/09',
  },
  {
    num: '10',
    title: 'Repozytoria',
    desc: 'Git, gałęzienie, Git Flow, merge, rebase, GitHub, GitLab, Bitbucket, współpraca zespołowa',
    color: 'var(--c-accent)',
    tags: ['Git', 'GitHub', 'GitLab', 'branch', 'merge', 'rebase', 'Git Flow'],
    to: '/lessons/10',
  },
  {
    num: '11',
    title: 'Wprowadzenie do Bash',
    desc: 'Filozofia Unix, zmienne, warunki if/then/fi, petle for/while, tablice, funkcje, automatyzacja',
    color: 'var(--c-orange)',
    tags: [
      'Bash',
      'Zmienne',
      'Warunki',
      'Petle',
      'Funkcje',
      'Tablice',
      'Skrypty',
    ],
    to: '/lessons/11',
  },
  {
    num: '12',
    title: 'Wkrotce...',
    desc: 'Ta lekcja jest w trakcie przygotowania',
    color: 'var(--c-green)',
    tags: [],
    to: '/lessons/12',
    disabled: true,
  },
];
