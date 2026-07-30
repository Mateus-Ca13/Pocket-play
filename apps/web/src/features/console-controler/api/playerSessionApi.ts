import { httpClient } from "@/shared/api/httpClient";
import type { ConnectToPlayerSessionRequest, ConnectToPlayerSessionResult } from "@pocket-play/contracts";


export async function connectToPlayerSessionApi(params: ConnectToPlayerSessionRequest): Promise<ConnectToPlayerSessionResult> {

    const response = await httpClient.post<ConnectToPlayerSessionResult>('player-session/connect', {
        sessionCode: params.sessionCode,
        playerProfileId: params.playerProfileId,
    });

    return response.data;
}
