import axios from 'axios';

// Configura a URL base para todas as requisições da API
export const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
});

// Interceptor: Adiciona o token de autenticação a cada requisição
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Resposta genérica da API para tipagem
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    pagination?: any;
}