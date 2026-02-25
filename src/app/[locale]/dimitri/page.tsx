import { type Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { PageTitle } from '@/components/page-title.component'

export const metadata: Metadata = { title: 'Dimitri' }

const paragraphKeys = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const

export default async function AProposPage() {
  const t = await getTranslations('dimitri')

  return (
    <>
      <PageTitle>{t('title')}</PageTitle>
      <div className="grid md:grid-cols-[auto_1fr]">
        <div className="border-border border-r border-b p-8 md:p-12">
          <Image
            src="/dimitri.png"
            alt="Dimitri Bourreau"
            width={280}
            height={280}
            className="border-border border"
          />
        </div>
        <div className="border-border border-b p-8 md:p-12">
          <div className="max-w-prose space-y-4">
            {paragraphKeys.map((key) => (
              <p key={key} className="text-sm leading-relaxed">
                {t(key)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
