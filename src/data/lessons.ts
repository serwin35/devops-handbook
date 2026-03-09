export interface LessonItem {
  num: string;
  title: string;
  desc: string;
  color: string;
  tags: string[];
  to: string;
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
    desc: 'Historia Unix/Linux, jadro systemu, system plikow, LVM, dystrybucje, uzytkownicy, uprawnienia, UFW, Netplan',
    color: 'var(--c-purple)',
    tags: ['Unix', 'Kernel', 'Filesystem', 'LVM', 'Permissions', 'UFW'],
    to: '/lessons/02',
  },
  {
    num: '03',
    title: 'Wiersz polecen i Bash',
    desc: 'Shell, potoki, zmienne srodowiskowe, PATH, export, menedzer pakietow APT/DNF',
    color: 'var(--c-orange)',
    tags: ['Bash', 'Shell', 'Pipes', 'PATH', 'APT', 'DNF', 'Zmienne'],
    to: '/lessons/03',
  },
  {
    num: '04',
    title: 'Wkrotce...',
    desc: 'Ta lekcja jest w trakcie przygotowania',
    color: 'var(--c-yellow)',
    tags: [],
    to: '/lessons/04',
  },
];
