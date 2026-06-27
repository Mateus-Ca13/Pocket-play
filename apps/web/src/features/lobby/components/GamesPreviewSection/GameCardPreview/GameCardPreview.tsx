import MotionDiv from '@/shared/components/MotionDiv/MotionDiv';
import { gameCardSwap, withDelay } from '@/shared/motion/presets';
import type { Game } from '@/shared/types/entities';

interface GameCardPreviewProps {
  game: Game;
  delay?: number;
}

export default function GameCardPreview({ game, delay = 0 }: GameCardPreviewProps) {
  const isAvailable = game.status === 'available';

  return (
    <MotionDiv
      {...withDelay(gameCardSwap, delay)}
      className="flex flex-col gap-4 w-full group relative"
    >
      {/* Image Container with Hover zoom and Badge */}
      <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/40">
        <img
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          src={`src/assets/games/${game.imageKey}.png`}
          alt={game.title}
        />

        {/* Dark Overlay gradient for readability */}
        <div className="absolute inset-0 bg-linear-to-t from-surface-dark/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          {isAvailable ? (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.25)] flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Disponível
            </span>
          ) : (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/5 text-white/50 border border-white/10 backdrop-blur-md">
              Em breve
            </span>
          )}
        </div>
      </div>

      {/* Content Details */}
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-center text-white group-hover:text-primary-300 transition-colors duration-300">
          {game.title}
        </h3>
        <p className="text-lg text-center text-white/70 px-4 leading-relaxed h-30">
          {game.description}
        </p>
      </div>
    </MotionDiv>
  );
}
