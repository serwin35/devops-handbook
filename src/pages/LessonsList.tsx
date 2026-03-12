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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {lessons.map((l) => {
          const id = toProgressId(l);

          if (l.disabled) {
            return (
              <div
                key={l.num}
                className="bg-[var(--c-surface)] border border-[var(--c-dim)] rounded-xl px-4 py-3 opacity-40 cursor-not-allowed"
                style={{
                  borderLeftWidth: '3px',
                  borderLeftColor: 'var(--c-dim)',
                }}
              >
                <div className="flex items-baseline gap-2.5 mb-1">
                  <div className="font-['Syne'] text-2xl font-extrabold leading-none text-[var(--c-dim)]">
                    {l.num}
                  </div>
                  <div className="font-['Syne'] text-[13px] font-bold text-[var(--c-muted)]">
                    {l.title}
                  </div>
                </div>
                <div className="text-[var(--c-muted)] text-[11px]">
                  {l.desc}
                </div>
              </div>
            );
          }

          return (
            <div
              key={l.num}
              className="relative bg-[var(--c-surface)] border border-[var(--c-border)] rounded-xl px-4 py-3 hover:border-[var(--c-accent)] hover:-translate-y-0.5 transition-all"
              style={{ borderLeftWidth: '3px', borderLeftColor: l.color }}
            >
              <button
                onClick={() => toggle(id)}
                className={`absolute top-2.5 right-2.5 w-5 h-5 rounded border text-[10px] flex items-center justify-center transition-colors ${isCompleted(id) ? 'bg-[var(--c-green)] border-[var(--c-green)] text-black' : 'border-[var(--c-border)] text-[var(--c-muted)] hover:border-[var(--c-accent)]'}`}
                title={
                  isCompleted(id)
                    ? 'Oznacz jako nieukończone'
                    : 'Oznacz jako ukończone'
                }
              >
                {isCompleted(id) ? '\u2713' : ''}
              </button>
              <Link to={l.to} className="block">
                <div className="flex items-baseline gap-2.5 mb-1">
                  <div
                    className="font-['Syne'] text-2xl font-extrabold leading-none"
                    style={{ color: l.color }}
                  >
                    {l.num}
                  </div>
                  <div className="font-['Syne'] text-[13px] font-bold">
                    {l.title}
                  </div>
                </div>
                <div className="text-[var(--c-muted)] text-[11px] leading-relaxed mb-2">
                  {l.desc}
                </div>
                <div className="flex flex-wrap gap-1">
                  {l.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--c-surface2)] border border-[var(--c-border)] text-[var(--c-muted)]"
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
