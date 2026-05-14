'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { Mail, Camera, Briefcase, MessageCircle, Send, CheckCircle2 } from 'lucide-react'

const socials = [
  { label: 'Instagram',   href: '#', icon: Camera,        handle: '@danielagarcia' },
  { label: 'LinkedIn',    href: '#', icon: Briefcase,      handle: 'Daniela Coronado' },
  { label: 'Twitter · X', href: '#', icon: MessageCircle, handle: '@danielagarcia' },
]

export default function Contact() {
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)

  const headerRef = useScrollReveal(0.2)
  const leftRef   = useScrollReveal(0.15)
  const rightRef  = useScrollReveal(0.15)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Simulate send — connect to your form service here
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1200)
  }

  return (
    <section id="contacto" className="py-28 md:py-36 px-6 relative overflow-hidden">
      {/* Aurora accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-500/8 rounded-full blur-[160px]" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="reveal mb-16 text-center"
        >
          <span className="text-xs font-medium text-rose-400 tracking-[0.2em] uppercase">
            04 · Contacto
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Hablemos de tu
            <br />
            <span className="gradient-text">próximo proyecto</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-md mx-auto text-base">
            ¿Lista para llevar tu marca al siguiente nivel? Escríbeme.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Left: contact info */}
          <div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            className="reveal flex flex-col gap-8"
          >
            {/* Email */}
            <div className="glass-card rounded-2xl p-6 flex items-center gap-4 group hover:border-rose-500/30 transition-all duration-300">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <Mail size={18} className="text-rose-400" />
              </div>
              <div>
                <p className="text-xs text-white/30 mb-0.5">Email</p>
                <a
                  href="mailto:hola@danielagarcia.co"
                  className="text-white/80 hover:text-white font-medium text-sm transition-colors"
                >
                  hola@danielagarcia.co
                </a>
              </div>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium text-white/30 tracking-[0.15em] uppercase">Redes sociales</p>
              {socials.map(({ label, href, icon: Icon, handle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-xl p-4 flex items-center gap-4 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-white/5">
                    <Icon size={16} className="text-white/50 group-hover:text-white/80 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30">{label}</p>
                    <p className="text-sm text-white/70 group-hover:text-white font-medium transition-colors">
                      {handle}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Disponible para nuevos proyectos
            </div>
          </div>

          {/* Right: form */}
          <div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            className="reveal reveal-delay-2"
          >
            {sent ? (
              <div className="glass-card rounded-2xl p-10 flex flex-col items-center justify-center gap-4 text-center min-h-[380px]">
                <CheckCircle2 size={48} className="text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">¡Mensaje enviado!</h3>
                <p className="text-white/45 text-sm max-w-xs">
                  Gracias por escribirme. Te respondo en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-8 flex flex-col gap-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-white/40 font-medium" htmlFor="nombre">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      placeholder="Tu nombre"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500/50 focus:bg-white/8 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-white/40 font-medium" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500/50 focus:bg-white/8 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/40 font-medium" htmlFor="asunto">
                    Asunto
                  </label>
                  <input
                    id="asunto"
                    name="asunto"
                    type="text"
                    required
                    placeholder="¿En qué puedo ayudarte?"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500/50 focus:bg-white/8 transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/40 font-medium" htmlFor="mensaje">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={4}
                    placeholder="Cuéntame sobre tu proyecto..."
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500/50 focus:bg-white/8 transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white text-sm font-semibold hover:scale-[1.02] hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-300 disabled:opacity-60 disabled:scale-100"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                  {loading ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-white/6 text-center">
        <p className="text-xs text-white/20">
          © {new Date().getFullYear()} Daniela Coronado · Todos los derechos reservados
        </p>
      </div>
    </section>
  )
}
