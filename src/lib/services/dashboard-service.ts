import { mockDashboardStats, mockActivityLogs, mockPerformanceMetrics } from '../mock-data/dashboard';
import { DashboardStats, ActivityLog, PerformanceMetric } from '../../types/admin';

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...mockDashboardStats }), 200);
    });
  },

  async getActivityLogs(): Promise<ActivityLog[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockActivityLogs]), 200);
    });
  },

  async getPerformanceMetrics(): Promise<PerformanceMetric[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockPerformanceMetrics]), 200);
    });
  },

  async logAction(action: string, target: string, type: ActivityLog['type'] = 'system'): Promise<ActivityLog> {
    return new Promise((resolve) => {
      const newLog: ActivityLog = {
        id: `act-${Date.now()}`,
        userId: 'usr-current',
        userName: 'Sistem Yöneticisi',
        action,
        target,
        timestamp: new Date().toISOString(),
        type,
      };
      mockActivityLogs.unshift(newLog);
      setTimeout(() => resolve(newLog), 150);
    });
  }
};
