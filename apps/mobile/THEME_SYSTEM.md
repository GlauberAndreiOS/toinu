# Sistema de Temas - Light & Dark Mode com Detecção de Sistema

## 📋 Overview

Um sistema completo de temas (Light e Dark Mode) com:
- ✅ Detecção automática do tema do sistema (iOS/Android)
- ✅ Alternância manual entre temas
- ✅ Modo "Usar Tema do Sistema" para sincronizar com preferência do usuário
- ✅ React Context e TypeScript completo

## 🎨 Temas Disponíveis

### Light Mode (Padrão)
```typescript
{
  primary: '#111827',           // Preto
  background: '#ffffff',        // Branco
  surface: '#f9fafb',          // Cinza claro
  text: '#111827',             // Preto
  textSecondary: '#6b7280',    // Cinza
  border: '#e5e7eb',           // Cinza border
  error: '#ef4444',            // Vermelho
  success: '#059669',          // Verde
  warning: '#f59e0b',          // Âmbar
}
```

### Dark Mode
```typescript
{
  primary: '#ffffff',          // Branco
  background: '#0f172a',       // Azul muito escuro
  surface: '#1e293b',          // Azul escuro
  text: '#f1f5f9',             // Branco
  textSecondary: '#94a3b8',    // Cinza claro
  border: '#334155',           // Cinza escuro
  error: '#f87171',            // Vermelho claro
  success: '#10b981',          // Verde claro
  warning: '#fbbf24',          // Âmbar claro
}
```

## 🔧 Como Usar

### 0. Detecção Automática do Sistema (Padrão)

Quando a app inicia, ela **detecta automaticamente** o tema preferido do sistema:

```tsx
// No ThemeContext.tsx
const systemColorScheme = useColorScheme(); // Detecta automaticamente
const initialTheme: ThemeMode = (systemColorScheme as ThemeMode) || 'light';
```

**Como funciona:**
- iOS: Lê a preferência do Settings > Display & Brightness
- Android: Lê a preferência do Developer Settings > Display > Dark theme
- Se o sistema mudar, a app também muda automaticamente

### 1. Usar o Hook useTheme

```tsx
import { useTheme } from '@contexts/ThemeContext';

function MyComponent() {
  const { theme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Olá!</Text>
    </View>
  );
}
```

### 2. Alternar Tema

```tsx
import { useTheme } from '@contexts/ThemeContext';

function MyComponent() {
  const { toggleTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme}>
      <Text>Alternar Tema</Text>
    </TouchableOpacity>
  );
}
```

### 2. Alternar Tema Manualmente

```tsx
import { useTheme } from '@contexts/ThemeContext';

function MyComponent() {
  const { toggleTheme, useSystemTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme}>
      <Text>
        {useSystemTheme ? 'Desativar Tema do Sistema' : 'Alternar Tema'}
      </Text>
    </TouchableOpacity>
  );
}
```

**Observação:** Quando o usuário alterna manualmente, a sincronização com o sistema é desativada.

### 3. Voltar a Usar Tema do Sistema

```tsx
import { useTheme } from '@contexts/ThemeContext';

function MyComponent() {
  const { useDeviceTheme, useSystemTheme } = useTheme();

  return (
    <TouchableOpacity onPress={useDeviceTheme}>
      <Text>
        {useSystemTheme ? '✓ Usando Tema do Sistema' : 'Voltar a Usar Tema do Sistema'}
      </Text>
    </TouchableOpacity>
  );
}
```

### 4. Usar ThemeToggle (Componente Pronto)

```tsx
import { ThemeToggle } from '@app/components';

function MyScreen() {
  return (
    <View>
      {/* Botão simples */}
      <ThemeToggle />

      {/* Com label mostrando estado */}
      <ThemeToggle showLabel={true} />

      {/* resto do conteúdo */}
    </View>
  );
}
```

### 5. Criar Estilos Dinâmicos

```tsx
import { useMemo } from 'react';
import { useTheme } from '@contexts/ThemeContext';
import { StyleSheet } from 'react-native';

function MyComponent() {
  const { theme } = useTheme();

  const styles = useMemo(
    () => StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      },
    }),
    [theme]
  );

  return <View style={styles.container}>...</View>;
}
```

## 📁 Estrutura de Arquivos

```
src/
├── contexts/
│   └── ThemeContext.tsx       # Context do tema
├── app/
│   ├── components/
│   │   ├── ThemeToggle.tsx    # Botão para alternar tema
│   │   └── index.ts           # Exportações
│   ├── screens/
│   │   └── Unauthenticated/
│   │       ├── Carousel/
│   │       ├── HomeScreen.tsx
│   │       ├── LoginScreen.tsx
│   │       └── RegisterScreen.tsx
│   └── App.tsx                # Com ThemeProvider
└── utils/
    └── themeUtils.ts          # Utilitários de tema
```

## 🔌 Implementação em Componentes

### Carousel.tsx
```tsx
const { theme } = useTheme();
const dynamicStyles = useMemo(() => createDynamicStyles(theme), [theme]);
// Use dynamicStyles no lugar de styles
```

### LoginScreen.tsx
```tsx
const { theme } = useTheme();
const dynamicStyles = useMemo(() => createLoginStyles(theme), [theme]);
// Use theme.colors para cores específicas
```

### RegisterScreen.tsx
```tsx
const { theme } = useTheme();
const dynamicStyles = useMemo(() => createRegisterStyles(theme), [theme]);
```

## ✨ Funcionalidades

- ✅ Light e Dark Mode completos
- ✅ Persistência automática (preparado para AsyncStorage)
- ✅ Estilos dinâmicos baseados no tema
- ✅ Suporte completo em todos os screens
- ✅ Hook useTheme para acesso fácil
- ✅ Componente ThemeToggle pronto para usar
- ✅ Type-safe com TypeScript

## 🚀 Próximas Melhorias (Opcional)

1. **Persistir preferência do usuário com AsyncStorage**
```tsx
const toggleTheme = async () => {
  const newMode = themeMode === 'light' ? 'dark' : 'light';
  setThemeMode(newMode);
  await AsyncStorage.setItem('@user_theme', newMode);
};
```

2. **Carregar preferência salva ao iniciar**
```tsx
useEffect(() => {
  const loadSavedTheme = async () => {
    const saved = await AsyncStorage.getItem('@user_theme');
    if (saved) {
      setThemeMode(saved as ThemeMode);
      setUseSystemTheme(false);
    }
  };
  loadSavedTheme();
}, []);
```

3. **Adicionar mais temas (violeta, verde, etc)**
4. **Animar transição entre temas com Animated**
5. **Exportar cores como constantes reutilizáveis**

## 📝 Exemplo Completo

```tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { ThemeToggle } from '@app/components';

export default function Screen() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text style={{ color: theme.colors.text, fontSize: 20 }}>
        Tema Atual: {theme.mode === 'light' ? '☀️ Claro' : '🌙 Escuro'}
      </Text>
      
      <TouchableOpacity 
        style={{ marginTop: 20 }}
        onPress={toggleTheme}
      >
        <Text style={{ color: theme.colors.primary }}>
          Alternar Tema
        </Text>
      </TouchableOpacity>

      <ThemeToggle />
    </View>
  );
}
```

