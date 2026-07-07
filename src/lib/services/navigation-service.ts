import { mockNavigationLinks, MenuLink } from '../mock-data/navigation';

let stateLinks = [...mockNavigationLinks];

export const navigationService = {
  async getAll(): Promise<MenuLink[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...stateLinks].sort((a, b) => a.order - b.order)), 200);
    });
  },

  async create(link: Omit<MenuLink, 'id'>): Promise<MenuLink> {
    return new Promise((resolve) => {
      const newLink: MenuLink = {
        ...link,
        id: `link-${Date.now()}`,
      };
      stateLinks.push(newLink);
      setTimeout(() => resolve(newLink), 200);
    });
  },

  async update(id: string, updates: Partial<MenuLink>): Promise<MenuLink> {
    return new Promise((resolve, reject) => {
      const index = stateLinks.findIndex((l) => l.id === id);
      if (index === -1) return reject(new Error('Link bulunamadı'));

      const updated = {
        ...stateLinks[index],
        ...updates,
      };
      stateLinks[index] = updated;
      setTimeout(() => resolve(updated), 200);
    });
  },

  async delete(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      stateLinks = stateLinks.filter((l) => l.id !== id);
      setTimeout(() => resolve(true), 150);
    });
  },

  async reorder(orderedIds: string[]): Promise<MenuLink[]> {
    return new Promise((resolve) => {
      stateLinks = stateLinks.map((l) => {
        const newIndex = orderedIds.indexOf(l.id);
        return newIndex !== -1 ? { ...l, order: newIndex + 1 } : l;
      });
      setTimeout(() => resolve([...stateLinks].sort((a, b) => a.order - b.order)), 200);
    });
  },
};
