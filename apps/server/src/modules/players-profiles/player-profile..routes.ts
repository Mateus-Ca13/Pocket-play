import { FastifyInstance } from "fastify";
import { editPlayerProfileService } from "./player-profile.services.js";
import { editPlayerProfileSchema } from "./player-profile.schemas.js";

export async function playersProfilesRoutes(app: FastifyInstance) {

    app.put('/update', async (req, reply) => {
        const params = editPlayerProfileSchema.parse(req.body);
        const player = await editPlayerProfileService(params);
        reply.status(200).send(player);
    });

}
