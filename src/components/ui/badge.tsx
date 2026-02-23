import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        outline:
          "border-border bg-background text-foreground",
        // Custom verdict variants
        verdictBuy:
          "border-emerald-200 bg-emerald-50 text-emerald-700",
        verdictSkip:
          "border-red-200 bg-red-50 text-red-700",
        verdictCaution:
          "border-amber-200 bg-amber-50 text-amber-700",
        // Custom metric variants
        trust:
          "border-cyan-200 bg-cyan-50 text-cyan-700",
        confidence:
          "border-orange-200 bg-orange-50 text-orange-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }

