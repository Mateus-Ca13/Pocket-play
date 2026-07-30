import type { Server } from 'socket.io';
import { registerConsoleSessionSubscribeEvent } from './events/register-subscribe.event.js';


export function registerConsoleSessionEvents(io: Server) {
    io.on('connection', (socket) => {

        registerConsoleSessionSubscribeEvent({ io, socket });
    });

}
