import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { 
  Cpu, 
  Database, 
  Server, 
  Zap, 
  ShieldCheck, 
  RefreshCw, 
  Activity, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Pause, 
  Hourglass, 
  HardDrive,
  Network,
  Lock,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// Custom simulated types for Platform stats
interface PlatformStats {
  gatewayStatus: 'optimal' | 'degraded' | 'maintenance';
  gatewayLatency: number;
  dbStatus: 'healthy' | 'warning' | 'critical';
  dbCpuUsage: number;
  dbLatency: number;
  activeWorkers: number;
  cacheHitRate: number;
  totalRequests24h: number;
  securityFirewall: 'active' | 'suspended';
  pendingJobs: number;
  uptime: string;
}

interface WorkerService {
  id: string;
  name: string;
  role: string;
  status: 'running' | 'idle' | 'suspended';
  mode: 'autonomous' | 'supervised' | 'manual';
  processedCount: number;
}

export default function PlatformManagementPage() {
  const [stats, setStats] = useState<PlatformStats>({
    gatewayStatus: 'optimal',
    gatewayLatency: 12,
    dbStatus: 'healthy',
    dbCpuUsage: 8.4,
    dbLatency: 1.8,
    activeWorkers: 12,
    cacheHitRate: 96.4,
    totalRequests24h: 1845200,
    securityFirewall: 'active',
    pendingJobs: 0,
    uptime: '14 gün, 8 saat, 22 dk'
  });

  const [workers, setWorkers] = useState<WorkerService[]>([
    { id: 'w-1', name: 'Agent Borte Core', role: 'Müşteri Demosu & Soru Çözümü', status: 'running', mode: 'autonomous', processedCount: 142 },
    { id: 'w-2', name: 'SaaS AI Coach', role: 'Kullanım Metrikleri & Analiz', status: 'running', mode: 'autonomous', processedCount: 88 },
    { id: 'w-3', name: 'SEO Auto-Optimizer', role: 'Meta Etiket & Site Haritası Düzenleme', status: 'idle', mode: 'supervised', processedCount: 412 },
    { id: 'w-4', name: 'Background Image Compressor', role: 'Görsel Optimizasyonu & WebP', status: 'idle', mode: 'supervised', processedCount: 1250 }
  ]);

  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false);
  const [diagnosticsStep, setDiagnosticsStep] = useState(0);
  const [diagnosticsLog, setDiagnosticsLog] = useState<string[]>([]);

  const [restarting, setRestarting] = useState(false);
  const [restartProgress, setRestartProgress] = useState(0);
  const [restartLog, setRestartLog] = useState<string[]>([]);
  const [showRestartModal, setShowRestartModal] = useState(false);

  // Run a high-fidelity diagnostic simulation
  const runDiagnostics = () => {
    if (diagnosticsRunning) return;
    setDiagnosticsRunning(true);
    setDiagnosticsStep(1);
    setDiagnosticsLog([]);

    const steps = [
      { text: 'API Gateway bağlantısı test ediliyor...', delay: 800 },
      { text: 'Veritabanı kümesi (3 adet replika) gecikme süresi ölçülüyor...', delay: 1000 },
      { text: 'Redis önbellek bütünlüğü ve bellek sızıntıları taranıyor...', delay: 800 },
      { text: 'Agent Borte otonom iş parçacıkları durumu kontrol ediliyor...', delay: 1200 },
      { text: 'WAF güvenlik duvarı ve SSL sertifika süresi doğrulanıyor...', delay: 900 },
      { text: 'Sistem tamamen kararlı ve optimize durumda (%100 Başarı)!', delay: 1000 }
    ];

    let current = 0;
    const executeNextStep = () => {
      if (current < steps.length) {
        setDiagnosticsLog(prev => [...prev, `[INFO] ${steps[current].text}`]);
        setDiagnosticsStep(current + 1);
        setTimeout(() => {
          current++;
          executeNextStep();
        }, steps[current].delay);
      } else {
        setDiagnosticsRunning(false);
        setDiagnosticsStep(0);
        // Randomly tweak stats slightly as if they refreshed
        setStats(prev => ({
          ...prev,
          gatewayLatency: Math.floor(Math.random() * 5) + 10,
          dbLatency: Number((Math.random() * 0.8 + 1.4).toFixed(1)),
          dbCpuUsage: Number((Math.random() * 3 + 6).toFixed(1)),
          cacheHitRate: Number((95 + Math.random() * 3.5).toFixed(1))
        }));
      }
    };

    executeNextStep();
  };

  // Run simulated instance rolling restart
  const runRollingRestart = () => {
    if (restarting) return;
    setRestarting(true);
    setRestartProgress(0);
    setRestartLog([]);

    const restartSteps = [
      { text: 'Konteyner trafik yönlendirmesi askıya alınıyor...', progress: 15 },
      { text: 'Eski node.js çalışma süreçleri güvenli şekilde kapatılıyor...', progress: 35 },
      { text: 'Ortam değişkenleri ve gizli anahtarlar yeniden yükleniyor...', progress: 55 },
      { text: 'Konteyner v2.4.1 derlemesi ayağa kaldırılıyor...', progress: 75 },
      { text: 'Veritabanı bağlantı havuzu yeniden kuruluyor...', progress: 90 },
      { text: 'Servis başarıyla sıfırlandı ve canlı trafiğe açıldı!', progress: 100 }
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < restartSteps.length) {
        setRestartLog(prev => [...prev, `[RESTART] ${restartSteps[current].text}`]);
        setRestartProgress(restartSteps[current].progress);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setRestarting(false);
          setShowRestartModal(false);
          // Reset uptime
          setStats(prev => ({ ...prev, uptime: '0 gün, 0 saat, 1 dk' }));
        }, 1000);
      }
    }, 1200);
  };

  const handleToggleWorkerStatus = (id: string) => {
    setWorkers(workers.map(w => {
      if (w.id === id) {
        const nextStatus = w.status === 'running' ? 'suspended' : 'running';
        return { ...w, status: nextStatus };
      }
      return w;
    }));
  };

  const handleToggleWorkerMode = (id: string) => {
    setWorkers(workers.map(w => {
      if (w.id === id) {
        const nextMode = w.mode === 'autonomous' ? 'supervised' : w.mode === 'supervised' ? 'manual' : 'autonomous';
        return { ...w, mode: nextMode };
      }
      return w;
    }));
  };

  const handleToggleFirewall = () => {
    setStats(prev => ({
      ...prev,
      securityFirewall: prev.securityFirewall === 'active' ? 'suspended' : 'active'
    }));
  };

  return (
    <div className="py-8 max-w-7xl mx-auto space-y-12">
      
      {/* Page Header */}
      <PageHeader
        title="Platform Yönetimi"
        description="Bortesoft SaaS altyapı mimarisi, sunucu kararlılığı, veritabanı performans matrisleri ve otonom arka plan işçileri yönetim merkezi."
        actions={
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowRestartModal(true)} 
              className="gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
            >
              <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
              Sunucuları Yeniden Başlat
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={runDiagnostics} 
              disabled={diagnosticsRunning}
              className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-[0_4px_12px_rgba(79,70,229,0.15)]"
            >
              <Zap className={`h-3.5 w-3.5 ${diagnosticsRunning ? 'animate-bounce' : ''}`} />
              {diagnosticsRunning ? 'Tanılama Çalışıyor...' : 'Hızlı Tanılama Yap'}
            </Button>
          </div>
        }
      />

      {/* Modern Asymmetric Bento Grid (8 Metrics) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* API Gateway Status */}
        <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">API Ağ Geçidi (Gateway)</span>
              <div className="p-2 bg-indigo-50/50 border border-indigo-100/30 rounded-lg text-indigo-600">
                <Network className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">Aktif</h2>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-medium">Gecikme süresi: <span className="font-mono text-slate-700 font-bold">{stats.gatewayLatency}ms</span></p>
            </div>
          </CardContent>
        </Card>

        {/* Database Latency & Latency status */}
        <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Veritabanı Kümesi</span>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                <Database className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">%{stats.dbCpuUsage} <span className="text-xs font-normal text-slate-400">CPU</span></h2>
              <p className="text-xs text-slate-400 mt-2.5 font-medium">Sorgu gecikmesi: <span className="font-mono text-slate-700 font-bold">{stats.dbLatency}ms</span></p>
            </div>
          </CardContent>
        </Card>

        {/* Active Worker Threads */}
        <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Otonom Ajan Havuzu</span>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                <Cpu className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">{stats.activeWorkers} Servis</h2>
              <p className="text-xs text-slate-400 mt-2.5 font-medium">Otonom süreçler çalışıyor</p>
            </div>
          </CardContent>
        </Card>

        {/* Redis Cache Hit Rate */}
        <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bellek Önbellek (Redis)</span>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                <HardDrive className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">%{stats.cacheHitRate}</h2>
              <p className="text-xs text-slate-400 mt-2.5 font-medium">Önbellek isabet (Hit) oranı</p>
            </div>
          </CardContent>
        </Card>

        {/* Total API Requests last 24h */}
        <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">24s API İstek Hacmi</span>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                <Activity className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">{(stats.totalRequests24h / 1000000).toFixed(2)}M</h2>
              <p className="text-xs text-slate-400 mt-2.5 font-medium">Ağ geçidinden süzülen istekler</p>
            </div>
          </CardContent>
        </Card>

        {/* Uptime Duration */}
        <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sunucu Çalışma Süresi</span>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                <Server className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-[15px] font-bold text-slate-900 tracking-tight mt-1 truncate">{stats.uptime}</h2>
              <p className="text-xs text-slate-400 mt-3.5 font-medium">Sorunsuz kesintisiz çalışma</p>
            </div>
          </CardContent>
        </Card>

        {/* Web Application Firewall Security level */}
        <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">WAF Güvenlik Duvarı</span>
              <div className="p-2 bg-emerald-50/50 border border-emerald-100/30 rounded-lg text-emerald-600">
                <Lock className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-center gap-1.5">
                <Badge variant={stats.securityFirewall === 'active' ? 'success' : 'danger'}>
                  {stats.securityFirewall === 'active' ? 'AKTİF' : 'DEVRE DIŞI'}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-3 font-medium">Katı kural filtreleme devrede</p>
            </div>
          </CardContent>
        </Card>

        {/* Pending Queue Jobs */}
        <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.02)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bekleyen Görev Kuyruğu</span>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                <Hourglass className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">{stats.pendingJobs} <span className="text-xs font-normal text-slate-400">görev</span></h2>
              <p className="text-xs text-slate-400 mt-2.5 font-medium">Tüm kuyruklar temiz, gecikme yok</p>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Main Layout Area for Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Autonomous Workers & Services */}
        <div className="lg:col-span-2 space-y-8">
          
          <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)] bg-white">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <Cpu className="h-4.5 w-4.5 text-indigo-600" />
                    Otonom Yapay Zeka Ajanları ve Servisler
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400">Arka planda çalışan ve platform verilerini otonom optimize eden yapay zeka microservice'leri.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="divide-y divide-slate-100">
                {workers.map((worker) => (
                  <div key={worker.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-50/40 border border-indigo-100/10 rounded-xl text-indigo-600 mt-0.5 shrink-0">
                        <Cpu className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-800">{worker.name}</span>
                          <span className="text-[10px] text-slate-400">• {worker.role}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={worker.status === 'running' ? 'success' : 'neutral'} className="text-[9px] uppercase tracking-wider">
                            {worker.status === 'running' ? 'Çalışıyor' : 'Askıda'}
                          </Badge>
                          <span className="text-[10px] text-slate-400">İşlenen Kayıt: <strong className="text-slate-600 font-mono font-bold">{worker.processedCount}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Mod:</span>
                        <Button 
                          variant="outline" 
                          size="xs" 
                          onClick={() => handleToggleWorkerMode(worker.id)}
                          className="text-[10px] px-2 py-0.5 font-bold uppercase border-slate-200"
                        >
                          {worker.mode === 'autonomous' ? 'Otonom' : worker.mode === 'supervised' ? 'Gözetimli' : 'Manuel'}
                        </Button>
                      </div>

                      <Switch
                        checked={worker.status === 'running'}
                        onChange={() => handleToggleWorkerStatus(worker.id)}
                        label=""
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interactive Diagnostic Output Terminal */}
          {diagnosticsLog.length > 0 && (
            <Card className="border-slate-800 bg-slate-950 text-slate-100 shadow-2xl rounded-xl overflow-hidden font-mono text-xs">
              <CardHeader className="bg-slate-900/80 border-b border-slate-800 py-3 px-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-emerald-400" />
                  <span className="font-semibold text-xs tracking-tight text-slate-300">Bortesoft Tanılama Konsolu (v2.4.1)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-2 max-h-60 overflow-y-auto">
                {diagnosticsLog.map((log, idx) => (
                  <p key={idx} className={`${idx === diagnosticsLog.length - 1 && !diagnosticsRunning ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>
                    {log}
                  </p>
                ))}
                {diagnosticsRunning && (
                  <div className="flex items-center gap-2 text-indigo-400 mt-2">
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Tanılama çalıştırılıyor...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

        </div>

        {/* Right Column: Platform Controls & Event Logs */}
        <div className="space-y-8">
          
          {/* Quick Platform Security & System actions */}
          <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)] bg-slate-50/50">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-indigo-600" />
                Güvenlik & Erişim Kontrolü
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">Canlı ortam koruma duvarı ve API güvenlik mekanizması.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="p-4 bg-white border border-slate-100 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Saldırı Koruma Filtresi</span>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">WAF saldırı filtreleme kuralları</span>
                  </div>
                  <Switch
                    checked={stats.securityFirewall === 'active'}
                    onChange={handleToggleFirewall}
                  />
                </div>
                <div className="h-[1px] bg-slate-100" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>SSL Sertifikası Durumu:</span>
                  <span className="font-bold text-emerald-600">Aktif & Güvenli</span>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-100 rounded-xl">
                <h4 className="text-xs font-bold text-slate-800 mb-2">API Rate Limiting</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Maksimum İstek Sınırı:</span>
                    <span className="font-mono font-bold text-slate-700">6000 req/dk</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>IP Başına Blok Süresi:</span>
                    <span className="font-mono font-bold text-slate-700">15 dk</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* High Fidelity Platform Event Logs */}
          <Card className="border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Terminal className="h-4.5 w-4.5 text-indigo-600" />
                Sistem Olay Günlüğü
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">Platform üzerinde en son gerçekleşen altyapı ve bakım olayları.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-3.5">
                
                {/* Event 1 */}
                <div className="flex items-start gap-2.5 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 leading-normal">Veritabanı Şeması Başarıyla Güncellendi</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Drizzle ORM migrasyonu (v2.1) başarıyla uygulandı ve 3 küme replikasyonu tamamlandı.</p>
                    <span className="text-[9px] font-mono text-slate-400 font-semibold block mt-1">07.07.2026 10:34</span>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="flex items-start gap-2.5 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 leading-normal">SSL Sertifikası Yenilendi</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Let's Encrypt otonom SSL sertifikası yenilendi ve CDN düğümlerine dağıtıldı.</p>
                    <span className="text-[9px] font-mono text-slate-400 font-semibold block mt-1">06.07.2026 03:12</span>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="flex items-start gap-2.5 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="h-2 w-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 leading-normal">Sıra Dışı Trafik Sınırlandırması</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Rate limiter 192.168.1.18 IP adresinden gelen 12,000 sahte isteği engelledi.</p>
                    <span className="text-[9px] font-mono text-slate-400 font-semibold block mt-1">05.07.2026 18:45</span>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

        </div>

      </div>

      {/* Interactive Server Restart Modal */}
      {showRestartModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/60 rounded-2xl max-w-md w-full shadow-2xl p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Kritik Aksiyon: Sunucu Yeniden Başlat</h3>
                <p className="text-xs text-slate-400">Canlı ortam node.js konteyner kümesini yeniden başlatmak üzeresiniz.</p>
              </div>
            </div>

            {restarting ? (
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Konteyner Yeniden Başlatılıyor...</span>
                  <span>%{restartProgress}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${restartProgress}%` }}
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                  />
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-32 overflow-y-auto text-[10px] font-mono text-slate-300 space-y-1">
                  {restartLog.map((log, idx) => (
                    <p key={idx}>{log}</p>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Bu işlem sırasında sunucular otonom bir şekilde ardışık olarak yeniden başlatılacak olup kesinti yaşanmayacaktır (Zero-Downtime Rolling Restart). Emin misiniz?
              </p>
            )}

            {!restarting && (
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowRestartModal(false)}
                  className="flex-1 font-semibold border-slate-200"
                >
                  Vazgeç
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={runRollingRestart}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Yeniden Başlatmayı Onayla
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
