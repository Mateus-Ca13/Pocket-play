import type { SessionPlayer } from "../types/player";
import type { Game } from "../types/entities";
import type { ConsoleSession } from "../types/session";
import type { ConsoleConnectionState } from "../types/connection";

const players: SessionPlayer[] = [
  { id: 'player-1', name: 'Mateus', avatarKey: '1', role: 'host', joinedAt: '2022-01-01T00:00:00.000Z', connected: true },
  { id: 'player-2', name: 'Davi', avatarKey: '2', role: 'guest', joinedAt: '2022-01-01T00:00:00.000Z', connected: true },
  { id: 'player-3', name: 'Jéssica', avatarKey: '3', role: 'guest', joinedAt: '2022-01-01T00:00:00.000Z', connected: true },
  { id: 'player-4', name: 'Lucas', avatarKey: '4', role: 'guest', joinedAt: '2022-01-01T00:00:00.000Z', connected: true },
  { id: 'player-5', name: 'Fernando', avatarKey: '1', role: 'guest', joinedAt: '2022-01-01T00:00:00.000Z', connected: true },
  { id: 'player-6', name: 'Alex', avatarKey: '2', role: 'guest', joinedAt: '2022-01-01T00:00:00.000Z', connected: true },
];

const games: Game[] = [
  {
    id: 'stop',
    title: 'Stop/Adedonha',
    imageKey: 'stop',
    description:
      'Mostre seu vocabulário! Preencha as categorias antes que alguém grite "STOP!" e dispute cada resposta para conquistar a maior pontuação.',
    status: 'available',
  },
  {
    id: 'fake_or_fact',
    title: 'Fake ou Fato?',
    imageKey: 'fake_or_fact',
    description:
      'Complete a frase com uma mentira convincente. Engane os outros jogadores e descubra qual é a resposta verdadeira.',
    status: 'unavailable',
  },
  {
    id: 'codenames',
    title: 'Código Secreto',
    imageKey: 'codenames',
    description:
      'Dê pistas inteligentes para sua equipe encontrar as palavras secretas. Cada dica pode aproximar sua equipe da vitória... ou do desastre.',
    status: 'unavailable',
  },
  {
    id: 'wavelength',
    title: 'Sintonia',
    imageKey: 'wavelength',
    description:
      'Encontre o ponto perfeito entre dois extremos. Dê a melhor dica possível e veja se sua dupla consegue interpretar seu raciocínio.',
    status: 'unavailable',
  },
  {
    id: 'scribbled',
    title: 'Rabiscados',
    imageKey: 'scribbled',
    description:
      'Desenhe uma ideia maluca e invente legendas para os desenhos dos outros. Descubra quem consegue identificar a resposta correta.',
    status: 'unavailable',
  },
  {
    id: 'colorgrid',
    title: 'Colorama',
    imageKey: 'colorgrid',
    description:
      'Descreva uma cor usando apenas uma palavra ou conceito. Os outros jogadores tentam encontrar exatamente o tom que você imaginou.',
    status: 'unavailable',
  },
];

const consoleSession: ConsoleSession = {
  id: 'console-session-1',
  code: 'ABCD12',
  status: 'lobby',
  consoleDeviceId: 'console-1',
  createdAt: new Date().toISOString(),
  expiresAt: new Date().toISOString(),
};

const sessionState1: ConsoleConnectionState = { status: 'error', message: 'Sessão não encontrada' };
const sessionState2: ConsoleConnectionState = { status: 'loading' };
const sessionState3: ConsoleConnectionState = {
  session: consoleSession,
  status: 'ready',
  savedPlayer: { id: 'player-1', name: 'Mateus', avatarKey: '1' },
  knownPlayers: [
    { id: 'player-1', name: 'Mateus', avatarKey: '1' },
    { id: 'player-2', name: 'Davi', avatarKey: '2' },
    { id: 'player-3', name: 'Jéssica', avatarKey: '3' },
  ],
};

export { players, consoleSession, games, sessionState1, sessionState2, sessionState3 };
