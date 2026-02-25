import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="flex flex-col justify-center p-8 md:p-10">
      <div className="mb-8 flex items-center gap-2">
        <span className="bg-accent h-2 w-2" />
        <span className="text-xs tracking-widest uppercase">
          {t('available')}
        </span>
      </div>
      <h1 className="mb-4 text-4xl font-bold tracking-tight uppercase md:text-5xl">
        {t('title')}
      </h1>
      <p className="text-accent mb-3 text-base font-bold">{t('subtitle')}</p>
      <p className="text-muted max-w-md text-sm">{t('description')}</p>
      <p className="text-muted mt-6 text-xs">{t('location')}</p>
      <Link
        href="/contact"
        className="bg-accent text-bg hover:bg-fg mt-8 inline-block px-6 py-3 text-sm font-bold tracking-wider uppercase transition-colors"
      >
        {t('cta')}
      </Link>
    </section>
  )
}
