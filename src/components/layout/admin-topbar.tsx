import React from 'react';
import { MAIN_NAVIGATION } from '../../config/navigation';
import { ChevronRight, ArrowUpRight, Search, Bell } from 'lucide-react';

interface AdminTopbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function AdminTopbar({ currentPath, onNavigate }: AdminTopbarProps) {
  // Compute breadcrumbs based on active path
  const getBreadcrumbs = () => {
    const parts = currentPath.split('/').filter(Boolean);
    const breadcrumbs: { label: string; path: string }[] = [{ label: 'Ana Panel', path: '/' }];

    if (parts.length === 0) return breadcrumbs;

    if (parts[0] === 'web') {
      breadcrumbs.push({ label: 'Web Yönetimi', path: '/web' });
      if (parts[1]) {
        const subMap: Record<string, string> = {
          'landing-sections': 'Arayüz Bölümleri',
          'pages': 'Sayfalar',
          'blog': 'Blog Yazıları',
          'faq': 'Sıkça Sorulanlar',
          'navigation': 'Menü & Navigasyon',
          'seo': 'SEO Ayarları',
          'media': 'Medya Kütüphanesi',
          'forms': 'Form Yönetimi',
        };
        breadcrumbs.push({ label: subMap[parts[1]] || parts[1], path: currentPath });
      }
    } else if (parts[0] === 'demo-records') {
      breadcrumbs.push({ label: 'Demo Kayıtları', path: '/demo-records' });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between shrink-0 select-none z-10 sticky top-0">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2">
        {breadcrumbs.map((bc, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            <React.Fragment key={bc.path}>
              <span
                onClick={() => !isLast && onNavigate(bc.path)}
                className={`text-xs font-medium cursor-pointer transition-colors ${
                  isLast ? 'text-slate-900 font-semibold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {bc.label}
              </span>
              {!isLast && <ChevronRight className="h-3.5 w-3.5 text-slate-300" />}
            </React.Fragment>
          );
        })}
      </div>

      {/* Right action slots */}
      <div className="flex items-center gap-4">
        {/* Quick Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            readOnly
            placeholder="Arama yap... (⌘K)"
            className="w-64 pl-10 pr-4 py-1.5 rounded-full bg-slate-100 border-none text-xs font-semibold placeholder:text-slate-400 outline-none cursor-pointer focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Action icons */}
        <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-indigo-600 rounded-full" />
        </button>

        {/* Live Public Link */}
        <a
          href="https://bortesoft.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-semibold hover:text-slate-900 transition-all ml-2"
        >
          <span>Sitemize Git</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
        </a>
      </div>
    </header>
  );
}
