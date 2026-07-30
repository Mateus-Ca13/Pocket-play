import { SocketEventContext } from "../../../realtime/socket-event-context.js";
import { ConnectToPlayerSessionParams, connectToPlayerSessionSchema } from "../player-session.schemas.js";
import { connectToPlayerSessionService } from "../player-session.services.js";


export function registerPlayerSessionSubscribeEvent({ io, socket }: SocketEventContext) {

    socket.on('player-session:subscribe', async (data: ConnectToPlayerSessionParams) => {

        const params = connectToPlayerSessionSchema.parse(data);

        const result = await connectToPlayerSessionService(params)

        if (result.status === 'player_not_found' || result.status === 'session_not_found') {

            socket.emit('player-session:error', {
                message: result.message
            })

            return;
        }
        const room = `console-session:${result.session.id}`;

        socket.join(room)
        io.to(room).emit('player-session:players-updated', result.players)

    })

}
