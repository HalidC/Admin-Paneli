export interface LandingSection {
  id: string;
  name: string; // e.g. "Hero", "Features Bento", "Global Capabilities", "Testimonials"
  type: 'hero' | 'bento' | 'features' | 'cta' | 'pricing';
  title: string;
  subtitle?: string;
  isActive: boolean;
  order: number;
  content: Record<string, any>; // Dynamic structure for sections
  lastUpdated: string;
}
