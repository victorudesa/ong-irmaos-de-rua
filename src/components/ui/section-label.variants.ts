import { cva } from "class-variance-authority"

export const sectionLabelVariants = cva(
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
