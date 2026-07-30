import z from "zod";

export const resolveConsoleConnectionSchema = z.object({
    sessionCode: z.string().length(6),
    savedPlayerId: z.string().nullable(),
});

export const joinSessionWithExistingPlayerSchema = z.object({
    sessionCode: z.string().length(6),
    playerId: z.string(),
});

export const createPlayerAndJoinSessionSchema = z.object({
    sessionCode: z.string().length(6),
    avatarKey: z.string(),
    name: z.string(),
});

export type ResolveConsoleConnectionParams = z.infer<typeof resolveConsoleConnectionSchema>;
export type JoinSessionWithExistingPlayerParams = z.infer<typeof joinSessionWithExistingPlayerSchema>;
export type CreatePlayerAndJoinSessionParams = z.infer<typeof createPlayerAndJoinSessionSchema>;

