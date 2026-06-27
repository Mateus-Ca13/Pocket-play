import { games as mockGames } from '@/shared/utils/mockData';
import { useState, useEffect } from 'react';
import GameCardPreview from './GameCardPreview/GameCardPreview';
import { AnimatePresence } from 'motion/react';
import MotionDiv from '@/shared/components/MotionDiv/MotionDiv';
import type { Game } from '@/shared/types/entities';
import { fadeInUp, withDelay } from '@/shared/motion/presets';

export default function GamesPreviewSection() {
  const [games] = useState<Game[]>(mockGames);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 10000); // 10 seconds

    return () => clearInterval(timer);
  }, [games.length]);

  const currentGame = games[currentIndex];

  if (!currentGame) return null;

  return (
    <MotionDiv {...withDelay(fadeInUp, 0.5)} className="w-1/3 flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-center text-white py-3 rounded-2xl">
          Jogos Disponíveis
        </h3>
        <span className="w-2/3 h-0.5 bg-radial from-secondary-500 to-transparent"></span>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full">
        {/* Card Container with AnimatePresence for smooth slide/crossfade */}
        <div className="w-full min-h-[385px] flex items-stretch">
          <AnimatePresence mode="wait">
            <GameCardPreview key={currentGame.id} game={currentGame} />
          </AnimatePresence>
        </div>

        {/* Indicator Dots / Pills */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {games.map((game, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={game.id}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-6 bg-secondary-500 shadow-[0_0_10px_rgba(223,25,147,0.6)]'
                    : 'w-2 bg-white/20'
                }`}
              />
            );
          })}
        </div>
      </div>
    </MotionDiv>
  );
}
