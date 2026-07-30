import { prisma } from "../../database/prisma.js";
import { PlayerRole } from "../../generated/prisma/enums.js";

export async function findHostPlayerSession(consoleSessionId: string) {
    return prisma.playerSession.findFirst({
        where: {
            consoleSessionId,
            role: 'HOST',
        },
        include: {
            playerProfile: true,
            consoleSession: true,
        },
    });
}

export async function upsertPlayerSession({ consoleSessionId, playerProfileId, role }: { consoleSessionId: string, playerProfileId: string, role: PlayerRole }) {

    const playerSession = await prisma.playerSession.upsert({
        where: {
            consoleSessionId_playerProfileId: {
                consoleSessionId,
                playerProfileId,
            },
        },
        update: {
            connected: true,
        },
        create: {
            consoleSessionId,
            playerProfileId,
            role,
            connected: true,
        }
    });

    return playerSession
}
