import fs from 'fs'
import path from 'path'
import { type Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { getBlogPosts } from '@/data/blog'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const locale = await getLocale()
  const posts = await getBlogPosts(locale)
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return { title: post.title }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale()
  const posts = await getBlogPosts(locale)
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  // Check if localized MDX file has content, fallback to French
  let useLocale = locale
  if (locale === 'en') {
    const enPath = path.join(process.cwd(), 'src/blog', slug, 'page.en.mdx')
    const hasEnContent = fs.existsSync(enPath) && fs.statSync(enPath).size > 0
    if (!hasEnContent) useLocale = 'fr'
  }

  const mod = await import(`@/blog/${slug}/page.${useLocale}.mdx`)
  const Content = mod.default

  return (
    <>
      <header className="text-accent border-border border-l-tertiary border-b border-l-4 px-8 py-6">
        <h1 className="text-lg font-bold tracking-widest uppercase">
          {post.title}
        </h1>
        <time className="text-muted mt-1 block text-xs">{post.date}</time>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tags=${encodeURIComponent(tag)}`}
                className="border-border hover:bg-tertiary hover:text-bg border px-3 py-1 text-xs transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>
      <div className="blog-gradient relative flex justify-center overflow-x-hidden">
        <article className="bg-bg prose prose-sm prose-pre:text-base w-full max-w-prose p-8 md:p-12">
          <Content />
        </article>
      </div>
    </>
  )
}
