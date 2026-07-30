import { prisma } from "../../database/prisma.js";
import { ResolveConsoleSessionParams } from "./console-sessions.schemas.js";


export const findValidConsoleSessionById = async (params: ResolveConsoleSessionParams) => {
    const session = await prisma.consoleSession.findFirst({
        where: {
            consoleDeviceId: params.consoleDeviceId,
            id: params.consoleSessionId ?? undefined,
            expiresAt: { gt: new Date() }
        }
    });

    return session;
}

export async function findActiveConsoleSessionByDeviceId(params: {
    consoleDeviceId: string;
}) {
    const session = await prisma.consoleSession.findFirst({
        where: {
            consoleDeviceId: params.consoleDeviceId,
            expiresAt: { gt: new Date() }
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return session;
}

export async function findValidConsoleSessionByCode(
    sessionCode: string
) {
    const session = await prisma.consoleSession.findFirst({
        where: {
            code: sessionCode,
            expiresAt: { gt: new Date() }
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return session;
}

export async function createConsoleSession(params: {
    consoleDeviceId: string;
    code: string;
    expiresAt: Date;
}) {
    const session = await prisma.consoleSession.create({
        data: {
            consoleDeviceId: params.consoleDeviceId,
            code: params.code,
            expiresAt: params.expiresAt,
        }
    });

    return session;
}