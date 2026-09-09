import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import PageHero from '@/components/PageHero'

export function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content', 'blog')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  return files.map(f => ({ slug: f.replace(/\.mdx$/, '') }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const file = path.join(process.cwd(), 'content', 'blog', params.slug + '.mdx')
  if (!fs.existsSync(file)) return notFound()
  const raw = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(raw)
  return (
    <div>
      <PageHero eyebrow={data.date} title={data.title} />
      <div className="container py-16 md:py-20 max-w-2xl">
        {/* MDX rendering is not wired in this starter; content is shown as-is. */}
        <pre className="whitespace-pre-wrap font-sans text-ink-muted leading-relaxed">{content}</pre>
      </div>
    </div>
  )
}
