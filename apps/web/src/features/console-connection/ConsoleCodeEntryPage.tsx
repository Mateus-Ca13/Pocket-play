import Button from '@/shared/components/Button/Button';
import Input from '@/shared/components/Input/Input';
import MobileLobbyLayout from '@/shared/layout/MobileLobbyLayout/MobileLobbyLayout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ConsoleCodeEntryPage() {
  const navigate = useNavigate();
  const [consoleCode, setConsoleCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  const connectToLobby = () =>
    consoleCode.length !== 6 ? setError('Código inválido') : navigate(`/connect/${consoleCode}`);

  return (
    <MobileLobbyLayout>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h2 className='text-lg'>Insira o código do console</h2>
        <Input
          variant="lobby"
          value={consoleCode}
          maxLength={6}
          setValue={setConsoleCode}
          placeholder="..."
          error={error}
          className="text-3xl w-48 text-center"
        />
        <Button
          variant="lobby"
          size="medium"
          onClick={connectToLobby}
        >
          Conectar
        </Button>
      </div>
    </MobileLobbyLayout>
  );
}

export default ConsoleCodeEntryPage;
