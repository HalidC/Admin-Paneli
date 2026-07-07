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
}
