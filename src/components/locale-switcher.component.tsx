'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'

export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = () => {
    const next = locale === 'fr' ? 'en' : 'fr'
    router.replace(pathname, { locale: next })
  }

  return (
    <button
      onClick={switchLocale}
      className="border-border hover:bg-tertiary hover:text-bg cursor-pointer border-l px-4 py-4 text-xs font-bold tracking-widest uppercase transition-colors"
    >
      {locale === 'fr' ? 'EN' : 'FR'}
    </button>
  )
}
