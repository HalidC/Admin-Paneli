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
  DEMO_RECORDS: '/demo-records',
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];
