'use client'

import { useState } from 'react'
import { Plus } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

type Item = { title: string; content: string }

export default function Accordion({
  items,
  defaultOpen = [],
}: {
  items: Item[]
  defaultOpen?: number[]
}) {
  const [open, setOpen] = useState<Set<number>>(new Set(defaultOpen))

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open.has(i)
        return (
          <div key={item.title} className="border-b border-line">
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-medium">{item.title}</span>
              <Plus
                size={16}
                className={cn(
                  'shrink-0 text-ink-muted transition-transform duration-200 ease-out-strong',
                  isOpen && 'rotate-45'
                )}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-200 ease-out-strong"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="pb-4 text-sm text-ink-muted max-w-prose">{item.content}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
