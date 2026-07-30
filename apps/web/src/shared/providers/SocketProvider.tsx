import { createContext, useEffect, useMemo, type PropsWithChildren } from "react";
import { io, type Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({ children }: PropsWithChildren) {
    const socket = useMemo(
        () => io(import.meta.env.VITE_API_URL),
        []
    );

    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}