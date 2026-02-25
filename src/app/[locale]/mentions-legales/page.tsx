import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { PageTitle } from '@/components/page-title.component'

export const metadata: Metadata = { title: 'Mentions légales' }

const sectionKeys = [
  { titleKey: 's1_title', contentKey: 's1_content' },
  { titleKey: 's2_title', contentKey: 's2_content' },
  { titleKey: 's3_title', contentKey: 's3_content' },
  { titleKey: 's4_title', contentKey: 's4_content' },
  { titleKey: 's5_title', contentKey: 's5_content' },
  { titleKey: 's6_title', contentKey: 's6_content' },
  { titleKey: 's7_title', contentKey: 's7_content' },
  { titleKey: 's8_title', contentKey: 's8_content' },
] as const

export default async function MentionsLegalesPage() {
  const t = await getTranslations('legal')

  return (
    <>
      <PageTitle>{t('title')}</PageTitle>
      <div className="space-y-6 p-8 md:p-12">
        {sectionKeys.map((s) => (
          <div key={s.titleKey}>
            <h2 className="mb-2 text-sm font-bold uppercase">
              {t(s.titleKey)}
            </h2>
            <p className="text-muted text-xs leading-relaxed whitespace-pre-line">
              {t(s.contentKey)}
            </p>
          </div>
        ))}
        <p className="text-muted text-xs">{t('lastUpdate')}</p>
      </div>
    </>
  )
}
