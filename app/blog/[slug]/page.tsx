import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { notFound } from 'next/navigation'
import PageHero from '@/components/PageHero'

export function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content', 'blog')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  return files.map(f => ({ slug: f.replace(/\.mdx$/, '') }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const file = path.join(process.cwd(), 'content', 'blog', params.slug + '.mdx')
  if (!fs.existsSync(file)) return {}
  const { data } = matter(fs.readFileSync(file, 'utf-8'))
  return { title: data.title, description: data.excerpt }
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
        <div className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
