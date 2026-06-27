import { useNavigate, useParams } from 'react-router-dom';
import useConsoleConnection from './hooks/useConsoleConnection';
import LoadingScreen from '@/shared/components/LoadingScreen/LoadingScreen';
import MotionDiv from '@/shared/components/MotionDiv/MotionDiv';
import { fadeInUp } from '@/shared/motion/presets';
import MobileLobbyLayout from '@/shared/layout/MobileLobbyLayout/MobileLobbyLayout';
import Button from '@/shared/components/Button/Button';
import { useEffect, useState } from 'react';
import ChoosePlayerSection from './components/ChoosePlayerSection/ChoosePlayerSection';
import CreateNewPlayer from './components/CreateNewPlayer/CreateNewPlayer';
import ConfirmSavedPlayer from './components/ConfirmSavedPlayer/ConfirmSavedPlayer';
import ErrorSection from '@/shared/components/ErrorSection/ErrorSection';

function ConsoleConnectionPage() {
  const { sessionCode } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<'choose' | 'create' | 'confirm' | null>(null);
  const connectionState = useConsoleConnection(sessionCode || '');


  useEffect(() => {
    if (connectionState.status !== 'ready') return;
    if (step !== null) return;

    if (connectionState.savedPlayer.id) {
      setStep('confirm');
      return;
    }

    if (connectionState.knownPlayers.length > 0) {
      setStep('choose');
      return;
    }

    setStep('create');
    console.log(connectionState)
  }, [connectionState, step]);

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

  if (connectionState.status === 'error') {
    return (
      <MobileLobbyLayout>
        <ErrorSection title='Erro ao encontrar sessão' description={connectionState.message} />
        <Button
          className="mt-6 py-4 px-12 rounded-2xl bg-primary-500 text-white hover:scale-105 hover:bg-primary-400 duration-200"
          onClick={() => navigate('/connect')}
        >
          Reconectar
        </Button>
      </MobileLobbyLayout>
    )
  }

  return (
    <MobileLobbyLayout>
      <MotionDiv {...fadeInUp} className='center-row gap-4 w-full px-6'>
        {step === 'choose' && <ChoosePlayerSection setStep={setStep} knownPlayers={connectionState.knownPlayers} />}
        {step === 'create' && <CreateNewPlayer setStep={setStep} />}
        {step === 'confirm' && <ConfirmSavedPlayer setStep={setStep} knownPlayers={connectionState.knownPlayers} savedPlayerId={connectionState.savedPlayer.id} />}
      </MotionDiv>
    </MobileLobbyLayout>
  );
}
export default ConsoleConnectionPage;
