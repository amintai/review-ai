/* Minimal BackgroundGradient wrapper inspired by Aceternity */
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface BackgroundGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BackgroundGradient({ children, className, ...props }: BackgroundGradientProps) {
  return (
    <div
      className={cn(
        'relative inline-flex rounded-xl p-[1px] bg-gradient-to-br from-primary/20 via-orange-400/10 to-sky-500/20',
        className
      )}
      {...props}
    >
      <div className="relative rounded-[10px] bg-card inset-0">
        {children}
      </div>
    </div>
  );
}

