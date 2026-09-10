'use client'

import { useState, FormEvent } from 'react'
import { CheckCircle } from '@phosphor-icons/react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = Object.fromEntries(data.entries())

    setStatus('submitting')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Something went wrong. Please try again.')
      }
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="enter-pop rounded-lg border border-line p-8 flex items-start gap-4">
        <CheckCircle size={24} weight="regular" className="text-highlight shrink-0 mt-0.5" />
        <p className="text-lg">
          Thanks, we&apos;ve received your message and will respond within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
        <input
          required
          id="name"
          name="name"
          className="mt-2 w-full rounded-md border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-ink-muted"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          className="mt-2 w-full rounded-md border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-ink-muted"
        />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium">Company or Business Name</label>
        <input
          required
          id="company"
          name="company"
          className="mt-2 w-full rounded-md border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-ink-muted"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">What are you looking to build or solve?</label>
        <textarea
          required
          id="message"
          name="message"
          rows={5}
          className="mt-2 w-full rounded-md border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-ink-muted"
        />
      </div>
      <div>
        <label htmlFor="howHeard" className="block text-sm font-medium">
          How did you hear about Dragline? <span className="text-ink-muted font-normal">(optional)</span>
        </label>
        <select
          id="howHeard"
          name="howHeard"
          defaultValue=""
          className="mt-2 w-full rounded-md border border-line bg-surface px-3 py-2.5 text-ink"
        >
          <option value="">Select an option</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Referral">Referral</option>
          <option value="Search">Search</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" />

      {status === 'error' && (
        <p className="enter-fade text-sm text-highlight" role="alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center rounded-md bg-accent text-accent-ink px-5 py-2.5 text-sm font-semibold hover:brightness-95 active:scale-[0.97] transition-transform duration-150 ease-out-strong disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
