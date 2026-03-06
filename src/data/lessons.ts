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
];
