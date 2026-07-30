import { useEffect, useState } from "react";
import { connectToPlayerSessionApi } from "../api/playerSessionApi";
import type { PlayerSessionState } from "../../../shared/types/controller";
import { useSocket } from "@/shared/hooks/useSocket";
import type { SessionPlayer } from "@pocket-play/contracts";

const PLAYER_ID_STORAGE_KEY = 'PLAYER_ID';

export function usePlayerSession({ sessionCode }: { sessionCode: string }) {

    const socket = useSocket();
    const [playerSessionData, setPlayerSessionData] = useState<PlayerSessionState>(
        { status: 'connecting' }
    );

    useEffect(() => {


        let cancelled = false;
        const playerProfileId = localStorage.getItem(PLAYER_ID_STORAGE_KEY);

        if (!playerProfileId) {
            return;
        }

        function handlePlayersUpdated(players: SessionPlayer[]) {
            setPlayerSessionData((prev) => {
                if (prev.status !== 'connected') {
                    return prev;
                }

                return {
                    ...prev,
                    players,
                };
            });
        }

        async function connect({ sessionCode, playerProfileId }: { sessionCode: string, playerProfileId: string }) {

            const response = await connectToPlayerSessionApi({
                sessionCode,
                playerProfileId,
            });

            if (cancelled) return;

            setPlayerSessionData(response)

            if (response.status !== 'connected') return;

            socket.emit('player-session:subscribe', {
                sessionCode,
                playerProfileId
            })

            socket.on('player-session:players-updated', handlePlayersUpdated);


        }

        connect({ sessionCode, playerProfileId });

        return () => {
            cancelled = true;
            socket?.off('player-session:players-updated', handlePlayersUpdated);
        };

    }, [sessionCode]);


    return playerSessionData
}
