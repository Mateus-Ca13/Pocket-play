import { ConsoleSession } from "./console-session.contracts.js";
import { PlayerProfile, PlayerRole, SessionPlayer } from "./player.contracts.js";



// ------- Fluxo de resolução da sessão (identificação da sessão e do console) -----

export type ResolveConsoleConnectionRequest = {
    sessionCode: string;
    savedPlayerId: string | null;
};

export type ResolveConsoleConnectionResult =
    | { status: 'session_not_found'; message: string }
    | {
        status: 'ready';
        session: ConsoleSession;
        savedPlayer: PlayerProfile | null;
        knownPlayers: PlayerProfile[]
    };


// ------- Fluxo de conexão de player à sessão (após sessão resolvida) -----

export type CreatePlayerAndJoinSessionRequest = {
    sessionCode: string;
    name: string;
    avatarKey: string;
};

export type JoinSessionWithExistingPlayerRequest = {
    sessionCode: string;
    playerId: string;
};

export type JoinSessionWithExistingPlayerResult =
    | {
        status: 'joined';
        playerProfileId: string;
        playerSessionId: string;
        role: PlayerRole;
    }
    | { status: 'session_not_found'; message: string }
    | { status: 'player_not_found'; message: string };

export type CreatePlayerAndJoinSessionResult =
    | {
        status: 'joined';
        playerProfileId: string;
        playerSessionId: string;
        role: PlayerRole;
    }
    | { status: 'session_not_found'; message: string }
    | { status: 'error'; message: string };