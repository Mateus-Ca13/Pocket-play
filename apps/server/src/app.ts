import Fastify from 'fastify';
import cors from '@fastify/cors';
import { healthRoutes } from './modules/health/health.routes.js';

const app = Fastify({
    logger: true,
});

await app.register(cors, {
    origin: true,
});

app.register(healthRoutes);

export default app;