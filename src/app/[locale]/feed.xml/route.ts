import { getLocale } from 'next-intl/server'
import { getBlogPosts } from '@/data/blog'

const SITE_URL = 'https://dimitribourreau.dev'

export async function GET() {
  const locale = await getLocale()
  const posts = await getBlogPosts(locale)

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid>${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
    </item>`,
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RELEASE - Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Blog de Dimitri Bourreau - Développeur front-end freelance</description>
    <language>fr</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
