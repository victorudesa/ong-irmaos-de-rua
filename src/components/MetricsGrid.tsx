interface Metric {
  number: string
  label: string
}

interface MetricsGridProps {
  metrics: Metric[]
}

const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  return (
    <div className="bg-white border-b" style={{ borderColor: 'oklch(0.10 0.008 50 / 0.07)' }}>
      <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
        <div className="grid grid-cols-2 md:grid-cols-4 metrics-grid">
          {metrics.map((metric) => (
            <div key={metric.label} className="py-7 px-5 sm:py-9 sm:px-7 metrics-cell">
              <div className="font-display leading-none mb-1.5" style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', color: 'var(--color-ink)' }}>
                {metric.number.startsWith('+') ? (
                  <>
                    <span style={{ color: 'var(--color-primary)' }}>+</span>
                    {metric.number.slice(1)}
                  </>
                ) : (
                  metric.number
                )}
              </div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.05em]" style={{ color: 'var(--color-ink-soft)' }}>
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .metrics-grid .metrics-cell { border-color: oklch(0.10 0.008 50 / 0.08); }
        .metrics-grid .metrics-cell:nth-child(odd) { border-right: 1px solid oklch(0.10 0.008 50 / 0.08); }
        .metrics-grid .metrics-cell:nth-child(n+3) { border-top: 1px solid oklch(0.10 0.008 50 / 0.08); }
        @media (min-width: 768px) {
          .metrics-grid .metrics-cell { border-top: none !important; border-right: 1px solid oklch(0.10 0.008 50 / 0.08) !important; }
          .metrics-grid .metrics-cell:last-child { border-right: none !important; }
        }
      `}</style>
    </div>
  )
}

export default MetricsGrid
