/* Minimal AnimatedNumber utility inspired by Aceternity */
'use client';

import * as React from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

export function AnimatedNumber({ value, duration = 0.7, className }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = React.useState(0);
  const startTimeRef = React.useRef<number | null>(null);
  const previousValueRef = React.useRef(0);

  React.useEffect(() => {
    const startValue = previousValueRef.current;
    const changeInValue = value - startValue;
    startTimeRef.current = null;

    const step = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      const progress = Math.min((timestamp - startTimeRef.current) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = startValue + changeInValue * eased;
      setDisplayValue(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        previousValueRef.current = value;
      }
    };

    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return <span className={className}>{Math.round(displayValue)}</span>;
}

