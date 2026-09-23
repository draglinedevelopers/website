import fs from 'node:fs'
import path from 'node:path'
import type { MetadataRoute } from 'next'
import { site } from '@/lib/metadata'
import { cases } from '@/lib/work'

function blogSlugs() {
  const dir = path.join(process.cwd(), 'content', 'blog')
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/services',
    '/work',
    '/about',
    '/careers',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
  ]

  const workRoutes = cases.map((c) => `/work/${c.slug}`)
  const blogRoutes = blogSlugs().map((slug) => `/blog/${slug}`)

  const routes = [...staticRoutes, ...workRoutes, ...blogRoutes]

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }))
}
