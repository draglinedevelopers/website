import Link from 'next/link'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ArrowLink from '@/components/ArrowLink'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

export const metadata = {
  title: 'Work',
  description: 'A selection of Dragline Developers projects across our practice areas.',
}

const cases = [
  {
    slug: 'operations-system-food-business',
    category: 'Automation & Business Systems',
    title: 'Operations System for a Food Business',
    context: 'Internal - Dragline Operational Use',
    problem: 'A food business operating across multiple payment channels (cash, card, bank transfer) had no unified view of inventory, sales, or revenue. Everything was managed manually and reconciled by hand.',
    outcome: 'Designed and implemented an integrated operations system covering real-time inventory tracking, multi-channel sales data, and automated payment reconciliation across all payment methods.',
  },
]

export default function WorkPage() {
  return (
    <div>
      <PageHero eyebrow="Work" title="What We've Built">
        A selection of projects across our practice areas.
      </PageHero>

      <div className="container py-16 md:py-20 grid gap-5">
        {cases.map((c, i) => (
          <Reveal key={c.slug} delay={i * 60}>
          <Link
            href={`/work/${c.slug}`}
            className="group block rounded-lg border border-line overflow-hidden transition-[border-color,transform] duration-200 ease-out-strong hover:border-ink hover:-translate-y-0.5"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10">
                <span className="font-mono-label text-ink-muted">{c.category}</span>
                <h2 className="mt-3 font-display text-2xl font-semibold">{c.title}</h2>
                <p className="mt-2 text-sm text-ink-muted">{c.context}</p>
                <p className="mt-4 text-ink-muted max-w-md">{c.problem}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink group-hover:text-highlight">
                  View Project <ArrowUpRight size={14} className="transition-transform duration-150 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
              <div className="relative aspect-[4/3] md:aspect-auto">
                <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <rect width="400" height="300" className="fill-paper" />
                  <g className="stroke-line" strokeWidth="1">
                    <line x1="0" y1="75" x2="400" y2="75" />
                    <line x1="0" y1="150" x2="400" y2="150" />
                    <line x1="0" y1="225" x2="400" y2="225" />
                    <line x1="100" y1="0" x2="100" y2="300" />
                    <line x1="200" y1="0" x2="200" y2="300" />
                    <line x1="300" y1="0" x2="300" y2="300" />
                  </g>
                  <rect x="40" y="180" width="40" height="70" className="fill-accent" />
                  <rect x="120" y="120" width="40" height="130" className="fill-sage" />
                  <rect x="200" y="150" width="40" height="100" className="fill-ink-muted" />
                  <rect x="280" y="90" width="40" height="160" className="fill-highlight" />
                </svg>
              </div>
            </div>
          </Link>
          </Reveal>
        ))}
      </div>

      <div className="container pb-16 md:pb-20">
        <ArrowLink href="/contact" className="text-lg font-medium text-ink hover:text-highlight">
          Working on something? Let&apos;s talk.
        </ArrowLink>
      </div>
    </div>
  )
}
