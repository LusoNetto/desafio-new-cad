# Back-end: Flights & Bookmarks API

Este diretório contém o back-end da aplicação, desenvolvido em Node.js, Express e TypeScript, com Redis e testes automatizados.

## Funcionalidades
- API RESTful para gerenciamento de voos (flights) e favoritos (bookmarks)
- Validação de dados com Zod
- Documentação interativa com Swagger
- Testes unitários e de integração (Jest, Supertest)
- Mock de Redis para testes
- Separação de camadas (controllers, services, DTOs, middlewares)

## Como rodar

### Pré-requisitos
- Node.js >= 18
- npm >= 9
- Redis (para produção ou dev, porém mockado nos testes)

#### Como rodar o Redis no Windows
1. Baixe a versão oficial do Redis para Windows no repositório:
   https://github.com/tporadowski/redis/releases
2. Extraia o arquivo ZIP em uma pasta de sua preferência.
3. Abra o terminal (PowerShell ou Prompt de Comando) na pasta extraída.
4. Execute o comando:
   ```powershell
   .\redis-server.exe
   ```
   O Redis estará rodando na porta padrão 6379.

> Dica: Para rodar o Redis em segundo plano, use um terminal separado ou configure como serviço.

### Instalação
```bash
npm install
```

### Rodando o servidor
```bash
npm run dev
```
O servidor estará disponível em `http://localhost:3000`.

### Testes
```bash
npm test
```

## Documentação Swagger
Acesse a documentação interativa da API em:
```
http://localhost:3000/docs
```

## Estrutura de Pastas
```
src/
  controllers/
  services/
  routes/
  middlewares/
  utils/
  validators/
  docs/
  __tests__/
```

## Dicas
- Expanda a documentação no arquivo `src/docs/swagger.ts`.
- Use variáveis de ambiente para configuração.
- Siga o padrão de controllers, services e rotas para novos recursos.
