import { mockFAQs } from '../mock-data/faq';
import { FAQItem } from '../../types/faq';

let stateFAQs = [...mockFAQs];

export const faqService = {
  async getAll(): Promise<FAQItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...stateFAQs].sort((a, b) => a.order - b.order)), 200);
    });
  },

  async create(item: Omit<FAQItem, 'id' | 'lastModified'>): Promise<FAQItem> {
    return new Promise((resolve) => {
      const newItem: FAQItem = {
        ...item,
        id: `faq-${Date.now()}`,
        lastModified: new Date().toISOString(),
      };
      stateFAQs.push(newItem);
      setTimeout(() => resolve(newItem), 200);
    });
  },

  async update(id: string, updates: Partial<FAQItem>): Promise<FAQItem> {
    return new Promise((resolve, reject) => {
      const index = stateFAQs.findIndex((f) => f.id === id);
      if (index === -1) return reject(new Error('Soru bulunamadı'));

      const updated = {
        ...stateFAQs[index],
        ...updates,
        lastModified: new Date().toISOString(),
      };
      stateFAQs[index] = updated;
      setTimeout(() => resolve(updated), 200);
    });
  },

  async delete(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      stateFAQs = stateFAQs.filter((f) => f.id !== id);
      setTimeout(() => resolve(true), 150);
    });
  },
};
