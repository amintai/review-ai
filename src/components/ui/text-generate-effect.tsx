"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number; // ms per character
}

export function TextGenerateEffect({
  text,
  speed = 35,
  className,
  ...props
}: TextGenerateEffectProps) {
  const [displayText, setDisplayText] = React.useState("");

  React.useEffect(() => {
    let index = 0;
    setDisplayText("");

    const interval = setInterval(() => {
      index += 1;
      setDisplayText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span
      className={cn(
        "inline-block font-syne tracking-tight",
        className
      )}
      {...props}
    >
      {displayText}
      <span className="inline-block w-[1ch] animate-pulse opacity-60">▌</span>
    </span>
  );
}

