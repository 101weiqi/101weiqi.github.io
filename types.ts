
export enum StoneColor {
  BLACK = 'B',
  WHITE = 'W',
  EMPTY = 'E'
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Move {
  x: number;
  y: number;
  color: StoneColor;
  moveNumber: number;
}

export interface BoardState {
  size: number;
  grid: StoneColor[][];
  captures: {
    black: number;
    white: number;
  };
  lastMove: Move | null;
  nextColor: StoneColor;
}

export type GameStatus = 'waiting' | 'playing' | 'finished' | 'review';
export type GameType = 'live' | 'correspondence';

export interface User {
  id: string;
  username: string;
  rank: string; // e.g., "1d", "5k"
  avatar: string;
}

export interface GameSession {
  id: string;
  blackPlayer: User | null;
  whitePlayer: User | null;
  status: GameStatus;
  type: GameType;
  sgf: string;
  moveCount: number;
  timeControl: string;
}

export interface Puzzle {
  id: string;
  title: string;
  rank: string;
  type: 'LifeDeath' | 'Tesuji' | 'Fuseki' | 'Endgame';
  initialSgf: string;
  solved?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
}

// Updated MarkerType to include stone markers
export type MarkerType = 'triangle' | 'square' | 'circle' | 'x' | 'label' | 'number' | 'stone_black' | 'stone_white';

export interface BoardMarker {
  x: number;
  y: number;
  type: MarkerType;
  label?: string; // For letters or specific numbers
}
