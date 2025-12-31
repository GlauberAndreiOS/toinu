import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
}

interface ThemeContextData {
  theme: Theme;
  toggleTheme: () => void;
  useDeviceTheme: () => void;
  useSystemTheme: boolean;
}

const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#111827',
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    error: '#ef4444',
    success: '#059669',
    warning: '#f59e0b',
  },
};

const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#ffffff',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    error: '#f87171',
    success: '#10b981',
    warning: '#fbbf24',
  },
};

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const initialTheme: ThemeMode = (systemColorScheme as ThemeMode) || 'light';

  const [themeMode, setThemeMode] = useState<ThemeMode>(initialTheme);
  const [useSystemTheme, setUseSystemTheme] = useState(true);

  // Detecta mudanças no tema do sistema
  useEffect(() => {
    if (useSystemTheme && systemColorScheme) {
      setThemeMode(systemColorScheme as ThemeMode);
    }
  }, [systemColorScheme, useSystemTheme]);

  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setUseSystemTheme(false); // Desativa tema do sistema quando usuário alterna
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const useDeviceTheme = () => {
    setUseSystemTheme(true);
    if (systemColorScheme) {
      setThemeMode(systemColorScheme as ThemeMode);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, useDeviceTheme, useSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextData => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
};

