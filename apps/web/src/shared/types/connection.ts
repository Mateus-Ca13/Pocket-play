import type { ConsoleSession } from "./session";
import type { PlayerProfile } from "./player";

export type ResolveConsoleConnectionResult =
    | { status: 'error'; message: string }
    | { status: 'session_not_found'; message: string }
    | {
        status: 'ready';
        session: ConsoleSession;
        savedPlayer: PlayerProfile | null;
        knownPlayers: PlayerProfile[]
    };

export type ConsoleConnectionState =
    | { status: 'loading' }
    | ResolveConsoleConnectionResult;