import { mockWebPages } from '../mock-data/web-pages';
import { WebPage } from '../../types/web';

let stateWebPages = [...mockWebPages];

export const webPagesService = {
  async getAll(): Promise<WebPage[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...stateWebPages]), 200);
    });
  },

  async getById(id: string): Promise<WebPage | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(stateWebPages.find((p) => p.id === id)), 150);
    });
  },

  async create(page: Omit<WebPage, 'id' | 'lastModified'>): Promise<WebPage> {
    return new Promise((resolve) => {
      const newPage: WebPage = {
        ...page,
        id: `page-${Date.now()}`,
        lastModified: new Date().toISOString(),
      };
      stateWebPages.push(newPage);
      setTimeout(() => resolve(newPage), 200);
    });
  },

  async update(id: string, updates: Partial<WebPage>): Promise<WebPage> {
    return new Promise((resolve, reject) => {
      const index = stateWebPages.findIndex((p) => p.id === id);
      if (index === -1) return reject(new Error('Sayfa bulunamadı'));

      const updated = {
        ...stateWebPages[index],
        ...updates,
        lastModified: new Date().toISOString(),
      };
      stateWebPages[index] = updated;
      setTimeout(() => resolve(updated), 200);
    });
  },

  async delete(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      stateWebPages = stateWebPages.filter((p) => p.id !== id);
      setTimeout(() => resolve(true), 200);
    });
  },
};
