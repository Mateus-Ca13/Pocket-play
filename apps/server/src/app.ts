import Fastify from 'fastify';
import cors from '@fastify/cors';
import { healthRoutes } from './modules/health/health.routes.js';
import { consoleSessionsRoutes } from './modules/console-sessions/console-sessions.routes.js';
import { ZodError } from 'zod';
import { consoleConnectionsRoutes } from './modules/console-connections/console-connections.routes.js';
import { playersProfilesRoutes } from './modules/players-profiles/player-profile..routes.js';
import { playerSessionRoutes } from './modules/player-session/player-session.routes.js';

const app = Fastify({

});

await app.register(cors, {
    origin: true,
});

app.register(healthRoutes);

app.register(consoleSessionsRoutes, {
    prefix: '/console-sessions'
});

app.register(consoleConnectionsRoutes, {
    prefix: '/console-connections'
});

app.register(playerSessionRoutes, {
    prefix: '/player-session'
});

app.register(playersProfilesRoutes, {
    prefix: '/players-profiles'
});


app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid request payload',
                details: error.issues,
            },
        });
    }

    app.log.error(error);

    return reply.status(500).send({
        error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal server error',
        },
    });
});

export default app;