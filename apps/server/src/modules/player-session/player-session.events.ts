import type { Server } from 'socket.io';
import { registerPlayerSessionSubscribeEvent } from './events/register-subscribe.event.js';


export function registerPlayerSessionEvents(io: Server) {
    io.on('connection', (socket) => {

        registerPlayerSessionSubscribeEvent({ io, socket });
    });

}
