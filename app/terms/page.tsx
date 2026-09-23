import PageHero from '@/components/PageHero'
import { site } from '@/lib/metadata'

export const metadata = { title: 'Terms of Service' }

export default function TermsPage() {
  return (
    <div>
      <PageHero eyebrow="Legal" title="Terms of Service">
        Last updated {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}.
      </PageHero>
      <div className="container py-16 md:py-20 prose max-w-2xl">
        <p>
          These terms cover your use of draglinedevelopers.com. By using this site, you agree to
          them. This site is informational — it describes {site.name} and lets you get in touch
          with us. It isn&apos;t a platform for transactions, accounts, or hosted software.
        </p>

        <h2>Use of this site</h2>
        <p>
          You&apos;re welcome to browse this site and use the contact form to reach us. Please
          don&apos;t use it to submit false information, attempt to disrupt or gain unauthorized
          access to it, or misuse the contact form (including automated or bulk submissions).
        </p>

        <h2>Intellectual property</h2>
        <p>
          The content on this site — including our name, logo, copy, and design — belongs to{' '}
          {site.name} unless otherwise noted. You may not reproduce or use it for your own
          purposes without our permission.
        </p>

        <h2>No warranty</h2>
        <p>
          This site and its content are provided as-is. We work to keep it accurate and
          available, but we don&apos;t guarantee it will be error-free, uninterrupted, or fit
          for any particular purpose.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the extent permitted by law, {site.name} isn&apos;t liable for any indirect,
          incidental, or consequential damages arising from your use of this site.
        </p>

        <h2>Engagements with Dragline</h2>
        <p>
          These terms cover the website only. Any actual project, contract, or paid engagement
          with {site.name} is governed by its own separate agreement, agreed in writing before
          work begins.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after a change
          means you accept the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{' '}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </div>
    </div>
  )
}
