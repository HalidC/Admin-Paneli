import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../lib/services/dashboard-service';
import { DashboardStats, ActivityLog, PerformanceMetric } from '../../types/admin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { PageHeader } from '../../components/layout/page-header';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { TrendingUp, Users, Presentation, Percent, ArrowUpRight, Zap, RefreshCw, Clock } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [s, a, m] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getActivityLogs(),
        dashboardService.getPerformanceMetrics(),
      ]);
      setStats(s);
      setActivities(a);
      setMetrics(m);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

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

  // Format currency
  const formatMRR = (val: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div>
      <PageHeader
        title="Genel Bakış"
        description="Bortesoft SaaS platformunun genel durumu, büyüme oranları ve güncel aktiviteleri."
        actions={
          <Button variant="outline" size="sm" onClick={fetchDashboardData} className="gap-2">
            <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
            Yenile
          </Button>
        }
      />

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* MRR Card */}
        <Card hoverable className="border-l-4 border-l-indigo-600 shadow-[0_8px_30px_rgb(79,70,229,0.02)]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Aylık Tekrarlayan Gelir (MRR)</span>
              <div className="p-2 bg-indigo-50/50 rounded-lg text-indigo-700 border border-indigo-100/30">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{formatMRR(stats.monthlyRecurringRevenue)}</h2>
              <div className="flex items-center gap-1.5 mt-2">
                <Badge variant="success">+{stats.mrrGrowth}%</Badge>
                <span className="text-xs text-slate-400">geçen aya göre</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers Card */}
        <Card hoverable>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Aktif Müşteriler</span>
              <div className="p-2 bg-slate-50 rounded-lg text-slate-700 border border-slate-100">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{stats.activeCustomers}</h2>
              <div className="flex items-center gap-1.5 mt-2">
                <Badge variant="success">+{stats.customerGrowth}%</Badge>
                <span className="text-xs text-slate-400">geçen aya göre</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Card */}
        <Card hoverable>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Demo Talepleri</span>
              <div className="p-2 bg-slate-50 rounded-lg text-slate-700 border border-slate-100">
                <Presentation className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{stats.demoRequestsCount}</h2>
              <div className="flex items-center gap-1.5 mt-2">
                <Badge variant="success">+{stats.demoGrowth}%</Badge>
                <span className="text-xs text-slate-400 font-medium">bu hafta</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Card */}
        <Card hoverable>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ortalama Dönüşüm</span>
              <div className="p-2 bg-slate-50 rounded-lg text-slate-700 border border-slate-100">
                <Percent className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">%{stats.conversionRate}</h2>
              <div className="flex items-center gap-1.5 mt-2">
                <Badge variant="success">+{stats.conversionGrowth}%</Badge>
                <span className="text-xs text-slate-400">optimizasyon skoru</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts & Activity Logs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Chart Bento */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Ziyaretçi & Trafik Analitiği</CardTitle>
                <CardDescription>Haftalık tekil ziyaretçilerin sayfa görüntüleme oranlarına kıyaslaması.</CardDescription>
              </div>
              <div className="flex gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <span className="h-2 w-2 bg-indigo-600 rounded-full" />
                  Görüntüleme
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="h-2 w-2 bg-slate-200 rounded-full" />
                  Tekil Ziyaretçi
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            {/* Custom Responsive SVG Chart */}
            <div className="h-64 flex flex-col justify-between mt-4">
              <div className="relative flex-1 flex items-end justify-between gap-6 border-b border-zinc-100 pb-2">
                {/* Horizontal Guide Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-full border-t border-zinc-50" />
                  ))}
                </div>

                {metrics.map((m, idx) => {
                  const maxVal = 8000;
                  const viewHeight = (m.pageViews / maxVal) * 100;
                  const visitorHeight = (m.uniqueVisitors / maxVal) * 100;

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center group relative z-10">
                      {/* Interactive Tooltip */}
                      <div className="absolute bottom-full mb-2 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex flex-col gap-0.5 whitespace-nowrap z-25">
                        <span className="font-semibold">{m.timestamp} Günü</span>
                        <span>S. Görüntüleme: {m.pageViews}</span>
                        <span>Ziyaretçi: {m.uniqueVisitors}</span>
                      </div>

                      <div className="w-full flex items-end justify-center gap-1.5 h-44">
                        {/* Unique Visitors Bar */}
                        <div
                          style={{ height: `${visitorHeight}%` }}
                          className="w-4 bg-slate-100 hover:bg-slate-200 rounded-t-sm transition-all duration-300"
                        />
                        {/* Page Views Bar */}
                        <div
                          style={{ height: `${viewHeight}%` }}
                          className="w-4 bg-indigo-600 hover:bg-indigo-700 rounded-t-sm transition-all duration-300 shadow-[0_1px_3px_rgba(79,70,229,0.15)]"
                        />
                      </div>
                      <span className="text-xs text-slate-400 mt-2 font-medium">{m.timestamp}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Log */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Son Aktiviteler</CardTitle>
                <CardDescription>Sistemde gerçekleştirilen son 5 yönetici işlemi.</CardDescription>
              </div>
              <Clock className="h-4 w-4 text-zinc-400" />
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="flex flex-col gap-5 mt-4">
              {activities.map((act) => {
                const getBadgeColor = (type: ActivityLog['type']) => {
                  switch (type) {
                    case 'create':
                      return 'success';
                    case 'update':
                      return 'info';
                    case 'delete':
                      return 'danger';
                    case 'security':
                      return 'danger';
                    default:
                      return 'neutral';
                  }
                };

                return (
                  <div key={act.id} className="flex items-start gap-3 border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                    <div className="mt-0.5">
                      <Badge variant={getBadgeColor(act.type)} className="text-[9px] px-1.5 uppercase">
                        {act.type}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-800 leading-snug">
                        {act.userName} <span className="font-normal text-zinc-500">{act.action}</span>
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Hedef: {act.target} • {new Date(act.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
