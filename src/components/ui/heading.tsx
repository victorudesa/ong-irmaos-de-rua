import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { headingVariants } from "./heading.variants"

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
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

export { Heading }
