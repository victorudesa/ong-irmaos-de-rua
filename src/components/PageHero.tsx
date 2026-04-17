import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumb: string
}

const PageHero = ({ title, subtitle, breadcrumb }: PageHeroProps) => {
  return (
    <section className="py-[var(--section-y-compact-md)] md:py-[var(--section-y)] bg-surface-dark text-surface-dark-foreground">
      <div className="container-page text-center">
        <nav className="flex items-center justify-center gap-1 text-sm text-surface-dark-muted mb-8">
          <Link to="/" className="hover:text-surface-dark-foreground transition-colors duration-200">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-surface-dark-foreground">{breadcrumb}</span>
        </nav>
        <h1 className="font-display text-display-page font-bold tracking-tight leading-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-surface-dark-muted max-w-[560px] mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}

export default PageHero
