import type { FastifyInstance } from 'fastify';
import { prisma } from '../../database/prisma.js';

export async function healthRoutes(app: FastifyInstance) {
    app.get('/health', async () => {
        const count = await prisma.consoleDevice.count();
        return { status: 'ok', database: 'connected', consoleDevices: count };
    });
}