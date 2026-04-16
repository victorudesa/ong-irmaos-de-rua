interface SectionProps {
  label?: string
  title?: string
  centered?: boolean
  compact?: boolean
  dark?: boolean
  className?: string
  children: React.ReactNode
}

const Section = ({
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
    <section className={`${paddingY} ${dark ? 'bg-surface-dark text-surface-dark-foreground' : ''} ${className}`}>
      <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
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
              <h2 className={`font-display text-3xl md:text-4xl font-bold tracking-tight leading-tight ${
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
