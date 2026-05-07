import { LinkButton } from '@/components/ui/link-button'

interface Action {
  label: string
  to?: string
  href?: string
}

interface CtaBannerProps {
  /** Editorial quote — left-aligned. Use `quoteEm` for the italic/dimmed part. */
  quote?: string
  /** Italic emphasis within the quote */
  quoteEm?: string
  /** Legacy centered title (used on internal pages) */
  title?: string
  /** Legacy subtitle (used on internal pages) */
  subtitle?: string
  primaryAction: Action
  secondaryAction?: Action
}

const CtaBanner = ({ quote, quoteEm, title, subtitle, primaryAction, secondaryAction }: CtaBannerProps) => {
  const renderPrimary = () => {
    if (primaryAction.to) {
      return <LinkButton to={primaryAction.to} variant="inverted" size="lg">{primaryAction.label}</LinkButton>
    }
    return (
      <a
        href={primaryAction.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 h-11 px-6 text-base bg-white text-primary rounded-[10px] no-underline font-medium transition-all duration-150 hover:opacity-90"
      >
        {primaryAction.label}
      </a>
    )
  }

  const renderSecondary = () => {
    if (!secondaryAction) return null
    if (secondaryAction.to) {
      return <LinkButton to={secondaryAction.to} variant="outline-light" size="lg">{secondaryAction.label}</LinkButton>
    }
    return (
      <a
        href={secondaryAction.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 h-11 px-6 text-base bg-transparent text-white border-[1.5px] border-current rounded-[10px] no-underline font-medium transition-all duration-150 hover:bg-white/10"
      >
        {secondaryAction.label}
      </a>
    )
  }

  const useQuoteStyle = !!quote

  return (
    <section
      className="relative overflow-hidden py-[var(--section-y-compact)] md:py-[var(--section-y-compact-md)]"
      style={{ background: 'var(--color-primary)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, oklch(0.65 0.20 25) 0%, transparent 60%)' }}
        aria-hidden="true"
      />
      <div className="relative z-10 container mx-auto px-6 md:px-8 max-w-[1200px]">
        {useQuoteStyle ? (
          /* Editorial left-aligned layout */
          <div className="flex items-center justify-between gap-10 flex-wrap">
            <p
              className="font-display leading-[1.15] tracking-tight text-white text-balance"
              style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', maxWidth: '680px' }}
            >
              {quote}
              {quoteEm && (
                <em className="font-display" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                  {quoteEm}
                </em>
              )}
            </p>
            <div className="flex gap-3 flex-wrap">
              {renderPrimary()}
              {renderSecondary()}
            </div>
          </div>
        ) : (
          /* Legacy centered layout */
          <div className="text-center">
            {title && (
              <h2
                className="font-display leading-tight tracking-tight text-white mb-4"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {subtitle}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {renderPrimary()}
              {renderSecondary()}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CtaBanner
