import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/page-title.component'

const differentiators = [
  {
    titleKey: 'hexagonal_title',
    descKey: 'hexagonal_desc',
    color: 'border-l-accent',
  },
  {
    titleKey: 'legacy_title',
    descKey: 'legacy_desc',
    color: 'border-l-secondary',
  },
  {
    titleKey: 'mentoring_title',
    descKey: 'mentoring_desc',
    color: 'border-l-tertiary',
  },
  {
    titleKey: 'documentation_title',
    descKey: 'documentation_desc',
    color: 'border-l-accent',
  },
] as const

export function ApproachSection() {
  const t = useTranslations('approach')

  return (
    <section>
      <SectionTitle>{t('title')}</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-4">
        {differentiators.map((a) => (
          <div
            key={a.titleKey}
            className={`border-border border-r border-b border-l-4 ${a.color} p-6`}
          >
            <h3 className="mb-2 text-sm font-bold uppercase">
              {t(a.titleKey)}
            </h3>
            <p className="text-muted text-xs leading-relaxed">{t(a.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
