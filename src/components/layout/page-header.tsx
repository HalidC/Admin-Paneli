import React from 'react';
import { cn } from '../../lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-center md:justify-between pb-8 border-b border-slate-200/50 mb-10', className)}>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-slate-500 mt-1.5 font-normal tracking-tight">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          {actions}
        </div>
      )}
    </div>
  );
}
