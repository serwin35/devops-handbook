import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';
import { cheatsheets } from '../data/cheatsheets';

export default function CheatsheetsList() {
  usePageTitle('Cheatsheets');

  return (
    <div>
      <PageHeader
        title="Cheatsheets & Reference Boards"
        subtitle="Wszystkie sciagiawki i tablice referencyjne"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {cheatsheets.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="flex items-center gap-3 px-4 py-3 bg-[var(--c-surface)] border border-[var(--c-border)] rounded-lg hover:border-[var(--c-accent)] hover:-translate-y-0.5 transition-all"
          >
            <span
              className="text-xl w-8 text-center"
              style={{ color: c.color }}
            >
              {c.icon}
            </span>
            <div>
              <div className="text-xs font-bold">{c.title}</div>
              <div className="text-[var(--c-muted)] text-[10px]">{c.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
