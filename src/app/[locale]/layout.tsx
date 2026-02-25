import { type Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import '@/styles/tailwind.css'
import { Header } from '@/components/header.component'
import { Footer } from '@/components/footer.component'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Dimitri Bourreau',
    default: 'Dimitri Bourreau',
  },
  description: 'Développeur frontend React & Next.js freelance',
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'fr' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${jetbrains.variable} h-full overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-fg grid min-h-screen max-w-[100vw] grid-rows-[auto_1fr_auto] overflow-x-hidden font-mono">
        <NextIntlClientProvider messages={messages}>
          <NuqsAdapter>
            <Header />
            <main>{children}</main>
            <Footer />
          </NuqsAdapter>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
