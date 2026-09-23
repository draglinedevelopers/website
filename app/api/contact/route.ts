import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().min(1).max(320).email(),
  company: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
  howHeard: z.string().trim().max(200).optional().default(''),
  company_website: z.string().trim().max(200).optional().default(''), // honeypot
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Please check your details and try again — a required field is missing or invalid.' },
      { status: 400 }
    )
  }

  const { name, email, company, message, howHeard, company_website: honeypot } = parsed.data

  if (honeypot) {
    return NextResponse.json({ ok: true })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  if (resendApiKey) {
    const resend = new Resend(resendApiKey)
    const recipientsEnv = process.env.CONTACT_RECIPIENTS
    const recipients = recipientsEnv
      ? recipientsEnv.split(',').map(s => s.trim()).filter(Boolean)
      : ['info@draglinedevelopers.com']
    try {
      await resend.emails.send({
        from: 'contact@draglinedevelopers.com',
        to: recipients,
        replyTo: email,
        subject: `New contact submission from ${name}`,
        html: `
          <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
            <h2 style="margin:0 0 8px;">New Contact</h2>
            <p style="margin:0 0 12px;">You received a new message via the website.</p>
            <div style="background:#f7f7f7;padding:12px;border-radius:8px;">
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p><strong>Company:</strong> ${escapeHtml(company)}</p>
              ${howHeard ? `<p><strong>How they heard about us:</strong> ${escapeHtml(howHeard)}</p>` : ''}
              <p><strong>Message:</strong></p>
              <pre style="white-space:pre-wrap;word-wrap:break-word;margin:0;">${escapeHtml(message)}</pre>
            </div>
          </div>
        `,
        text: `New contact submission\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\n${howHeard ? `How they heard about us: ${howHeard}\n` : ''}\nMessage:\n${message}`,
      })
    } catch (err) {
      console.error('Failed to send contact email', err)
      return NextResponse.json({ ok: false, error: 'Something went wrong sending your message. Please try again.' }, { status: 502 })
    }
  } else {
    console.error('RESEND_API_KEY missing; skipping email send')
    return NextResponse.json({ ok: false, error: 'Something went wrong sending your message. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
