export interface CheatsheetItem {
  icon: string;
  title: string;
  desc: string;
  color: string;
  to: string;
}

export const cheatsheets: CheatsheetItem[] = [
  {
    icon: '\uD83D\uDDA5',
    title: 'Linux Basics',
    desc: 'cd, pwd, touch, nano, vim',
    color: 'var(--c-green)',
    to: '/cheatsheets/linux-basics',
  },
  {
    icon: '\u2699',
    title: 'Linux Permissions',
    desc: 'chmod, chown, users, groups',
    color: 'var(--c-green)',
    to: '/cheatsheets/permissions',
  },
  {
    icon: '\uD83D\uDCC1',
    title: 'Filesystem Hierarchy',
    desc: 'ls, cat, cp, rm, mkdir, FHS, LVM',
    color: 'var(--c-yellow)',
    to: '/cheatsheets/filesystem',
  },
  {
    icon: '\uD83D\uDC33',
    title: 'Docker Basics',
    desc: 'run, build, compose, volumes',
    color: 'var(--c-accent)',
    to: '/cheatsheets/docker',
  },
  {
    icon: '\u24D8',
    title: 'Git Commands',
    desc: 'branch, merge, remote, stash',
    color: 'var(--c-green)',
    to: '/cheatsheets/git',
  },
  {
    icon: '\uD83C\uDF10',
    title: 'Networking',
    desc: 'TCP/IP, DNS, porty, diagnostyka',
    color: 'var(--c-purple)',
    to: '/cheatsheets/networking',
  },
  {
    icon: '\u2699\uFE0F',
    title: 'Systemd',
    desc: 'systemctl, journalctl, unit files',
    color: 'var(--c-orange)',
    to: '/cheatsheets/systemd',
  },
  {
    icon: '\uD83D\uDCBB',
    title: 'SSH Welcome',
    desc: 'MOTD, ASCII Art, dynamic info',
    color: 'var(--c-accent)',
    to: '/cheatsheets/ssh-welcome',
  },
];
