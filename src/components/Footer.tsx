import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{ background: 'var(--color-ink)', paddingTop: '64px', paddingBottom: '32px' }}>
      <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 mb-14">

          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-[30px] h-[30px] rounded-[7px] flex items-center justify-center shrink-0"
                style={{ background: 'var(--color-primary)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <span className="text-xs font-bold tracking-[0.12em] uppercase text-white">
                Irmãos de Rua
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-[240px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Levando acolhimento e esperança para pessoas em situação de rua desde 2005.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-extrabold tracking-[0.12em] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Navegação
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Início', to: '/' },
                { label: 'Quem Somos', to: '/sobre' },
                { label: 'Seja Voluntário', to: '/voluntario' },
                { label: 'Doe Agora', to: '/doe-agora' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors duration-150 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-extrabold tracking-[0.12em] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Contato
            </p>
            <div className="flex flex-col gap-3">
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Rua Ribeirão Pires, 87</span>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>São Caetano do Sul, SP</span>
              <a
                href="mailto:contato@irmaosderua.org.br"
                className="text-sm transition-colors duration-150 hover:text-white"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                contato@irmaosderua.org.br
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-extrabold tracking-[0.12em] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Redes Sociais
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/ongirmaosderua"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors duration-150 hover:text-white"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                Instagram
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors duration-150 hover:text-white"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                WhatsApp
              </a>
            </div>
          </div>

        </div>

        <div
          className="pt-7 flex items-center justify-between flex-wrap gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} Irmãos de Rua. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Feito com intenção ♥
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
