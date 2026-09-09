import { notFound } from 'next/navigation'
import PageHero from '@/components/PageHero'

const cases: Record<string, { title: string; category: string; context: string; problem: string; outcome: string }> = {
  'operations-system-food-business': {
    title: 'Operations System for a Food Business',
    category: 'Automation & Business Systems',
    context: 'Internal - Dragline Operational Use',
    problem: 'A food business operating across multiple payment channels (cash, card, bank transfer) had no unified view of inventory, sales, or revenue. Everything was managed manually and reconciled by hand.',
    outcome: 'Designed and implemented an integrated operations system covering real-time inventory tracking, multi-channel sales data, and automated payment reconciliation across all payment methods.',
  },
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const data = cases[params.slug]
  if (!data) return notFound()
  return (
    <div>
      <PageHero eyebrow={data.category} title={data.title}>
        {data.context}
      </PageHero>
      <div className="container py-16 md:py-20 max-w-2xl space-y-10">
        <div>
          <h2 className="font-mono-label text-ink-muted">Problem</h2>
          <p className="mt-3 text-ink">{data.problem}</p>
        </div>
        <div>
          <h2 className="font-mono-label text-ink-muted">Outcome</h2>
          <p className="mt-3 text-ink">{data.outcome}</p>
        </div>
      </div>
    </div>
  )
}
