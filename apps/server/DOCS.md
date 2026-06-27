# Guia de criação -  Desenvolvedor

Guia de criação da API (Uso próprio pra entender o processo)

1. `npm init -w apps/server -y` pra iniciar um novo projeto. Declarar scripts conforme necessário.
2. Criar `tsconfig.json` para configurações globais do TypeScript e `tsconfig.node.json` para configurações do Node.js.
3. `npm install -w apps/server @prisma/client fastify @fastify/cors zod` pra instalar as dependências
4. `npm install -D -w apps/server prisma typescript tsx @types/node` pra instalar as dependências de desenvolvimento
5. criar app.ts (declaração do app) e index.ts (inicialização do app).
6. Definir `/modules` e separar rotas/services/schemas por domínio/módulo.
7. Rodar `npx prisma init --datasource-provider postgresql` dentro do projeto /server para gerar o schema.prisma, pasta prisma e .env
8. 


## Ferramentas usadas no projeto:

- `fastify` é um framework web rápido e leve.
- `zod` é uma biblioteca de validação de dados.
- `prisma` é um ORM para Prisma. `@prisma/client` é um cliente de banco de dados para Prisma.
- `typescript` é uma linguagem de programação. `@types/node` são as definições de tipos para Node.js.
- `tsx` é um interpretador de TypeScript. 

