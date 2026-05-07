import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface PageHeroProps {
  title: string | React.ReactNode
  subtitle?: string
  breadcrumb: string
  /** When true: photo-bg style (bottom-aligned, overlay, taller). Default: dark solid bg centered. */
  photoVariant?: boolean
}

const PageHero = ({ title, subtitle, breadcrumb, photoVariant }: PageHeroProps) => {
  if (photoVariant) {
    return (
      <section
        className="relative overflow-hidden flex items-end"
        style={{ minHeight: '52vh', paddingTop: '64px' }}
      >
        {/* Diagonal stripe placeholder — replace with real <img> */}
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              135deg,
              oklch(0.28 0.006 50) 0px, oklch(0.28 0.006 50) 2px,
              oklch(0.22 0.005 50) 2px, oklch(0.22 0.005 50) 18px
            )`,
          }}
          aria-hidden="true"
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, oklch(0 0 0 / 0.40) 0%, oklch(0 0 0 / 0.72) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 w-full container mx-auto px-6 md:px-8 max-w-[1200px]"
          style={{ padding: 'clamp(32px,5vh,64px) clamp(20px,5vw,60px) clamp(40px,6vh,72px)' }}>
          <nav className="flex items-center gap-2 mb-5" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
            <Link to="/" className="transition-colors duration-150 hover:text-white/80" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
              Início
            </Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4 }}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>{breadcrumb}</span>
          </nav>
          <h1
            className="font-display text-white tracking-tight leading-[1.0] mb-4"
            style={{ fontSize: 'clamp(40px,5.5vw,80px)', letterSpacing: '-0.02em', textWrap: 'balance' } as React.CSSProperties}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="leading-relaxed max-w-[520px]" style={{ fontSize: 'clamp(15px,1.2vw,18px)', color: 'rgba(255,255,255,0.65)' }}>
              {subtitle}
            </p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="py-[var(--section-y-compact-md)] md:py-[var(--section-y)] bg-surface-dark text-surface-dark-foreground">
      <div className="container mx-auto px-6 md:px-8 max-w-[1200px] text-center">
        <nav className="flex items-center justify-center gap-1 text-sm text-surface-dark-muted mb-8">
          <Link to="/" className="hover:text-surface-dark-foreground transition-colors duration-200">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-surface-dark-foreground">{breadcrumb}</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
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
