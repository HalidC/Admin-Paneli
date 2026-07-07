import React, { useState, useEffect } from 'react';
import { seoService } from '../../../lib/services/seo-service';
import { SEOMetadata } from '../../../types/seo';
import { PageHeader } from '../../../components/layout/page-header';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Drawer } from '../../../components/ui/drawer';
import { Input, Textarea } from '../../../components/ui/input';
import { Search, Globe, ShieldCheck, TrendingUp, Save, RefreshCw } from 'lucide-react';

export default function SEOPage() {
  const [seoList, setSeoList] = useState<SEOMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingSEO, setEditingSEO] = useState<SEOMetadata | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [sitemapPriority, setSitemapPriority] = useState(0.5);

  const fetchSEO = async () => {
    setLoading(true);
    const data = await seoService.getAll();
    setSeoList(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSEO();
  }, []);

  const handleOpenEdit = (seo: SEOMetadata) => {
    setEditingSEO(seo);
    setTitle(seo.title);
    setDescription(seo.description);
    setKeywords(seo.keywords.join(', '));
    setSitemapPriority(seo.sitemapPriority);
    setIsDrawerOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSEO) return;

    const updated = await seoService.update(editingSEO.id, {
      title,
      description,
      keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
      sitemapPriority: Number(sitemapPriority),
    });

    setSeoList(seoList.map((s) => (s.id === editingSEO.id ? updated : s)));
    setIsDrawerOpen(false);
    setEditingSEO(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="h-6 w-6 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="SEO Ayarları"
        description="Google ve diğer arama motorlarında üst sıralara çıkmak için sayfalarınızın meta bilgilerini ve Google botlarının tarama önceliklerini yönetin."
      />

      {/* SEO Score Cards bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200/60 p-6 rounded-xl flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 shrink-0">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Ortalama SEO Puanı</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold text-slate-950">93.3</span>
              <span className="text-xs font-semibold text-emerald-600">/ 100</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 p-6 rounded-xl flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 shrink-0">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Sitemap Durumu</span>
            <span className="text-sm font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <ShieldCheck className="h-4 w-4" />
              Aktif & Güncel (sitemap.xml)
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 p-6 rounded-xl flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 shrink-0">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Google Gösterimi</span>
            <span className="text-base font-bold text-slate-950 mt-1 block">34,250 <span className="text-xs font-normal text-slate-400">/ son 7 gün</span></span>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sayfa Yolu</TableHead>
            <TableHead>Meta Başlık (Title)</TableHead>
            <TableHead>Meta Açıklama (Description)</TableHead>
            <TableHead>Tarama Önceliği</TableHead>
            <TableHead>SEO Kalitesi</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {seoList.map((seo) => (
            <TableRow key={seo.id}>
              <TableCell className="font-mono text-xs font-semibold text-slate-900">{seo.pagePath}</TableCell>
              <TableCell>
                <span className="font-semibold text-slate-900 block truncate max-w-[180px] tracking-tight">{seo.title}</span>
              </TableCell>
              <TableCell>
                <span className="text-xs text-slate-500 font-medium block truncate max-w-[240px]">{seo.description}</span>
              </TableCell>
              <TableCell className="font-mono text-xs text-slate-400 font-medium">{seo.sitemapPriority}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${seo.score}%` }}
                      className={`h-full rounded-full ${seo.score >= 90 ? 'bg-emerald-500' : seo.score >= 75 ? 'bg-amber-400' : 'bg-rose-500'}`}
                    />
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-800">{seo.score}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="xs" onClick={() => handleOpenEdit(seo)} className="gap-1 px-3 py-1 bg-slate-50 border border-slate-100 rounded-md">
                  Ayarla
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* SEO Settings Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={`${editingSEO?.pagePath} Sayfa SEO Ayarları`}
      >
        <form onSubmit={handleSave} className="space-y-6">
          <Input
            label="Meta Başlık (Meta Title)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={60}
            placeholder="Arama motoru başlığı (en fazla 60 karakter)..."
          />

          <Textarea
            label="Meta Açıklama (Meta Description)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            maxLength={160}
            placeholder="Sayfa özet açıklaması (en fazla 160 karakter)..."
            rows={4}
          />

          <Input
            label="Meta Anahtar Kelimeler (Virgülle Ayırın)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="örn. SaaS, Arayüz, Bortesoft"
          />

          <Input
            label="Sitemap Öncelik Katsayısı (0.0 - 1.0)"
            type="number"
            step="0.1"
            min="0.0"
            max="1.0"
            value={sitemapPriority}
            onChange={(e) => setSitemapPriority(Number(e.target.value))}
            required
          />

          <div className="pt-6 border-t border-slate-100 flex gap-3">
            <Button variant="outline" size="md" type="button" onClick={() => setIsDrawerOpen(false)} className="flex-1">
              İptal
            </Button>
            <Button variant="primary" size="md" type="submit" className="flex-1 gap-2">
              <Save className="h-4 w-4" />
              Kaydet
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
