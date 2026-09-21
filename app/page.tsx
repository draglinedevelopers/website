import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/Hero'
import Reveal from '@/components/Reveal'
import ArrowLink from '@/components/ArrowLink'
import { serviceAccent, accentClass } from '@/lib/accents'
import {
  AppWindow,
  Plugs,
  Robot,
  PenNib,
  Compass,
  GlobeHemisphereWest,
  Package,
  Wrench,
  ArrowUpRight,
} from '@phosphor-icons/react/dist/ssr'

const services = [
  {
    id: 'digital-products',
    title: 'Digital Products',
    desc: 'Web apps, mobile apps, and customer platforms built to perform.',
    icon: AppWindow,
  },
  {
    id: 'api-integrations',
    title: 'APIs & Integrations',
    desc: 'Secure APIs and reliable integrations that let your systems work together.',
    icon: Plugs,
  },
  {
    id: 'automation-ai',
    title: 'Automation & AI',
    desc: 'Replacing manual processes with intelligent, connected systems.',
    icon: Robot,
  },
  {
    id: 'design',
    title: 'Design',
    desc: 'Product design and brand systems that make businesses look and feel credible.',
    icon: PenNib,
  },
  {
    id: 'technology-consulting',
    title: 'Technology Consulting',
    desc: 'Technology strategy and roadmaps before the first line of code is written.',
    icon: Compass,
  },
]

const proofPoints = [
  {
    title: 'Global Team, Local Context',
    desc: 'We understand the markets our clients operate in, not just the technology. Solutions are built for how business actually works in your environment.',
    icon: GlobeHemisphereWest,
  },
  {
    title: 'Full-Stack Delivery',
    desc: 'Strategy, design, development, and automation under one roof. No handoffs to unknown subcontractors. One team, end to end.',
    icon: Package,
  },
  {
    title: "We've Built It Ourselves",
    desc: "Dragline's own products are built on the same stack we build for clients. We don't recommend what we haven't done.",
    icon: Wrench,
  },
]

export default function Page() {
  return (
    <div>
      <Hero />

      {/* Positioning statement */}
      <section className="bg-surface border-b border-line">
        <div className="container py-20 md:py-28">
          <p className="text-xl md:text-2xl leading-relaxed max-w-3xl">
            Most businesses know they need better technology. The problem is finding a team that
            understands the business first, then builds the right thing, instead of overselling
            tools that create more problems than they solve.
          </p>
          <p className="mt-6 text-xl md:text-2xl font-semibold max-w-3xl">
            That&apos;s the gap Dragline exists to fill.
          </p>
        </div>
      </section>

      {/* What we do */}
      <section className="container py-16 md:py-24">
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight max-w-xl">
          What we do
        </h2>
        <div className="mt-8 grid sm:grid-cols-2 gap-5">
          {services.map(({ id, title, desc, icon: Icon }, i) => {
            const a = accentClass[serviceAccent[id]]
            const isLast = i === services.length - 1
            return (
              <Reveal key={id} delay={i * 60} className={isLast ? 'sm:col-span-2' : ''}>
                <Link
                  href={`/services#${id}`}
                  className="group block h-full rounded-lg border border-line bg-surface p-8 shadow-sm transition-[border-color,transform,box-shadow] duration-200 ease-out-strong hover:border-ink hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line">
                    <Icon size={22} weight="regular" className={a.text} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{desc}</p>
                  <span className={`mt-5 inline-flex items-center gap-1 text-sm font-medium text-ink-muted ${a.hoverText}`}>
                    See more <ArrowUpRight size={14} className="transition-transform duration-150 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Work snapshot */}
      <section className="border-t border-line bg-surface">
        <div className="container py-16 md:py-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight max-w-xl">
            What we&apos;ve built
          </h2>
          <Reveal>
            <Link
              href="/work"
              className="group mt-8 block rounded-lg border border-line overflow-hidden transition-[border-color,transform] duration-200 ease-out-strong hover:border-ink hover:-translate-y-0.5"
            >
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <span className="font-mono-label text-ink-muted">Automation &amp; Business Systems</span>
                  <h3 className="mt-3 font-display text-2xl font-semibold">
                    Operations System for a Food Business
                  </h3>
                  <p className="mt-3 text-ink-muted max-w-md">
                    Real-time inventory, multi-channel sales, and automated payment reconciliation
                    in one system.
                  </p>
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
          <div className="mt-6">
            <ArrowLink href="/work" className="text-sm font-medium text-ink hover:text-highlight">
              See all work
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* Why Dragline */}
      <section className="container py-16 md:py-24">
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight max-w-xl">
          Why Dragline
        </h2>
        <div className="mt-10 grid sm:grid-cols-3 gap-8">
          {proofPoints.map(({ title, desc, icon: Icon }, i) => (
            <Reveal key={title} delay={i * 60}>
              <Icon size={24} weight="regular" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-highlight text-dragline-black">
        <div className="container py-16 md:py-24 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Ready to build something serious?
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center whitespace-nowrap rounded-md bg-dragline-black text-highlight px-6 py-3 text-sm font-semibold hover:opacity-90 transition-[opacity,transform] duration-150 ease-out-strong active:scale-[0.97]"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  )
}
