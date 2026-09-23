import Link from 'next/link'
import Hero from '@/components/Hero'
import Reveal from '@/components/Reveal'
import ArrowLink from '@/components/ArrowLink'
import WorkGraphic from '@/components/WorkGraphic'
import { serviceAccent, accentClass } from '@/lib/accents'
import { cases } from '@/lib/work'
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
                  className="group block h-full rounded-2xl bg-surface p-8 md:p-9 transition-[transform,box-shadow] duration-200 ease-out-strong hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper">
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
              href={`/work/${cases[0].slug}`}
              className="group mt-8 block rounded-2xl overflow-hidden bg-paper transition-[transform,box-shadow] duration-200 ease-out-strong hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <span className="font-mono-label text-ink-muted">{cases[0].category}</span>
                  <h3 className="mt-3 font-display text-2xl font-semibold">{cases[0].title}</h3>
                  <p className="mt-3 text-ink-muted max-w-md">{cases[0].summary}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink group-hover:text-highlight">
                    View Project <ArrowUpRight size={14} className="transition-transform duration-150 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <WorkGraphic className="w-full h-full" />
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
    </div>
  )
}
