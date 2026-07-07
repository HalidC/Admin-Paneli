import React, { useState, useEffect } from 'react';
import { faqService } from '../../../lib/services/faq-service';
import { FAQItem } from '../../../types/faq';
import { PageHeader } from '../../../components/layout/page-header';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Modal } from '../../../components/ui/modal';
import { Input, Textarea, Select } from '../../../components/ui/input';
import { STATUS_OPTIONS } from '../../../config/status-options';
import { Plus, Edit2, Trash2, HelpCircle, RefreshCw } from 'lucide-react';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);

  // Form states
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('Genel');
  const [order, setOrder] = useState(1);
  const [status, setStatus] = useState<FAQItem['status']>('draft');

  const fetchFaqs = async () => {
    setLoading(true);
    const data = await faqService.getAll();
    setFaqs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setQuestion('');
    setAnswer('');
    setCategory('Genel');
    setOrder(faqs.length + 1);
    setStatus('draft');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FAQItem) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category);
    setOrder(faq.order);
    setStatus(faq.status);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { question, answer, category, order: Number(order), status };

    if (editingFaq) {
      const updated = await faqService.update(editingFaq.id, payload);
      setFaqs(faqs.map((f) => (f.id === editingFaq.id ? updated : f)));
    } else {
      const created = await faqService.create(payload);
      setFaqs([...faqs, created]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bu sıkça sorulan soruyu silmek istediğinize emin misiniz?')) {
      await faqService.delete(id);
      setFaqs(faqs.filter((f) => f.id !== id));
    }
  };

  const getStatusBadge = (s: FAQItem['status']) => {
    const option = STATUS_OPTIONS.faqItem.find((opt) => opt.value === s);
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
        title="Sıkça Sorulan Sorular"
        description="Müşterilerinizin kafalarındaki teknik ve finansal soru işaretlerini önceden giderin, destek ekibinin yükünü azaltın."
        actions={
          <Button variant="primary" size="sm" onClick={handleOpenAdd} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Yeni Soru
          </Button>
        }
      />

      {/* FAQ items list */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sıra & Soru</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Cevap Özeti</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faqs.map((faq) => (
            <TableRow key={faq.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-semibold text-slate-400">#{faq.order}</span>
                  <div className="flex items-center gap-2 max-w-sm">
                    <HelpCircle className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-900 block truncate tracking-tight">{faq.question}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="neutral" className="bg-slate-50 border border-slate-100 text-slate-600 font-semibold px-2 py-0.5">
                  {faq.category}
                </Badge>
              </TableCell>
              <TableCell className="max-w-xs truncate text-xs text-slate-500 font-medium">
                {faq.answer}
              </TableCell>
              <TableCell>{getStatusBadge(faq.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="xs" onClick={() => handleOpenEdit(faq)} className="p-1 h-8 w-8">
                    <Edit2 className="h-3.5 w-3.5 text-slate-500" />
                  </Button>
                  <Button variant="ghost" size="xs" onClick={() => handleDelete(faq.id)} className="p-1 h-8 w-8 hover:bg-red-50 hover:text-red-600">
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
        title={editingFaq ? 'Soruyu Düzenle' : 'Yeni Soru & Cevap Oluştur'}
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
            label="Soru (Question)"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            placeholder="örn. Bortesoft hangi veritabanı altyapılarını destekler?"
          />

          <Textarea
            label="Cevap (Answer)"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            placeholder="Açıklayıcı cevap metnini buraya girin..."
            rows={4}
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Kategori"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              placeholder="örn. Teknik, Fiyatlandırma"
            />
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
                { value: 'active', label: 'Yayınla (Active)' },
                { value: 'draft', label: 'Taslak (Draft)' },
              ]}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
