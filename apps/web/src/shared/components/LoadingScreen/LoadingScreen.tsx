import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';

export default function LoadingScreen() {

    const size = useMemo(() => {
        if (window.innerWidth < 768) return 36;
        if (window.innerWidth < 1024) return 64;
        return 96;
    }, []);

    return (
        <main className="page-screen-center">
            <Loader2 size={size} className="animate-spin text-primary-500" />
        </main>
    );
}