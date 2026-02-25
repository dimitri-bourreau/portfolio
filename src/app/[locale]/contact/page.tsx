import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ContactForm } from '@/components/contact-form.component'

export const metadata: Metadata = { title: 'Contact' }

export default async function ContactPage() {
  const t = await getTranslations('contact')

  return (
    <div className="border-border grid border-b md:grid-cols-[1fr_1fr]">
      <section className="border-border border-r p-8 md:p-12">
        <h1 className="mb-4 text-2xl font-bold tracking-tight uppercase md:text-4xl">
          {t('title')}
        </h1>
        <ContactForm />
      </section>

      <section className="flex flex-col">
        <a
          href="mailto:hello@dimitribourreau.dev"
          className="border-border hover:bg-accent hover:text-bg group flex-1 cursor-pointer border-b p-8 transition-colors"
        >
          <h2 className="mb-2 text-sm font-bold uppercase">
            {t('emailLabel')}
          </h2>
          <p className="text-muted group-hover:text-bg text-xs leading-relaxed">
            {t('emailDesc')}
          </p>
        </a>
        <a
          href="https://www.linkedin.com/in/dimitri-bourreau/"
          className="border-border hover:bg-accent hover:text-bg group flex-1 cursor-pointer border-b p-8 transition-colors"
        >
          <h2 className="mb-2 text-sm font-bold uppercase">LinkedIn</h2>
          <p className="text-muted group-hover:text-bg text-xs leading-relaxed">
            {t('linkedinDesc')}
          </p>
        </a>
        <a
          href="https://www.malt.fr/profile/dimitribourreau"
          className="border-border hover:bg-accent hover:text-bg group flex-1 cursor-pointer p-8 transition-colors"
        >
          <h2 className="mb-2 text-sm font-bold uppercase">Malt</h2>
          <p className="text-muted group-hover:text-bg text-xs leading-relaxed">
            {t('maltDesc')}
          </p>
        </a>
      </section>
    </div>
  )
}
