import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/page-header';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Search, Terminal, RefreshCw, Filter, Shield, AlertCircle } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  category: 'content' | 'seo' | 'form' | 'system';
  level: 'info' | 'warning' | 'critical';
  details: string;
}

export default function WebLogsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', timestamp: '2026-07-07 11:32:15', action: 'Blog Yazısı Güncellendi', user: 'halidcoskun@gmail.com', category: 'content', level: 'info', details: 'Bortesoft SaaS Altyapısı yayına alındı yazısı güncellendi.' },
    { id: '2', timestamp: '2026-07-07 11:28:44', action: 'SEO Meta Etiketi Eklendi', user: 'halidcoskun@gmail.com', category: 'seo', level: 'info', details: 'Landing page description etiketi optimize edildi.' },
    { id: '3', timestamp: '2026-07-07 10:15:02', action: 'Yeni Form Yanıtı Alındı', user: 'Sistem', category: 'form', level: 'info', details: 'İletişim formundan "Müşteri Demosu" talebi düştü.' },
    { id: '4', timestamp: '2026-07-07 09:44:11', action: 'Yetkisiz API Giriş Denemesi', user: 'Bilinmeyen (IP: 85.105.42.12)', category: 'system', level: 'warning', details: 'Önbellek temizleme API noktasına geçersiz token gönderildi.' },
    { id: '5', timestamp: '2026-07-06 18:22:30', action: 'Footer Menüsü Değiştirildi', user: 'halidcoskun@gmail.com', category: 'content', level: 'info', details: 'Hızlı erişim linklerine "KVKK Aydınlatma Metni" eklendi.' },
    { id: '6', timestamp: '2026-07-06 15:40:00', action: 'Sistem Kritik Hatası Çözüldü', user: 'Sistem', category: 'system', level: 'critical', details: 'Medya sunucusu disk kotası aşımı otonom temizleme ile giderildi.' },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // Inject a new log entry
      const now = new Date();
      const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      const newLog: LogEntry = {
        id: String(Date.now()),
        timestamp: timeStr,
        action: 'Web Tanılama İsteği',
        user: 'admin@bortesoft.com',
        category: 'system',
        level: 'info',
        details: 'Arayüz ve sunucu modülleri başarıyla doğrulandı.'
      };
      setLogs(prev => [newLog, ...prev]);
    }, 600);
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(search.toLowerCase()) || 
                          log.details.toLowerCase().includes(search.toLowerCase()) ||
                          log.user.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-24 max-w-7xl mx-auto space-y-12 animate-fade-in px-6">
      <PageHeader
        title="Web Log Kayıtları"
        description="Landing page, form yanıtları, SEO düzenlemeleri ve içerik yönetim hareketlerinin gerçek zamanlı denetim günlüğü."
        actions={
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={refreshing}
            className="gap-2 border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-semibold shadow-sm"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-zinc-500 ${refreshing ? 'animate-spin' : ''}`} />
            Güncelle
          </Button>
        }
      />

      {/* Control Panel */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Loglarda ara (örn. SEO, Blog, Hata)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all bg-white"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', 'content', 'seo', 'form', 'system'].map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'primary' : 'outline'}
              size="xs"
              onClick={() => setSelectedCategory(cat)}
              className="text-xs capitalize font-semibold"
            >
              {cat === 'all' ? 'Tümü' : cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Audit Log Terminal Grid */}
      <Card className="border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/50">
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider pl-6">Zaman Damgası</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Aksiyon / İşlem</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Kategori</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Kullanıcı</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Önem Derecesi</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider pr-6">Detaylar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-sans text-sm">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-zinc-50/40 transition-colors">
                    <td className="p-4 pl-6 font-mono text-xs text-zinc-400 font-medium whitespace-nowrap">{log.timestamp}</td>
                    <td className="p-4 font-semibold text-zinc-900">{log.action}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-600">
                        {log.category}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-500 font-medium">{log.user}</td>
                    <td className="p-4">
                      <Badge variant={log.level === 'critical' ? 'danger' : log.level === 'warning' ? 'warning' : 'success'}>
                        {log.level.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4 text-zinc-500 max-w-xs truncate pr-6 font-medium" title={log.details}>
                      {log.details}
                    </td>
                  </tr>
                ))}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-zinc-400">
                      <Terminal className="h-8 w-8 mx-auto text-zinc-300 mb-3" />
                      Aranan kriterlere uygun log kaydı bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
