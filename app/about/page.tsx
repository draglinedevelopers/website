import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ArrowLink from '@/components/ArrowLink'
import { User } from '@phosphor-icons/react/dist/ssr'

export const metadata = {
  title: 'About',
  description: 'Why Dragline Developers exists, what we believe, and the team behind the work.',
}

const team = [
  { role: 'CEO', dept: 'AI Automation & Strategy' },
  { role: 'COO', dept: 'Operations & Delivery' },
  { role: 'CTO', dept: 'Engineering & Technical Architecture' },
  { role: 'Lead Product Designer', dept: 'Design & User Experience' },
]

const principles = [
  {
    title: 'Business first, technology second.',
    desc: "We don't recommend tools we can't justify. Every solution maps to a real business outcome. If something doesn't make the business better, we won't build it.",
  },
  {
    title: 'Small teams, serious work.',
    desc: "We don't use team size as a proxy for quality. We use results. Every project gets senior attention, not handoffs down a chain.",
  },
  {
    title: 'We build for ourselves too.',
    desc: "Dragline's own products are built on the same systems we build for clients. We have skin in the game. If it doesn't hold up under our own use, it doesn't go to a client.",
  },
]

export default function AboutPage() {
  return (
    <div>
      <PageHero eyebrow="About" title="Why Dragline Exists" />

      <section className="container py-16 md:py-20 space-y-5 max-w-2xl">
        <p className="text-ink-muted">
          Dragline was built on a simple observation: most technology companies build what they
          know how to build, not what a business actually needs. The result is expensive tools
          that don&apos;t fit, integrations that break, and founders who know less about their own
          systems than their vendors do.
        </p>
        <p className="text-ink-muted">
          We started Dragline to do it differently. We sit with the business problem first. We
          understand the customer, the operation, the market. Then we build, whether that&apos;s a
          product, an automation, a design system, or a strategic roadmap.
        </p>
        <p className="text-ink-muted">
          The name is deliberate. The dragline thread is the strongest silk a spider produces: the
          one it uses to navigate, build, and connect to its world. That&apos;s what we do for the
          businesses we work with.
        </p>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="container py-16 md:py-20">
          <h2 className="font-display text-2xl font-bold tracking-tight">The Team</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {team.map((t, i) => (
              <Reveal key={t.role} delay={i * 60} className="rounded-lg border border-line p-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-line text-ink-muted">
                  <User size={22} weight="regular" />
                </div>
                <div>
                  <h3 className="font-semibold">{t.role}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{t.dept}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <h2 className="font-display text-2xl font-bold tracking-tight">What We Believe</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{p.desc}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <ArrowLink href="/contact" className="text-lg font-medium text-ink hover:text-highlight">
            Want to know more? Come talk to us.
          </ArrowLink>
        </div>
      </section>
    </div>
  )
}
