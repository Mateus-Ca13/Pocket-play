import { prisma } from "../../database/prisma.js";

export async function findPlayerProfilesByConsoleDeviceId({ consoleDeviceId }: { consoleDeviceId: string }) {
    const players = await prisma.playerProfile.findMany({
        where: {
            consoleDeviceId,
        }
    });

    return players;
}

export async function findPlayerProfileByIdAndConsoleDeviceId({ playerId, consoleDeviceId }: { playerId: string, consoleDeviceId: string }) {
    const player = await prisma.playerProfile.findUnique({
        where: {
            id: playerId,
            consoleDeviceId,
        }
    });

    return player;
}

export async function createPlayerProfile({ name, avatarKey, consoleDeviceId }: { consoleDeviceId: string; name: string; avatarKey: string }) {

    const player = await prisma.playerProfile.create({
        data: {
            consoleDeviceId,
            name,
            avatarKey,
        }
    });

    return player;
}

export async function updatePlayerProfile(params: { id: string; name?: string; avatarKey?: string }) {
    const player = await prisma.playerProfile.update({
        where: {
            id: params.id,
        },
        data: {
            ...(params.name && { name: params.name }),
            ...(params.avatarKey && { avatarKey: params.avatarKey }),
        },
    });
    return player;
}