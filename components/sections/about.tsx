'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'

const platforms = [
  'Instagram', 'TikTok', 'LinkedIn', 'Twitter · X', 'Facebook', 'YouTube',
]

const tools = [
  'Canva Pro', 'Adobe Premiere', 'CapCut', 'Meta Business Suite', 'Later', 'Notion',
]

const skills = [
  { label: 'Estrategia de contenido', pct: 95 },
  { label: 'Community management',   pct: 92 },
  { label: 'Copywriting',            pct: 88 },
  { label: 'Analítica digital',      pct: 80 },
  { label: 'Fotografía & video',     pct: 78 },
]

export default function About() {
  const headerRef = useScrollReveal(0.2)
  const photoRef  = useScrollReveal(0.2)
  const textRef   = useScrollReveal(0.15)

  return (
    <section id="sobre-mi" className="py-28 md:py-36 px-6 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="reveal mb-16"
        >
          <span className="text-xs font-medium text-rose-400 tracking-[0.2em] uppercase">
            02 · Sobre Mí
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            La persona detrás
            <br />
            <span className="gradient-text">del contenido</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">

          {/* Photo column */}
          <div
            ref={photoRef as React.RefObject<HTMLDivElement>}
            className="reveal md:col-span-2 flex flex-col gap-6"
          >
            {/* Avatar placeholder */}
            <div className="relative mx-auto md:mx-0 w-56 h-56 md:w-full md:h-72">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/30 to-violet-600/30 blur-xl" />
              <div className="relative w-full h-full rounded-2xl glass-card flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-violet-600/10" />
                <span className="text-6xl font-bold gradient-text z-10">DG</span>
              </div>
            </div>

            {/* Quick facts */}
            <div className="glass-card rounded-2xl p-5 flex flex-col gap-3">
              {[
                { label: 'Ubicación', value: 'Colombia' },
                { label: 'Idiomas',   value: 'Español · Inglés' },
                { label: 'Enfoque',   value: 'B2C · B2B · Personal Brand' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center text-sm">
                  <span className="text-white/35">{label}</span>
                  <span className="text-white/80 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Text column */}
          <div
            ref={textRef as React.RefObject<HTMLDivElement>}
            className="reveal reveal-delay-2 md:col-span-3 flex flex-col gap-8"
          >
            <div className="space-y-4 text-white/55 leading-relaxed text-base">
              <p>
                Soy comunicadora social con pasión por construir comunidades digitales auténticas.
                Me especializo en entender a las audiencias y traducir esa comprensión en contenido
                que conecta, convierte y fideliza.
              </p>
              <p>
                Trabajo con marcas que quieren ir más allá de los likes —
                marcas que buscan relaciones reales con su comunidad.
              </p>
            </div>

            {/* Skills bars */}
            <div className="space-y-4">
              <p className="text-xs font-medium text-white/30 tracking-[0.15em] uppercase">Habilidades</p>
              {skills.map(({ label, pct }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-white/65">{label}</span>
                    <span className="text-white/30">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 to-violet-600"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Platforms */}
            <div>
              <p className="text-xs font-medium text-white/30 tracking-[0.15em] uppercase mb-3">Plataformas</p>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <span key={p} className="px-3 py-1 rounded-full text-xs glass-card text-white/60">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <p className="text-xs font-medium text-white/30 tracking-[0.15em] uppercase mb-3">Herramientas</p>
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs border border-rose-500/20 text-rose-300/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
