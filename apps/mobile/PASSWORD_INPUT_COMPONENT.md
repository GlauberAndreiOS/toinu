# Componente PasswordInput

## 📋 Descrição

Componente de input de senha reutilizável com botão para mostrar/esconder a senha.

**Funcionalidades:**
- ✅ Toggle de visibilidade com ícone de olho
- ✅ Suporta temas light e dark automaticamente
- ✅ Mensagens de erro opcionais
- ✅ Customizável com props do TextInput
- ✅ UX amigável com hitSlop nos botões

## 🎨 Visual

```
┌─────────────────────────────┐
│ Senha                       │
│ ┌─────────────────────────┐ │
│ │ •••••••••••••    👁️    │ │  ← Clique para mostrar
│ └─────────────────────────┘ │
└─────────────────────────────┘

Ao clicar no ícone:
┌─────────────────────────────┐
│ Senha                       │
│ ┌─────────────────────────┐ │
│ │ minha_senha_123    👁️  │ │  ← Muda para 👁️‍🗨️
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

## 🔧 Como Usar

### Importação

```tsx
import { PasswordInput } from '@app/components';
// ou
import PasswordInput from '@app/components/PasswordInput';
```

### Uso Básico

```tsx
import { PasswordInput } from '@app/components';
import { useState } from 'react';

export function LoginScreen() {
  const [password, setPassword] = useState('');

  return (
    <PasswordInput
      placeholder="Sua senha"
      value={password}
      onChangeText={setPassword}
    />
  );
}
```

### Com Label

```tsx
<PasswordInput
  label="Senha"
  placeholder="Digite sua senha"
  value={password}
  onChangeText={setPassword}
/>
```

### Com Props do TextInput

```tsx
<PasswordInput
  placeholder="Mínimo 6 caracteres"
  value={password}
  onChangeText={setPassword}
  autoCapitalize="none"
  autoCorrect={false}
  editable={!loading}
/>
```

### Em um Formulário Completo

```tsx
export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <TextInput
        placeholder="seu@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <PasswordInput
        placeholder="Sua senha"
        value={password}
        onChangeText={setPassword}
      />
      
      <Button title="Entrar" />
    </View>
  );
}
```

## 📝 Props

```typescript
interface PasswordInputProps extends TextInputProps {
  label?: string;              // Label do input (opcional)
  placeholder?: string;        // Placeholder (padrão: 'Sua senha')
  value: string;               // Valor atual
  onChangeText: (text) => void; // Callback ao alterar
}
```

**Herda todas as props de TextInput:**
- `autoCapitalize`
- `autoCorrect`
- `editable`
- `maxLength`
- `onBlur`
- `onFocus`
- etc.

## 🎨 Estilo

O componente é **totalmente themed**:
- Cores adaptam ao Light/Dark mode
- Border color segue o tema
- Text color adapta automaticamente
- Placeholder color é textSecondary

### Customizar Estilo

Se precisar customizar o estilo, edite `createPasswordInputStyles`:

```typescript
const createPasswordInputStyles = (theme: any) =>
  StyleSheet.create({
    // Customize aqui
  });
```

## 👁️ Ícones de Visibilidade

Atualmente usa emojis:
- **Visível:** 👁️ (olho aberto)
- **Escondido:** 👁️‍🗨️ (olho com barra)

Para trocar, edite na linha que tem:
```tsx
{isVisible ? '👁️' : '👁️‍🗨️'}
```

### Alternativas

Você também pode usar:
- `'🔍'` / `'🔒'`
- `'👁'` / `'×'`
- Ou um Icon Component da biblioteca Expo/React Native

## 🔄 Mudanças nos Screens

O PasswordInput foi adicionado em:
- ✅ **LoginScreen.tsx** - Campo de senha
- ✅ **RegisterScreen.tsx** - Campos de senha e confirmar senha

### Antes

```tsx
<TextInput
  style={dynamicStyles.input}
  placeholder="Sua senha"
  placeholderTextColor={theme.colors.textSecondary}
  value={password}
  onChangeText={setPassword}
  secureTextEntry
  autoCapitalize="none"
  autoCorrect={false}
/>
```

### Depois

```tsx
<PasswordInput
  placeholder="Sua senha"
  value={password}
  onChangeText={setPassword}
  autoCapitalize="none"
  autoCorrect={false}
/>
```

## ✨ Features

- ✅ Toggle de visibilidade com ícone
- ✅ Suporta temas automáticos
- ✅ HitSlop aumentado (área de toque maior)
- ✅ Integração com tema do sistema
- ✅ Reutilizável em qualquer lugar
- ✅ TypeScript completo
- ✅ Props do TextInput suportadas

## 🚀 Próximas Melhorias

1. Adicionar indicador de força da senha
2. Mostrar/esconder senha ao longo do texto
3. Suportar validação em tempo real
4. Adicionar animação ao toggle
5. Customizar ícones (usar Icon library)

