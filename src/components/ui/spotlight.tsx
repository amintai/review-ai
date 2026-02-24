"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export function Spotlight({ className, size = 380, ...props }: SpotlightProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      el.style.setProperty("--spotlight-x", `${x}px`);
      el.style.setProperty("--spotlight-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 opacity-[0.15]",
        className
      )}
      style={
        {
          "--spotlight-size": `${size}px`,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        className="absolute rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,107,53,0.45),_transparent_60%)]"
        style={{
          width: "var(--spotlight-size)",
          height: "var(--spotlight-size)",
          transform: "translate(-50%, -50%)",
          left: "var(--spotlight-x)",
          top: "var(--spotlight-y)",
          transition: "left 120ms ease-out, top 120ms ease-out",
        }}
      />
    </div>
  );
}

