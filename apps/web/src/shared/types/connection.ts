import type { ResolveConsoleConnectionResult } from "@pocket-play/contracts";

export type ConsoleConnectionState =
    | { status: 'loading' }
    | ResolveConsoleConnectionResult;