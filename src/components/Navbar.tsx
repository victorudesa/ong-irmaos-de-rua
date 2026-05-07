import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Sobre Nós', to: '/sobre' },
  { label: 'Seja Voluntário', to: '/voluntario' },
  { label: 'Parceiros', to: '/parceiros' }
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-ink/8 transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_2px_20px_oklch(0_0_0/0.06)]' : 'shadow-none'
      }`}
      style={{ background: 'oklch(0.97 0.012 60 / 0.92)' }}
    >
      <div className="container mx-auto px-6 md:px-8 max-w-[1200px] flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 text-ink no-underline">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'var(--color-ink)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" style={{ fill: 'oklch(0.97 0.012 60)' }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <span className="text-xs font-bold tracking-[0.12em] uppercase whitespace-nowrap" style={{ color: 'var(--color-ink)' }}>
            Irmãos de Rua
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium transition-colors duration-150 hover:text-foreground"
              style={{ color: 'var(--color-ink-mid)' }}
            >
              {link.label}
            </Link>
          ))}
          <Button size="sm" asChild>
            <Link to="/doe-agora">Doe Agora</Link>
          </Button>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          style={{ color: 'var(--color-ink)' }}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-ink/8" style={{ background: 'oklch(0.97 0.012 60)' }}>
          <nav className="container mx-auto px-6 max-w-[1200px] flex flex-col gap-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium transition-colors duration-150 hover:text-foreground"
                style={{ color: 'var(--color-ink-mid)' }}
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm" className="w-fit" asChild>
              <Link to="/doe-agora">Doe Agora</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
