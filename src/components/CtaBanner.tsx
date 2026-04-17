import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface Action {
  label: string
  to?: string
  href?: string
}

interface CtaBannerProps {
  title: string
  subtitle?: string
  primaryAction: Action
  secondaryAction?: Action
}

const CtaBanner = ({ title, subtitle, primaryAction, secondaryAction }: CtaBannerProps) => {
  return (
    <section className="bg-primary py-[var(--section-y-compact-md)] md:py-[var(--section-y)]">
      <div className="container-page text-center">
        <h2 className="font-display text-display-section font-bold tracking-tight leading-tight text-primary-foreground mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryAction.to ? (
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold transition-all duration-200 hover:scale-[1.02]" asChild>
              <Link to={primaryAction.to}>{primaryAction.label}</Link>
            </Button>
          ) : (
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold transition-all duration-200 hover:scale-[1.02]">
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:border-white hover:bg-white/10 font-semibold transition-all duration-200" asChild>
              {secondaryAction.to ? (
                <Link to={secondaryAction.to}>{secondaryAction.label}</Link>
              ) : (
                <a href={secondaryAction.href} target="_blank" rel="noopener noreferrer">{secondaryAction.label}</a>
              )}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

export default CtaBanner
