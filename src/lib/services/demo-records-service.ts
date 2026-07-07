import { mockDemoRecords } from '../mock-data/demo-records';
import { DemoRecord } from '../../types/demo-record';

let stateDemoRecords = [...mockDemoRecords];

export const demoRecordsService = {
  async getAll(): Promise<DemoRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...stateDemoRecords]), 200);
    });
  },

  async create(record: Omit<DemoRecord, 'id' | 'createdAt'>): Promise<DemoRecord> {
    return new Promise((resolve) => {
      const newRecord: DemoRecord = {
        ...record,
        id: `demo-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      stateDemoRecords.unshift(newRecord);
      setTimeout(() => resolve(newRecord), 250);
    });
  },

  async updateStatus(id: string, status: DemoRecord['status']): Promise<DemoRecord> {
    return new Promise((resolve, reject) => {
      const index = stateDemoRecords.findIndex((d) => d.id === id);
      if (index === -1) return reject(new Error('Kayıt bulunamadı'));

      const updated = {
        ...stateDemoRecords[index],
        status,
      };
      stateDemoRecords[index] = updated;
      setTimeout(() => resolve(updated), 200);
    });
  },

  async update(id: string, updates: Partial<DemoRecord>): Promise<DemoRecord> {
    return new Promise((resolve, reject) => {
      const index = stateDemoRecords.findIndex((d) => d.id === id);
      if (index === -1) return reject(new Error('Kayıt bulunamadı'));

      const updated = {
        ...stateDemoRecords[index],
        ...updates,
      };
      stateDemoRecords[index] = updated;
      setTimeout(() => resolve(updated), 200);
    });
  },

  async delete(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      stateDemoRecords = stateDemoRecords.filter((d) => d.id !== id);
      setTimeout(() => resolve(true), 150);
    });
  },
};
