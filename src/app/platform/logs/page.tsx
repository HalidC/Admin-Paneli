import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/page-header';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Search, Terminal, RefreshCw, Database, Server, Key } from 'lucide-react';

interface PlatformLogEntry {
  id: string;
  timestamp: string;
  service: 'Database' | 'DockerGateway' | 'AuthService' | 'Backups';
  message: string;
  level: 'info' | 'warning' | 'critical';
  node: string;
}

export default function PlatformLogsPage() {
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [logs, setLogs] = useState<PlatformLogEntry[]>([
    { id: 'p-log-1', timestamp: '2026-07-07 11:34:02', service: 'Database', message: 'Drizzle ORM veritabanı şeması ve migrasyonu otonom uygulandı.', level: 'info', node: 'node-db-01' },
    { id: 'p-log-2', timestamp: '2026-07-07 11:12:44', service: 'DockerGateway', message: 'Rolling Restart tetiklendi. 4 adet konteyner sıfır kesintiyle yenilendi.', level: 'info', node: 'node-k8s-03' },
    { id: 'p-log-3', timestamp: '2026-07-07 09:40:00', service: 'Backups', message: 'Günlük PostgreSQL yedekleme arşivi (bortesoft-backup-20260707.sql.gz) Cloud Storage üzerine yüklendi.', level: 'info', node: 'node-backup-01' },
    { id: 'p-log-4', timestamp: '2026-07-07 08:15:33', service: 'AuthService', message: 'Let\'s Encrypt otonom SSL yenileme başarıyla tamamlandı.', level: 'info', node: 'node-k8s-01' },
    { id: 'p-log-5', timestamp: '2026-07-06 23:55:12', service: 'Database', message: 'Bağlantı Havuzu (Pool) doluluk oranı sınır değer olan %85 düzeyine ulaştı.', level: 'warning', node: 'node-db-02' },
    { id: 'p-log-6', timestamp: '2026-07-06 14:22:11', service: 'AuthService', message: 'Yetkisiz JWT imzalama isteği reddedildi.', level: 'warning', node: 'node-k8s-01' },
    { id: 'p-log-7', timestamp: '2026-07-05 18:30:00', service: 'Database', message: 'Replika veri tabanında (Replica-02) senkronizasyon kaybı tespit edildi, otonom düzeltildi.', level: 'critical', node: 'node-db-03' }
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      const now = new Date();
      const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      const newLog: PlatformLogEntry = {
        id: String(Date.now()),
        timestamp: timeStr,
        service: 'DockerGateway',
        message: 'Ağ Geçidi istek denetimi ve API limitleri doğrulandı.',
        level: 'info',
        node: 'node-k8s-02'
      };
      setLogs(prev => [newLog, ...prev]);
    }, 600);
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase()) || 
                          log.service.toLowerCase().includes(search.toLowerCase()) ||
                          log.node.toLowerCase().includes(search.toLowerCase());
    const matchesService = selectedService === 'all' || log.service === selectedService;
    return matchesSearch && matchesService;
  });

  return (
    <div className="py-24 max-w-7xl mx-auto space-y-12 animate-fade-in px-6">
      <PageHeader
        title="Platform Log Kayıtları"
        description="SaaS altyapı hizmetleri, Docker konteynerleri, veritabanı replikasyonları ve arka plan yedekleme otonomlarının sistem denetim konsolu."
        actions={
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={refreshing}
            className="gap-2 border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-semibold shadow-sm"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-zinc-500 ${refreshing ? 'animate-spin' : ''}`} />
            Sistemi Güncelle
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Altyapı mesajlarında ara (Docker, SSL, DB)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-white transition-all"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', 'Database', 'DockerGateway', 'AuthService', 'Backups'].map((srv) => (
            <Button
              key={srv}
              variant={selectedService === srv ? 'primary' : 'outline'}
              size="xs"
              onClick={() => setSelectedService(srv)}
              className="text-xs font-semibold"
            >
              {srv === 'all' ? 'Tüm Servisler' : srv}
            </Button>
          ))}
        </div>
      </div>

      <Card className="border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/50">
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider pl-6">Zaman Damgası</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Mikroservis / Modül</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Sistem Mesajı</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Sunucu Düğümü (Node)</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider pr-6">Durum Seviyesi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-sans text-sm">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-zinc-50/40 transition-colors">
                    <td className="p-4 pl-6 font-mono text-xs text-zinc-400 font-medium whitespace-nowrap">{log.timestamp}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-700">
                        {log.service === 'Database' && <Database className="h-3 w-3 text-indigo-500" />}
                        {log.service === 'DockerGateway' && <Server className="h-3 w-3 text-indigo-500" />}
                        {log.service === 'AuthService' && <Key className="h-3 w-3 text-indigo-500" />}
                        {log.service}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-zinc-900 leading-normal max-w-md">{log.message}</td>
                    <td className="p-4 font-mono text-xs text-zinc-400 font-bold">{log.node}</td>
                    <td className="p-4 pr-6">
                      <Badge variant={log.level === 'critical' ? 'danger' : log.level === 'warning' ? 'warning' : 'success'}>
                        {log.level.toUpperCase()}
                      </Badge>
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
