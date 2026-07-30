import type { ConnectToPlayerSessionResult } from "@pocket-play/contracts";

export type PlayerSessionState =
    | { status: 'connecting' }
    | ConnectToPlayerSessionResult

