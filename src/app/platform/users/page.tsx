import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/page-header';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Search, Users, Plus, Mail, ShieldAlert } from 'lucide-react';

interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: 'SuperAdmin' | 'PlatformManager' | 'TenantAdmin' | 'Developer';
  company: string;
  status: 'active' | 'suspended';
  lastActive: string;
}

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<PlatformUser[]>([
    { id: 'u-1', name: 'Halid Coşkun', email: 'halidcoskun@gmail.com', role: 'SuperAdmin', company: 'Bortesoft (Platform Sahibi)', status: 'active', lastActive: 'Az önce' },
    { id: 'u-2', name: 'Merve Demir', email: 'merve.demir@bortesoft.com', role: 'PlatformManager', company: 'Bortesoft (Platform Sahibi)', status: 'active', lastActive: '12 dk önce' },
    { id: 'u-3', name: 'Selin Yılmaz', email: 'selin.yilmaz@bortecorp.com', role: 'TenantAdmin', company: 'Borte Corp Inc.', status: 'active', lastActive: '2 saat önce' },
    { id: 'u-4', name: 'Caner Özcan', email: 'caner@zetatek.com', role: 'Developer', company: 'Zeta Teknoloji', status: 'suspended', lastActive: '3 gün önce' }
  ]);

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
      }
      return u;
    }));
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-24 max-w-7xl mx-auto space-y-12 animate-fade-in px-6">
      <PageHeader
        title="Kullanıcılar"
        description="SaaS sistemi genelindeki platform yöneticileri, destek personeli ve kiracı (tenant) hesap sahiplerinin yekpare yönetim paneli."
        actions={
          <Button 
            variant="primary" 
            size="sm" 
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md"
            onClick={() => {
              const name = prompt('Kullanıcı adı giriniz:');
              if (!name) return;
              const email = prompt('E-posta adresi giriniz:');
              if (!email) return;
              const newUser: PlatformUser = {
                id: `u-${Date.now()}`,
                name,
                email,
                role: 'TenantAdmin',
                company: 'Yeni Tenant Şirketi',
                status: 'active',
                lastActive: 'Davet edildi'
              };
              setUsers([newUser, ...users]);
            }}
          >
            <Plus className="h-4 w-4" />
            Kullanıcı Davet Et
          </Button>
        }
      />

      <div className="flex gap-4 items-center max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Kullanıcı adı, e-posta veya şirkete göre ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-white transition-all"
          />
        </div>
      </div>

      <Card className="border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/50">
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider pl-6">Kullanıcı Profil</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Rol / Yetki Derecesi</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Bağlı Firma</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Hesap Durumu</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Son Görülme</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider pr-6 text-right">Düzenle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-sans text-sm">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-50/40 transition-colors">
                    <td className="p-4 pl-6 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center font-bold text-zinc-600 text-xs shadow-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 tracking-tight leading-none">{user.name}</h4>
                        <span className="text-xs text-zinc-400 font-medium mt-1 inline-block">{user.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        user.role === 'SuperAdmin' ? 'bg-indigo-50 text-indigo-700' :
                        user.role === 'PlatformManager' ? 'bg-emerald-50 text-emerald-700' :
                        user.role === 'TenantAdmin' ? 'bg-zinc-100 text-zinc-700' : 'bg-zinc-50 text-zinc-500'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-zinc-600">{user.company}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Badge variant={user.status === 'active' ? 'success' : 'neutral'} className="text-[10px]">
                          {user.status === 'active' ? 'AKTİF' : 'DEVRE DIŞI'}
                        </Badge>
                        <Switch
                          checked={user.status === 'active'}
                          onChange={() => handleToggleStatus(user.id)}
                        />
                      </div>
                    </td>
                    <td className="p-4 font-mono text-xs text-zinc-400 font-medium">{user.lastActive}</td>
                    <td className="p-4 pr-6 text-right">
                      <Button variant="outline" size="xs" className="text-xs border-zinc-200">
                        Seçenekler
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
