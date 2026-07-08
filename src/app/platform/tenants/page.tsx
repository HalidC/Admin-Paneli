import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/page-header';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Search, Building2, Plus, RefreshCw, Mail, Sliders } from 'lucide-react';

interface Tenant {
  id: string;
  name: string;
  domain: string;
  plan: 'Growth' | 'Enterprise' | 'Scale' | 'Starter';
  status: 'active' | 'suspended';
  dbUsage: string;
  userCount: number;
  joinedAt: string;
}

export default function TenantsPage() {
  const [search, setSearch] = useState('');
  const [tenants, setTenants] = useState<Tenant[]>([
    { id: 't-1', name: 'Borte Corp Inc.', domain: 'bortecorp.bortesoft.com', plan: 'Enterprise', status: 'active', dbUsage: '4.2 GB', userCount: 420, joinedAt: '12.01.2026' },
    { id: 't-2', name: 'Zeta Teknoloji', domain: 'zetatek.bortesoft.com', plan: 'Growth', status: 'active', dbUsage: '1.8 GB', userCount: 88, joinedAt: '03.03.2026' },
    { id: 't-3', name: 'Apex Global Lojistik', domain: 'apex.bortesoft.com', plan: 'Scale', status: 'active', dbUsage: '840 MB', userCount: 24, joinedAt: '18.04.2026' },
    { id: 't-4', name: 'Novasoft Yazılım', domain: 'novasoft.bortesoft.com', plan: 'Starter', status: 'suspended', dbUsage: '120 MB', userCount: 5, joinedAt: '22.05.2026' }
  ]);

  const handleToggleStatus = (id: string) => {
    setTenants(tenants.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'active' ? 'suspended' : 'active' };
      }
      return t;
    }));
  };

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.domain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-24 max-w-7xl mx-auto space-y-12 animate-fade-in px-6">
      <PageHeader
        title="Firmalar / Tenantlar"
        description="Bortesoft SaaS altyapısını kullanan çoklu kiracı (multi-tenant) şirket veri tabanları, lisans durumları ve kota limitleri."
        actions={
          <Button 
            variant="primary" 
            size="sm" 
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md"
            onClick={() => {
              const newTenant: Tenant = {
                id: `t-${Date.now()}`,
                name: prompt('Yeni firma ismi giriniz:') || 'Yeni Tenant',
                domain: 'yeni-tenant.bortesoft.com',
                plan: 'Growth',
                status: 'active',
                dbUsage: '0 MB',
                userCount: 1,
                joinedAt: new Date().toLocaleDateString('tr-TR')
              };
              setTenants([newTenant, ...tenants]);
            }}
          >
            <Plus className="h-4 w-4" />
            Firma Ekle
          </Button>
        }
      />

      <div className="flex gap-4 items-center max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Firma adına veya alt domaine göre ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-white transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className="border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.025)] transition-all duration-300 bg-white">
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-xl text-zinc-700">
                    <Building2 className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 tracking-tight text-base">{tenant.name}</h3>
                    <p className="text-xs text-zinc-400 font-medium mt-0.5">{tenant.domain}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={tenant.plan === 'Enterprise' ? 'success' : 'neutral'} className="text-[10px] tracking-wide font-bold">
                    {tenant.plan.toUpperCase()}
                  </Badge>
                  <Switch
                    checked={tenant.status === 'active'}
                    onChange={() => handleToggleStatus(tenant.id)}
                  />
                </div>
              </div>

              <div className="h-[1px] bg-zinc-100" />

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Veri Depolama</span>
                  <span className="text-sm font-mono font-extrabold text-zinc-800 block">{tenant.dbUsage}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Aktif Kullanıcı</span>
                  <span className="text-sm font-mono font-extrabold text-zinc-800 block">{tenant.userCount}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Katılım Tarihi</span>
                  <span className="text-sm font-mono font-extrabold text-zinc-800 block">{tenant.joinedAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
