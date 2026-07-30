# Guia de aprendizado -  Desenvolvedor

Guia de criação da API (Uso próprio pra entender o processo)

## Configurações iniciais

1. `npm init -w apps/server -y` pra iniciar um novo projeto. Declarar scripts conforme necessário.
2. Criar `tsconfig.json` para configurações globais do TypeScript e `tsconfig.node.json` para configurações do Node.js.
3. `npm install -w apps/server @prisma/client fastify @fastify/cors zod` pra instalar as dependências
4. `npm install -D -w apps/server prisma typescript tsx @types/node` pra instalar as dependências de desenvolvimento
5. criar app.ts (declaração do app) e index.ts (inicialização do app).
6. Definir `/modules` e separar rotas/services/schemas por domínio/módulo.
7. Rodar `npx prisma init --datasource-provider postgresql` dentro do projeto /server para gerar o schema.prisma, pasta prisma e .env
8. Criar um arquivo docker-compose.yml na raiz do projeto para subir o banco de dados com `docker compose up -d`
9. Rodar `npx prisma db pull` dentro do projeto /server para puxar o banco de dados.
10. Rodar `npx prisma migrate dev --name init` dentro do projeto /server para gerar as migrações e atualizar o banco de dados.
11. Rodar `npx prisma generate` dentro do projeto /server para gerar o cliente do Prisma.
12. Criar client prisma como em `src/database/prisma.ts`.

## WebSocket 

1. Em index.ts: `src/realtime/socket.ts` registramos um socket server para comunicação em tempo real.
2. Importamos a função register `registerSocketServer` e passamos como parâmetro o fastify (antes de iniciar o servidor).
3. Importamos a funções complementares (para gerencia de diferentes salas/eventos) dentro da função de register.
4. 


## Estruturação da API

13. Criar módulos e aplicar uma arquitetura de responsabilidade por camadas. Ex: `module.routes.ts`, `module.schemas.ts`, `module.service.ts`, `module.repository.ts`.

## Ferramentas usadas no projeto:

- `fastify` é um framework web rápido e leve.
- `zod` é uma biblioteca de validação de dados.
- `prisma` é um ORM para Prisma. `@prisma/client` é um cliente de banco de dados para Prisma.
- `typescript` é uma linguagem de programação. `@types/node` são as definições de tipos para Node.js.
- `tsx` é um interpretador de TypeScript. 

