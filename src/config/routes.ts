export const ROUTES = {
  DASHBOARD: '/',
  WEB_MAIN: '/web',
  WEB_LANDING_SECTIONS: '/web/landing-sections',
  WEB_PAGES: '/web/pages',
  WEB_BLOG: '/web/blog',
  WEB_FAQ: '/web/faq',
  WEB_NAVIGATION: '/web/navigation',
  WEB_SEO: '/web/seo',
  WEB_MEDIA: '/web/media',
  WEB_FORMS: '/web/forms',
  WEB_LOGS: '/web/logs',
  DEMO_RECORDS: '/demo-records',
  PLATFORM_MAIN: '/platform',
  PLATFORM_DASHBOARD: '/platform/dashboard',
  PLATFORM_TENANTS: '/platform/tenants',
  PLATFORM_USERS: '/platform/users',
  PLATFORM_ROLES: '/platform/roles',
  PLATFORM_PACKAGES: '/platform/packages',
  PLATFORM_SETTINGS: '/platform/settings',
  PLATFORM_LOGS: '/platform/logs',
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];
