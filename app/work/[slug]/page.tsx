import { notFound } from 'next/navigation'
import Accordion from '@/components/Accordion'
import ArrowLink from '@/components/ArrowLink'
import WorkGraphic from '@/components/WorkGraphic'
import { cases } from '@/lib/work'

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const data = cases.find((c) => c.slug === params.slug)
  if (!data) return {}
  return { title: data.title, description: data.summary }
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const data = cases.find((c) => c.slug === params.slug)
  if (!data) return notFound()

  return (
    <div>
      <div className="border-b border-line">
        <div className="container pt-16 pb-12 md:pt-24 md:pb-16">
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-4xl">
            {data.title}
          </h1>
          <p className="mt-4 font-mono-label text-ink-muted">{data.category}</p>
        </div>
      </div>

      <div className="container py-16 md:py-20">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16">
          <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden rounded-2xl bg-surface">
            <WorkGraphic className="w-full h-full" />
          </div>

          <div>
            <h2 className="font-mono-label text-ink-muted mb-3">Deliverables</h2>
            <ul className="space-y-2 text-ink-muted">
              {data.deliverables.map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-muted" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Accordion
                items={[
                  { title: 'Context', content: data.context },
                  { title: 'Challenge', content: data.challenge },
                  { title: 'Solution', content: data.solution },
                  { title: 'Credits', content: data.credits },
                ]}
                defaultOpen={[0]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-16 md:pb-20">
        <ArrowLink href="/work" className="text-sm font-medium text-ink hover:text-highlight">
          Back to all work
        </ArrowLink>
      </div>
    </div>
  )
}
