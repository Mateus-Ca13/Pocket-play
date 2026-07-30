import { createPlayerAndJoinSessionApi, joinSessionWithExistingPlayerApi } from "@/features/console-connection/api/consoleConnectionApi";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const PLAYER_ID_STORAGE_KEY = 'PLAYER_ID';

interface UseJoinConsoleSessionProps {
    sessionCode: string;
}

export function useJoinConsoleSession({ sessionCode }: UseJoinConsoleSessionProps) {

    const navigate = useNavigate();
    const [isJoining, setIsJoining] = useState(false);

    const joinWithExistingPlayer = useCallback(
        async (playerId: string) => {
            setIsJoining(true);

            const result = await joinSessionWithExistingPlayerApi({ sessionCode, playerId });

            setIsJoining(false);

            if (result.status === 'joined') {

                // Armazenar informações do player e da sessão
                localStorage.setItem(PLAYER_ID_STORAGE_KEY, result.playerProfileId);

                // Redirecionar para página do controle
                navigate(`/controller/${sessionCode}`, { replace: true });
            }
        }, [sessionCode, navigate]
    )

    const createAndJoinWithNewPlayer = useCallback(
        async ({ avatarKey, name }: { avatarKey: string, name: string }) => {
            setIsJoining(true);

            const result = await createPlayerAndJoinSessionApi({
                sessionCode,
                avatarKey,
                name,
            });

            setIsJoining(false);

            if (result.status === 'joined') {

                // Armazenar informações do player e da sessão
                localStorage.setItem(PLAYER_ID_STORAGE_KEY, result.playerProfileId);

                // Redirecionar para página do controle
                navigate(`/controller/${sessionCode}`, { replace: true });
            }
        }, [sessionCode, navigate]
    )

    return { joinWithExistingPlayer, isJoining, createAndJoinWithNewPlayer };
}