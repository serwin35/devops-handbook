import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import LessonNav from '../../components/LessonNav';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Lesson04() {
  usePageTitle('Lekcja 04');

  return (
    <div>
      <PageHeader
        title="Lekcja 04"
        subtitle="Wkrótce..."
        color="var(--c-yellow)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="W przygotowaniu">
          <p className="text-[var(--c-muted)] text-sm">
            Ta lekcja jest w trakcie przygotowania. Wracaj wkrótce!
          </p>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/03', label: '03 — Wiersz poleceń i Bash' }}
      />
    </div>
  );
}
