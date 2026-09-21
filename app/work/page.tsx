import Link from 'next/link'
import Image from 'next/image'
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
                <Image
                  src="https://images.unsplash.com/photo-1778791597308-a45982507d6b?auto=format&fit=crop&w=1200&q=80"
                  alt="A staff member entering an order on a point-of-sale screen at a food business counter"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
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
