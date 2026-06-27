

export type consoleSessionState =
  | { status: 'loading' }
  | { status: 'ready'; session: ConsoleSession }
  | { status: 'error'; message: string };


export type ControllerState =
  | { status: 'connecting' }
  | { status: 'disconnected' }
  | {
    status: 'connected';
    session: ConsoleSession;
    currentPlayer: Player;
    players: Player[];
    games: Game[];
    role: 'host' | 'guest';
    consoleStatus: 'hub' | 'configuring_game' | 'in_game';
  };

export type Game = {
  id: string;
  title: string;
  imageKey: string;
  description: string;
  status: 'available' | 'unavailable';
};
