export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Category {
  id: number;
  name: string;
  owner: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  created_at: string;
  updated_at: string;
  owner: number;
  owner_email: string;
  category: number | null;
  category_name: string | null;
  shared_with: number[];
  shared_with_emails: string[];
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}