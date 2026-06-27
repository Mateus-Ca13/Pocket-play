import MotionDiv from '@/shared/components/MotionDiv/MotionDiv';
import { fadeInUpSoft, floatingLoop } from '@/shared/motion/presets';
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';

interface JoinLobbySectionProps {
  sessionCode: string;
}

export default function JoinLobbySection({ sessionCode }: JoinLobbySectionProps) {
  const url = `${window.location.origin}/connect/${sessionCode}`;
  const urlToShare = `${window.location.host}/connect`;

  return (
    <MotionDiv {...fadeInUpSoft} className="flex flex-col items-center justify-center gap-6 w-1/3">
      <h2 className="text-3xl text-nowrap font-bold bg-white/10 p-4 rounded-2xl">
        Leia o QR Code para entrar na sessão!
      </h2>
      <MotionDiv
        {...floatingLoop}
        className="floating-card flex flex-col items-center justify-center gap-6 my-8  bg-surface-light"
      >
        <div className="bg-white p-4 rounded-3xl flex items-center gap-4">
          <QRCodeSVG value={url} height={300} width={300} fgColor="#25005A" />
        </div>
      </MotionDiv>
      <span className="w-full h-0.5 bg-primary-500/30 rounded-2xl"></span>
      <h2 className="text-xl text-center">
        Ou acesse <Link to={'/connect'} className="font-bold text-secondary-200">{urlToShare}</Link> e digite o
        código
      </h2>
      <p className="text-4xl font-bold rounded-3xl px-4 py-2 bg-secondary-600">
        {sessionCode}
      </p>
    </MotionDiv>
  );
}
