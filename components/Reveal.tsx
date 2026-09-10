'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export default function Reveal({
  children,
  delay = 0,
  className,
  id,
}: {
  children: ReactNode
  delay?: number
  className?: string
  id?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '-40px 0px' }
    )
    observer.observe(el)

    // Safety net: content must never stay permanently invisible if the observer
    // doesn't fire (e.g. a paused/backgrounded compositor, an unusual embedding context).
    const fallback = setTimeout(() => setVisible(true), 1800)

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  return (
    <div
      ref={ref}
      id={id}
      className={`transition-[opacity,transform] duration-[400ms] ease-out-strong ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } ${className ?? ''}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
