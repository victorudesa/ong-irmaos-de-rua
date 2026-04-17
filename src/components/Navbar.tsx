import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useScrolled } from '@/hooks/useScrolled'

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Quem Somos', to: '/quem-somos' },
  { label: 'Seja Voluntário', to: '/voluntario' },
  { label: 'Doe Agora', to: '/doe-agora' },
]

const Navbar = () => {
  const scrolled = useScrolled()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

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

        {/* Desktop nav */}
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

        {/* Mobile nav */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden p-2 text-foreground"
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary fill-primary" />
                <span className="text-sm font-semibold tracking-widest uppercase">
                  Irmãos de Rua
                </span>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 mt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg px-3 py-2.5 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border mt-2">
                <Button size="sm" className="w-full" asChild>
                  <Link to="/doe-agora">Doe Agora</Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Navbar
