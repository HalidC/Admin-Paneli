import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/page-header';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Package, Plus, DollarSign, Check, Activity, ShieldCheck } from 'lucide-react';

interface SaaSPlan {
  id: string;
  name: string;
  priceMonthly: number;
  maxUsers: number;
  storageGb: number;
  apiLimitPerMin: number;
  isActive: boolean;
  features: string[];
}

export default function PackagesPage() {
  const [plans, setPlans] = useState<SaaSPlan[]>([
    { id: 'p-1', name: 'Starter Plan', priceMonthly: 49, maxUsers: 5, storageGb: 10, apiLimitPerMin: 100, isActive: true, features: ['Temel Landing Page', 'İletişim Formları', 'Haftalık Raporlama'] },
    { id: 'p-2', name: 'Growth Plan', priceMonthly: 149, maxUsers: 25, storageGb: 50, apiLimitPerMin: 500, isActive: true, features: ['Gelişmiş Landing Editörü', 'Çoklu Dil Desteği', 'Aylık SEO Optimizasyonu', 'Özel Domain Entegrasyonu'] },
    { id: 'p-3', name: 'Scale Plan', priceMonthly: 399, maxUsers: 100, storageGb: 200, apiLimitPerMin: 2000, isActive: true, features: ['Tüm Growth Özellikleri', 'Özel API Entegrasyonları', 'Sınırsız Blog & SSS Yazarı', '7/24 Teknik Destek Hattı'] },
    { id: 'p-4', name: 'Enterprise Core', priceMonthly: 1299, maxUsers: 1000, storageGb: 2048, apiLimitPerMin: 10000, isActive: false, features: ['Kişiselleştirilmiş Altyapı', 'Dedicated DB Sunucuları', 'SLA Garantisi (%99.99)', 'Özel Başarı Temsilcisi'] }
  ]);

  const handleTogglePlan = (id: string) => {
    setPlans(plans.map(p => {
      if (p.id === id) {
        return { ...p, isActive: !p.isActive };
      }
      return p;
    }));
  };

  const handleUpdatePrice = (id: string, newPrice: string) => {
    const val = Number(newPrice);
    if (isNaN(val)) return;
    setPlans(plans.map(p => {
      if (p.id === id) {
        return { ...p, priceMonthly: val };
      }
      return p;
    }));
  };

  return (
    <div className="py-24 max-w-7xl mx-auto space-y-12 animate-fade-in px-6">
      <PageHeader
        title="Paket / Modül Yönetimi"
        description="Müşteri firmalara (tenantlara) satışı yapılan SaaS lisans paketleri, fiyat politikaları, API ve disk depolama kotası sınırları."
        actions={
          <Button 
            variant="primary" 
            size="sm" 
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md"
            onClick={() => {
              const name = prompt('Yeni paket adı:');
              if (!name) return;
              const price = prompt('Aylık ücret (USD):');
              if (!price) return;
              const newPlan: SaaSPlan = {
                id: `p-${Date.now()}`,
                name,
                priceMonthly: Number(price) || 99,
                maxUsers: 10,
                storageGb: 25,
                apiLimitPerMin: 250,
                isActive: true,
                features: ['Temel Özellikler']
              };
              setPlans([...plans, newPlan]);
            }}
          >
            <Plus className="h-4 w-4" />
            Yeni Paket Eklentisi
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.025)] transition-all duration-300 bg-white flex flex-col justify-between">
            <CardContent className="p-6 space-y-6 flex-1 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-zinc-700">
                    <Package className="h-4 w-4 text-indigo-500" />
                  </div>
                  <Switch
                    checked={plan.isActive}
                    onChange={() => handleTogglePlan(plan.id)}
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-zinc-900 tracking-tight">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-1.5">
                    <span className="text-xs font-bold text-zinc-400">$</span>
                    <input
                      type="number"
                      value={plan.priceMonthly}
                      onChange={(e) => handleUpdatePrice(plan.id, e.target.value)}
                      className="text-2xl font-extrabold text-zinc-900 tracking-tight bg-transparent border-b border-dashed border-zinc-200 focus:outline-none focus:border-indigo-500 w-20 px-1 py-0"
                    />
                    <span className="text-xs font-semibold text-zinc-400">/aylık</span>
                  </div>
                </div>

                <div className="h-[1px] bg-zinc-100 my-4" />

                <div className="space-y-2.5">
                  <div className="flex justify-between text-xs text-zinc-500 font-medium">
                    <span>Maks. Kullanıcı:</span>
                    <strong className="text-zinc-800">{plan.maxUsers}</strong>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500 font-medium">
                    <span>Depolama Kotası:</span>
                    <strong className="text-zinc-800">{plan.storageGb} GB</strong>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500 font-medium">
                    <span>API Limiti / dk:</span>
                    <strong className="text-zinc-800">{plan.apiLimitPerMin} req</strong>
                  </div>
                </div>

                <div className="h-[1px] bg-zinc-100 my-4" />

                <ul className="space-y-2">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 font-medium">
                      <Check className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-auto">
                <Button variant={plan.isActive ? 'primary' : 'outline'} size="xs" className="w-full text-xs font-bold py-2">
                  {plan.isActive ? 'Satışa Açık' : 'Satışa Kapalı'}
                </Button>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
