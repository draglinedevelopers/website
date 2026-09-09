import type { ReactNode } from 'react'

export default function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string
  title: string
  children?: ReactNode
}) {
  return (
    <section className="border-b border-line">
      <div className="container pt-16 pb-12 md:pt-24 md:pb-16">
        {eyebrow && <p className="font-mono-label text-ink-muted">{eyebrow}</p>}
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">
          {title}
        </h1>
        {children && <div className="mt-5 text-lg text-ink-muted max-w-2xl">{children}</div>}
      </div>
    </section>
  )
}
