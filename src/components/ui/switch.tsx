import React from 'react';
import { cn } from '../../lib/utils';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function Switch({ checked, onChange, disabled = false, label, className }: SwitchProps) {
  return (
    <label className={cn('inline-flex items-center gap-2.5 cursor-pointer select-none', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={cn(
            'w-9 h-5 bg-slate-200 rounded-full transition-colors duration-200 ease-in-out',
            checked && 'bg-indigo-600'
          )}
        />
        <div
          className={cn(
            'absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out shadow-[0_1px_3px_rgba(0,0,0,0.1)]',
            checked && 'transform translate-x-4'
          )}
        />
      </div>
      {label && <span className="text-sm font-medium text-zinc-700 tracking-tight">{label}</span>}
    </label>
  );
}
