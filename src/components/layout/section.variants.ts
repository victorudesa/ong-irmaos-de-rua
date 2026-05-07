import { cva } from "class-variance-authority"

export const sectionVariants = cva(
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
