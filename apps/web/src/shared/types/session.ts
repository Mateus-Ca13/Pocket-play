import type { ResolveConsoleSessionResult } from "@pocket-play/contracts";

export type ConsoleSessionState =
    | { status: 'loading' }
    | ResolveConsoleSessionResult;

