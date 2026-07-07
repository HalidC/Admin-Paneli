import React, { useState, useEffect } from 'react';
import { webPagesService } from '../../../lib/services/web-pages-service';
import { WebPage } from '../../../types/web';
import { PageHeader } from '../../../components/layout/page-header';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Modal } from '../../../components/ui/modal';
import { Input, Select } from '../../../components/ui/input';
import { STATUS_OPTIONS } from '../../../config/status-options';
import { Plus, Edit2, Trash2, Calendar, FileText, RefreshCw, Layers } from 'lucide-react';

export default function WebPagesPage() {
  const [pages, setPages] = useState<WebPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<WebPage | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [layout, setLayout] = useState<'default' | 'landing' | 'minimal' | 'blog'>('default');
  const [author, setAuthor] = useState('Sistem Yöneticisi');
  const [status, setStatus] = useState<WebPage['status']>('draft');

  const fetchPages = async () => {
    setLoading(true);
    const data = await webPagesService.getAll();
    setPages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleOpenAdd = () => {
    setEditingPage(null);
    setTitle('');
    setSlug('');
    setLayout('default');
    setAuthor('Sistem Yöneticisi');
    setStatus('draft');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (page: WebPage) => {
    setEditingPage(page);
    setTitle(page.title);
    setSlug(page.slug);
    setLayout(page.layout);
    setAuthor(page.author);
    setStatus(page.status);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, slug, layout, author, status };

    if (editingPage) {
      const updated = await webPagesService.update(editingPage.id, payload);
      setPages(pages.map((p) => (p.id === editingPage.id ? updated : p)));
    } else {
      const created = await webPagesService.create(payload);
      setPages([...pages, created]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bu sayfayı silmek istediğinize emin misiniz?')) {
      await webPagesService.delete(id);
      setPages(pages.filter((p) => p.id !== id));
    }
  };

  const getStatusBadge = (s: WebPage['status']) => {
    const option = STATUS_OPTIONS.webPage.find((opt) => opt.value === s);
    return (
      <Badge variant={option?.color as any || 'neutral'}>
        {option?.label || s}
      </Badge>
    );
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
        title="Web Sayfaları"
        description="Bortesoft web uygulamasındaki tüm alt ve üst sayfaları oluşturun, taslak olarak saklayın veya canlıya yayınlayın."
        actions={
          <Button variant="primary" size="sm" onClick={handleOpenAdd} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Yeni Sayfa
          </Button>
        }
      />

      {/* Pages table list */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sayfa Başlığı & URL</TableHead>
            <TableHead>Şablon Düzeni (Layout)</TableHead>
            <TableHead>Yazar</TableHead>
            <TableHead>Son Değişiklik</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page) => (
            <TableRow key={page.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-600 border border-slate-100">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block tracking-tight">{page.title}</span>
                    <code className="text-[10px] text-slate-400 font-mono font-medium">{page.slug}</code>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium capitalize">
                  <Layers className="h-3.5 w-3.5 text-slate-400" />
                  {page.layout}
                </div>
              </TableCell>
              <TableCell className="text-slate-500 text-xs font-medium">{page.author}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(page.lastModified).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(page.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="xs" onClick={() => handleOpenEdit(page)} className="p-1 h-8 w-8">
                    <Edit2 className="h-3.5 w-3.5 text-slate-500" />
                  </Button>
                  <Button variant="ghost" size="xs" onClick={() => handleDelete(page.id)} className="p-1 h-8 w-8 hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Editor Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPage ? 'Sayfayı Düzenle' : 'Yeni Sayfa Oluştur'}
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
            label="Sayfa Başlığı"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="örn. Hakkımızda"
          />

          <Input
            label="URL Sülüğü (Slug)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="örn. /hakkimizda"
          />

          <Select
            label="Şablon (Layout)"
            value={layout}
            onChange={(e: any) => setLayout(e.target.value)}
            options={[
              { value: 'default', label: 'Varsayılan Şablon' },
              { value: 'landing', label: 'Landing Page v2' },
              { value: 'minimal', label: 'Minimalist Detay' },
              { value: 'blog', label: 'Zengin Blog/Haber Düzeni' },
            ]}
          />

          <Input
            label="Yazar Adı"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          <Select
            label="Yayın Durumu"
            value={status}
            onChange={(e: any) => setStatus(e.target.value)}
            options={[
              { value: 'published', label: 'Yayına Al (Published)' },
              { value: 'draft', label: 'Taslak Olarak Tut (Draft)' },
              { value: 'archived', label: 'Arşive Kaldır (Archived)' },
            ]}
          />
        </form>
      </Modal>
    </div>
  );
}
