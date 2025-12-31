# Telas Unauthenticated - App de Mobilidade Urbana

## Estrutura Consolidada

```
src/app/screens/Unauthenticated/
├── Carousel/
│   ├── Carousel.tsx (componente carrossel)
│   └── index.ts (exportação)
├── HomeScreen.tsx (tela de onboarding)
├── LoginScreen.tsx (tela de login)
├── RegisterScreen.tsx (tela de registro)
├── index.ts (exportação central)
└── README.md (este arquivo)
```

## Componentes

### HomeScreen.tsx
Tela inicial com o carrossel de onboarding:
- Exibe 3 slides explicando o uso do app
- Gerencia a navegação após "Começar"

### Carousel.tsx
Componente de carrossel interativo com:
- **3 slides** explicando o uso do app:
  1. **Peça sua viagem** - Escolher origem e destino
  2. **Acompanhe em tempo real** - Ver localização do motorista
  3. **Pague de forma segura** - Opções de pagamento

**Features:**
- ✅ Scroll horizontal com paginação
- ✅ Indicadores de progresso (dots animados)
- ✅ Botões Anterior/Próximo
- ✅ Animações suaves
- ✅ Design responsivo
- ✅ Circles coloridas por slide
- ✅ TypeScript completo

### LoginScreen.tsx
Tela de login com:
- Campo de email
- Campo de senha
- Loading state
- Link para registro

### RegisterScreen.tsx
Tela de registro com:
- Campo de nome
- Campo de email
- Campo de senha
- Campo de confirmação de senha
- Validações
- Loading state
- Link para login

## Exportações

No `index.ts` você pode importar tudo facilmente:

```tsx
import { HomeScreen, LoginScreen, RegisterScreen } from './screens/Unauthenticated';
```

## Estilos

O design segue a paleta de cores:
- **Azul**: #4F46E5 (Peça sua viagem)
- **Verde**: #059669 (Acompanhe em tempo real)
- **Laranja**: #D97706 (Pague de forma segura)
- **Cinza**: #111827 (Texto principal), #6b7280 (Descrição)
- **Branco**: #ffffff (Background)

## Como Usar

```tsx
import { HomeScreen, LoginScreen, RegisterScreen } from './screens/Unauthenticated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen onGetStarted={() => {
        // Navegar para registro/login
      }} />
    </SafeAreaView>
  );
}
```

## Próximos Passos

- [ ] Integrar navegação (React Navigation)
- [ ] Conectar com API de autenticação
- [ ] Implementar persistência de dados (AsyncStorage)
- [ ] Adicionar validações de email mais robustas
- [ ] Implementar tela de dashboard após login

