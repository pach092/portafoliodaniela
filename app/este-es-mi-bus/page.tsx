'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ExternalLink, FileText, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const editions = [
  { id: '3',  label: 'Edición 3',  url: 'https://portafoliodaniela.s3.us-east-1.amazonaws.com/3.pdf' },
  { id: '4',  label: 'Edición 4',  url: 'https://portafoliodaniela.s3.us-east-1.amazonaws.com/4.pdf' },
  { id: '5',  label: 'Edición 5',  url: 'https://portafoliodaniela.s3.us-east-1.amazonaws.com/5.pdf' },
  { id: '8',  label: 'Edición 8',  url: 'https://portafoliodaniela.s3.us-east-1.amazonaws.com/8.pdf' },
  { id: '11', label: 'Edición 11', url: 'https://portafoliodaniela.s3.us-east-1.amazonaws.com/11.pdf' },
  { id: '12', label: 'Edición 12', url: 'https://portafoliodaniela.s3.us-east-1.amazonaws.com/12.pdf' },
]

export default function EsteEsMiBus() {
  const [active, setActive] = useState<string | null>(null)
  const activeEdition = editions.find((e) => e.id === active)

  return (
    <main className="min-h-screen bg-[oklch(0.085_0.03_305)] px-6 py-12">
      {/* Aurora accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-150 h-150 bg-violet-400/6 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-purple-900/8 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Back */}
        <Link
          href="/#trabajo"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm font-medium transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Volver al portafolio
        </Link>

        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-medium text-violet-300 tracking-[0.2em] uppercase">
            Endomarketing · Periódico interno
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Este es mi Bus
          </h1>
          <p className="text-white/40 mt-4 max-w-xl text-base leading-relaxed">
            Publicación interna corporativa con información de eventos, novedades y noticias de interés para la compañía.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {editions.map((edition) => (
            <div
              key={edition.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group hover:border-violet-500/30 transition-all duration-300"
            >
              {/* PDF preview */}
              <div
                className="relative bg-white/3 cursor-pointer"
                style={{ height: '340px' }}
                onClick={() => setActive(edition.id)}
              >
                <iframe
                  src={edition.url}
                  className="w-full h-full border-0"
                  title={edition.label}
                />
                {/* Overlay on hover */}
                <div className={[
                  'absolute inset-0 bg-[oklch(0.085_0.03_305)]/0',
                  'group-hover:bg-[oklch(0.085_0.03_305)]/40',
                  'transition-all duration-300 flex items-center justify-center'
                ].join(' ')}>
                  <span className={[
                    'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                    'flex items-center gap-2 px-4 py-2 rounded-full',
                    'bg-violet-400/20 border border-violet-400/30 text-violet-200 text-sm font-medium'
                  ].join(' ')}>
                    <FileText size={14} />
                    Ver completo
                  </span>
                </div>
              </div>

              {/* Card footer */}
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-violet-300/70 tracking-[0.12em] uppercase font-medium">
                    {edition.label}
                  </p>
                  <p className="text-white/30 text-xs mt-0.5">Este es mi Bus</p>
                </div>
                <a
                  href={edition.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-violet-400/15 border border-white/8 hover:border-violet-400/30 transition-all duration-200"
                  title="Abrir en nueva pestaña"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} className="text-white/40 hover:text-violet-300 transition-colors" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeEdition && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-4xl h-[90vh] glass-card rounded-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/8 gap-3">
              <div className="min-w-0">
                <p className="text-white font-semibold truncate">{activeEdition.label}</p>
                <p className="text-white/35 text-xs">Este es mi Bus</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeEdition.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium',
                    'bg-violet-400/15 border border-violet-400/25 text-violet-200 hover:bg-violet-400/25 transition-colors'
                  )}
                >
                  <ExternalLink size={12} />
                  <span className="hidden sm:inline">Abrir en pestaña</span>
                </a>
                <button
                  onClick={() => setActive(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-white/50 hover:text-white transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            {/* PDF full view */}
            <iframe
              src={activeEdition.url}
              className="flex-1 w-full border-0"
              title={activeEdition.label}
            />
          </div>
        </div>
      )}
    </main>
  )
}
