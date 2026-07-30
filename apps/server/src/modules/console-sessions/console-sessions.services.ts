import { upsertConsoleDevice } from "../console-devices/console-devices.repository.js";
import { getSessionPlayers } from "../player-session/player-session.repository.js";
import { generateConsoleSessionCode, getConsoleSessionExpiresAt } from "./console-session.utils.js";
import { createConsoleSession, findActiveConsoleSessionByDeviceId, findValidConsoleSessionById } from "./console-sessions.repository.js";
import { ResolveConsoleSessionParams } from "./console-sessions.schemas.js";
import { ResolveConsoleSessionResult } from "@pocket-play/contracts";


export async function resolveConsoleSessionService(params: ResolveConsoleSessionParams): Promise<ResolveConsoleSessionResult> {

    await upsertConsoleDevice(params.consoleDeviceId);

    if (params.consoleSessionId) {
        const session = await findValidConsoleSessionById(params);

        if (session) {
            const players = await getSessionPlayers(session.id);

            return {
                status: 'ready',
                session: session,
                players,
                resumed: true
            };
        }
    }

    const session = await findActiveConsoleSessionByDeviceId(params);

    if (session) {
        const players = await getSessionPlayers(session.id);

        return {
            status: 'ready',
            session: session,
            players,
            resumed: true
        };
    }

    const sessionCode = generateConsoleSessionCode();
    const sessionExpiresAt = getConsoleSessionExpiresAt();

    const newSession = await createConsoleSession({
        consoleDeviceId: params.consoleDeviceId,
        code: sessionCode,
        expiresAt: sessionExpiresAt,
    });

    return {
        players: [],
        status: 'ready',
        session: newSession,
        resumed: false
    };
}