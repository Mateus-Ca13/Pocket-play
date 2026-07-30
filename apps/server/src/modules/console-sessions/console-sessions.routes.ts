import { FastifyInstance } from "fastify";
import { resolveConsoleSessionService } from "./console-sessions.services.js";
import { resolveConsoleSessionSchema } from "./console-sessions.schemas.js";

export async function consoleSessionsRoutes(app: FastifyInstance) {

    app.post('/resolve', async (req, reply) => {
        console.log(req.body);

        const params = resolveConsoleSessionSchema.parse(req.body);
        const session = await resolveConsoleSessionService(params);
        reply.send(session);
    });
}