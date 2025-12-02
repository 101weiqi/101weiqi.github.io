
import { GameSession, Puzzle, User, ChatMessage, GoBook } from '../types';

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
  },
  {
    id: 'g3',
    blackPlayer: CURRENT_USER,
    whitePlayer: { id: 'u4', username: 'ProBot', rank: '9d', avatar: 'https://picsum.photos/200/200?random=4' },
    status: 'finished',
    type: 'live',
    sgf: '(;GM[1]FF[4]SZ[19])',
    moveCount: 156,
    timeControl: '20m + 3x30s'
  },
  {
    id: 'g4',
    blackPlayer: { id: 'u5', username: 'OldMaster', rank: '5d', avatar: 'https://picsum.photos/200/200?random=5' },
    whitePlayer: CURRENT_USER,
    status: 'finished',
    type: 'live',
    sgf: '(;GM[1]FF[4]SZ[19])',
    moveCount: 230,
    timeControl: '1h'
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

export const MOCK_BOOKS: GoBook[] = [
  {
    id: 'b1',
    title: 'Beginner Layouts',
    author: 'Lee Sedol',
    cover: 'https://picsum.photos/id/24/300/400',
    isPublic: true,
    content: [
      {
        id: 'c1', title: 'Chapter 1: The Star Point', children: [
           { id: 's1', title: 'Approaching the star', sgf: '(;GM[1]...)' },
           { id: 's2', title: 'Defending the corner', sgf: '(;GM[1]...)' }
        ]
      },
      {
        id: 'c2', title: 'Chapter 2: The 3-4 Point', children: [
           { id: 's3', title: 'Knight approach', sgf: '(;GM[1]...)' },
           { id: 's4', title: 'High pincer', sgf: '(;GM[1]...)' }
        ]
      }
    ]
  },
  {
    id: 'b2',
    title: 'Tesuji Encyclopedia',
    author: 'Go Seigen',
    cover: 'https://picsum.photos/id/20/300/400',
    isPublic: true,
    content: [
      {
        id: 'c3', title: 'Nets', children: []
      },
      {
        id: 'c4', title: 'Ladders', children: []
      }
    ]
  }
];
