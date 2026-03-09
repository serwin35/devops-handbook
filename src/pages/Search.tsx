import { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchIndex } from '../data/searchIndex';
import { usePageTitle } from '../hooks/usePageTitle';
import PageHeader from '../components/PageHeader';

export default function Search() {
  const [query, setQuery] = useState('');

  const results =
    query.length < 2
      ? []
      : searchIndex.filter((item) => {
          const q = query.toLowerCase();
          return (
            item.cmd.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            item.tags.some((t) => t.includes(q))
          );
        });

  const grouped = results.reduce<Record<string, typeof searchIndex>>(
    (acc, item) => {
      const key = item.page;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {},
  );

  const pageLabels = {
    '/cheatsheets/permissions': 'Permissions',
    '/cheatsheets/filesystem': 'Filesystem',
    '/cheatsheets/docker': 'Docker',
    '/cheatsheets/git': 'Git',
    '/lessons/01': 'Lekcja 01',
    '/lessons/02': 'Lekcja 02',
    '/cheatsheets/ssh-welcome': 'SSH Welcome',
    '/cheatsheets/systemd': 'Systemd',
    '/cheatsheets/networking': 'Networking',
    '/cheatsheets/ssh-keys': 'SSH Keys',
    '/cheatsheets/linux-basics': 'Linux Basics',
  };

  return (
    <div>
      <PageHeader
        title="Szukaj komend"
        subtitle="Wyszukiwarka po komendach, opisach i tagach"
      />

      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Wpisz komendę, np. chmod, docker run, git stash..."
          autoFocus
          className="w-full bg-[var(--c-surface)] border border-[var(--c-border)] rounded-lg px-4 py-3 text-sm text-[var(--c-text)] placeholder-[var(--c-muted)] focus:outline-none focus:border-[var(--c-accent)] transition-colors"
        />
      </div>

      {query.length >= 2 && (
        <div className="text-[var(--c-muted)] text-xs mb-4" aria-live="polite">
          {results.length} {results.length === 1 ? 'wynik' : 'wyników'} dla
          &quot;{query}&quot;
        </div>
      )}

      {Object.entries(grouped).map(([page, items]) => (
        <div key={page} className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Link
              to={page}
              className="text-xs text-[var(--c-accent)] hover:text-[var(--c-green)] transition-colors"
            >
              {pageLabels[page] || page}
            </Link>
            <span className="text-[var(--c-muted)] text-[10px]">
              ({items.length})
            </span>
          </div>
          <div className="space-y-1">
            {items.map((item, i) => (
              <Link
                to={page}
                key={i}
                className="flex items-start gap-4 px-3 py-2 rounded-lg bg-[var(--c-surface)] border border-[var(--c-border)] hover:border-[var(--c-accent)] transition-all group"
              >
                <code className="text-[var(--c-green)] text-xs shrink-0 font-mono bg-[var(--c-dim)] px-2 py-0.5 rounded">
                  {item.cmd}
                </code>
                <span className="text-[var(--c-muted)] text-xs group-hover:text-[var(--c-text)] transition-colors">
                  {item.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {query.length >= 2 && results.length === 0 && (
        <div className="text-center py-12 text-[var(--c-muted)] text-sm">
          Brak wyników. Spróbuj innej frazy.
        </div>
      )}

      {query.length < 2 && (
        <div className="text-center py-12">
          <div className="text-[var(--c-muted)] text-sm mb-4">
            Wpisz min. 2 znaki aby wyszukać
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'chmod',
              'docker',
              'git',
              'ufw',
              'lvm',
              'apt',
              'htop',
              'netplan',
              'ssh',
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1 rounded-md bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-muted)] text-xs hover:border-[var(--c-accent)] hover:text-[var(--c-accent)] transition-all cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
