import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { api, ApiResponse } from '@/services/api';
import { UserPublic } from '@/types'; // Precisaremos criar este arquivo de tipos

interface AuthContextType {
  user: UserPublic | null;
  isAuthenticated: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserPublic | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await api.get<ApiResponse<UserPublic>>('/auth/me');
          setUser(response.data.data);
        } catch (error) {
          console.error('Falha ao validar token', error);
          localStorage.removeItem('accessToken');
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const login = async (data: any) => {
    const response = await api.post<ApiResponse<{ user: UserPublic; accessToken: string }>>('/auth/login', data);
    const { accessToken, user } = response.data.data;
    localStorage.setItem('accessToken', accessToken);
    setUser(user);
  };

  const register = async (data: any) => {
    const response = await api.post<ApiResponse<{ user: UserPublic; accessToken: string }>>('/auth/register', data);
    const { accessToken, user } = response.data.data;
    localStorage.setItem('accessToken', accessToken);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};