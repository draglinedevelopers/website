import Link from 'next/link'
import Image from 'next/image'
import { site } from '@/lib/metadata'
import { XLogo, LinkedinLogo, InstagramLogo } from '@phosphor-icons/react/dist/ssr'

const quickLinks = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Dragline Developers" width={26} height={26} className="dark:invert" />
            <span className="font-display font-bold tracking-tight text-lg">DRAGLINE DEVELOPERS</span>
          </Link>
          <p className="mt-3 text-sm text-ink-muted max-w-[28ch]">{site.tagline}</p>
        </div>

        <div>
          <div className="font-mono-label text-ink-muted mb-3">Quick Links</div>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link className="text-ink-muted hover:text-ink" href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-mono-label text-ink-muted mb-3">Social &amp; Contact</div>
          <a className="text-ink-muted hover:text-ink block" href={`mailto:${site.contactEmail}`}>
            {site.contactEmail}
          </a>
          <div className="mt-4 flex items-center gap-3">
            <a href={site.socials.linkedin} aria-label="LinkedIn" className="text-ink-muted hover:text-ink">
              <LinkedinLogo size={18} />
            </a>
            <a href={site.socials.x} aria-label="X (Twitter)" className="text-ink-muted hover:text-ink">
              <XLogo size={18} />
            </a>
            <a href={site.socials.instagram} aria-label="Instagram" className="text-ink-muted hover:text-ink">
              <InstagramLogo size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container py-4 text-xs text-ink-muted">
          &copy; {year} Dragline Developers. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
