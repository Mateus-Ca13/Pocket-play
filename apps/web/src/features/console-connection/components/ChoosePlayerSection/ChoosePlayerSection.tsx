import { useState } from "react";
import MobileAvatarCard from "@/shared/components/AvatarCards/MobileAvatarCard";
import Button from "@/shared/components/Button/Button";
import SelectableCarousel from "@/shared/components/SelectableCarousel/SelectableCarousel";
import type { PlayerProfile } from "@pocket-play/contracts";

interface ChoosePlayerSectionProps {
    setStep: (step: 'choose' | 'create' | 'confirm') => void;
    onSelectPlayer: (playerId: string) => void;
    knownPlayers: PlayerProfile[];
}

export default function ChoosePlayerSection({ setStep, onSelectPlayer, knownPlayers }: ChoosePlayerSectionProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const activePlayer = knownPlayers[selectedIndex];

    const handleConfirmPlayer = () => {
        if (activePlayer) {
            onSelectPlayer(activePlayer.id);
        }
    };

    return (
        <div className="center-col gap-8 w-full sm:w-fit min-w-[320px] sm:min-w-[450px]">
            <div className="bg-surface-light p-6 rounded-2xl w-full flex flex-col items-center justify-center overflow-visible">
                <h2 className='text-lg md:text-xl font-semibold text-center mb-6'>Você é um destes jogadores?</h2>

                <div className="w-full py-4 overflow-visible flex items-center justify-center">
                    <SelectableCarousel
                        emptyMessage="Nenhum jogador encontrado"
                        items={knownPlayers}
                        selectedIndex={selectedIndex}
                        onChange={setSelectedIndex}
                        renderItem={(player) => (
                            <div className="w-[140px] sm:w-[160px] pointer-events-none">
                                <MobileAvatarCard player={player} />
                            </div>
                        )}
                    />
                </div>

                {activePlayer && (
                    <Button
                        variant="lobby"
                        size="medium"
                        className="w-full max-w-72 mx-auto mt-6"
                        onClick={handleConfirmPlayer}
                    >
                        Sim, sou o {activePlayer.name}
                    </Button>
                )}
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
                onClick={() => setStep('create')}
            >
                Criar novo jogador
            </Button>
        </div>
    )
}