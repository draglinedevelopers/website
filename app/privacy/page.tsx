import PageHero from '@/components/PageHero'
import { site } from '@/lib/metadata'

export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div>
      <PageHero eyebrow="Legal" title="Privacy Policy">
        Last updated {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}.
      </PageHero>
      <div className="container py-16 md:py-20 prose max-w-2xl">
        <p>
          This policy explains what information {site.name} collects through this website,
          how it&apos;s used, and who it&apos;s shared with. It covers draglinedevelopers.com only.
        </p>

        <h2>Information we collect</h2>
        <p>
          We only collect information you choose to give us. When you submit the contact form,
          we collect your name, email address, company name, your message, and optionally how
          you heard about us. We don&apos;t use cookies or any third-party analytics or
          advertising trackers on this site, so we don&apos;t collect browsing behavior, and we
          don&apos;t build advertising profiles.
        </p>
        <p>
          Your device may store a single local preference — light or dark mode — directly in
          your browser. That preference never leaves your device or reaches our servers.
        </p>

        <h2>How we use it</h2>
        <p>
          Contact form submissions are used only to respond to your inquiry. We don&apos;t sell
          your information, and we don&apos;t share it with third parties except the service
          provider we use to deliver that email (see below).
        </p>

        <h2>Third-party services</h2>
        <p>
          We use Resend to deliver contact form emails to our team. Your submission is
          transmitted to Resend for that purpose and is subject to their own privacy practices.
          Fonts on this site are self-hosted at build time rather than loaded from Google&apos;s
          servers, so visiting this site doesn&apos;t share your data with Google as a side
          effect of font loading.
        </p>

        <h2>Data retention</h2>
        <p>
          We keep contact form submissions only as long as needed to respond to your inquiry and
          for a reasonable period afterward for our own records, unless you ask us to delete
          them sooner.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask us to access, correct, or delete any information you&apos;ve submitted to
          us by emailing{' '}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If this policy changes in a meaningful way, we&apos;ll update this page and revise the
          date above.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{' '}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </div>
    </div>
  )
}
