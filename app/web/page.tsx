"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import WebManagementPage from '@/features/web/web-management-page';

export default function Page() {
  const router = useRouter();
  
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return <WebManagementPage onNavigate={handleNavigate} />;
}
