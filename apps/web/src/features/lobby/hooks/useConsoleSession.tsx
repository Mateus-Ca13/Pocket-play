import type { consoleSessionState } from "@/shared/types/entities";
import useConsoleDeviceId from "./useConsoleDeviceId";
import { useEffect, useState } from "react";
import { consoleSession } from "@/shared/utils/mockData";

const CONSOLE_SESSION_ID_STORAGE_KEY = 'CONSOLE_SESSION_ID';

export default function useConsoleSession() {
    const consoleDeviceId = useConsoleDeviceId();
    const storedSessionId = sessionStorage.getItem(CONSOLE_SESSION_ID_STORAGE_KEY);
    const [session, setSession] = useState<consoleSessionState>({
        status: 'loading',
    });

    useEffect(() => {

        async function resolveConsoleSession() {

            // futuro: chamar backend para criar/recuperar session ativa
            // const response = await api.resolveConsoleSession({
            //   consoleDeviceId,
            //   sessionId: storedSessionId,
            // });

            const session = {
                ...consoleSession,
                consoleDeviceId,
            };

            sessionStorage.setItem(CONSOLE_SESSION_ID_STORAGE_KEY, session.id);

            setSession({
                status: 'ready',
                session,
            });
        }

        resolveConsoleSession()
    }, [consoleDeviceId]);

    return session;
}