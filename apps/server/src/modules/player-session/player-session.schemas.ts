import z from "zod";

export const connectToPlayerSessionSchema = z.object({
    sessionCode: z.string().length(6),
    playerProfileId: z.string(),
});

export type ConnectToPlayerSessionParams = z.infer<typeof connectToPlayerSessionSchema>;
