
export type GameStatus = 'AVAILABLE' | 'UNAVAILABLE';

export type Game = {
    id: string;
    title: string;
    imageKey: string;
    description: string;
    status: GameStatus;
};