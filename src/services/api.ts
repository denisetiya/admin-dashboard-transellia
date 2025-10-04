// API service for communicating with the backend

import { useUserStore } from '../stores/userStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
  errors?: Array<{
    field: string;
    message: string;
    code: string;
  }>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    role: string | null;
    subscriptionId: string | null;
    UserDetails: {
      name: string | null;
      imageProfile: string | null;
      phoneNumber: string | null;
      address: string | null;
    } | null;
    isEmployee: boolean | null;
  };
  token: string | null;
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string | null;
  duration: {
    value: number;
    unit: string;
  };
  features: string[];
  status: string;
  subscribersCount?: number;
  totalRevenue?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionsResponse {
  subscriptions: Subscription[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface CreateSubscriptionRequest {
  name: string;
  price: number;
  currency: string;
  description: string | null;
  duration: {
    value: number;
    unit: string;
  };
  features: string[];
  status: string;
}

export interface UpdateSubscriptionRequest {
  name?: string;
  price?: number;
  currency?: string;
  description?: string | null;
  duration?: {
    value: number;
    unit: string;
  };
  features?: string[];
  status?: string;
}

// User-related interfaces
export interface User {
  id: string;
  email: string;
  role: string | null;
  subscriptionId: string | null;
  subscription?: Subscription | null;
  UserDetails: {
    name: string | null;
    imageProfile: string | null;
    phoneNumber: string | null;
    address: string | null;
  } | null;
  isEmployee: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateUserRequest {
  email: string;
  password: string;
  role?: string;
  isEmployee?: boolean;
  userDetails?: {
    name: string;
    phoneNumber?: string;
    address?: string;
  };
}

export interface UpdateUserRequest {
  email?: string;
  role?: string;
  isEmployee?: boolean;
  subscriptionId?: string | null;
  userDetails?: {
    name?: string;
    phoneNumber?: string;
    address?: string;
  };
}

export interface UpdateUserSubscriptionRequest {
  subscriptionId: string | null;
}

class ApiService {
  private getHeaders(): HeadersInit {
    // Get token from zustand store
    const token = useUserStore.getState().token;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'x-api-key': `${import.meta.env.VITE_API_KEY}`, // API key required by backend middleware
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  async post<T = unknown>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
        credentials: 'include', // Include cookies in requests
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Request failed',
          errors: result.errors || [],
        };
      }

      // Transform backend response to match frontend interface
      return {
        success: result.success,
        message: result.message,
        data: result.content as T,
        token: result.meta?.token as string,
        errors: result.errors || [],
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: [],
      };
    }
  }

  async get<T = unknown>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
        credentials: 'include', // Include cookies in requests
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Request failed',
          errors: result.errors || [],
        };
      }

      // Transform backend response to match frontend interface
      return {
        success: result.success,
        message: result.message,
        data: result.content as T,
        errors: result.errors || [],
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: [],
      };
    }
  }

  async put<T = unknown>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
        credentials: 'include', // Include cookies in requests
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Request failed',
          errors: result.errors || [],
        };
      }

      // Transform backend response to match frontend interface
      return {
        success: result.success,
        message: result.message,
        data: result.content as T,
        errors: result.errors || [],
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: [],
      };
    }
  }

  async delete<T = unknown>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
        credentials: 'include', // Include cookies in requests
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Request failed',
          errors: result.errors || [],
        };
      }

      // Transform backend response to match frontend interface
      return {
        success: result.success,
        message: result.message,
        data: result.content as T,
        errors: result.errors || [],
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: [],
      };
    }
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.post<LoginResponse>('/v1/auth/login', credentials);
  }

  async register(userData: unknown): Promise<ApiResponse> {
    return this.post('/v1/auth/register', userData);
  }

  // Subscription API methods
  async getSubscriptions(page: number = 1, limit: number = 10): Promise<ApiResponse<SubscriptionsResponse>> {
    return this.get<SubscriptionsResponse>(`/v1/subscriptions?page=${page}&limit=${limit}`);
  }

  async getSubscriptionById(id: string): Promise<ApiResponse<{ subscription: Subscription }>> {
    return this.get<{ subscription: Subscription }>(`/v1/subscriptions/${id}`);
  }

  async createSubscription(data: CreateSubscriptionRequest): Promise<ApiResponse<{ subscription: Subscription }>> {
    return this.post<{ subscription: Subscription }>('/v1/subscriptions', data);
  }

  async updateSubscription(id: string, data: UpdateSubscriptionRequest): Promise<ApiResponse<{ subscription: Subscription }>> {
    return this.put<{ subscription: Subscription }>(`/v1/subscriptions/${id}`, data);
  }

  async deleteSubscription(id: string): Promise<ApiResponse<{ subscription: Subscription }>> {
    return this.delete<{ subscription: Subscription }>(`/v1/subscriptions/${id}`);
  }

  // User API methods
  async getUsers(page: number = 1, limit: number = 10): Promise<ApiResponse<UsersResponse>> {
    return this.get<UsersResponse>(`/v1/users?page=${page}&limit=${limit}`);
  }

  async getUserById(id: string): Promise<ApiResponse<{ user: User }>> {
    return this.get<{ user: User }>(`/v1/users/${id}`);
  }

  async createUser(data: CreateUserRequest): Promise<ApiResponse<{ user: User }>> {
    return this.post<{ user: User }>('/v1/users', data);
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<ApiResponse<{ user: User }>> {
    return this.put<{ user: User }>(`/v1/users/${id}`, data);
  }

  async deleteUser(id: string): Promise<ApiResponse> {
    return this.delete(`/v1/users/${id}`);
  }

  async updateUserSubscription(id: string, data: UpdateUserSubscriptionRequest): Promise<ApiResponse> {
    // Using PATCH method for subscription update
    try {
      const response = await fetch(`${API_BASE_URL}/v1/users/${id}/subscription`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
        credentials: 'include',
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Request failed',
          errors: result.errors || [],
        };
      }

      return {
        success: result.success,
        message: result.message,
        data: result.content,
        errors: result.errors || [],
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: [],
      };
    }
  }
}

export const apiService = new ApiService();