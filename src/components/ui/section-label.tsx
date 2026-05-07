import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { sectionLabelVariants } from "./section-label.variants"

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

export { SectionLabel }
