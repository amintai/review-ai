import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  fallback: string
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, fallback, ...props }, ref) => {
    const initial = fallback.charAt(0)?.toUpperCase() || "U"
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold",
          className
        )}
        {...props}
      >
        {initial}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

