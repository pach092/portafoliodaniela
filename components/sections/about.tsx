'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const platforms = [
  'Instagram', 'TikTok', 'Facebook', 'YouTube', 'WhatsApp', 'LinkedIn',
]

const tools = [
  'Adobe Suite', 'Canva', 'CapCut', 'Meta Business Suite', 'Claude', 'Midjourney',
]

const skills = [
  { label: 'Copywriting & Storytelling', pct: 92 },
  { label: 'Gestión de contenido',       pct: 88 },
  { label: 'Community Management',       pct: 85 },
  { label: 'Diseño de piezas gráficas',  pct: 80 },
  { label: 'Edición audiovisual',        pct: 75 },
]

export default function About() {
  const headerRef = useScrollReveal(0.2)
  const photoRef  = useScrollReveal(0.2)
  const textRef   = useScrollReveal(0.15)

  return (
    <section id="sobre-mi" className="py-28 md:py-36 px-6 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="reveal mb-16"
        >
          <span className="text-xs font-medium text-violet-300 tracking-[0.2em] uppercase">
            02 · Sobre Mí
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            La persona detrás
            <br />
            <span className="gradient-text">del contenido</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-6 md:gap-16 items-start">

          {/* Photo column */}
          <div
            ref={photoRef as React.RefObject<HTMLDivElement>}
            className="reveal md:col-span-2 flex flex-col gap-6"
          >
            {/* Avatar placeholder */}
            <div className="relative mx-auto md:mx-0 w-64 h-72 md:w-full md:h-105">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-400/30 to-purple-950/30 blur-xl" />
              <div className="relative w-full h-full rounded-2xl glass-card flex items-center justify-center overflow-hidden">
                <Image
                  src="/dc.jpeg"
                  alt="Daniela Coronado"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 256px, 100vw"
                />
              </div>
            </div>

            {/* Quick facts */}
            <div className="glass-card rounded-2xl p-5 flex flex-col gap-3">
              {[
                { label: 'Ubicación', value: 'Bogotá, Colombia' },
                { label: 'Idiomas',   value: 'Español · Inglés · LSC' },
                { label: 'Enfoque',   value: 'B2C · Institucional · Campañas' },
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
                Comunicadora Social con dos años de experiencia en la creación y gestión
                de contenidos digitales informativos e inclusivos. Me apasiona mi labor,
                lo que me ha llevado a consolidarme como líder con enfoque creativo en
                storytelling, redacción y copywriting para redes sociales, páginas web y
                campañas institucionales.
              </p>
              <p>
                Cuento con experiencia en la producción de piezas multimedia y en la
                gestión de calendarios de contenido. Identifico tendencias digitales,
                propongo contenidos innovadores y realizo análisis básicos de métricas,
                con el objetivo de conectar de manera asertiva con audiencias académicas
                y sociales.
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
                      className="h-full rounded-full bg-gradient-to-r from-violet-400 to-purple-950"
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
                  <span key={t} className="px-3 py-1 rounded-full text-xs border border-violet-400/20 text-violet-300/70">
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
