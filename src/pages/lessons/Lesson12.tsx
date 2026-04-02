import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import LessonNav from '../../components/LessonNav';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Lesson12() {
  usePageTitle('Lekcja 12');

  return (
    <div>
      <PageHeader
        title="Lekcja 12"
        subtitle="Wkrotce..."
        color="var(--c-green)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="W przygotowaniu">
          <p className="text-[var(--c-muted)] text-sm">
            Ta lekcja jest w trakcie przygotowania. Wracaj wkrotce!
          </p>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/11', label: '11 — Wprowadzenie do Bash' }}
      />
    </div>
  );
}
