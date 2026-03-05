import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import LessonNav from '../../components/LessonNav'
import { usePageTitle } from '../../hooks/usePageTitle'

export default function Lesson03() {
  usePageTitle('Lekcja 03')

  return (
    <div>
      <PageHeader title="Lekcja 03" subtitle="Wkrótce..." color="var(--c-orange)" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="W przygotowaniu">
          <p className="text-[var(--c-muted)] text-sm">Ta lekcja jest w trakcie przygotowania. Wracaj wkrótce!</p>
        </Card>
      </div>

      <LessonNav prev={{ to: '/lessons/02', label: 'Lekcja 02' }} />
    </div>
  )
}
