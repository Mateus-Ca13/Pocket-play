
import { httpClient } from "@/shared/api/httpClient";
import type { CreatePlayerAndJoinSessionRequest, CreatePlayerAndJoinSessionResult, JoinSessionWithExistingPlayerRequest, JoinSessionWithExistingPlayerResult, ResolveConsoleConnectionRequest, ResolveConsoleConnectionResult } from "@pocket-play/contracts";

export const resolveConsoleConnectionApi = async ({ sessionCode, savedPlayerId }: ResolveConsoleConnectionRequest): Promise<ResolveConsoleConnectionResult> => {
    const response = await httpClient.post<ResolveConsoleConnectionResult>(`/console-connections/resolve`, {
        sessionCode,
        savedPlayerId,
    });

    return response.data;
}

export async function joinSessionWithExistingPlayerApi({ sessionCode, playerId }: JoinSessionWithExistingPlayerRequest) {
    const response = await httpClient.post<JoinSessionWithExistingPlayerResult>(`/console-connections/join-existing-player`, {
        sessionCode,
        playerId
    });
    return response.data;
}

export async function createPlayerAndJoinSessionApi({ sessionCode, avatarKey, name }: CreatePlayerAndJoinSessionRequest) {
    const response = await httpClient.post<CreatePlayerAndJoinSessionResult>(`/console-connections/create-and-join`, {
        sessionCode,
        avatarKey,
        name
    });
    return response.data;
}