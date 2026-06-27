import MotionDiv from '@/shared/components/MotionDiv/MotionDiv';
import { slideInHeader, withDelay } from '@/shared/motion/presets';
import { consoleSession } from '@/shared/utils/mockData';

export default function LobbyHeader() {
  return (
    <MotionDiv
      {...withDelay(slideInHeader, 0.6)}
      className="p-6 flex text-2xl justify-between font-semibold w-full items-center bg-linear-to-b to-surface from-surface-light"
    >
      <div className="flex items-center gap-4">
        <h1 className="text-5xl">PocketPlay</h1>
        <span className="flex items-center justify-center w-1 h-6 rounded-full bg-secondary-400 text-xs font-bold"></span>
        <h2 className="text-secondary-100">Lobby</h2>
      </div>
      <div className="flex items-center gap-4">
        <h2>Código da Sessão</h2>
        <p className="text-2xl font-bold rounded-3xl px-4 py-2 bg-secondary-600">
          {consoleSession.code}
        </p>
      </div>
    </MotionDiv>
  );
}
