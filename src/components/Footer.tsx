import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-surface-dark text-surface-dark-foreground py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary fill-primary" />
              <span className="text-sm font-semibold tracking-widest uppercase">
                Irmãos de Rua
              </span>
            </div>
            <p className="text-sm leading-relaxed text-surface-dark-muted">
              Levando acolhimento e esperança para pessoas em situação de rua desde 2005.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-surface-dark-muted hover:text-surface-dark-foreground transition-colors duration-200">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/quem-somos" className="text-sm text-surface-dark-muted hover:text-surface-dark-foreground transition-colors duration-200">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/voluntario" className="text-sm text-surface-dark-muted hover:text-surface-dark-foreground transition-colors duration-200">
                  Seja Voluntário
                </Link>
              </li>
              <li>
                <Link to="/doe-agora" className="text-sm text-surface-dark-muted hover:text-surface-dark-foreground transition-colors duration-200">
                  Doe Agora
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Contato</h4>
            <p className="text-sm text-surface-dark-muted leading-relaxed">
              Rua Ribeirão Pires, 87<br />
              São Caetano do Sul, SP
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Redes Sociais</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com/ongirmaosderua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-surface-dark-muted hover:text-surface-dark-foreground transition-colors duration-200"
                >
                  Instagram — @ongirmaosderua
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-surface-dark-muted hover:text-surface-dark-foreground transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-surface-dark-muted text-center">
            © {new Date().getFullYear()} Irmãos de Rua. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
