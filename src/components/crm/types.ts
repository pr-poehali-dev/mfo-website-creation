export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'new' | 'verified' | 'active' | 'blocked';
  totalLoans: number;
  joinDate: string;
  lastActivity: string;
}

export interface Application {
  id: string;
  clientId: string;
  clientName: string;
  phone: string;
  type: 'Займ' | 'Рефинансирование' | 'Ипотека';
  amount: number;
  status: 'Новая' | 'В обработке' | 'Одобрена' | 'Отклонена' | 'Выдана';
  createdAt: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  timer: number; // время до дедлайна в секундах
  documents: string[];
  comments: string[];
}

export interface Employee {
  id: string;
  name: string;
  role: 'manager' | 'senior' | 'admin';
  isOnline: boolean;
  workload: number;
}

export interface CRMStats {
  total: number;
  new: number;
  processing: number;
  approved: number;
  overdue: number;
}