import * as React from "react"
import { Link } from "react-router-dom"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button.variants"

interface LinkButtonProps
  extends VariantProps<typeof buttonVariants> {
  to: string
  children: React.ReactNode
  className?: string
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant = "default", size = "default", to, children }, ref) => {
    return (
      <Link
        ref={ref}
        to={to}
        data-slot="link-button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
      >
        {children}
      </Link>
    )
  }
)

LinkButton.displayName = "LinkButton"

export { LinkButton }
