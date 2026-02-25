import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { SectionTitle } from '@/components/page-title.component'

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
  'front-end': ['React.js', 'Next.js', 'AngularJS', 'TailwindCSS', 'Figma'],
  'back-end': ['Node.js', 'NestJS', 'API REST'],
  devops: ['GitLab', 'Microsoft Azure'],
}

const methodologySkills = ['TDD', 'Refactoring', 'Architecture hexagonale']

export default async function ExperiencePage() {
  const t = await getTranslations('experience')

  const statKeys = [1, 2, 3, 4] as const

  return (
    <>
      <section className="border-border border-b">
        <div className="flex items-center justify-between">
          <SectionTitle className="border-b-0">{t('title')}</SectionTitle>
          <a
            href={t('cvUrl')}
            download
            className="border-border hover:bg-accent hover:text-bg mr-8 border px-4 py-2 text-xs font-medium transition-colors"
          >
            {t('downloadCv')}
          </a>
        </div>
        <div className="border-border border-b" />
        <div className="flex flex-wrap">
          {statKeys.map((n, index) => (
            <div
              key={n}
              className={`border-border w-1/2 p-6 md:w-1/4 md:p-8 ${index === 0 || index === 2 ? 'border-r' : ''} ${index === 1 ? 'md:border-r' : ''}`}
            >
              <p className="text-accent text-3xl font-bold md:text-4xl">
                {t(`stat${n}_value`)}
              </p>
              <p className="text-muted mt-1 text-xs">{t(`stat${n}_label`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-border border-b">
        <SectionTitle>{t('parcours')}</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.period}`}
              className="border-border flex flex-col gap-3 border-r border-b p-6"
            >
              <div className="flex items-center gap-4">
                <span className="text-muted w-20 shrink-0 text-xs">
                  {exp.period}
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-bold uppercase">{exp.company}</h3>
                  <p className="text-muted text-xs">{t(exp.highlightKey)}</p>
                </div>
              </div>
              {exp.caseStudies && exp.caseStudies.length > 0 && (
                <div className="border-border mt-2 border-t pt-3">
                  <p className="text-muted mb-2 text-[10px] font-bold tracking-wider uppercase">
                    {t('caseStudies')}
                  </p>
                  <div className="flex flex-col gap-1">
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
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>{t('competences')}</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="border-border border-r border-b p-8">
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
          <div className="border-border border-r border-b p-8">
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
    </>
  )
}
