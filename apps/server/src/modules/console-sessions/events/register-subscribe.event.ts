import { SocketEventContext } from "../../../realtime/socket-event-context.js";
import { ConnectConsoleSessionParams, connectConsoleSessionSchema } from "../console-sessions.schemas.js";
import { resolveConsoleSessionService } from "../console-sessions.services.js";

export function registerConsoleSessionSubscribeEvent({ io, socket }: SocketEventContext) {

    socket.on('console-session:subscribe', async (data: ConnectConsoleSessionParams) => {

        const params = connectConsoleSessionSchema.parse(data);

        const result = await resolveConsoleSessionService(params)

        if (result.status === 'error') {

            socket.emit('console-session:error', {
                message: result.message
            })

            return;
        }
        const room = `console-session:${result.session.id}`;

        socket.join(room)
        io.to(room).emit('player-session:players-updated', result.players)

    })

}
