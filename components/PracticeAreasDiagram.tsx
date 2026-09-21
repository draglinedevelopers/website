'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { serviceAccent, accentClass, services } from '@/lib/accents'
import Reveal from '@/components/Reveal'

const HUB = { x: 70, y: 220 }
const NODE_X = 880
const NODE_YS = [40, 130, 220, 310, 400]

function curvePath(nodeY: number) {
  const controlX = 475
  const controlY = HUB.y + (nodeY - HUB.y) * 0.15
  return `M ${HUB.x} ${HUB.y} Q ${controlX} ${controlY} ${NODE_X} ${nodeY}`
}

export default function PracticeAreasDiagram() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const paths = pathRefs.current.filter(Boolean) as SVGPathElement[]
      const labels = labelRefs.current.filter(Boolean) as HTMLDivElement[]

      ScrollTrigger.matchMedia({
        // Pinned, scroll-scrubbed line draw: only for wide viewports with motion allowed.
        '(min-width: 900px) and (prefers-reduced-motion: no-preference)': () => {
          gsap.set(paths, { strokeDashoffset: 1 })
          gsap.set(labels, { opacity: 0, y: 8 })

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=700',
              pin: true,
              scrub: 0.5,
            },
          })

          paths.forEach((path, i) => {
            tl.to(path, { strokeDashoffset: 0, duration: 1, ease: 'none' }, i * 0.15)
            tl.to(labels[i], { opacity: 1, y: 0, duration: 0.4, ease: 'none' }, i * 0.15 + 0.6)
          })
        },
        // Mobile / reduced motion: show the finished diagram, no pin, no scrub.
        all: () => {
          gsap.set(paths, { strokeDashoffset: 0 })
          gsap.set(labels, { opacity: 1, y: 0 })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="border-b border-line bg-surface overflow-hidden">
      <div className="container py-16 md:py-20">
        <p className="font-mono-label text-ink-muted">One team, five disciplines</p>
        <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold tracking-tight max-w-xl">
          How our practice areas connect
        </h2>
      </div>

      {/* Mobile: a wide fan diagram doesn't translate to portrait width, so this gets a
          simple stacked list instead of a scaled-down version of the desktop diagram. */}
      <div className="md:hidden container pb-16">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-ink" />
          <span className="font-mono-label text-ink-muted">Dragline</span>
        </div>
        <div className="mt-2 ml-1 border-l border-line pl-6 space-y-4">
          {services.map((s, i) => {
            const a = accentClass[serviceAccent[s.id]]
            return (
              <Reveal key={s.id} delay={i * 60}>
                <Link href={`/services#${s.id}`} className={`flex items-center gap-2 text-ink ${a.hoverTextDirect} transition-colors`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${a.bg}`} />
                  <span className="font-medium">{s.title}</span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>

      <div className="hidden md:block relative w-full aspect-[1000/440] max-w-[1000px] mx-auto">
        <svg viewBox="0 0 1000 440" className="w-full h-full" fill="none">
          <circle cx={HUB.x} cy={HUB.y} r={5} className="fill-ink" />
          <text
            x={HUB.x}
            y={HUB.y - 16}
            textAnchor="middle"
            className="fill-ink font-mono text-[13px] uppercase tracking-[0.1em]"
          >
            Dragline
          </text>

          {NODE_YS.map((y, i) => {
            const s = services[i]
            const a = accentClass[serviceAccent[s.id]]
            return (
              <g key={s.id}>
                <path
                  ref={(el) => { pathRefs.current[i] = el }}
                  d={curvePath(y)}
                  className={a.stroke}
                  strokeWidth={1.5}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                />
                <circle cx={NODE_X} cy={y} r={4} className={a.stroke} fill="currentColor" />
              </g>
            )
          })}
        </svg>

        {/* Labels as HTML (not SVG text) so they use the real card/link styling and stay crisp. */}
        {NODE_YS.map((y, i) => {
          const s = services[i]
          const a = accentClass[serviceAccent[s.id]]
          return (
            <div
              key={s.id}
              ref={(el) => { labelRefs.current[i] = el }}
              className="absolute -translate-y-1/2"
              style={{ left: `${(NODE_X / 1000) * 100}%`, top: `${(y / 440) * 100}%` }}
            >
              <Link
                href={`/services#${s.id}`}
                className={`ml-4 whitespace-nowrap text-sm font-medium text-ink ${a.hoverTextDirect} transition-colors`}
              >
                {s.title}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
