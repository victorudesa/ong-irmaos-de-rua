import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headingVariants = cva(
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

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, color, as: Tag = "h2", ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(headingVariants({ size, color, className }))}
        {...props}
      />
    )
  }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }
