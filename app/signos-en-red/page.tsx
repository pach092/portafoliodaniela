'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Newspaper } from 'lucide-react'
import { cn } from '@/lib/utils'

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
    twttr?: { widgets: { load: () => void } }
  }
}

type Platform = 'instagram' | 'x' | 'facebook' | 'tiktok'

interface Post {
  id: string
  platform: Platform
  url: string
  label?: string
  iframeSrc?: string
  iframeWidth?: number
  iframeHeight?: number
  tiktokId?: string
}

const posts: Post[] = [
  { id: 'ig-1', platform: 'instagram', url: 'https://www.instagram.com/p/DS7d6XJjmOJ/' },
  { id: 'ig-2', platform: 'instagram', url: 'https://www.instagram.com/p/DSnm4EtEsC-/' },
  { id: 'ig-3', platform: 'instagram', url: 'https://www.instagram.com/p/DSWF4r2Ds_f/' },
  { id: 'ig-4', platform: 'instagram', url: 'https://www.instagram.com/p/DRCscAfDmnB/' },
  { id: 'ig-5', platform: 'instagram', url: 'https://www.instagram.com/p/DQ1-Vc6Dq7i/' },
  { id: 'ig-6', platform: 'instagram', url: 'https://www.instagram.com/p/DQZ7a1tD999/' },
  { id: 'ig-7', platform: 'instagram', url: 'https://www.instagram.com/p/DQR_35fj9eW/' },
  { id: 'x-1',  platform: 'x', url: 'https://x.com/Ciberpazcolombi/status/1993796760234545171' },
  { id: 'x-2',  platform: 'x', url: 'https://x.com/Ciberpazcolombi/status/1989055023385571586' },
  {
    id: 'fb-1', platform: 'facebook', label: 'Publicación',
    url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid035rDmUBcpsHkzb1a6z1cpaLidswvvEm2NxmsVEXGbpbsKWCEDmrZSrzxQRqP8dX9fl&id=61561254729944',
    iframeSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid035rDmUBcpsHkzb1a6z1cpaLidswvvEm2NxmsVEXGbpbsKWCEDmrZSrzxQRqP8dX9fl%26id%3D61561254729944&show_text=true&width=500',
    iframeWidth: 500, iframeHeight: 729,
  },
  {
    id: 'fb-2', platform: 'facebook', label: 'Publicación',
    url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid0dKEVteS3Z8fUDMLBmdnHy6Yt7DttcWd92EbCmFiEwN1ENwmFuQBeUCxrYhxYmwUTl&id=61561254729944',
    iframeSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0dKEVteS3Z8fUDMLBmdnHy6Yt7DttcWd92EbCmFiEwN1ENwmFuQBeUCxrYhxYmwUTl%26id%3D61561254729944&show_text=true&width=500',
    iframeWidth: 500, iframeHeight: 687,
  },
  {
    id: 'fb-3', platform: 'facebook', label: 'Reel',
    url: 'https://www.facebook.com/reel/1520290269013904/',
    iframeSrc: 'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1520290269013904%2F&show_text=true&width=267&t=0',
    iframeWidth: 267, iframeHeight: 591,
  },
  { id: 'tt-1', platform: 'tiktok', label: 'Video', url: 'https://www.tiktok.com/@ciberpazcolombia/photo/7561145546740698379', tiktokId: '7561145546740698379' },
]

const meta: Record<Platform, { name: string; text: string; bg: string; border: string }> = {
  instagram: { name: 'Instagram', text: 'text-rose-400',   bg: 'bg-rose-500/10',  border: 'border-rose-500/25' },
  x:         { name: 'X',         text: 'text-zinc-300',   bg: 'bg-zinc-500/10',  border: 'border-zinc-500/25' },
  facebook:  { name: 'Facebook',  text: 'text-blue-400',   bg: 'bg-blue-500/10',  border: 'border-blue-500/25' },
  tiktok:    { name: 'TikTok',    text: 'text-pink-400',   bg: 'bg-pink-500/10',  border: 'border-pink-500/25' },
}

const TABS = ['Todos', 'Instagram', 'X', 'Facebook', 'TikTok'] as const
type Tab = (typeof TABS)[number]

const TAB_PLATFORM: Record<Tab, Platform | null> = {
  Todos: null, Instagram: 'instagram', X: 'x', Facebook: 'facebook', TikTok: 'tiktok',
}

function processEmbeds() {
  window.instgrm?.Embeds.process()
  window.twttr?.widgets.load()
}

function EmbedShell({ children, minH = 480 }: { children: React.ReactNode; minH?: number }) {
  const [ready, setReady] = useState(false)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return

    const onLoad = () => setReady(true)
    const fallback = setTimeout(() => setReady(true), 10_000)

    // Facebook iframes are already in the DOM when the component mounts
    const existing = el.querySelector('iframe')
    if (existing) {
      existing.addEventListener('load', onLoad, { once: true })
      return () => clearTimeout(fallback)
    }

    // Instagram / X / TikTok: embed script injects the iframe later
    const mo = new MutationObserver(() => {
      const iframe = el.querySelector('iframe')
      if (!iframe) return
      mo.disconnect()
      iframe.addEventListener('load', onLoad, { once: true })
    })
    mo.observe(el, { childList: true, subtree: true })

    return () => { mo.disconnect(); clearTimeout(fallback) }
  }, [])

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: ready ? undefined : minH }}>
      {!ready && (
        <div className="absolute inset-0 glass-card rounded-2xl flex items-end p-5">
          <div className="w-full space-y-2 opacity-40">
            <div className="h-2 rounded-full bg-white/20 w-3/4 animate-pulse" />
            <div className="h-2 rounded-full bg-white/20 w-1/2 animate-pulse" />
          </div>
        </div>
      )}
      <div
        ref={innerRef}
        className="transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      >
        {children}
      </div>
    </div>
  )
}

function InstagramEmbed({ url }: { url: string }) {
  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      data-instgrm-captioned
      style={{ background: '#FFF', border: 0, borderRadius: 12, margin: 0, maxWidth: 540, minWidth: 280, width: '100%' }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer"
        className="block p-4 text-center text-sm text-blue-600 hover:underline">
        Ver en Instagram →
      </a>
    </blockquote>
  )
}

function XEmbed({ url }: { url: string }) {
  // Twitter widget needs twitter.com URL format
  const twitterUrl = url.replace('x.com', 'twitter.com').split('?')[0].replace('/photo/1', '')
  return (
    <blockquote className="twitter-tweet" data-lang="es" data-dnt="true" data-theme="dark">
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
        Ver en X →
      </a>
    </blockquote>
  )
}

function FacebookEmbed({ post }: { post: Post }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white" style={{ maxWidth: post.iframeWidth }}>
      <iframe
        src={post.iframeSrc}
        width={post.iframeWidth}
        height={post.iframeHeight}
        style={{ border: 'none', overflow: 'hidden', display: 'block', width: '100%' }}
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title={post.label}
      />
    </div>
  )
}

function TikTokEmbed({ post }: { post: Post }) {
  return (
    <blockquote
      className="tiktok-embed"
      cite={post.url}
      data-video-id={post.tiktokId}
      style={{ maxWidth: 605, minWidth: 325 }}
    >
      <section>
        <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@ciberpazcolombia">
          @ciberpazcolombia
        </a>
      </section>
    </blockquote>
  )
}

function LinkCard({ post }: { post: Post }) {
  const m = meta[post.platform]
  const platformIcons: Record<Platform, string> = {
    instagram: '📷', x: '✕', facebook: 'f', tiktok: '♪',
  }
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'glass-card rounded-2xl p-6 flex flex-col gap-4 group transition-all duration-300',
        'hover:border-white/20 min-h-[180px] justify-between'
      )}
    >
      <div className="flex items-start justify-between">
        <span className={cn('text-lg font-bold w-9 h-9 rounded-xl flex items-center justify-center', m.bg, m.border, 'border', m.text)}>
          {platformIcons[post.platform]}
        </span>
        <ExternalLink size={14} className="text-white/20 group-hover:text-white/60 transition-colors" />
      </div>
      <div>
        <p className={cn('text-xs font-semibold tracking-wide uppercase mb-1', m.text)}>{m.name}</p>
        <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors font-medium">
          {post.label ?? 'Ver publicación'}
        </p>
        <p className="text-white/25 text-xs mt-1 truncate">{post.url.replace(/^https?:\/\//, '').slice(0, 48)}…</p>
      </div>
    </a>
  )
}

export default function SignosEnRed() {
  const [tab, setTab] = useState<Tab>('Todos')

  const filtered = tab === 'Todos' ? posts : posts.filter((p) => p.platform === TAB_PLATFORM[tab])

  useEffect(() => {
    // Re-process embeds whenever visible posts change
    const timer = setTimeout(processEmbeds, 300)
    return () => clearTimeout(timer)
  }, [tab])

  return (
    <main className="min-h-screen bg-[oklch(0.085_0.03_305)] px-6 py-12">
      <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" onLoad={processEmbeds} />
      <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" onLoad={processEmbeds} />
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />

      {/* Aurora */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-400/6 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-900/8 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Back */}
        <Link
          href="/#trabajo"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm font-medium transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Volver al portafolio
        </Link>

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-medium text-violet-300 tracking-[0.2em] uppercase">
            Social Media · Group Coss
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3">Signos en Red</h1>
          <p className="text-white/40 mt-4 max-w-xl text-base leading-relaxed">
            Contenido accesible e inclusivo para la comunidad sorda en Colombia.
            Reconocimiento de marca y comunicación de eventos en múltiples plataformas.
          </p>
        </div>

        {/* Platform tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border',
                tab === t
                  ? 'bg-violet-400/20 border-violet-400/40 text-violet-200'
                  : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'
              )}
            >
              {t}
              <span className="ml-1.5 text-xs opacity-60">
                {t === 'Todos' ? posts.length : posts.filter((p) => p.platform === TAB_PLATFORM[t]).length}
              </span>
            </button>
          ))}
        </div>

        {/* Press mention */}
        <div className="mb-10">
          <p className="text-xs font-medium text-white/30 tracking-[0.15em] uppercase mb-4">Aparición en prensa</p>
          <a
            href="https://www.mintic.gov.co/portal/inicio/Sala-de-prensa/Noticias/406138:En-la-Semana-Internacional-de-las-Personas-Sordas-el-Ministerio-TIC-apoya-el-acceso-a-la-informacion-sin-barreras-con-Signos-en-Red"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 flex items-start gap-5 group hover:border-violet-400/30 transition-all duration-300"
          >
            <div className="shrink-0 p-3 rounded-xl bg-violet-400/10 border border-violet-400/20 mt-0.5">
              <Newspaper size={18} className="text-violet-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-violet-300/70 tracking-[0.12em] uppercase font-medium mb-1">MinTIC · Ministerio de las TIC</p>
              <h3 className="text-white/80 group-hover:text-white font-medium text-sm leading-snug transition-colors mb-3">
                En la Semana Internacional de las Personas Sordas, el Ministerio TIC apoya el acceso a la información sin barreras con Signos en Red
              </h3>
              <p className="text-xs text-white/35 leading-relaxed border-l-2 border-violet-400/30 pl-3">
                Participación: creación de la pieza gráfica y el título de la campaña. El contenido editorial y la publicación corresponden al Ministerio TIC.
              </p>
            </div>
            <ExternalLink size={14} className="shrink-0 text-white/20 group-hover:text-violet-300 transition-colors mt-1" />
          </a>
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 xl:columns-3 gap-5">
          {filtered.map((post) => (
            <div key={post.id} className="break-inside-avoid mb-5">
              {post.platform === 'instagram' && (
                <EmbedShell minH={520}><InstagramEmbed url={post.url} /></EmbedShell>
              )}
              {post.platform === 'x' && (
                <EmbedShell minH={320}><XEmbed url={post.url} /></EmbedShell>
              )}
              {post.platform === 'facebook' && post.iframeSrc && (
                <EmbedShell minH={post.iframeHeight ?? 500}><FacebookEmbed post={post} /></EmbedShell>
              )}
              {post.platform === 'tiktok' && post.tiktokId && (
                <EmbedShell minH={700}><TikTokEmbed post={post} /></EmbedShell>
              )}
              {post.platform === 'tiktok' && !post.tiktokId && <LinkCard post={post} />}
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
