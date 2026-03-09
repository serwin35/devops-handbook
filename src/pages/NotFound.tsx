import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('404');
  return (
    <div className="text-center py-24">
      <div className="font-['Syne'] text-8xl font-extrabold text-[var(--c-dim)] mb-4">
        404
      </div>
      <div className="text-[var(--c-muted)] text-sm mb-6">
        Strona nie znaleziona
      </div>
      <Link
        to="/"
        className="text-xs text-[var(--c-accent)] hover:text-[var(--c-green)] transition-colors"
      >
        &larr; Wróć do Dashboard
      </Link>
    </div>
  );
}
