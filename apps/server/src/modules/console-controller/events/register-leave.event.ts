import { SocketEventContext } from "../../../realtime/socket-event-context.js";


export function registerLeaveEvent({ io, socket }: SocketEventContext) {
    socket.on('controller:leave', async (data: LeaveConsoleSessionParams) => {


    })

}