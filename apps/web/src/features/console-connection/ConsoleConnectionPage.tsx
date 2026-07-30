import { useNavigate, useParams } from 'react-router-dom';
import useConsoleConnection from './hooks/useConsoleConnection';
import LoadingScreen from '@/shared/components/LoadingScreen/LoadingScreen';
import MotionDiv from '@/shared/components/MotionDiv/MotionDiv';
import { fadeInUp } from '@/shared/motion/presets';
import MobileLobbyLayout from '@/shared/layout/MobileLobbyLayout/MobileLobbyLayout';
import Button from '@/shared/components/Button/Button';
import { useState } from 'react';
import ChoosePlayerSection from './components/ChoosePlayerSection/ChoosePlayerSection';
import CreateNewPlayer from './components/CreateNewPlayer/CreateNewPlayer';
import ConfirmSavedPlayer from './components/ConfirmSavedPlayer/ConfirmSavedPlayer';
import ErrorSection from '@/shared/components/ErrorSection/ErrorSection';
import { useJoinConsoleSession } from './hooks/useJoinConsoleSession';

function ConsoleConnectionPage() {
  const { sessionCode } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<'choose' | 'create' | 'confirm' | null>(null);
  const connectionState = useConsoleConnection(sessionCode || '');
  const { joinWithExistingPlayer, createAndJoinWithNewPlayer } = useJoinConsoleSession({ sessionCode: sessionCode || '' });

  // Derive current step from connectionState when step is not set yet
  let currentStep = step;
  if (currentStep === null && connectionState.status === 'ready') {
    if (connectionState.savedPlayer?.id) {
      currentStep = 'confirm';
    } else if (connectionState.knownPlayers.length > 0) {
      currentStep = 'choose';
    } else {
      currentStep = 'create';
    }
  }

  if (connectionState.status === 'loading') {
    return <LoadingScreen />
  }

  if (connectionState.status === 'session_not_found') {
    return <MobileLobbyLayout>
      <ErrorSection title='Erro ao encontrar sessão' description='A sessão que você está tentando acessar não existe ou expirou. Tente novamente' />
      <Button
        className="mt-6 py-4 px-12 rounded-2xl bg-primary-500 text-white hover:scale-105 hover:bg-primary-400 duration-200"
        onClick={() => navigate('/connect')}
      >
        Reconectar
      </Button>
    </MobileLobbyLayout>
  }

  return (
    <MobileLobbyLayout>
      <MotionDiv {...fadeInUp} className='center-row gap-4 w-full px-6'>
        {currentStep === 'choose' && <ChoosePlayerSection onSelectPlayer={joinWithExistingPlayer} setStep={setStep} knownPlayers={connectionState.knownPlayers} />}
        {currentStep === 'create' && <CreateNewPlayer setStep={setStep} onCreateNewPlayer={createAndJoinWithNewPlayer} />}
        {currentStep === 'confirm' && <ConfirmSavedPlayer onSelectPlayer={joinWithExistingPlayer} setStep={setStep} knownPlayers={connectionState.knownPlayers} savedPlayerId={connectionState.savedPlayer.id} />}
      </MotionDiv>
    </MobileLobbyLayout>
  );
}
export default ConsoleConnectionPage;
