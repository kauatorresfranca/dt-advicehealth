import axios from 'axios';
import { Task, Category, User, AuthTokens, PaginatedResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT em todas requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  register: (username: string, email: string, password: string) =>
    api.post<User>('/auth/register/', { username, email, password }),
  
  login: (email: string, password: string) =>
    api.post<AuthTokens>('/auth/token/', { email, password }),
  
  getUsers: () =>
    api.get<PaginatedResponse<User>>('/auth/users/'),
};

// Tasks
export const tasksAPI = {
  list: (params?: { is_completed?: boolean; priority?: string; category?: number; search?: string }) =>
    api.get<PaginatedResponse<Task>>('/tasks/', { params }),
  
  create: (data: Partial<Task>) =>
    api.post<Task>('/tasks/', data),
  
  update: (id: number, data: Partial<Task>) =>
    api.patch<Task>(`/tasks/${id}/`, data),
  
  delete: (id: number) =>
    api.delete(`/tasks/${id}/`),
  
  toggleComplete: (id: number) =>
    api.post<{ is_completed: boolean }>(`/tasks/${id}/toggle_complete/`),
};

// Categories
export const categoriesAPI = {
  list: () =>
    api.get<PaginatedResponse<Category>>('/categories/'),
  
  create: (name: string) =>
    api.post<Category>('/categories/', { name }),
  
  delete: (id: number) =>
    api.delete(`/categories/${id}/`),
};

export default api;