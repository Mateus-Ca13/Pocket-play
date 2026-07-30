import { useContext } from "react";
import { SocketContext } from "../providers/SocketProvider";

export function useSocket() {
    const socket = useContext(SocketContext);

    if (!socket) {
        throw new Error("useSocket deve ser usado dentro de SocketProvider");
    }

    return socket;
}