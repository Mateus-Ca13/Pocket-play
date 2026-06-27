import type { PlayerProfile } from "@/shared/types/player";

type MobileAvatarCardProps = {
    player: PlayerProfile;
};

export default function MobileAvatarCard({ player }: MobileAvatarCardProps) {
    const { name, avatarKey } = player;
    return (
        <div className="flex flex-col items-center bg-white/5 rounded-2xl p-4 hover:bg-white/10 hover:scale-105 duration-200 cursor-pointer w-36 md:w-42 overflow-hidden">
            <img
                className="md:h-24 md:w-24 w-18 h-18 aspect-square object-contain border-2 border-secondary-400 bg-secondary-700/20 rounded-full"
                src={`/src/assets/avatars/avatar${avatarKey}.png`}
                alt={name}
            />
            <p className="text-base md:text-lg text-center font-semibold truncate w-full mt-3">{name}</p>
        </div>
    )
}