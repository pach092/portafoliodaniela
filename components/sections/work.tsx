'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { Camera, Briefcase, Globe, BarChart3, Clapperboard, ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Campaña de Verano',
    category: 'Social Media',
    platform: 'Instagram',
    icon: Camera,
    metric: '+340% alcance',
    desc: 'Estrategia de contenido estacional con alto impacto visual y engagement sostenido.',
    size: 'large',
    gradient: 'from-rose-500/20 to-pink-600/20',
    accent: 'text-rose-400',
    border: 'hover:border-rose-500/30',
  },
  {
    id: 2,
    title: 'Posicionamiento de Marca',
    category: 'LinkedIn B2B',
    platform: 'LinkedIn',
    icon: Briefcase,
    metric: '+180% engagement',
    desc: 'Construcción de autoridad en sector corporativo.',
    size: 'normal',
    gradient: 'from-blue-500/15 to-cyan-500/15',
    accent: 'text-blue-400',
    border: 'hover:border-blue-500/30',
  },
  {
    id: 3,
    title: 'Lanzamiento de Marca',
    category: 'Branding Digital',
    platform: 'Multi-plataforma',
    icon: Globe,
    metric: '10K nuevos seguidores',
    desc: 'Identidad digital desde cero en 60 días.',
    size: 'normal',
    gradient: 'from-violet-500/15 to-purple-600/15',
    accent: 'text-violet-400',
    border: 'hover:border-violet-500/30',
  },
  {
    id: 4,
    title: 'Contenido Editorial',
    category: 'Producción Visual',
    platform: 'Instagram · TikTok',
    icon: Clapperboard,
    metric: '95% satisfacción',
    desc: 'Dirección creativa y producción de contenido visual para redes.',
    size: 'normal',
    gradient: 'from-emerald-500/15 to-teal-500/15',
    accent: 'text-emerald-400',
    border: 'hover:border-emerald-500/30',
  },
  {
    id: 5,
    title: 'Análisis de Comunidad',
    category: 'Analytics & Estrategia',
    platform: 'Dashboard propio',
    icon: BarChart3,
    metric: '+250% retención',
    desc: 'Implementación de métricas clave y optimización de KPIs para comunidades de 30K+ miembros con reportes quincenales.',
    size: 'wide',
    gradient: 'from-amber-500/15 to-orange-500/15',
    accent: 'text-amber-400',
    border: 'hover:border-amber-500/30',
  },
]

export default function Work() {
  const headerRef = useScrollReveal(0.2)
  const gridRef   = useScrollReveal(0.05)

  return (
    <section id="trabajo" className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">

        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="reveal mb-16"
        >
          <span className="text-xs font-medium text-rose-400 tracking-[0.2em] uppercase">
            01 · Mi Trabajo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Proyectos que
            <br />
            <span className="gradient-text">hablan por sí solos</span>
          </h2>
        </div>

        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="reveal grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] gap-4"
        >
          {projects.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.id}
                className={cn(
                  'glass-card rounded-2xl p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300',
                  p.border,
                  p.size === 'large' && 'md:col-span-2 md:row-span-2',
                  p.size === 'wide'  && 'md:col-span-2'
                )}
              >
                <div className="flex items-start justify-between">
                  <div className={cn('p-2.5 rounded-xl bg-linear-to-br', p.gradient)}>
                    <Icon size={18} className={p.accent} />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  />
                </div>

                <div>
                  <p className={cn('text-xs font-medium tracking-wide mb-2', p.accent)}>
                    {p.category}
                  </p>
                  <h3 className={cn(
                    'font-bold text-white mb-2',
                    p.size === 'large' ? 'text-2xl md:text-3xl' : 'text-lg'
                  )}>
                    {p.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
                    {p.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className={cn(
                      'text-xs font-semibold px-3 py-1 rounded-full bg-linear-to-r',
                      p.gradient,
                      p.accent
                    )}>
                      {p.metric}
                    </span>
                    <span className="text-xs text-white/25">{p.platform}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
