import { FastifyInstance } from "fastify";
import { createPlayerAndJoinSessionSchema, joinSessionWithExistingPlayerSchema, resolveConsoleConnectionSchema } from "./console-connections.schemas.js";
import { createPlayerAndJoinSessionService, joinSessionWithExistingPlayerService, resolveConsoleConnectionService } from "./console-connections.services.js";

export async function consoleConnectionsRoutes(app: FastifyInstance) {

    app.post('/resolve', async (req, reply) => {
        console.log(req.body);

        const params = resolveConsoleConnectionSchema.parse(req.body);
        const session = await resolveConsoleConnectionService(params);
        reply.send(session);
    });

    app.post('/join-existing-player', async (req, reply) => {
        const params = joinSessionWithExistingPlayerSchema.parse(req.body);
        const session = await joinSessionWithExistingPlayerService(params);
        reply.send(session);
    });

    app.post('/create-and-join', async (req, reply) => {
        const params = createPlayerAndJoinSessionSchema.parse(req.body);
        const session = await createPlayerAndJoinSessionService(params);
        reply.send(session);
    });
}