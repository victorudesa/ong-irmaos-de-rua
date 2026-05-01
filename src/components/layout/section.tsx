import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { SectionLabel } from "@/components/ui/section-label"
import { Heading } from "@/components/ui/heading"

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
  /** Rótulo pequeno exibido acima do título (Section Label no Figma) */
  label?: string
  /** Título principal da seção (H2 com font-display) */
  title?: string
  /** Centraliza o label e o título horizontalmente */
  centered?: boolean
  /** Se true, envelopa o conteúdo em um grid centralizado de 1200px (padrão: true) */
  container?: boolean
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, bg, container = true, label, title, centered = false, children, ...props }, ref) => {
    const isDark = bg === "dark" || bg === "primary"
    const labelVariant = isDark ? "inverted" : "default"
    const headingColor = isDark ? "inverted" : "default"

    const header = (label || title) && (
      <div className={cn("mb-10", centered && "text-center")}>
        {label && (
          <SectionLabel variant={labelVariant} className="mb-2 block">
            {label}
          </SectionLabel>
        )}
        {title && (
          <Heading color={headingColor}>
            {title}
          </Heading>
        )}
      </div>
    )

    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ spacing, bg, className }))}
        {...props}
      >
        {container ? (
          <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
            {header}
            {children}
          </div>
        ) : (
          <>
            {header}
            {children}
          </>
        )}
      </section>
    )
  }
)
Section.displayName = "Section"

export { Section, sectionVariants }
