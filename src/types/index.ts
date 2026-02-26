// ============ AUTH ============
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client' | 'user';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  user: User;
  expires: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// ============ PROJECTS ============
export type ProjectCategory = 'web-dev' | 'iot' | 'informatique' | 'montage-pc';
export type ProjectStatus = 'en-cours' | 'terminé' | 'livré';

export interface Project {
  id: string;
  title: string;
  slug?: string;
  description: string;
  content?: string;
  image: string;
  images?: string[];
  technologies: string[];
  category: ProjectCategory;
  link?: string;
  status: ProjectStatus;
  clientId?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectFormData {
  title: string;
  description: string;
  content: string;
  image: File | null;
  technologies: string[];
  category: ProjectCategory;
  link?: string;
  status: ProjectStatus;
  featured: boolean;
}

// ============ CLIENTS ============
export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectsCount: number;
  totalSpent: number;
  status: 'actif' | 'inactif' | 'suspendu';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientProfile {
  id: string;
  userId: string;
  company?: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  taxId?: string;
}

// ============ TICKETS ============
export type TicketStatus = 'ouvert' | 'en-cours' | 'résolu' | 'fermé';
export type TicketPriority = 'basse' | 'moyenne' | 'haute' | 'critique';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  userId: string;
  assignedTo?: string;
  category: string;
  attachments?: string[];
  responses: TicketResponse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketResponse {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface TicketFormData {
  title: string;
  description: string;
  priority: TicketPriority;
  category: string;
}

// ============ BLOG ============
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============ CONTACT ============
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  service?: string;
  read: boolean;
  createdAt: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  sujet: string;
  message: string;
  phone?: string;
  service?: ProjectCategory;
}

// ============ INVOICES ============
export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  amount: number;
  tax: number;
  total: number;
  status: 'brouillon' | 'envoyée' | 'payée' | 'annulée';
  issueDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// ============ ANALYTICS ============
export interface Analytics {
  totalProjects: number;
  totalClients: number;
  totalRevenue: number;
  activeTickets: number;
  completionRate: number;
  monthlyData: MonthlyAnalytics[];
}

export interface MonthlyAnalytics {
  month: string;
  projects: number;
  revenue: number;
  clients: number;
}

// ============ API RESPONSES ============
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// ============ FORMS ============
export interface FormError {
  field: string;
  message: string;
}

export interface FormState {
  errors: FormError[];
  isSubmitting: boolean;
  isSuccess: boolean;
}

// ============ UI COMPONENTS ============
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  className?: string;
  children: React.ReactNode;
}

export interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

// ============ NOTIFICATIONS ============
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}