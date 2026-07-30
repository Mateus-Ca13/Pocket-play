import { SessionPlayer } from "@pocket-play/contracts";
import { prisma } from "../../database/prisma.js";

export async function findPlayerSessionBySessionAndId({ consoleSessionId, playerProfileId }: { consoleSessionId: string, playerProfileId: string }) {

    const playerSession = await prisma.playerSession.findUnique({
        where: {
            consoleSessionId_playerProfileId: {
                consoleSessionId,
                playerProfileId
            }
        }
    })

    if (!playerSession) return null;

    return {
        ...playerSession,
    }

}

export async function getSessionPlayers(consoleSessionId: string): Promise<SessionPlayer[]> {
    const players = await prisma.playerSession.findMany({
        where: {
            consoleSessionId,
        },
        include: {
            playerProfile: true
        }
    })

    return players.map(player => ({
        id: player.playerProfileId,
        name: player.playerProfile.name,
        avatarKey: player.playerProfile.avatarKey,
        role: player.role,
        connected: player.connected,
        joinedAt: player.joinedAt,
    }))
}