import React, { useState, useEffect } from 'react';
import { demoRecordsService } from '../../lib/services/demo-records-service';
import { DemoRecord } from '../../types/demo-record';
import { PageHeader } from '../../components/layout/page-header';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Modal } from '../../components/ui/modal';
import { Input, Select, Textarea } from '../../components/ui/input';
import { STATUS_OPTIONS } from '../../config/status-options';
import { Presentation, Edit2, Search, Filter, Calendar, Building, User, HelpCircle, RefreshCw, Sparkles } from 'lucide-react';

export default function DemoRecordsPage() {
  const [records, setRecords] = useState<DemoRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DemoRecord | null>(null);

  // Detail/Form states
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<DemoRecord['status']>('pending');
  const [assignedTo, setAssignedTo] = useState('');

  const fetchRecords = async () => {
    setLoading(true);
    const data = await demoRecordsService.getAll();
    setRecords(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleOpenEdit = (record: DemoRecord) => {
    setEditingRecord(record);
    setNotes(record.notes || '');
    setStatus(record.status);
    setAssignedTo(record.assignedTo || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord) return;

    const updated = await demoRecordsService.update(editingRecord.id, {
      notes,
      status,
      assignedTo,
    });

    setRecords(records.map((r) => (r.id === editingRecord.id ? updated : r)));
    setIsModalOpen(false);
  };

  // Filter & Search Logic
  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || rec.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (s: DemoRecord['status']) => {
    const option = STATUS_OPTIONS.demoRecord.find((opt) => opt.value === s);
    return (
      <Badge variant={option?.color as any || 'neutral'} className="font-semibold px-2.5 py-0.5">
        {option?.label || s}
      </Badge>
    );
  };

  const getPlanBadge = (plan: DemoRecord['requestedPlan']) => {
    switch (plan) {
      case 'enterprise':
        return <Badge variant="danger" className="text-[10px] font-bold">ENTERPRISE</Badge>;
      case 'scale':
        return <Badge variant="info" className="text-[10px] font-bold">SCALE PLAN</Badge>;
      default:
        return <Badge variant="neutral" className="text-[10px] font-bold">GROWTH PLAN</Badge>;
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
        title="Demo Kayıtları & Pipeline"
        description="Bortesoft web sitesinden gelen kurumsal demo taleplerini, atanan satış temsilcilerini ve müşteri adayı aşamalarını takip edin."
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Müşteri adı, şirket veya e-posta ile ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-slate-200 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span>Filtrele:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="pending">Bekleyenler</option>
            <option value="scheduled">Planlananlar</option>
            <option value="completed">Tamamlananlar</option>
            <option value="canceled">İptal Edilenler</option>
          </select>
        </div>
      </div>

      {/* Submissions pipeline */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Müşteri & Şirket</TableHead>
            <TableHead>Şirket Ölçeği</TableHead>
            <TableHead>Talep Edilen Paket</TableHead>
            <TableHead>Tarih</TableHead>
            <TableHead>Atanan Temsilci</TableHead>
            <TableHead>Aşama Durumu</TableHead>
            <TableHead className="text-right">İşlem</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((rec) => (
              <TableRow key={rec.id}>
                <TableCell>
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 shrink-0">
                      <Building className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block tracking-tight">{rec.fullName}</span>
                      <span className="text-[10px] text-slate-400 block font-medium mt-0.5">
                        {rec.companyName} • {rec.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-slate-500 text-xs font-medium">{rec.companySize} Çalışan</TableCell>
                <TableCell>{getPlanBadge(rec.requestedPlan)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(rec.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs text-slate-600 font-semibold flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    {rec.assignedTo || 'Atanmamış'}
                  </span>
                </TableCell>
                <TableCell>{getStatusBadge(rec.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="xs" onClick={() => handleOpenEdit(rec)} className="gap-1.5 px-3 py-1 border border-slate-100 rounded-md">
                    <Edit2 className="h-3 w-3 text-slate-500" />
                    İncele
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10 text-slate-400">
                Arama kriterlerinize uygun hiçbir demo kaydı bulunamadı.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Detail & Pipeline Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Demo Talebi & Pipeline İnceleme"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Kapat
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave}>
              Değişiklikleri Kaydet
            </Button>
          </>
        }
      >
        {editingRecord && (
          <div className="space-y-6">
            {/* Meta Cards */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[9px]">Müşteri Temsilcisi</span>
                <span className="text-slate-900 font-bold mt-1 block">{editingRecord.fullName}</span>
                <span className="text-slate-500 block mt-0.5">{editingRecord.email}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[9px]">Şirket Detayı</span>
                <span className="text-slate-900 font-bold mt-1 block">{editingRecord.companyName}</span>
                <span className="text-slate-500 block mt-0.5">{editingRecord.companySize} çalışan • {getPlanBadge(editingRecord.requestedPlan)}</span>
              </div>
            </div>

            {/* Notes Section */}
            {editingRecord.notes && (
              <div className="p-4 bg-slate-50/50 rounded-lg border border-slate-100/40">
                <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider mb-1.5">Müşterinin Notu:</span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium italic">"{editingRecord.notes}"</p>
              </div>
            )}

            {/* Modifier Form */}
            <form onSubmit={handleSave} className="space-y-4 pt-4 border-t border-slate-200">
              <Select
                label="Boru Hattı Aşaması (Pipeline Status)"
                value={status}
                onChange={(e: any) => setStatus(e.target.value)}
                options={[
                  { value: 'pending', label: 'Bekliyor (Pending)' },
                  { value: 'scheduled', label: 'Planlandı / Toplantı Ayarlandı' },
                  { value: 'completed', label: 'Tamamlandı / Satış Gerçekleşti' },
                  { value: 'canceled', label: 'İptal Edildi' },
                ]}
              />

              <Select
                label="Satış Temsilcisi Ata"
                value={assignedTo}
                onChange={(e: any) => setAssignedTo(e.target.value)}
                options={[
                  { value: '', label: 'Seçiniz (Atanmamış)' },
                  { value: 'Kaan Aksoy', label: 'Kaan Aksoy (Satış Direktörü)' },
                  { value: 'Zeynep Kaya', label: 'Zeynep Kaya (Kıdemli CRM)' },
                  { value: 'Mert Yılmaz', label: 'Mert Yılmaz (Onboarding)' },
                ]}
              />

              <Textarea
                label="Yönetici İç Notları"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Toplantı sonuçları veya süreç hakkındaki takip notlarınızı buraya yazın..."
                rows={3}
              />
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}
