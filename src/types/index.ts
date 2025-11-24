export type UserRole = 'admin' | 'finance' | 'project_manager' | 'hr_manager' | 'clerk' | 'citizen';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export type RequestStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'completed';
export type PermitType = 'business' | 'construction' | 'vehicle' | 'event';
export type RequestType = 'residency' | 'birth' | 'death' | 'marriage' | 'garbage' | 'street_repair' | 'complaint';

export interface CitizenRequest {
  id: string;
  citizenId: string;
  citizenName: string;
  type: RequestType;
  description: string;
  status: RequestStatus;
  submittedDate: string;
  lastUpdated: string;
  assignedTo?: string;
}

export interface Permit {
  id: string;
  citizenId: string;
  citizenName: string;
  type: PermitType;
  description: string;
  status: RequestStatus;
  submittedDate: string;
  expiryDate?: string;
  fee: number;
  documents: string[];
}

export interface Payment {
  id: string;
  citizenId: string;
  citizenName: string;
  type: 'property_tax' | 'water' | 'electricity' | 'waste';
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue';
  receiptNumber?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  manager: string;
  progress: number;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  phone: string;
  joinDate: string;
  salary: number;
  status: 'active' | 'on_leave' | 'inactive';
  avatar?: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'half_day' | 'leave';
}

export interface Leave {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'sick' | 'vacation' | 'personal' | 'emergency';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  days: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  capacity?: number;
  registered?: number;
  type: 'public' | 'official' | 'cultural' | 'sports';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
  link?: string;
}
