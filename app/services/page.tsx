import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { Button } from '@/components/Button'
import Reveal from '@/components/Reveal'
import { serviceAccent, accentClass } from '@/lib/accents'

export const metadata = {
  title: 'Services',
  description: 'Five practice areas, one team: Digital Product Development, APIs & Integrations, Business Automation & AI, Design, and Technology Consulting.',
}

const services = [
  {
    id: 'digital-products',
    number: '01',
    title: 'Digital Product Development',
    positioning: 'Your customers experience your business through your product. We make sure that experience earns their trust.',
    deliverables: [
      'Web applications (desktop and mobile-responsive)',
      'Mobile apps, iOS and Android',
      'Customer portals and dashboards',
      'E-commerce platforms and storefronts',
      'MVP development for startups',
    ],
    whoFor: 'Startups and growing businesses that need a product built properly from the start, not patched together and retrofitted later.',
    cta: 'Talk to us about Digital Products',
  },
  {
    id: 'api-integrations',
    number: '02',
    title: 'APIs & Integrations',
    positioning: 'Your business runs on systems that need to work together. We build the connections that make that possible.',
    deliverables: [
      'Secure REST and GraphQL API design and development',
      'Webhook pipelines and third-party integrations',
      'Rate limiting, authentication, and API versioning',
      'Payment gateway and platform integrations',
      'API documentation and developer support',
    ],
    whoFor: 'Businesses whose products or operations depend on multiple systems working together reliably, and teams that need a clean, well-documented API their partners can build on.',
    cta: 'Talk to us about APIs & Integrations',
  },
  {
    id: 'automation-ai',
    number: '03',
    title: 'Business Automation & AI',
    positioning: 'Manual processes are a tax on your business. We replace them with systems that work while you sleep.',
    deliverables: [
      'Workflow automation (n8n, Make, and custom pipelines)',
      'AI-powered sales agents and customer assistants',
      'CRM, ERP, and third-party system integrations',
      'WhatsApp commerce automation (order management, payments)',
      'Internal tooling and operational dashboards',
      'Inventory and operations management systems',
    ],
    whoFor: 'Businesses growing fast but being held back by repetitive, manual operations, and founders who want technology to work for them, not the other way around.',
    cta: 'Talk to us about Automation & AI',
  },
  {
    id: 'design',
    number: '04',
    title: 'Design',
    positioning: 'Before your product is built, it needs to be understood. Design is how we make complex things feel simple.',
    deliverables: [
      'UI/UX design for web and mobile products',
      'Product design systems and component libraries',
      'Prototyping and interactive mockups',
      'User research and usability testing',
      'Brand identity for digital products',
    ],
    whoFor: 'Businesses building something new or improving something that currently confuses or frustrates their customers.',
    cta: 'Talk to us about Design',
  },
  {
    id: 'technology-consulting',
    number: '05',
    title: 'Technology Consulting',
    positioning: 'Not every problem needs code. Sometimes it needs clarity first.',
    deliverables: [
      'Technology audits (what you have, what’s working, what isn’t)',
      'Digital roadmaps and phased build plans',
      'Vendor and tool selection',
      'Build vs. buy analysis',
      'Team structure and hiring advice for technology roles',
    ],
    whoFor: 'Founders and leadership teams who need to understand their technology landscape before committing to a direction, and who want an honest, independent view.',
    cta: 'Talk to us about Consulting',
  },
]

const engagementModels = [
  {
    title: 'Project-Based',
    desc: 'Fixed scope, fixed delivery, fixed price. Best for clients with a defined problem and clear outcome. Typically shorter engagements.',
  },
  {
    title: 'Retainer',
    desc: 'Ongoing work, predictable output, monthly billing. Best for businesses that want a long-term technology partner rather than one-off projects.',
  },
  {
    title: 'Consulting',
    desc: 'Strategic engagements billed by day or hour. Best as a starting point for complex situations where the right direction isn’t yet clear. Often converts to full delivery work.',
  },
]

export default function ServicesPage() {
  return (
    <div>
      <PageHero eyebrow="Services" title="What We Build">
        Five practice areas. One team. Everything your business needs to operate, grow, and
        compete in a digital world.
      </PageHero>

      <div className="container py-16 md:py-20 space-y-6">
        {services.map((s) => {
          const a = accentClass[serviceAccent[s.id]]
          return (
            <Reveal id={s.id} key={s.id} className="rounded-lg border border-line p-8 md:p-10">
              <div className="flex items-start gap-4">
                <span className={`font-mono text-2xl shrink-0 ${a.text}`}>{s.number}</span>
                <div>
                  <h2 className="font-display text-xl font-semibold">{s.title}</h2>
                  <p className="mt-3 text-lg font-medium">{s.positioning}</p>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-8 md:pl-11">
                <div>
                  <h3 className="font-mono-label text-ink-muted mb-3">Deliverables</h3>
                  <ul className="space-y-2 text-ink-muted">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-3">
                        <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${a.bg}`} aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono-label text-ink-muted mb-3">Who it&apos;s for</h3>
                  <p className="text-ink-muted">{s.whoFor}</p>
                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md border px-5 py-2.5 text-sm font-semibold ${a.border} ${a.text} hover:opacity-80 transition-[opacity,transform] duration-150 ease-out-strong active:scale-[0.97]`}
                    >
                      {s.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      <section className="border-t border-line bg-surface">
        <div className="container py-16 md:py-20">
          <h2 className="font-display text-2xl font-bold tracking-tight">How we work with clients</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {engagementModels.map((m) => (
              <div key={m.title} className="rounded-lg border border-line p-6">
                <h3 className="font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{m.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-lg font-medium">Not sure where to start? Let&apos;s figure it out together.</p>
          <div className="mt-5">
            <Button href="/contact">Start a Project</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
