
import useConsoleDeviceId from "./useConsoleDeviceId";
import { useEffect, useState } from "react";
import { resolveConsoleSessionApi } from "../api/consoleSessionApi";
import type { ConsoleSessionState } from "@/shared/types/session";
import { useSocket } from "@/shared/hooks/useSocket";
import type { SessionPlayer } from "@pocket-play/contracts";

const CONSOLE_SESSION_ID_STORAGE_KEY = 'CONSOLE_SESSION_ID';

export default function useConsoleSession() {
    const consoleDeviceId = useConsoleDeviceId();
    const socket = useSocket();
    const [sessionState, setSessionState] = useState<ConsoleSessionState>({
        status: 'loading',
    });

    useEffect(() => {

        function handlePlayersUpdated(players: SessionPlayer[]) {
            setSessionState((prev) => {
                if (prev.status !== 'ready') {
                    return prev;
                }

                return {
                    ...prev,
                    players,
                };
            });
        }

        async function resolveConsoleSession() {
            const consoleSessionId = sessionStorage.getItem(CONSOLE_SESSION_ID_STORAGE_KEY);
            const response = await resolveConsoleSessionApi({ consoleDeviceId, consoleSessionId });

            if (response.status === 'error') {
                setSessionState({
                    status: 'error',
                    message: response.message,
                });

                return;
            }

            const session = {
                ...response,
                consoleDeviceId,
            };

            socket.emit('console-session:subscribe', {
                consoleDeviceId,
                consoleSessionId: session.session.id,
            });

            socket.on('player-session:players-updated', handlePlayersUpdated);

            sessionStorage.setItem(CONSOLE_SESSION_ID_STORAGE_KEY, session.session.id);

            setSessionState(session);
        }

        resolveConsoleSession()

        return () => {
            socket.off('player-session:players-updated', handlePlayersUpdated);
        };
    }, [consoleDeviceId]);

    return sessionState;
}