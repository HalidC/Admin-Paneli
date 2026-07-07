import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps {
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  children?: React.ReactNode;
  className?: string;
}

export function Badge({ className, variant = 'neutral', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium tracking-wide',
        {
          'bg-slate-100 text-slate-700': variant === 'neutral',
          'bg-emerald-50 text-emerald-700 border border-emerald-100/40': variant === 'success',
          'bg-amber-50 text-amber-700 border border-amber-100/40': variant === 'warning',
          'bg-rose-50 text-rose-700 border border-rose-100/40': variant === 'danger',
          'bg-indigo-50 text-indigo-700 border border-indigo-100/40': variant === 'info',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
