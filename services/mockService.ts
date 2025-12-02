import { GameSession, Puzzle, User, ChatMessage } from '../types';

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'GoMaster',
  rank: '1d',
  avatar: 'https://picsum.photos/200/200?random=1',
};

export const MOCK_GAMES: GameSession[] = [
  {
    id: 'g1',
    blackPlayer: { id: 'u2', username: 'AlphaCat', rank: '3d', avatar: 'https://picsum.photos/200/200?random=2' },
    whitePlayer: CURRENT_USER,
    status: 'playing',
    type: 'live',
    sgf: '(;GM[1]FF[4]SZ[19];B[pd];W[dp];B[pp];W[dd])',
    moveCount: 4,
    timeControl: '10m + 3x30s'
  },
  {
    id: 'g2',
    blackPlayer: CURRENT_USER,
    whitePlayer: { id: 'u3', username: 'BeginnerJoe', rank: '5k', avatar: 'https://picsum.photos/200/200?random=3' },
    status: 'waiting',
    type: 'correspondence',
    sgf: '(;GM[1]FF[4]SZ[19])',
    moveCount: 0,
    timeControl: '1 day / move'
  }
];

export const MOCK_PUZZLES: Puzzle[] = [
  {
    id: 'p1',
    title: 'Corner Life & Death',
    rank: '1k',
    type: 'LifeDeath',
    initialSgf: '(;GM[1]FF[4]SZ[19]AB[ra][rb][rc][pc][qc]AW[pa][pb][qb][sb]C[Black to live])',
    solved: false
  },
  {
    id: 'p2',
    title: 'Snapback Tesuji',
    rank: '5k',
    type: 'Tesuji',
    initialSgf: '(;GM[1]FF[4]SZ[19]AB[pp][pq][pr]AW[qq][qr][qs])',
    solved: true
  }
];

export const MOCK_MESSAGES: ChatMessage[] = [
  { id: 'm1', sender: 'AlphaCat', content: 'Anyone up for a quick 19x19?', timestamp: Date.now() - 100000 },
  { id: 'm2', sender: 'GoMaster', content: 'Maybe later, doing puzzles.', timestamp: Date.now() - 50000 },
];
