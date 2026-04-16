import type { LucideIcon } from 'lucide-react'

interface CardProps {
  icon: LucideIcon
  title: string
  description: string
}

const Card = ({ icon: Icon, title, description }: CardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
      <div className="w-11 h-11 bg-muted rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

export default Card
