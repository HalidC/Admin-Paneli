import React from 'react';
import { PageHeader } from '../../components/layout/page-header';
import { Cpu, ArrowRight } from 'lucide-react';

export default function Page() {
  return (
    <div className="py-24 max-w-7xl mx-auto space-y-12 animate-fade-in">
      <PageHeader
        title="Platform Yönetimi"
        description="Bortesoft SaaS altyapı mimarisi ve otonom sistemlerinin yönetim paneli."
      />

      <div className="flex flex-col items-center justify-center border border-dashed border-zinc-200 bg-zinc-50/30 rounded-2xl py-32 px-6 text-center shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
        <div className="p-4 bg-white border border-zinc-100 rounded-2xl text-zinc-400 shadow-[0_4px_12px_rgb(0,0,0,0.02)] mb-6">
          <Cpu className="h-8 w-8 text-indigo-500 animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-zinc-900 tracking-tight">Sistem Katmanına Hoş Geldiniz</h3>
        <p className="text-sm text-zinc-400 max-w-md mt-2">
          Platform ayarları, sistem sağlığı ve otonom ajanları yönetmek için lütfen yan menüden bir servis veya panel seçiniz.
        </p>
      </div>
    </div>
  );
}
