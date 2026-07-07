import { mockLandingSections } from '../mock-data/web-sections';
import { LandingSection } from '../../types/landing-section';

let stateLandingSections = [...mockLandingSections];

export const webSectionsService = {
  async getAll(): Promise<LandingSection[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...stateLandingSections].sort((a, b) => a.order - b.order)), 200);
    });
  },

  async update(id: string, updates: Partial<LandingSection>): Promise<LandingSection> {
    return new Promise((resolve, reject) => {
      const index = stateLandingSections.findIndex((s) => s.id === id);
      if (index === -1) return reject(new Error('Bölüm bulunamadı'));

      const updated = {
        ...stateLandingSections[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      stateLandingSections[index] = updated;
      setTimeout(() => resolve(updated), 200);
    });
  },

  async reorder(orderedIds: string[]): Promise<LandingSection[]> {
    return new Promise((resolve) => {
      stateLandingSections = stateLandingSections.map((s) => {
        const newIndex = orderedIds.indexOf(s.id);
        return newIndex !== -1 ? { ...s, order: newIndex + 1 } : s;
      });
      setTimeout(() => resolve([...stateLandingSections].sort((a, b) => a.order - b.order)), 200);
    });
  }
};
