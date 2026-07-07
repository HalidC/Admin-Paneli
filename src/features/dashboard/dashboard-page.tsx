import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../lib/services/dashboard-service';
import { DashboardStats, ActivityLog } from '../../types/admin';
import { mockDemoRecords } from '../../lib/mock-data/demo-records';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { PageHeader } from '../../components/layout/page-header';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { 
  Users, 
  Layers, 
  FileText, 
  Calendar, 
  Activity, 
  RefreshCw, 
  Clock, 
  ArrowUpRight, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  FilePlus2, 
  Globe, 
  Settings,
  Bell,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState('');

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [s, a] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getActivityLogs(),
      ]);
      setStats(s);
      setActivities(a);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handlePublishNow = () => {
    setPublishing(true);
    setPublishMessage('Değişiklikler derleniyor ve CDN önbelleği temizleniyor...');
    setTimeout(() => {
      setPublishing(false);
      setPublishMessage('Başarıyla yayınlandı! Bortesoft canlı ortamı güncellendi.');
      if (stats) {
        setStats({
          ...stats,
          lastPublishDate: new Date().toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }) + ' ' + new Date().toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
          })
        });
      }
      setTimeout(() => setPublishMessage(''), 4000);
    }, 2000);
  };

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-6 w-6 animate-spin text-indigo-600" />
          <span className="text-sm text-slate-500">Gösterge paneli yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Yönetim Paneli"
        description="Bortesoft SaaS altyapısı, demo kayıtları, içerik güncelleme durumu ve sistem kararlılığı."
        actions={
          <Button variant="outline" size="sm" onClick={fetchDashboardData} className="gap-2">
            <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
            Yenile
          </Button>
        }
      />

      {/* Bortesoft Focus KPI Grid (8 Metrics) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Total Demos */}
        <Card className="border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Toplam Demo Kaydı</span>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{stats.totalDemoCount}</h2>
              <p className="text-xs text-slate-400 mt-1.5 font-medium">Sisteme kayıtlı tüm talepler</p>
            </div>
          </CardContent>
        </Card>

        {/* New Demos */}
        <Card className="border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Yeni Demo Kaydı</span>
              <div className="p-2 bg-emerald-50/50 border border-emerald-100/30 rounded-lg text-emerald-600">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{stats.newDemoCount}</h2>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Badge variant="success">YENİ</Badge>
                <span className="text-xs text-slate-400 font-medium">Değerlendirilmeyi bekleyen</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Landing Sections */}
        <Card className="border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Yayındaki Bölüm</span>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                <Layers className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{stats.activeLandingSectionCount} <span className="text-xs font-normal text-slate-400">/ 9</span></h2>
              <p className="text-xs text-slate-400 mt-1.5 font-medium">Bortesoft gerçek bileşenleri</p>
            </div>
          </CardContent>
        </Card>

        {/* Draft Contents */}
        <Card className="border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Taslak İçerik Sayısı</span>
              <div className="p-2 bg-amber-50/50 border border-amber-100/30 rounded-lg text-amber-600">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{stats.draftContentCount}</h2>
              <p className="text-xs text-slate-400 mt-1.5 font-medium">Yayına alınmayı bekleyen taslaklar</p>
            </div>
          </CardContent>
        </Card>

        {/* Active Blog Posts */}
        <Card className="border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Yayındaki Blog Yazısı</span>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                <FileText className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{stats.activeBlogPostCount}</h2>
              <p className="text-xs text-slate-400 mt-1.5 font-medium">Aktif okuyucu trafiği çeken makaleler</p>
            </div>
          </CardContent>
        </Card>

        {/* Form Submissions (7 Days) */}
        <Card className="border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Son 7 Günlük Form</span>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{stats.recentFormSubmissions7Days}</h2>
              <p className="text-xs text-slate-400 mt-1.5 font-medium">Gelen iletişim ve destek formları</p>
            </div>
          </CardContent>
        </Card>

        {/* Last Publish Date */}
        <Card className="border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Son Yayınlama Tarihi</span>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                <Calendar className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-bold text-slate-950 tracking-tight mt-1 truncate">{stats.lastPublishDate}</h2>
              <p className="text-xs text-slate-400 mt-3 font-medium">CDN en son ne zaman güncellendi</p>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sistem Durumu</span>
              <div className="p-2 bg-emerald-50/50 border border-emerald-100/30 rounded-lg text-emerald-600">
                <Activity className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-ping" />
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Erişilebilir</h2>
              </div>
              <p className="text-xs text-slate-400 mt-3.5 font-medium">Tüm mikroservisler kararlı (%99.98)</p>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Main Layout Area for Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Son Demo Kayıtları & Son İçerik Güncellemeleri */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Son Demo Kayıtları */}
          <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 tracking-tight">Son Demo Kayıtları</CardTitle>
                  <CardDescription className="text-xs text-slate-400">Bortesoft platformu için en son demo talep eden kurumsal yöneticiler.</CardDescription>
                </div>
                <Users className="h-4 w-4 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="divide-y divide-slate-100">
                {mockDemoRecords.slice(0, 3).map((demo) => {
                  const getStatusBadge = (s: typeof demo.status) => {
                    switch (s) {
                      case 'pending': return <Badge variant="danger">Bekliyor</Badge>;
                      case 'scheduled': return <Badge variant="info">Planlandı</Badge>;
                      case 'completed': return <Badge variant="success">Tamamlandı</Badge>;
                      default: return <Badge variant="neutral">İptal</Badge>;
                    }
                  };
                  return (
                    <div key={demo.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                          {demo.fullName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-800">{demo.fullName}</span>
                            <span className="text-xs text-slate-400">• {demo.companyName} ({demo.companySize})</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 font-medium">{demo.email}</p>
                          {demo.notes && (
                            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 italic font-normal">"{demo.notes}"</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <Badge variant="neutral" className="uppercase font-semibold text-[9px]">{demo.requestedPlan}</Badge>
                        {getStatusBadge(demo.status)}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                <a href="/demo-records" className="text-xs text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1">
                  Tüm Talepleri Gör
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Son İçerik Güncellemeleri */}
          <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 tracking-tight">Son İçerik Güncellemeleri</CardTitle>
                  <CardDescription className="text-xs text-slate-400">Landing sections veya blog yazıları üzerinde son yapılan işlemler.</CardDescription>
                </div>
                <Clock className="h-4 w-4 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="flex flex-col gap-4">
                {activities.slice(0, 4).map((act) => {
                  const getBadgeColor = (type: ActivityLog['type']) => {
                    switch (type) {
                      case 'create': return 'success';
                      case 'update': return 'info';
                      default: return 'neutral';
                    }
                  };
                  return (
                    <div key={act.id} className="flex items-start gap-3 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                      <Badge variant={getBadgeColor(act.type)} className="text-[9px] px-1.5 uppercase mt-0.5">
                        {act.type}
                      </Badge>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-800">
                          {act.userName} <span className="font-normal text-slate-400">{act.action}</span>
                        </p>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          Bölüm: {act.target} • {new Date(act.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column: Yayın Durumu Kartı, Hızlı Aksiyonlar, Sistem Uyarıları */}
        <div className="space-y-8">
          
          {/* Yayın Durumu Kartı (Publish Status Card) */}
          <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)] bg-slate-50/50">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Globe className="h-4.5 w-4.5 text-indigo-600" />
                Yayın Durumu
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">Canlı ortam ve derleme merkezi durum raporu.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <div className="p-4 bg-white border border-slate-100 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Durum</span>
                    <Badge variant="success">TÜM DEĞİŞİKLİKLER YAYINDA</Badge>
                  </div>
                  <div className="mt-3 flex justify-between text-xs text-slate-400">
                    <span>Son Güncelleme:</span>
                    <span className="font-semibold text-slate-700">{stats.lastPublishDate}</span>
                  </div>
                </div>

                {publishMessage && (
                  <p className="text-xs text-indigo-600 bg-indigo-50/50 border border-indigo-100/30 p-2.5 rounded-lg font-medium">
                    {publishMessage}
                  </p>
                )}

                <Button 
                  onClick={handlePublishNow} 
                  disabled={publishing} 
                  className="w-full text-xs font-semibold py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(79,70,229,0.15)]"
                >
                  {publishing ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Globe className="h-3.5 w-3.5" />
                  )}
                  {publishing ? 'Yayınlanıyor...' : 'Değişiklikleri Canlıya Al'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hızlı Aksiyonlar */}
          <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-900 tracking-tight">Hızlı Aksiyonlar</CardTitle>
              <CardDescription className="text-xs text-slate-400">En sık kullanılan yönetim araçlarına doğrudan erişin.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-1 gap-2.5">
                <a href="/web/blog">
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs font-semibold text-slate-700 hover:bg-slate-50 p-2.5 rounded-lg border-slate-200/60 gap-2">
                    <FilePlus2 className="h-4 w-4 text-slate-400" />
                    Yeni Blog Yazısı Yaz
                  </Button>
                </a>
                <a href="/demo-records">
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs font-semibold text-slate-700 hover:bg-slate-50 p-2.5 rounded-lg border-slate-200/60 gap-2">
                    <Users className="h-4 w-4 text-slate-400" />
                    Demo Taleplerini Düzenle
                  </Button>
                </a>
                <a href="/web/landing-sections">
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs font-semibold text-slate-700 hover:bg-slate-50 p-2.5 rounded-lg border-slate-200/60 gap-2">
                    <Layers className="h-4 w-4 text-slate-400" />
                    Landing Bölümlerini Yönet
                  </Button>
                </a>
                <a href="/web/seo">
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs font-semibold text-slate-700 hover:bg-slate-50 p-2.5 rounded-lg border-slate-200/60 gap-2">
                    <Settings className="h-4 w-4 text-slate-400" />
                    SEO Ayarlarını İncele
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Sistem Uyarıları (System Alerts) */}
          <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Bell className="h-4 w-4 text-indigo-600" />
                Sistem Uyarıları
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">Dikkat edilmesi gereken sunucu ve güvenlik notları.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-3.5">
                
                {/* Alert 1 */}
                <div className="flex items-start gap-2.5 p-3 bg-amber-50/40 border border-amber-100/30 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 leading-normal">Taslak Bölümler Yayına Hazır</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Bortesoft landing sayfasında 2 adet taslak bölüm bulunuyor. Değişiklikleri inceleyin.</p>
                  </div>
                </div>

                {/* Alert 2 */}
                <div className="flex items-start gap-2.5 p-3 bg-indigo-50/30 border border-indigo-100/20 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 leading-normal">SSL Sertifikası Güvende</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-medium">bortesoft.com SSL sertifikasının otomatik yenilenmesine 68 gün var.</p>
                  </div>
                </div>

                {/* Alert 3 */}
                <div className="flex items-start gap-2.5 p-3 bg-rose-50/40 border border-rose-100/30 rounded-lg">
                  <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 leading-normal">Yetkisiz Erişim Engeli</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Giriş panelinde son 24 saatte 3 başarısız şifre denemesi engellendi.</p>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
