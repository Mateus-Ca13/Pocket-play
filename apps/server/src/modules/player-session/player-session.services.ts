import { ConnectToPlayerSessionResult } from "@pocket-play/contracts";
import { ConnectToPlayerSessionParams } from "./player-session.schemas.js";
import { findValidConsoleSessionByCode } from "../console-sessions/console-sessions.repository.js";
import { findPlayerSessionBySessionAndId, getSessionPlayers } from "./player-session.repository.js";
import { getGamesList } from "../games/games.repository.js";


export async function connectToPlayerSessionService({ playerProfileId, sessionCode }: ConnectToPlayerSessionParams): Promise<ConnectToPlayerSessionResult> {

    const validSession = await findValidConsoleSessionByCode(sessionCode);

    if (!validSession) {
        return {
            status: 'session_not_found',
            message: 'Sessão inválida ou expirada',
        };
    }

    const validSessionPlayer = await findPlayerSessionBySessionAndId({ consoleSessionId: validSession.id, playerProfileId: playerProfileId })

    if (!validSessionPlayer) {
        return {
            status: 'player_not_found',
            message: 'Player não encontrado ou não pertence a esta sessão',
        };
    }

    const players = await getSessionPlayers(validSession.id);

    const currentPlayer = players.find((player) => player.id === playerProfileId);

    if (!currentPlayer) {
        return {
            status: 'player_not_found',
            message: 'Player não encontrado ou não pertence a esta sessão',
        };
    }

    const games = await getGamesList();

    return {
        status: 'connected',
        session: validSession,
        currentPlayer,
        players,
        games
    }
}
