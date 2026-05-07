import { Link } from 'react-router-dom'
import { HeartIcon } from '@/components/icons/HeartIcon'

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
                <HeartIcon width="16" height="16" fill="white" />
              </div>
              <span className="text-xs font-bold tracking-[0.12em] uppercase text-white">
                Irmãos de Rua
              </span>
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
          className="pt-7 flex items-center justify-between flex-wrap gap-3"
          style={{ borderTop: '1px solid var(--color-on-dark-line)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-on-dark-mid)' }}>
            © {new Date().getFullYear()} Irmãos de Rua. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
          </p>
          <p className="text-xs" style={{ color: 'var(--color-on-dark-mid)' }}>
            Feito com intenção ♥
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
