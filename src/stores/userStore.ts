import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface UserStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
      
      setUser: (user) => set({ user }),
      
      setToken: (token) => set({ token }),
      
      login: (user, token) => set({ 
        user, 
        token, 
        isAuthenticated: true,
        isLoading: false 
      }),
      
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false,
        isLoading: false 
      }),
      
      setLoading: (loading) => set({ isLoading: loading })
    }),
    {
      name: 'transellia-user-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// Initialize the store with data from localStorage if available
if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('transellia-user-storage');
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      if (parsed.state?.user && parsed.state?.token) {
        useUserStore.setState({
          user: parsed.state.user,
          token: parsed.state.token,
          isAuthenticated: parsed.state.isAuthenticated,
          isLoading: false
        });
      } else {
        useUserStore.setState({ isLoading: false });
      }
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      useUserStore.setState({ isLoading: false });
    }
  } else {
    useUserStore.setState({ isLoading: false });
  }
}