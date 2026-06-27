import MotionDiv from "@/shared/components/MotionDiv/MotionDiv";
import { fadeInBottom, fadeInUp, withDelay } from "@/shared/motion/presets";
import { Copyright } from "lucide-react";

interface MobileLobbyLayoutProps {
    children: React.ReactNode;
}

export default function MobileLobbyLayout({ children }: MobileLobbyLayoutProps) {
    return (
        <main className=" text-white page-screen-between gap-6">
            <MotionDiv
                {...fadeInUp}
                className="flex w-full flex-col items-center justify-center gap-4 p-6"
            >
                <h1 className="text-3xl font-extrabold text-white text-center">PocketPlay</h1>
                <span className="w-2/3 max-w-64 h-0.5 bg-radial from-secondary-500 to-transparent"></span>
            </MotionDiv>

            <MotionDiv
                {...withDelay(fadeInUp, 0.3)}
                className="flex w-full flex-col items-center justify-center gap-4"
            >
                {children}
            </MotionDiv>


            <MotionDiv {...fadeInBottom} className="text-center flex items-center justify-center gap-2 p-4 text-white/50">
                <Copyright size={16} />
                <span>PocketPlay {new Date().getFullYear()}</span>
            </MotionDiv>
        </main>
    )
}