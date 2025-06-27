# Back-end API

Este é o back-end da aplicação, desenvolvido em Node.js com TypeScript.

## Pré-requisitos

- Node.js (versão 18 ou superior recomendada)
- npm (geralmente já vem com o Node.js)
- Redis rodando localmente (padrão: localhost:6379)

## Instalação

1. Acesse a pasta do back-end:

```bash
cd back-end
```

2. Instale as dependências:

```bash
npm install
```

## Variáveis de ambiente

Se necessário, crie um arquivo `.env` na raiz do back-end para configurar variáveis como a URL do Redis ou porta do servidor. Exemplo:

```
PORT=3000
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

## Rodando o servidor em modo desenvolvimento

```bash
npm run dev
```

O servidor será iniciado (por padrão na porta 3000). Você pode acessar a API em:

```
http://localhost:3000
```

## Scripts úteis

- `npm run dev` — inicia o servidor com hot reload (usando tsx watch src/server.ts)
- `npm test` — executa os testes automatizados (unitários)
- `npm run lint` — executa o lint no projeto

## Observações

- Certifique-se de que o Redis está rodando antes de iniciar o back-end.
- A documentação da API esta disponível em `/docs`.

---
