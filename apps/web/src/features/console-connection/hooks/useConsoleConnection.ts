import { useEffect, useState } from "react";
import type { ConsoleConnectionState } from "@/shared/types/connection";
import { resolveConsoleConnectionApi } from "../api/consoleConnectionApi";

const PLAYER_ID_STORAGE_KEY = 'PLAYER_ID';

export default function useConsoleConnection(sessionCode: string) {

    const [state, setState] = useState<ConsoleConnectionState>({
        status: 'loading',
    });

    useEffect(() => {
        async function resolveConnection() {

            if (!sessionCode) {
                setState({ status: 'session_not_found', message: 'Código da sessão inválido ou expirado.' });
                return;
            }

            const savedPlayerId = localStorage.getItem(PLAYER_ID_STORAGE_KEY);

            const response = await resolveConsoleConnectionApi({
                sessionCode,
                savedPlayerId,
            });

            setState(response.status === 'ready' ? {
                ...response,
            } : {
                status: response.status,
                message: response.message,
            });

        }
        resolveConnection()
    }, [sessionCode]);

    return state;
}