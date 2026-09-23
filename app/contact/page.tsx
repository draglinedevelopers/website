import ContactForm from '@/components/ContactForm'
import { site } from '@/lib/metadata'
import { LinkedinLogo, CalendarBlank } from '@phosphor-icons/react/dist/ssr'

export const metadata = {
  title: 'Contact',
  description: "Tell us what you're working on. No sales pitch, just a conversation.",
}

export default function ContactPage() {
  return (
    <div>
      <div className="border-b border-line">
        <div className="container pt-16 pb-16 md:pt-24 md:pb-20">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16">
            <div>
              <p className="font-mono-label text-ink-muted">Contact</p>
              <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight max-w-xl">
                Let&apos;s Build Something
              </h1>
              <p className="mt-5 text-lg text-ink-muted max-w-md">
                Tell us what you&apos;re working on. No sales pitch. Just a conversation.
              </p>

              <a
                href={site.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:border-ink transition-colors"
              >
                <CalendarBlank size={16} /> Book a Call
              </a>

              <div className="mt-14">
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

            <ContactForm />
          </div>
        </div>
      </div>

      <div className="container py-10 md:py-12 space-y-2 text-sm text-ink-muted">
        <p>No commitment required for the first conversation.</p>
        <p>We&apos;ll tell you honestly if we&apos;re not the right fit.</p>
        <p>If we are, we&apos;ll show you exactly how we&apos;d approach it.</p>
      </div>
    </div>
  )
}
