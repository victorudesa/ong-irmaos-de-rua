interface Metric {
  number: string
  label: string
}

interface MetricsGridProps {
  metrics: Metric[]
}

const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  return (
    <section className="py-[var(--section-y-compact)] md:py-[var(--section-y-compact-md)] bg-background">
      <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`text-center py-6 px-4 ${
                index < metrics.length - 1 ? 'border-r border-border' : ''
              } ${index === 1 ? 'max-md:border-r-0' : ''} ${
                index < 2 ? 'max-md:border-b max-md:border-border' : ''
              }`}
            >
              <span className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {metric.number}
              </span>
              <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MetricsGrid
