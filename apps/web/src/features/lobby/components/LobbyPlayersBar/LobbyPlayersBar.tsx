import { players as mockPlayers } from '@/shared/utils/mockData';
import { useState, useEffect, useRef } from 'react';
import { UserPlus2 } from 'lucide-react';
import PlayerAvatarCard from './PlayerAvatarCard/PlayerAvatarCard';
import MotionDiv from '@/shared/components/MotionDiv/MotionDiv';
import type { SessionPlayer } from '@/shared/types/player';
import { fadeInListItem, fadeInUp, withDelay } from '@/shared/motion/presets';

export default function LobbyPlayersBar() {
  const [players] = useState<SessionPlayer[]>(mockPlayers);
  const containerRef = useRef<HTMLDivElement>(null);

  const haveToScroll = players.length > 4;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !haveToScroll) return;

    let animationFrameId: number;
    let scrollDirection = 1; // 1 = down, -1 = up
    let lastTime = performance.now();
    let pauseTimeoutId: ReturnType<typeof setInterval>;
    let isPaused = false;

    const scrollSpeed = 30; // pixels per second

    const scroll = (time: number) => {
      if (isPaused) {
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const maxScroll = container.scrollHeight - container.clientHeight;
      if (maxScroll <= 0) {
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }

      let newScrollTop = container.scrollTop + scrollDirection * scrollSpeed * delta;

      if (scrollDirection === 1 && newScrollTop >= maxScroll) {
        newScrollTop = maxScroll;
        scrollDirection = -1;
        isPaused = true;
        pauseTimeoutId = setTimeout(() => {
          isPaused = false;
          lastTime = performance.now();
        }, 2000); // Pause for 2s at the bottom
      } else if (scrollDirection === -1 && newScrollTop <= 0) {
        newScrollTop = 0;
        scrollDirection = 1;
        isPaused = true;
        pauseTimeoutId = setTimeout(() => {
          isPaused = false;
          lastTime = performance.now();
        }, 2000); // Pause for 2s at the top
      }

      container.scrollTop = newScrollTop;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame((time) => {
      lastTime = time;
      scroll(time);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(pauseTimeoutId);
    };
  }, [haveToScroll, players.length]);

  return (
    <MotionDiv {...withDelay(fadeInUp, 0.3)} className="w-1/3 flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-cente text-white py-3 rounded-2xl">
          Jogadores Conectados
        </h3>
        <span className="w-2/3 h-0.5 bg-radial from-secondary-500 to-transparent"></span>
      </div>

      <div
        ref={containerRef}
        className={`w-full gap-4 py-4 flex flex-col items-start justify-start scrollbar-none ${haveToScroll ? 'overflow-y-auto overflow-hidden max-h-[530px]' : ''} `}
      >
        {players.map((player, index) => (
          <PlayerAvatarCard delay={index * 0.2} key={player.id} player={player} />
        ))}
        <MotionDiv
          {...fadeInListItem}
          className="flex w-full items-center gap-6 bg-surface-dark/30 shadow-lg shadow-black/50 rounded-2xl p-4 px-6"
        >
          <span className="h-14 w-14 aspect-square object-contain border-2 border-dashed border-secondary-600 bg-secondary-700/10 rounded-2xl flex items-center justify-center text-secondary-600">
            <UserPlus2 size={32} />
          </span>
          <p className="text-lg font-semibold">Aguardando jogadores...</p>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
}
