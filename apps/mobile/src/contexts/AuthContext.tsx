import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, AuthResponse } from '../services/api';
import { User } from '@toinu/shared-types';

interface AuthContextData {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<void>;
  register: (
    email: string,
    password: string,
    fullName: string,
    role?: 'DRIVER' | 'PASSENGER',
    driverData?: {
      fullName: string;
      birthDate: string;
      cpf: string;
      phone: string;
      email: string;
      cnh: string;
      cnhExpiration: string;
      address: {
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
    },
  ) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  savedEmail: string | null;
  clearSavedCredentials: () => Promise<void>;
  hasSeenCarousel: boolean;
  markCarouselAsSeen: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedEmail, setSavedEmail] = useState<string | null>(null);
  const [hasSeenCarousel, setHasSeenCarousel] = useState(false);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@auth_token');
      const storedUser = await AsyncStorage.getItem('@auth_user');
      const storedEmail = await AsyncStorage.getItem('@saved_email');
      const seenCarousel = await AsyncStorage.getItem('@seen_carousel');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }

      if (storedEmail) {
        setSavedEmail(storedEmail);
      }

      if (seenCarousel === 'true') {
        setHasSeenCarousel(true);
      }
    } catch (error) {
      console.error('Erro ao carregar autenticação:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      const response: AuthResponse = await authApi.login({ email, password });

      await AsyncStorage.setItem('@auth_token', response.access_token);
      await AsyncStorage.setItem('@auth_user', JSON.stringify(response.user));

      // Salva o email se "Lembrar-me" estiver ativado
      if (rememberMe) {
        await AsyncStorage.setItem('@saved_email', email);
      } else {
        await AsyncStorage.removeItem('@saved_email');
      }

      setToken(response.access_token);
      setUser(response.user);
      setSavedEmail(rememberMe ? email : null);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  };

  const register = async (
    email: string,
    password: string,
    fullName: string,
    role: 'DRIVER' | 'PASSENGER' = 'PASSENGER',
    driverData?: {
      fullName: string;
      birthDate: string;
      cpf: string;
      phone: string;
      email: string;
      cnh: string;
      cnhExpiration: string;
      address: {
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
    },
  ) => {
    try {
      const response: AuthResponse = await authApi.register({
        email,
        password,
        fullName,
        role,
        ...driverData,
      });

      await AsyncStorage.setItem('@auth_token', response.access_token);
      await AsyncStorage.setItem('@auth_user', JSON.stringify(response.user));

      setToken(response.access_token);
      setUser(response.user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao registrar');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@auth_token');
    await AsyncStorage.removeItem('@auth_user');
    setToken(null);
    setUser(null);
  };

  const clearSavedCredentials = async () => {
    await AsyncStorage.removeItem('@saved_email');
    setSavedEmail(null);
  };

  const markCarouselAsSeen = async () => {
    try {
      await AsyncStorage.setItem('@seen_carousel', 'true');
      setHasSeenCarousel(true);
    } catch (error) {
      console.error('Erro ao marcar carrossel como visto:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token && !!user,
        savedEmail,
        clearSavedCredentials,
        hasSeenCarousel,
        markCarouselAsSeen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
