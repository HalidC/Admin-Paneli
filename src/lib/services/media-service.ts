import { mockMediaAssets } from '../mock-data/media';
import { MediaAsset } from '../../types/media';

let stateMedia = [...mockMediaAssets];

export const mediaService = {
  async getAll(): Promise<MediaAsset[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...stateMedia]), 200);
    });
  },

  async upload(file: Omit<MediaAsset, 'id' | 'createdAt'>): Promise<MediaAsset> {
    return new Promise((resolve) => {
      const newAsset: MediaAsset = {
        ...file,
        id: `med-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      stateMedia.unshift(newAsset);
      setTimeout(() => resolve(newAsset), 300);
    });
  },

  async delete(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      stateMedia = stateMedia.filter((m) => m.id !== id);
      setTimeout(() => resolve(true), 200);
    });
  },
};
