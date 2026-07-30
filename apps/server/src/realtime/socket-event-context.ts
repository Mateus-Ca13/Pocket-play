import type { Server, Socket } from "socket.io";

export interface SocketEventContext {
    io: Server;
    socket: Socket;
}