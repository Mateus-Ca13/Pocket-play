import { useEffect, useState } from "react";
import type { ConsoleConnectionState } from "@/shared/types/connection";
import { sessionState3 as sessionState } from "@/shared/utils/mockData";

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

            // const response = await api.resolveConsoleConnection({
            //   sessionCode,
            //   savedPlayerId,
            // });

            setState(sessionState.status === 'ready' ? {
                ...sessionState,
            } : sessionState);

        }
        resolveConnection()
    }, [sessionCode]);

    return state;
}