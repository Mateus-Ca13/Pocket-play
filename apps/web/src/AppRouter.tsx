import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LobbyPage from './features/lobby/LobbyPage';
import ConsoleConnectionPage from './features/console-connection/ConsoleConnectionPage';
import ConsoleCodeEntryPage from './features/console-connection/ConsoleCodeEntryPage';
import ConsoleControllerPage from './features/console-controler/components/ConsoleControllerPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LobbyPage />} />
        <Route path="/connect" element={<ConsoleCodeEntryPage />} />
        <Route path="/connect/:sessionCode" element={<ConsoleConnectionPage />} />
        <Route path="/connect/:sessionCode/controller" element={<ConsoleControllerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
