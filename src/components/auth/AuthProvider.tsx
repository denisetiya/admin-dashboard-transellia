import { useCallback } from 'react';
import { AuthContext, type User } from '../../contexts/AuthContext.js';
import { apiService } from '../../services/api';
import { useUserStore } from '../../stores/userStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, isLoading, login: storeLogin, logout: storeLogout, setLoading } = useUserStore();

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    setLoading(true);
    
    try {
      const response = await apiService.login({ email, password });
      
      if (response.success && response.data) {
        const { user } = response.data;
        const token = response.token;
        
        // Check if user has ADMIN role
        if (user.role !== 'ADMIN') {
          setLoading(false);
          return {
            success: false,
            message: 'Akses ditolak. Hanya administrator yang diizinkan masuk.'
          };
        }
        
        // Transform backend user data to frontend User interface
        const frontendUser: User = {
          id: user.id,
          name: user.UserDetails?.name || 'Admin User',
          email: user.email,
          role: 'admin' // We know it's admin because we checked above
        };
        
        // Use zustand store to manage authentication state
        storeLogin(frontendUser, token || '');
        
        return { success: true };
      } else {
        setLoading(false);
        return {
          success: false,
          message: response.message || 'Login gagal. Silakan periksa kembali kredensial Anda.'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return {
        success: false,
        message: 'Terjadi kesalahan jaringan. Silakan coba lagi.'
      };
    }
  }, [setLoading, storeLogin]);

  const logout = useCallback(() => {
    storeLogout();
  }, [storeLogout]);

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};