import React, { useState, useEffect } from 'react';
import { webSectionsService } from '../../../lib/services/web-sections-service';
import { LandingSection } from '../../../types/landing-section';
import { PageHeader } from '../../../components/layout/page-header';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Drawer } from '../../../components/ui/drawer';
import { Input, Textarea } from '../../../components/ui/input';
import { LayoutGrid, Eye, EyeOff, Edit3, ArrowUp, ArrowDown, Save, RefreshCw } from 'lucide-react';

export default function LandingSectionsPage() {
  const [sections, setSections] = useState<LandingSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<LandingSection | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [badgeText, setBadgeText] = useState('');

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
    setTitle(section.title);
    setSubtitle(section.subtitle || '');
    setCtaText(section.content.ctaText || section.content.buttonText || '');
    setBadgeText(section.content.badgeText || '');
    setIsDrawerOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;

    const updatedContent = { ...editingSection.content };
    if (editingSection.type === 'hero') {
      updatedContent.ctaText = ctaText;
      updatedContent.badgeText = badgeText;
    } else if (editingSection.type === 'cta') {
      updatedContent.buttonText = ctaText;
    }

    const updated = await webSectionsService.update(editingSection.id, {
      title,
      subtitle,
      content: updatedContent,
    });

    setSections(sections.map((s) => (s.id === editingSection.id ? updated : s)));
    setIsDrawerOpen(false);
    setEditingSection(null);
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
        description="Landing page üzerinde yer alan ana görsel, bento grid özellikleri, müşteri logoları ve harekete geçirici buton alanlarını yapılandırın."
      />

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <Card key={section.id} hoverable className="border border-slate-200/50">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Info Block */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-slate-50 rounded-lg text-slate-800 border border-slate-100">
                    <LayoutGrid className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-900 tracking-tight">{section.name}</h3>
                      <Badge variant={section.isActive ? 'success' : 'neutral'}>
                        {section.isActive ? 'Aktif' : 'Gizli'}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Tip: {section.type} • Sıralama: #{section.order}</p>
                  </div>
                </div>

                <div className="mt-4 border-l-2 border-slate-200 pl-4">
                  <h4 className="text-xs font-semibold text-slate-800 leading-normal">{section.title}</h4>
                  {section.subtitle && (
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{section.subtitle}</p>
                  )}
                </div>
              </div>

              {/* Action Rails */}
              <div className="flex items-center gap-4 justify-end">
                {/* Switch active state */}
                <Switch
                  checked={section.isActive}
                  onChange={() => handleToggleActive(section)}
                  label="Yayınla"
                />

                {/* Move actions */}
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <button
                    onClick={() => handleMove(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 hover:bg-slate-200 text-slate-500 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <div className="w-[1px] bg-slate-200 self-stretch" />
                  <button
                    onClick={() => handleMove(idx, 'down')}
                    disabled={idx === sections.length - 1}
                    className="p-1.5 hover:bg-slate-200 text-slate-500 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Edit Button */}
                <Button variant="outline" size="sm" onClick={() => handleOpenEdit(section)} className="gap-1.5">
                  <Edit3 className="h-3.5 w-3.5 text-slate-500" />
                  Düzenle
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Editor Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={`${editingSection?.name || 'Bölüm'} İçeriğini Düzenle`}
      >
        <form onSubmit={handleSave} className="space-y-6">
          <Input
            label="Başlık (Title)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Ana başlık metni..."
          />

          <Textarea
            label="Alt Başlık (Subtitle)"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Alt açıklama metni..."
            rows={3}
          />

          {editingSection?.type === 'hero' && (
            <>
              <Input
                label="Buton Metni (CTA Text)"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="Buton üstü metin..."
              />
              <Input
                label="Üst Duyuru Rozeti (Badge Text)"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                placeholder="örn. Bortesoft v2 Yayında!"
              />
            </>
          )}

          {editingSection?.type === 'cta' && (
            <Input
              label="Harekete Geçirici Buton Metni"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="Buton üstü metin..."
            />
          )}

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
