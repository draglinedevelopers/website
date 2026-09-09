import { Button } from '@/components/Button'

export default function NotFound() {
  return (
    <div className="container py-24 md:py-32 text-center flex flex-col items-center">
      <p className="font-mono-label text-ink-muted">404</p>
      <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-ink-muted max-w-md">The page you requested does not exist.</p>
      <div className="mt-8">
        <Button href="/" variant="secondary">Go home</Button>
      </div>
    </div>
  )
}
