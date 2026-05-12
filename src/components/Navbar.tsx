import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logoHorizontal from '@/assets/logo/horizontal-navbar.png'

const navLinks = [
  { label: 'Sobre Nós', to: '/sobre' },
  { label: 'Seja Voluntário', to: '/voluntario' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-ink/8 transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_2px_20px_oklch(0_0_0/0.06)]' : 'shadow-none'
      }`}
      style={{ background: 'oklch(0.97 0.012 60 / 0.80)' }}
    >
      <div className="container mx-auto px-6 md:px-8 max-w-[1200px] flex items-center justify-between h-16">
        <Link to="/" className="flex items-center text-ink no-underline">
          <img
            src={logoHorizontal}
            alt="Irmãos de Rua"
            className="h-8 md:h-10 w-auto object-contain"
          />
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
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium transition-colors duration-150 hover:text-foreground"
                style={{ color: 'var(--color-ink-mid)' }}
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm" className="w-fit" asChild>
              <Link to="/doe-agora" onClick={() => setMobileOpen(false)}>Doe Agora</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
