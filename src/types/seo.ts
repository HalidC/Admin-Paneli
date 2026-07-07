export interface SEOMetadata {
  id: string;
  pagePath: string; // e.g. "/web/landing-sections" or "/"
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  sitemapPriority: number; // e.g. 0.8
  lastCrawled?: string;
  score: number; // On-page SEO quality score out of 100
  
  // Expanded fields
  ogTitle?: string;
  ogDescription?: string;
  twitterImage?: string;
  isIndexed: boolean; // Index / Noindex
  includeInSitemap: boolean; // Sitemap'e dahil et
  updatedAt?: string; // Son güncelleme tarihi
}
