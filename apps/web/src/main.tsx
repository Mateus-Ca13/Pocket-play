import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './AppRouter.tsx';
import { SocketProvider } from './shared/providers/SocketProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <SocketProvider>
    <AppRouter />
  </SocketProvider>
);
