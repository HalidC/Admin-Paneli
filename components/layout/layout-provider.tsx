"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AdminShell } from './admin-shell';

interface LayoutProviderProps {
  children: React.ReactNode;
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <AdminShell currentPath={pathname || '/'} onNavigate={handleNavigate}>
      {children}
    </AdminShell>
  );
}
