import { CreatePlayerAndJoinSessionResult, JoinSessionWithExistingPlayerResult, ResolveConsoleConnectionResult } from "@pocket-play/contracts";
import { findValidConsoleSessionByCode } from "../console-sessions/console-sessions.repository.js";
import { CreatePlayerAndJoinSessionParams, JoinSessionWithExistingPlayerParams, ResolveConsoleConnectionParams } from "./console-connections.schemas.js";
import { createPlayerProfile, findPlayerProfileByIdAndConsoleDeviceId, findPlayerProfilesByConsoleDeviceId } from "../players-profiles/player-profile.repository.js";
import { findHostPlayerSession, upsertPlayerSession } from "./console-connections.repository.js";

export async function resolveConsoleConnectionService(params: ResolveConsoleConnectionParams): Promise<ResolveConsoleConnectionResult> {

    const validSession = await findValidConsoleSessionByCode(params.sessionCode);

    if (!validSession) {
        return {
            status: 'session_not_found',
            message: 'Sessão não encontrada ou expirada',
        };
    }

    const knownPlayers = await findPlayerProfilesByConsoleDeviceId({ consoleDeviceId: validSession.consoleDeviceId })

    const savedPlayer = knownPlayers.find(player => player.id === params.savedPlayerId) ?? null;

    return {
        status: 'ready',
        session: validSession,
        savedPlayer,
        knownPlayers: knownPlayers
    }

}

export async function joinSessionWithExistingPlayerService(params: JoinSessionWithExistingPlayerParams): Promise<JoinSessionWithExistingPlayerResult> {
    const { sessionCode, playerId } = params;

    const validSession = await findValidConsoleSessionByCode(sessionCode);

    if (!validSession) {
        return {
            status: 'session_not_found',
            message: 'Sessão não encontrada ou expirada',
        };
    }

    const player = await findPlayerProfileByIdAndConsoleDeviceId({ playerId, consoleDeviceId: validSession.consoleDeviceId });

    if (!player) {
        return {
            status: 'player_not_found',
            message: 'Jogador não encontrado',
        };
    }

    const sessionHasHost = await findHostPlayerSession(validSession.id);

    const sessionWithPlayer = await upsertPlayerSession({ consoleSessionId: validSession.id, playerProfileId: player.id, role: sessionHasHost ? 'GUEST' : 'HOST' });

    return {
        status: 'joined',
        playerProfileId: player.id,
        playerSessionId: sessionWithPlayer.id,
        role: sessionWithPlayer.role,
    }

}



export async function createPlayerAndJoinSessionService(params: CreatePlayerAndJoinSessionParams): Promise<CreatePlayerAndJoinSessionResult> {
    const { sessionCode, name, avatarKey } = params;

    const validSession = await findValidConsoleSessionByCode(sessionCode);

    if (!validSession) {
        return {
            status: 'session_not_found',
            message: 'Sessão não encontrada ou expirada',
        };
    }

    const player = await createPlayerProfile({ consoleDeviceId: validSession.consoleDeviceId, name, avatarKey });

    const sessionHasHost = await findHostPlayerSession(validSession.id);

    const sessionWithPlayer = await upsertPlayerSession({ consoleSessionId: validSession.id, playerProfileId: player.id, role: sessionHasHost ? 'GUEST' : 'HOST' });

    return {
        status: 'joined',
        playerProfileId: player.id,
        playerSessionId: sessionWithPlayer.id,
        role: sessionWithPlayer.role,
    };

}


