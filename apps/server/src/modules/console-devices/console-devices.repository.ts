import { prisma } from "../../database/prisma.js";

export async function upsertConsoleDevice(consoleDeviceId: string) {
    return prisma.consoleDevice.upsert({
        where: {
            id: consoleDeviceId,
        },
        update: {
            updatedAt: new Date(),
        },
        create: {
            id: consoleDeviceId,
        },
    });
}