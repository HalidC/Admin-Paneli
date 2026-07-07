import React from 'react';
import { AdminSidebar } from './admin-sidebar';
import { AdminTopbar } from './admin-topbar';

interface AdminShellProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export function AdminShell({ currentPath, onNavigate, children }: AdminShellProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Sidebar navigation */}
      <AdminSidebar currentPath={currentPath} onNavigate={onNavigate} />

      {/* Main container view */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top bar controls */}
        <AdminTopbar currentPath={currentPath} onNavigate={onNavigate} />

        {/* Content body with custom responsive spacing */}
        <main className="flex-1 overflow-y-auto px-8 py-10 lg:px-12 lg:py-12 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
