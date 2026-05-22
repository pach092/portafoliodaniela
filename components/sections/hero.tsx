'use client'

import { ArrowDown, Sparkles } from 'lucide-react'

const stats = [
  { value: '2+',  label: 'Años de experiencia' },
  { value: '3+',  label: 'Marcas gestionadas' },
  { value: '5+',  label: 'Certificaciones' },
]

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-700/15 rounded-full blur-[140px] animate-aurora" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-950/20 rounded-full blur-[140px] animate-aurora-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-400/10 rounded-full blur-[100px] animate-aurora-3" />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-in-down inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-300/25 bg-violet-300/10 text-violet-200 text-xs font-medium tracking-wider uppercase mb-10">
          <Sparkles size={12} />
          Comunicadora Social · Periodista · Community Manager
        </div>

        {/* Name */}
        <h1 className="animate-fade-in-up-1 text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold tracking-tight text-white leading-none mb-4">
          Daniela
          <br />
          <span className="gradient-text">Coronado</span>
        </h1>

        {/* Tagline */}
        <p className="animate-fade-in-up-2 text-base md:text-xl text-white/45 max-w-xl mx-auto leading-relaxed mt-6 mb-12">
          Creo contenido digital que conecta marcas con personas reales.
          <br className="hidden md:block" />
          Storytelling auténtico, estrategia inclusiva, resultados medibles.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            onClick={() => scrollTo('trabajo')}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-violet-400 to-purple-950 text-white text-sm font-semibold hover:scale-105 hover:shadow-xl hover:shadow-purple-900/30 transition-all duration-300"
          >
            Ver mi trabajo
          </button>
          <button
            onClick={() => scrollTo('contacto')}
            className="px-8 py-3 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/35 text-sm font-medium transition-all duration-300 hover:bg-white/5"
          >
            Contáctame
          </button>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up-4 grid grid-cols-3 gap-6 max-w-sm mx-auto">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-white">{value}</p>
              <p className="text-[10px] text-white/35 mt-1 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-[10px] text-white/25 tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} className="text-white/25" />
      </div>
    </section>
  )
}
