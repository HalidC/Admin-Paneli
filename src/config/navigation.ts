import { ROUTES } from './routes';

export interface NavigationItem {
  label: string;
  path: string;
  iconName: string; // Used to look up Lucide icons dynamically
  badge?: string;
  children?: Omit<NavigationItem, 'children'>[];
}

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    label: 'Genel Bakış',
    path: ROUTES.DASHBOARD,
    iconName: 'LayoutDashboard',
  },
  {
    label: 'Web Yönetimi',
    path: ROUTES.WEB_MAIN,
    iconName: 'Globe',
    children: [
      {
        label: 'Arayüz Bölümleri',
        path: ROUTES.WEB_LANDING_SECTIONS,
        iconName: 'LayoutGrid',
      },
      {
        label: 'Sayfalar',
        path: ROUTES.WEB_PAGES,
        iconName: 'FileText',
      },
      {
        label: 'Blog Yazıları',
        path: ROUTES.WEB_BLOG,
        iconName: 'BookOpen',
      },
      {
        label: 'Sıkça Sorulanlar',
        path: ROUTES.WEB_FAQ,
        iconName: 'HelpCircle',
      },
      {
        label: 'Menü & Navigasyon',
        path: ROUTES.WEB_NAVIGATION,
        iconName: 'Compass',
      },
      {
        label: 'SEO Ayarları',
        path: ROUTES.WEB_SEO,
        iconName: 'Search',
      },
      {
        label: 'Medya Kütüphanesi',
        path: ROUTES.WEB_MEDIA,
        iconName: 'Image',
      },
      {
        label: 'Form Yönetimi',
        path: ROUTES.WEB_FORMS,
        iconName: 'ListTodo',
      },
    ],
  },
  {
    label: 'Demo Kayıtları',
    path: ROUTES.DEMO_RECORDS,
    iconName: 'Users',
    badge: 'Yeni',
  },
];
