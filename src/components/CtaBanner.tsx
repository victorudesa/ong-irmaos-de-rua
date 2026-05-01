import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Section } from '@/components/layout/section'

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
    <Section bg="primary" spacing="compact">
      <div className="text-center">
        <Heading color="inverted" className="mb-4">
          {title}
        </Heading>
        {subtitle && (
          <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryAction.to ? (
            <Button variant="inverted" size="lg" asChild>
              <Link to={primaryAction.to}>{primaryAction.label}</Link>
            </Button>
          ) : (
            <Button variant="inverted" size="lg">
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white" asChild>
              {secondaryAction.to ? (
                <Link to={secondaryAction.to}>{secondaryAction.label}</Link>
              ) : (
                <a href={secondaryAction.href} target="_blank" rel="noopener noreferrer">{secondaryAction.label}</a>
              )}
            </Button>
          )}
        </div>
      </div>
    </Section>
  )
}

export default CtaBanner
