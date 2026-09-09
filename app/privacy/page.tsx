import PageHero from '@/components/PageHero'

export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div>
      <PageHero title="Privacy Policy" />
      <div className="container py-16 md:py-20 prose max-w-2xl">
        <p>This starter contains placeholder policy text. Replace with your actual policy and legal owner details.</p>
      </div>
    </div>
  )
}
