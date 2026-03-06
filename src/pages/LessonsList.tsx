import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';
import { useProgress } from '../hooks/useProgress';
import { lessons } from '../data/lessons';

function toProgressId(item: { to: string }) {
  return item.to.replace(/^\//, '').replace(/\//g, '-');
}

export default function LessonsList() {
  usePageTitle('Lekcje');
  const { isCompleted, toggle } = useProgress();

  return (
    <div>
      <PageHeader title="Lekcje" subtitle="Wszystkie lekcje kursu DevOps" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((l) => {
          const id = toProgressId(l);
          return (
            <div
              key={l.num}
              className="relative bg-[var(--c-surface)] border border-[var(--c-border)] rounded-xl p-5 hover:border-[var(--c-accent)] hover:-translate-y-0.5 transition-all"
              style={{ borderLeftWidth: '3px', borderLeftColor: l.color }}
            >
              <button
                onClick={() => toggle(id)}
                className={`absolute top-3 right-3 w-5 h-5 rounded border text-[10px] flex items-center justify-center transition-colors ${isCompleted(id) ? 'bg-[var(--c-green)] border-[var(--c-green)] text-black' : 'border-[var(--c-border)] text-[var(--c-muted)] hover:border-[var(--c-accent)]'}`}
                title={
                  isCompleted(id)
                    ? 'Oznacz jako nieukonczone'
                    : 'Oznacz jako ukonczone'
                }
              >
                {isCompleted(id) ? '\u2713' : ''}
              </button>
              <Link to={l.to} className="block">
                <div
                  className="font-['Syne'] text-4xl font-extrabold leading-none mb-2"
                  style={{ color: l.color }}
                >
                  {l.num}
                </div>
                <div className="font-['Syne'] text-[15px] font-bold mb-1.5">
                  {l.title}
                </div>
                <div className="text-[var(--c-muted)] text-[11px] leading-relaxed mb-3">
                  {l.desc}
                </div>
                <div className="flex flex-wrap gap-1">
                  {l.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded bg-[var(--c-surface2)] border border-[var(--c-border)] text-[var(--c-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
