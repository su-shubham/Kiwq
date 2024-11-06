export interface Incident {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  timestamp: string;
  status: 'active' | 'investigating' | 'resolved';
  affectedAssets: string[];
  description: string;
}

export interface PlaybookStep {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  estimatedTime: string;
  completedAt?: string;
}