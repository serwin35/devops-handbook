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
    desc: 'cd, pwd, ls, touch, mkdir, cp, rm, grep, find',
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
    icon: '\uD83D\uDD11',
    title: 'SSH Keys',
    desc: 'ssh-keygen, ssh-copy-id, authorized_keys, agent',
    color: 'var(--c-accent)',
    to: '/cheatsheets/ssh-keys',
  },
  {
    icon: '\uD83D\uDCBB',
    title: 'SSH Welcome',
    desc: 'MOTD, ASCII Art, dynamic info',
    color: 'var(--c-accent)',
    to: '/cheatsheets/ssh-welcome',
  },
  {
    icon: '\u270F\uFE0F',
    title: 'Edytory Tekstu',
    desc: 'vim, nano, sed, awk',
    color: 'var(--c-purple)',
    to: '/cheatsheets/editors',
  },
  {
    icon: '\uD83D\uDCE6',
    title: 'Package Management',
    desc: 'apt, yum, dnf, snap, flatpak',
    color: 'var(--c-orange)',
    to: '/cheatsheets/package-management',
  },
  {
    icon: '\uD83D\uDCDC',
    title: 'Bash Scripting',
    desc: 'zmienne, pętle, warunki, funkcje',
    color: 'var(--c-green)',
    to: '/cheatsheets/bash-scripting',
  },
  {
    icon: '\uD83D\uDCCA',
    title: 'Procesy i Monitorowanie',
    desc: 'ps, kill, top, htop, free, df, uptime, ss',
    color: 'var(--c-green)',
    to: '/cheatsheets/processes-monitoring',
  },
  {
    icon: '\u23F0',
    title: 'Cron Jobs',
    desc: 'crontab, systemd timers, at, anacron',
    color: 'var(--c-yellow)',
    to: '/cheatsheets/cron-jobs',
  },
  {
    icon: '🔌',
    title: 'Networking Basics',
    desc: 'Adresy IP, localhost, porty, NAT',
    color: 'var(--c-blue)',
    to: '/cheatsheets/networking-basics',
  },
  {
    icon: '🛠️',
    title: 'Network Tools',
    desc: 'curl, ngrok, Postman, mitmproxy, Wireshark',
    color: 'var(--c-purple)',
    to: '/cheatsheets/network-tools',
  },
];
