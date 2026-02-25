import { useTranslations } from 'next-intl'

const milestonePositions = [
  { n: 1, x: 6, y: 88 },
  { n: 2, x: 12, y: 75 },
  { n: 3, x: 20, y: 62 },
  { n: 4, x: 28, y: 50 },
  { n: 5, x: 36, y: 60 },
  { n: 6, x: 44, y: 48 },
  { n: 7, x: 52, y: 38 },
  { n: 8, x: 68, y: 25 },
  { n: 9, x: 78, y: 32 },
  { n: 10, x: 88, y: 18 },
] as const

export function FlightRadar() {
  const t = useTranslations('flightRadar')

  const milestones = milestonePositions.map((pos) => ({
    id: t(`milestone${pos.n}_id`),
    x: pos.x,
    y: pos.y,
    year: t(`milestone${pos.n}_year`),
    desc: t(`milestone${pos.n}_desc`),
  }))

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Grid lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="bg-border/50 absolute right-0 left-0 h-px"
            style={{ top: `${(i + 1) * 5}%` }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="bg-border/50 absolute top-0 bottom-0 w-px"
            style={{ left: `${(i + 1) * 5}%` }}
          />
        ))}
      </div>

      {/* Radar circles - centered with inset-0 + flex */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {[80, 160, 260, 380, 520].map((size) => (
          <div
            key={size}
            className="border-border absolute rounded-full border"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      {/* Radar sweep container - positioned at exact center */}
      <div className="radar-sweep-container pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Sweep trail - circular arc behind the line */}
          <div
            className="absolute rounded-full"
            style={{
              width: '520px',
              height: '520px',
              bottom: '-260px',
              left: '-260px',
              background:
                'conic-gradient(from -50deg at 50% 50%, transparent 0deg, rgba(37, 99, 235, 0.08) 35deg, transparent 50deg)',
            }}
          />
          {/* Sweep line - starts at center, extends upward */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: '2px',
              height: '260px',
              background:
                'linear-gradient(to top, var(--color-accent), transparent)',
            }}
          />
        </div>
      </div>

      {/* Flight paths - milestones path */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        {milestones.slice(0, -1).map((m, i) => {
          const next = milestones[i + 1]
          return (
            <line
              key={`milestone-${m.id}`}
              x1={`${m.x}%`}
              y1={`${m.y}%`}
              x2={`${next.x}%`}
              y2={`${next.y}%`}
              stroke="var(--color-border)"
              strokeWidth="1"
              strokeDasharray="6 4"
            />
          )
        })}
      </svg>

      {/* Milestone blips */}
      {milestones.map((m) => {
        const isNearTop = m.y < 30
        const isNearRight = m.x > 70
        return (
          <div
            key={m.id}
            className="group absolute"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            {/* Ping animation - absolutely centered on this point */}
            <div
              className="blip-ping bg-accent absolute rounded-full"
              style={{
                width: '40px',
                height: '40px',
                left: '-20px',
                top: '-20px',
              }}
            />
            {/* Core dot - centered on the point */}
            <div
              className="bg-accent absolute rounded-full shadow-[0_0_10px_var(--color-accent)]"
              style={{
                width: '10px',
                height: '10px',
                left: '-5px',
                top: '-5px',
              }}
            />
            {/* Label */}
            <div
              className={`absolute -top-1 font-mono text-xs whitespace-nowrap opacity-80 transition-opacity group-hover:opacity-100 ${isNearRight ? 'right-4 text-right' : 'left-4'}`}
            >
              <span className="text-accent font-bold">{m.id}</span>
              <span className="text-muted ml-2">{m.year}</span>
            </div>
            {/* Hover description */}
            <div
              className={`bg-bg/95 text-fg border-border pointer-events-none absolute z-50 w-64 rounded border px-3 py-2 font-mono text-xs leading-relaxed opacity-0 shadow-lg transition-opacity group-hover:opacity-100 ${isNearTop ? 'top-6' : 'bottom-6'} ${isNearRight ? 'right-4' : 'left-4'}`}
            >
              {m.desc}
            </div>
          </div>
        )
      })}

      {/* Corner coordinates */}
      <div className="text-muted absolute top-4 left-4 font-mono text-[11px]">
        <div>LAT 45.1885°N</div>
        <div>LON 5.7245°E</div>
        <div className="text-accent mt-1 font-bold">{t('grenoble')}</div>
      </div>
      <div className="text-muted absolute right-4 bottom-4 text-right font-mono text-[10px]">
        <div>UTC+1</div>
      </div>

      {/* Center crosshair */}
      <div className="pointer-events-none absolute top-1/2 left-1/2">
        <div className="bg-muted absolute h-3 w-px -translate-x-1/2 -translate-y-full" />
        <div className="bg-muted absolute h-3 w-px -translate-x-1/2" />
        <div className="bg-muted absolute h-px w-3 -translate-x-full -translate-y-1/2" />
        <div className="bg-muted absolute h-px w-3 -translate-y-1/2" />
      </div>
    </div>
  )
}
