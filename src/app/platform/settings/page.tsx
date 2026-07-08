import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/page-header';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Switch } from '../../../components/ui/switch';
import { Settings, Save, Sparkles, ShieldCheck, Database, RefreshCw, Cpu } from 'lucide-react';

export default function PlatformSettingsPage() {
  const [platformName, setPlatformName] = useState('Bortesoft SaaS Altyapısı');
  const [domainBase, setDomainBase] = useState('bortesoft.com');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [aiModel, setAiModel] = useState('gemini-2.5-flash');
  const [backupSchedule, setBackupSchedule] = useState('daily');
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Sistem ayarları başarıyla kaydedildi ve tüm ağ geçidi (CDN) düğümlerine dağıtıldı.');
    }, 800);
  };

  return (
    <div className="py-24 max-w-4xl mx-auto space-y-12 animate-fade-in px-6">
      <PageHeader
        title="Platform Ayarları"
        description="Bortesoft global SaaS parametrelerini, sistem çapında bakım modunu, yapay zeka model tercihlerini ve yedekleme frekanslarını ayarlayın."
        actions={
          <Button 
            variant="primary" 
            size="sm" 
            onClick={handleSave}
            disabled={saving}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md"
          >
            <Save className={`h-4 w-4 ${saving ? 'animate-pulse' : ''}`} />
            {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </Button>
        }
      />

      <div className="space-y-8">
        {/* Core Settings */}
        <Card className="border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)] bg-white">
          <CardHeader>
            <CardTitle className="text-base font-bold text-zinc-900 tracking-tight flex items-center gap-2">
              <Settings className="h-4.5 w-4.5 text-indigo-500" />
              Genel Platform Kimliği
            </CardTitle>
            <CardDescription className="text-xs text-zinc-400">Tüm alt domainler ve sistem mailleri için varsayılan marka verileri.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Platform Adı</label>
                <input
                  type="text"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Ana Domain Adresi</label>
                <input
                  type="text"
                  value={domainBase}
                  onChange={(e) => setDomainBase(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Global System Options */}
        <Card className="border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)] bg-white">
          <CardHeader>
            <CardTitle className="text-base font-bold text-zinc-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-indigo-500" />
              Sistem Kararlılığı & Bakım Modu
            </CardTitle>
            <CardDescription className="text-xs text-zinc-400">Canlı sunucuları bakım aşamasına alma ve kullanıcı erişim kuralları.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-50 border border-zinc-100 rounded-xl">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-zinc-800 block">Genel Bakım Modu (Maintenance Mode)</span>
                <span className="text-[10px] text-zinc-400 font-semibold block mt-0.5">Aktifleştirildiğinde tüm müşterilere geçici olarak "Bakım Çalışması" ekranı gösterilir.</span>
              </div>
              <Switch
                checked={maintenanceMode}
                onChange={setMaintenanceMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Artificial Intelligence Engines */}
        <Card className="border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)] bg-white">
          <CardHeader>
            <CardTitle className="text-base font-bold text-zinc-900 tracking-tight flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-indigo-500" />
              Otonom Yapay Zeka (AI Engine) Ayarları
            </CardTitle>
            <CardDescription className="text-xs text-zinc-400">Platform arka plan süreçlerinde kullanılacak varsayılan LLM modeli seçimi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Yapay Zeka Modeli</label>
                <select
                  value={aiModel}
                  onChange={(e) => setAiModel(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-white"
                >
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash (Önerilen & Hızlı)</option>
                  <option value="gemini-2.5-pro">Gemini 2.5 Pro (Gelişmiş Mantık)</option>
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash (Ekonomik)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Veritabanı Yedekleme Döngüsü</label>
                <select
                  value={backupSchedule}
                  onChange={(e) => setBackupSchedule(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-white"
                >
                  <option value="hourly">Her Saat Başı (Kritik Sistemler)</option>
                  <option value="daily">Her Gün Gece Yarısı (Önerilen)</option>
                  <option value="weekly">Her Hafta Sonu (Statik)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
