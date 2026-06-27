import MotionDiv from "@/shared/components/MotionDiv/MotionDiv";
import { fadeInUp } from "@/shared/motion/presets";
import { CircleX } from "lucide-react";

interface ErrorSectionProps {
    title: string;
    description: string;
}

export default function ErrorSection({ title, description }: ErrorSectionProps) {
    return (
        <MotionDiv {...fadeInUp} className='flex flex-col items-center justify-center gap-4 text-center px-6'>
            <CircleX className='text-red-500' size={48} />
            <h1 className='text-2xl md:text-4xl font-bold'>{title}</h1>
            <p className='text-lg text-gray-400'>{description}</p>
        </MotionDiv>
    )
}