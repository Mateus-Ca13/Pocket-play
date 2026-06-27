import MobileLobbyLayout from "@/shared/layout/MobileLobbyLayout/MobileLobbyLayout";
import MotionDiv from "@/shared/components/MotionDiv/MotionDiv";
import { fadeInListItem } from "@/shared/motion/presets";
import { consoleSession } from "@/shared/utils/mockData";


function ConsoleControllerPage() {

    return (
        <MobileLobbyLayout>
            <MotionDiv {...fadeInListItem} className="flex flex-col items-center gap-8">
                <h2 className='text-lg md:text-xl text-center font-semibold'>Voce está conectado ao console!</h2>
                <div className="w-full border p-4 rounded-2xl">
                    <p>ID do console: <span className="text-white/70">{consoleSession.consoleDeviceId}</span></p>
                    <p>Criado em: <span className="text-white/70">{new Date(consoleSession.createdAt).toLocaleString()}</span></p>
                </div>
            </MotionDiv>
        </MobileLobbyLayout>
    )
}
export default ConsoleControllerPage