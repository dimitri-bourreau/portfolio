import fs from 'fs'
import path from 'path'

export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

type BlogMeta = {
  date: string
  fr: { title: string; excerpt: string; tags: string[] }
  en: { title: string; excerpt: string; tags: string[] }
}

const BLOG_DIR = path.join(process.cwd(), 'src/blog')

export async function getBlogPosts(locale: string = 'fr'): Promise<BlogPost[]> {
  const slugs = fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  const posts: BlogPost[] = []

  for (const slug of slugs) {
    const filePath = path.join(BLOG_DIR, slug, 'meta.json')
    const raw = fs.readFileSync(filePath, 'utf-8')
    const meta = JSON.parse(raw) as BlogMeta
    const localized = meta[locale as 'fr' | 'en'] ?? meta.fr
    posts.push({
      slug,
      date: meta.date,
      title: localized.title,
      excerpt: localized.excerpt,
      tags: localized.tags,
    })
  }

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}
