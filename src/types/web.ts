export interface WebPage {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  author: string;
  layout: 'default' | 'landing' | 'minimal' | 'blog';
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  supportEmail: string;
  maintenanceMode: boolean;
}
