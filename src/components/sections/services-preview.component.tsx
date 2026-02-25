import { useTranslations } from 'next-intl'

const services = [
  { key: 'refactoring', color: 'bg-secondary' },
  { key: 'mentoring', color: 'bg-tertiary' },
  { key: 'communication', color: 'bg-secondary' },
  { key: 'hexagonal', color: 'bg-tertiary' },
] as const

export function ServicesPreview() {
  const t = useTranslations('services')

  return (
    <section className="px-10">
      <ul className="space-y-2">
        {services.map((s) => (
          <li key={s.key} className="flex items-center gap-2 text-sm">
            <span className={`${s.color} h-1.5 w-1.5`} />
            {t(s.key)}
          </li>
        ))}
      </ul>
    </section>
  )
}
