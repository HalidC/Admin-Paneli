import { mockFormConfigs, mockFormSubmissions } from '../mock-data/forms';
import { FormConfig, FormSubmission } from '../../types/form';

let stateConfigs = [...mockFormConfigs];
let stateSubmissions = [...mockFormSubmissions];

export const formsService = {
  async getConfigs(): Promise<FormConfig[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...stateConfigs]), 200);
    });
  },

  async getSubmissions(): Promise<FormSubmission[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...stateSubmissions]), 200);
    });
  },

  async toggleActive(id: string): Promise<FormConfig> {
    return new Promise((resolve, reject) => {
      const index = stateConfigs.findIndex((c) => c.id === id);
      if (index === -1) return reject(new Error('Form şeması bulunamadı'));

      const updated = {
        ...stateConfigs[index],
        isActive: !stateConfigs[index].isActive,
      };
      stateConfigs[index] = updated;
      setTimeout(() => resolve(updated), 150);
    });
  },

  async updateSubmissionStatus(id: string, status: FormSubmission['status']): Promise<FormSubmission> {
    return new Promise((resolve, reject) => {
      const index = stateSubmissions.findIndex((s) => s.id === id);
      if (index === -1) return reject(new Error('Form başvurusu bulunamadı'));

      const updated = {
        ...stateSubmissions[index],
        status,
      };
      stateSubmissions[index] = updated;
      setTimeout(() => resolve(updated), 200);
    });
  },

  async deleteSubmission(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      stateSubmissions = stateSubmissions.filter((s) => s.id !== id);
      setTimeout(() => resolve(true), 150);
    });
  },
};
