import { Game } from "@pocket-play/contracts";
import { prisma } from "../../database/prisma.js";



export async function getGamesList() {
    const games = await prisma.game.findMany({

    });

    return games;
}
