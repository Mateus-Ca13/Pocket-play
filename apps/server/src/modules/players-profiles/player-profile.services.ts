import { updatePlayerProfile } from "./player-profile.repository.js";
import { EditPlayerProfileParams } from "./player-profile.schemas.js";


export async function editPlayerProfileService(params: EditPlayerProfileParams) {
    try {
        const player = await updatePlayerProfile(params);

        return {
            status: 'ready',
            playerProfile: {
                id: player.id,
                name: player.name,
                avatarKey: player.avatarKey,
            },
        };

    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: 'Erro ao editar perfil de jogador',
        };
    }
}