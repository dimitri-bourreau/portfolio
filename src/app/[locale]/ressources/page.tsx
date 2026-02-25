import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = { title: 'Ressources' }

type Item = {
  title?: string
  titleKey?: string
  url: string
  desc?: string
  descKey?: string
}

const courses: Item[] = [
  {
    title: 'Frontend Masters',
    url: 'https://frontendmasters.com',
    descKey: 'frontendmasters_desc',
  },
  {
    title: 'Execute Program',
    url: 'https://www.executeprogram.com',
    descKey: 'executeprogram_desc',
  },
  {
    title: 'Three.js Journey',
    url: 'https://threejs-journey.com',
    descKey: 'threejs_desc',
  },
]

const videos: Item[] = [
  {
    title: 'BastiUi',
    url: 'https://www.youtube.com/@BastiUi',
    descKey: 'bastiui_desc',
  },
  {
    title: 'CodeAesthetic',
    url: 'https://www.youtube.com/@CodeAesthetic',
    descKey: 'codeaesthetic_desc',
  },
  {
    title: 'CodeTV',
    url: 'https://www.youtube.com/@codetv-dev',
    descKey: 'codetv_desc',
  },
  {
    title: 'cultrepo',
    url: 'https://www.youtube.com/@cultrepo',
    descKey: 'cultrepo_desc',
  },
  {
    title: 'Delba',
    url: 'https://www.youtube.com/@Delba',
    descKey: 'delba_desc',
  },
  {
    title: 'Deus Ex Silicium',
    url: 'https://www.youtube.com/@dexsilicium',
    descKey: 'deusex_desc',
  },
  {
    title: 'NetflixEngineering',
    url: 'https://www.youtube.com/@NetflixEngineering',
    descKey: 'netflix_desc',
  },
  {
    title: 'Theo - t3.gg',
    url: 'https://www.youtube.com/@t3dotgg',
    descKey: 'theo_desc',
  },
  {
    title: 'yrougy',
    url: 'https://www.youtube.com/@yrougy',
    descKey: 'yrougy_desc',
  },
]

const books: Item[] = [
  {
    titleKey: 'cleancode_title',
    url: 'https://amzn.eu/d/022zSEqr',
    descKey: 'cleancode_desc',
  },
  {
    titleKey: 'sleep_title',
    url: 'https://www.amazon.fr/dp/B07GQBSSZF',
    descKey: 'sleep_desc',
  },
  {
    title: 'Slack',
    url: 'https://amzn.eu/d/00hYRaZR',
    desc: 'Getting Past Burnout, Busywork, and the Myth of Total Efficiency.',
  },
  {
    title: 'The Laws of Simplicity',
    url: 'https://amzn.eu/d/0aHotSAa',
    desc: 'John Maeda.',
  },
  {
    title: 'The Pragmatic Programmer',
    url: 'https://amzn.eu/d/0gG0YxwC',
    desc: 'Your Journey to Mastery.',
  },
  {
    title: 'The Software Craftsman',
    url: 'https://amzn.eu/d/0ceOdvMT',
    desc: 'Professionalism, Pragmatism, Pride.',
  },
  {
    title: "You Don't Know JS",
    url: 'https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/README.md',
    desc: '1st edition — Kyle Simpson.',
  },
  {
    title: "You Don't Know JS Yet",
    url: 'https://github.com/getify/You-Dont-Know-JS',
    desc: '2nd edition — Kyle Simpson.',
  },
]

function ResourceSection({
  sectionTitle,
  items,
  t,
}: {
  sectionTitle: string
  items: Item[]
  t: (key: string) => string
}) {
  return (
    <section className="mb-10">
      <h2 className="text-accent mb-4 text-xs font-bold tracking-widest uppercase">
        {sectionTitle}
      </h2>
      <div className="flex flex-col">
        {items.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border hover:bg-accent hover:text-bg group flex gap-6 border-b px-4 py-4 transition-colors"
          >
            <h3 className="w-48 shrink-0 text-sm font-bold uppercase">
              {item.titleKey ? t(item.titleKey) : item.title}
            </h3>
            <p className="text-muted group-hover:text-bg text-xs leading-relaxed">
              {item.descKey ? t(item.descKey) : item.desc}
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}

export default async function RessourcesPage() {
  const t = await getTranslations('resources')

  return (
    <>
      <div className="text-accent border-border border-l-accent flex items-center justify-between border-b border-l-4 px-8 py-6">
        <h1 className="text-lg font-bold tracking-widest uppercase">
          {t('title')}
        </h1>
      </div>
      <div className="mx-auto w-full max-w-4xl px-8 py-10">
        <ResourceSection sectionTitle={t('courses')} items={courses} t={t} />
        <ResourceSection sectionTitle={t('videos')} items={videos} t={t} />
        <ResourceSection sectionTitle={t('books')} items={books} t={t} />
      </div>
    </>
  )
}
