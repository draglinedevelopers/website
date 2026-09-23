import PageHero from '@/components/PageHero'
import WorkGrid from '@/components/WorkGrid'
import { cases, categories } from '@/lib/work'

export const metadata = {
  title: 'Work',
  description: 'A selection of Dragline Developers projects across our practice areas.',
}

export default function WorkPage() {
  return (
    <div>
      <PageHero eyebrow="Work" title="What We've Built">
        A selection of projects across our practice areas.
      </PageHero>

      <div className="container py-16 md:py-20">
        <WorkGrid cases={cases} categories={categories} />
      </div>
    </div>
  )
}
