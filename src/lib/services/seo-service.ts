import { mockSEOMetadataList } from '../mock-data/seo';
import { SEOMetadata } from '../../types/seo';

let stateSEO = [...mockSEOMetadataList];

export const seoService = {
  async getAll(): Promise<SEOMetadata[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...stateSEO]), 200);
    });
  },

  async update(id: string, updates: Partial<SEOMetadata>): Promise<SEOMetadata> {
    return new Promise((resolve, reject) => {
      const index = stateSEO.findIndex((s) => s.id === id);
      if (index === -1) return reject(new Error('SEO kaydı bulunamadı'));

      const updated = {
        ...stateSEO[index],
        ...updates,
        lastCrawled: new Date().toISOString(),
      };
      stateSEO[index] = updated;
      setTimeout(() => resolve(updated), 200);
    });
  },
};
