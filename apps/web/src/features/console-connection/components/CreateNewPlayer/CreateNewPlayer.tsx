import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import SelectableCarousel from "@/shared/components/SelectableCarousel/SelectableCarousel";
import { Trash } from "lucide-react";
import { useState } from "react";

interface CreateNewPlayerProps {
    setStep: (step: 'choose' | 'create' | 'confirm') => void;
    onCreateNewPlayer: ({ name, avatarKey }: { name: string, avatarKey: string }) => Promise<void>;

}

const AVATARS = ['1', '2', '3', '4'];

export default function CreateNewPlayer({ setStep, onCreateNewPlayer }: CreateNewPlayerProps) {
    const [name, setName] = useState('');
    const [avatarKey, setAvatarKey] = useState('1');
    const [error, setError] = useState('');


    const handleConfirm = async () => {
        if (!name.trim() || name.length > 16) {
            setError('Nome deve ter entre 1 e 16 caracteres');
            return;
        }

        onCreateNewPlayer({ name, avatarKey });
    };

    return (
        <div className="bg-surface-light p-6 rounded-2xl center-col min-w-[320px] sm:min-w-[450px] overflow-visible">
            <h2 className='text-lg md:text-xl text-center mb-4 font-semibold'>Criar novo jogador</h2>


            <div className="w-full py-4 overflow-visible flex flex-col items-center justify-center gap-1">
                <p className="text-sm text-white/50 mb-3">Escolha seu avatar</p>
                <SelectableCarousel
                    items={AVATARS}
                    selectedIndex={AVATARS.indexOf(avatarKey)}
                    onChange={(index) => setAvatarKey(AVATARS[index])}
                    renderItem={(key, isActive) => (
                        <div className="flex flex-col items-center bg-white/5 rounded-2xl p-4 w-38 md:w-44 pointer-events-none">
                            <img
                                className={`md:h-24 md:w-24 w-20 h-20 aspect-square object-contain border-2 bg-secondary-700/20 rounded-full transition-all duration-200 ${isActive ? "border-secondary-400" : "border-white/10"
                                    }`}
                                src={`/src/assets/avatars/avatar${key}.png`}
                                alt={`Avatar ${key}`}
                            />
                        </div>
                    )}
                />
                <Input
                    label="Defina seu nome"
                    variant="lobby"
                    value={name}
                    setValue={setName}
                    placeholder="Nome"
                    error={error}
                    className="text-2xl text-center w-full"
                />
            </div>
            <span className="h-0.5 w-full bg-white/10 rounded-xl mb-2"></span>
            <div className="center-row w-full gap-4 mt-2">

                <Button
                    variant="lobby_alt"
                    size="medium"
                    onClick={() => setStep('choose')}
                >
                    <Trash />
                </Button>
                <Button
                    variant="lobby"
                    size="medium"
                    className="w-full"
                    onClick={handleConfirm}
                >
                    Confirmar
                </Button>
            </div>
        </div>
    )
}