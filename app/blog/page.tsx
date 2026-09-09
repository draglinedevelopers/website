import Link from 'next/link'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import PageHero from '@/components/PageHero'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

type Post = {
  slug: string
  title: string
  date: string
  excerpt: string
  readingTime: string
}

function getPosts(): Post[] {
  const dir = path.join(process.cwd(), 'content', 'blog')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug: file.replace(/\.mdx$/, ''),
      title: data.title ?? 'Untitled',
      date: data.date ?? '',
      excerpt: data.excerpt ?? '',
      readingTime: readingTime(content).text
    }
  }).sort((a, b) => (a.date < b.date ? 1 : -1))
}

export const metadata = { title: 'Blog' }

export default function BlogPage() {
  const posts = getPosts()
  return (
    <div>
      <PageHero eyebrow="Blog" title="Insights & updates" />
      <div className="container py-16 md:py-20 grid md:grid-cols-2 gap-5">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group rounded-lg border border-line p-8 hover:border-ink transition-colors"
          >
            <div className="font-mono-label text-ink-muted">{p.date} · {p.readingTime}</div>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div className="font-semibold">{p.title}</div>
              <ArrowUpRight size={18} className="shrink-0 text-ink-muted group-hover:text-ink" />
            </div>
            <p className="mt-2 text-sm text-ink-muted">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
