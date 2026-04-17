interface SectionProps {
  id?: string
  label?: string
  title?: string
  centered?: boolean
  compact?: boolean
  dark?: boolean
  className?: string
  children: React.ReactNode
}

const Section = ({
  id,
  label,
  title,
  centered = false,
  compact = false,
  dark = false,
  className = '',
  children,
}: SectionProps) => {
  const paddingY = compact
    ? 'py-[var(--section-y-compact)] md:py-[var(--section-y-compact-md)]'
    : 'py-[var(--section-y)] md:py-[var(--section-y-md)]'

  return (
    <section id={id} className={`${paddingY} ${dark ? 'bg-surface-dark text-surface-dark-foreground' : ''} ${className}`}>
      <div className="container-page">
        {(label || title) && (
          <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
            {label && (
              <span className={`text-xs font-semibold uppercase tracking-widest mb-2 block ${
                dark ? 'text-primary-foreground/80' : 'text-primary'
              }`}>
                {label}
              </span>
            )}
            {title && (
              <h2 className={`font-display text-display-section font-bold tracking-tight leading-tight ${
                dark ? 'text-surface-dark-foreground' : 'text-foreground'
              }`}>
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

export default Section
