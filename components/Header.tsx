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
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
]

// Desktop pill omits Home (the logo covers that) and Contact (it's the CTA pill).
const desktopNav = nav.filter((item) => item.href !== '/' && item.href !== '/contact')

const pill = 'rounded-full border border-line bg-surface/80 backdrop-blur-md supports-[backdrop-filter]:bg-surface/70 shadow-sm'

// Crossfade + rotate between Sun/Moon instead of an instant unmount/remount swap.
// Both icons stay mounted and stacked; only opacity/transform change on theme toggle.
function ThemeIcon({ isDark, size }: { isDark: boolean; size: number }) {
  return (
    <span className="relative inline-block" style={{ width: size, height: size }}>
      <Sun
        size={size}
        weight="regular"
        className={cn(
          'absolute inset-0 transition-[opacity,transform] duration-200 ease-out-strong',
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
        )}
      />
      <Moon
        size={size}
        weight="regular"
        className={cn(
          'absolute inset-0 transition-[opacity,transform] duration-200 ease-out-strong',
          isDark ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
        )}
      />
    </span>
  )
}

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
    <header className="fixed top-4 inset-x-0 z-50">
      <div className="container flex items-center justify-between gap-4">
        {/* Left pill: logo + primary nav */}
        <div className={cn('flex items-center gap-7 pl-4 pr-5 py-2.5', pill)}>
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Dragline Developers"
              width={26}
              height={26}
              priority
              className="dark:invert"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {desktopNav.map((item) => (
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
        </div>

        {/* Right: theme toggle + CTA, each their own floating pill */}
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className={cn(
                'hidden sm:inline-flex items-center justify-center h-11 w-11 text-ink-muted hover:text-ink transition-colors',
                pill
              )}
              aria-label="Toggle color theme"
            >
              <ThemeIcon isDark={resolvedTheme === 'dark'} size={17} />
            </button>
          )}
          <Button href="/contact" className="hidden sm:inline-flex shadow-sm">
            Get in Touch
          </Button>
          <button
            type="button"
            className={cn('md:hidden inline-flex items-center justify-center h-11 w-11', pill)}
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
          'md:hidden fixed inset-0 z-40 bg-pure-black/60 transition-opacity duration-300 ease-out-strong',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Slide-in drawer */}
      <div
        id="mobile-nav"
        className={cn(
          'md:hidden fixed inset-y-0 right-0 z-50 w-[82vw] max-w-xs border-l border-line bg-paper transition-transform duration-300 ease-drawer',
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
            className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-line"
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
              <ThemeIcon isDark={resolvedTheme === 'dark'} size={16} />
              {resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          )}
          <Button href="/contact" className="mt-4 w-full">
            Get in Touch
          </Button>
        </div>
      </div>
    </>
  )
}
