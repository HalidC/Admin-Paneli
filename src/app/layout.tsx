import React from 'react';
import { AdminShell } from '../components/layout/admin-shell';

interface LayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export default function Layout({ currentPath, onNavigate, children }: LayoutProps) {
  return (
    <AdminShell currentPath={currentPath} onNavigate={onNavigate}>
      {children}
    </AdminShell>
  );
}
