import type { FastifyInstance } from "fastify";
import { Server } from "socket.io";
import { registerPlayerSessionEvents } from "../modules/player-session/player-session.events.js";
import { registerConsoleSessionEvents } from "../modules/console-sessions/console-sessions.events.js";


export function registerSocketServer(app: FastifyInstance) {
    const io = new Server(app.server, {
        cors: {
            origin: true,
        }
    });

    io.on('connection', (socket) => {
        app.log.info({ socketId: socket.id }, 'Socket connected');
    });


    registerConsoleSessionEvents(io);
    registerPlayerSessionEvents(io);

    return io;
}