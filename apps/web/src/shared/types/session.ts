import type { SessionPlayer } from "./player";


export type ConsoleSessionStatus = 'lobby' | 'game_setup' | 'in_game';

export type ConsoleSession = {
    id: string;
    code: string;
    consoleDeviceId: string;
    status: ConsoleSessionStatus;
    createdAt: string;
    expiresAt?: string;
};

export type ConsoleSessionState =
    | { status: 'loading' }
    | ResolveConsoleSessionResult;

export type ResolveConsoleSessionResult = {
    status: 'ready'
    session: ConsoleSession;
    resumed: boolean;
} | {
    status: 'error'
    message: string;
}

export type JoinConsoleSessionResult =
    | {
        status: 'joined';
        session: ConsoleSession;
        currentPlayer: SessionPlayer;
        players: SessionPlayer[];
    }
    | {
        status: 'session_not_found';
        message: string;
    }
    | {
        status: 'player_not_found';
        message: string;
    }
    | {
        status: 'error';
        message: string;
    };

export type JoinConsoleSessionState =
    | { status: 'idle' }
    | { status: 'joining' }
    | JoinConsoleSessionResult;