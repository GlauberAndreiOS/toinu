# Toinu

Bem-vindo ao repositório do projeto **Toinu**. Este é um monorepo Nx que contém o backend (API) e o frontend móvel da aplicação.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- **apps/api**: Backend da aplicação (Node.js).
- **apps/mobile**: Aplicativo móvel (React Native com Expo).

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Nx](https://nx.dev/) (instalado globalmente ou via npx)

## Instalação

Instale as dependências do projeto:

```bash
npm install
```

## Executando a Aplicação

### API (Backend)

Para iniciar o servidor de desenvolvimento da API:

```bash
npx nx serve api
```

### Mobile (Frontend)

Para iniciar o aplicativo móvel com Expo:

```bash
npx nx start mobile
# ou
npx nx serve mobile
```

Isso iniciará o servidor de desenvolvimento do Expo. Você pode usar o aplicativo Expo Go no seu dispositivo físico ou um emulador Android/iOS para visualizar o aplicativo.

## Comandos Úteis

- **Construir a API**: `npx nx build api`
- **Executar testes**: `npx nx test api` ou `npx nx test mobile`
- **Visualizar o gráfico de dependências**: `npx nx graph`

## Tecnologias Utilizadas

- [Nx](https://nx.dev) - Sistema de build inteligente
- [Expo](https://expo.dev/) - Plataforma para React Native

---

Desenvolvido com ❤️ pela equipe Toinu.
