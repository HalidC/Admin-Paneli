import React, { useState, useEffect } from 'react';
import { seoService } from '../../../lib/services/seo-service';
import { SEOMetadata } from '../../../types/seo';
import { PageHeader } from '../../../components/layout/page-header';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Drawer } from '../../../components/ui/drawer';
import { Input, Textarea, Select } from '../../../components/ui/input';
import { Switch } from '../../../components/ui/switch';
import { 
  Search, 
  Globe, 
  ShieldCheck, 
  TrendingUp, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Info,
  Calendar,
  Sparkles
} from 'lucide-react';

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
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [twitterImage, setTwitterImage] = useState('');
  const [isIndexed, setIsIndexed] = useState(true);
  const [includeInSitemap, setIncludeInSitemap] = useState(true);

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
    setTitle(seo.title || '');
    setDescription(seo.description || '');
    setKeywords(seo.keywords ? seo.keywords.join(', ') : '');
    setSitemapPriority(seo.sitemapPriority);
    setCanonicalUrl(seo.canonicalUrl || '');
    setOgTitle(seo.ogTitle || '');
    setOgDescription(seo.ogDescription || '');
    setOgImage(seo.ogImage || '');
    setTwitterImage(seo.twitterImage || '');
    setIsIndexed(seo.isIndexed !== false); // Default to true if undefined
    setIncludeInSitemap(seo.includeInSitemap !== false); // Default to true if undefined
    setIsDrawerOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSEO) return;

    // Recalculate a mock score based on filled elements for high fidelity
    let calculatedScore = 15;
    if (title) calculatedScore += 15;
    if (description && description.length > 50) calculatedScore += 20;
    if (canonicalUrl) calculatedScore += 15;
    if (ogImage) calculatedScore += 15;
    if (isIndexed) calculatedScore += 10;
    if (includeInSitemap) calculatedScore += 10;

    const updated = await seoService.update(editingSEO.id, {
      title,
      description,
      keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
      sitemapPriority: Number(sitemapPriority),
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage,
      twitterImage,
      isIndexed,
      includeInSitemap,
      score: Math.min(100, calculatedScore),
      updatedAt: new Date().toISOString()
    });

    setSeoList(seoList.map((s) => (s.id === editingSEO.id ? updated : s)));
    setIsDrawerOpen(false);
    setEditingSEO(null);
  };

  const getStatusIndicator = (hasValue: boolean, label: string) => {
    if (hasValue) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50/50 px-2 py-0.5 rounded border border-emerald-100/20">
          <CheckCircle2 className="h-3 w-3" />
          {label} Var
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-500 bg-rose-50/40 px-2 py-0.5 rounded border border-rose-100/20">
          <XCircle className="h-3 w-3" />
          {label} Yok
        </span>
      );
    }
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
        title="SEO Yönetimi"
        description="Bortesoft web sayfalarının arama motoru optimizasyonu (SEO), Open Graph sosyal paylaşım kartları ve Google indeks ayarlarını yönetin."
      />

      {/* High-Fidelity SEO Bento cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200/60 p-6 rounded-xl flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 shrink-0">
            <Search className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Ortalama SEO Puanı</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-extrabold text-slate-950">91.8</span>
              <span className="text-xs font-semibold text-emerald-600">/ 100</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 p-6 rounded-xl flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 shrink-0">
            <Globe className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Sitemap Durumu</span>
            <span className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded">
              <ShieldCheck className="h-4 w-4" />
              Aktif (sitemap.xml)
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 p-6 rounded-xl flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 shrink-0">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tarama Sıklığı</span>
            <span className="text-sm font-extrabold text-slate-950 mt-1 block">Günlük <span className="text-[11px] font-medium text-slate-400">/ Googlebot</span></span>
          </div>
        </div>
      </div>

      {/* SEO Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sayfa Yolu</TableHead>
            <TableHead>Meta Durumu (Title & Desc)</TableHead>
            <TableHead>Canonical & OG Image</TableHead>
            <TableHead>Arama / Sitemap Durumu</TableHead>
            <TableHead>SEO Puanı</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {seoList.map((seo) => (
            <TableRow key={seo.id}>
              <TableCell className="font-mono text-xs font-bold text-slate-900">{seo.pagePath}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1.5 py-1">
                  {getStatusIndicator(!!seo.title, 'Title')}
                  {getStatusIndicator(!!seo.description, 'Description')}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1.5 py-1">
                  {getStatusIndicator(!!seo.canonicalUrl, 'Canonical')}
                  {getStatusIndicator(!!seo.ogImage, 'OG Image')}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1.5 py-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase">Index:</span>
                    <Badge variant={seo.isIndexed !== false ? 'success' : 'danger'}>
                      {seo.isIndexed !== false ? 'INDEX' : 'NOINDEX'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase">Sitemap:</span>
                    <Badge variant={seo.includeInSitemap !== false ? 'info' : 'neutral'}>
                      {seo.includeInSitemap !== false ? 'DAHİL' : 'HARİÇ'}
                    </Badge>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${seo.score}%` }}
                      className={`h-full rounded-full ${seo.score >= 90 ? 'bg-emerald-500' : seo.score >= 70 ? 'bg-amber-400' : 'bg-rose-500'}`}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-800">{seo.score}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="xs" onClick={() => handleOpenEdit(seo)} className="gap-1 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 transition-colors">
                  Ayarla
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Expanded SEO Settings Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingSEO(null);
        }}
        title={`${editingSEO?.pagePath} Sayfa SEO Ayarları`}
      >
        <form onSubmit={handleSave} className="space-y-6 pb-20">
          
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
            <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Info className="h-4 w-4 text-indigo-600" />
              Arama Motoru Önizlemesi (Google Snippet)
            </h3>
            <div className="bg-white p-3 border border-slate-100 rounded-lg space-y-1">
              <span className="text-[11px] text-slate-400 block truncate">https://bortesoft.com{editingSEO?.pagePath}</span>
              <span className="text-sm font-semibold text-blue-600 block hover:underline cursor-pointer truncate">
                {title || 'Lütfen bir meta başlık yazın'}
              </span>
              <p className="text-xs text-slate-600 line-clamp-2">
                {description || 'Lütfen sayfa için açıklayıcı bir meta açıklama girin. En fazla 160 karakter önerilir.'}
              </p>
            </div>
          </div>

          <Input
            label="Meta Başlık (Meta Title)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={60}
            placeholder="Arama motoru başlığı (en fazla 60 karakter)..."
          />

          <Textarea
            label="Meta Açıklama (Meta Description)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={160}
            placeholder="Sayfa özet açıklaması (en fazla 160 karakter)..."
            rows={3}
          />

          <Input
            label="Canonical URL"
            value={canonicalUrl}
            onChange={(e) => setCanonicalUrl(e.target.value)}
            placeholder="örn. https://bortesoft.com/pricing"
          />

          {/* Social Network Open Graph Fields */}
          <div className="border border-slate-200/60 p-4 rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              Sosyal Medya Kart Ayarları (Open Graph & Twitter)
            </h3>
            
            <Input
              label="Open Graph Başlık (OG Title)"
              value={ogTitle}
              onChange={(e) => setOgTitle(e.target.value)}
              placeholder="Sosyal ağlarda görünecek başlık..."
            />

            <Textarea
              label="Open Graph Açıklama (OG Description)"
              value={ogDescription}
              onChange={(e) => setOgDescription(e.target.value)}
              placeholder="Sosyal ağlarda görünecek kısa açıklama..."
              rows={2}
            />

            <Input
              label="Open Graph Görsel Linki (OG Image)"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              placeholder="örn. https://bortesoft.com/og-main.png"
            />

            <Input
              label="Twitter Kart Görsel Linki (Twitter Card Image)"
              value={twitterImage}
              onChange={(e) => setTwitterImage(e.target.value)}
              placeholder="örn. https://bortesoft.com/twitter-main.png"
            />
          </div>

          {/* Indexing Control and Sitemap Priority */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Sitemap Öncelik Katsayısı"
              type="number"
              step="0.1"
              min="0.0"
              max="1.0"
              value={sitemapPriority}
              onChange={(e) => setSitemapPriority(Number(e.target.value))}
              required
            />
            <Input
              label="Meta Anahtar Kelimeler (Kelimeleri Virgülle Ayırın)"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="SaaS, Borte, Arayüz"
            />
          </div>

          <div className="space-y-4">
            {/* Index / Noindex Switch */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Arama Motorları İndekslesin mi?</span>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Kapalı olması durumunda sayfaya 'noindex' etiketi eklenir.</p>
              </div>
              <Switch
                checked={isIndexed}
                onChange={() => setIsIndexed(!isIndexed)}
              />
            </div>

            {/* Include in Sitemap Switch */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Sitemap'e Dahil Edilsin mi?</span>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Sitemap.xml dosyasına bu sayfa yolunun eklenmesini kontrol eder.</p>
              </div>
              <Switch
                checked={includeInSitemap}
                onChange={() => setIncludeInSitemap(!includeInSitemap)}
              />
            </div>
          </div>

          {/* Last updated information */}
          {editingSEO && editingSEO.updatedAt && (
            <div className="text-[11px] text-slate-400 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Son Güncelleme: <span className="font-mono text-slate-600 font-semibold">{new Date(editingSEO.updatedAt).toLocaleString('tr-TR')}</span>
            </div>
          )}

          <div className="pt-6 border-t border-slate-100 flex gap-3">
            <Button variant="outline" size="md" type="button" onClick={() => {
              setIsDrawerOpen(false);
              setEditingSEO(null);
            }} className="flex-1">
              Vazgeç
            </Button>
            <Button variant="primary" size="md" type="submit" className="flex-1 gap-2 bg-indigo-600 text-white font-bold">
              <Save className="h-4 w-4" />
              Ayarları Kaydet
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
