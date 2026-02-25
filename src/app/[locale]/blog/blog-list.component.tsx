'use client'

import { Link } from '@/i18n/navigation'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { type BlogPost } from '@/data/blog'

type BlogListProps = {
  posts: BlogPost[]
}

const groupPostsByYear = (posts: BlogPost[]) => {
  const grouped: Record<string, BlogPost[]> = {}
  for (const post of posts) {
    const year = post.date.slice(0, 4)
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(post)
  }
  return Object.entries(grouped).sort(([a], [b]) => b.localeCompare(a))
}

const formatShortDate = (date: string) => date.slice(5)

export const BlogList = ({ posts }: BlogListProps) => {
  const [selectedTags, setSelectedTags] = useQueryState(
    'tags',
    parseAsArrayOf(parseAsString).withDefault([]),
  )

  const allTags = [...new Set(posts.flatMap((post) => post.tags))].sort()

  const filteredPosts =
    selectedTags.length === 0
      ? posts
      : posts.filter((post) =>
          selectedTags.some((tag) => post.tags.includes(tag)),
        )

  const postsByYear = groupPostsByYear(filteredPosts)

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <>
      <div className="border-border flex flex-wrap gap-2 border-b px-8 py-4">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`border-border cursor-pointer border px-3 py-1 text-xs transition-colors ${
              selectedTags.includes(tag)
                ? 'bg-accent text-bg'
                : 'text-muted hover:text-fg'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="mx-auto w-full max-w-2xl px-8 py-10">
        {postsByYear.map(([year, yearPosts]) => (
          <section key={year} className="mb-10">
            <h2 className="border-l-accent text-accent border-border mb-4 border-l-4 py-2 pl-4 text-sm font-bold tracking-widest">
              {year}
            </h2>
            <ul className="space-y-4">
              {yearPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block pl-4"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-fg group-hover:text-accent text-sm transition-colors">
                        {post.title}
                      </h3>
                      <time className="text-muted shrink-0 text-xs">
                        {formatShortDate(post.date)}
                      </time>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-muted text-[10px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
