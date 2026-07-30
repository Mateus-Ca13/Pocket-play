
import PlayerAvatarCard from "@/features/lobby/components/LobbyPlayersBar/PlayerAvatarCard/PlayerAvatarCard";
import type { PlayerProfile } from "@pocket-play/contracts"

type PlayersListProps = {
    players: PlayerProfile[];
}

export default function PlayersList({ players }: PlayersListProps) {
    return (
        <div className="bg-surface-dark p-6 rounded-2xl min-w-[320px] sm:min-w-[450px] overflow-visible gap-8 center-col">
            <h2 className='text-lg md:text-xl text-center font-semibold'>Jogadores na sessão</h2>
            {players.map((player, index) => (
                <PlayerAvatarCard key={player.id} player={player} delay={index * 0.1} />
            ))}
        </div>
    )
}