import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@toinu/shared-types';

/**
 * Configuração da API baseada no ambiente
 * Em desenvolvimento: http://localhost:3000/api
 * Em produção: URL configurada nas variáveis de ambiente
 */
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

// Logger utilities
const logger = {
  info: (tag: string, message: string, data?: any) => {
    console.log(`[${tag}] ✓ ${message}`, data ? data : '');
  },
  error: (tag: string, message: string, error?: any) => {
    console.error(`[${tag}] ✗ ${message}`, error ? error : '');
  },
  warn: (tag: string, message: string, data?: any) => {
    console.warn(`[${tag}] ⚠ ${message}`, data ? data : '');
  },
  debug: (tag: string, message: string, data?: any) => {
    console.log(
      `[${tag}] 🔍 ${message}`,
      data ? JSON.stringify(data, null, 2) : '',
    );
  },
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos
});

logger.info('API', `Configurada para ${API_URL}`);

// Interceptor para adicionar token nas requisições
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');

      logger.debug('REQUEST', `${config.method?.toUpperCase()} ${config.url}`, {
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data,
      });

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        logger.info('AUTH', 'Token adicionado à requisição');
      } else {
        logger.warn('AUTH', 'Nenhum token encontrado no AsyncStorage');
      }

      return config;
    } catch (error) {
      logger.error('REQUEST', 'Erro ao preparar requisição', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    logger.error('REQUEST', 'Erro no interceptor de requisição', error);
    return Promise.reject(error);
  },
);

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => {
    logger.info('RESPONSE', `${response.status} ${response.config.url}`, {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  async (error) => {
    const config = error.config;
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    logger.error('RESPONSE', `${status || 'ERROR'} ${config?.url}`, {
      status,
      url: config?.url,
      message,
      data: error.response?.data,
      error: error.message,
    });

    // Token inválido ou expirado
    if (status === 401) {
      logger.warn('AUTH', 'Token inválido ou expirado (401)');
      try {
        await AsyncStorage.removeItem('@auth_token');
        await AsyncStorage.removeItem('@auth_user');
        logger.info('AUTH', 'Dados de autenticação removidos do AsyncStorage');
      } catch (storageError) {
        logger.error(
          'AUTH',
          'Erro ao remover dados do AsyncStorage',
          storageError,
        );
      }
    }

    // Erros de rede
    if (!error.response) {
      logger.error('NETWORK', 'Erro de conexão com a API', {
        message: error.message,
        code: error.code,
      });
    }

    // Timeout
    if (error.code === 'ECONNABORTED') {
      logger.error('TIMEOUT', 'Requisição excedeu o tempo limite (30s)');
    }

    return Promise.reject(error);
  },
);

export interface LoginDto {
  email: string;
  password: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  fullName: string;
  role?: 'DRIVER' | 'PASSENGER';
  // Driver fields
  birthDate?: string;
  cpf?: string;
  phone?: string;
  emailContact?: string;
  cnh?: string;
  cnhExpiration?: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  vehicle?: {
    brand: string;
    model: string;
    yearOfManufacture: number;
    yearOfModel: number;
    renavam: string;
    licensePlate: string;
    color: string;
  };
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export const authApi = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    try {
      logger.info('AUTH', 'Iniciando login', { email: data.email });
      const response = await api.post<AuthResponse>('/auth/login', data);
      logger.info('AUTH', 'Login bem-sucedido', {
        userId: response.data.user.id,
        userName: response.data.user.email,
      });
      return response.data;
    } catch (error) {
      logger.error('AUTH', 'Falha ao fazer login', error);
      throw error;
    }
  },

  register: async (data: CreateUserDto): Promise<AuthResponse> => {
    try {
      logger.info('AUTH', 'Iniciando registro', {
        email: data.email,
        fullName: data.fullName,
      });
      const response = await api.post<AuthResponse>('/auth/register', data);
      logger.info('AUTH', 'Registro bem-sucedido', {
        userId: response.data.user.id,
        userName: response.data.user.email,
      });
      return response.data;
    } catch (error) {
      logger.error('AUTH', 'Falha ao registrar', error);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      logger.info('AUTH', 'Buscando perfil do usuário');
      const response = await api.get('/auth/profile');
      logger.info('AUTH', 'Perfil obtido com sucesso', response.data);
      return response.data;
    } catch (error) {
      logger.error('AUTH', 'Falha ao obter perfil', error);
      throw error;
    }
  },
};

export default api;
