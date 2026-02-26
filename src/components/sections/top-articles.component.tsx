import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const topArticles = [
  { key: 'article1', slug: 'architecture-hexagonale-retour-d-experience' },
  { key: 'article2', slug: 'refonte-next-en-6-mois' },
  {
    key: 'article3',
    slug: 'comment-j-ai-divise-par-10-les-temps-de-chargement-d-une-app-next',
  },
] as const

export function TopArticles() {
  const t = useTranslations('topArticles')

  return (
    <section className="p-10">
      <h2 className="mb-3 text-xs font-bold tracking-widest uppercase">
        {t('title')}
      </h2>
      <div className="flex gap-2">
        {topArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="border-border hover:bg-tertiary hover:text-bg border px-3 py-2 text-xs transition-colors"
          >
            {t(article.key)}
          </Link>
        ))}
      </div>
    </section>
  )
}
