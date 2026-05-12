import { Link } from 'react-router-dom'
import logoPadrao from '@/assets/logo/padrao.png'

const Footer = () => {
  return (
    <footer className="pt-12 md:pt-16 pb-8" style={{ background: 'var(--color-ink)' }}>
      <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-10 md:mb-14">

          <div>
            <div className="inline-block bg-white rounded-2xl p-4 mb-4">
              <img
                src={logoPadrao}
                alt="Irmãos de Rua"
                className="h-24 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed max-w-[240px]" style={{ color: 'var(--color-on-dark-mid)' }}>
              Levando acolhimento e esperança para pessoas em situação de rua desde 2005.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-extrabold tracking-[0.12em] uppercase mb-5" style={{ color: 'var(--color-on-dark-low)' }}>
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
                    style={{ color: 'var(--color-on-dark-high)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-extrabold tracking-[0.12em] uppercase mb-5" style={{ color: 'var(--color-on-dark-low)' }}>
              Contato
            </p>
            <div className="flex flex-col gap-3">
              <span className="text-sm" style={{ color: 'var(--color-on-dark-high)' }}>Rua Ribeirão Pires, 87</span>
              <span className="text-sm" style={{ color: 'var(--color-on-dark-high)' }}>São Caetano do Sul, SP</span>
              <a
                href="mailto:contato@irmaosderua.org.br"
                className="text-sm transition-colors duration-150 hover:text-white"
                style={{ color: 'var(--color-on-dark-high)' }}
              >
                contato@irmaosderua.org.br
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-extrabold tracking-[0.12em] uppercase mb-5" style={{ color: 'var(--color-on-dark-low)' }}>
              Redes Sociais
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/ongirmaosderua"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors duration-150 hover:text-white"
                style={{ color: 'var(--color-on-dark-high)' }}
              >
                Instagram
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors duration-150 hover:text-white"
                style={{ color: 'var(--color-on-dark-high)' }}
              >
                WhatsApp
              </a>
            </div>
          </div>

        </div>

        <div
          className="pt-7 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          style={{ borderTop: '1px solid var(--color-on-dark-line)' }}
        >
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-on-dark-mid)' }}>
            © {new Date().getFullYear()} Irmãos de Rua. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
          </p>
          <p className="text-xs whitespace-nowrap" style={{ color: 'var(--color-on-dark-mid)' }}>
            Feito com intenção ♥
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
