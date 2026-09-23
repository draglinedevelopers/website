'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SquaresFour, List as ListIcon, ArrowUpRight } from '@phosphor-icons/react'
import Reveal from './Reveal'
import WorkGraphic from './WorkGraphic'
import { cn } from '@/lib/utils'
import type { CaseStudy } from '@/lib/work'

export default function WorkGrid({
  cases,
  categories,
}: {
  cases: CaseStudy[]
  categories: string[]
}) {
  const [active, setActive] = useState('All')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const tabs = ['All', ...categories]
  const filtered = active === 'All' ? cases : cases.filter((c) => c.category === active)

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActive(t)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                active === t ? 'bg-ink text-paper' : 'bg-surface text-ink-muted hover:text-ink'
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-full bg-surface p-1">
          <button
            type="button"
            onClick={() => setView('grid')}
            aria-label="Grid view"
            aria-pressed={view === 'grid'}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
              view === 'grid' ? 'bg-ink text-paper' : 'text-ink-muted hover:text-ink'
            )}
          >
            <SquaresFour size={15} />
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            aria-label="List view"
            aria-pressed={view === 'list'}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
              view === 'list' ? 'bg-ink text-paper' : 'text-ink-muted hover:text-ink'
            )}
          >
            <ListIcon size={15} />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-ink-muted">No projects in this category yet.</p>
      ) : view === 'grid' ? (
        <div className="mt-8 grid md:grid-cols-2 gap-x-5 gap-y-10">
          {filtered.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <Link href={`/work/${c.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface transition-[transform,box-shadow] duration-200 ease-out-strong group-hover:-translate-y-0.5 group-hover:shadow-lg">
                  <WorkGraphic className="w-full h-full" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <h2 className="font-display text-lg font-semibold">{c.title}</h2>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-ink-muted transition-transform duration-150 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                  />
                </div>
                <span className="mt-2 inline-block rounded-full bg-surface px-3 py-1 text-xs text-ink-muted">
                  {c.category}
                </span>
                <p className="mt-3 text-sm text-ink-muted max-w-md">{c.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-8 border-t border-line">
          {filtered.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60} className="border-b border-line">
              <Link href={`/work/${c.slug}`} className="group flex items-center justify-between gap-6 py-5">
                <div>
                  <h2 className="font-display text-lg font-semibold transition-colors group-hover:text-highlight">
                    {c.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted max-w-lg">{c.summary}</p>
                </div>
                <span className="hidden sm:inline-block shrink-0 rounded-full bg-surface px-3 py-1 text-xs text-ink-muted">
                  {c.category}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
