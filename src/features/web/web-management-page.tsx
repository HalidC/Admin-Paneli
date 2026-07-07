import React from 'react';
import { PageHeader } from '../../components/layout/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { ROUTES } from '../../config/routes';
import { LayoutGrid, FileText, BookOpen, HelpCircle, Compass, Search, Image, ListTodo, ChevronRight, Zap } from 'lucide-react';

interface WebManagementPageProps {
  onNavigate: (path: string) => void;
}

export default function WebManagementPage({ onNavigate }: WebManagementPageProps) {
  const managementSections = [
    {
      title: 'Arayüz Bölümleri',
      description: 'Landing page üzerindeki Hero, Özellikler ve CTA bölümlerini yönetin.',
      icon: LayoutGrid,
      path: ROUTES.WEB_LANDING_SECTIONS,
      badge: 'Bento Grid',
    },
    {
      title: 'Sayfalar',
      description: 'Yeni statik veya dinamik sayfalar oluşturun, şablonları düzenleyin.',
      icon: FileText,
      path: ROUTES.WEB_PAGES,
      badge: 'v2.1',
    },
    {
      title: 'Blog Yazıları',
      description: 'İçerik pazarlama süreçleri için zengin makaleler ve duyurular yayınlayın.',
      icon: BookOpen,
      path: ROUTES.WEB_BLOG,
    },
    {
      title: 'Sıkça Sorulanlar (FAQ)',
      description: 'Kullanıcıların destek taleplerini azaltacak kapsamlı FAQ listesi oluşturun.',
      icon: HelpCircle,
      path: ROUTES.WEB_FAQ,
    },
    {
      title: 'Menü & Navigasyon',
      description: 'Sitenin üst bilgi barı ve alt bilgi alanı linklerini yapılandırın.',
      icon: Compass,
      path: ROUTES.WEB_NAVIGATION,
    },
    {
      title: 'SEO Ayarları',
      description: 'Meta başlıkları, açıklamalar, canonical linkler ve site haritası öncelikleri.',
      icon: Search,
      path: ROUTES.WEB_SEO,
      badge: '%98 Başarı',
    },
    {
      title: 'Medya Kütüphanesi',
      description: 'Görseller, logolar ve SVG varlıkları barındırın, alt metinlerini yönetin.',
      icon: Image,
      path: ROUTES.WEB_MEDIA,
    },
    {
      title: 'Form Yönetimi',
      description: 'İletişim ve bülten formlarını inceleyin, yeni alanlar tanımlayın.',
      icon: ListTodo,
      path: ROUTES.WEB_FORMS,
      badge: 'Submissions',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Web Yönetimi"
        description="Bortesoft web sitesinin içeriğini, tasarım bölümlerini, SEO kurallarını ve form başvuru datalarını tek bir ekrandan yönetin."
      />

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
          <CardContent className="p-6">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Web Site Sağlık Skoru</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-slate-900">A+</span>
              <span className="text-sm font-medium text-emerald-600">Mükemmel</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Tüm sayfalar aktif ve SEO kuralları eksiksiz tanımlanmış.</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
          <CardContent className="p-6">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Yayınlanan Yazılar / Sayfalar</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-slate-900">12 / 4</span>
              <span className="text-xs text-slate-400">toplam aktif</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Son güncelleme 3 saat önce Kaan Aksoy tarafından yapıldı.</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
          <CardContent className="p-6">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Gelen Form Başvuruları</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-slate-900">196</span>
              <span className="text-xs text-slate-400">bülten ve iletişim</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Okunmamış veya işlem bekleyen 1 adet yeni form başvurusu var.</p>
          </CardContent>
        </Card>
      </div>

      {/* Bento-inspired module navigations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managementSections.map((section, idx) => {
          const IconComponent = section.icon;
          return (
            <Card
              key={idx}
              hoverable
              className="cursor-pointer group flex flex-col justify-between border-slate-200/60"
              onClick={() => onNavigate(section.path)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-slate-50 text-slate-800 border border-slate-100 rounded-lg group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  {section.badge && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                      {section.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-semibold text-slate-900 tracking-tight flex items-center gap-1 group-hover:text-indigo-600">
                  {section.title}
                  <ChevronRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {section.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
