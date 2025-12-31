# Guia de Integração API - Frontend & Backend

## 🔗 Conexão Frontend-Backend

A integração entre o app mobile e a API backend foi configurada com sucesso!

## 📋 Arquitetura da Integração

```
┌─────────────────────┐
│   React Native      │
│   (Mobile App)      │
└──────────┬──────────┘
           │
     axios instance
           │
           ▼
┌─────────────────────┐
│   /services/api.ts  │
│   - Interceptors    │
│   - Auth Token      │
│   - Error Handling  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   NestJS API        │
│   :3000/api         │
│   - /auth/login     │
│   - /auth/register  │
│   - /auth/profile   │
└─────────────────────┘
```

## 🔧 Configuração

### 1. Variáveis de Ambiente

**Arquivo: `.env.local`**
```env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

Para produção, atualize com a URL real:
```env
EXPO_PUBLIC_API_URL=https://sua-api.com/api
```

### 2. API Service (`/services/api.ts`)

O arquivo `/services/api.ts` configura:
- **Base URL**: Carregada de `EXPO_PUBLIC_API_URL`
- **Timeout**: 30 segundos
- **Content-Type**: application/json

#### Interceptors Automáticos:

**Request Interceptor:**
- Adiciona token JWT automaticamente
- Busca token do AsyncStorage
- Adiciona header `Authorization: Bearer {token}`

**Response Interceptor:**
- Trata erros 401 (token inválido)
- Remove token expirado do storage
- Retorna erro estruturado

### 3. AuthContext Integration

**Arquivo: `/contexts/AuthContext.tsx`**

```tsx
import { useAuth } from '@contexts/AuthContext';

function MyComponent() {
  const { login, register, logout, user, isAuthenticated } = useAuth();
  
  // Login
  await login('user@email.com', 'senha123');
  
  // Register
  await register('user@email.com', 'senha123', 'Nome Completo');
  
  // Logout
  await logout();
}
```

## 🚀 Endpoints Disponíveis

### Autenticação

#### Login
```
POST /api/auth/login
Body: { email, password }
Response: { access_token, user }
```

**Exemplo:**
```tsx
const { login } = useAuth();
await login('user@email.com', 'senha123');
```

#### Register
```
POST /api/auth/register
Body: { email, password, name }
Response: { access_token, user }
```

**Exemplo:**
```tsx
const { register } = useAuth();
await register('user@email.com', 'senha123', 'João Silva');
```

#### Profile
```
GET /api/auth/profile
Headers: { Authorization: Bearer {token} }
Response: User
```

**Exemplo:**
```tsx
const { user } = useAuth();
console.log(user); // { id, email, name }
```

## 💾 Persistência de Dados

Os dados são salvos automaticamente no AsyncStorage:

```
@auth_token    → Token JWT
@auth_user     → Dados do usuário
```

## 🔐 Segurança

### Token Management

1. **Token é salvo após login:**
   ```tsx
   await AsyncStorage.setItem('@auth_token', token);
   ```

2. **Token é enviado automaticamente:**
   ```
   Authorization: Bearer {token}
   ```

3. **Token é removido em caso de erro 401:**
   ```tsx
   if (error.response?.status === 401) {
     await AsyncStorage.removeItem('@auth_token');
   }
   ```

### Password Security

- Senhas são hash com bcrypt no backend
- Nunca são armazenadas em plaintext
- Apenas token JWT é armazenado no frontend

## 🛠️ Troubleshooting

### Erro: "API não conecta"

**Solução 1: Verificar URL**
```env
# Certifique-se que:
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

**Solução 2: Backend rodando?**
```bash
# Na pasta do backend
npm run start
# Deve exibir:
# 🚀 Application is running on: http://localhost:3000/api
```

**Solução 3: CORS (Se necessário)**
```typescript
// No backend main.ts
import { NestFactory } from '@nestjs/core';

const app = await NestFactory.create(AppModule);
app.enableCors({
  origin: true,
  credentials: true,
});
```

### Erro: "401 Unauthorized"

**Causa:** Token expirado ou inválido

**Solução:**
1. Usuário precisa fazer login novamente
2. AuthContext remove token automaticamente
3. App redireciona para tela de login

### Erro: "Network Timeout"

**Causa:** API levando mais de 30s para responder

**Solução:**
```typescript
// Aumentar timeout em api.ts
timeout: 60000, // 60 segundos
```

## 📝 Exemplo Completo de Uso

```tsx
import { useAuth } from '@contexts/AuthContext';
import { useTheme } from '@contexts/ThemeContext';
import { useState } from 'react';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const { theme } = useTheme();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await login(email, password);
      // App redireciona automaticamente após sucesso
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... JSX com campos de email/password
    // Botão que chama handleLogin()
  );
}
```

## 🚀 Próximas Etapas

1. **Adicionar mais endpoints:**
   - GET `/api/users` - Listar usuários
   - PUT `/api/users/:id` - Atualizar perfil
   - DELETE `/api/users/:id` - Deletar conta

2. **Refresh Token:**
   - Implementar refresh token automático
   - Renovar token antes de expirar

3. **Error Handling:**
   - Toast notifications para erros
   - Retry automático para falhas de rede

4. **Loading States:**
   - Indicadores de carregamento
   - Buttons desabilitados durante requisição

5. **Analytics:**
   - Log de requisições
   - Monitoramento de erros

## 📚 Documentação

- **API Docs:** Veja `/apps/api/README.md`
- **Auth Docs:** Veja `/apps/mobile/README.md`
- **Types Compartilhados:** `/shared-types/src`

