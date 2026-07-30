
import { httpClient } from "@/shared/api/httpClient";
import type { ResolveConsoleSessionRequest, ResolveConsoleSessionResult } from "@pocket-play/contracts";

export const resolveConsoleSessionApi = async ({ consoleDeviceId, consoleSessionId }: ResolveConsoleSessionRequest): Promise<ResolveConsoleSessionResult> => {
    const response = await httpClient.post<ResolveConsoleSessionResult>(`/console-sessions/resolve`, {
        consoleDeviceId,
        consoleSessionId,
    });

    return response.data;
}