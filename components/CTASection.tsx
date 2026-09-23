import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { site } from '@/lib/metadata'

const paths = [
  { label: 'Get a Quote', href: '/contact' },
  { label: 'Join Our Team', href: '/careers' },
  { label: 'Say Hello', href: `mailto:${site.contactEmail}` },
]

export default function CTASection() {
  return (
    <section className="bg-highlight text-dragline-black">
      <div className="container py-16 md:py-24">
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-center">
          Ready to build something serious?
        </h2>

        <div className="mt-14 border-t border-dragline-black/15">
          {paths.map((p) => (
            <Link
              key={p.label}
              href={p.href}
              className="group flex items-center justify-between gap-4 border-b border-dragline-black/15 py-5 text-lg md:text-xl font-medium transition-opacity duration-150 ease-out-strong hover:opacity-60"
            >
              {p.label}
              <ArrowUpRight
                size={20}
                className="shrink-0 transition-transform duration-150 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
