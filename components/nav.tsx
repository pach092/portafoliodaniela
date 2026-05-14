'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Inicio',        href: '#inicio' },
  { label: 'Mi Trabajo',    href: '#trabajo' },
  { label: 'Sobre Mí',     href: '#sobre-mi' },
  { label: 'Hoja de Vida', href: '#hoja-de-vida' },
  { label: 'Contacto',     href: '#contacto' },
]

export default function Nav() {
  const [active, setActive]   = useState('inicio')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]       = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)

      let current = links[0].href.slice(1)
      for (const { href } of links) {
        const el = document.getElementById(href.slice(1))
        if (el && el.getBoundingClientRect().top <= 100) current = href.slice(1)
      }
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[oklch(0.085_0.025_280)]/85 backdrop-blur-xl border-b border-white/8 py-4'
          : 'bg-transparent py-6'
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#inicio"
          onClick={(e) => go(e, '#inicio')}
          className="text-lg font-bold gradient-text tracking-tight"
        >
          Daniela Coronado
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => go(e, href)}
                className={cn(
                  'relative text-sm font-medium transition-colors duration-200 group',
                  active === href.slice(1) ? 'text-white' : 'text-white/45 hover:text-white/80'
                )}
              >
                {label}
                <span
                  className={cn(
                    'absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-rose-400 to-violet-500 transition-all duration-300',
                    active === href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile button */}
        <button
          className="md:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <ul className="bg-[oklch(0.085_0.025_280)]/95 backdrop-blur-xl border-t border-white/8 px-6 py-5 flex flex-col gap-5">
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => go(e, href)}
                className={cn(
                  'text-base font-medium transition-colors',
                  active === href.slice(1) ? 'text-rose-400' : 'text-white/55 hover:text-white'
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
