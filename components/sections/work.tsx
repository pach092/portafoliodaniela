'use client'

import Link from 'next/link'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { Briefcase, Globe, Bus, ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: 2,
    title: 'Signos en red · Group Coss',
    category: 'Social Media',
    platform: 'Instagram · Facebook · TikTok · X',
    icon: Globe,
    desc: 'Reconocimiento de marca y comunicación de eventos para una comunidad digital enfocada en la inclusión de la población sorda en Colombia. Gestión integral de redes sociales con contenido accesible e informativo.',
    size: 'large',
    gradient: 'from-violet-500/20 to-purple-600/20',
    accent: 'text-violet-400',
    border: 'hover:border-violet-500/30',
    href: '/signos-en-red',
  },
  {
    id: 3,
    title: 'Unidad para las Víctimas',
    category: 'Endomarketing',
    platform: 'WhatsApp · Interno',
    icon: Briefcase,
    desc: 'Capacitaciones sobre atención a usuarios por WhatsApp, creación de contenido informativo interno y producción de videos para redes sociales institucionales.',
    size: 'normal',
    gradient: 'from-emerald-500/15 to-teal-500/15',
    accent: 'text-emerald-400',
    border: 'hover:border-emerald-500/30',
    href: '/unidad-victimas',
  },
  {
    id: 4,
    title: 'Este es mi Bus',
    category: 'Endomarketing',
    platform: 'Periódico interno',
    icon: Bus,
    desc: 'Producción de contenido editorial para periódico corporativo con información de eventos, novedades y noticias de interés de la compañía.',
    size: 'normal',
    gradient: 'from-amber-500/15 to-orange-500/15',
    accent: 'text-amber-400',
    border: 'hover:border-amber-500/30',
    href: '/este-es-mi-bus',
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
          <span className="text-xs font-medium text-violet-300 tracking-[0.2em] uppercase">
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
            const cardClass = cn(
              'glass-card rounded-2xl p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300',
              p.border,
              p.size === 'large' && 'md:col-span-2 md:row-span-2',
              p.size === 'tall'  && 'md:row-span-2',
              p.size === 'wide'  && 'md:col-span-2'
            )
            const inner = (
              <>
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
                  <p className={cn(
                    'text-white/40 text-sm leading-relaxed',
                    (p.size === 'large' || p.size === 'tall') ? 'line-clamp-4' : 'line-clamp-2'
                  )}>
                    {p.desc}
                  </p>
                  <div className="mt-4">
                    <span className="text-xs text-white/25">{p.platform}</span>
                  </div>
                </div>
              </>
            )
            return p.href ? (
              <Link key={p.id} href={p.href} className={cardClass}>
                {inner}
              </Link>
            ) : (
              <div key={p.id} className={cardClass}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
