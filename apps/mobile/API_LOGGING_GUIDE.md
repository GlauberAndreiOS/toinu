# Sistema de Logs para Debugging da API

## 📋 Overview

Um sistema de logs estruturado foi implementado na API service para facilitar o debugging de erros de conexão, autenticação e requisições.

## 🎯 Tipos de Logs

### ✓ Info (Verde)
```
[API] ✓ Configurada para http://localhost:3000/api
[AUTH] ✓ Token adicionado à requisição
[AUTH] ✓ Login bem-sucedido
[RESPONSE] ✓ 200 /auth/login
```

Quando usar: Operações bem-sucedidas

### ✗ Error (Vermelho)
```
[AUTH] ✗ Falha ao fazer login
[NETWORK] ✗ Erro de conexão com a API
[REQUEST] ✗ Erro ao preparar requisição
[TIMEOUT] ✗ Requisição excedeu o tempo limite (30s)
```

Quando usar: Erros que impedem a operação

### ⚠ Warn (Amarelo)
```
[AUTH] ⚠ Nenhum token encontrado no AsyncStorage
[AUTH] ⚠ Token inválido ou expirado (401)
```

Quando usar: Situações anormais mas recuperáveis

### 🔍 Debug (Azul)
```
[REQUEST] 🔍 POST /auth/login
{
  "url": "/auth/login",
  "method": "post",
  "headers": {...},
  "data": {"email": "user@example.com"}
}
```

Quando usar: Detalhes técnicos e estruturas de dados

## 📝 Logs por Cenário

### Cenário 1: Login Bem-Sucedido

```
[API] ✓ Configurada para http://localhost:3000/api
[AUTH] ✓ Iniciando login { email: 'user@example.com' }
[REQUEST] 🔍 POST /auth/login {
  url: '/auth/login',
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  data: { email: 'user@example.com', password: '...' }
}
[AUTH] ⚠ Nenhum token encontrado no AsyncStorage  (primeira vez)
[RESPONSE] ✓ 200 /auth/login {
  status: 200,
  url: '/auth/login',
  data: { access_token: 'eyJ...', user: {...} }
}
[AUTH] ✓ Login bem-sucedido {
  userId: 'uuid-123',
  userName: 'João Silva'
}
```

### Cenário 2: Erro de Conexão

```
[API] ✓ Configurada para http://localhost:3000/api
[AUTH] ✓ Iniciando login { email: 'user@example.com' }
[REQUEST] 🔍 POST /auth/login {...}
[RESPONSE] ✗ undefined /auth/login {
  status: null,
  url: '/auth/login',
  message: 'Network Error',
  error: 'connect ECONNREFUSED 127.0.0.1:3000'
}
[NETWORK] ✗ Erro de conexão com a API {
  message: 'Network Error',
  code: 'ECONNREFUSED'
}
[AUTH] ✗ Falha ao fazer login Error: Network Error
```

**Causa:** Backend não está rodando
**Solução:** Inicie o backend com `npm run start:api`

### Cenário 3: Credenciais Inválidas

```
[AUTH] ✓ Iniciando login { email: 'user@example.com' }
[REQUEST] 🔍 POST /auth/login {...}
[RESPONSE] ✗ 401 /auth/login {
  status: 401,
  url: '/auth/login',
  message: 'Credenciais inválidas',
  data: { message: 'Credenciais inválidas' }
}
[AUTH] ⚠ Token inválido ou expirado (401)
[AUTH] ✓ Dados de autenticação removidos do AsyncStorage
[AUTH] ✗ Falha ao fazer login 401 Unauthorized
```

**Causa:** Email ou senha incorretos
**Solução:** Verificar credenciais ou criar novo usuário

### Cenário 4: Email Já Registrado

```
[AUTH] ✓ Iniciando registro { email: 'existing@example.com', name: 'João' }
[REQUEST] 🔍 POST /auth/register {...}
[RESPONSE] ✗ 409 /auth/register {
  status: 409,
  url: '/auth/register',
  message: 'Email já está em uso',
  data: { message: 'Email já está em uso' }
}
[AUTH] ✗ Falha ao registrar Error: Email já está em uso
```

**Causa:** Email já existe no banco
**Solução:** Usar outro email ou fazer login

### Cenário 5: Timeout

```
[REQUEST] 🔍 POST /auth/login {...}
[RESPONSE] ✗ undefined /auth/login {
  message: 'timeout of 30000ms exceeded',
  code: 'ECONNABORTED'
}
[TIMEOUT] ✗ Requisição excedeu o tempo limite (30s)
[AUTH] ✗ Falha ao fazer login timeout of 30000ms exceeded
```

**Causa:** API muito lenta ou rede problematizada
**Solução:** Aumentar timeout ou verificar rede

### Cenário 6: Token Expirado (401)

```
[REQUEST] 🔍 GET /auth/profile
[AUTH] ✓ Token adicionado à requisição
[RESPONSE] ✗ 401 /auth/profile {
  status: 401,
  url: '/auth/profile',
  message: 'Token expirado'
}
[AUTH] ⚠ Token inválido ou expirado (401)
[AUTH] ✓ Dados de autenticação removidos do AsyncStorage
```

**Causa:** Token JWT expirou
**Solução:** Fazer login novamente

## 🔧 Como Usar os Logs

### No Expo DevTools

1. Inicie o Expo:
```bash
cd apps/mobile
npm run start
```

2. Pressione `j` para abrir o DevTools (debugger integrado)

3. Veja os logs em tempo real

### No Chrome DevTools

1. Pressione `w` no Expo para abrir a versão web

2. Abra Chrome DevTools (F12)

3. Vá para a aba **Console**

4. Os logs aparecerão em cores

### No Android Studio

1. Use o Logcat integrado

2. Filtre por `[API]`, `[AUTH]`, etc

## 📊 Estrutura dos Logs

### Info
```
[TAG] ✓ mensagem (dados opcionais)
```

### Error
```
[TAG] ✗ mensagem (erro com stack trace)
```

### Warn
```
[TAG] ⚠ mensagem (dados opcionais)
```

### Debug
```
[TAG] 🔍 mensagem (dados em JSON formatado)
```

## 🎯 Logging Points

| Função | Logs |
|--------|------|
| **Inicializar API** | API_URL configurada |
| **Request** | URL, método, headers, dados |
| **Auth Token** | Token encontrado ou não |
| **Response Sucesso** | Status 200, dados retornados |
| **Response Erro** | Status de erro, mensagem |
| **401 Unauthorized** | Token removido |
| **Erro de Rede** | Tipo de erro, código |
| **Timeout** | Mensagem de timeout |
| **Login** | Email, sucesso/falha |
| **Register** | Email, nome, sucesso/falha |
| **Get Profile** | Sucesso/falha |

## 💡 Dicas de Debugging

### Problema: "Network Error ECONNREFUSED"

```
[NETWORK] ✗ Erro de conexão com a API
{
  message: 'Network Error',
  code: 'ECONNREFUSED'
}
```

**Verificações:**
1. Backend está rodando? `lsof -i :3000`
2. URL está correta? Veja `API_URL` no log inicial
3. Firewall está bloqueando? Tente telnet localhost 3000

### Problema: "401 Unauthorized"

```
[RESPONSE] ✗ 401 /auth/profile
[AUTH] ⚠ Token inválido ou expirado (401)
```

**Verificações:**
1. Há token no AsyncStorage? Veja logs de TOKEN
2. Token é válido? Tente fazer login novamente
3. Backend valida o token corretamente?

### Problema: "Email já está em uso"

```
[RESPONSE] ✗ 409 /auth/register
message: 'Email já está em uso'
```

**Verificações:**
1. Email já foi registrado?
2. Usar outro email ou fazer login com existente

### Problema: "Timeout"

```
[TIMEOUT] ✗ Requisição excedeu o tempo limite (30s)
```

**Verificações:**
1. API está respondendo? `curl http://localhost:3000/api`
2. Banco de dados está conectado?
3. Aumentar timeout em api.ts: `timeout: 60000`

## 📚 Exemplo de Uso

```tsx
// LoginScreen.tsx
import { useAuth } from '@contexts/AuthContext';

export function LoginScreen() {
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Logs automáticos:
      // [AUTH] ✓ Iniciando login
      // [REQUEST] 🔍 POST /auth/login
      // [AUTH] ✓ Token adicionado à requisição
      // [RESPONSE] ✓ 200 /auth/login
      // [AUTH] ✓ Login bem-sucedido
      
      await login('user@example.com', 'senha123');
      // Sucesso!
    } catch (err: any) {
      // Logs de erro já foram registrados
      // [RESPONSE] ✗ 401 /auth/login
      // [AUTH] ✗ Falha ao fazer login
      
      setError(err.message);
    }
  };

  return (
    // JSX aqui
  );
}
```

## 🚀 Próximas Melhorias

1. **Persistência de Logs** - Salvar em arquivo
2. **Analytics** - Enviar logs para servidor
3. **Filtering** - Filtrar por tipo de log
4. **Performance** - Medir tempo de requisições
5. **Sentry Integration** - Monitoramento de erros em produção

