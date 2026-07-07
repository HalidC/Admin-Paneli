export interface DemoRecord {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  companySize: '1-10' | '11-50' | '51-200' | '201-1000' | '1000+';
  requestedPlan: 'growth' | 'enterprise' | 'scale';
  notes?: string;
  status: 'pending' | 'scheduled' | 'completed' | 'canceled';
  createdAt: string;
  assignedTo?: string;
}
