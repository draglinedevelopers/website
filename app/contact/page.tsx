import PageHero from '@/components/PageHero'
import ContactForm from '@/components/ContactForm'
import { site } from '@/lib/metadata'
import { LinkedinLogo } from '@phosphor-icons/react/dist/ssr'

export const metadata = {
  title: 'Contact',
  description: "Tell us what you're working on. No sales pitch, just a conversation.",
}

export default function ContactPage() {
  return (
    <div>
      <PageHero eyebrow="Contact" title="Let's Build Something">
        Tell us what you&apos;re working on. No sales pitch. Just a conversation.
      </PageHero>

      <div className="container py-16 md:py-20">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
          <ContactForm />

          <div className="space-y-8">
            <div>
              <h2 className="font-mono-label text-ink-muted mb-3">Contact</h2>
              <a href={`mailto:${site.contactEmail}`} className="text-ink hover:text-highlight">
                {site.contactEmail}
              </a>
              <p className="mt-2 text-sm text-ink-muted">We respond within 1 business day.</p>
              <a
                href={site.socials.linkedin}
                className="mt-4 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
              >
                <LinkedinLogo size={18} /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-line max-w-2xl space-y-2 text-sm text-ink-muted">
          <p>No commitment required for the first conversation.</p>
          <p>We&apos;ll tell you honestly if we&apos;re not the right fit.</p>
          <p>If we are, we&apos;ll show you exactly how we&apos;d approach it.</p>
        </div>
      </div>
    </div>
  )
}
