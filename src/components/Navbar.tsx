import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Quem Somos', to: '/quem-somos' },
  { label: 'Seja Voluntário', to: '/voluntario' },
  { label: 'Doe Agora', to: '/doe-agora' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b transition-shadow duration-200 ${
        scrolled ? 'shadow-card' : 'shadow-none'
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary fill-primary" />
          <span className="text-sm font-semibold tracking-widest uppercase text-foreground">
            Irmãos de Rua
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
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
          className="md:hidden p-2 text-foreground"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="container flex flex-col gap-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
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
