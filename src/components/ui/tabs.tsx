import React from 'react';
import { cn } from '../../lib/utils';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex border-b border-slate-200/80 gap-6 overflow-x-auto', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'pb-3 pt-1 text-sm font-medium border-b-2 border-transparent text-slate-500 transition-all relative hover:text-slate-900 focus:outline-none cursor-pointer whitespace-nowrap',
              isActive && 'border-indigo-600 text-indigo-600 font-semibold'
            )}
          >
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={cn(
                  'ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold',
                  isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
