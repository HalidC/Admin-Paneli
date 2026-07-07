export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
  avatarUrl?: string;
}

export interface DashboardStats {
  monthlyRecurringRevenue: number;
  mrrGrowth: number;
  activeCustomers: number;
  customerGrowth: number;
  demoRequestsCount: number;
  demoGrowth: number;
  conversionRate: number;
  conversionGrowth: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'security' | 'system';
}

export interface PerformanceMetric {
  timestamp: string;
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: string;
}
