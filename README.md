# Flights & Bookmarks - Fullstack Project

Este projeto é composto por duas aplicações:
- **Back-end:** API RESTful para gerenciamento de voos e favoritos (Node.js, Express, TypeScript, Redis)
- **Front-end:** SPA para busca, filtro e gerenciamento de voos/favoritos (React, TypeScript, Vite)

---

## Como rodar o projeto

### Pré-requisitos
- Node.js >= 18
- npm >= 9
- Redis (para o back-end)

### 1. Rodando o Redis no Windows
1. Baixe a versão oficial do Redis para Windows: https://github.com/tporadowski/redis/releases
2. Extraia o ZIP em uma pasta.
3. No terminal, navegue até a pasta e execute:
   ```powershell
   .\redis-server.exe
   ```

---

## Back-end

### Instalação
```bash
cd back-end
npm install
```

### Rodando o servidor
```bash
npm run dev
```
Acesse: http://localhost:3000

### Testes
```bash
npm test
```

### Documentação Swagger
Acesse: http://localhost:3000/docs

---

## Front-end

### Instalação
```bash
cd front-end
npm install
```

### Rodando a aplicação
```bash
npm run dev
```
Acesse: http://localhost:5173

---

## Estrutura de Pastas
```
back-end/
  src/
    controllers/
    services/
    routes/
    ...
front-end/
  src/
    components/
    pages/
    api/
    ...
```

---

## Funcionalidades
- Busca, filtro e listagem de voos
- Favoritar/desfavoritar voos (sincronização com backend e localStorage)
- Filtro e busca independentes para voos e favoritos
- Documentação interativa da API
- Testes automatizados no back-end

---

## Observações
- Para desenvolvimento, rode o back-end e o front-end em terminais separados.
- O Redis é necessário apenas para o back-end.
- Para dúvidas sobre regras de lint, consulte os READMEs de cada subprojeto.
