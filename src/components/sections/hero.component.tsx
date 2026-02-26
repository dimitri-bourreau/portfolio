import { useTranslations } from 'next-intl'

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="flex flex-col justify-center px-8 pt-16 pb-10 md:px-10 md:pt-20 md:pb-12">
      <h1 className="mb-6 text-4xl font-bold tracking-tight uppercase md:text-5xl">
        {t('title')}
      </h1>
      <p className="text-tertiary mb-4 text-base font-bold">{t('subtitle')}</p>
      <p className="text-muted max-w-md text-sm leading-relaxed">
        {t('description')}
      </p>
    </section>
  )
}
