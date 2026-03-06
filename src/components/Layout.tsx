import { Outlet, Link, useLocation } from 'react-router-dom';

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
  search: 'Szukaj',
};

export default function Layout() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <div className="min-h-screen px-4 py-8 md:px-6 lg:px-8 max-w-[1600px] mx-auto">
      <nav className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--c-border)]">
        <Link
          to="/"
          className="font-['Syne'] text-sm font-bold uppercase tracking-widest text-[var(--c-muted)] hover:text-[var(--c-accent)] transition-colors"
        >
          DevOps Handbook
        </Link>
        <div className="flex gap-4 text-xs">
          <Link
            to="/search"
            className={`hover:text-[var(--c-accent)] transition-colors ${pathname === '/search' ? 'text-[var(--c-accent)]' : 'text-[var(--c-muted)]'}`}
          >
            Szukaj
          </Link>
          <Link
            to="/lessons/01"
            className={`hover:text-[var(--c-accent)] transition-colors ${pathname.startsWith('/lessons') ? 'text-[var(--c-accent)]' : 'text-[var(--c-muted)]'}`}
          >
            Lekcje
          </Link>
          <Link
            to="/cheatsheets/permissions"
            className={`hover:text-[var(--c-accent)] transition-colors ${pathname.startsWith('/cheatsheets') ? 'text-[var(--c-accent)]' : 'text-[var(--c-muted)]'}`}
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
            Hub
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
