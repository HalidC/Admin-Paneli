import React, { useState, useEffect } from 'react';
import { mediaService } from '../../../lib/services/media-service';
import { MediaAsset } from '../../../types/media';
import { PageHeader } from '../../../components/layout/page-header';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Modal } from '../../../components/ui/modal';
import { Input } from '../../../components/ui/input';
import { Image as ImageIcon, Trash2, Plus, Download, HardDrive, RefreshCw } from 'lucide-react';

export default function MediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [mimeType, setMimeType] = useState('image/jpeg');
  const [altText, setAltText] = useState('');

  const fetchAssets = async () => {
    setLoading(true);
    const data = await mediaService.getAll();
    setAssets(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleOpenAdd = () => {
    setName('');
    setUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800');
    setMimeType('image/jpeg');
    setAltText('Örnek SaaS Medya Görseli');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await mediaService.upload({
      name,
      url,
      mimeType,
      sizeBytes: Math.floor(Math.random() * 500000) + 50000,
      width: 1200,
      height: 800,
      altText,
    });
    setAssets([created, ...assets]);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bu görseli kalıcı olarak silmek istediğinize emin misiniz?')) {
      await mediaService.delete(id);
      setAssets(assets.filter((a) => a.id !== id));
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 1;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
        title="Medya Kütüphanesi"
        description="Bortesoft arayüzlerinde, bento gridlerinde ve blog yazılarında kullandığınız görsel varlıkları, logoları ve SVG dosyalarını saklayın."
        actions={
          <Button variant="primary" size="sm" onClick={handleOpenAdd} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Yeni Medya Ekle
          </Button>
        }
      />

      {/* Disk utilization and summary bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-50/50 border border-slate-200/60 p-5 rounded-xl flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white border border-slate-100 rounded-lg text-slate-800 shrink-0">
              <HardDrive className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Kullanılan Alan</span>
              <span className="text-sm font-semibold text-slate-900 mt-0.5 block">1.25 MB <span className="text-xs font-normal text-slate-400">/ 100 MB</span></span>
            </div>
          </div>
          <div className="w-24 bg-slate-200 h-1 rounded-full overflow-hidden shrink-0">
            <div className="bg-indigo-600 h-full w-[1.25%]" />
          </div>
        </div>

        <div className="bg-slate-50/50 border border-slate-200/60 p-5 rounded-xl flex items-center gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
          <div className="p-2.5 bg-white border border-slate-100 rounded-lg text-slate-800 shrink-0">
            <ImageIcon className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Toplam Varlık</span>
            <span className="text-sm font-semibold text-slate-900 mt-0.5 block">{assets.length} Adet Medya</span>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <Card key={asset.id} hoverable className="group border border-slate-200/50 relative animate-fade-in">
            <div className="h-44 bg-slate-50 relative overflow-hidden flex items-center justify-center border-b border-slate-100">
              <img
                referrerPolicy="no-referrer"
                src={asset.url}
                alt={asset.altText || asset.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-white rounded-lg text-slate-800 hover:bg-slate-100 transition-all shadow-md"
                >
                  <Download className="h-4 w-4" />
                </a>
                <button
                  onClick={() => handleDelete(asset.id)}
                  className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50 transition-all shadow-md cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <CardContent className="p-4">
              <span className="text-xs font-semibold text-slate-900 block truncate tracking-tight">{asset.name}</span>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] font-mono text-slate-400 font-medium">{asset.width}x{asset.height} px</span>
                <span className="text-[10px] bg-slate-50 text-slate-500 font-semibold border border-slate-200/60 px-1.5 py-0.5 rounded">
                  {formatBytes(asset.sizeBytes)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yeni Medya Varlığı Ekle"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              İptal
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave}>
              Kaydet
            </Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Dosya Adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="örn. bento-banner-features.png"
          />

          <Input
            label="Görsel Adresi (Simüle URL)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="Unsplash veya yerel görsel linki..."
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Mime Türü (Mime Type)"
              value={mimeType}
              onChange={(e) => setMimeType(e.target.value)}
              required
            />
            <Input
              label="Alt Alternatif Açıklama"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="SEO için ekran okuyucu açıklaması..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
