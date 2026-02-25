import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { MobileNav } from './mobile-nav.component'
import { LocaleSwitcher } from './locale-switcher.component'

const navKeys = [
  { key: 'home', href: '/' },
  { key: 'dimitri', href: '/dimitri' },
  { key: 'experience', href: '/experience' },
  { key: 'projects', href: '/projets' },
  { key: 'blog', href: '/blog' },
  { key: 'resources', href: '/ressources' },
  { key: 'contact', href: '/contact' },
] as const

export function Header() {
  const t = useTranslations('nav')

  return (
    <header className="border-border relative flex items-center border-y">
      <Link
        href="/"
        className="border-border border-r px-6 py-4 text-sm font-bold tracking-widest uppercase"
      >
        DIMITRI BOURREAU
      </Link>
      <MobileNav />
      <nav className="hidden overflow-hidden md:flex">
        {navKeys.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border-border hover:bg-accent hover:text-bg cursor-pointer border-r px-3 py-4 text-xs tracking-wider uppercase transition-colors lg:px-5"
          >
            {t(item.key)}
          </Link>
        ))}
      </nav>
      <div className="ml-auto hidden md:block">
        <LocaleSwitcher />
      </div>
    </header>
  )
}
