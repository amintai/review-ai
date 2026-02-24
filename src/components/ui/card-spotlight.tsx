"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardSpotlight({ children, className, ...props }: CardSpotlightProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty("--card-spotlight-x", `${x}px`);
    el.style.setProperty("--card-spotlight-y", `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative rounded-3xl border border-border bg-card/90 shadow-sm overflow-hidden",
        "before:pointer-events-none before:absolute before:h-[380px] before:w-[380px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-[radial-gradient(circle_at_center,_rgba(255,107,53,0.18),_transparent_60%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200",
        "before:left-[var(--card-spotlight-x)] before:top-[var(--card-spotlight-y)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

