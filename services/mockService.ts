import { GameSession, Puzzle, User, ChatMessage, GoBook, HomeworkItem } from '../types';

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

export const MOCK_TOURNAMENT_GAMES: GameSession[] = [
  {
    id: 't1',
    tournamentName: '28th LG Cup Final',
    blackPlayer: { id: 'p1', username: 'Shin Jinseo', rank: '9p', avatar: 'https://ui-avatars.com/api/?name=Shin+Jinseo&background=0D8ABC&color=fff&size=128' },
    whitePlayer: { id: 'p2', username: 'Ke Jie', rank: '9p', avatar: 'https://ui-avatars.com/api/?name=Ke+Jie&background=ef4444&color=fff&size=128' },
    status: 'finished',
    type: 'live',
    sgf: '(;GM[1]...)',
    moveCount: 252,
    timeControl: '3h',
    result: 'B+R',
    date: '2024-02-15'
  },
  {
    id: 't2',
    tournamentName: '25th Nongshim Cup',
    blackPlayer: { id: 'p3', username: 'Iyama Yuta', rank: '9p', avatar: 'https://ui-avatars.com/api/?name=Iyama+Yuta&background=22c55e&color=fff&size=128' },
    whitePlayer: { id: 'p1', username: 'Shin Jinseo', rank: '9p', avatar: 'https://ui-avatars.com/api/?name=Shin+Jinseo&background=0D8ABC&color=fff&size=128' },
    status: 'finished',
    type: 'live',
    sgf: '(;GM[1]...)',
    moveCount: 188,
    timeControl: '1h',
    result: 'W+R',
    date: '2024-02-14'
  },
  {
    id: 't3',
    tournamentName: '10th Ing Cup',
    blackPlayer: { id: 'p4', username: 'Ichiriki Ryo', rank: '9p', avatar: 'https://ui-avatars.com/api/?name=Ichiriki+Ryo&background=f59e0b&color=fff&size=128' },
    whitePlayer: { id: 'p5', username: 'Xie Ke', rank: '9p', avatar: 'https://ui-avatars.com/api/?name=Xie+Ke&background=6366f1&color=fff&size=128' },
    status: 'finished',
    type: 'live',
    sgf: '(;GM[1]...)',
    moveCount: 298,
    timeControl: '3h',
    result: 'B+3',
    date: '2024-01-20'
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

export const MOCK_HOMEWORK: HomeworkItem[] = [
  {
    id: 'h1',
    title: 'Daily Training',
    source: 'bank',
    totalProblems: 10,
    completedProblems: 3,
    status: 'pending',
    createdAt: '2024-03-20',
    config: '3 Life&Death, 3 Tesuji, 4 Endgame'
  },
  {
    id: 'h2',
    title: 'Tesuji Encyclopedia Review',
    source: 'book',
    totalProblems: 20,
    completedProblems: 20,
    status: 'completed',
    createdAt: '2024-03-15',
    config: 'Chapter 1: Nets'
  }
];