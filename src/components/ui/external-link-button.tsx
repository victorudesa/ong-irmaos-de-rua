import * as React from "react"
import { ExternalLink } from "lucide-react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button.variants"

interface ExternalLinkButtonProps
  extends VariantProps<typeof buttonVariants> {
  href: string
  children: React.ReactNode
  className?: string
  /** Hide the external-link icon. Default: false */
  hideIcon?: boolean
  /** Aria label fallback when children is not text-only */
  ariaLabel?: string
}

const ExternalLinkButton = React.forwardRef<HTMLAnchorElement, ExternalLinkButtonProps>(
  ({ className, variant = "default", size = "default", href, hideIcon, ariaLabel, children }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        data-slot="external-link-button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size }), "no-underline", className)}
      >
        {children}
        {!hideIcon && <ExternalLink aria-hidden="true" />}
      </a>
    )
  }
)

ExternalLinkButton.displayName = "ExternalLinkButton"

export { ExternalLinkButton }
