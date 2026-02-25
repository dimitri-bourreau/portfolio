import { HeroSection } from '@/components/sections/hero.component'
import { ServicesPreview } from '@/components/sections/services-preview.component'
import { TopArticles } from '@/components/sections/top-articles.component'
import { FlightRadar } from '@/components/flight-radar.component'

export default function Home() {
  return (
    <div className="grid h-full md:grid-cols-[1fr_2fr]">
      <div className="border-border flex flex-col justify-between border-r">
        <div>
          <HeroSection />
          <ServicesPreview />
        </div>
        <TopArticles />
      </div>
      <div className="hidden md:block">
        <FlightRadar />
      </div>
    </div>
  )
}
