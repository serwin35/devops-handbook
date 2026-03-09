import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useProgress } from '../hooks/useProgress';
import { usePageTitle } from '../hooks/usePageTitle';
import { lessons } from '../data/lessons';
import { cheatsheets } from '../data/cheatsheets';

function toProgressId(item: { to: string }) {
  return item.to.replace(/^\//, '').replace(/\//g, '-');
}

export default function Dashboard() {
  usePageTitle('');
  const { isCompleted, toggle } = useProgress();

  const lessonIds = lessons
    .filter((l) => !l.disabled)
    .map((l) => toProgressId(l));
  const completedCount = lessonIds.filter((id) => isCompleted(id)).length;
  const totalCount = lessonIds.length;
  const percent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div>
      <PageHeader
        title="DevOps Learning Handbook"
        subtitle="Kurs DevOps — interaktywne notatki, cheatsheets i reference boards"
      />

      {/* Progress bar */}
      <div className="mb-8 px-4 py-3 rounded-lg bg-[var(--c-surface)] border border-[var(--c-border)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[var(--c-muted)] text-[11px] uppercase tracking-widest">
            Postęp nauki
          </span>
          <span className="text-xs">
            <span className="text-[var(--c-green)] font-bold">
              {completedCount}
            </span>
            <span className="text-[var(--c-muted)]"> / {totalCount}</span>
            <span className="text-[var(--c-muted)] ml-2">({percent}%)</span>
          </span>
        </div>
        <div
          className="w-full h-2 rounded-full bg-[var(--c-surface2)] overflow-hidden"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Postęp nauki: ${percent}%`}
        >
          <div
            className="h-full rounded-full bg-[var(--c-green)] transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Search quick access */}
      <Link
        to="/search"
        className="flex items-center gap-3 mb-8 px-4 py-3 rounded-lg bg-[var(--c-surface)] border border-[var(--c-border)] hover:border-[var(--c-accent)] transition-all group"
      >
        <span className="text-[var(--c-muted)] group-hover:text-[var(--c-accent)] transition-colors text-sm">
          &#128269;
        </span>
        <span className="text-[var(--c-muted)] group-hover:text-[var(--c-text)] text-xs transition-colors">
          Szukaj komend (chmod, docker, git...)
        </span>
      </Link>

      {/* Lessons */}
      <div className="text-[var(--c-muted)] text-[11px] uppercase tracking-widest mb-3">
        Lekcje
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {lessons.map((l) => {
          const id = toProgressId(l);

          if (l.disabled) {
            return (
              <div
                key={l.num}
                className="bg-[var(--c-surface)] border border-[var(--c-dim)] rounded-xl p-5 opacity-40 cursor-not-allowed"
                style={{
                  borderLeftWidth: '3px',
                  borderLeftColor: 'var(--c-dim)',
                }}
              >
                <div className="font-['Syne'] text-4xl font-extrabold leading-none mb-2 text-[var(--c-dim)]">
                  {l.num}
                </div>
                <div className="font-['Syne'] text-[15px] font-bold mb-1.5 text-[var(--c-muted)]">
                  {l.title}
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
              className="relative bg-[var(--c-surface)] border border-[var(--c-border)] rounded-xl p-5 hover:border-[var(--c-accent)] hover:-translate-y-0.5 transition-all"
              style={{ borderLeftWidth: '3px', borderLeftColor: l.color }}
            >
              <button
                onClick={() => toggle(id)}
                className={`absolute top-3 right-3 w-5 h-5 rounded border text-[10px] flex items-center justify-center transition-colors ${isCompleted(id) ? 'bg-[var(--c-green)] border-[var(--c-green)] text-black' : 'border-[var(--c-border)] text-[var(--c-muted)] hover:border-[var(--c-accent)]'}`}
                aria-label={
                  isCompleted(id)
                    ? 'Oznacz jako nieukończone'
                    : 'Oznacz jako ukończone'
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

      {/* Cheatsheets */}
      <div className="text-[var(--c-muted)] text-[11px] uppercase tracking-widest mb-3">
        Cheatsheets &amp; Reference Boards
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cheatsheets.map((c) => {
          const id = toProgressId(c);
          return (
            <div
              key={c.to}
              className="flex items-center gap-3 px-4 py-3 bg-[var(--c-surface)] border border-[var(--c-border)] rounded-lg hover:border-[var(--c-accent)] hover:-translate-y-0.5 transition-all"
            >
              <Link
                to={c.to}
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                <span
                  className="text-xl w-8 text-center flex-shrink-0"
                  style={{ color: c.color }}
                >
                  {c.icon}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-bold">{c.title}</div>
                  <div className="text-[var(--c-muted)] text-[10px]">
                    {c.desc}
                  </div>
                </div>
              </Link>
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => toggle(`${id}:done`)}
                  className={`w-6 h-6 rounded flex items-center justify-center text-[11px] transition-colors ${isCompleted(`${id}:done`) ? 'bg-[rgba(127,255,107,0.15)] text-[var(--c-green)]' : 'text-[var(--c-dim)] hover:text-[var(--c-muted)]'}`}
                  aria-label={
                    isCompleted(`${id}:done`)
                      ? 'Przeczytane'
                      : 'Oznacz jako przeczytane'
                  }
                >
                  {'\u2713'}
                </button>
                <button
                  onClick={() => toggle(`${id}:star`)}
                  className={`w-6 h-6 rounded flex items-center justify-center text-[11px] transition-colors ${isCompleted(`${id}:star`) ? 'bg-[rgba(255,190,11,0.15)] text-[var(--c-yellow)]' : 'text-[var(--c-dim)] hover:text-[var(--c-muted)]'}`}
                  aria-label={
                    isCompleted(`${id}:star`)
                      ? 'Ulubione'
                      : 'Dodaj do ulubionych'
                  }
                >
                  {'\u2605'}
                </button>
                <button
                  onClick={() => toggle(`${id}:bulb`)}
                  className={`w-6 h-6 rounded flex items-center justify-center text-[11px] transition-colors ${isCompleted(`${id}:bulb`) ? 'bg-[rgba(255,107,53,0.15)] text-[var(--c-orange)]' : 'text-[var(--c-dim)] hover:text-[var(--c-muted)]'}`}
                  aria-label={
                    isCompleted(`${id}:bulb`)
                      ? 'Do powtórzenia'
                      : 'Oznacz do powtórzenia'
                  }
                >
                  {'\uD83D\uDCA1'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
