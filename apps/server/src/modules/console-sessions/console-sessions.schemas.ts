import { z } from "zod";

export const resolveConsoleSessionSchema = z.object({
    consoleDeviceId: z.string().uuid({ error: "Invalid console device id" }),
    consoleSessionId: z.string().uuid().nullable()
});

export const connectConsoleSessionSchema = z.object({
    consoleDeviceId: z.string(),
    consoleSessionId: z.string(),
});

export type ResolveConsoleSessionParams = z.infer<typeof resolveConsoleSessionSchema>;
export type ConnectConsoleSessionParams = z.infer<typeof connectConsoleSessionSchema>;