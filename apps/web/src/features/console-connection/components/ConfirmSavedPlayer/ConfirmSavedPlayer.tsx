import MobileAvatarCard from "@/shared/components/AvatarCards/MobileAvatarCard";
import Button from "@/shared/components/Button/Button";
import ErrorSection from "@/shared/components/ErrorSection/ErrorSection";
import type { PlayerProfile } from "@pocket-play/contracts";

interface ConfirmSavedPlayerProps {
    setStep: (step: 'choose' | 'create' | 'confirm') => void;
    onSelectPlayer: (playerId: string) => void;
    knownPlayers: PlayerProfile[];
    savedPlayerId: string | null;
}

export default function ConfirmSavedPlayer({ setStep, onSelectPlayer, knownPlayers, savedPlayerId }: ConfirmSavedPlayerProps) {

    const handleSelectPlayer = () => {
        if (savedPlayerId) {
            onSelectPlayer(savedPlayerId);
        }
    }

    const player = knownPlayers.find((player) => player.id === savedPlayerId)!;

    if (!player) {
        return (
            <div className="flex flex-col items-center gap-8">
                <ErrorSection
                    title='Jogador não encontrado'
                    description='O jogador que você está tentando acessar não existe'
                />
                <Button
                    variant="lobby"
                    size="medium"
                    onClick={() => setStep('choose')}
                >
                    Escolher outro jogador
                </Button>
            </div>
        )
    }

    return (
        <div className="center-col gap-8 w-full sm:w-fit min-w-[320px] sm:min-w-[450px]">
            <div className="bg-surface-light p-6 rounded-2xl center-col min-w-[320px] sm:min-w-[450px] overflow-visible gap-8">
                <h2 className='text-lg md:text-xl text-center font-semibold'>Confirmar jogador</h2>
                <MobileAvatarCard player={player} />
                <Button
                    variant="lobby"
                    size="medium"
                    onClick={handleSelectPlayer}
                >
                    Entrar como {player.name}
                </Button>
            </div>

            <div className="flex w-full items-center justify-center gap-4">
                <span className="w-full max-w-36 h-0.5 bg-white/20 rounded-lg"></span>
                <span className="text-white/70">ou</span>
                <span className="w-full max-w-36 h-0.5 bg-white/20 rounded-lg"></span>
            </div>

            <Button
                variant="lobby_alt"
                size="medium"
                className="w-full max-w-96 mx-auto"
                onClick={() => setStep('choose')}
            >
                Escolher outro jogador
            </Button>
        </div>
    )
}