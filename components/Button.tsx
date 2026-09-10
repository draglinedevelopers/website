import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type CommonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-5 py-2.5 text-sm font-semibold transition-transform duration-150 ease-out-strong active:scale-[0.97]'

const variants = {
  primary: 'bg-accent text-accent-ink hover:brightness-95',
  secondary: 'border border-line text-ink hover:border-ink',
}

export function Button({
  children,
  variant = 'primary',
  className,
  href,
  ...rest
}: CommonProps & { href?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variants[variant], className)
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
