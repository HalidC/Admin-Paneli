import React, { useState, useEffect } from 'react';
import { formsService } from '../../../lib/services/forms-service';
import { FormConfig, FormSubmission } from '../../../types/form';
import { PageHeader } from '../../../components/layout/page-header';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { STATUS_OPTIONS } from '../../../config/status-options';
import { Tabs } from '../../../components/ui/tabs';
import { ListTodo, Check, ShieldAlert, Trash2, Calendar, Mail, RefreshCw } from 'lucide-react';

export default function FormsPage() {
  const [configs, setConfigs] = useState<FormConfig[]>([]);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'submissions' | 'configs'>('submissions');

  const fetchFormData = async () => {
    setLoading(true);
    const [c, s] = await Promise.all([
      formsService.getConfigs(),
      formsService.getSubmissions(),
    ]);
    setConfigs(c);
    setSubmissions(s);
    setLoading(false);
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  const handleToggleConfig = async (id: string) => {
    const updated = await formsService.toggleActive(id);
    setConfigs(configs.map((c) => (c.id === id ? updated : c)));
  };

  const handleUpdateStatus = async (id: string, status: FormSubmission['status']) => {
    const updated = await formsService.updateSubmissionStatus(id, status);
    setSubmissions(submissions.map((s) => (s.id === id ? updated : s)));
  };

  const handleDeleteSubmission = async (id: string) => {
    if (confirm('Bu başvuruyu kalıcı olarak silmek istiyor musunuz?')) {
      await formsService.deleteSubmission(id);
      setSubmissions(submissions.filter((s) => s.id !== id));
      // Optionally decrement the submission count on UI
    }
  };

  const getStatusBadge = (s: FormSubmission['status']) => {
    const option = STATUS_OPTIONS.formSubmission.find((opt) => opt.value === s);
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
        title="Form Yönetimi"
        description="Landing page üzerindeki bülten kayıtları ve iletişim formlarından gelen başvuruları görüntüleyin veya formların durumunu değiştirin."
      />

      <Tabs
        activeTab={activeTab}
        onChange={(id: any) => setActiveTab(id)}
        tabs={[
          { id: 'submissions', label: 'Gelen Başvurular', badge: submissions.filter(s => s.status === 'new').length || undefined },
          { id: 'configs', label: 'Aktif Form Şemaları', badge: configs.length },
        ]}
        className="mb-8"
      />

      {activeTab === 'submissions' ? (
        /* Submissions View */
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gönderen & Form Türü</TableHead>
              <TableHead>Başvuru İçeriği</TableHead>
              <TableHead>Gönderim Tarihi</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((sub) => {
              const formType = configs.find((c) => c.id === sub.formId)?.name || 'Bilinmeyen Form';
              const keys = Object.keys(sub.data);
              const senderName = sub.data['Ad Soyad'] || sub.data['E-posta Adresi'] || 'İsimsiz Kullanıcı';
              const senderEmail = sub.data['E-posta Adresi'] || '';

              return (
                <TableRow key={sub.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 rounded-lg text-slate-600 border border-slate-100">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900 block tracking-tight truncate max-w-[150px]">{senderName}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-1.5 py-0.5 rounded mt-0.5 inline-block">
                          {formType}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-slate-600 max-w-sm space-y-1 py-1">
                      {keys.map((k) => (
                        <p key={k} className="line-clamp-2">
                          <span className="font-semibold text-slate-500">{k}:</span> {sub.data[k]}
                        </p>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(sub.submittedAt).toLocaleString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(sub.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {sub.status !== 'reviewed' && (
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleUpdateStatus(sub.id, 'reviewed')}
                          className="p-1 h-8 w-8 hover:bg-emerald-50 hover:text-emerald-600"
                          title="İncelendi Olarak İşaretle"
                        >
                          <Check className="h-4 w-4 text-emerald-500" />
                        </Button>
                      )}
                      {sub.status !== 'spam' && (
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleUpdateStatus(sub.id, 'spam')}
                          className="p-1 h-8 w-8 hover:bg-amber-50 hover:text-amber-600"
                          title="Spam Olarak İşaretle"
                        >
                          <ShieldAlert className="h-4 w-4 text-amber-500" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => handleDeleteSubmission(sub.id)}
                        className="p-1 h-8 w-8 hover:bg-red-50 hover:text-red-600"
                        title="Sil"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        /* Configs View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {configs.map((config) => (
            <Card key={config.id} className="border border-slate-200/50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{config.name}</CardTitle>
                    <CardDescription>Sülük (Slug): /{config.slug}</CardDescription>
                  </div>
                  <Switch
                    checked={config.isActive}
                    onChange={() => handleToggleConfig(config.id)}
                    label={config.isActive ? 'Aktif' : 'Pasif'}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 text-xs text-slate-500 space-y-2">
                  <p className="font-semibold text-slate-700">Form Alanları (Fields):</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {config.fields.map((f) => (
                      <li key={f.id}>
                        {f.label} ({f.type}) {f.required && <span className="text-red-500">*zorunlu</span>}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center text-xs font-medium text-slate-400">
                  <span>Bildirim Alıcısı: {config.notifyEmail || 'Yok'}</span>
                  <span className="bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
                    {config.submissionsCount} Başvuru
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
