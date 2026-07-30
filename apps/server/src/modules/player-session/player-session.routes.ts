import { FastifyInstance } from "fastify";
import { connectToPlayerSessionSchema } from "./player-session.schemas.js";
import { connectToPlayerSessionService } from "./player-session.services.js";

export async function playerSessionRoutes(app: FastifyInstance) {

    app.post('/connect', async (req, reply) => {
        const params = connectToPlayerSessionSchema.parse(req.body);

        const result = await connectToPlayerSessionService(params);
        reply.send(result);
    });
}
