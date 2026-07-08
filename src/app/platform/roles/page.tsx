import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/page-header';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { ShieldCheck, Plus, Lock, Key, Server, Users } from 'lucide-react';

interface RolePermissions {
  id: string;
  name: string;
  description: string;
  usersAssigned: number;
  canManageTenants: boolean;
  canManageUsers: boolean;
  canAccessBilling: boolean;
  canEditTheme: boolean;
  canAccessApi: boolean;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<RolePermissions[]>([
    { id: 'r-1', name: 'Sistem Yöneticisi (SuperAdmin)', description: 'Tüm sistem altyapısı, tenant veri tabanları ve platform ayarları üzerinde mutlak kontrol sahibi rol.', usersAssigned: 2, canManageTenants: true, canManageUsers: true, canAccessBilling: true, canEditTheme: true, canAccessApi: true },
    { id: 'r-2', name: 'Platform Müdürü (PlatformManager)', description: 'Yeni kiracı kurulumu yapabilen, müşteri destek süreçlerini yöneten ve faturalandırmaları denetleyen rol.', usersAssigned: 5, canManageTenants: true, canManageUsers: true, canAccessBilling: true, canEditTheme: false, canAccessApi: true },
    { id: 'r-3', name: 'Müşteri Admini (TenantAdmin)', description: 'Sadece kendi firmasının (tenant) kullanıcı yetkilerini, veritabanı ayarlarını ve form yanıtlarını yöneten rol.', usersAssigned: 42, canManageTenants: false, canManageUsers: true, canAccessAccess: true, canAccessBilling: true, canEditTheme: true, canAccessApi: false },
    { id: 'r-4', name: 'Müşteri Destek (Support)', description: 'Kendi firmasının verilerine sadece okuma (Read-Only) erişimi olan ve sorun biletleri oluşturan destek rolü.', usersAssigned: 120, canManageTenants: false, canManageUsers: false, canAccessBilling: false, canEditTheme: false, canAccessApi: false }
  ]);

  const handleTogglePerm = (roleId: string, permKey: keyof Omit<RolePermissions, 'id' | 'name' | 'description' | 'usersAssigned'>) => {
    setRoles(roles.map(r => {
      if (r.id === roleId) {
        return { ...r, [permKey]: !r[permKey] };
      }
      return r;
    }));
  };

  return (
    <div className="py-24 max-w-7xl mx-auto space-y-12 animate-fade-in px-6">
      <PageHeader
        title="Roller / Yetkiler"
        description="SaaS altyapısı genelinde farklı rollerin platform yetkilerini (Read, Write, Manage, Delete) tanımlayın ve sınırlandırın."
        actions={
          <Button 
            variant="primary" 
            size="sm" 
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md"
            onClick={() => {
              const name = prompt('Yeni rol adı giriniz:');
              if (!name) return;
              const description = prompt('Rol açıklamasını yazınız:');
              if (!description) return;
              const newRole: RolePermissions = {
                id: `r-${Date.now()}`,
                name,
                description,
                usersAssigned: 0,
                canManageTenants: false,
                canManageUsers: false,
                canAccessBilling: false,
                canEditTheme: false,
                canAccessApi: false
              };
              setRoles([...roles, newRole]);
            }}
          >
            <Plus className="h-4 w-4" />
            Rol Tanımla
          </Button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {roles.map((role) => (
          <Card key={role.id} className="border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)] bg-white">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-base font-bold text-zinc-900 tracking-tight flex items-center gap-2">
                    <ShieldCheck className="h-4.5 w-4.5 text-indigo-500" />
                    {role.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-400 max-w-md font-medium leading-relaxed">
                    {role.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Users className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="text-xs font-mono font-bold text-zinc-600">{role.usersAssigned} Kullanıcı</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="h-[1px] bg-zinc-100" />
              
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                      <Server className="h-3.5 w-3.5 text-zinc-400" />
                      Tenant / Firma Yönetimi
                    </span>
                    <span className="text-[10px] text-zinc-400 font-semibold block">Yeni firma veri tabanı oluşturma, duraklatma veya silme.</span>
                  </div>
                  <Switch
                    checked={role.canManageTenants}
                    onChange={() => handleTogglePerm(role.id, 'canManageTenants')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-zinc-400" />
                      Kullanıcı Yönetimi
                    </span>
                    <span className="text-[10px] text-zinc-400 font-semibold block">Sistem genelindeki kullanıcıları silme, ekleme veya yetki verme.</span>
                  </div>
                  <Switch
                    checked={role.canManageUsers}
                    onChange={() => handleTogglePerm(role.id, 'canManageUsers')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-zinc-400" />
                      Faturalandırma & Ödeme Kontrolü
                    </span>
                    <span className="text-[10px] text-zinc-400 font-semibold block">Abonelik ücretleri, faturalar ve finansal veri havuzuna erişim.</span>
                  </div>
                  <Switch
                    checked={role.canAccessBilling}
                    onChange={() => handleTogglePerm(role.id, 'canAccessBilling')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                      <Key className="h-3.5 w-3.5 text-zinc-400" />
                      Gelişmiş API Anahtarları
                    </span>
                    <span className="text-[10px] text-zinc-400 font-semibold block">Dış servis entegrasyonu ve API anahtarı (Secret Keys) oluşturma yetkisi.</span>
                  </div>
                  <Switch
                    checked={role.canAccessApi}
                    onChange={() => handleTogglePerm(role.id, 'canAccessApi')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
