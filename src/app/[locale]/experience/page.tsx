import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export const metadata: Metadata = { title: 'Expérience' }

type CaseStudy = {
  slug: string
  titleKey: string
}

type Experience = {
  company: string
  period: string
  highlightKey: string
  caseStudies?: CaseStudy[]
}

const experiences: Experience[] = [
  { company: 'Theia', period: '2026', highlightKey: 'theia' },
  { company: 'VISEO', period: '2025', highlightKey: 'viseo' },
  { company: 'Tudigo', period: '2023-2024', highlightKey: 'tudigo' },
  {
    company: 'Artelia',
    period: '2022-2023',
    highlightKey: 'artelia',
    caseStudies: [
      { slug: 'refonte-next-en-6-mois', titleKey: 'artelia_case1' },
      {
        slug: 'comment-j-ai-divise-par-10-les-temps-de-chargement-d-une-app-next',
        titleKey: 'artelia_case2',
      },
    ],
  },
  { company: 'EXA Market', period: '2022', highlightKey: 'exa' },
  { company: 'EU4UA.org', period: '2022', highlightKey: 'eu4ua' },
  { company: 'Sigilium', period: '2021-2022', highlightKey: 'sigilium' },
  { company: 'Scality', period: '2021-2022', highlightKey: 'scality' },
  { company: 'CIDJ', period: '2020-2022', highlightKey: 'cidj' },
  { company: 'Algoan', period: '2020-2021', highlightKey: 'algoan' },
  { company: 'NL Europe', period: '2019-2020', highlightKey: 'nleurope' },
]

const skills: Record<string, string[]> = {
  'front-end': [
    'React.js',
    'Next.js',
    'Vue.js',
    'AngularJS',
    'TailwindCSS',
    'Figma',
  ],
  'back-end': ['Node.js', 'NestJS', 'Symfony', 'API REST'],
  devops: ['GitLab', 'Microsoft Azure'],
}

const methodologySkills = ['TDD', 'Refactoring', 'Architecture hexagonale']

export default async function ExperiencePage() {
  const t = await getTranslations('experience')

  const statKeys = [1, 2, 3, 4] as const

  return (
    <>
      <div className="text-accent border-border border-l-accent flex items-center justify-between border-b border-l-4 px-8 py-6">
        <h1 className="text-lg font-bold tracking-widest uppercase">
          {t('title')}
        </h1>
        <a
          href={t('cvUrl')}
          download
          className="border-border hover:bg-accent hover:text-bg border px-4 py-2 text-xs font-medium transition-colors"
        >
          {t('downloadCv')}
        </a>
      </div>

      <div className="mx-auto w-full max-w-4xl px-8 py-10">
        <section className="mb-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {statKeys.map((n) => (
              <div key={n}>
                <p className="text-accent text-3xl font-bold md:text-4xl">
                  {t(`stat${n}_value`)}
                </p>
                <p className="text-muted mt-1 text-xs">{t(`stat${n}_label`)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-accent mb-6 text-xs font-bold tracking-widest uppercase">
            {t('parcours')}
          </h2>
          <div className="flex flex-col">
            {experiences.map((exp) => (
              <div
                key={`${exp.company}-${exp.period}`}
                className="border-border flex gap-6 border-b py-5"
              >
                <span className="text-muted w-24 shrink-0 text-xs">
                  {exp.period}
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-bold uppercase">{exp.company}</h3>
                  <p className="text-muted mt-1 text-xs">
                    {t(exp.highlightKey)}
                  </p>
                  {exp.caseStudies && exp.caseStudies.length > 0 && (
                    <div className="mt-3 flex flex-col gap-1">
                      {exp.caseStudies.map((caseStudy) => (
                        <Link
                          key={caseStudy.slug}
                          href={`/blog/${caseStudy.slug}`}
                          className="text-accent text-xs hover:underline"
                        >
                          → {t(caseStudy.titleKey)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-accent mb-6 text-xs font-bold tracking-widest uppercase">
            {t('competences')}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="border-border border p-5">
                <h3 className="mb-3 text-sm font-bold uppercase">{category}</h3>
                <div className="flex flex-wrap gap-1">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="border-border border px-2 py-0.5 text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <div className="border-border border p-5">
              <h3 className="mb-3 text-sm font-bold uppercase">
                {t('methodologies')}
              </h3>
              <div className="flex flex-wrap gap-1">
                {methodologySkills.map((item) => (
                  <span
                    key={item}
                    className="border-border border px-2 py-0.5 text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
