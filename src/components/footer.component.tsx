import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const externalLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dimitri-bourreau/' },
  { label: 'Malt', href: 'https://www.malt.fr/profile/dimitribourreau' },
  { label: 'GitHub', href: 'https://github.com/dimitri-bourreau' },
  {
    label: 'hello@dimitribourreau.dev',
    href: 'mailto:hello@dimitribourreau.dev',
  },
]

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-border flex flex-col border-y md:flex-row md:items-center">
      <div className="flex flex-col md:flex-row">
        {externalLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="border-border hover:bg-tertiary hover:text-bg border-b px-4 py-3 text-xs tracking-wider uppercase transition-colors md:border-r md:border-b-0"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="text-muted flex flex-wrap items-center justify-center gap-4 px-4 py-3 text-xs md:ml-auto">
        <Link href="/cgv" className="hover:text-fg transition-colors">
          {t('cgv')}
        </Link>
        <Link
          href="/mentions-legales"
          className="hover:text-fg transition-colors"
        >
          {t('legal')}
        </Link>
        <span>© 2026 Dimitri Bourreau</span>
      </div>
    </footer>
  )
}
