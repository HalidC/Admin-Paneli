export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
  avatarUrl?: string;
}

export interface DashboardStats {
  totalDemoCount: number;
  newDemoCount: number;
  activeLandingSectionCount: number;
  draftContentCount: number;
  activeBlogPostCount: number;
  recentFormSubmissions7Days: number;
  lastPublishDate: string;
  systemStatus: 'optimal' | 'warning' | 'critical';
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
