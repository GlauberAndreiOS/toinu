# Path Aliases - Guia de Uso

## Configuração Implementada

Os aliases foram configurados no `tsconfig.base.json` para facilitar as importações no projeto mobile.

## Aliases Disponíveis

| Alias | Caminho | Uso |
|-------|---------|-----|
| `@app/*` | `apps/mobile/src/app/*` | Componentes do app principal |
| `@screens/*` | `apps/mobile/src/app/screens/*` | Telas do app |
| `@contexts/*` | `apps/mobile/src/contexts/*` | Context API (Auth, etc) |
| `@services/*` | `apps/mobile/src/services/*` | Serviços (API calls, etc) |
| `@assets/*` | `apps/mobile/src/assets/*` | Imagens, fontes, etc |
| `@toinu/shared-types` | `shared-types/src/index.ts` | Types compartilhados |

## Exemplos de Uso

### ❌ Antes (com paths relativos)

```tsx
// App.tsx
import { HomeScreen, LoginScreen, RegisterScreen } from './screens/Unauthenticated';

// LoginScreen.tsx
import { useAuth } from '../../contexts/AuthContext';

// AuthContext.tsx
import { authApi } from '../services/api';
```

### ✅ Depois (com aliases)

```tsx
// App.tsx
import { HomeScreen, LoginScreen, RegisterScreen } from '@screens/Unauthenticated';

// LoginScreen.tsx
import { useAuth } from '@contexts/AuthContext';

// AuthContext.tsx
import { authApi } from '@services/api';
```

## Vantagens

- ✅ **Menos confuso**: Sem `../../` e `../`
- ✅ **Mais limpo**: Código mais legível
- ✅ **Refatoração fácil**: Mover arquivos sem quebrar imports
- ✅ **Autocompletar**: IDEs reconhecem os aliases
- ✅ **Escalável**: Fácil adicionar novos aliases

## Como Adicionar Novos Aliases

1. Abra `tsconfig.base.json`
2. Adicione um novo path em `compilerOptions.paths`:

```json
"paths": {
  "@novo-alias/*": ["apps/mobile/src/novo-path/*"]
}
```

3. Pronto! O IDE reconhecerá automaticamente

## Exemplo Prático

### Estrutura
```
apps/mobile/src/
├── app/
│   ├── App.tsx
│   └── screens/
├── contexts/
│   └── AuthContext.tsx
├── services/
│   └── api.ts
└── assets/
    └── images/
```

### Importações com Aliases

```tsx
// Em qualquer arquivo do mobile
import { HomeScreen } from '@screens/Unauthenticated';
import { useAuth } from '@contexts/AuthContext';
import { authApi } from '@services/api';
import Logo from '@assets/images/logo.png';
```

## Arquivos Atualizados

- ✅ `tsconfig.base.json` - Adicionados paths
- ✅ `App.tsx` - Usa `@screens`
- ✅ `LoginScreen.tsx` - Usa `@contexts`
- ✅ `RegisterScreen.tsx` - Usa `@contexts`
- ✅ `AuthContext.tsx` - Usa `@services`
- ✅ `App.spec.tsx` - Usa `@app`

