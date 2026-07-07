import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps {
  hoverable?: boolean;
  children?: React.ReactNode;
  className?: string;
  key?: any;
  onClick?: () => void;
}

export function Card({ className, hoverable = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300',
        hoverable && 'hover:border-slate-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)] hover:translate-y-[-1px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn('px-6 py-5 border-b border-slate-100', className)} {...props}>
      {children}
    </div>
  );
}

export interface CardTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3 className={cn('text-base font-semibold text-slate-900 tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
}

export interface CardDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardDescription({ className, children, ...props }: CardDescriptionProps) {
  return (
    <p className={cn('text-xs text-slate-500 mt-1', className)} {...props}>
      {children}
    </p>
  );
}

export interface CardContentProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  );
}

export interface CardFooterProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div className={cn('px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3', className)} {...props}>
      {children}
    </div>
  );
}
