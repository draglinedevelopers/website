import Image from 'next/image'
import { Button } from './Button'

export default function Hero() {
  return (
    <section className="border-b border-line">
      <div className="container grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14 items-center pt-14 pb-16 md:pt-20 md:pb-20">
        <div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            We build the technology businesses run on.
          </h1>
          <p className="mt-6 text-lg text-ink-muted max-w-xl">
            Dragline is a technology company that designs, builds, and automates the digital
            infrastructure behind growing businesses, from product to payments to AI.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/work">See Our Work</Button>
            <Button href="/contact" variant="secondary">Get In Touch</Button>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-line">
          <Image
            src="https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=1600&q=80"
            alt="Minimal abstract composition of floating geometric cubes with glowing yellow spheres"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
}
