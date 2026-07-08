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
    label: 'Genel Dashboard',
    path: ROUTES.DASHBOARD,
    iconName: 'LayoutDashboard',
  },
  {
    label: 'Web Yönetimi',
    path: ROUTES.WEB_MAIN,
    iconName: 'Globe',
    children: [
      {
        label: 'Web Dashboard',
        path: ROUTES.WEB_MAIN,
        iconName: 'LayoutDashboard',
      },
      {
        label: 'Landing Bölümleri',
        path: ROUTES.WEB_LANDING_SECTIONS,
        iconName: 'LayoutGrid',
      },
      {
        label: 'Sayfalar',
        path: ROUTES.WEB_PAGES,
        iconName: 'FileText',
      },
      {
        label: 'Blog',
        path: ROUTES.WEB_BLOG,
        iconName: 'BookOpen',
      },
      {
        label: 'SSS',
        path: ROUTES.WEB_FAQ,
        iconName: 'HelpCircle',
      },
      {
        label: 'Menü & Footer',
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
      {
        label: 'Web Log Kayıtları',
        path: ROUTES.WEB_LOGS,
        iconName: 'Terminal',
      },
    ],
  },
  {
    label: 'Platform Yönetimi',
    path: ROUTES.PLATFORM_MAIN,
    iconName: 'Cpu',
    children: [
      {
        label: 'Platform Dashboard',
        path: ROUTES.PLATFORM_DASHBOARD,
        iconName: 'LayoutDashboard',
      },
      {
        label: 'Firmalar / Tenantlar',
        path: ROUTES.PLATFORM_TENANTS,
        iconName: 'Building2',
      },
      {
        label: 'Kullanıcılar',
        path: ROUTES.PLATFORM_USERS,
        iconName: 'Users',
      },
      {
        label: 'Roller / Yetkiler',
        path: ROUTES.PLATFORM_ROLES,
        iconName: 'ShieldCheck',
      },
      {
        label: 'Paket / Modül Yönetimi',
        path: ROUTES.PLATFORM_PACKAGES,
        iconName: 'Package',
      },
      {
        label: 'Platform Ayarları',
        path: ROUTES.PLATFORM_SETTINGS,
        iconName: 'Settings',
      },
      {
        label: 'Platform Log Kayıtları',
        path: ROUTES.PLATFORM_LOGS,
        iconName: 'Terminal',
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
