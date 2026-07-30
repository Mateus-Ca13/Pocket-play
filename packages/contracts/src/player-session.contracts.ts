import { ConsoleSession } from "./console-session.contracts.js";
import { Game } from "./game.contracts.js";
import { SessionPlayer } from "./player.contracts.js";


export type ConnectToPlayerSessionRequest = {
    sessionCode: string;
    playerProfileId: string;
}

export type ConnectToPlayerSessionResult =
    | { status: 'session_not_found', message: string }
    | { status: 'player_not_found', message: string }
    | {
        status: 'connected';
        session: ConsoleSession;
        currentPlayer: SessionPlayer;
        players: SessionPlayer[];
        games: Game[];
    };
