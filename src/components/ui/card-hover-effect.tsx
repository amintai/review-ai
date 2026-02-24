/* Lightweight CardHoverEffect inspired by Aceternity's hover cards */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardHoverEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardHoverEffect({ children, className, ...props }: CardHoverEffectProps) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-border/70 bg-card/90 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:border-primary/40",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-px rounded-[1.05rem] bg-[radial-gradient(circle_at_top,_rgba(255,107,53,0.12),_transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div className="relative">{children}</div>
    </div>
  );
}

