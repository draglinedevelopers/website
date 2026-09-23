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
      <div className="enter-pop rounded-2xl bg-surface p-8 flex items-start gap-4" role="status">
        <CheckCircle size={24} weight="regular" className="text-highlight shrink-0 mt-0.5" />
        <p className="text-lg">
          Thanks, we&apos;ve received your message and will respond within one business day.
        </p>
      </div>
    )
  }

  const fieldClass =
    'mt-2 w-full border-0 border-b border-line bg-transparent px-0 py-2.5 text-ink placeholder:text-ink-muted transition-colors focus:outline-none focus:border-ink focus-visible:ring-0 focus-visible:ring-offset-0'

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
        <input
          required
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Type your name"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          placeholder="Type your email"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium">Company or Business Name</label>
        <input
          required
          id="company"
          name="company"
          autoComplete="organization"
          placeholder="Type your company name"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">What are you looking to build or solve?</label>
        <textarea
          required
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your project"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="howHeard" className="block text-sm font-medium">
          How did you hear about Dragline? <span className="text-ink-muted font-normal">(optional)</span>
        </label>
        <select id="howHeard" name="howHeard" defaultValue="" className={fieldClass}>
          <option value="">Select an option</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
          <option value="Search">Search</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <input
        type="text"
        name="company_website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {status === 'error' && (
        <p className="enter-fade text-sm text-highlight" role="alert" aria-live="assertive">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center rounded-full bg-accent text-accent-ink px-6 py-2.5 text-sm font-semibold hover:brightness-95 active:scale-[0.97] transition-transform duration-150 ease-out-strong disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
