'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ExternalLink, FileText, Play, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type AssetType = 'pdf' | 'video'

interface Asset {
  id: string
  label: string
  subtitle: string
  type: AssetType
  url: string
}

const assets: Asset[] = [
  {
    id: 'flyer',
    label: 'Flyer informativo',
    subtitle: 'Diseño gráfico · PDF',
    type: 'pdf',
    url: 'https://portafoliodaniela.s3.us-east-1.amazonaws.com/flyer.pdf',
  },
  {
    id: 'historieta',
    label: 'Historieta',
    subtitle: 'Contenido editorial · PDF',
    type: 'pdf',
    url: 'https://portafoliodaniela.s3.us-east-1.amazonaws.com/historieta.pdf',
  },
  {
    id: 'material-audiovisual',
    label: 'Material audiovisual',
    subtitle: 'Producción de video',
    type: 'video',
    url: 'https://portafoliodaniela.s3.us-east-1.amazonaws.com/materialAudiovisual.mp4',
  },
  {
    id: 'reciclaje',
    label: 'Campaña de reciclaje',
    subtitle: 'Diseño gráfico · PDF',
    type: 'pdf',
    url: 'https://portafoliodaniela.s3.us-east-1.amazonaws.com/reciclaje.pdf',
  },
  {
    id: 'de-mi-vida',
    label: 'De mi Vida',
    subtitle: 'Producción de video',
    type: 'video',
    url: 'https://portafoliodaniela.s3.us-east-1.amazonaws.com/de+mi+Vida.mp4',
  },
]

export default function UnidadVictimas() {
  const [active, setActive] = useState<string | null>(null)
  const activeAsset = assets.find((a) => a.id === active)

  return (
    <main className="min-h-screen bg-[oklch(0.085_0.03_305)] px-6 py-12">
      {/* Aurora accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-400/6 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-900/8 rounded-full blur-[140px]" />
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
          <span className="text-xs font-medium text-emerald-300 tracking-[0.2em] uppercase">
            Endomarketing · WhatsApp · Interno
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Unidad para las Víctimas
          </h1>
          <p className="text-white/40 mt-4 max-w-xl text-base leading-relaxed">
            Capacitaciones sobre atención a usuarios por WhatsApp, creación de contenido informativo interno y producción de videos para redes sociales institucionales.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            asset.type === 'pdf' ? (
              <PdfCard key={asset.id} asset={asset} onOpen={() => setActive(asset.id)} />
            ) : (
              <VideoCard key={asset.id} asset={asset} onOpen={() => setActive(asset.id)} />
            )
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeAsset && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-4xl h-[90vh] glass-card rounded-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/8 shrink-0 gap-3">
              <div className="min-w-0">
                <p className="text-white font-semibold truncate">{activeAsset.label}</p>
                <p className="text-white/35 text-xs">{activeAsset.subtitle}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeAsset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium',
                    'bg-emerald-400/15 border border-emerald-400/25 text-emerald-200 hover:bg-emerald-400/25 transition-colors'
                  )}
                >
                  <ExternalLink size={12} />
                  Abrir en pestaña
                </a>
                <button
                  onClick={() => setActive(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-white/50 hover:text-white transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            {activeAsset.type === 'pdf' ? (
              <iframe
                src={activeAsset.url}
                className="flex-1 w-full border-0"
                title={activeAsset.label}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center bg-black p-4">
                <video
                  src={activeAsset.url}
                  controls
                  autoPlay
                  className="max-h-full max-w-full rounded-xl"
                >
                  Tu navegador no soporta la reproducción de video.
                </video>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

function PdfCard({ asset, onOpen }: { asset: Asset; onOpen: () => void }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col group hover:border-emerald-500/30 transition-all duration-300">
      {/* PDF preview */}
      <div
        className="relative bg-white/3 cursor-pointer"
        style={{ height: '340px' }}
        onClick={onOpen}
      >
        <iframe
          src={asset.url}
          className="w-full h-full border-0"
          title={asset.label}
        />
        <div className="absolute inset-0 bg-[oklch(0.085_0.03_305)]/0 group-hover:bg-[oklch(0.085_0.03_305)]/40 transition-all duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-200 text-sm font-medium">
            <FileText size={14} />
            Ver completo
          </span>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-emerald-300/70 tracking-[0.12em] uppercase font-medium">
            {asset.label}
          </p>
          <p className="text-white/30 text-xs mt-0.5">{asset.subtitle}</p>
        </div>
        <a
          href={asset.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-white/5 hover:bg-emerald-400/15 border border-white/8 hover:border-emerald-400/30 transition-all duration-200"
          title="Abrir en nueva pestaña"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={14} className="text-white/40 hover:text-emerald-300 transition-colors" />
        </a>
      </div>
    </div>
  )
}

function VideoCard({ asset, onOpen }: { asset: Asset; onOpen: () => void }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col group hover:border-emerald-500/30 transition-all duration-300">
      {/* Video preview */}
      <div
        className="relative bg-black cursor-pointer"
        style={{ height: '340px' }}
        onClick={onOpen}
      >
        <video
          src={asset.url}
          className="w-full h-full object-cover"
          preload="metadata"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-all duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play size={22} className="text-emerald-200 ml-1" />
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-emerald-300/70 tracking-[0.12em] uppercase font-medium">
            {asset.label}
          </p>
          <p className="text-white/30 text-xs mt-0.5">{asset.subtitle}</p>
        </div>
        <a
          href={asset.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-white/5 hover:bg-emerald-400/15 border border-white/8 hover:border-emerald-400/30 transition-all duration-200"
          title="Abrir en nueva pestaña"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={14} className="text-white/40 hover:text-emerald-300 transition-colors" />
        </a>
      </div>
    </div>
  )
}
