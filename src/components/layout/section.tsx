import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionVariants = cva(
  "w-full",
  {
    variants: {
      spacing: {
        default: "py-[var(--section-y)] md:py-[var(--section-y-md)]",
        compact: "py-[var(--section-y-compact)] md:py-[var(--section-y-compact-md)]",
        none: "py-0",
      },
      bg: {
        default: "bg-background text-foreground",
        primary: "bg-primary text-primary-foreground",
        muted: "bg-neutral-50 text-foreground",
        dark: "bg-surface-dark text-surface-dark-foreground",
      }
    },
    defaultVariants: {
      spacing: "default",
      bg: "default",
    },
  }
)

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /** Se true, envelopa o conteúdo em um grid centralizado de 1200px (comportamento padrão) */
  container?: boolean
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, bg, container = true, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ spacing, bg, className }))}
        {...props}
      >
        {container ? (
          <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    )
  }
)
Section.displayName = "Section"

export { Section, sectionVariants }
