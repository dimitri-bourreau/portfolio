'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
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

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const t = useTranslations('nav')

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="border-border hover:bg-accent hover:text-bg border-r px-4 py-4 text-xs tracking-widest uppercase transition-colors md:hidden"
      >
        {open ? t('close') : t('menu')}
      </button>
      <div className="ml-auto md:hidden">
        <LocaleSwitcher />
      </div>
      {open && (
        <nav className="border-border bg-bg absolute top-full left-0 z-50 w-full border-b md:hidden">
          {navKeys.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-border hover:bg-accent hover:text-bg block border-b px-6 py-4 text-xs tracking-wider uppercase transition-colors"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      )}
    </>
  )
}
