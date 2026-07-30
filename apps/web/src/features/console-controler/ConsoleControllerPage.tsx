import MobileLobbyLayout from "@/shared/layout/MobileLobbyLayout/MobileLobbyLayout";
import MotionDiv from "@/shared/components/MotionDiv/MotionDiv";
import { fadeInListItem } from "@/shared/motion/presets";
import { usePlayerSession } from "./hooks/usePlayerSession";
import { useParams } from "react-router-dom";
import LoadingScreen from "@/shared/components/LoadingScreen/LoadingScreen";
import ErrorSection from "@/shared/components/ErrorSection/ErrorSection";
import Button from "@/shared/components/Button/Button";
import { useNavigate } from "react-router-dom";
import PlayersList from "./components/PlayersList/PlayersList";


function ConsoleControllerPage() {
    const { sessionCode } = useParams();
    const navigate = useNavigate();

    const sessionState = usePlayerSession({ sessionCode })

    if (sessionState.status === 'connecting') return (
        <LoadingScreen />
    )

    if (sessionState.status === 'session_not_found') return (
        <MobileLobbyLayout>
            <ErrorSection title='Erro ao encontrar sessão' description='A sessão que você está tentando acessar não existe ou expirou. Tente novamente' />
            <Button
                className="mt-6 py-4 px-12 rounded-2xl bg-primary-500 text-white hover:scale-105 hover:bg-primary-400 duration-200"
                onClick={() => navigate('/connect')}
            >
                Voltar ao início
            </Button>
        </MobileLobbyLayout>
    )

    if (sessionState.status === 'player_not_found') return (
        <MobileLobbyLayout>
            <ErrorSection title='Jogador não encontrado' description='O jogador não foi encontrado na sessão. Volte ao início para criar ou entrar em uma nova sessão' />
            <Button
                className="mt-6 py-4 px-12 rounded-2xl bg-primary-500 text-white hover:scale-105 hover:bg-primary-400 duration-200"
                onClick={() => navigate('/connect')}
            >
                Voltar ao início
            </Button>
        </MobileLobbyLayout>
    )


    return (
        <MobileLobbyLayout>
            <MotionDiv {...fadeInListItem} className="flex flex-col items-center gap-8">
                <h2 className='text-lg md:text-xl text-center font-semibold'>Voce está conectado ao console!</h2>
                <PlayersList players={sessionState.players} />
                <div className="w-full border p-4 rounded-2xl">
                    <p>ID do console: <span className="text-white/70">{sessionState.currentPlayer.name}</span></p>
                    <p>Console: <span className="text-white/70">{sessionState.session.consoleDeviceId}</span></p>
                </div>
            </MotionDiv>
        </MobileLobbyLayout>
    )
}
export default ConsoleControllerPage