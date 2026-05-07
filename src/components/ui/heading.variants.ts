import { cva } from "class-variance-authority"

export const headingVariants = cva(
  "font-display font-bold tracking-tight text-foreground",
  {
    variants: {
      size: {
        default: "text-3xl md:text-4xl leading-tight",
        sm: "text-2xl md:text-3xl leading-snug",
        lg: "text-4xl md:text-5xl leading-tight",
        hero: "text-5xl md:text-6xl leading-[1.05]",
      },
      color: {
        default: "text-foreground",
        primary: "text-primary",
        inverted: "text-primary-foreground",
      }
    },
    defaultVariants: {
      size: "default",
      color: "default",
    },
  }
)
