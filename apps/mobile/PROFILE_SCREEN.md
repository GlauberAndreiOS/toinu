# ProfileScreen - Tela de Perfil do Usuário

## 📋 Descrição

Tela que exibe os dados do usuário autenticado, puxando dados de `/api/auth/profile` e permite fazer logout.

## 🎯 Funcionalidades

- ✅ Exibir dados do perfil do usuário
- ✅ Carregar dados da API automaticamente
- ✅ Avatar com primeira letra do nome
- ✅ Botão para atualizar perfil
- ✅ Botão para fazer logout
- ✅ Tratamento de erros com retry
- ✅ Loading state
- ✅ Suporte a temas light/dark

## 📍 Localização

```
apps/mobile/src/app/screens/Authenticated/
├── ProfileScreen.tsx
└── index.ts
```

## 🔗 Integração no App

O App.tsx foi refatorado para suportar telas autenticadas:

```typescript
// App.tsx
import { ProfileScreen } from '@screens/Authenticated';

// Renderiza automaticamente quando isAuthenticated = true
{isAuthenticated ? renderAuthenticatedScreen() : renderUnauthenticatedScreen()}
```

## 📊 Fluxo de Dados

```
┌─────────────────────────┐
│   AuthContext           │
│   - isAuthenticated     │
│   - user                │
│   - token               │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   ProfileScreen         │
│   - useAuth()           │
│   - useEffect()         │
└────────────┬────────────┘
             │ authApi.getProfile()
             ▼
┌─────────────────────────┐
│   GET /api/auth/profile │
│   Authorization: Bearer │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   Backend Response      │
│   {id, email, name,     │
│    createdAt}           │
└─────────────────────────┘
```

## 🎨 Visual da Tela

```
┌────────────────────────────────┐
│           PERFIL               │
├────────────────────────────────┤
│                                │
│          ┌──────────┐          │
│          │    J     │          │  ← Avatar
│          └──────────┘          │
│                                │
│        João Silva              │  ← Nome
│      joao@example.com          │  ← Email
│                                │
├────────────────────────────────┤
│   INFORMAÇÕES PESSOAIS         │
│                                │
│   Nome: João Silva             │
│   Email: joao@example.com      │
│   ID: uuid-123...              │
│   Cadastrado em: 30/12/2024    │
│                                │
├────────────────────────────────┤
│   [🔄 Atualizar Perfil]        │
│   [🚪 Fazer Logout]            │
├────────────────────────────────┤
│          Versão 1.0.0          │
└────────────────────────────────┘
```

## 📝 Estados

### Loading
```typescript
{
  loading: true,
  profile: null,
  error: null
}
// Mostra: ActivityIndicator + "Carregando perfil..."
```

### Success
```typescript
{
  loading: false,
  profile: {
    id: "uuid",
    email: "user@example.com",
    name: "João Silva",
    createdAt: "2024-12-30T..."
  },
  error: null
}
// Mostra: Dados do perfil
```

### Error
```typescript
{
  loading: false,
  profile: null,
  error: "Erro ao carregar perfil"
}
// Mostra: Mensagem de erro com botão Tentar Novamente
```

## 🔄 Ciclo de Vida

1. **Montagem**
   ```typescript
   useEffect(() => {
     loadProfile();
   }, [token]);
   ```

2. **Carregamento**
   - Verifica se há token
   - Faz requisição para `/api/auth/profile`
   - Armazena em `setProfile()`

3. **Exibição**
   - Mostra dados do perfil
   - Se falhar, mostra erro

## 🎯 Casos de Uso

### 1. Primeiro Acesso (após login)
```
Login bem-sucedido
    ↓
AuthContext atualiza isAuthenticated
    ↓
App renderiza ProfileScreen
    ↓
useEffect executa loadProfile()
    ↓
API retorna dados
    ↓
Perfil exibido
```

### 2. Atualizar Perfil
```
Usuário toca [🔄 Atualizar Perfil]
    ↓
loadProfile() executa
    ↓
API retorna dados atualizados
    ↓
Tela atualiza
```

### 3. Fazer Logout
```
Usuário toca [🚪 Fazer Logout]
    ↓
Alert de confirmação
    ↓
useAuth().logout() executa
    ↓
AsyncStorage limpo
    ↓
isAuthenticated = false
    ↓
App renderiza telas não autenticadas
```

## 🔒 Segurança

- ✅ Token obrigatório para acessar
- ✅ Verificação de token antes de requisição
- ✅ Tratamento de 401 Unauthorized
- ✅ Logout com confirmação

## 🐛 Tratamento de Erros

### Erro de Conexão
```
[NETWORK] ✗ Erro de conexão com a API
↓
Mostra: "Erro ao Carregar Perfil" com botão Tentar Novamente
```

### Token Inválido (401)
```
[AUTH] ⚠ Token inválido ou expirado (401)
↓
Token removido do AsyncStorage
↓
App redireciona para login
```

### Timeout
```
[TIMEOUT] ✗ Requisição excedeu o tempo limite (30s)
↓
Mostra: "Erro ao Carregar Perfil"
```

## 📱 Compatibilidade

- ✅ iOS 13+
- ✅ Android 8+
- ✅ Web (Expo Web)
- ✅ Light mode
- ✅ Dark mode

## 🚀 Próximas Melhorias

1. Editar perfil
2. Alterar senha
3. Adicionar foto de perfil
4. Histórico de atividades
5. Preferências de notificação
6. Deletar conta

## 📚 Props e Hooks

### useAuth()
```typescript
{
  user: User | null,           // Dados do usuário (cache)
  token: string | null,        // Token JWT
  loading: boolean,            // Carregando?
  login: () => Promise<void>,  // Fazer login
  register: () => Promise<void>, // Registrar
  logout: () => Promise<void>, // Fazer logout
  isAuthenticated: boolean     // Autenticado?
}
```

### useTheme()
```typescript
{
  theme: {
    mode: 'light' | 'dark',
    colors: {
      primary, background, surface,
      text, textSecondary, border,
      error, success, warning
    }
  },
  toggleTheme: () => void
}
```

## 🔗 Endpoints Usados

```
GET /api/auth/profile
Authorization: Bearer {token}

Response: {
  id: string,
  email: string,
  name: string,
  createdAt?: string
}
```

## 💾 Dados Armazenados

**AsyncStorage:**
```
@auth_token = "jwt-token"
@auth_user = { id, email, name }
```

**Estado Local:**
```typescript
profile: UserProfile | null
loading: boolean
error: string | null
```

## 🎓 Como Usar

```tsx
import { ProfileScreen } from '@screens/Authenticated';

// Usado automaticamente pelo App.tsx quando isAuthenticated = true
// Não precisa importar em outro lugar
```

Para ir para o ProfileScreen de outra tela autenticada:
```tsx
// Já está na ProfileScreen por padrão
// Adicione mais telas conforme necessário no App.tsx
```

