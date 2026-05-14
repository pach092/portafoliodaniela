'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { Briefcase, GraduationCap, Award } from 'lucide-react'

const experience = [
  {
    period: '2022 — Presente',
    role: 'Community Manager Senior',
    place: 'Agencia XYZ',
    desc: 'Gestión integral de comunidades para 8+ marcas simultáneas. Estrategia de contenido, moderación y análisis de métricas.',
  },
  {
    period: '2020 — 2022',
    role: 'Social Media Specialist',
    place: 'Empresa ABC',
    desc: 'Creación de contenido editorial y estrategia de publicidad pagada en Meta e Instagram Ads.',
  },
  {
    period: '2019 — 2020',
    role: 'Coordinadora de Comunicaciones',
    place: 'ONG Impacto Social',
    desc: 'Manejo de relaciones públicas digitales y estrategia de fundraising por redes sociales.',
  },
]

const education = [
  {
    period: '2015 — 2020',
    degree: 'Comunicación Social y Periodismo',
    place: 'Universidad Nacional de Colombia',
    desc: 'Énfasis en medios digitales y comunicación organizacional.',
  },
  {
    period: '2021',
    degree: 'Certificación Meta Business',
    place: 'Meta Blueprint',
    desc: 'Estrategia avanzada de publicidad en plataformas Meta.',
  },
  {
    period: '2023',
    degree: 'Digital Marketing Professional',
    place: 'Google · Coursera',
    desc: 'Marketing digital, SEO, analítica y campañas de performance.',
  },
]

function TimelineItem({
  period,
  title,
  place,
  desc,
  delay = 0,
}: {
  period: string
  title: string
  place: string
  desc: string
  delay?: number
}) {
  const ref = useScrollReveal(0.2)
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn('reveal pl-8 relative', delay > 0 && `reveal-delay-${delay}`)}
    >
      {/* Dot */}
      <span className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-rose-400 to-violet-500 ring-4 ring-[oklch(0.085_0.025_280)]" />

      <p className="text-xs text-white/30 mb-1 font-mono">{period}</p>
      <h4 className="text-base font-semibold text-white leading-tight">{title}</h4>
      <p className="text-sm text-rose-400/80 mb-2">{place}</p>
      <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
    </div>
  )
}

export default function Resume() {
  const headerRef = useScrollReveal(0.2)

  return (
    <section id="hoja-de-vida" className="py-28 md:py-36 px-6 relative">
      {/* bg accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="reveal mb-16"
        >
          <span className="text-xs font-medium text-rose-400 tracking-[0.2em] uppercase">
            03 · Hoja de Vida
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Trayectoria y
            <br />
            <span className="gradient-text">formación</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">

          {/* Experience */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                <Briefcase size={16} className="text-rose-400" />
              </div>
              <h3 className="text-sm font-semibold text-white/70 tracking-wide uppercase">
                Experiencia
              </h3>
            </div>

            <div className="relative flex flex-col gap-8">
              {/* Vertical line */}
              <div className="absolute left-[4px] top-2 bottom-2 w-px bg-gradient-to-b from-rose-500/40 via-violet-500/40 to-transparent" />

              {experience.map((item, i) => (
                <TimelineItem
                  key={item.role}
                  period={item.period}
                  title={item.role}
                  place={item.place}
                  desc={item.desc}
                  delay={i + 1}
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                <GraduationCap size={16} className="text-violet-400" />
              </div>
              <h3 className="text-sm font-semibold text-white/70 tracking-wide uppercase">
                Formación
              </h3>
            </div>

            <div className="relative flex flex-col gap-8">
              <div className="absolute left-[4px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/40 via-fuchsia-500/40 to-transparent" />

              {education.map((item, i) => (
                <TimelineItem
                  key={item.degree}
                  period={item.period}
                  title={item.degree}
                  place={item.place}
                  desc={item.desc}
                  delay={i + 1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Download CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-white/60 hover:text-white text-sm font-medium transition-all duration-300 hover:bg-white/8 border border-white/8 hover:border-white/20"
          >
            <Award size={15} className="text-rose-400" />
            Descargar CV completo
          </a>
        </div>
      </div>
    </section>
  )
}
