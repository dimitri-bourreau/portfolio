import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/page-title.component'

const colors = ['border-l-accent', 'border-l-secondary', 'border-l-tertiary']

const testimonialKeys = [1, 2, 3, 4, 5, 6] as const

export function TestimonialsSection() {
  const t = useTranslations('testimonials')

  return (
    <section className="border-border border-b">
      <SectionTitle>{t('title')}</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {testimonialKeys.map((n, i) => (
          <div
            key={n}
            className="border-border border-r border-b p-6 md:border-b-0"
          >
            <blockquote
              className={`border-l-2 pl-4 ${colors[i % colors.length]}`}
            >
              <p className="mb-2 text-xs leading-relaxed">
                &quot;{t(`quote${n}`)}&quot;
              </p>
              <cite className="text-muted text-xs not-italic">
                {t(`author${n}`)} — {t(`role${n}`)}
              </cite>
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  )
}
