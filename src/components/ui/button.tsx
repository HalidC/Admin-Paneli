import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
          // Size
          {
            'px-2.5 py-1.5 text-xs': size === 'xs',
            'px-3.5 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-sm': size === 'md',
            'px-5 py-2.5 text-sm font-semibold': size === 'lg',
          },
          // Variant
          {
            'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-100':
              variant === 'primary',
            'bg-slate-100 text-slate-800 hover:bg-slate-200': variant === 'secondary',
            'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-[0_1px_2px_rgba(0,0,0,0.02)]':
              variant === 'outline',
            'text-slate-600 hover:bg-slate-100': variant === 'ghost',
            'bg-rose-500 text-white hover:bg-rose-600 shadow-[0_1px_2px_rgba(239,68,68,0.2)]':
              variant === 'danger',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
