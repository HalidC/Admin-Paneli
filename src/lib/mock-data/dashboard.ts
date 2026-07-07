import { DashboardStats, ActivityLog, PerformanceMetric } from '../../types/admin';

export const mockDashboardStats: DashboardStats = {
  totalDemoCount: 142,
  newDemoCount: 18,
  activeLandingSectionCount: 7,
  draftContentCount: 5,
  activeBlogPostCount: 12,
  recentFormSubmissions7Days: 34,
  lastPublishDate: '07.07.2026 10:45',
  systemStatus: 'optimal',
};

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'act-1',
    userId: 'usr-1',
    userName: 'Kaan Aksoy',
    action: 'Bento Ana Grid güncellendi',
    target: 'Ana Sayfa Arayüzü',
    timestamp: '2026-07-07T12:30:00Z',
    type: 'update',
  },
  {
    id: 'act-2',
    userId: 'usr-2',
    userName: 'Zeynep Kaya',
    action: 'Demo talebi durumu güncellendi',
    target: 'Acme Corp (Ölçek Planı)',
    timestamp: '2026-07-07T11:15:00Z',
    type: 'system',
  },
  {
    id: 'act-3',
    userId: 'usr-1',
    userName: 'Kaan Aksoy',
    action: 'Yeni blog yazısı yayınlandı',
    target: 'SaaS Altyapısında Linear Estetiği',
    timestamp: '2026-07-07T09:00:00Z',
    type: 'create',
  },
  {
    id: 'act-4',
    userId: 'usr-3',
    userName: 'Mert Yılmaz',
    action: 'Giriş denemesi engellendi',
    target: 'Bilinmeyen IP Adresi',
    timestamp: '2026-07-07T08:42:00Z',
    type: 'security',
  },
  {
    id: 'act-5',
    userId: 'usr-2',
    userName: 'Zeynep Kaya',
    action: 'Fiyatlandırma Bölümü pasifleştirildi',
    target: 'Landing Page v2',
    timestamp: '2026-07-06T17:20:00Z',
    type: 'update',
  },
];

export const mockPerformanceMetrics: PerformanceMetric[] = [
  {
    timestamp: 'Pzt',
    pageViews: 4500,
    uniqueVisitors: 3100,
    bounceRate: 42.1,
    avgSessionDuration: '3d 12s',
  },
  {
    timestamp: 'Sal',
    pageViews: 5200,
    uniqueVisitors: 3600,
    bounceRate: 40.5,
    avgSessionDuration: '3d 24s',
  },
  {
    timestamp: 'Çar',
    pageViews: 6100,
    uniqueVisitors: 4200,
    bounceRate: 38.2,
    avgSessionDuration: '3d 45s',
  },
  {
    timestamp: 'Per',
    pageViews: 5800,
    uniqueVisitors: 3900,
    bounceRate: 39.0,
    avgSessionDuration: '3d 30s',
  },
  {
    timestamp: 'Cum',
    pageViews: 7200,
    uniqueVisitors: 4900,
    bounceRate: 36.4,
    avgSessionDuration: '4d 05s',
  },
  {
    timestamp: 'Cmt',
    pageViews: 3800,
    uniqueVisitors: 2500,
    bounceRate: 45.8,
    avgSessionDuration: '2d 50s',
  },
  {
    timestamp: 'Paz',
    pageViews: 4100,
    uniqueVisitors: 2800,
    bounceRate: 44.2,
    avgSessionDuration: '3d 01s',
  },
];
