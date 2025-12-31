# Setup Completo - Frontend + Backend

## 🚀 Começar a Usar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Android Studio/Emulator OU iOS Simulator (opcional)

## 1️⃣ Setup do Backend (API)

```bash
# Entrar na pasta do projeto
cd /home/andrei/toinu

# Instalar dependências (se não feito ainda)
npm install

# Configurar banco de dados (Prisma)
npx prisma generate

# (Opcional) Resetar/seed do banco
# npx prisma db push

# Iniciar o servidor
npm run start:api

# ✅ Sucesso quando ver:
# 🚀 Application is running on: http://localhost:3000/api
```

### Testar Backend

```bash
# Login (em outro terminal)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Resposta esperada:
# {
#   "access_token": "eyJ...",
#   "user": { "id": "1", "email": "test@example.com", "name": "Test User" }
# }
```

## 2️⃣ Setup do Frontend (Mobile)

```bash
# Dentro da pasta do projeto
cd /home/andrei/toinu

# Instalar dependências
npm install

# Criar arquivo .env.local (já criado, verificar)
cat apps/mobile/.env.local

# Deve conter:
# EXPO_PUBLIC_API_URL=http://localhost:3000/api

# Iniciar o Expo
cd apps/mobile
npm run start
# ou
expo start

# ✅ Sucesso quando ver:
# Starting Expo server...
# Tunneling ready at...
# Press 'w' to open web interface...
```

## 3️⃣ Conectar ao App

### Opção A: Emulador Android
```bash
# No prompt do Expo, pressione 'a'
# Ou manualmente:
adb devices  # Verificar emulator rodando
expo run:android
```

### Opção B: Emulador iOS (macOS)
```bash
# No prompt do Expo, pressione 'i'
# Ou manualmente:
expo run:ios
```

### Opção C: Web (Mais rápido para testes)
```bash
# No prompt do Expo, pressione 'w'
# Abre http://localhost:19006
```

## 4️⃣ Testar Login/Register

### Fluxo de Teste

1. **Abrir o app**
   - HomeScreen com carrossel deve aparecer
   - Botão "Começar" leva para LoginScreen

2. **Tentar Login**
   ```
   Email: test@example.com
   Senha: password123
   
   ✅ Se sucesso: Redireciona (implement next screen)
   ❌ Se erro: Mostra mensagem de erro
   ```

3. **Tentar Register**
   ```
   Nome: João Silva
   Email: joao@example.com
   Senha: senha123
   Confirmar: senha123
   
   ✅ Se sucesso: User criado, token salvo
   ❌ Se erro: Email já existe ou validação falhou
   ```

## 🐛 Debugging

### Ver Logs da API
```bash
# Terminal do backend mostra todos os erros
# Procure por mensagens como:
# [Error] Credenciais inválidas
# [Error] Email já está em uso
```

### Ver Logs do Frontend
```bash
# Terminal do Expo mostra logs do app
# Ou use Expo DevTools:
# Press 'j' no terminal Expo
```

### Verificar AsyncStorage
```bash
# Para ver dados salvos no frontend:
// Adicione em algum componente:
import AsyncStorage from '@react-native-async-storage/async-storage';

const checkStorage = async () => {
  const token = await AsyncStorage.getItem('@auth_token');
  const user = await AsyncStorage.getItem('@auth_user');
  console.log('Token:', token);
  console.log('User:', user);
};
```

## 🔧 Troubleshooting

### Erro: "Cannot find module '@contexts/ThemeContext'"

**Solução:**
```bash
# Verificar se tsconfig.json tem os aliases
cat tsconfig.base.json

# Deve ter:
# "paths": {
#   "@contexts/*": ["apps/mobile/src/contexts/*"],
#   ...
# }

# Limpar cache e reiniciar
rm -rf node_modules/.cache
npm start
```

### Erro: "API connection refused"

**Verificações:**
```bash
# 1. Backend está rodando?
lsof -i :3000
# Deve mostrar node process

# 2. URL está correta?
cat apps/mobile/.env.local
# Deve ter: EXPO_PUBLIC_API_URL=http://localhost:3000/api

# 3. Firewall bloqueando?
# Tente acessar http://localhost:3000/api no navegador
# Deve retornar erro 404 (mas conecta!)
```

### Erro: "401 Unauthorized"

**Solução:**
```bash
# 1. Limpar cache de autenticação
# Usar botão Logout (quando implementado)

# 2. Ou manualmente no storage
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.removeItem('@auth_token');
await AsyncStorage.removeItem('@auth_user');

# 3. Fazer login novamente
```

## 📊 Estrutura de Pastas

```
toinu/
├── apps/
│   ├── api/              # Backend (NestJS)
│   │   └── src/
│   │       ├── auth/     # Autenticação
│   │       ├── users/    # Usuários
│   │       └── prisma/   # Database
│   │
│   └── mobile/           # Frontend (React Native)
│       └── src/
│           ├── contexts/ # ThemeContext, AuthContext
│           ├── services/ # API calls (axios)
│           ├── screens/  # Telas
│           └── app/      # Root app
│
├── shared-types/         # Types compartilhados
└── package.json          # Dependências root
```

## ✅ Checklist Final

- [ ] Backend rodando em http://localhost:3000/api
- [ ] Frontend com `.env.local` configurado
- [ ] Emulador/Device conectado
- [ ] Conseguir fazer login
- [ ] Conseguir se registrar
- [ ] Token salvo em AsyncStorage
- [ ] Tema Light/Dark funciona
- [ ] Carrossel funciona na HomeScreen

## 🎯 Próximos Passos

1. Implementar Dashboard (após login)
2. Adicionar mais endpoints (perfil, viagens, etc)
3. Implementar push notifications
4. Adicionar maps para rastrear viagens

## 📞 Suporte

Para mais detalhes, veja:
- `/API_INTEGRATION_GUIDE.md` - Guia completo da API
- `/apps/mobile/THEME_SYSTEM.md` - Sistema de temas
- `/apps/mobile/PATH_ALIASES.md` - Path aliases

