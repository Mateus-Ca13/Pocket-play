
export type PlayerRole = 'host' | 'guest';

export type PlayerProfile = {
    id: string;
    name: string;
    avatarKey: string;
};

export type SessionPlayer = PlayerProfile & {
    role: PlayerRole;
    connected: boolean;
    joinedAt: string;
};