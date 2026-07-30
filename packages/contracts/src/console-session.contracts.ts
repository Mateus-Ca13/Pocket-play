import { SessionPlayer } from "./player.contracts.js";

export type ConsoleSessionStatus = 'LOBBY' | 'GAME_SETUP' | 'IN_GAME';

export type ConsoleSession = {
    id: string;
    code: string;
    consoleDeviceId: string;
    status: ConsoleSessionStatus;
    createdAt: Date;
    expiresAt?: Date;
};


export type ResolveConsoleSessionRequest = {
    consoleDeviceId: string;
    consoleSessionId: string | null;
};

export type ResolveConsoleSessionResult = {
    status: 'ready'
    session: ConsoleSession;
    players: SessionPlayer[];
    resumed: boolean;
} | {
    status: 'error'
    message: string;
}
