import GamesPreviewSection from './components/GamesPreviewSection/GamesPreviewSection';
import JoinLobbySection from './components/JoinLobbySection/JoinLobbySection';
import LobbyHeader from './components/LobbyHeader/LobbyHeader';
import LobbyPlayersBar from './components/LobbyPlayersBar/LobbyPlayersBar';
import LoadingScreen from '@/shared/components/LoadingScreen/LoadingScreen';
import ErrorSection from '@/shared/components/ErrorSection/ErrorSection';
import useConsoleSession from './hooks/useConsoleSession';
import Button from '@/shared/components/Button/Button';

function LobbyPage() {

  const consoleSession = useConsoleSession();

  if (!consoleSession || consoleSession.status === 'loading') {
    return (
      <LoadingScreen />
    )
  }

  if (consoleSession.status === 'error') {
    return (
      <main className='page-screen-center'>
        <ErrorSection title='Erro ao encontrar sessão' description='A sessão que você está tentando acessar não existe ou expirou. Tente novamente' />
        <Button
          className="mt-6 py-4 px-12 rounded-2xl bg-primary-500 text-white hover:scale-105 hover:bg-primary-400 duration-200"
          onClick={() => window.location.href = '/'}
        >
          Reconectar
        </Button>
      </main>
    )
  }

  const session = consoleSession.session;

  console.log(consoleSession);

  return (
    <main className="bg-linear-to-tr from-surface to-surface/80 text-white w-full min-h-screen flex flex-col justify-start gap-32">
      <LobbyHeader sessionCode={session.code} />
      <section className="flex gap-32 items-start justify-between w-full px-12">
        <LobbyPlayersBar players={consoleSession.players} />
        <JoinLobbySection sessionCode={session.code} />
        <GamesPreviewSection />
      </section>
    </main>
  );
}

export default LobbyPage;
