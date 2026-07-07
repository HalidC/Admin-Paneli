import React from 'react';
import WebManagementPage from '../../features/web/web-management-page';

interface PageProps {
  onNavigate: (path: string) => void;
}

export default function Page({ onNavigate }: PageProps) {
  return <WebManagementPage onNavigate={onNavigate} />;
}
