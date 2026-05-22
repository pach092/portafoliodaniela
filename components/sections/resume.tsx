'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { Briefcase, GraduationCap, Award } from 'lucide-react'

const experience = [
  {
    period: 'Feb — Mar 2026',
    role: 'Copywriter · Campaña Política',
    place: 'Campaña Presidencial Imparables · Bogotá',
    desc: 'Redacción de mensajes estratégicos y emocionales para grupos de WhatsApp segmentados por audiencia. Narrativas persuasivas con storytelling político y enfoque ciudadano.',
  },
  {
    period: 'Ago 2025 — Ene 2026',
    role: 'Social Media Manager',
    place: 'Group Coss · Bogotá',
    desc: 'Diseño de piezas visuales para blog informativo enfocado en la comunidad sorda en Colombia. Generación de contenidos accesibles e inclusivos sobre noticias y tendencias del sector.',
  },
  {
    period: 'Mar 2023 — Dic 2024',
    role: 'Gestora de Procesos Formativos y Comunicación',
    place: 'Unidad para las Víctimas Outsourcing SAS · Bogotá',
    desc: 'Diseño de piezas de comunicación interna y externa, edición audiovisual para TikTok, capacitación en gestión de redes sociales y estrategias de endomarketing en el contexto del conflicto armado.',
  },
]

const education = [
  {
    period: '2015 — 2020',
    degree: 'Comunicadora Social · Periodista',
    place: 'Corporación Universitaria Minuto de Dios',
    desc: 'Énfasis en medios digitales, comunicación organizacional y periodismo.',
  },
  {
    period: '2025',
    degree: 'Diplomado Community Management',
    place: 'Politécnico de Colombia',
    desc: 'Estrategia de comunidades digitales, gestión de crisis y analítica de redes sociales.',
  },
  {
    period: '2026',
    degree: 'Social Media & CM Profesional · Escuela de Video con IA',
    place: 'Udemy',
    desc: 'Producción de contenido con inteligencia artificial, gestión profesional de comunidades y video marketing.',
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
      <span className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-violet-300 to-purple-950 ring-4 ring-[oklch(0.085_0.03_305)]" />

      <p className="text-xs text-white/30 mb-1 font-mono">{period}</p>
      <h4 className="text-base font-semibold text-white leading-tight">{title}</h4>
      <p className="text-sm text-violet-300/80 mb-2">{place}</p>
      <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
    </div>
  )
}

export default function Resume() {
  const headerRef = useScrollReveal(0.2)

  return (
    <section id="hoja-de-vida" className="py-28 md:py-36 px-6 relative">
      {/* bg accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="reveal mb-16"
        >
          <span className="text-xs font-medium text-violet-300 tracking-[0.2em] uppercase">
            03 · Hoja de Vida
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Trayectoria y
            <br />
            <span className="gradient-text">formación</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">

          {/* Experience */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 rounded-lg bg-violet-400/10 border border-violet-400/20">
                <Briefcase size={16} className="text-violet-300" />
              </div>
              <h3 className="text-sm font-semibold text-white/70 tracking-wide uppercase">
                Experiencia
              </h3>
            </div>

            <div className="relative flex flex-col gap-8">
              {/* Vertical line */}
              <div className="absolute left-[4px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-400/40 via-purple-800/40 to-transparent" />

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
              <div className="p-2 rounded-lg bg-purple-800/10 border border-purple-800/20">
                <GraduationCap size={16} className="text-purple-400" />
              </div>
              <h3 className="text-sm font-semibold text-white/70 tracking-wide uppercase">
                Formación
              </h3>
            </div>

            <div className="relative flex flex-col gap-8">
              <div className="absolute left-[4px] top-2 bottom-2 w-px bg-gradient-to-b from-purple-800/40 via-purple-900/40 to-transparent" />

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

            {/* Award */}
            <div className="mt-10 glass-card rounded-2xl p-5 border-l-2 border-violet-300/50">
              <p className="text-xs text-violet-300/70 tracking-[0.15em] uppercase mb-1">Reconocimiento · Abril 2022</p>
              <h4 className="text-sm font-semibold text-white mb-1">"Escrituras Vitales Techotiba"</h4>
              <p className="text-xs text-white/40 leading-relaxed">
                Ganadora con el cuento <em>"Los caminos del anhelo"</em>, mejor relato sobre
                territorio en el simposio #TELEO Techotiba.
              </p>
              <a
                href="https://portafoliodaniela.s3.us-east-1.amazonaws.com/historia.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  'inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl',
                  'bg-violet-400/10 border border-violet-400/25 text-violet-200',
                  'text-xs font-medium hover:bg-violet-400/20 hover:border-violet-400/50',
                  'transition-all duration-200 group'
                ].join(' ')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Ver libro
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Download CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href="https://portafoliodaniela.s3.us-east-1.amazonaws.com/CV_Daniela_Coronado.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-white/60 hover:text-white text-sm font-medium transition-all duration-300 hover:bg-white/8 border border-white/8 hover:border-white/20"
          >
            <Award size={15} className="text-violet-300" />
            Descargar CV completo
          </a>
        </div>
      </div>
    </section>
  )
}
