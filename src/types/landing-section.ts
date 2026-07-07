export interface LandingSection {
  id: string;
  key: string;
  name: string;
  anchor: string;
  order: number;
  title: string;
  subtitle?: string;
  description?: string;
  isActive: boolean;
  publishStatus: 'draft' | 'published' | 'archived';
  updatedAt: string;
  ctaText?: string;
  ctaLink?: string;
}
