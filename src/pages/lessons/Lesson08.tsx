import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import LessonNav from '../../components/LessonNav';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Lesson08() {
  usePageTitle('Lekcja 08');

  return (
    <div>
      <PageHeader
        title="Lekcja 08"
        subtitle="Wkrotce..."
        color="var(--c-yellow)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="W przygotowaniu">
          <p className="text-[var(--c-muted)] text-sm">
            Ta lekcja jest w trakcie przygotowania. Wracaj wkrotce!
          </p>
        </Card>
      </div>

      <LessonNav prev={{ to: '/lessons/07', label: '07 — Wirtualizacja' }} />
    </div>
  );
}
