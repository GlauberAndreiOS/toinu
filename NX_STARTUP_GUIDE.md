# Executar Mobile e API com Nx

## 🚀 Como Iniciar

### 1. Iniciar Ambos Simultaneously (Recomendado)

```bash
npm run dev
# ou
npm start
```

**O que acontece:**
- API inicia em `http://localhost:3000/api`
- Mobile (Expo) inicia em `http://localhost:19000`
- Ambos rodam em paralelo no mesmo terminal

**Output esperado:**
```
[api] 🚀 Application is running on: http://localhost:3000/api
[mobile] Expo server running on localhost:19000
[mobile] Tunnel ready at ...
```

### 2. Iniciar Apenas a API

```bash
npm run dev:api
```

**O que acontece:**
- API inicia em `http://localhost:3000/api`
- Mobile não inicia

### 3. Iniciar Apenas o Mobile

```bash
npm run dev:mobile
```

**O que acontece:**
- Expo inicia em `http://localhost:19000`
- API não inicia (você pode iniciar em outro terminal)

## 📋 Scripts Disponíveis

| Script | Comando | O que faz |
|--------|---------|----------|
| `npm run dev` | `nx run-many --projects=api,mobile --targets=serve --parallel` | Inicia API e Mobile em paralelo |
| `npm start` | Alias para `npm run dev` | Mesma coisa que `npm run dev` |
| `npm run dev:api` | `nx serve api` | Inicia apenas a API |
| `npm run dev:mobile` | `nx start mobile` | Inicia apenas o Mobile |
| `npm run build` | `nx run-many --projects=api,mobile --targets=build` | Faz build de ambos |
| `npm run test` | `nx run-many --projects=api,mobile --targets=test` | Roda testes em ambos |

## 🎯 Fluxo de Trabalho Recomendado

### Para Desenvolvimento Completo

```bash
# Terminal 1: Iniciar tudo
npm run dev

# Seu app mobile está pronto!
# API rodando em http://localhost:3000/api
# Expo rodando em http://localhost:19000
```

### Para Debugging

Se precisar separar para ver logs melhor:

```bash
# Terminal 1: API
npm run dev:api

# Terminal 2: Mobile
npm run dev:mobile
```

## 🔧 Como Funciona o Nx

### run-many

Executa targets em múltiplos projetos:

```bash
nx run-many --projects=api,mobile --targets=serve --parallel
```

**Flags explicadas:**
- `--projects=api,mobile` - Roda em api e mobile
- `--targets=serve` - Executa o target "serve" de cada projeto
- `--parallel` - Roda em paralelo (não sequencial)

### Sem parallel (Sequencial)

```bash
nx run-many --projects=api,mobile --targets=serve
# Inicia API primeiro, depois mobile
```

## 📍 Verificar se está Tudo Funcionando

### API

```bash
curl http://localhost:3000/api
# Deve retornar 404 ou erro (mas conecta)
```

### Expo

Abra http://localhost:19000 no navegador

## 🐛 Troubleshooting

### "Porta 3000 já está em uso"

```bash
# Encontrar processo na porta 3000
lsof -i :3000

# Matar processo
kill -9 <PID>

# Tentar novamente
npm run dev
```

### "Porta 19000 (Expo) em uso"

```bash
# Encontrar processo na porta 19000
lsof -i :19000

# Matar processo
kill -9 <PID>

# Tentar novamente
npm run dev:mobile
```

### "API não conecta no mobile"

Verificar `.env.local` do mobile:
```env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

Se rodar de um dispositivo físico:
```env
EXPO_PUBLIC_API_URL=http://<seu-ip-local>:3000/api
```

## 🏗️ Estrutura dos Targets

### API (apps/api/project.json)

```json
{
  "targets": {
    "serve": {
      "executor": "@nx/js:node",
      "options": {
        "buildTarget": "api:build"
      }
    },
    "build": { ... },
    "test": { ... }
  }
}
```

### Mobile (apps/mobile/project.json)

```json
{
  "targets": {
    "serve": {
      "executor": "nx:run-commands",
      "options": {
        "command": "npx expo start",
        "cwd": "apps/mobile"
      }
    },
    "start": { ... },
    "build": { ... },
    "test": { ... }
  }
}
```

## 🎓 Exemplos Práticos

### Exemplo 1: Desenvolvimento Local Completo

```bash
# Tudo em um comando
npm run dev

# Agora você pode:
# 1. Acessar API em http://localhost:3000/api
# 2. Acessar Expo em http://localhost:19000
# 3. Escanear QR code do Expo com seu celular
# 4. Usar Expo Web (pressione 'w')
```

### Exemplo 2: Debugging Separado

```bash
# Terminal 1
npm run dev:api

# Terminal 2
npm run dev:mobile

# Agora você vê logs separados para cada app
```

### Exemplo 3: Build de Produção

```bash
# Build ambos
npm run build

# Resultado:
# - dist/apps/api/ (API compilada)
# - dist/apps/mobile/ (Mobile compilado)
```

### Exemplo 4: Rodar Testes

```bash
# Testar ambos
npm run test

# Ou testar individualmente
nx test api
nx test mobile
```

## 🔍 Verificar Targets Disponíveis

```bash
# Ver todos os targets do projeto mobile
nx show project mobile --web

# Ver todos os targets do projeto api
nx show project api --web
```

## 📚 Referências Nx

- [Nx run-many](https://nx.dev/reference/nx-cli/run-many)
- [Nx serve](https://nx.dev/reference/nx-cli/serve)
- [Nx targets](https://nx.dev/concepts/executors-and-configurations)

## 💡 Dicas

### 1. Atalhos de Teclado no Expo

```
w - Abrir web
a - Abrir Android
i - Abrir iOS
e - Abrir editor
r - Recarregar
m - Menu
j - Debugger
```

### 2. Monitorar Mudanças

Ambas as aplicações recarregam automaticamente ao detectar mudanças (hot reload).

### 3. Acessar de Outro Computador

Na API:
```env
DATABASE_URL=postgresql://...
PORT=3000  # Escuta em 0.0.0.0:3000
```

No Mobile:
```env
EXPO_PUBLIC_API_URL=http://<seu-ip>:3000/api
```

## 🚀 Próximas Melhorias

1. **Docker Compose** - Para não precisar instalar dependências locais
2. **Makefile** - Para atalhos de comandos
3. **GitHub Actions** - Para CI/CD automático
4. **Health Check** - Verificar se tudo está rodando

---

**Última atualização:** 30/12/2024

