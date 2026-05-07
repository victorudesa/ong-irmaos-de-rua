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
        <div className="grid grid-cols-2 md:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="py-9 px-7"
              style={{
                borderRight: index < metrics.length - 1 ? '1px solid oklch(0.10 0.008 50 / 0.08)' : 'none',
              }}
            >
              <div className="font-display leading-none mb-1.5" style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', color: 'var(--color-ink)' }}>
                {metric.number.startsWith('+') ? (
                  <>
                    <span style={{ color: 'var(--color-primary)' }}>+</span>
                    {metric.number.slice(1)}
                  </>
                ) : (
                  metric.number
                )}
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.05em]" style={{ color: 'var(--color-ink-soft)' }}>
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MetricsGrid
