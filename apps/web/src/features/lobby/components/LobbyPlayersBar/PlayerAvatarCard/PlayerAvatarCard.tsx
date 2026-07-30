import MotionDiv from '@/shared/components/MotionDiv/MotionDiv';
import { fadeInListItem, withDelay } from '@/shared/motion/presets';
import type { SessionPlayer } from '@pocket-play/contracts';
import { Crown } from 'lucide-react';

type PlayerAvatarCardProps = {
  player: SessionPlayer;
  delay?: number;
};

export default function PlayerAvatarCard({ player, delay }: PlayerAvatarCardProps) {
  const { name, role, avatarKey } = player;
  return (
    <MotionDiv
      {...withDelay(fadeInListItem, delay ?? 0)}
      className="flex items-center gap-6 bg-surface-light shadow-lg shadow-surface-dark w-full rounded-2xl p-4 px-6"
    >
      <img
        className="h-14 w-14 aspect-square object-contain border-2 border-secondary-400 bg-secondary-700/20 rounded-2xl"
        src={`/src/assets/avatars/avatar${avatarKey}.png`}
        alt={name}
      />

      <p className="text-xl font-semibold truncate flex-1">{name}</p>
      {role === 'HOST' && (
        <span className=" w-10 h-10 bg-secondary-600 rounded-lg flex items-center justify-center">
          <Crown size={24} />
        </span>
      )}
    </MotionDiv>
  );
}
