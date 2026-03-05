import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useProgress } from '../hooks/useProgress'
import { usePageTitle } from '../hooks/usePageTitle'

const lessons = [
  { num: '01', title: 'Wprowadzenie do DevOps', desc: 'DevOps, konteneryzacja, Kubernetes, Linux, Docker, Git, GitHub Actions, CI/CD, pakiety APT', color: 'var(--c-accent)', tags: ['DevOps', 'Docker', 'Kubernetes', 'Git', 'CI/CD', 'APT'], to: '/lessons/01' },
  { num: '02', title: 'Systemy operacyjne i Linux', desc: 'Historia Unix/Linux, jadro systemu, system plikow, LVM, dystrybucje, uzytkownicy, uprawnienia, UFW, Netplan', color: 'var(--c-purple)', tags: ['Unix', 'Kernel', 'Filesystem', 'LVM', 'Permissions', 'UFW'], to: '/lessons/02' },
]

const cheatsheets = [
  { icon: '\u2699', title: 'Linux Permissions', desc: 'chmod, chown, users, groups', color: 'var(--c-green)', to: '/cheatsheets/permissions' },
  { icon: '\uD83D\uDCC1', title: 'Filesystem Hierarchy', desc: '/, /etc, /var, /home, LVM', color: 'var(--c-yellow)', to: '/cheatsheets/filesystem' },
  { icon: '\uD83D\uDC33', title: 'Docker Basics', desc: 'run, build, compose, volumes', color: 'var(--c-accent)', to: '/cheatsheets/docker' },
  { icon: '\u24D8', title: 'Git Commands', desc: 'branch, merge, remote, stash', color: 'var(--c-green)', to: '/cheatsheets/git' },
  { icon: '\uD83C\uDF10', title: 'Networking', desc: 'TCP/IP, DNS, porty, diagnostyka', color: 'var(--c-purple)', to: '/cheatsheets/networking' },
  { icon: '\u2699\uFE0F', title: 'Systemd', desc: 'systemctl, journalctl, unit files', color: 'var(--c-orange)', to: '/cheatsheets/systemd' },
]

export default function Dashboard() {
  usePageTitle('')
  const { isCompleted, toggle } = useProgress()

  return (
    <div>
      <PageHeader title="DevOps Learning Hub" subtitle="Kurs DevOps — interaktywne notatki, cheatsheets i reference boards" />

      {/* Search quick access */}
      <Link to="/search" className="flex items-center gap-3 mb-8 px-4 py-3 rounded-lg bg-[var(--c-surface)] border border-[var(--c-border)] hover:border-[var(--c-accent)] transition-all group">
        <span className="text-[var(--c-muted)] group-hover:text-[var(--c-accent)] transition-colors text-sm">&#128269;</span>
        <span className="text-[var(--c-muted)] group-hover:text-[var(--c-text)] text-xs transition-colors">Szukaj komend (chmod, docker, git...)</span>
      </Link>

      {/* Lessons */}
      <div className="text-[var(--c-muted)] text-[11px] uppercase tracking-widest mb-3">Lekcje</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {lessons.map(l => (
          <div key={l.num} className="relative bg-[var(--c-surface)] border border-[var(--c-border)] rounded-xl p-5 hover:border-[var(--c-accent)] hover:-translate-y-0.5 transition-all" style={{ borderLeftWidth: '3px', borderLeftColor: l.color }}>
            <button
              onClick={() => toggle(`lesson-${l.num}`)}
              className={`absolute top-3 right-3 w-5 h-5 rounded border text-[10px] flex items-center justify-center transition-colors ${isCompleted(`lesson-${l.num}`) ? 'bg-[var(--c-green)] border-[var(--c-green)] text-black' : 'border-[var(--c-border)] text-[var(--c-muted)] hover:border-[var(--c-accent)]'}`}
              title={isCompleted(`lesson-${l.num}`) ? 'Oznacz jako nieukonczone' : 'Oznacz jako ukonczone'}
            >
              {isCompleted(`lesson-${l.num}`) ? '\u2713' : ''}
            </button>
            <Link to={l.to} className="block">
              <div className="font-['Syne'] text-4xl font-extrabold leading-none mb-2" style={{ color: l.color }}>{l.num}</div>
              <div className="font-['Syne'] text-[15px] font-bold mb-1.5">{l.title}</div>
              <div className="text-[var(--c-muted)] text-[11px] leading-relaxed mb-3">{l.desc}</div>
              <div className="flex flex-wrap gap-1">
                {l.tags.map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[var(--c-surface2)] border border-[var(--c-border)] text-[var(--c-muted)]">{t}</span>
                ))}
              </div>
            </Link>
          </div>
        ))}
        <div className="bg-[var(--c-surface)] border border-[var(--c-dim)] rounded-xl p-5 opacity-40" style={{ borderLeftWidth: '3px', borderLeftColor: 'var(--c-dim)' }}>
          <div className="font-['Syne'] text-4xl font-extrabold leading-none mb-2 text-[var(--c-dim)]">03</div>
          <div className="font-['Syne'] text-[15px] font-bold mb-1.5 text-[var(--c-muted)]">Kolejna lekcja...</div>
          <div className="text-[var(--c-muted)] text-[11px]">Wkrotce</div>
        </div>
      </div>

      {/* Cheatsheets */}
      <div className="text-[var(--c-muted)] text-[11px] uppercase tracking-widest mb-3">Cheatsheets &amp; Reference Boards</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {cheatsheets.map(c => (
          <Link key={c.to} to={c.to} className="flex items-center gap-3 px-4 py-3 bg-[var(--c-surface)] border border-[var(--c-border)] rounded-lg hover:border-[var(--c-accent)] hover:-translate-y-0.5 transition-all">
            <span className="text-xl w-8 text-center" style={{ color: c.color }}>{c.icon}</span>
            <div>
              <div className="text-xs font-bold">{c.title}</div>
              <div className="text-[var(--c-muted)] text-[10px]">{c.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
