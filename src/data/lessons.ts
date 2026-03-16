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
    title: 'Wkrótce...',
    desc: 'Ta lekcja jest w trakcie przygotowania',
    color: 'var(--c-yellow)',
    tags: [],
    to: '/lessons/06',
    disabled: true,
  },
];
