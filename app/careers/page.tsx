import PageHero from '@/components/PageHero'
import { site } from '@/lib/metadata'

export const metadata = { title: 'Careers' }

export default function CareersPage() {
  return (
    <div>
      <PageHero eyebrow="Careers" title="Join the team">
        No open roles right now. If you would like to be considered for future opportunities,
        send a short note with links to your work.
      </PageHero>
      <div className="container py-16 md:py-20">
        <a
          href={`mailto:${site.contactEmail}`}
          className="text-ink font-medium hover:text-highlight"
        >
          {site.contactEmail}
        </a>
      </div>
    </div>
  )
}
