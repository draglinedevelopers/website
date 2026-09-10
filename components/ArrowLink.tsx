import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import type { ReactNode } from 'react'

// Standalone text+arrow link (not wrapping a card). The card-wrapped arrow icons
// elsewhere reuse the same hover-nudge classes directly since they already sit in a
// `group` link. Nudge direction (up-right) matches the icon's own diagonal.
export default function ArrowLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-1 ${className ?? ''}`}>
      {children}
      <ArrowUpRight
        size={16}
        className="transition-transform duration-150 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  )
}
