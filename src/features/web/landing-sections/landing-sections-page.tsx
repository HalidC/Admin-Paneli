import React, { useState, useEffect } from 'react';
import { webSectionsService } from '../../../lib/services/web-sections-service';
import { LandingSection } from '../../../types/landing-section';
import { PageHeader } from '../../../components/layout/page-header';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Drawer } from '../../../components/ui/drawer';
import { Modal } from '../../../components/ui/modal';
import { Input, Textarea, Select } from '../../../components/ui/input';
import { 
  LayoutGrid, 
  Eye, 
  EyeOff, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  RefreshCw, 
  FileText, 
  Globe, 
  Archive, 
  X,
  Play,
  Monitor,
  HelpCircle,
  Cpu,
  Zap,
  Sparkles,
  Search,
  CheckCircle,
  Compass
} from 'lucide-react';

export default function LandingSectionsPage() {
  const [sections, setSections] = useState<LandingSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<LandingSection | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewingSection, setPreviewingSection] = useState<LandingSection | null>(null);
  const [showLivePreviewFrame, setShowLivePreviewFrame] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [anchor, setAnchor] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [ctaLink, setCtaLink] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [publishStatus, setPublishStatus] = useState<LandingSection['publishStatus']>('draft');

  const fetchSections = async () => {
    setLoading(true);
    const data = await webSectionsService.getAll();
    setSections(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleToggleActive = async (section: LandingSection) => {
    const updated = await webSectionsService.update(section.id, { isActive: !section.isActive });
    setSections(sections.map((s) => (s.id === section.id ? updated : s)));
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;

    // Swap
    const temp = newSections[index];
    newSections[index] = newSections[targetIdx];
    newSections[targetIdx] = temp;

    const orderedIds = newSections.map((s) => s.id);
    const reordered = await webSectionsService.reorder(orderedIds);
    setSections(reordered);
  };

  const handleOpenEdit = (section: LandingSection) => {
    setEditingSection(section);
    setName(section.name);
    setKey(section.key);
    setAnchor(section.anchor);
    setTitle(section.title);
    setSubtitle(section.subtitle || '');
    setDescription(section.description || '');
    setCtaText(section.ctaText || '');
    setCtaLink(section.ctaLink || '');
    setIsActive(section.isActive);
    setPublishStatus(section.publishStatus);
    setIsDrawerOpen(true);
  };

  const handleActionSave = async (statusOverride?: LandingSection['publishStatus']) => {
    if (!editingSection) return;

    const targetStatus = statusOverride || publishStatus;
    const updated = await webSectionsService.update(editingSection.id, {
      name,
      key,
      anchor,
      title,
      subtitle,
      description,
      ctaText,
      ctaLink,
      isActive,
      publishStatus: targetStatus,
    });

    setSections(sections.map((s) => (s.id === editingSection.id ? updated : s)));
    setIsDrawerOpen(false);
    setEditingSection(null);
  };

  const handleOpenQuickPreview = (section: LandingSection) => {
    setPreviewingSection(section);
    setIsPreviewModalOpen(true);
  };

  const handleOpenEditorPreview = () => {
    // Open preview with form states
    const tempSection: LandingSection = {
      id: editingSection?.id || 'temp',
      name,
      key,
      anchor,
      title,
      subtitle,
      description,
      isActive,
      publishStatus,
      order: editingSection?.order || 1,
      ctaText,
      ctaLink,
      updatedAt: new Date().toISOString()
    };
    setPreviewingSection(tempSection);
    setIsPreviewModalOpen(true);
  };

  const getPublishStatusBadge = (status: LandingSection['publishStatus']) => {
    switch (status) {
      case 'published':
        return <Badge variant="success">Yayında</Badge>;
      case 'draft':
        return <Badge variant="warning">Taslak</Badge>;
      case 'archived':
        return <Badge variant="neutral">Arşivlendi</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
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
        title="Arayüz Bölümleri"
        description="Bortesoft SaaS landing sayfasındaki tüm asimetrik ve akıllı bölümleri (Hero, Problem, Modules, AI Assistant vb.) yapılandırın."
        actions={
          <div className="flex gap-2">
            <Button 
              variant={showLivePreviewFrame ? 'primary' : 'outline'} 
              size="sm" 
              onClick={() => setShowLivePreviewFrame(!showLivePreviewFrame)} 
              className="gap-1.5"
            >
              <Monitor className="h-4 w-4" />
              {showLivePreviewFrame ? 'Listeyi Göster' : 'Sayfayı Önizle'}
            </Button>
          </div>
        }
      />

      {/* Live Preview Mode */}
      {showLivePreviewFrame ? (
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-xs font-semibold text-slate-700">Bortesoft Canlı Sayfa Düzeni (Önizleme)</p>
            </div>
            <Button size="xs" variant="outline" onClick={() => setShowLivePreviewFrame(false)}>
              Düzenleyiciye Dön
            </Button>
          </div>

          {/* Interactive landing-page render frame */}
          <div className="border border-slate-200/80 rounded-2xl bg-zinc-50/50 shadow-xl overflow-hidden max-w-4xl mx-auto">
            {/* Header / Menu Bar */}
            <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <span className="text-sm font-extrabold text-slate-900 tracking-tight">borte<span className="text-indigo-600">soft</span></span>
              <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-500">
                {sections.filter(s => s.isActive && s.publishStatus === 'published').map(s => (
                  <a key={s.id} href={s.anchor} className="hover:text-slate-900 transition-colors">{s.name}</a>
                ))}
              </div>
              <Button size="xs" variant="primary" className="bg-indigo-600">Demo Talebi</Button>
            </div>

            {/* Simulated Canvas Blocks */}
            <div className="p-8 space-y-16 bg-white min-h-[600px]">
              {sections
                .filter(s => s.isActive && s.publishStatus === 'published')
                .map((sec) => (
                  <div key={sec.id} id={sec.anchor.replace('#', '')} className="scroll-mt-10 border-b border-slate-50 pb-12 last:border-0 last:pb-0">
                    <div className="max-w-2xl mx-auto text-center space-y-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50/60 border border-indigo-100/40 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mx-auto">
                        <Sparkles className="h-3 w-3" />
                        {sec.name}
                      </div>
                      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {sec.title}
                      </h2>
                      {sec.subtitle && (
                        <p className="text-sm text-slate-500 max-w-lg mx-auto font-normal leading-relaxed">
                          {sec.subtitle}
                        </p>
                      )}
                      {sec.description && (
                        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                          {sec.description}
                        </p>
                      )}
                      {sec.ctaText && (
                        <div className="pt-2">
                          <Button size="sm" variant="primary" className="bg-indigo-600 text-white font-semibold shadow-md">
                            {sec.ctaText}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        /* Regular List Mode */
        <div className="space-y-6">
          {sections.map((section, idx) => (
            <Card key={section.id} hoverable className="border border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                
                {/* Information Block */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 bg-slate-50 rounded-xl text-slate-800 border border-slate-100">
                      <LayoutGrid className="h-4.5 w-4.5 text-indigo-600" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900 tracking-tight">{section.name}</h3>
                        <span className="text-[10px] font-semibold text-slate-400 font-mono bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                          {section.key}
                        </span>
                        <Badge variant={section.isActive ? 'success' : 'neutral'}>
                          {section.isActive ? 'Aktif' : 'Pasif'}
                        </Badge>
                        {getPublishStatusBadge(section.publishStatus)}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 font-medium">
                        Çapa Linki: <span className="font-mono text-slate-500 font-bold">{section.anchor}</span> • Sıra: #{section.order}
                      </p>
                    </div>
                  </div>

                  {/* Visual Content Sample block */}
                  <div className="mt-4 border-l-2 border-slate-200 pl-4 py-0.5">
                    <h4 className="text-xs font-bold text-slate-800 leading-normal">{section.title}</h4>
                    {section.subtitle && (
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{section.subtitle}</p>
                    )}
                    {section.description && (
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{section.description}</p>
                    )}
                  </div>
                </div>

                {/* Control rail Actions */}
                <div className="flex items-center gap-4 justify-end">
                  {/* Active Toggle Switch */}
                  <Switch
                    checked={section.isActive}
                    onChange={() => handleToggleActive(section)}
                    label="Yayında"
                  />

                  {/* Move Up/Down buttons */}
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      onClick={() => handleMove(idx, 'up')}
                      disabled={idx === 0}
                      className="p-2 hover:bg-slate-200 text-slate-500 disabled:opacity-30 cursor-pointer"
                      title="Yukarı Taşı"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <div className="w-[1px] bg-slate-200 self-stretch" />
                    <button
                      onClick={() => handleMove(idx, 'down')}
                      disabled={idx === sections.length - 1}
                      className="p-2 hover:bg-slate-200 text-slate-500 disabled:opacity-30 cursor-pointer"
                      title="Aşağı Taşı"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Quick Preview Button */}
                  <Button variant="outline" size="xs" onClick={() => handleOpenQuickPreview(section)} className="gap-1 px-2.5 py-1 text-xs">
                    <Eye className="h-3.5 w-3.5 text-slate-500" />
                    Önizle
                  </Button>

                  {/* Edit Button */}
                  <Button variant="outline" size="sm" onClick={() => handleOpenEdit(section)} className="gap-1.5 text-xs font-semibold">
                    <Edit3 className="h-3.5 w-3.5 text-slate-500" />
                    Düzenle
                  </Button>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Expanded Editor Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingSection(null);
        }}
        title={`${name || 'Bölüm'} Bölüm Detaylarını Yapılandır`}
      >
        <div className="space-y-6 pb-20">
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Bölüm Adı"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="örn. Kahraman (Hero)"
            />
            <Input
              label="Key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
              placeholder="örn. hero"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Çapa Linki (Anchor)"
              value={anchor}
              onChange={(e) => setAnchor(e.target.value)}
              required
              placeholder="örn. #hero"
            />
            <Select
              label="Yayın Durumu"
              value={publishStatus}
              onChange={(e: any) => setPublishStatus(e.target.value)}
              options={[
                { value: 'draft', label: 'Taslak (Draft)' },
                { value: 'published', label: 'Yayında (Published)' },
                { value: 'archived', label: 'Arşivlendi (Archived)' }
              ]}
            />
          </div>

          <Input
            label="Bölüm Başlığı"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Başlık metnini girin..."
          />

          <Textarea
            label="Alt Başlık (Subtitle)"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Kısa tamamlayıcı alt başlık..."
            rows={2}
          />

          <Textarea
            label="Açıklama (Description)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Bölümün detaylı açıklama metni..."
            rows={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="CTA Buton Metni"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="örn. Randevu Al"
            />
            <Input
              label="CTA Linki"
              value={ctaLink}
              onChange={(e) => setCtaLink(e.target.value)}
              placeholder="örn. /demo-request"
            />
          </div>

          {/* Active Passive state Switch */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 block">Aktif / Pasif Durumu</span>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">Landing sayfasında görünürlük durumunu açıp kapatır.</p>
            </div>
            <Switch
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
          </div>

          {/* Last updated information */}
          {editingSection && (
            <div className="text-[11px] text-slate-400 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
              Son Güncelleme: <span className="font-mono text-slate-600 font-semibold">{new Date(editingSection.updatedAt).toLocaleString('tr-TR')}</span>
            </div>
          )}

          {/* Actions panel */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-2.5">
            {/* Draft button */}
            <Button 
              variant="outline" 
              size="sm" 
              type="button" 
              onClick={() => handleActionSave('draft')}
              className="flex-1 bg-amber-50 border-amber-200/50 hover:bg-amber-100 text-amber-800 font-semibold gap-1"
            >
              <FileText className="h-3.5 w-3.5" />
              Taslak Kaydet
            </Button>

            {/* Preview button */}
            <Button 
              variant="outline" 
              size="sm" 
              type="button" 
              onClick={handleOpenEditorPreview}
              className="flex-1 border-slate-200 font-semibold gap-1"
            >
              <Eye className="h-3.5 w-3.5" />
              Önizle
            </Button>

            {/* Publish button */}
            <Button 
              variant="primary" 
              size="sm" 
              type="button" 
              onClick={() => handleActionSave('published')}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold gap-1 shadow-[0_2px_8px_rgba(79,70,229,0.15)]"
            >
              <Globe className="h-3.5 w-3.5" />
              Yayınla
            </Button>

            {/* Archive button */}
            <Button 
              variant="outline" 
              size="sm" 
              type="button" 
              onClick={() => handleActionSave('archived')}
              className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200 font-semibold gap-1"
            >
              <Archive className="h-3.5 w-3.5" />
              Arşivle
            </Button>

            {/* Cancel button */}
            <Button 
              variant="outline" 
              size="sm" 
              type="button" 
              onClick={() => {
                setIsDrawerOpen(false);
                setEditingSection(null);
              }}
              className="w-full text-slate-400 hover:text-slate-600 border-transparent hover:bg-slate-50 font-semibold mt-1"
            >
              Vazgeç
            </Button>
          </div>

        </div>
      </Drawer>

      {/* Interactive visual Modal for single Section Preview */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setPreviewingSection(null);
        }}
        title={`${previewingSection?.name || 'Bölüm'} Canlı Önizleme`}
        footer={
          <Button variant="outline" size="sm" onClick={() => setIsPreviewModalOpen(false)}>
            Kapat
          </Button>
        }
      >
        {previewingSection && (
          <div className="py-6 px-4 bg-zinc-50/50 border border-slate-100 rounded-2xl">
            <div className="max-w-xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="h-3 w-3 animate-spin" />
                {previewingSection.name}
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {previewingSection.title}
              </h2>
              {previewingSection.subtitle && (
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {previewingSection.subtitle}
                </p>
              )}
              {previewingSection.description && (
                <p className="text-xs text-slate-400 font-normal leading-relaxed">
                  {previewingSection.description}
                </p>
              )}
              {previewingSection.ctaText && (
                <div className="pt-3">
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg shadow-indigo-600/10 gap-1.5">
                    {previewingSection.ctaText}
                    <Play className="h-3 w-3 fill-current" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
