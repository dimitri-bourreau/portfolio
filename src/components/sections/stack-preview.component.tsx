import { useTranslations } from 'next-intl'

const stack = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Nest.js',
  'Tailwind CSS',
  'Jest',
  'Playwright',
  'TDD',
  'Storybook',
  'Claude Code',
  'Firebase',
]

export function StackPreview() {
  const t = useTranslations('stack')

  return (
    <section className="border-border border-b p-8">
      <h2 className="mb-4 text-xs font-bold tracking-widest uppercase">
        {t('title')}
      </h2>
      <div className="flex flex-wrap gap-1">
        {stack.map((tech) => (
          <span
            key={tech}
            className="border-accent/30 text-accent border px-2 py-0.5 text-xs"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  )
}
