import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { PageTitle } from '@/components/page-title.component'

export const metadata: Metadata = { title: 'Conditions Générales de Vente' }

const sectionKeys = [
  { titleKey: 'intro_title', contentKey: 'intro_content' },
  { titleKey: 'art1_title', contentKey: 'art1_content' },
  { titleKey: 'art2_title', contentKey: 'art2_content' },
  { titleKey: 'art3_title', contentKey: 'art3_content' },
  { titleKey: 'art4_title', contentKey: 'art4_content' },
  { titleKey: 'art5_title', contentKey: 'art5_content' },
  { titleKey: 'art6_title', contentKey: 'art6_content' },
  { titleKey: 'art7_title', contentKey: 'art7_content' },
  { titleKey: 'art8_title', contentKey: 'art8_content' },
  { titleKey: 'art9_title', contentKey: 'art9_content' },
  { titleKey: 'art10_title', contentKey: 'art10_content' },
  { titleKey: 'art11_title', contentKey: 'art11_content' },
  { titleKey: 'art12_title', contentKey: 'art12_content' },
  { titleKey: 'art13_title', contentKey: 'art13_content' },
  { titleKey: 'art14_title', contentKey: 'art14_content' },
  { titleKey: 'art15_title', contentKey: 'art15_content' },
  { titleKey: 'art16_title', contentKey: 'art16_content' },
  { titleKey: 'art17_title', contentKey: 'art17_content' },
  { titleKey: 'art18_title', contentKey: 'art18_content' },
  { titleKey: 'art19_title', contentKey: 'art19_content' },
] as const

export default async function CGVPage() {
  const t = await getTranslations('cgv')

  return (
    <>
      <PageTitle>{t('title')}</PageTitle>
      <div className="space-y-6 p-8 md:p-12">
        {sectionKeys.map((s) => (
          <div key={s.titleKey}>
            <h2 className="mb-2 text-sm font-bold uppercase">
              {t(s.titleKey)}
            </h2>
            <p className="text-muted text-xs leading-relaxed">
              {t(s.contentKey)}
            </p>
          </div>
        ))}
        <p className="text-muted text-xs">{t('lastUpdate')}</p>
      </div>
    </>
  )
}
