import { Button } from '@/components/Button'
import { CheckCircle } from '@phosphor-icons/react/dist/ssr'

export const metadata = { title: 'Thank You' }

export default function ThankYouPage() {
  return (
    <div className="container py-24 md:py-32 text-center flex flex-col items-center">
      <CheckCircle size={40} weight="regular" className="text-highlight" />
      <h1 className="mt-5 font-display text-3xl md:text-4xl font-bold tracking-tight">Thank you</h1>
      <p className="mt-3 text-ink-muted max-w-md">
        We received your message and will get back to you shortly.
      </p>
      <div className="mt-8">
        <Button href="/" variant="secondary">Return home</Button>
      </div>
    </div>
  )
}
