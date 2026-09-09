'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { List, X, Sun, Moon } from '@phosphor-icons/react'
import { Button } from './Button'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <div className="container flex items-center justify-between py-3.5">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt="Dragline Developers"
            width={28}
            height={28}
            priority
            className="dark:invert"
          />
          <span className="font-display font-bold tracking-tight text-lg">DRAGLINE DEVELOPERS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm text-ink-muted hover:text-ink transition-colors',
                pathname === item.href && 'text-ink font-semibold'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="hidden sm:inline-flex items-center justify-center h-9 w-9 rounded-md border border-line text-ink-muted hover:text-ink hover:border-ink transition-colors"
              aria-label="Toggle color theme"
            >
              {resolvedTheme === 'dark' ? <Sun size={16} weight="regular" /> : <Moon size={16} weight="regular" />}
            </button>
          )}
          <Button href="/contact" className="hidden sm:inline-flex">
            Start a Project
          </Button>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-line"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Open navigation"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </header>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          'md:hidden fixed inset-0 z-40 bg-pure-black/60 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Slide-in drawer */}
      <div
        id="mobile-nav"
        className={cn(
          'md:hidden fixed inset-y-0 right-0 z-50 w-[82vw] max-w-xs border-l border-line bg-paper transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-line">
          <span className="font-mono-label text-ink-muted">Menu</span>
          <button
            type="button"
            className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-line"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-6 flex flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-base py-2.5 text-ink-muted',
                pathname === item.href && 'text-ink font-semibold'
              )}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="mt-3 inline-flex items-center gap-2 text-sm text-ink-muted"
            >
              {resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              {resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          )}
          <Button href="/contact" className="mt-4 w-full">
            Start a Project
          </Button>
        </div>
      </div>
    </>
  )
}
