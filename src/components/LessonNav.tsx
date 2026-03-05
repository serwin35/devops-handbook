import { Link } from 'react-router-dom';

interface LessonNavItem {
  to: string;
  label: string;
}

interface LessonNavProps {
  prev?: LessonNavItem;
  next?: LessonNavItem;
}

export default function LessonNav({ prev, next }: LessonNavProps) {
  return (
    <div className="flex justify-between mt-6 pt-4 border-t border-[var(--c-border)]">
      {prev ? (
        <Link
          to={prev.to}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-muted)] text-xs hover:border-[var(--c-accent)] hover:text-[var(--c-accent)] transition-all"
        >
          &larr; {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={next.to}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-muted)] text-xs hover:border-[var(--c-accent)] hover:text-[var(--c-accent)] transition-all"
        >
          {next.label} &rarr;
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
