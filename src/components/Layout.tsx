import { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const breadcrumbNames: Record<string, string> = {
  lessons: 'Lekcje',
  cheatsheets: 'Cheatsheets',
  '01': '01 — Wprowadzenie do DevOps',
  '02': '02 — Systemy operacyjne i Linux',
  '03': '03 — Placeholder',
  permissions: 'Linux Permissions',
  filesystem: 'Filesystem Hierarchy',
  docker: 'Docker Basics',
  git: 'Git Commands',
  networking: 'Networking',
  systemd: 'Systemd',
  'ssh-keys': 'SSH Keys',
  'ssh-welcome': 'SSH Welcome',
  'linux-basics': 'Linux Basics',
  search: 'Szukaj',
};

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const segments = pathname.split('/').filter(Boolean);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        navigate('/search');
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="min-h-screen px-4 pt-20 pb-8 md:px-6 lg:px-8 max-w-[1600px] mx-auto">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 lg:px-8 py-3 border-b border-[var(--c-border)] bg-[var(--c-bg)]/90 backdrop-blur-md">
        <Link
          to="/"
          className="font-['Syne'] text-sm font-bold uppercase tracking-widest text-[var(--c-muted)] hover:text-[var(--c-accent)] transition-colors"
        >
          DevOps Handbook
        </Link>
        <div className="flex gap-4 text-xs">
          <Link
            to="/search"
            className={`hover:text-[var(--c-accent)] transition-colors flex items-center gap-1.5 ${pathname === '/search' ? 'text-[var(--c-accent)] font-bold border-b border-[var(--c-accent)]' : 'text-[var(--c-muted)]'}`}
          >
            Szukaj
            <kbd className="hidden sm:inline text-[9px] px-1 py-0.5 rounded border border-[var(--c-border)] bg-[var(--c-surface2)] text-[var(--c-muted)]">
              {'\u2318'}K
            </kbd>
          </Link>
          <Link
            to="/lessons"
            className={`hover:text-[var(--c-accent)] transition-colors ${pathname.startsWith('/lessons') ? 'text-[var(--c-accent)] font-bold border-b border-[var(--c-accent)]' : 'text-[var(--c-muted)]'}`}
          >
            Lekcje
          </Link>
          <Link
            to="/cheatsheets"
            className={`hover:text-[var(--c-accent)] transition-colors ${pathname.startsWith('/cheatsheets') ? 'text-[var(--c-accent)] font-bold border-b border-[var(--c-accent)]' : 'text-[var(--c-muted)]'}`}
          >
            Cheatsheets
          </Link>
        </div>
      </nav>

      {segments.length > 0 && (
        <div className="flex items-center gap-1.5 text-[11px] text-[var(--c-muted)] mb-5">
          <Link
            to="/"
            className="hover:text-[var(--c-accent)] transition-colors"
          >
            Start
          </Link>
          {segments.map((seg, i) => {
            const path = '/' + segments.slice(0, i + 1).join('/');
            const isLast = i === segments.length - 1;
            const name = breadcrumbNames[seg] || seg;
            return (
              <span key={path} className="flex items-center gap-1.5">
                <span className="text-[var(--c-dim)]">/</span>
                {isLast ? (
                  <span className="text-[var(--c-text)]">{name}</span>
                ) : (
                  <Link
                    to={path}
                    className="hover:text-[var(--c-accent)] transition-colors"
                  >
                    {name}
                  </Link>
                )}
              </span>
            );
          })}
        </div>
      )}

      <Outlet />
    </div>
  );
}
