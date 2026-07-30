
export type PlayerRole = 'HOST' | 'GUEST';

export type PlayerProfile = {
    id: string;
    name: string;
    avatarKey: string;
};

export type SessionPlayer = PlayerProfile & {
    role: PlayerRole;
    connected: boolean;
    joinedAt: Date;
};

export type EditPlayerProfileRequest = {
    id: string;
    name?: string;
    avatarKey?: string;
};

export type EditPlayerProfileResult = {
    playerProfile: PlayerProfile;
    status: 'ready'
} | {
    status: 'error'
    message: string;
};