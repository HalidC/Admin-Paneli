import React from 'react';
import { LayoutProvider } from '@/components/layout/layout-provider';
import './globals.css';

export const metadata = {
  title: 'Bortesoft Admin Panel',
  description: 'Bortesoft SaaS platformunun genel durumu, büyüme oranları ve güncel aktiviteleri.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased">
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </body>
    </html>
  );
}
