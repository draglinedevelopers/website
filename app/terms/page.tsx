import PageHero from '@/components/PageHero'

export const metadata = { title: 'Terms of Service' }

export default function TermsPage() {
  return (
    <div>
      <PageHero title="Terms of Service" />
      <div className="container py-16 md:py-20 prose max-w-2xl">
        <p>This starter contains placeholder terms. Replace with your actual terms and business information.</p>
      </div>
    </div>
  )
}
