import React, { useState, useEffect } from 'react';
import { navigationService } from '../../../lib/services/navigation-service';
import { MenuLink } from '../../../lib/mock-data/navigation';
import { PageHeader } from '../../../components/layout/page-header';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Modal } from '../../../components/ui/modal';
import { Input, Select } from '../../../components/ui/input';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Compass, ExternalLink, RefreshCw } from 'lucide-react';

export default function NavigationPage() {
  const [links, setLinks] = useState<MenuLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<MenuLink | null>(null);

  // Form states
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [order, setOrder] = useState(1);
  const [isOpenNewTab, setIsOpenNewTab] = useState(false);
  const [status, setStatus] = useState<'active' | 'draft'>('draft');

  const fetchLinks = async () => {
    setLoading(true);
    const data = await navigationService.getAll();
    setLinks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleOpenAdd = () => {
    setEditingLink(null);
    setLabel('');
    setUrl('');
    setOrder(links.length + 1);
    setIsOpenNewTab(false);
    setStatus('draft');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (link: MenuLink) => {
    setEditingLink(link);
    setLabel(link.label);
    setUrl(link.url);
    setOrder(link.order);
    setIsOpenNewTab(link.isOpenNewTab);
    setStatus(link.status);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { label, url, order: Number(order), isOpenNewTab, status };

    if (editingLink) {
      const updated = await navigationService.update(editingLink.id, payload);
      setLinks(links.map((l) => (l.id === editingLink.id ? updated : l)));
    } else {
      const created = await navigationService.create(payload);
      setLinks([...links, created]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bu menü linkini silmek istediğinize emin misiniz?')) {
      await navigationService.delete(id);
      setLinks(links.filter((l) => l.id !== id));
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const newLinks = [...links];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= links.length) return;

    // Swap
    const temp = newLinks[index];
    newLinks[index] = newLinks[targetIdx];
    newLinks[targetIdx] = temp;

    const orderedIds = newLinks.map((l) => l.id);
    const reordered = await navigationService.reorder(orderedIds);
    setLinks(reordered);
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
        title="Menü & Navigasyon"
        description="Müşterilerinizin Bortesoft ana sayfasında ve alt bilgi (footer) alanında göreceği başlık linklerini düzenleyin, yönlendirmeleri ayarlayın."
        actions={
          <Button variant="primary" size="sm" onClick={handleOpenAdd} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Yeni Link Ekle
          </Button>
        }
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sıra</TableHead>
            <TableHead>Menü Başlığı & URL</TableHead>
            <TableHead>Yeni Sekme</TableHead>
            <TableHead>Yayın Durumu</TableHead>
            <TableHead className="text-right">Sıralama / İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link, idx) => (
            <TableRow key={link.id}>
              <TableCell className="font-mono font-semibold text-slate-400">#{link.order}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-600 border border-slate-100">
                    <Compass className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block tracking-tight">{link.label}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{link.url}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {link.isOpenNewTab ? (
                  <Badge variant="info" className="gap-1 px-1.5 py-0.5 text-[10px]">
                    <ExternalLink className="h-2.5 w-2.5" />
                    Yeni Sekmede
                  </Badge>
                ) : (
                  <span className="text-slate-400 text-xs font-medium">Aynı Sekmede</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant={link.status === 'active' ? 'success' : 'neutral'}>
                  {link.status === 'active' ? 'Aktif' : 'Taslak'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-3">
                  {/* Sorting controls */}
                  <div className="flex items-center border border-slate-200 rounded bg-slate-50 overflow-hidden h-8">
                    <button
                      onClick={() => handleMove(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 hover:bg-slate-200 text-slate-500 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <div className="w-[1px] bg-slate-200 self-stretch" />
                    <button
                      onClick={() => handleMove(idx, 'down')}
                      disabled={idx === links.length - 1}
                      className="p-1 hover:bg-slate-200 text-slate-500 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Standard CRUD operations */}
                  <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
                    <Button variant="ghost" size="xs" onClick={() => handleOpenEdit(link)} className="p-1 h-8 w-8">
                      <Edit2 className="h-3.5 w-3.5 text-slate-500" />
                    </Button>
                    <Button variant="ghost" size="xs" onClick={() => handleDelete(link.id)} className="p-1 h-8 w-8 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-3.5 w-3.5 text-red-500" />
                    </Button>
                  </div>
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
        title={editingLink ? 'Menü Linkini Düzenle' : 'Yeni Menü Linki Oluştur'}
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
            label="Menü Link Başlığı (Label)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
            placeholder="örn. Blog"
          />

          <Input
            label="Yönlendirme Adresi (URL)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="örn. /blog veya https://docs.bortesoft.com"
          />

          <div className="grid grid-cols-2 gap-4 items-center">
            <Input
              label="Sıralama No"
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              required
            />
            <Select
              label="Yayın Durumu"
              value={status}
              onChange={(e: any) => setStatus(e.target.value)}
              options={[
                { value: 'active', label: 'Aktif' },
                { value: 'draft', label: 'Taslak' },
              ]}
            />
          </div>

          <div className="pt-2">
            <Switch
              checked={isOpenNewTab}
              onChange={setIsOpenNewTab}
              label="Yeni tarayıcı sekmesinde açılsın (target='_blank')"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
