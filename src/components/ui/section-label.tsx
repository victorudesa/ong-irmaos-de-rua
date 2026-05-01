import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionLabelVariants = cva(
  "text-xs font-semibold uppercase tracking-widest",
  {
    variants: {
      variant: {
        default: "text-primary",
        inverted: "text-primary-foreground/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface SectionLabelProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof sectionLabelVariants> {}

function SectionLabel({ className, variant, ...props }: SectionLabelProps) {
  return (
    <span
      className={cn(sectionLabelVariants({ variant }), className)}
      {...props}
    />
  )
}

export { SectionLabel, sectionLabelVariants }
