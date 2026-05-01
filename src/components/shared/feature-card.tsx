import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon: LucideIcon
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, title, description, icon: Icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col bg-card p-6 md:p-8 rounded-xl border border-border",
          "shadow-[var(--shadow-card)] transition-all duration-200",
          "hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]",
          className
        )}
        {...props}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-neutral-100 mb-6">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-display font-bold text-2xl tracking-tight text-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    )
  }
)
FeatureCard.displayName = "FeatureCard"

export { FeatureCard }
